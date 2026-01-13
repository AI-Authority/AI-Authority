import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";
import { recordCouponUsageHelper } from "../controllers/couponController.js";
import jwt from "jsonwebtoken";

dotenv.config();
const router = express.Router();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

router.post("/create-checkout-session", async (req, res) => {
  try {
    const { amount, courseName, courseId, coupon, originalAmount } = req.body;

    if (amount === 0) {
      res.json({
        url: `${process.env.FRONTEND_URL}/success?courseId=${courseId}&amount=0&session_id=FREE`,
        isFree: true
      });
      return;
    }

    // Use original price for line items if coupon has Stripe ID (Stripe will apply discount)
    // Otherwise use discounted amount
    const shouldUseOriginalPrice = coupon && coupon.stripeCouponId;
    const priceInCents = Math.round((shouldUseOriginalPrice ? originalAmount : amount) * 100);
    const productName = courseName || "Premium Membership";

    // Prepare metadata with coupon info if available
    const metadata = {
      courseId: courseId || '',
    };

    if (coupon) {
      metadata.couponId = coupon._id;
      metadata.couponCode = coupon.code;
      metadata.discountAmount = (originalAmount - amount).toString();
      metadata.originalAmount = originalAmount.toString();
    }

    // Extract userId from token if available
    const token = req.headers.authorization?.split(" ")[1];
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        metadata.userId = decoded.userId;
        metadata.userModel = decoded.role === 'admin' ? 'User' : 
                           decoded.role === 'trainer' ? 'TrainerMembership' :
                           decoded.membershipType === 'corporate' ? 'CorporateMembership' :
                           decoded.membershipType === 'student' ? 'StudentMembership' :
                           decoded.membershipType === 'individual' ? 'IndividualMembership' :
                           decoded.membershipType === 'ai_architecture' ? 'AIArchitectureMembership' : 'User';
      } catch (error) {
        console.error("Token decode error:", error);
      }
    }

    // Build session configuration
    const sessionConfig = {
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: productName,
              ...(courseId && { description: `Course ID: ${courseId}` }),
            },
            unit_amount: priceInCents,
          },
          quantity: 1,
        },
      ],
      metadata,
      success_url: `${process.env.FRONTEND_URL}/success?courseId=${courseId}&amount=${amount}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
    };

    // If coupon has a Stripe coupon ID, apply it to the session
    // This allows Stripe to handle the discount calculation
    if (coupon && coupon.stripeCouponId) {
      sessionConfig.discounts = [
        {
          coupon: coupon.stripeCouponId, // This is the Stripe coupon ID (e.g., "50OFF")
        },
      ];
      console.log(`✅ Applying Stripe coupon: ${coupon.stripeCouponId}`);
    }

    const session = await stripe.checkout.sessions.create(sessionConfig);

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Stripe webhook to handle successful payments
router.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const sig = req.headers["stripe-signature"];
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    // Record coupon usage if coupon was applied
    if (metadata.couponId && metadata.userId) {
      try {
        await recordCouponUsageHelper({
          couponId: metadata.couponId,
          userId: metadata.userId,
          userModel: metadata.userModel,
          courseId: metadata.courseId,
          discountAmount: parseFloat(metadata.discountAmount),
          originalPrice: parseFloat(metadata.originalAmount),
          finalPrice: parseFloat(metadata.originalAmount) - parseFloat(metadata.discountAmount),
          paymentIntentId: session.payment_intent,
        });
        console.log(`Coupon usage recorded: ${metadata.couponCode}`);
      } catch (error) {
        console.error("Error recording coupon usage:", error);
        // Don't fail the webhook if coupon recording fails
      }
    }
  }

  res.json({ received: true });
});

export default router;

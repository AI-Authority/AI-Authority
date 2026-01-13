import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { createCourseEnrollment } from "../../services/api";

export default function Success() {
  const navigate = useNavigate();
  const [params] = useSearchParams();

  useEffect(() => {
    const courseId = params.get("courseId"); // from Stripe success URL
    const paymentId = params.get("session_id"); // stripe session id
    const amountPaid = Number(params.get("amount")) || 0;

    if (!courseId || !paymentId) {
      navigate("/view-services");
      return;
    }

    const enroll = async () => {
      try {
        await createCourseEnrollment({
          courseId,
          paymentProvider: "stripe",
          paymentId,
          amountPaid
        });
      } catch (err) {
        console.error("Enrollment failed:", err);
      } finally {
        navigate("/view-services");
      }
    };

    enroll();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold text-green-600">Payment Successful ✅</h1>
      <p className="mt-4 text-lg">Thank you! Your payment has been received.</p>
      <p className="mt-2 text-sm text-gray-600">
        Activating your course access...
      </p>
    </div>
  );
}

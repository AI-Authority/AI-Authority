import multer from 'multer';
import path from 'path';
import cloudinary from '../config/cloudinary.js';
import Certificate from '../models/Certificate.js';
import User from '../models/User.js';
import { sendEmail } from '../utils/emailService.js';

const storage = multer.memoryStorage();

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|jpg|jpeg|png/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) cb(null, true);
    else cb(new Error('Only PDF, JPG, JPEG, and PNG files are allowed'));
  },
});

export const uploadCertificate = (req, res) => {
  upload.single('certificateFile')(req, res, async (err) => {
    try {
      console.log('Request received:', {
        headers: req.headers,
        body: req.body,
      });

      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        console.error('File filter error:', err);
        return res.status(400).json({ error: err.message });
      }

      if (!req.file) {
        console.error('No file uploaded');
        return res.status(400).json({ error: 'No file uploaded' });
      }

      const { email, name, company, details, certificationType, issuedDate } = req.body;
      if (!email || !name) {
        console.error('Missing required fields:', req.body);
        return res.status(400).json({ error: 'Email and name are required' });
      }

      const certType = certificationType || 'Certified Enterprise AI Architect';

      // Check if this email already has this certificate type
      const existingCert = await Certificate.findOne({
        email: email,
        certificationType: certType
      });

      if (existingCert) {
        console.error('Duplicate certificate:', { email, certificationType: certType });
        return res.status(400).json({ 
          error: `This email already has a ${certType} certificate. Each email can only have one certificate of each type.` 
        });
      }

      console.log('Uploading file to Cloudinary...');
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'certificates',
          resource_type: 'auto',
          public_id: `cert_${Date.now()}_${Math.round(Math.random() * 1e9)}`,
        },
        async (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({ error: 'Failed to upload to cloud storage' });
          }

          try {
            console.log('Cloudinary upload successful:', result);
            const imageUrl = result.secure_url;
            const cloudinaryPublicId = result.public_id;

            // Prepare certificate data
            const certData = {
              email,
              name,
              company: company || '-',
              course: certificationType || 'Certified Enterprise AI Architect',
              details: details || '',
              imageUrl,
              cloudinaryPublicId,
              certificationType: certificationType || 'Certified Enterprise AI Architect',
            };

            // Parse issuedDate if provided (as local date to avoid timezone issues)
            if (issuedDate) {
              const [year, month, day] = issuedDate.split('-').map(Number);
              certData.issuedDate = new Date(year, month - 1, day, 12, 0, 0);
              console.log('Setting issued date to:', certData.issuedDate, '(parsed from:', issuedDate, ')');
            }

            const newCert = await Certificate.create(certData);

            await User.findOneAndUpdate(
              { email },
              { $push: { certificates: newCert._id } },
              { new: true, upsert: true }
            );

            // Send certificate notification email
            try {
              const certificateEmailContent = `
                <!DOCTYPE html>
                <html>
                <head>
                  <style>
                    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                    .container { max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px; background-color: #f9f9f9; }
                    .header { background-color: #FF9800; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
                    .content { padding: 20px; background-color: white; border-radius: 0 0 10px 10px; }
                    .cert-details { background-color: #f0f0f0; padding: 15px; border-left: 4px solid #FF9800; margin: 20px 0; }
                    .footer { text-align: center; padding-top: 20px; color: #666; font-size: 12px; }
                  </style>
                </head>
                <body>
                  <div class="container">
                    <div class="header">
                      <h1>🏆 New Certificate Added!</h1>
                    </div>
                    <div class="content">
                      <p>Dear <strong>${name}</strong>,</p>
                      <p>Great news! A new certificate has been uploaded to your AI Authority account.</p>
                      <div class="cert-details">
                        <h3>Certificate Details:</h3>
                        <p><strong>Certificate Type:</strong> ${certificationType || 'Certified Enterprise AI Architect'}</p>
                        <p><strong>Company:</strong> ${company || 'N/A'}</p>
                        <p><strong>Upload Date:</strong> ${new Date().toLocaleDateString()}</p>
                        ${details ? `<p><strong>Details:</strong> ${details}</p>` : ''}
                      </div>
                      <p>You can now access and download your certificate from your account dashboard.</p>
                      <p>Congratulations on your achievement!</p>
                      <p>Best regards,<br><strong>The AI Authority Team</strong></p>
                    </div>
                    <div class="footer">
                      <p>© 2025 AI Authority. All rights reserved.</p>
                    </div>
                  </div>
                </body>
                </html>
              `;
              
              await sendEmail(email, "🏆 New Certificate Added to Your Account - AI Authority", certificateEmailContent);
            } catch (emailError) {
              console.error("Failed to send certificate notification email:", emailError);
              // Don't block upload if email fails
            }

            console.log('Certificate uploaded successfully:', newCert);
            res.json({
              message: 'Certificate uploaded and added successfully!',
              certificate: newCert,
            });
          } catch (dbError) {
            console.error('Database error:', dbError);
            res.status(500).json({ error: 'Failed to save certificate to database' });
          }
        }
      );

      // Pipe the file buffer to Cloudinary
      uploadStream.end(req.file.buffer);
    } catch (error) {
      console.error('Unexpected error during upload:', error);
      res.status(500).json({ error: 'Failed to upload certificate' });
    }
  });
};

export const getCertificates = async (req, res) => {
  const { email, name } = req.query;
  try {
    // Build query to search by email or name (case-insensitive)
    let query = {};
    
    if (email && name) {
      // Search for certificates matching both email and name
      query = {
        $or: [
          { email: { $regex: email, $options: 'i' } },
          { name: { $regex: name, $options: 'i' } }
        ]
      };
    } else if (email) {
      // Search by email only
      query = { email: { $regex: email, $options: 'i' } };
    } else if (name) {
      // Search by name only
      query = { name: { $regex: name, $options: 'i' } };
    } else {
      // No search parameter provided
      return res.status(400).json({ error: 'Please provide email or name to search' });
    }
    
    const certificates = await Certificate.find(query).sort({ issuedDate: -1 });
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
};

export const getAllCertificates = async (req, res) => {
  try {
    // Fetch all certificates and sort by issuedDate (most recent first)
    const certificates = await Certificate.find()
      .sort({ issuedDate: -1 })
      .lean();
    
    res.json(certificates);
  } catch (error) {
    console.error('Error fetching all certificates:', error);
    res.status(500).json({ error: 'Failed to fetch certificates' });
  }
};

export const deleteCertificate = async (req, res) => {
  try {
    const { email, certificateId } = req.params;
    
    console.log('Delete request received:', { email, certificateId });
    
    // Find the certificate
    const certificate = await Certificate.findById(certificateId);
    
    if (!certificate) {
      return res.status(404).json({ error: 'Certificate not found' });
    }
    
    // Verify the certificate belongs to the specified email
    if (certificate.email !== email) {
      return res.status(403).json({ error: 'Certificate does not belong to the specified user' });
    }
    
    // Delete from Cloudinary if it has a cloudinaryPublicId
    if (certificate.cloudinaryPublicId) {
      try {
        await cloudinary.uploader.destroy(certificate.cloudinaryPublicId);
        console.log('Image deleted from Cloudinary:', certificate.cloudinaryPublicId);
      } catch (cloudinaryError) {
        console.warn('Failed to delete from Cloudinary:', cloudinaryError);
        // Continue with deletion from database even if Cloudinary fails
      }
    }
    
    // Delete from database
    await Certificate.findByIdAndDelete(certificateId);
    
    // Remove from user's certificates array
    await User.updateOne(
      { email: email },
      { $pull: { certificates: certificateId } }
    );
    
    console.log('Certificate deleted successfully:', certificateId);
    res.json({ message: 'Certificate deleted successfully' });
    
  } catch (error) {
    console.error('Error deleting certificate:', error);
    res.status(500).json({ error: 'Failed to delete certificate' });
  }
};

export const updateCertificate = async (req, res) => {
  upload.single('certificateFile')(req, res, async (err) => {
    try {
      if (err instanceof multer.MulterError) {
        console.error('Multer error:', err);
        return res.status(400).json({ error: `Upload error: ${err.message}` });
      } else if (err) {
        console.error('File filter error:', err);
        return res.status(400).json({ error: err.message });
      }

      const { id } = req.params;
      const { name, email, certificationType, company, issuedDate } = req.body;
      
      console.log('Update request received:', { id, name, email, certificationType, company, issuedDate, hasFile: !!req.file });
      
      // Validate required fields
      if (!name || !email || !certificationType) {
        return res.status(400).json({ error: 'Name, email, and certificate type are required' });
      }
      
      // Find the certificate
      const certificate = await Certificate.findById(id);
      
      if (!certificate) {
        return res.status(404).json({ error: 'Certificate not found' });
      }
      
      const oldEmail = certificate.email;
      const oldCertType = certificate.certificationType;
      const oldCloudinaryPublicId = certificate.cloudinaryPublicId;
      
      // If email or certificate type is changing, check for duplicates
      if (email !== oldEmail || certificationType !== oldCertType) {
        const existingCert = await Certificate.findOne({
          _id: { $ne: id }, // Exclude the current certificate
          email: email,
          certificationType: certificationType
        });
        
        if (existingCert) {
          return res.status(400).json({ 
            error: `This email already has a ${certificationType} certificate. Each email can only have one certificate of each type.` 
          });
        }
      }
      
      // If there's a new file, upload it to Cloudinary
      if (req.file) {
        console.log('New file uploaded, replacing old certificate file');
        
        // Delete old file from Cloudinary
        if (oldCloudinaryPublicId) {
          try {
            await cloudinary.uploader.destroy(oldCloudinaryPublicId);
            console.log('Old file deleted from Cloudinary:', oldCloudinaryPublicId);
          } catch (cloudinaryError) {
            console.warn('Failed to delete old file from Cloudinary:', cloudinaryError);
          }
        }
        
        // Upload new file to Cloudinary
        const uploadPromise = new Promise((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'certificates',
              resource_type: 'auto',
              public_id: `cert_${Date.now()}_${Math.round(Math.random() * 1e9)}`,
            },
            (error, result) => {
              if (error) {
                console.error('Cloudinary upload error:', error);
                reject(error);
              } else {
                console.log('New file uploaded to Cloudinary:', result);
                resolve(result);
              }
            }
          );
          uploadStream.end(req.file.buffer);
        });
        
        const cloudinaryResult = await uploadPromise;
        
        // Update certificate with new file URL (use imageUrl to match schema)
        certificate.imageUrl = cloudinaryResult.secure_url;
        certificate.cloudinaryPublicId = cloudinaryResult.public_id;
      }
      
      // Update other certificate fields
      certificate.name = name;
      certificate.email = email;
      certificate.course = certificationType;
      certificate.certificationType = certificationType;
      certificate.company = company || '-';
      
      // Update issued date if provided (parse as local date to avoid timezone issues)
      if (issuedDate) {
        // Parse YYYY-MM-DD as local date at noon to prevent timezone shifts
        const [year, month, day] = issuedDate.split('-').map(Number);
        certificate.issuedDate = new Date(year, month - 1, day, 12, 0, 0);
        console.log('Updated issued date to:', certificate.issuedDate, '(parsed from:', issuedDate, ')');
      }
      
      await certificate.save();
      
      // If email changed, update user associations
      if (oldEmail !== email) {
        // Remove from old user
        await User.updateOne(
          { email: oldEmail },
          { $pull: { certificates: id } }
        );
        
        // Add to new user (or create user if doesn't exist)
        await User.findOneAndUpdate(
          { email: email },
          { $addToSet: { certificates: id } },
          { new: true, upsert: true }
        );
      }
      
      console.log('Certificate updated successfully:', certificate);
      res.json({ message: 'Certificate updated successfully', certificate });
      
    } catch (error) {
      console.error('Error updating certificate:', error);
      res.status(500).json({ error: 'Failed to update certificate' });
    }
  });
};
import { FaFacebookF, FaTwitter, FaYoutube, FaTelegramPlane } from "react-icons/fa";

export default function Contact() {
  return (
    <div className="flex flex-col min-h-screen bg-[#FAFAFA] text-[#333] font-sans">
      {/* Contact Section */}
      <div className="max-w-7xl w-full mx-auto px-6 py-16 flex flex-col md:flex-row justify-between gap-12 flex-grow">
        {/* Left Section */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-3xl font-bold text-[#111]">Contact Us</h1>
          <p className="text-gray-600">
            If you have a specific question or want to get in touch, please use the form.
          </p>

          <div className="space-y-4 mt-6 text-[16px] leading-relaxed">
            {/* Address */}
            <div className="flex items-start gap-3">
              <span className="text-[#e74c3c] text-xl">📍</span>
              <p className="text-[#e74c3c] whitespace-nowrap">
                850 Stephenson Hwy Suite 205, Troy, MI 48083
              </p>
            </div>

            {/* Email */}
            <div className="flex items-start gap-3">
              <span className="text-[#e74c3c] text-xl">✉️</span>
              <p className="text-[#e74c3c]">sdone@ai-authority.ai</p>
            </div>

            {/* Phone */}
            <div className="flex items-start gap-3">
              <span className="text-[#e74c3c] text-xl">📞</span>
              <p className="text-[#e74c3c]">+1 248-719-2613</p>
            </div>
          </div>

          {/* Socials */}
          <div className="mt-10">
            <h2 className="text-lg font-semibold text-[#111] mb-4">Follow Us</h2>
            <div className="flex space-x-4 text-white">
              {[FaFacebookF, FaTwitter, FaYoutube, FaTelegramPlane].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="bg-[#e74c3c] hover:bg-[#d63b2b] p-3 rounded-full transition-colors"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right Section - Contact Form */}
        <div className="md:w-1/2 bg-transparent p-0">
          <p className="text-gray-600 mb-8">
            We would like to hear from you. Please send us a message by filling out
            the form below and we will get back to you shortly.
          </p>

          <form className="space-y-6">
            {/* Name */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  First Name <span className="text-[#e74c3c]">*</span>
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#e74c3c]"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#e74c3c]"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="email"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#e74c3c]"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Phone <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="tel"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#e74c3c]"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Subject <span className="text-[#e74c3c]">*</span>
              </label>
              <input
                type="text"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#e74c3c]"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Message <span className="text-[#e74c3c]">*</span>
              </label>
              <textarea
                rows="4"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:border-[#e74c3c] resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#e74c3c] hover:bg-[#d63b2b] text-white px-5 py-2 text-lg font-medium rounded transition-all duration-300"
            >
              Submit
            </button>

          </form>
        </div>
      </div>

      {/* Full-width Google Map */}
      <div className="w-full h-[400px]">
        <iframe
          title="Google Map - 850 Stephenson Hwy"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2948.964174123533!2d-83.1121239234403!3d42.55426552625479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8824c52b2e9863d5%3A0xd41c313cf53f0b45!2s850%20Stephenson%20Hwy%20%23205%2C%20Troy%2C%20MI%2048083%2C%20USA!5e0!3m2!1sen!2sin!4v1697030440972!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}

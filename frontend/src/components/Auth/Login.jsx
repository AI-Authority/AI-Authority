import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../../services/api"; 

export default function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // ✅ Use the API helper instead of hard-coding fetch
        const { data } = await loginUser({
          email: formData.email,
          password: formData.password,
        });

        setMessage("Login successful!");
        localStorage.setItem("userToken", data.token);
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("isAdmin", String(data.user.isAdmin));
        
        // Store trainerId if user is a trainer
        if (data.user.type === "trainer_membership") {
          localStorage.setItem("trainerId", data.user.id);
        }

        // Dispatch storage event to notify header of changes
        window.dispatchEvent(new Event("storage"));

        setTimeout(() => {
          navigate(data.user.isAdmin ? "/admin/dashboard" : "/profile");
        }, 800);
      } else {
        await registerUser(formData);
        setMessage("Registration successful! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || err.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          {isLogin ? "Login to Your Account" : "Create Your Account"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
                required
              />
            </>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        {message && (
          <p className="mt-4 text-center text-gray-600 text-sm">{message}</p>
        )}

        <div className="mt-4 text-center">
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-600 hover:underline text-sm"
          >
            {isLogin
              ? "Don't have an account? Sign up"
              : "Already have an account? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
}

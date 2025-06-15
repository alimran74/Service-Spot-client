import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import { motion } from "framer-motion";
import registerAnimation from "../assets/register-animation.json";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const photoURL = form.photoURL.value;
    const password = form.password.value;

    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);

    if (!uppercase || !lowercase || password.length < 6) {
      setError(
        "Password must have uppercase, lowercase and be at least 6 characters long."
      );
      toast.error("❌ Password must have uppercase, lowercase and 6+ characters.");
      return;
    }

    createUser(email, password)
      .then(() => {
        updateUserProfile(name, photoURL)
          .then(() => {
            toast.success("✅ Registration Successful!");
            navigate("/");
          })
          .catch(() => {
            toast.error("❌ Failed to update profile");
          });
      })
      .catch((err) => {
        setError(err.message);
        toast.error("❌ " + err.message);
      });
  };

  return (
    <div className="min-h-screen bg-[#8ECAE6] flex flex-col md:flex-row items-center justify-center px-4 py-10 gap-8">
      {/* Animation */}
      <div className="w-full md:w-1/2 max-w-md">
        <Lottie animationData={registerAnimation} loop={true} />
      </div>

      
      <motion.form
        onSubmit={handleRegister}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[#219EBC] shadow-2xl rounded-xl p-8 shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white ">
          Register Here!
        </h2>

        <label className="label text-gray-600">Your Name</label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="input input-bordered w-full mb-3 bg-white border border-gray-800 text-black placeholder-gray-300"
        />
        
        <label className="label text-gray-600">Your Email</label>
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="input input-bordered w-full mb-3 bg-white border border-gray-800 text-black placeholder-gray-300"
        />


        <label className="label text-gray-600">Photo URL</label>
        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="input input-bordered w-full mb-3 bg-white border border-gray-800 text-black placeholder-gray-300"
        />


        <label className="label text-gray-600">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="input input-bordered w-full mb-3 bg-white border border-gray-800 text-black placeholder-gray-300"
        />

        {error && <p className="text-red-300 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="btn w-full bg-[#023047] hover:bg-[#03557d] text-white font-semibold mb-3"
        >
          Register
        </button>

        <p className="text-center text-sm text-gray-300 mt-4">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-yellow-300 hover:underline font-semibold"
          >
            Login
          </Link>
        </p>
      </motion.form>
    </div>
  );
};

export default Register;

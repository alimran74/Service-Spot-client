import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router"; // Fixed import
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
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

    // Password Validation
    const uppercase = /[A-Z]/.test(password);
    const lowercase = /[a-z]/.test(password);

    if (!uppercase || !lowercase || password.length < 6) {
      setError("Password must have uppercase, lowercase and be at least 6 characters long.");
      toast.error("❌ Password must have uppercase, lowercase and 6+ characters.");
      return;
    }

    // Firebase Register
    createUser(email, password)
      .then((result) => {
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
    <div className="min-h-screen bg-[#8ECAE6] flex flex-col md:flex-row items-center justify-center px-4 py-10 gap-10">
      
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 max-w-md">
        <Lottie animationData={registerAnimation} loop={true} />
      </div>

      {/* Registration Form */}
      <form
        onSubmit={handleRegister}
        className="bg-[#219EBC] w-full max-w-md p-6 rounded-lg shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-white">
          Register Here!
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="input input-bordered w-full mb-3"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="input input-bordered w-full mb-3"
        />

        <input
          type="text"
          name="photoURL"
          placeholder="Photo URL"
          className="input input-bordered w-full mb-3"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="input input-bordered w-full mb-3"
        />

        {error && <p className="text-red-200 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="btn bg-[#023047] hover:bg-[#03557d] text-white w-full"
        >
          Register
        </button>

        <p className="text-center text-white mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-yellow-300 hover:underline font-medium">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;

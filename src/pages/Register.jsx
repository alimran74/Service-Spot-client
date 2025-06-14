import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";

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
            navigate("/"); // Redirect to homepage or dashboard
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
    <div className="flex items-center justify-center min-h-screen  p-4 bg-[#8ECAE6]">
      <form
        onSubmit={handleRegister}
        className="bg-[#219EBC] p-6 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center text-white">
          Register here !
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

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <button
          type="submit"
          className="btn btn-primary w-full bg-[#023047] hover:bg-[#6284e2d7]"
        >
          Register
        </button>

        <p className="text-center mt-4 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-white  hover:text-[#ffd903f1]">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
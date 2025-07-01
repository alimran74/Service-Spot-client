import React, { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import loginAnimation from "../assets/login-animation.json";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = useContext(AuthContext);

  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then(() => {
        toast.success("✅ Login successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`❌ ${error.message}`);
      });
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(() => {
        toast.success("✅ Google Login successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`❌ ${error.message}`);
      });
  };

  return (
    <div className="min-h-screen bg-[#8ECAE6] flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-8">
      <Helmet>
              <title>ServiceSpot | LogIn</title>
              <meta name="description" content="Book trusted professionals for cleaning, plumbing, repairs & more with ServiceSpot." />
              <meta name="keywords" content="cleaning services, home repair, plumbing, electrician, ServiceSpot" />
              <link rel="canonical" href="https://service-spot-2f7aa.web.app/" />
            </Helmet>
      {/* Lottie Animation */}
      <div className="w-full md:w-1/2 max-w-md">
        <Lottie animationData={loginAnimation} loop={true} />
      </div>

      {/* Login Form with Motion */}
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="card w-full max-w-sm bg-[#219EBC] shadow-2xl rounded-xl"
      >
        <h1 className="text-3xl font-bold text-center pt-6 text-white">
          Login to Your Account
        </h1>

        <form onSubmit={handleLogIn} className="card-body">
          <fieldset className="space-y-4">
            {/* Email */}
            <label className="label text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              className="input input-bordered w-full bg-white border border-gray-400 text-white placeholder-gray-800"
              placeholder="Enter your email"
              required
            />

            {/* Password */}
            <label className="label text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              className="input input-bordered w-full bg-white border border-gray-400 text-gray-800 placeholder-gray-800"
              placeholder="Enter your password"
              required
            />

            <div className="text-right">
              <a className="link link-hover text-white">Forgot password?</a>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              className="btn bg-[#023047] hover:bg-[#03557d] text-white w-full"
            >
              Login
            </button>

            {/* Google Button */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="btn bg-white text-black border border-gray-300 shadow w-full"
            >
              <svg
                aria-label="Google logo"
                width="16"
                height="16"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <g>
                  <path d="m0 0H512V512H0" fill="#fff"></path>
                  <path
                    fill="#34a853"
                    d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                  ></path>
                  <path
                    fill="#4285f4"
                    d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                  ></path>
                  <path
                    fill="#fbbc02"
                    d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                  ></path>
                  <path
                    fill="#ea4335"
                    d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                  ></path>
                </g>
              </svg>
              <span className="ml-2">Login with Google</span>
            </button>

            {/* Register Link */}
            <p className="text-center text-white pt-4">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-yellow-300 hover:underline font-semibold"
              >
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;

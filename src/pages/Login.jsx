import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { toast } from "react-toastify";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, signInWithGoogle } = use(AuthContext);
  const handleLogIn = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signIn(email, password)
      .then((result) => {
        const user = result.user;
        toast.success("✅ Login successful");
        navigate("/");
      })
      .catch((error) => {
        // const errorCode = error.code;
        const errorMessage = error.message;
        toast.error(`❌ ${errorMessage}`);
      });
  };
  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then((result) => {
        toast.success("✅ Google Login successful");
        navigate("/");
      })
      .catch((error) => {
        toast.error(`❌ ${error.message}`);
      });
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4 bg-purple-100">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <h1 className="font-semibold text-2xl text-center py-5 text-purple-600">
          Login to Your Account
        </h1>
        <form onSubmit={handleLogIn} className="card-body">
          <fieldset className="fieldset">
            {/* email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
            />

            {/* password */}
            <label className="label">Password</label>
            <input
              name="password"
              type="password"
              className="input"
              placeholder="Password"
            />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>

            <button
              type="submit"
              className="btn btn-neutral mt-4 w-full  bg-purple-600 hover:bg-purple-700 "
            >
              Login
            </button>

            {/* google btn */}
            <button
              onClick={handleGoogleLogin}
              type="button"
              className="btn bg-white text-black border-[#e5e5e5] shadow mt-2"
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
              Login with Google
            </button>

            <p className="font-semibold text-center pt-6">
              Don't have An Account ?{" "}
              <Link className="text-blue-500" to="/register">
                Register
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Mail, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const ForgetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const { isSubmitting, forgotPassword } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    navigate(`/reset-password?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
          <p className="z-1 text-base-content/60">
            Enter your email address and we'll send you a OTP to reset your
            password.
          </p>
        </div>
        <div className="text-center"></div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="z-1 h-5 w-5 text-base-content/40" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>
          <button
            type="submit"
            className="btn btn-primary w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                Sending...
              </>
            ) : (
              "Send OTP"
            )}
          </button>
        </form>
        <div className="text-center mt-4">
          <Link to="/login" className="link link-primary text-md">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgetPasswordPage;

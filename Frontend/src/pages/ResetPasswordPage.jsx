import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { Hash, Lock, Eye, EyeOff, Loader2 } from "lucide-react";

const ResetPasswordPage = () => {
  const [showOtp, setShowOtp] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const emailFromQuery = searchParams.get("email") || "";
  const { resetPassword, isSubmitting } = useAuthStore();

  const validateForm = () => {
    if (!emailFromQuery) {
      toast.error("Incorrect Email");
      return false;
    }
    if (!formData.otp.trim()) {
      toast.error("OTP is required");
      return false;
    }
    if (!formData.newPassword) {
      toast.error("New password is required");
      return false;
    }
    if (!formData.confirmPassword) {
      toast.error("Confirm password is required");
      return false;
    }
    if (
      formData.newPassword.length < 8 ||
      formData.confirmPassword.length < 8
    ) {
      toast.error("Password must be at least 8 characters");
      return false;
    }
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    const result = await resetPassword({
      email: emailFromQuery,
      otp: formData.otp,
      newPassword: formData.newPassword,
    });
    if (
      result === true ||
      (result && result.message === "Password reset successful")
    ) {
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-100">
      <div className="w-full max-w-md p-8 space-y-8 rounded-xl shadow-2xl">
        <div className="text-center mb-4">
          <h1 className="text-2xl font-bold mb-2">Reset Password</h1>
          <p className="text-base-content/60">
            Enter the OTP sent to your email and choose a new password.
          </p>
          {emailFromQuery && (
            <p className="text-sm text-base-content/60 mt-1">
              For: {emailFromQuery}
            </p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium pb-2">OTP</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Hash className="z-1 h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showOtp ? "text" : "password"}
                inputMode="numeric"
                className="input input-bordered w-full pl-10"
                placeholder="6-digit code"
                value={formData.otp}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, otp: e.target.value }))
                }
                required
                autoComplete="one-time-code"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowOtp((v) => !v)}
                tabIndex={-1}
                aria-label={showOtp ? "Hide OTP" : "Show OTP"}
              >
                {showOtp ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium pb-2">New Password</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="z-1 h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showNewPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={formData.newPassword}
                onChange={(e) =>
                  setFormData((s) => ({ ...s, newPassword: e.target.value }))
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowNewPassword((v) => !v)}
                aria-label={showNewPassword ? "Hide password" : "Show password"}
              >
                {showNewPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium pb-2">
                Confirm Password
              </span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="z-1 h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData((s) => ({
                    ...s,
                    confirmPassword: e.target.value,
                  }))
                }
                required
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowConfirmPassword((v) => !v)}
                aria-label={
                  showConfirmPassword ? "Hide password" : "Show password"
                }
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
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
                Resetting...
              </>
            ) : (
              "Reset Password"
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

export default ResetPasswordPage;

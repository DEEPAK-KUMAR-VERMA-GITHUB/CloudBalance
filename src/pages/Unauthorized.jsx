import { Lock } from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg bg-white shadow-lg rounded-lg p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 border border-blue-300 mb-4">
            <Lock className="w-8 h-8 text-blue-600" aria-hidden="true" />
          </div>

          <h1 className="mt-4 text-2xl font-bold text-gray-800">
            Access Denied
          </h1>
          <p className="mt-2 text-sm text-gray-600 max-w-md">
            You don’t have permission to view this page. If you believe this is
            a mistake, please sign in with an account that has access or contact
            an administrator.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => navigate(-1)}
              className="w-full sm:w-auto px-4 py-2 rounded-md bg-gray-200 hover:bg-gray-300 text-gray-800 transition"
            >
              Go Back
            </button>

            <Link
              to="/login"
              className="w-full sm:w-auto px-4 py-2 rounded-md bg-blue-600 text-white font-medium text-center hover:bg-blue-700 transition"
            >
              Sign In
            </Link>
          </div>

          <small className="mt-4 text-xs text-gray-500">
            Error code: 401 — Unauthorized
          </small>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Unauthorized);

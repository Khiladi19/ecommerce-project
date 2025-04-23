import React from "react";
import { useSelector } from "react-redux";
import Spinner from "../components/Spinner";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 px-4">
      <div className="w-full max-w-sm bg-white shadow-xl rounded-xl p-6 sm:p-8">
        <div className="flex flex-col items-center space-y-4">
          <img
            src={`https://ui-avatars.com/api/?name=${user?.name || "U N"}&background=random`}
            alt="avatar"
            className="w-24 h-24 rounded-full shadow-md"
          />
          <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        </div>

        {user ? (
          <div className="mt-6 space-y-3 text-center text-gray-700">
            <p>
              <span className="font-semibold">Name:</span> {user.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {user.email}
            </p>
            {/* Optional extra fields:
            <p><span className="font-semibold">Phone:</span> {user.phone}</p>
            <p><span className="font-semibold">Role:</span> {user.role}</p>
            */}
          </div>
        ) : (
          <div className="mt-6">
            <Spinner />
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;



import React from "react";
import { Navigate } from "react-router-dom";
import UserProfile from "./UserProfile";

export default function ProfileRouter() {
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  // If user is admin, redirect to admin membership applications dashboard
  if (isAdmin) {
    return <Navigate to="/admin/membership-applications" replace />;
  }

  // Otherwise show user profile
  return <UserProfile />;
}

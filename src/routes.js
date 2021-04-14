import React from "react";
import { Navigate } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import DashboardView from "./views/DashboardView";
import LoginView from "./views/auth/LoginView";
import NotFoundView from "./views/errors/NotFoundView";
import CookiesView from "./views/CookiesView";
import PrivacyView from "./views/PrivacyView";
import HomeView from "./views/HomeView";

const routes = [
  {
    path: "app",
    element: <DashboardLayout />,
    children: [
      { path: "dashboard", element: <DashboardView /> },
      { path: "home", element: <HomeView /> },
      { path: "privacy", element: <PrivacyView /> },
      { path: "cookies", element: <CookiesView /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "login", element: <LoginView /> },
      { path: "404", element: <NotFoundView /> },
      { path: "/", element: <Navigate to="/app/home" /> },
      { path: "*", element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;

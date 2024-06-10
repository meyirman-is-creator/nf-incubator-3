"use client";

import React, { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './globals.css'

interface LayoutProps {
  children: ReactNode;
}

const LayoutComponent: React.FC<LayoutProps> = ({ children }) => {
  const { isAuthenticated, logout } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className="container mx-auto px-4">
      <nav className="flex justify-between items-center py-6">
        <ul className="flex gap-6">
          <li>
            <Link href="/home" className="text-gray-900 dark:text-gray-100">
              Home
            </Link>
          </li>
          {isAuthenticated ? (
            <li>
              <button
                onClick={logout}
                className="text-gray-900 dark:text-gray-100"
              >
                Logout
              </button>
            </li>
          ) : (
            <li>
              <Link href="/login" className="text-gray-900 dark:text-gray-100">
                Login
              </Link>
            </li>
          )}
          <li>
            <Link
              href="/manage-posts"
              className="text-gray-900 dark:text-gray-100"
            >
              Manage Posts
            </Link>
          </li>
        </ul>
        <ThemeToggle />
      </nav>
      <main>{children}</main>
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My Blog</title>
      </head>
      <body>
        <AuthProvider>
          <ThemeProvider>
            <LayoutComponent>{children}</LayoutComponent>
            <ToastContainer />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default Layout;

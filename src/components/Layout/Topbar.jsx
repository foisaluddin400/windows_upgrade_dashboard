"use client";

import {
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Search,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { useGetProfileQuery } from "../../redux/api/userApi";

const Topbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const profileRef = useRef(null);
  const notificationRef = useRef(null);
  const { data: adminProfile } = useGetProfileQuery();
  console.log(adminProfile);
  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New task assigned",
      message: "You have been assigned to 'Fix leaking tap'",
      time: "5 min ago",
      unread: true,
    },
    {
      id: 2,
      title: "Payment received",
      message: "₦2,500 payment has been processed",
      time: "1 hour ago",
      unread: true,
    },
    {
      id: 3,
      title: "Task completed",
      message: "Your task 'House cleaning' is completed",
      time: "2 hours ago",
      unread: false,
    },
  ];
  return (
    <header className="w-full bg-white shadow-sm flex items-center justify-between px-4 py-4.5 sticky top-0 z-30 pr-20">
      {/* Page Title */}

      <div className=""></div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notification Dropdown */}
        <div className="relative" ref={notificationRef}>
          <button
            onClick={() => {
              setIsNotificationOpen(!isNotificationOpen);
              setIsProfileOpen(false);
            }}
            className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            {/* Unread badge */}
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Notification Dropdown Menu */}
          {isNotificationOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">Notifications</h3>
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded-full">
                    2 New
                  </span>
                </div>
              </div>

              <div className="max-h-96 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                      notification.unread ? "bg-blue-50" : ""
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {notification.unread && (
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm text-gray-900 mb-1">
                          {notification.title}
                        </p>
                        <p className="text-xs text-gray-600 mb-2">
                          {notification.message}
                        </p>
                        <p className="text-xs text-gray-400">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {/* 
            <div className="p-3 border-t border-gray-200 text-center">
              <button className="text-sm text-[#115e59] hover:text-[#0d4a42] font-medium">
                View all notifications
              </button>
            </div> */}
            </div>
          )}
        </div>

        {/* Profile Dropdown */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => {
              setIsProfileOpen(!isProfileOpen);
              setIsNotificationOpen(false);
            }}
            className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <img
              src="https://i.pravatar.cc/40?img=2"
              alt="Profile"
              className="w-9 h-9 rounded-full border-2 border-gray-200"
            />
            <div className="hidden sm:block text-left">
              <p className="text-sm font-medium text-gray-900">
                {adminProfile?.data?.name}
              </p>
              <p className="text-xs  bg-[#e6f4f1] text-[#115e59]  px-2 py-1 font-bold rounded-md inline-block">
                Admin
              </p>
            </div>
            <div className="p-1 rounded-sm bg-[#e6f4f1]">
              <ChevronDown
                className={`w-4 h-4  text-[#115e59] font-bold transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </div>
          </button>

          {/* Profile Dropdown Menu */}
          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
              {/* User Info Section */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex items-center gap-3">
                  <img
                    src="https://i.pravatar.cc/40?img=2"
                    alt="Profile"
                    className="w-12 h-12 rounded-full border-2 border-gray-200"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {adminProfile?.data?.name}
                    </p>
                    <p className="text-xs text-gray-500">jane@example.com</p>
                  </div>
                </div>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <Link
                  to="/profile-setting"
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left"
                >
                  <Settings className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">Profile Setting</span>
                </Link>
              </div>

              {/* Sign Out */}
              <div className="border-t border-gray-200 py-2">
                <button
                  
                  className="flex items-center space-x-3 px-4 py-2 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Topbar;

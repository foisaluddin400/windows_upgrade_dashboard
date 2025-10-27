/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  LayoutDashboard,
  Users,
  ClipboardList,
  Layers,
  Share2,
  Tag,
  CreditCard,
  RotateCcw,
  AlertTriangle,
  DollarSign,
  Settings,
  HelpCircle,
  Shield,
  FileText,
  LogOut,
} from "lucide-react";
import { Link, NavLink } from "react-router";
import { TbCategoryPlus, TbCurrencyNaira } from "react-icons/tb";
import { FaNairaSign } from "react-icons/fa6";

const navItems = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Users", path: "/users", icon: Users },
  { name: "Task Providers", path: "/task-providers", icon: ClipboardList },
  { name: "Active Tasks", path: "/active-tasks", icon: Layers },
  { name: "Service Category", path: "/service-category", icon: TbCategoryPlus },
  { name: "Manage Referrals", path: "/manage-referrals", icon: Share2 },
  { name: "Manage Promo", path: "/manage-promo", icon: Tag },
  { name: "Manage Payments", path: "/manage-payments", icon: CreditCard },
  { name: "Manage Refund", path: "/manage-refund", icon: RotateCcw },
  { name: "Manage Dispute", path: "/manage-dispute", icon: AlertTriangle },
  { name: "Earnings", path: "/earnings", icon: TbCurrencyNaira },
  { name: "Profile Setting", path: "/profile-setting", icon: Settings },
  { name: "FAQ", path: "/faq", icon: HelpCircle },
  { name: "Privacy Policy", path: "/privacy-policy", icon: Shield },
  { name: "Terms & condition", path: "/terms-condition", icon: FileText },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-teal-600 text-white rounded-md"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-40 transform 
        ${isOpen ? "translate-x-0" : "-translate-x-full"} 
        lg:translate-x-0 transition-transform duration-300 flex flex-col`}
      >
        {/* Logo */}
        <div className="border-b border-gray-300 py-6 flex items-center justify-center ">
          <img src="/task_alley_logo.svg" alt="TaskAlley" className="w-28" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col p-4 space-y-2 overflow-y-auto">
          {navItems.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={name}
              to={path}
              end
              className={({ isActive }) =>
                `relative flex items-center space-x-3 px-4 py-2 rounded-md transition font-medium
     ${
       isActive
         ? "text-white bg-[#115E59] ml-2 before:absolute before:left-[-8px] before:top-0 before:bottom-0 before:w-1 before:bg-[#115E59] before:rounded-r"
         : "text-gray-700 hover:bg-green-50 hover:text-[#115E59]"
     }`
              }
              onClick={() => setIsOpen(false)}
            >
              <Icon className="w-5 h-5 " />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-300">
          <Link
            to="/login"
            className="flex items-center space-x-3 px-4 py-2 w-full text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-md transition"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign out</span>
          </Link>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

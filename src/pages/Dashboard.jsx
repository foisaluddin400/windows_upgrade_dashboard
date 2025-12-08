import React, { useState } from "react";
import UserGrowth from "../components/Charts/UserGrowth";
import TaskProviderGrowth from "../components/Charts/TaskProviderGrowth";
import DashboardStatsCard from "../components/Cards/DashboardStatsCard";
import AllUsersTab from "../components/Tabs/AllUsersTab";
import { Link } from "react-router";

const users = [
  {
    id: 1,
    name: "Russell Vaurn",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(205) 555-0100",
    email: "zitka@mail.ru",
    joined: "2025-01-10",
    activeTasks: 2,
    isOnline: true,
  },
  {
    id: 2,
    name: "Tracy Grady",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(207) 555-0119",
    email: "jolie@gmail.com",
    joined: "2025-01-10",
    activeTasks: 0,
    isOnline: false,
  },
  {
    id: 3,
    name: "Dana Daniel",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(205) 555-0100",
    email: "ulfaha@mail.ru",
    joined: "2025-01-10",
    activeTasks: 2,
    isOnline: true,
  },
  {
    id: 4,
    name: "Gerardo Barrows",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(316) 555-0116",
    email: "seema@gmail.com",
    joined: "2025-01-10",
    activeTasks: 0,
    isOnline: false,
  },
  {
    id: 5,
    name: "Sheryl Gusikowski",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(205) 555-0104",
    email: "ohana@mail.ru",
    joined: "2025-01-10",
    activeTasks: 2,
    isOnline: true,
  },
  {
    id: 6,
    name: "Theodore Mosciski",
    avatar:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(307) 555-0133",
    email: "cadence@gmail.com",
    joined: "2025-01-10",
    activeTasks: 0,
    isOnline: false,
  },
  {
    id: 7,
    name: "Theodore Mosciski",
    avatar:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(205) 555-0100",
    email: "fellora@mail.ru",
    joined: "2025-01-10",
    activeTasks: 2,
    isOnline: true,
  },
  {
    id: 8,
    name: "Daniel Walker IV",
    avatar:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(225) 555-0118",
    email: "seanmnd@mail.ru",
    joined: "2025-01-10",
    activeTasks: 2,
    isOnline: true,
  },
  {
    id: 9,
    name: "Ms. Natasha Spinka",
    avatar:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(207) 555-0119",
    email: "sterris@gmail.com",
    joined: "2025-01-10",
    activeTasks: 0,
    isOnline: false,
  },
  {
    id: 10,
    name: "Forrest Kuhic",
    avatar:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face&round=full",
    mobile: "(316) 555-0116",
    email: "moka@vandes.ru",
    joined: "2025-01-10",
    activeTasks: 0,
    isOnline: false,
  },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="">
      <DashboardStatsCard />
      <div className="flex flex-col md:flex-row">
        <UserGrowth />
        <TaskProviderGrowth />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <h1 className="text-xl py-2 pb-4 sm:text-2xl font-semibold text-gray-800">
            Users
          </h1>
        </div>

        <Link to="/users">
           <p className="text-xl font-semibold text-[#115e59]">See All</p>
        </Link>
      </div>
      <AllUsersTab
       
      />
    </div>
  );
};

export default Dashboard;

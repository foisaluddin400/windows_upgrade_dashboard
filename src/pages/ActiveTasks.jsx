/* eslint-disable no-unused-vars */
import { useState } from "react";
import {
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  Download,
  Layers,
} from "lucide-react";
import { Link } from "react-router";
import { Navigate } from "../Navigate";

const ActiveTasks = () => {
  const [activeTab, setActiveTab] = useState("daily");
  const [currentPeriod, setCurrentPeriod] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Task dataset grouped by periods
  const taskData = {
    daily: [
      [
        {
          id: 1,
          sl: 1,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "AC Installation",
          category: "Electrical",
          assignedTo: null,
          status: "Open for Bids",
        },
        {
          id: 2,
          sl: 2,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Refrigerator Repair",
          category: "Appliances",
          assignedTo: {
            name: "Sam",
            email: "sam@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "In Progress",
        },
        {
          id: 3,
          sl: 3,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "AC Installation",
          category: "Electrical",
          assignedTo: null,
          status: "Open for Bids",
        },
        {
          id: 4,
          sl: 4,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Refrigerator Repair",
          category: "Appliances",
          assignedTo: {
            name: "Sam",
            email: "sam@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "In Progress",
        },
        {
          id: 5,
          sl: 5,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "AC Installation",
          category: "Electrical",
          assignedTo: null,
          status: "Open for Bids",
        },
        {
          id: 6,
          sl: 6,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Refrigerator Repair",
          category: "Appliances",
          assignedTo: {
            name: "Sam",
            email: "sam@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "In Progress",
        },
        {
          id: 7,
          sl: 7,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "AC Installation",
          category: "Electrical",
          assignedTo: null,
          status: "Open for Bids",
        },
        {
          id: 8,
          sl: 8,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Refrigerator Repair",
          category: "Appliances",
          assignedTo: {
            name: "Sam",
            email: "sam@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "In Progress",
        },
        {
          id: 9,
          sl: 9,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "AC Installation",
          category: "Electrical",
          assignedTo: null,
          status: "Open for Bids",
        },
        {
          id: 10,
          sl: 10,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Refrigerator Repair",
          category: "Appliances",
          assignedTo: {
            name: "Sam",
            email: "sam@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "In Progress",
        },
      ],
      [
        {
          id: 11,
          sl: 11,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Fan Cleaning",
          category: "Cleaning",
          assignedTo: null,
          status: "Open for Bids",
        },
      ],
    ],
    weekly: [
      [
        {
          id: 4,
          sl: 1,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Plumbing Fix",
          category: "Plumbing",
          assignedTo: {
            name: "Alex",
            email: "alex@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "Completed",
        },
      ],
    ],
    monthly: [
      [
        {
          id: 5,
          sl: 1,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Washing Machine Setup",
          category: "Appliances",
          assignedTo: null,
          status: "Cancelled",
        },
      ],
    ],
    yearly: [
      [
        {
          id: 6,
          sl: 1,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "House Painting",
          category: "Construction",
          assignedTo: {
            name: "Chris",
            email: "chris@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "Dispute",
        },
      ],
    ],
    lifetime: [
      [
        {
          id: 7,
          sl: 1,
          postedBy: {
            name: "Floyd Miles",
            email: "danten@mail.ru",
            avatar:
              "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=40&h=40&fit=crop&crop=face&round=full",
          },
          taskTitle: "Full House Maintenance",
          category: "General",
          assignedTo: {
            name: "Sam",
            email: "sam@mail.com",
            avatar:
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=40&h=40&fit=crop&crop=face&round=full",
          },
          status: "Late",
        },
      ],
    ],
  };

  // Get current period tasks
  const currentTasks =
    taskData[activeTab] && taskData[activeTab][currentPeriod]
      ? taskData[activeTab][currentPeriod]
      : [];

  // Stats
  const totalTasks = currentTasks.length;
  const activeTasks = currentTasks.filter(
    (t) => t.status === "Open for Bids" || t.status === "In Progress"
  ).length;
  const completedTasks = currentTasks.filter(
    (t) => t.status === "Completed"
  ).length;
  const cancelledTasks = currentTasks.filter(
    (t) => t.status === "Cancelled"
  ).length;

  // Navigation handlers
  const handlePrevious = () => {
    setCurrentPeriod((prev) => Math.max(0, prev - 1));
    setCurrentPage(1);
  };

  const handleNext = () => {
    setCurrentPeriod((prev) =>
      prev < taskData[activeTab].length - 1 ? prev + 1 : prev
    );
    setCurrentPage(1);
  };

  // Display label
  const getPeriodDisplay = () => {
    switch (activeTab) {
      case "daily":
        return `Day ${currentPeriod + 1}`;
      case "weekly":
        return `Week ${currentPeriod + 1}`;
      case "monthly":
        return `Month ${currentPeriod + 1}`;
      case "yearly":
        return `Year ${2020 + currentPeriod}`;
      case "lifetime":
        return "Lifetime";
      default:
        return "Period";
    }
  };

  // Pagination
  const itemsPerPage = 6;
  const totalPages = Math.ceil(currentTasks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedTasks = currentTasks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Status badge color
  const getStatusColor = (status) => {
    switch (status) {
      case "Open for Bids":
        return "bg-orange-100 text-orange-600 border border-orange-200";
      case "In Progress":
        return "bg-blue-100 text-blue-600 border border-blue-200";
      case "Completed":
        return "bg-green-100 text-green-600 border border-green-200";
      case "Cancelled":
        return "bg-red-100 text-red-600 border border-red-200";
      case "Dispute":
        return "bg-yellow-100 text-yellow-600 border border-yellow-200";
      case "Late":
        return "bg-purple-100 text-purple-600 border border-purple-200";
      default:
        return "bg-gray-100 text-gray-600 border border-gray-200";
    }
  };

  return (
    <div className="p-4">
      <div className="flex items-center justify-between space-x-3 mb-10">
       <Navigate title="Active Tasks" />

        <div>
          <button className="bg-[#115E59] cursor-pointer hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>
      {/* Tabs */}
      <div className="flex flex-wrap space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-6">
        {["daily", "weekly", "monthly", "yearly", "lifetime"].map((tab) => (
          <button
            key={tab}
            onClick={() => {
              setActiveTab(tab);
              setCurrentPeriod(0);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors capitalize ${
              activeTab === tab
                ? "bg-[#115E59] text-white shadow-sm"
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Period navigation */}
      <div className="flex items-center space-x-2 mb-6">
        <button
          onClick={handlePrevious}
          disabled={currentPeriod === 0}
          className="w-10 h-10 bg-[#115E59] hover:bg-teal-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <div className="bg-white border border-gray-300 rounded-lg px-4 py-2 min-w-[150px] text-center">
          <span className="text-sm font-medium text-gray-700">
            {getPeriodDisplay()}
          </span>
        </div>
        <button
          onClick={handleNext}
          disabled={
            !taskData[activeTab] ||
            currentPeriod >= taskData[activeTab].length - 1
          }
          className="w-10 h-10 bg-[#115E59] hover:bg-teal-700 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-2xl font-bold text-gray-900">100</p>
              <p className="text-sm text-gray-600">Total Task</p>
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              ↗ 50%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-2xl font-bold text-gray-900">200</p>
              <p className="text-sm text-gray-600">In Progress Task</p>
            </div>
            <span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded">
              20%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-2xl font-bold text-gray-900">300</p>
              <p className="text-sm text-gray-600">Completed Task</p>
            </div>
            <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
              30%
            </span>
          </div>
        </div>

        <div className="bg-white rounded-xl p-4 border border-gray-200">
          <div className="flex justify-between items-start mb-2">
            <div>
              <p className="text-2xl font-bold text-gray-900">60</p>
              <p className="text-sm text-gray-600">Cancelled Task</p>
            </div>
            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
              70%
            </span>
          </div>
        </div>
      </div>

      {/* Task table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  SI
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Posted By
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Task Title
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Category
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Assigned To
                </th>
                <th className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {paginatedTasks.map((task) => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">{task.sl}</td>
                  <td className="px-4 py-3 flex items-center space-x-2">
                    <img
                      src={task.postedBy.avatar}
                      alt={task.postedBy.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium">
                        {task.postedBy.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {task.postedBy.email}
                      </p>
                    </div>
                  </td>
                  <td className="px-4 py-3">{task.taskTitle}</td>
                  <td className="px-4 py-3">{task.category}</td>
                  <td className="px-4 py-3">
                    {task.assignedTo ? (
                      <div className="flex items-center space-x-2">
                        <img
                          src={task.assignedTo.avatar}
                          alt={task.assignedTo.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <div>
                          <p className="text-sm font-medium">
                            {task.assignedTo.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {task.assignedTo.email}
                          </p>
                        </div>
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                </tr>
              ))}
              {paginatedTasks.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 text-sm"
                  >
                    No tasks available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-1">
        <button
          onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 text-sm disabled:opacity-50"
        >
          ‹
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 text-sm rounded ${
              currentPage === page
                ? "bg-[#115E59] text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
          className="px-3 py-1 text-sm disabled:opacity-50"
        >
          ›
        </button>
      </div>
    </div>
  );
};

export default ActiveTasks;

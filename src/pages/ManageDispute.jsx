import React, { useState } from "react";
import { Navigate } from "../Navigate";
import ManageDisputeExtention from "./ManageDisputeExtention";
import ManageDisputeCancel from "./ManageDisputeCancel";


const ManageDispute = () => {
  const [activeTab, setActiveTab] = useState("EXTENSION");

  return (
    <div className="p-3 sm:p-5">
      <Navigate title="Manage Dispute" />

      {/* Tabs */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit mb-4">
        <button
          onClick={() => setActiveTab("EXTENSION")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "EXTENSION"
              ? "bg-[#115E59] text-white"
              : "text-gray-600"
          }`}
        >
          Extension Request
        </button>

        <button
          onClick={() => setActiveTab("CANCELLATION")}
          className={`px-4 py-2 rounded-md text-sm font-medium ${
            activeTab === "CANCELLATION"
              ? "bg-[#115E59] text-white"
              : "text-gray-600"
          }`}
        >
          Cancellation Request
        </button>
      </div>

      {/* Pages */}
      {activeTab === "EXTENSION" ? (
        <ManageDisputeExtention />
      ) : (
        <ManageDisputeCancel />
      )}
    </div>
  );
};

export default ManageDispute;

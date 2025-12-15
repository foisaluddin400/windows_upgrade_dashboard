import { ArrowLeft, Download, Search, Share2 } from "lucide-react";
import { useState } from "react";
import AllRefund from "../components/Tabs/AllRefund";
import ReferralValue from "../components/Cards/ReferralValue";
import ReferralUses from "../components/Table/ReferralUses";
import { Link } from "react-router";

const ManageReferrals = () => {
  const [activeTab, setActiveTab] = useState("new");

  // Processed refunds data (refunded)

  // Reset page when switching tabs
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className=" p-4 sm:p-6">
      <div>
        {/* Header */}
        <div className="flex flex-col md:flex-row  md:items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Link className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <Share2 className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
              Referrals Management
            </h1>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex  bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => handleTabChange("new")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "new"
                  ? "bg-[#115E59] text-white shadow-sm cursor-pointer"
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
              }`}
            >
              Referral Value
            </button>
            <button
              onClick={() => handleTabChange("processed")}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === "processed"
                  ? "bg-[#115E59] text-white shadow-sm cursor-pointer"
                  : "text-gray-600 hover:text-gray-800 cursor-pointer"
              }`}
            >
              Referral uses
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === "new" ? <ReferralValue /> : <ReferralUses />}
      </div>
    </div>
  );
};

export default ManageReferrals;

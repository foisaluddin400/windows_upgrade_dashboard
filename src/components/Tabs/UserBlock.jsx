import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  useBlockUserMutation,
  useGetSingleUserQuery,
  useUpdateApproveStatusMutation,
} from "../../redux/api/userApi";
import { toast } from "react-toastify";
import { Spin } from "antd";

export default function UserBlock() {
  const { id } = useParams();

  const { data: singleCustomer, isLoading } = useGetSingleUserQuery({ id });
  console.log(singleCustomer);
  const [blockUserData] = useBlockUserMutation();
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("info");
  const [approvedUser] = useUpdateApproveStatusMutation();
  if (isLoading) return <p className="p-10 text-center">Loading...</p>;

  const customer = singleCustomer?.data;
  const handleBlock = async () => {
    const userId = customer?.user?._id;
    try {
      setLoading(true);
      const res = await blockUserData(userId);
      toast.success(res?.data?.message);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const handleApproved = async () => {
    const userId = customer?.user?._id;
    try {
      setLoading(true);
      const res = await approvedUser(userId);
      toast.success(res?.data?.message);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };
  console.log(customer?.user?.isAdminVerified);
  return (
    <div>
      <div className="flex items-center space-x-3 mb-10">
        <Link
          to="/users"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          User Information
        </h1>
      </div>

      <div className="flex flex-col items-center p-6 min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src={customer?.profile_image}
                alt="user"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg ring-4 ring-gray-100 object-cover"
              />
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-[#115E59] rounded-full border-3 border-white flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "info"
                    ? "bg-white text-teal-700 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                User Info
              </button>

              <button
                onClick={() => setActiveTab("doc")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "doc"
                    ? "bg-white text-teal-700 shadow-md"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                User Document
              </button>
            </div>
          </div>

          {/* INFO TAB */}
          {activeTab === "info" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm">
                  Full Name
                </label>
                <input
                  type="text"
                  value={customer?.name}
                  readOnly
                  className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm">
                  Email Address
                </label>
                <input
                  type="email"
                  value={customer?.email}
                  readOnly
                  className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm">
                  Mobile Number
                </label>
                <input
                  type="text"
                  value={customer?.phone}
                  readOnly
                  className="w-full border-2 border-gray-200 rounded-xl p-4 bg-gray-50"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm">
                  Date Joined
                </label>
                <input
                  type="text"
                  value={customer?.createdAt?.slice(0, 10)}
                  readOnly
                  className="w-full border-2 border-gray-200 rounded-xl p-4 bg-gray-50"
                />
              </div>
            </div>
          ) : (
            // DOCUMENT TAB
            <div className="space-y-6">
              <label className="block text-gray-700 font-semibold text-sm">
                Identity Verification Document
              </label>
              <input
                type="text"
                value={customer?.bankAccountNumber}
                readOnly
                className="w-full border-2 border-gray-200 rounded-xl p-4 bg-gray-50"
              />
              <label className="block text-gray-700 font-semibold text-sm">
                Address Document
              </label>
              <img
                src={customer?.address_document}
                alt="document"
                className="w-full max-w-md rounded-xl shadow-md border"
              />
            </div>
          )}

          {/* ACTION BUTTONS */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleBlock}
              disabled={loading}
              className={`px-4 py-2 text-white rounded cursor-pointer 
    ${customer?.user?.isBlocked ? "bg-red-600" : "bg-green-600"}`}
            >
              {loading ? (
                <>
                  <Spin size="small" /> <span>Blocking...</span>
                </>
              ) : customer?.user?.isBlocked ? (
                "Unblock"
              ) : (
                "Block"
              )}
            </button>

            <button
              onClick={handleApproved}
              disabled={loading}
              className={`px-4 py-2 text-white rounded cursor-pointer 
    ${
      customer?.user?.isAdminVerified === false
        ? "bg-[#EF4444]"
        : "bg-green-600"
    }`}
            >
              {loading ? (
                <>
                  <Spin size="small" /> <span>Verify...</span>
                </>
              ) : customer?.user?.isAdminVerified === false ? (
                "Please approve"
              ) : (
                "Approved"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

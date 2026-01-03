import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import {
  useBlockUserMutation,
  useGetSingleProviderUserQuery,
  useUpdateApproveStatusMutation,
} from "../redux/api/userApi";
import { toast } from "react-toastify";
import { Image, Popconfirm, Spin } from "antd";

const TaskProviderDetails = () => {
  const { id } = useParams();
  const { data: taskProvider } = useGetSingleProviderUserQuery({ id });
  console.log(taskProvider);
  const [activeTab, setActiveTab] = useState("info");
  const [blockUser] = useBlockUserMutation();
  const [approvedUser] = useUpdateApproveStatusMutation();
  const [loading, setLoading] = useState(false);
    const [loading1, setLoading1] = useState(false);
  const handleBlock = async (record) => {
    const id = taskProvider?.data?.user?._id;

    try {
      setLoading(true);
      const res = await blockUser(id);
      toast.success(res?.data?.message);
      setLoading(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading(false);
    }
  };

  const handleApproved = async () => {
    const userId = taskProvider?.data?.user?._id;
    try {
      setLoading1(true);
      const res = await approvedUser(userId);
      toast.success(res?.data?.message);
      setLoading1(false);
    } catch (error) {
      toast.error(error?.message);
      setLoading1(false);
    }
  };

  //   const handleApproved = async () => {
  //   const userId = customer?.user?._id;
  //   try {
  //     setLoading(true);
  //     const res = await approvedUser(userId);
  //     toast.success(res?.data?.message);
  //     setLoading(false);
  //   } catch (error) {
  //     toast.error(error?.message);
  //     setLoading(false);
  //   }
  // };
  return (
    <div>
      <div className="flex items-center space-x-3 mb-10">
        <Link
          to="/task-providers"
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </Link>
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Task Provider Information
        </h1>
      </div>
      <div className="flex flex-col items-center p-6 min-h-screen">
        <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <img
                src="/man.png"
                alt="user"
                className="w-28 h-28 rounded-full border-4 border-white shadow-lg ring-4 ring-gray-100"
              />
            
            </div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-gray-100 p-1 rounded-2xl">
              <button
                onClick={() => setActiveTab("info")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "info"
                    ? "bg-white text-teal-700 shadow-md cursor-pointer"
                    : "text-gray-500 hover:text-gray-700 cursor-pointer"
                }`}
              >
                Provider Info
              </button>
              <button
                onClick={() => setActiveTab("doc")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-200 ${
                  activeTab === "doc"
                    ? "bg-white text-teal-700 shadow-md cursor-pointer"
                    : "text-gray-500 hover:text-gray-700 cursor-pointer"
                }`}
              >
                Provider document
              </button>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "info" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                  Full Name
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={taskProvider?.data?.name}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={taskProvider?.data?.email}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-[#115E59] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                  Mobile Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={taskProvider?.data?.phone}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="w-2 h-2 bg-[#115E59] rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                  Date Joined
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={taskProvider?.data?.createdAt}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                    readOnly
                  />
                </div>
              </div>

              <div className="md:col-span-2 space-y-2">
                <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                  Linked Bank Account
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={
                      taskProvider?.data?.bankAccountNumber || "No Account"
                    }
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {taskProvider?.data?.isVerified === true
                          ? "VERIFYED"
                          : "UNVERIFYED"}
                      </span>
                      <div className="w-2 h-2 bg-[#115E59] rounded-full"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="space-y-2 flex flex-col gap-6">
                <div className="flex w-full gap-7">
                  <div className="w-full">
                    <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                      Bank Verification Number (BVN)
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={taskProvider?.data?.bankVerificationNumber}
                        className="w-full border-2 border-gray-200 rounded-sm p-4 text-gray-400 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium "
                        readOnly
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {/* <span className="text-xs font-semibold text-[#115E59] bg-green-100 px-2 py-1 rounded-full">
                          VALID
                        </span> */}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                      Identification Document Type
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={taskProvider?.data?.identificationDocumentType}
                        className="w-full border-2 border-gray-200 rounded-sm p-4 text-gray-400 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                        readOnly
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {/* <span className="text-xs font-semibold text-[#115E59] bg-green-100 px-2 py-1 rounded-full">
                          VALID
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex w-full gap-7">
                  <div className="w-full">
                    <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                      Identification Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={taskProvider?.data?.identificationDocumentNumber}
                        className="w-full border-2 border-gray-200 rounded-sm p-4 text-gray-400 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium "
                        readOnly
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {/* <span className="text-xs font-semibold text-[#115E59] bg-green-100 px-2 py-1 rounded-full">
                          VALID
                        </span> */}
                      </div>
                    </div>
                  </div>

                  <div className="w-full">
                    <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                      Address
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={taskProvider?.data?.address}
                        className="w-full border-2 border-gray-200 rounded-sm p-4 text-gray-400 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                        readOnly
                      />
                      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                        {/* <span className="text-xs font-semibold text-[#115E59] bg-green-100 px-2 py-1 rounded-full">
                          VALID
                        </span> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-2 flex gap-8 w-full">
                <div className="w-full">
                  <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                    Identity Verification Document
                  </label>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex flex-col items-center space-y-3">
                      <Image
                        src={taskProvider?.data?.identification_document}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                    Address verify Document
                  </label>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex flex-col items-center space-y-3">
                      <Image
                        src={taskProvider?.data?.address_document}
                        alt=""
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Popconfirm
              title={`Are you sure to ${
                taskProvider?.data?.user?.isBlocked === false
                  ? "Block"
                  : "Unblock"
              } this Provider?`}
              okText="Yes"
              cancelText="No"
              onConfirm={handleBlock}
            >
              <button
                disabled={loading}
                className={`px-4 py-2 text-white rounded cursor-pointer 
    ${
      taskProvider?.data?.user?.isBlocked === false
        ? "bg-[#115E59]"
        : "bg-[#EF4444]"
    }`}
              >
                {loading ? (
                  <>
                    <Spin size="small" /> <span>Blocking...</span>
                  </>
                ) : taskProvider?.data?.user?.isBlocked === false ? (
                  "Task Provider Block"
                ) : (
                  "Task Provider Blocked"
                )}
              </button>
            </Popconfirm>

            <Popconfirm
              title="Are you sure to Approve this Provider?"
              okText="Yes"
              cancelText="No"
              onConfirm={handleApproved}
              disabled={taskProvider?.data?.user?.isAdminVerified === true}
            >
              <button
                disabled={
                  loading1 || taskProvider?.data?.user?.isAdminVerified === true
                }
                className={`px-4 py-2 font-semibold  rounded cursor-pointer transition
      ${
        taskProvider?.data?.user?.isAdminVerified === false
          ? "border border-[#115E59] text-[#115E59]"
          : "bg-[#115E59] cursor-not-allowed text-white opacity-70"
      }`}
              >
                {loading1 ? (
                  <>
                    <Spin size="small" /> <span>Verify...</span>
                  </>
                ) : taskProvider?.data?.user?.isAdminVerified === false ? (
                  "Please approve"
                ) : (
                  "Approved"
                )}
              </button>
            </Popconfirm>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProviderDetails;

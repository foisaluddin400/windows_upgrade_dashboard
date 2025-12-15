import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { useBlockUserMutation, useGetSingleProviderUserQuery } from "../redux/api/userApi";
import { toast } from "react-toastify";
import { Spin } from "antd";

const TaskProviderDetails = () => {
  const {id} = useParams()
  const {data:taskProvider} = useGetSingleProviderUserQuery({id})
  console.log(taskProvider)
  const [activeTab, setActiveTab] = useState("info");
  const [blockUser] = useBlockUserMutation();
    
  const [loading, setLoading] = useState(false);
  const handleBlock = async (record) => {
    const id = taskProvider?.data?.user?._id;

    try {
      setLoading(true)
      const res = await blockUser(id);
      toast.success(res?.data?.message);
      setLoading(false)
    } catch (error) {
      toast.error(error?.message);
      setLoading(false)
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
                    value={taskProvider?.data?.bankAccountNumber || 'No Account'}
                    className="w-full border-2 border-gray-200 rounded-xl p-4 text-gray-800 bg-gray-50 focus:bg-white focus:border-teal-500 focus:outline-none transition-all duration-200 font-medium"
                    readOnly
                  />
                  <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-semibold text-blue-600 bg-blue-100 px-2 py-1 rounded-full">
                        {taskProvider?.data?.isVerified === true ? 'VERIFYED' : 'UNVERIFYED'}
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
                      Location
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
                      <img
                        src="/man.png"
                        alt="document"
                        className="w-48 h-32 object-cover rounded-lg shadow-md border-2 border-white"
                      />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Identity Document
                        </p>
                        <p className="text-xs text-gray-500">
                          Uploaded on Jan 10, 2025
                        </p>
                        <span className="inline-block mt-2 text-xs font-semibold text-green-600 bg-green-100 px-3 py-1 rounded-full">
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full">
                  <label className="block text-gray-700 font-semibold text-sm tracking-wide">
                    Location verify Document
                  </label>
                  <div className="border-2 border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex flex-col items-center space-y-3">
                      <img
                        src="/paper info.webp"
                        alt="document"
                        className="w-48 h-32 object-cover rounded-lg shadow-md border-2 border-white"
                      />
                      <div className="text-center">
                        <p className="text-sm font-medium text-gray-700">
                          Location Document
                        </p>
                        <p className="text-xs text-gray-500">
                          Uploaded on Jan 10, 2025
                        </p>
                        <span className="inline-block mt-2 text-xs font-semibold text-[#115E59] bg-green-100 px-3 py-1 rounded-full">
                          VERIFIED
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <button
              onClick={handleBlock}
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
            <button className="px-8 py-3 bg-[#115E59] text-white rounded-xl hover:bg-teal-700 transition-colors duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 cursor-pointer">
              Approved As a Provider
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskProviderDetails;

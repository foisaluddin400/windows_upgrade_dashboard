/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { ArrowLeft, Search, Download, Eye, MoreVertical } from "lucide-react";

const NewRefund = ({ refunds, searchTerm, currentPage, setCurrentPage }) => {
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredRefunds = refunds.filter(
    (refund) =>
      refund.taskId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.refundFor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      refund.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRefunds.length / 10);
  const startIndex = (currentPage - 1) * 10;
  const paginatedRefunds = filteredRefunds.slice(startIndex, startIndex + 10);

  const handleViewRefund = (refund) => {
    setSelectedRefund(refund);
    setIsModalOpen(true);
  };

  const handleStatusChange = (refundId, newStatus) => {
    // Here you would update the refund status in your state/database
    console.log(`Updating refund ${refundId} status to ${newStatus}`);
  };
  return (
    <>
      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="">
          <div>
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: "100px" }}
                  >
                    Task ID
                  </th>
                  <th
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: "150px" }}
                  >
                    Refund For
                  </th>
                  <th
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: "150px" }}
                  >
                    Refund To
                  </th>
                  <th
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: "200px" }}
                  >
                    Email
                  </th>
                  <th
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: "120px" }}
                  >
                    Amount
                  </th>
                  <th
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: "150px" }}
                  >
                    Account Number
                  </th>
                  <th
                    className="px-4 sm:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    style={{ minWidth: "120px" }}
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedRefunds.map((refund) => (
                  <tr
                    key={refund.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      #{refund.taskId}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {refund.refundFor}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={refund.refundToAvatar}
                          alt={refund.refundTo}
                          className="w-8 h-8 rounded-full object-cover mr-3"
                        />
                        <span className="text-sm text-gray-900">
                          {refund.refundTo}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {refund.email}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">
                      ₦ {refund.amount}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {refund.accountNumber}
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <select
                        className="py-1 px-4 rounded-full font-semibold cursor-pointer 
                          bg-yellow-100 text-yellow-600
                               peer"
                        onChange={(e) => {
                          const select = e.target;
                          if (select.value === "Paid") {
                            select.className =
                              "py-2 px-4 rounded-full font-semibold cursor-pointer bg-[#e0f2fe] text-[#28afeb] text-sm";
                          } else {
                            select.className =
                              "py-2 px-4 rounded-full font-semibold cursor-pointer bg-yellow-100 text-yellow-600 text-sm";
                          }
                        }}
                      >
                        <option value="Pending" className="text-yellow-600">
                          Pending
                        </option>
                        <option value="Paid" className="text-green-600">
                          Refunded
                        </option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between mt-6">
        <div className="text-sm text-gray-500">
          Showing {Math.min(startIndex + 1, filteredRefunds.length)} to{" "}
          {Math.min(startIndex + 10, filteredRefunds.length)} of{" "}
          {filteredRefunds.length} refunds
        </div>

        <div className="flex items-center space-x-1">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            «
          </button>

          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ‹
          </button>

          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-[#115E59] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            )
          )}

          {totalPages > 3 && (
            <>
              <span className="px-3 py-2 text-sm text-gray-500">...</span>
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`px-3 py-2 text-sm rounded-md transition-colors ${
                  currentPage === totalPages
                    ? "bg-[#115E59] text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ›
          </button>

          <button
            onClick={() =>
              setCurrentPage(Math.min(totalPages, currentPage + 1))
            }
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            »
          </button>
        </div>
      </div>
    </>
  );
};

export default NewRefund;

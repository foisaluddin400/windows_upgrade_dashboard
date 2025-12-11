/* eslint-disable no-unused-vars */
import { ArrowLeft, Calendar, Check, Handshake, MapPin } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import Progress from "../components/ManageDispute/Progress";
import { SiGoogletasks } from "react-icons/si";
import { useGetSingleExtentionReqQuery } from "../redux/api/metaApi";
import TaskInfoSection from "../components/ManageDispute/TaskInfoSection";
import TaskDetailsSection from "../components/ManageDispute/TaskDetailsSection";
import PricingSection from "../components/ManageDispute/PricingSection";
import ProgressBarComponent from "../components/ManageDispute/ProgressBarComponent";

const ManageDisputeDetails = () => {
  const { id } = useParams();
  console.log(id);

  const { data: singleExtentionReq } = useGetSingleExtentionReqQuery({ id });

  const singleData = singleExtentionReq?.data;
  console.log(singleData);

  const statusWithDate = singleData?.task?.statusWithDate || [];

  // Define the correct order
  const steps = [
    { status: "OFFERED", label: "Offered" },
    { status: "IN_PROGRESS", label: "In Progress" },
    { status: "COMPLETED", label: "Completed" },
  ];

  // Find how many steps are completed
  let completedCount = 0;
  steps.forEach((step) => {
    if (statusWithDate.some((item) => item.status === step.status)) {
      completedCount++;
    }
  });

  // Progress percentage for the line
  const progressWidth = (completedCount / steps.length) * 100;

  // Helper to get date for a status
  const getStatusDate = (status) => {
    const found = statusWithDate.find((item) => item.status === status);
    if (!found) return null;
    return new Date(found.date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="project_container mx-auto px-3 py-6 md:p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Link to="/manage-dispute">
            <ArrowLeft className="text-green-900 text-xl" />
          </Link>
          <p className="font-semibold text-md md:text-xl text-color mb-1">
            My Tasks
          </p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow p-4">
        {/* Task Title */}
        <h1 className="text-2xl font-bold">{singleData?.task?.title}</h1>
        <p className="text-sm text-gray-500">{singleData?.task?._id}</p>

        {/* Status + Image */}
        <div className="flex gap-3 mt-4 flex-col items-start">
          <p className="py-2 px-4 border text-sm bg-[#FFEDD5] text-[#F97316] rounded-lg my-6">
            {singleData?.status}
          </p>
          <div className="grid grid-cols-3 gap-4">
            {singleData?.task?.task_attachments?.map((image) => (
              <>
                <div>
                  <img src={image} alt="" />
                </div>
              </>
            ))}
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:gap-36 lg:gap-96">
          {/* left side */}
          <div>
            <div className="flex mt-8 items-center gap-3">
              <div className="bg-[#E6F4F1] rounded-full p-2 md:p-3">
                <img
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  src={singleData?.task?.customer?.profile_image}
                  alt=""
                />
              </div>
              <div>
                <p className="text-base md:text-xl font-semibold"> Posted by</p>
                <p className="text-[#6B7280] text-sm">
                  {singleData?.task?.customer?.name}
                </p>
              </div>
            </div>
            <div className="flex mt-8 items-center gap-3">
              <div className="bg-[#E6F4F1] rounded-full p-2 md:p-3">
                <MapPin className="text-[#115E59] text-sm md:text-xl" />
              </div>
              <div>
                <p className="text-base md:text-xl font-semibold"> Location</p>
                <p className="text-[#6B7280] text-sm">
                  {singleData?.task?.address}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div>
            <div className="flex mt-8 items-center gap-3">
              <div className="bg-[#E6F4F1] rounded-full p-2 md:p-3">
                <img
                  className="w-[30px] h-[30px] rounded-full object-cover"
                  src={singleData?.task?.provider?.profile_image}
                  alt=""
                />
              </div>
              <div>
                <p className="text-base md:text-xl font-semibold"> Posted by</p>
                <p className="text-[#6B7280] text-sm">
                  {singleData?.task?.provider?.name}
                </p>
              </div>
            </div>
            <div className="flex mt-8 items-center gap-3">
              <div className="bg-[#E6F4F1] rounded-full p-2 md:p-3 ">
                <Calendar className="text-[#115E59] text-sm md:text-xl" />
              </div>
              <div>
                <p className="text-base md:text-xl font-semibold">
                  To Be Done On
                </p>
                <p className="text-[#6B7280] text-sm">
                  {new Date(
                    singleData?.task?.preferredDeliveryDateTime
                  ).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Task Details Section */}
        <div className="flex flex-col gap-4">
          <p className="text-xl font-semibold">Details</p>
          <p>{singleData?.task?.description}</p>
        </div>

        {/* Pricing Section */}
        <div className="flex flex-col gap-4 mt-5 border-b-2 border-[#dedfe2] pb-4">
          <div className="flex justify-between items-center">
            <p className="text-base font-semibold">Offered Price</p>
            <p className="text-base text-[#6B7280]">
              ₦ {singleData?.task?.budget || 0}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-base font-semibold">Discount</p>
            <p className="text-base text-[#6B7280]">
              ₦{" "}
              {(singleData?.task?.budget || 0) -
                (singleData?.task?.customerPayingAmount || 0)}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-base font-semibold">Customer Paying</p>
            <p className="text-base text-[#6B7280]">
              ₦ {singleData?.task?.customerPayingAmount || 0}
            </p>
          </div>
        </div>
        {/* progress */}
        <div className=" bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto py-9">
            <div className="relative">
              {/* Background Line */}
              <div className="absolute top-7 left-0 right-0 h-1 bg-gray-300 rounded-full"></div>

              {/* Progress Line */}
              <div
                className="absolute top-7 left-0 h-1 bg-teal-600 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${progressWidth}%` }}
              ></div>

              {/* Steps */}
              <div className="relative flex justify-between">
                {steps.map((step, index) => {
                  const hasReached = statusWithDate.some(
                    (s) => s.status === step.status
                  );
                  const date = getStatusDate(step.status);

                  return (
                    <div
                      key={step.status}
                      className="flex flex-col items-center"
                    >
                      {/* Circle */}
                      <div
                        className={`
                          w-14 h-14 -ml-20 rounded-full flex items-center justify-center border-4 shadow-md transition-all duration-700
                          ${
                            hasReached
                              ? "bg-teal-600 border-teal-600 scale-110"
                              : "bg-white border-gray-300"
                          }
                        `}
                      >
                        {hasReached ? (
                          <Check
                            className="w-8 h-8 text-white"
                            strokeWidth={4}
                          />
                        ) : (
                          <div className="w-5 h-5 bg-gray-400 rounded-full"></div>
                        )}
                      </div>

                      {/* Label */}
                      <div className="mt-5 text-center">
                        <p
                          className={`font-bold text-sm
                            ${hasReached ? "text-teal-700" : "text-gray-400"}
                          `}
                        >
                          {step.label}
                        </p>
                        {date && (
                          <p className="text-xs text-gray-600 mt-1 flex items-center justify-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {date}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageDisputeDetails;

/* eslint-disable no-unused-vars */
import {
  ArrowLeft,
  Calendar,
  Check,
  GitPullRequest,
  Handshake,
  MapPin,
} from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import Progress from "../components/ManageDispute/Progress";
import { SiGoogletasks } from "react-icons/si";
import {
  useGetSingleExtentionReqQuery,
  useUpdateAcceptRejectMutation,
  useUpdateCencelReqMutation,
} from "../redux/api/metaApi";
import TaskInfoSection from "../components/ManageDispute/TaskInfoSection";
import TaskDetailsSection from "../components/ManageDispute/TaskDetailsSection";
import PricingSection from "../components/ManageDispute/PricingSection";
import ProgressBarComponent from "../components/ManageDispute/ProgressBarComponent";
import CancellationStatusComponent from "../components/ManageDispute/CancellationStatusComponent";
import { FaCircleUser } from "react-icons/fa6";
import { Form, Input, message, Modal, Select, Spin } from "antd";
import { toast } from "react-toastify";

const ManageDisputeDetails = () => {
  const { id } = useParams();
  console.log(id);
  const [updateAcceptReject] = useUpdateAcceptRejectMutation();
  const [updateCencel] = useUpdateCencelReqMutation();
  const { data: singleExtentionReq } = useGetSingleExtentionReqQuery({ id });
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);

  const [cancelModalOpen, setCancelModalOpen] = useState(false);
  const [payTo, setPayTo] = useState("");
  const [reasonForDecision, setReasonForDecision] = useState("");
  const [loading2, setLoading2] = useState(false);

  const [form] = Form.useForm();
  const singleData = singleExtentionReq?.data;
  console.log(singleData);

  const STATUS_ORDER = ["OFFERED", "IN_PROGRESS", "COMPLETED", "CANCELLED"];

  const STATUS_CONFIG = {
    OFFERED: {
      label: "Offered",
      activeColor: "bg-teal-600 border-teal-600 text-teal-700",
    },
    IN_PROGRESS: {
      label: "In Progress",
      activeColor: "bg-teal-600 border-teal-600 text-teal-700",
    },
    COMPLETED: {
      label: "Completed",
      activeColor: "bg-green-600 border-green-600 text-green-700",
    },
    CANCELLED: {
      label: "Canceled",
      activeColor: "bg-red-600 border-red-600 text-red-700",
    },
  };

  const statusWithDate = singleData?.task?.statusWithDate || [];

  // Define the correct order

  const statusMap = statusWithDate.reduce((acc, item) => {
    acc[item.status] = item;
    return acc;
  }, {});
  const hasCancelled = !!statusMap["CANCELLED"];
  const hasCompleted = !!statusMap["COMPLETED"];

  const steps = STATUS_ORDER.filter((status) => {
    if (hasCancelled && status === "COMPLETED") return false;

    if (hasCompleted && status === "CANCELLED") return false;

    return true;
  }).map((status) => ({
    status,
    label:
      status === "OFFERED"
        ? "Offered"
        : status === "IN_PROGRESS"
        ? "In Progress"
        : status === "COMPLETED"
        ? "Completed"
        : "Canceled",
    date: statusMap[status]?.date || null,
    active: !!statusMap[status],
  }));

  // const steps = statusWithDate.map((item) => ({
  //   status: item.status,
  //   label: STATUS_CONFIG[item.status]?.label || item.status,
  //   date: item.date,
  //   color:
  //     STATUS_CONFIG[item.status]?.activeColor ||
  //     "bg-teal-600 border-teal-600 text-teal-700",
  // }));

  // Find how many steps are completed
  let completedCount = 0;
  steps.forEach((step) => {
    if (statusWithDate.some((item) => item.status === step.status)) {
      completedCount++;
    }
  });

  const lastActiveIndex = steps.map((s) => s.active).lastIndexOf(true);

  const progressWidth =
    lastActiveIndex > 0 ? (lastActiveIndex / (steps.length - 1)) * 100 : 0;

  const handleCancelSubmit = async () => {
    if (!payTo || !reasonForDecision) {
      return message.warning("Please fill all fields");
    }

    try {
      setLoading2(true);

      const res = await updateCencel({
        id,
        data: {
          payTo,
          reasonForDecision,
        },
      }).unwrap();

      toast.success(res?.message || "Task cancelled successfully");
      setCancelModalOpen(false);
      setPayTo("");
      setReasonForDecision("");
    } catch (error) {
      toast.error(error?.data?.message || "Cancel failed");
    } finally {
      setLoading2(false);
    }
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      const res = await updateAcceptReject({
        id,
        data: { status: "ACCEPTED" },
      }).unwrap();

      toast.success(res?.message);
    } catch (error) {
      toast.error(error?.data?.message || "Failed to accept extension");
    } finally {
      setLoading(false);
    }
  };

  /* ------------------------
     REJECT EXTENSION
  -------------------------*/
  const handleRejectSubmit = async (values) => {
    try {
      setLoading1(true);
      const res = await updateAcceptReject({
        id,
        data: {
          status: "REJECTED",
          rejectDetails: values.rejectDetails,
        },
      }).unwrap();

      toast.success(res?.message);
      setRejectModalOpen(false);
      form.resetFields();
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reject extension");
    } finally {
      setLoading1(false);
    }
  };

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
        <div className="bg-gradient-to-b from-gray-50 to-white">
          <div className="max-w-4xl mx-auto py-9">
            <div className="relative">
              {/* Background Line */}
              <div className="absolute top-7 left-0 right-0 h-1 bg-gray-300 rounded-full" />

              {/* Progress Line */}
              <div
                className={`absolute top-7 left-0 h-1 rounded-full transition-all duration-700 ${
                  hasCancelled
                    ? "bg-red-600"
                    : hasCompleted
                    ? "bg-green-600"
                    : "bg-teal-600"
                }`}
                style={{ width: `${progressWidth}%` }}
              />

              {/* Steps */}
              <div className="relative flex justify-between">
                {steps.map((step) => (
                  <div key={step.status} className="flex flex-col items-center">
                    {/* Circle */}
                    <div
                      className={`
                w-14 h-14 rounded-full flex items-center justify-center border-4 shadow-md
                transition-all
                ${
                  step.active
                    ? step.status === "CANCELLED"
                      ? "bg-red-600 border-red-600"
                      : step.status === "COMPLETED"
                      ? "bg-green-600 border-green-600"
                      : "bg-teal-600 border-teal-600"
                    : "bg-white border-gray-300"
                }
              `}
                    >
                      {step.active ? (
                        <Check className="w-7 h-7 text-white" strokeWidth={3} />
                      ) : (
                        <div className="w-4 h-4 bg-gray-400 rounded-full" />
                      )}
                    </div>

                    {/* Label */}
                    <div className="mt-5 text-center">
                      <p
                        className={`font-bold text-sm ${
                          step.active ? "text-gray-800" : "text-gray-400"
                        }`}
                      >
                        {step.label}
                      </p>

                      {step.date && (
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(step.date).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#E6F4F1] rounded-lg p-4 lg:p-6 mb-6">
        <div className="flex flex-col lg:flex-row bg-[#E6F4F1] rounded-lg p-4 lg:p-6 mb-6 ">
          {/* Cancellation Status Section */}
          <div className="">
            <div className="flex items-start gap-3 mb-4 lg:border-r border-gray-300 pr-12">
              <div className="bg-white rounded-full p-2 hidden lg:block">
                <GitPullRequest className="w-5 h-5 text-[#115E59]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Request to Change of Task Completion Date
                </h3>

                {/* Requested By Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-6 border-b pb-6 border-b-gray-300">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="">
                      {singleData?.requestTo?.profile_image ? (
                        <img
                          className="w-[40px] h-[40px] rounded-full object-cover"
                          src={singleData?.requestTo?.profile_image}
                          alt="User"
                        />
                      ) : (
                        <FaCircleUser className="text-3xl text-green-900" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Requested To</p>
                      <p className="text-gray-600 text-sm">
                        {singleData?.requestTo?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(singleData?.requestedDateTime).toLocaleString()}
                  </p>
                </div>
                {/* Cancellation Reason */}
                <div className="mb-6 border-b pb-6 border-b-gray-300">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Cancellation Reason
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {singleData?.rejectDetails}
                  </p>
                </div>
                {/* /* evidence */}
                <div className="border-b pb-6 border-b-gray-300">
                  <p>request Evidence</p>

                  <div className="flex flex-wrap">
                    {singleData?.extensionEvidence?.map((image) => (
                      <>
                        <div>
                          <img src={image} alt="" />
                        </div>
                      </>
                    ))}
                  </div>
                </div>
                {/* Status Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-6 pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <div className="w-6 h-6 bg-[#115E59] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Cancellation Status
                      </p>
                      <p className={`text-sm`}>{singleData?.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#E6F4F1] rounded-lg p-4 lg:p-6 mb-6">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-1 pt-2">
                {/* Requested By Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-6 border-b pb-6 border-b-gray-300">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="">
                      {singleData?.requestFrom?.profile_image ? (
                        <img
                          className="w-[40px] h-[40px] rounded-full object-cover"
                          src={singleData.requestFrom.profile_image}
                          alt="User"
                        />
                      ) : (
                        <FaCircleUser className="text-3xl text-green-900" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Requested By</p>
                      <p className="text-gray-600 text-sm">
                        {" "}
                        {singleData?.requestFrom?.name}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm">
                    {new Date(singleData?.requestedDateTime).toLocaleString()}
                  </p>
                </div>
                {/* Cancellation Reason */}

                {/* Status Section */}
                <div className="flex flex-col md:flex-row md:items-center gap-4 justify-between mb-6 pt-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <div className="w-6 h-6 bg-[#115E59] rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        Cancellation Status
                      </p>
                      <p className={`text-sm `}>{singleData?.status}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
      </div>
      <div className="flex flex-wrap gap-2 lg:gap-8 justify-start">
        {singleData?.status === "DISPUTED" ? (
          <div className="flex gap-4">
            <button
              onClick={handleAccept}
              disabled={loading}
              className="px-6 py-2.5 bg-[#E6F4F1] text-[#115E59] border border-[#115E59] rounded-md font-medium cursor-pointer flex items-center gap-2"
            >
              {loading ? (
                <>
                  <Spin size="small" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Accept Extension"
              )}
            </button>

            <button
              onClick={() => setRejectModalOpen(true)}
              className="px-6 py-2.5 bg-[#FDECEC] text-[#B42318] border border-[#B42318] rounded-md font-medium cursor-pointer"
            >
              Reject Extension
            </button>
            <button
              onClick={() => setCancelModalOpen(true)}
              className="px-6 py-2.5 bg-[#FEE2E2] text-[#EF4444] border border-[#EF4444] rounded-md font-medium cursor-pointer"
            >
              Cancel this Task & Refund
            </button>
          </div>
        ) : (
          <span className="px-4 py-2 text-sm font-semibold text-green-700 bg-green-100 rounded-md">
            Resolved
          </span>
        )}
      </div>
      {/* REJECT MODAL */}
      <Modal
        title="Reject Extension"
        open={rejectModalOpen}
        onCancel={() => setRejectModalOpen(false)}
        footer={null}
        centered
      >
        <Form form={form} layout="vertical" onFinish={handleRejectSubmit}>
          <Form.Item
            label="Reject Reason"
            name="rejectDetails"
            rules={[{ required: true, message: "Please enter reject reason" }]}
          >
            <Input.TextArea rows={4} placeholder="Enter reject reason" />
          </Form.Item>

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setRejectModalOpen(false)}
              className="px-4 py-2 border rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading1}
              className="px-4 py-2 bg-[#115E59] text-white rounded"
            >
              {loading1 ? (
                <>
                  <Spin size="small" />
                  <span>Submitting...</span>
                </>
              ) : (
                "Submit"
              )}
            </button>
          </div>
        </Form>
      </Modal>

      <Modal
        open={cancelModalOpen}
        centered
        onCancel={() => setCancelModalOpen(false)}
        footer={null}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Cancel Task & Refund
        </h2>

        <div className="space-y-4">
          {/* Select Field */}
          <Select
            placeholder="Refund Pay To"
            value={payTo}
            onChange={setPayTo}
            className="w-full"
            options={[
              { label: "Provider", value: "Provider" },
              { label: "Customer", value: "Customer" },
            ]}
          />

          {/* Reason Field */}
          <Input.TextArea
            rows={4}
            placeholder="Reason for decision"
            value={reasonForDecision}
            onChange={(e) => setReasonForDecision(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={() => setCancelModalOpen(false)}
            className="px-4 py-2 border rounded-md"
          >
            Cancel
          </button>

          <button
            onClick={handleCancelSubmit}
            disabled={loading2}
            className="px-4 py-2 bg-[#EF4444] text-white rounded-md flex items-center gap-2"
          >
            {loading2 ? <Spin size="small" /> : "Submit"}
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default ManageDisputeDetails;

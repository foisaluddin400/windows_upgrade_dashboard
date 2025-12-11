import { useState, useEffect } from "react";
import { Modal, Input, Button, message } from "antd";
import {
  useGetReferralQuery,
  useUpdateReferralValueMutation,
  useUpdateReferralStatusMutation,
} from "../../redux/api/metaApi";
import { TbEdit } from "react-icons/tb";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";

const ReferralValue = () => {
  const { data: referralData, refetch } = useGetReferralQuery();

  const [updateValue] = useUpdateReferralValueMutation();
  const [updateStatus] = useUpdateReferralStatusMutation();

  const [usersValue, setUsersValue] = useState(0);
  const [providersValue, setProvidersValue] = useState(0);

  const [usersId, setUsersId] = useState(null);
  const [providersId, setProvidersId] = useState(null);

  const [usersStatus, setUsersStatus] = useState("ACTIVE");
  const [providersStatus, setProvidersStatus] = useState("ACTIVE");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [inputValue, setInputValue] = useState("");

  // Load API data
  useEffect(() => {
    if (referralData?.data) {
      const customer = referralData.data.find(
        (item) => item.referralFor === "CUSTOMER"
      );
      const provider = referralData.data.find(
        (item) => item.referralFor === "PROVIDER"
      );

      if (customer) {
        setUsersValue(customer.value);
        setUsersId(customer._id);
        setUsersStatus(customer.status);
      }

      if (provider) {
        setProvidersValue(provider.value);
        setProvidersId(provider._id);
        setProvidersStatus(provider.status);
      }
    }
  }, [referralData]);

  // Open modal
  const openModal = (type) => {
    setModalType(type);
    setInputValue(type === "users" ? usersValue : providersValue);
    setIsModalOpen(true);
  };

  // ================================
  // 🔥 UPDATE VALUE (API CALL)
  // ================================
  const handleUpdate = async () => {
    try {
      const id = modalType === "users" ? usersId : providersId;

      await updateValue({
        id,
        data: { value: Number(inputValue) },
      }).unwrap();

      toast.success("Referral value updated");
      setIsModalOpen(false);
      refetch(); // refresh cards
    } catch (error) {
      toast.error("Failed to update");
    }
  };

  // ================================
  // 🔥 UPDATE STATUS (TOGGLE ACTIVE/INACTIVE)
  // ================================
  const handleStatusToggle = async (type) => {
  try {
    const id = type === "users" ? usersId : providersId;

    await updateStatus(id).unwrap(); 

    message.success("Status updated");

    refetch();
  } catch (error) {
    message.error("Status update failed");
  }
};


  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

      {/* USERS CARD */}
      <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">Users Referral Value</h2>
          <span
            className={`font-medium ${
              usersStatus === "ACTIVE" ? "text-green-600" : "text-red-600"
            }`}
          >
            {usersStatus}
          </span>
        </div>

        <div className="mt-4 text-sm space-y-2">
          <div className="flex justify-between border-b pb-1 border-gray-300">
            <h1>Referral Value</h1>
            <span className="font-medium">₦{usersValue}</span>
          </div>

          <div className="flex justify-between border-b pb-1 border-gray-300">
            <h1>Referral for</h1>
            <span className="font-medium">Users</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button
            className="flex-1"
            type="primary"
            onClick={() => openModal("users")}
            style={{ backgroundColor: "#115E59", border: "none" }}
          >
            <TbEdit /> Update Value
          </Button>

          <Button
            danger
            className="flex-1"
            onClick={() => handleStatusToggle("users")}
          >
            <MdBlock /> Toggle Status
          </Button>
        </div>
      </div>

      {/* PROVIDERS CARD */}
      <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-8">
        <div className="flex justify-between items-start">
          <h2 className="text-xl font-semibold">Provider Referral Value</h2>
          <span
            className={`font-medium ${
              providersStatus === "ACTIVE" ? "text-green-600" : "text-red-600"
            }`}
          >
            {providersStatus}
          </span>
        </div>

        <div className="mt-4 text-sm space-y-2">
          <div className="flex justify-between border-b pb-1 border-gray-300">
            <h1>Referral Value</h1>
            <span className="font-medium">₦{providersValue}</span>
          </div>

          <div className="flex justify-between border-b pb-1 border-gray-300">
            <h1>Referral for</h1>
            <span className="font-medium">Providers</span>
          </div>
        </div>

        <div className="mt-5 flex gap-3">
          <Button
            className="flex-1"
            type="primary"
            onClick={() => openModal("providers")}
            style={{ backgroundColor: "#115E59", border: "none" }}
          >
            <TbEdit /> Update Value
          </Button>

          <Button
            danger
            className="flex-1"
            onClick={() => handleStatusToggle("providers")}
          >
            <MdBlock /> Toggle Status
          </Button>
        </div>
      </div>

      {/* MODAL */}
      <Modal
        title={
          <span className="text-xl font-semibold">
            {modalType === "users"
              ? "Update Users Referral Value"
              : "Update Providers Referral Value"}
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        <label className="text-sm text-gray-600 mb-1">Referral Value (₦)</label>

        <Input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="mb-4 border border-gray-300 rounded-lg"
        />

        <div className="flex gap-3 mt-4">
          <Button danger className="flex-1" onClick={() => setIsModalOpen(false)}>
            Cancel
          </Button>

          <Button
            type="primary"
            className="flex-1"
            onClick={handleUpdate}
            style={{ backgroundColor: "#115E59", border: "none" }}
          >
            Update
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReferralValue;

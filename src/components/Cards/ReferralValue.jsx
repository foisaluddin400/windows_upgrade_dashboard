import { useState } from "react";
import { Modal, Input, Button } from "antd";
import ReffaralvCard from "./ReffaralvCard";

const ReferralValue = () => {
  const [usersValue, setUsersValue] = useState(100);
  const [providersValue, setProvidersValue] = useState(150);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const openModal = (type) => {
    setModalType(type);
    setInputValue(type === "users" ? usersValue : providersValue);
    setIsModalOpen(true);
  };

  const handleUpdate = () => {
    if (modalType === "users") setUsersValue(Number(inputValue));
    if (modalType === "providers") setProvidersValue(Number(inputValue));
    setIsModalOpen(false);
  };
  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      <ReffaralvCard
        title="Users Referral Value"
        value={usersValue}
        forWhom="Users"
        onUpdate={() => openModal("users")}
      />

      <ReffaralvCard
        title="Provider Referral Value"
        value={providersValue}
        forWhom="Providers"
        onUpdate={() => openModal("providers")}
      />

      <Modal
        title={
          <span className="text-xl font-semibold text-gray-800">
            {modalType === "users"
              ? "Update Users Referral Value"
              : "Update Provider Referral Value"}
          </span>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        centered
      >
        {/* Label */}
        <label className="block text-sm text-gray-600 mb-1">
          Referral Value (₦)
        </label>

        {/* Input with custom border color */}
        <Input
          type="number"
          placeholder="Enter Your preferred Referral Value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          bordered={true}
          className="mb-4 border border-gray-300 rounded-lg focus:border-teal-600 focus:ring-0"
        />

        {/* Buttons with top gap */}
        <div className="flex gap-3 mt-5">
          <Button
            danger
            className="flex-1"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            style={{ backgroundColor: "#115E59", border: "none" }}
            className="flex-1 hover:bg-[#0f4f4b]"
            onClick={handleUpdate}
          >
            Update
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default ReferralValue;

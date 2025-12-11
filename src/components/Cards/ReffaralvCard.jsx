import { Button, Input } from "antd";
import { MdBlock, MdUpdate } from "react-icons/md";
import { TbEdit } from "react-icons/tb";

const ReffaralvCard = ({ title, value, forWhom, onUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-5 flex flex-col gap-8 justify-between w-full md:max-w-lg">
      <div className="flex justify-between items-start">
        <h2 className="text-xl font-semibold">{title}</h2>
        <span className="text-green-600 font-medium">Active</span>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex justify-between border-b pb-1 border-[#dddee0]">
         <h1>Referral Value</h1>
          <span className="font-medium">₦{value}</span>
        </div>
        <div className="flex justify-between border-b pb-1 border-[#dddee0]">
         <h1>Referral for</h1>
          <span className="font-medium">{forWhom}</span>
        </div>
      </div>

      <div className="mt-5 flex gap-3">
        <Button
          className="md:flex-1"
          type="primary"
          style={{ backgroundColor: "#115E59", border: "none" }}
          onClick={onUpdate}
        >
          <TbEdit /> Update Value
        </Button>
        <Button danger className="md:flex-1">
          <MdBlock /> Make Inactive
        </Button>
      </div>
    </div>
  );
};

export default ReffaralvCard;

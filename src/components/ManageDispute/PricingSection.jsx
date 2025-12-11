import React from "react";

const PricingSection = ({singleData}) => {
  {singleData?.task?.statusWithDate}
  return (
    <div className="flex flex-col gap-4 border-b-2 border-[#dedfe2] pb-4">
      <div className="flex justify-between items-center">
        <p className="text-base font-semibold">Offered Price</p>
        <p className="text-base text-[#6B7280]">₦ 27.6</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-base font-semibold">Discount (0%)</p>
        <p className="text-base text-[#6B7280]">₦ 0</p>
      </div>
    </div>
  );
};

export default PricingSection;
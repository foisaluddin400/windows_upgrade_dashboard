import { Calendar, MapPin, User } from "lucide-react";

const TaskInfoSection = ({ singleData }) => {
  return (
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
            <p className="text-base md:text-xl font-semibold">To Be Done On</p>
            <p className="text-[#6B7280] text-sm">
              {new Date(
                singleData?.task?.preferredDeliveryDateTime
              ).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskInfoSection;

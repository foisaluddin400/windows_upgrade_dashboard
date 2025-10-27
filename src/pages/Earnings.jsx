import LastEarnHistory from "../components/Charts/LastEarnHistory";
import { Link } from "react-router";
import {  Download } from "lucide-react";
import TaskProviderGrowth from "../components/Charts/TaskProviderGrowth";
import { FaNairaSign } from "react-icons/fa6";
import { TbCurrencyNaira } from "react-icons/tb";

const Earnings = () => {
  return (
    <div>
      <div className="flex items-center space-x-3 mb-20 justify-between">
        <div className="flex items-center">
          <Link
            to="/manage-dispute"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <TbCurrencyNaira  className="text-3xl text-gray-600" />
          </Link>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Earning
          </h1>
        </div>
        <div>
          <button className="bg-[#115E59] cursor-pointer hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export CSV</span>
          </button>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row gap-12 lg:h-96 items-center justify-center">
        <div className="lg:w-[550px] md:h-64 lg:h-[480px] relative flex flex-col pt-10 pl-12 shadow-md rounded-2xl overflow-clip bg-gradient-to-bl from-[#E6F4F1] to-white">
          <div className="absolute bottom-0 right-0 hidden rounded-md">
            <img src="/bg_image.png" className="w-72" alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <img src="/naira.png" className="w-16" alt="" />
            <p className="text-xl font-bold py-4">Total Earnings</p>
            <p className="text-4xl font-bold text-[#115E59]">₦23,0900</p>
          </div>
        </div>
        <div className="flex-1">
          <TaskProviderGrowth />
        </div>
      </div>

      <div>
        <LastEarnHistory />
      </div>
    </div>
  );
};

export default Earnings;

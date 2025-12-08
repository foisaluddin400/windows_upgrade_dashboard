import React from 'react';
import { Users, Briefcase, CheckSquare } from 'lucide-react';
import { useGetDashboardMetaDataQuery } from '../../redux/api/metaApi';

const DashboardStatsCard = () => {
  const {data:dashboardData} = useGetDashboardMetaDataQuery()
  return (
    <div className=" rounded-2xl py-6">
      <div className="">
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 md:divide-x divide-gray-200">
            
            {/* Total Users Card */}
            <div className="flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <img src="/man.png" alt="" />
                    
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-[#6B7280] mb-1">
                    Total Users
                  </h3>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {dashboardData?.data?.totalCustomer}
                  </p>
                </div>
              </div>
            </div>

            {/* Total Task Providers Card */}
            <div className="flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-t md:border-t-0 border-gray-200">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex-shrink-0">
              
                     <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <img src="/champion.png" alt="" />
                    
                  </div>
                  
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-1">
                    Total Task Providers
                  </h3>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {dashboardData?.data?.totalProvider}
                  </p>
                </div>
              </div>
            </div>

            {/* Active Tasks Card */}
            <div className="flex items-center justify-center py-6 sm:py-8 px-4 sm:px-6 lg:px-8 border-t md:border-t-0 border-gray-200">
              <div className="flex items-center space-x-4 sm:space-x-6">
                <div className="flex-shrink-0">
                  <div className="relative">
                    <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center">
                    <img src="/man.png" alt="" />
                    
                  </div>
                    {/* Decorative checklist lines */}
                    <div className="absolute top-2 left-2 w-3 h-0.5 bg-green-400 rounded"></div>
                    <div className="absolute top-4 left-2 w-4 h-0.5 bg-yellow-400 rounded"></div>
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-base sm:text-lg font-medium text-gray-600 mb-1">
                    Active Tasks
                  </h3>
                  <p className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
                    {dashboardData?.data?.activeTask}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardStatsCard;
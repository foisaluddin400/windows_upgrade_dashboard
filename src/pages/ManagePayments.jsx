import { useState } from 'react'
import { ArrowLeft, Search, Download, CreditCard } from 'lucide-react';
import PendingPayments from '../components/Table/PendingPayments';
import AllPayment from '../components/Table/AllPayment';
import { Link } from 'react-router';

const ManagePayments = () => {
   const [activeTab, setActiveTab] = useState('all');
      const [searchTerm, setSearchTerm] = useState('');
      const [currentPage, setCurrentPage] = useState(1);
    
      // Active users data
      const users = [
        {
          id: 1,
          name: 'Russell Vaurn',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0100',
          email: 'zitka@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 2,
          name: 'Tracy Grady',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(207) 555-0119',
          email: 'jolie@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 3,
          name: 'Dana Daniel',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0100',
          email: 'ulfaha@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 4,
          name: 'Gerardo Barrows',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(316) 555-0116',
          email: 'seema@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 5,
          name: 'Sheryl Gusikowski',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0104',
          email: 'ohana@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 6,
          name: 'Theodore Mosciski',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(307) 555-0133',
          email: 'cadence@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 7,
          name: 'Theodore Mosciski',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0100',
          email: 'fellora@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 8,
          name: 'Daniel Walker IV',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(225) 555-0118',
          email: 'seanmnd@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 9,
          name: 'Ms. Natasha Spinka',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(207) 555-0119',
          email: 'sterris@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 10,
          name: 'Forrest Kuhic',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(316) 555-0116',
          email: 'moka@vandes.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        }
      ];
    
      // Blocked users data
      const blockedUsers = [
          {
          id: 1,
          name: 'Russell Vaurn',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0100',
          email: 'zitka@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 2,
          name: 'Tracy Grady',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b977?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(207) 555-0119',
          email: 'jolie@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 3,
          name: 'Dana Daniel',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0100',
          email: 'ulfaha@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 4,
          name: 'Gerardo Barrows',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(316) 555-0116',
          email: 'seema@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 5,
          name: 'Sheryl Gusikowski',
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0104',
          email: 'ohana@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 6,
          name: 'Theodore Mosciski',
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(307) 555-0133',
          email: 'cadence@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 7,
          name: 'Theodore Mosciski',
          avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(205) 555-0100',
          email: 'fellora@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 8,
          name: 'Daniel Walker IV',
          avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(225) 555-0118',
          email: 'seanmnd@mail.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 2,
          isOnline: true
        },
        {
          id: 9,
          name: 'Ms. Natasha Spinka',
          avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(207) 555-0119',
          email: 'sterris@gmail.com',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        },
        {
          id: 10,
          name: 'Forrest Kuhic',
          avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=40&h=40&fit=crop&crop=face&round=full',
          acnumber: '(316) 555-0116',
          email: 'moka@vandes.ru',
          amount: "₦ 27.6",
          bank_name: "Butch Bangla Bank",
          complete_date: '2025-01-10',
          status: 0,
          isOnline: false
        }
      ];
    
      // Reset page when switching tabs
      const handleTabChange = (tab) => {
        setActiveTab(tab);
        setCurrentPage(1);
      };
  return (
    <div className="  p-4 sm:p-6">
      <div className="">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Link to="/manage-promo" className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <CreditCard className="w-5 h-5 text-gray-600" />
            </Link>
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">Payments Management</h1>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search here"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-64"
              />
            </div>
            <button className="bg-[#115E59] cursor-pointer hover:bg-teal-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg w-fit">
            <button
              onClick={() => handleTabChange('all')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'all'
                  ? 'bg-[#115E59] text-white shadow-sm cursor-pointer'
                  : 'text-gray-600 hover:text-gray-800 cursor-pointer'
              }`}
            >
             Pending Payments ({users.length})
            </button>
            <button
              onClick={() => handleTabChange('blocked')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === 'blocked'
                  ? 'bg-[#115E59] text-white shadow-sm cursor-pointer'
                  : 'text-gray-600 hover:text-gray-800 cursor-pointer'
              }`}
            >
              All Payments ({blockedUsers.length})
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'all' ? (
          <PendingPayments
            users={users}
            searchTerm={searchTerm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        ) : (
          <AllPayment 
            blockedUsers={blockedUsers}
            searchTerm={searchTerm}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  )
}

export default ManagePayments
import { useSelector } from 'react-redux';
import { FaUserCircle } from 'react-icons/fa';
import SummaryApi from '../common/SummaryApi';
import Axios from '../utils/Axios';
import AxiosToastError from '../utils/AxiosToastError';
import { useEffect, useState } from 'react';
import Table from '../components/Table';
import { createColumnHelper } from '@tanstack/react-table';
import { IoMenu } from "react-icons/io5";
import { GoTriangleDown } from "react-icons/go";
import { GoTriangleUp } from "react-icons/go";
import UserMenu from '../components/UserMenu';

const TeachersDashboard = () => {
  const user = useSelector((state) => state.user);
  const teacher = user?.teacherProfile;

  const [eventsData, setEventsData] = useState([]);
  const [openUserMenu, setOpenUserMenu] = useState(false);

  const columnHelper = createColumnHelper();
  const columns = [
    columnHelper.accessor('title', {
      header: 'Title',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('start', {
      header: 'Date',
      cell: info =>
        new Date(info.getValue()).toLocaleString('en-US', {
          dateStyle: 'medium',
        })
    }),
  ];

  const fetchEvents = async () => {
    try {
      const response = await Axios({ ...SummaryApi.getEvents });
      const { data: responseData } = response;
      if (responseData.success) {
        setEventsData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  };

  useEffect(() => {
    if (teacher) {
      fetchEvents();
    }
  }, [teacher]);

  const handleCloseUserMenu = () => setOpenUserMenu(false);

  // ✅ Conditional rendering AFTER hooks
  if (!teacher) {
    return (
      <div className="p-4 text-red-500 font-semibold">
        Teacher profile not available. Please contact admin.
      </div>
    );
  }

  const { department, salary, rank } = teacher;


  return (
    <section className="grid gap-6">
      {/* Header */}
      <div className="border w-full p-1 shadow-2xl flex items-center justify-between rounded">
        <span className="px-4 font-semibold">
          Welcome 👋🎉 {user.firstName} {user.lastName}{' '}
          <span className="text-green-500 text-xs bg-green-200 rounded-2xl p-1">
            {user.role}
          </span>
        </span>
        <div>
          <div onClick={() => setOpenUserMenu(prev => !prev)} className='flex items-center select-none cursor-pointer lg:hidden'>
            <p><IoMenu size={25} /></p>
            {
              openUserMenu ? (
                <GoTriangleUp size={25} />
              ) : (
                <GoTriangleDown size={25} />
              )
            }
            {
              openUserMenu && (
                <div className='absolute right-0 top-38 z-50 lg:hidden'>
                  <div className='bg-blue-900 rounded p-4 min-w-32 mx-6'>
                    <UserMenu close={handleCloseUserMenu} />
                  </div>
                </div>
              )
            }
          </div>
        </div>
        <div className="w-16 h-16 items-center justify-center rounded-full overflow-hidden drop-shadow-lg hidden lg:block">
          {user.avatar ? (
            <img src={user.avatar} alt={user.firstName} className="w-16 h-16 object-cover" />
          ) : (
            <FaUserCircle size={65} />
          )}
        </div>
      </div>

      {/* Teacher Info */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 ">
        <div className="space-y-2 border p-3 rounded-md">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar || ''}
              alt="Avatar"
              className="w-40 h-40 rounded-xl object-cover"
            />
            <div>
              <p className="font-semibold">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm">{user.email}</p>
              <p className="text-sm">{user.mobile || '—'}</p>
              <p className="text-sm text-green-700 bg-green-200 w-fit px-2 rounded">
                {user.userId}  {user.status}
              </p>
            </div>
          </div>
          <div>
            <div className="border p-3 rounded-md">
              <div><strong>Department:</strong> {department || '—'}</div>
              <div><strong>Salary:</strong> KES {salary?.toLocaleString() || '0'}</div>
              <div><strong>Rank:</strong> {rank || '—'}</div>
            </div>
          </div>

        </div>
        <div className="space-y-2 border p-3 rounded-md w-fit">
          <h2 className="font-semibold text-lg text-center">Upcoming Events</h2>
          <Table columns={columns} data={eventsData} />
        </div>
      </div>
    </section>
  );
};

export default TeachersDashboard;

import { useSelector } from 'react-redux';
import {
  FaUserCircle,
  FaUserGraduate,
  FaChalkboardTeacher,
  FaUserFriends,
  FaDollarSign,
} from 'react-icons/fa';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import Axios from '../utils/Axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { AccountsLineGraph } from '../components/AccountsLineGraph';
import { ExpenseBarGraph } from '../components/ExpenseBarGraph';
import EventCalendar from '../components/EventCalender';
import Table from '../components/Table';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { RiDeleteBinLine } from 'react-icons/ri';
import { createColumnHelper } from '@tanstack/react-table';
import DeleteBox from '../components/DeleteBox';
import toast from 'react-hot-toast';
import EditEvent from '../components/EditEvent';


const StatCard = ({ icon, label, value, iconColor }) => (
  <div className="border p-4 flex items-stretch gap-2 shadow-md rounded  h-20">
    <div className="grid place-items-center flex-1 text-xs">
      <p className={iconColor}>{icon}</p>
      <h2 className="font-semibold">{label}</h2>
    </div>

    {/* Vertical Divider */}
    <div className="w-[2px] bg-red-300 h-full"></div>

    <div className="flex items-center justify-center flex-1">
      <p className="font-semibold">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  const user = useSelector((state) => state.user);
  const [studentsData, setStudentsData] = useState([]);
  const [teachersData, setTeachersData] = useState([]);
  const [parentsData, setParentData] = useState([]);
  const [accountSummary, setAccountSummary] = useState({
    totalFees: 0,
    totalPaid: 0,
    outstanding: 0
  });
  const [eventsData, setEventsData] = useState([]);
  const [openEditEvent, setOpenEditEvent] = useState(false)
  const [openDeleteEvent, setOpenDeleteEvent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [editEventData, setEditEventData] = useState({
    _id: ''
  })
  const [deleteEventData, setDeleteEventData] = useState({
    _id: ''
  })

  const fetchParentsDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.fetchAllParents
      })
      const { data: responseData } = response
      if (responseData.success) {
        setParentData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchTeachersDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.teachersDetails,
      })
      const { data: responseData } = response
      if (responseData.success) {
        setTeachersData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchStudentsDetails = async () => {
    try {
      setLoading(true)
      const response = await Axios({
        ...SummaryApi.studentsDetails,
      })
      const { data: responseData } = response
      if (responseData.success) {
        setStudentsData(responseData.data)
      }
    } catch (error) {
      AxiosToastError(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAccountSummary = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.accountSummary
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setAccountSummary(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }

  const fetchEvents = async () => {
    try {
      const response = await Axios({
        ...SummaryApi.getEvents
      });
      const { data: responseData } = response;
      if (responseData.success) {
        setEventsData(responseData.data);
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }

  const handleDeleteEvent = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios({
        ...SummaryApi.deleteEvent,
        url: `api/events/delete-event/${deleteEventData._id}`
      });
      const { data: responseData } = response;
      if (responseData.success) {
        toast.success(responseData.message);
        setOpenDeleteEvent(false);
        setDeleteEventData({ _id: '' });
        fetchEvents();
      }
    } catch (error) {
      AxiosToastError(error);
    }
  }

  useEffect(() => {
    fetchEvents()
    fetchAccountSummary()
    fetchStudentsDetails()
    fetchTeachersDetails()
    fetchParentsDetails()
  }, []);

  const columnHelper = createColumnHelper()

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
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className='flex justify-between'>
            <button
              onClick={() => {
                setEditEventData(row.original)
                setOpenEditEvent(true)
              }}
              className='text-blue-600 hover:text-blue-800 cursor-pointer'>
              <div>
                <HiOutlinePencilSquare size={20} />
                <p className='text-xs'>edit</p>
              </div>
            </button>
            <button
              onClick={() => {
                setDeleteEventData(row.original)
                setOpenDeleteEvent(true)
              }}
              className='text-red-600 hover:text-red-800 cursor-pointer'>
              <div>
                <RiDeleteBinLine size={20} />
                <p className='text-xs'>delete</p>
              </div>
            </button>
          </div>
        )
      }
    })
  ]


  return (
    <section className="grid gap-6">
      {/* Header */}
      <div className="border w-full p-1 shadow-2xl flex items-center justify-between rounded">
        <span className='px-4 font-semibold'>
          Welcome👋🎉 {user.firstName} {user.lastName}{' '}
          <span className="text-green-500 text-xs bg-green-200 rounded-2xl p-1">
            {user.role}
          </span>
        </span>
        <div className="w-16 h-16 flex items-center justify-center rounded-full overflow-hidden drop-shadow-lg">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-16 h-16" />
          ) : (
            <FaUserCircle size={65} />
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="flex justify-between flex-wrap gap-4">
        <div className='flex gap-2 w-fit'>
          <StatCard
            icon={<FaUserGraduate size={25} />}
            label="Students"
            value={studentsData.length}
            iconColor="text-green-500"
          />
          <StatCard
            icon={<FaChalkboardTeacher size={25} />}
            label="Teachers"
            value={teachersData.length}
            iconColor="text-blue-500"
          />
          <StatCard
            icon={<FaUserFriends size={25} />}
            label="Parents"
            value={parentsData.length}
            iconColor="text-yellow-500"
          />
          <StatCard
            icon={<FaDollarSign size={25} />}
            label="Total Fees"
            value={`KES ${accountSummary.totalFees.toLocaleString()}`}
            iconColor="text-purple-500"
          />
          <StatCard
            icon={<FaDollarSign size={25} />}
            label="Amount Paid"
            value={`KES ${accountSummary.totalPaid.toLocaleString()}`}
            iconColor="text-green-500"
          />
          <StatCard
            icon={<FaDollarSign size={25} />}
            label="Outstanding"
            value={`KES ${accountSummary.outstanding.toLocaleString()}`}
            iconColor="text-red-500"
          />
        </div>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <AccountsLineGraph />
        </div>
        <div>
          <ExpenseBarGraph />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-[60vh]">
        <div className="border rounded p-2 h-full shadow-sm flex flex-col sticky">
          <EventCalendar onSuccess={() => fetchEvents()} />
        </div>

        <div className="border rounded p-2 h-full shadow-sm overflow-auto flex flex-col">
          <Table columns={columns} data={eventsData} />
        </div>
      </div>
      {
        openDeleteEvent && (
          <DeleteBox
            cancel={() => setOpenDeleteEvent(false)}
            confirm={handleDeleteEvent}
            close={() => setOpenDeleteEvent(false)}
            data={deleteEventData}
          />
        )
      }
      {
        openEditEvent && (
          <EditEvent
            eventData={editEventData}
            close={() => setOpenEditEvent(false)}
            onSuccess={() => fetchEvents()}
          />
        )
      }
    </section>
  );
};


export default AdminDashboard;
import { useEffect, useState } from 'react'
import AddNewTeacher from '../components/AddNewTeacher'
import Table from '../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { IoEyeOutline } from "react-icons/io5";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiDeleteBinLine } from "react-icons/ri";
import UpdateTeacher from '../components/UpdateTeacher'
import DeleteConfirmBox from '../components/DeleteConfirmBox'
import { FaUser } from "react-icons/fa";
import ViewData from '../components/ViewData'

const Teachers = () => {
  const [openAddNew, setAddNew] = useState(false)
  const [loading, setLoading] = useState(false)
  const [teachersData, setTeachersData] = useState([])
  const [openUpdateData, setOpenUpdateData] = useState(false)
  const [openDeleteData, setOpenDeleteData] = useState(false)
  const [openViewData, setOpenViewData] = useState(false)
  const [viewData, setViewData] = useState({
    _id: ''
  })

  const columnHelper = createColumnHelper()

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

  useEffect(() => {
    fetchTeachersDetails()
  }, [])


  const columns = [
    columnHelper.accessor('userId', {
      header: 'UserID',
      cell: info => <span className="text-sm text-gray-700">{info.getValue()}</span>,
    }),
    columnHelper.accessor('avatar', {
      header: 'Profile',
      cell: info => (
        <img
          src={info.getValue()}
          alt="User"
          className="h-10 w-10 rounded-full object-cover"
        />
      ),
    }),
    columnHelper.accessor(row => `${row.firstName} ${row.lastName}`, {
      id: 'name',
      header: 'Name',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('email', {
      header: 'Email',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('mobile', {
      header: 'Mobile',
      cell: info => info.getValue() || '—'

    }),
    columnHelper.accessor('role', {
      header: 'Role',
      cell: info => info.getValue()
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className='flex justify-between'>
            <button
              onClick={() => {
                setOpenViewData(true)
                setViewData(row.original._id)
              }}
              className='text-blue-600 hover:text-blue-800 cursor-pointer'>
              <div>
                <IoEyeOutline size={20} />
                <p className='text-xs'>view</p>
              </div>
            </button>
            <button
              onClick={() => {
                setOpenUpdateData(true)
              }}
              className='text-green-600 hover:text-green-800 cursor-pointer'>
              <div>
                <HiOutlinePencilSquare size={20} />
                <p className='text-xs'>update</p>
              </div>
            </button>
          </div>
        )
      }
    })
  ]
  return (
    <section>
      <div className='border flex items-center justify-between shadow-2xl'>
        <h1 className='font-semibold p-2'>All Teachers</h1>
        <div className='flex gap-0.5'>
          <div className='flex gap-0.5 px-3 py-1 m-2 bg-red-800 text-white rounded hover:bg-red-600 '>
            <button onClick={() => {
              setOpenDeleteData(true)
            }}
              className='font-semibold '>Delete</button>
            <p><RiDeleteBinLine size={20} /></p>
          </div>
          <div className=' flex gap-0.5  px-2 py-1 m-2 bg-blue-900 text-white rounded hover:bg-blue-700 '>
            <button onClick={() => setAddNew(true)} className='font-semibold'>Register</button>
            <p><FaUser size={20} /></p>
          </div>
        </div>
      </div>
      <div className='overflow-auto w-full max-w-[95vw]'>
        <Table
          columns={columns}
          data={teachersData}
        />
      </div>
      {
        openAddNew && (
          <AddNewTeacher close={() => setAddNew(false)} onSuccess={fetchTeachersDetails} />
        )
      }
      {
        openUpdateData && (
          <UpdateTeacher close={() => setOpenUpdateData(false)} />
        )
      }
      {
        openDeleteData && (
          <DeleteConfirmBox close={() => setOpenDeleteData(false)} cancel={() => setOpenDeleteData(false)} onSuccess={fetchTeachersDetails} />
        )
      }
      {
        openViewData && (
          <ViewData data={viewData} close={() => setOpenViewData(false)} />
        )
      }

    </section>
  )
}

export default Teachers
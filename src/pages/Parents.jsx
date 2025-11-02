import { useState } from 'react'
import AddNewParent from '../components/AddNewParent'
import { FaUser } from 'react-icons/fa'
import Table from '../components/Table'
import { createColumnHelper } from '@tanstack/react-table'
import { HiOutlinePencilSquare } from 'react-icons/hi2'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import { useEffect } from 'react'
import { RiDeleteBinLine } from 'react-icons/ri'
import EditParent from '../components/EditParent'
import DeleteParent from '../components/DeleteParent'
import toast from 'react-hot-toast'

const Parents = () => {
  const [openAddNew, setAddNew] = useState(false)
  const [parentData, setParentData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openEditParent, setOpenEditParent] = useState(false)
  const [openDeleteParent, setOpenDeleteParent] = useState(false)
  const [editParentData, setEditParentData] = useState({
    _id: ''
  })
  const [deleteParentData, setDeleteParentData] = useState({
    _id: ''
  })

  const columnHelper = createColumnHelper()
  const columns = [
    columnHelper.accessor('name', {
      header: 'Name',
      cell: info => info.getValue()
    }),

    columnHelper.accessor('relation', {
      header: 'Relation',
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

    columnHelper.accessor(
      row => `${row.address?.street ?? ''}, ${row.address?.city ?? ''}, ${row.address?.country ?? ''}`,
      {
        id: 'address',
        header: 'Address',
        cell: info => info.getValue()
      }
    ),
    columnHelper.accessor('student', {
      header: 'Students',
      cell: info => {
        const students = info.getValue();
        if (!Array.isArray(students) || students.length === 0) return '—';

        return students
          .map(s => {
            const first = s?.firstName ?? '';
            const last = s?.lastName ?? '';
            const id = s?.userId ?? s?._id ?? '';
            return `${first} ${last} (${id})`.trim();
          })
          .join(', ');
      }
    }),
    columnHelper.accessor('_id', {
      header: 'Action',
      cell: ({ row }) => {
        return (
          <div className='flex gap-4 items-center justify-between'>
            <button
              onClick={() => {
                setOpenEditParent(true)
                setEditParentData(row.original)
              }}
              className='text-blue-600 hover:text-blue-800 cursor-pointer'>
              <div>
                <HiOutlinePencilSquare size={20} />
                <p className='text-xs'>edit</p>
              </div>
            </button>
            <button
              onClick={() => {
                setOpenDeleteParent(true)
                setDeleteParentData(row.original)
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
  ];

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

  useEffect(() => {
    fetchParentsDetails()
  }, [])

  const handleDeleteParent = async (e) => {
    e.preventDefault()
    try {
      const response = await Axios({
        ...SummaryApi.deleteParentsDetails,
        url: `/api/parents/delete-details/${deleteParentData._id}`
      })
      const { data: responseData } = response

      if (responseData.success) {
        toast.success(responseData.message)
        fetchParentsDetails()
        setOpenDeleteParent(false)
        setDeleteParentData({ _id: '' })
      }
    } catch (error) {
      AxiosToastError(error)
    }
  }
  return (
    <section>
      <div className='border flex items-center justify-between shadow-2xl'>
        <h1 className='font-semibold p-2'>All Parents</h1>
        <div className=' flex gap-0.5  px-2 py-1 m-2 bg-blue-900 text-white rounded hover:bg-blue-700 '>
          <button onClick={() => setAddNew(true)} className='font-semibold'>Register</button>
          <p><FaUser size={20} /></p>
        </div>
      </div>
      <div className='overflow-auto w-full max-w-[95vw]'>
        <Table
          columns={columns}
          data={parentData}
        />
      </div>
      {
        openAddNew && (
          <AddNewParent close={() => setAddNew(false)} onSuccess={fetchParentsDetails} />
        )
      }
      {
        openEditParent && (
          <EditParent close={() => setOpenEditParent(false)} data={editParentData} fetchData={fetchParentsDetails} />
        )
      }
      {
        openDeleteParent && (
          <DeleteParent close={() => setOpenDeleteParent(false)} cancel={() => setOpenDeleteParent(false)} data={deleteParentData} confirm={handleDeleteParent} />
        )
      }

    </section>
  )
}

export default Parents
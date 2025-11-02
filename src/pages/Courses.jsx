import { createColumnHelper } from '@tanstack/react-table'
import { useEffect, useState } from 'react';
import { MdAddBox } from "react-icons/md";
import Table from '../components/Table';
import AddNewCourse from '../components/AddNewCourse';
import Axios from '../utils/Axios';
import SummaryApi from '../common/SummaryApi';
import AxiosToastError from '../utils/AxiosToastError';
import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { RiDeleteBinLine } from 'react-icons/ri';
import EditCourse from '../components/EditCourse';
import ConfirmBox from '../components/confirmBox';
import toast from 'react-hot-toast';


const Courses = () => {
    const [courseData, setCourseData] = useState([])
    const [openAddNew, setOpenAddNew] = useState(false)
    const [openEditData, setOpenEditData] = useState(false)
    const [openDeleteData, setOpenDeleteData] = useState(false)
    const [loading, setLoading] = useState(false)
    const [editData, setEditData] = useState({
        _id: ''
    })
    const [deleteData, setDeleteData] = useState({
        _id: ''
    })
    const columnHelper = createColumnHelper()

    const columns = [
        columnHelper.accessor('courseName', {
            header: 'Course Name',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('department', {
            header: 'Department',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('academicLevel', {
            header: 'Academic Level',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('duration', {
            header: 'Duration',
            cell: info => info.getValue()
        }),
        columnHelper.accessor('fees', {
            header: 'Fees',
            cell: info => `KES ${info.getValue().toLocaleString()}`
        }),
        columnHelper.accessor('_id', {
            header: 'Action',
            cell: ({ row }) => {
                return (
                    <div className='flex justify-between'>
                        <button
                            onClick={() => {
                                setEditData(row.original)
                                setOpenEditData(true)
                            }}
                            className='text-blue-600 hover:text-blue-800 cursor-pointer'>
                            <div>
                                <HiOutlinePencilSquare size={20} />
                                <p className='text-xs'>edit</p>
                            </div>
                        </button>
                        <button
                            onClick={() => {
                                setDeleteData(row.original)
                                setOpenDeleteData(true)
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
    const fetchCourse = async () => {
        try {
            setLoading(true)
            const response = await Axios({
                ...SummaryApi.getCourse
            })
            const { data: responseData } = response
            if (responseData.success) {
                setCourseData(responseData.data)
            }
        } catch (error) {
            AxiosToastError(error)
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchCourse()
    }, [])

    const handleDeleteCourse = async (e) => {
        e.preventDefault()
        try {
            const response = await Axios({
                ...SummaryApi.deleteCourse,
                url: `/api/course/delete-course/${deleteData._id}`,

            })
            const { data: responseData } = response

            if (responseData.success) {
                toast.success(responseData.message)
                fetchCourse()
                setOpenDeleteData(false)
                setDeleteData({ _id: '' })
            }
        } catch (error) {
            AxiosToastError(error)
        }
    }
    return (

        <section>
            <div className='border flex items-center justify-between shadow-2xl'>
                <h1 className='font-semibold p-2'>All Courses</h1>
                <div className=' flex gap-0.5 items-center px-2 py-1 m-2 bg-blue-900 text-white rounded hover:bg-blue-700 '>
                    <button onClick={() => setOpenAddNew(true)} className='font-semibold'>Course</button>
                    <p><MdAddBox size={20} /></p>
                </div>
            </div>
            <div className='overflow-auto w-full max-w-[95vw]'>
                <Table
                    columns={columns}
                    data={courseData}
                />
            </div>
            {
                openAddNew && (
                    <AddNewCourse close={() => setOpenAddNew(false)} onSuccess={fetchCourse} />
                )
            }
            {
                openEditData && (
                    <EditCourse data={editData} close={() => setOpenEditData(false)} fetchData={fetchCourse} />
                )
            }
            {
                openDeleteData && (
                    <ConfirmBox data={deleteData} close={() => setOpenDeleteData(false)} cancel={() => setOpenDeleteData(false)} confirm={handleDeleteCourse} />
                )
            }
        </section>
    )
}

export default Courses
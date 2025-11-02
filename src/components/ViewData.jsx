import { useEffect, useState } from 'react'
import Axios from '../utils/Axios'
import SummaryApi from '../common/SummaryApi'
import AxiosToastError from '../utils/AxiosToastError'
import Loading from './Loading'
import { IoClose } from 'react-icons/io5'

const ViewData = ({ data: id, close }) => {
    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                setLoading(true)
                const response = await Axios({
                    ...SummaryApi.viewInfo,
                    url: `/api/teachers/${id}/view`
                })
                const { data: responseData } = response
                if (responseData.success) {
                    setTeacher(responseData.data)
                }
            } catch (error) {
                AxiosToastError(error)
            } finally {
                setLoading(false)
            }
        }

        if (id) fetchTeacher()
    }, [id])

    if (loading) {
        return <div className="p-4 flex gap-1 justify-center items-start">
            <p><Loading /></p>
            <p>loading...</p>
        </div>
    }
    if (!teacher) return null

    const { userId, department, salary, rank, isActive } = teacher

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
                <button onClick={close} className="absolute top-2 right-2"><IoClose size={25}/></button>
                <h2 className="text-xl font-semibold mb-4">Teacher Profile</h2>

                <div className="space-y-2">
                    <div className="flex items-center gap-3">
                        <img src={userId.avatar} alt="Avatar" className="w-40 h-40 rounded-full object-cover" />
                        <div>
                            <p className="font-semibold">{userId.firstName} {userId.lastName}</p>
                            <p className="text-sm ">{userId.email}</p>
                            <p className="text-sm ">{userId.mobile || '—'}</p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mt-4">
                        <div><strong>Department:</strong> {department}</div>
                        <div><strong>Rank:</strong> {rank}</div>
                        <div><strong>Salary:</strong> KES {salary.toLocaleString()}</div>
                        <div><strong>Status:</strong> {isActive ? 'Active' : 'Inactive'}</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewData

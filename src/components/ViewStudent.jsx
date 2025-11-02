import React, { useEffect, useState } from 'react'
import Loading from './Loading'
import AxiosToastError from '../utils/AxiosToastError'
import SummaryApi from '../common/SummaryApi'
import Axios from '../utils/Axios'
import { IoClose } from 'react-icons/io5'

const ViewStudent = ({ data: id, close }) => {
  const [student, setStudent] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        setLoading(true)
        const response = await Axios({
          ...SummaryApi.ViewStudentDetails,
          url: `/api/students/${id}/view`
        })
        const { data: responseData } = response
        if (responseData.success) {
          setStudent(responseData.data)
        }
      } catch (error) {
        AxiosToastError(error)
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchStudent()
  }, [id])

  if (loading) {
    return <div className="p-4 flex gap-1 justify-center items-start">
      <p><Loading /></p>
      <p>loading...</p>
    </div>
  }

  if (!student) return null
  const { userId, course, parents, amountPaid, feeStatus, status } = student
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-900 text-white p-6 rounded-lg shadow-lg w-full max-w-lg relative">
        <button onClick={close} className="absolute top-2 right-2 cursor-pointer "><IoClose size={25}/></button>
        <h2 className="text-xl font-semibold mb-4">Student Profile</h2>

        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <img src={userId.avatar} alt="Avatar" className="w-40 h-40 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{userId.firstName} {userId.lastName}</p>
              <p className="text-sm ">{userId.email}</p>
              <p className="text-sm ">{userId.mobile || '—'}</p>
              <p className="text-sm text-green-700 bg-green-200 w-fit px-2 rounded">{status}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div >
              <div><strong>Course:</strong> {course.courseName}</div>
              <div><strong>Department:</strong> {course.department}</div>
              <div><strong>Academic Level:</strong>{course.academicLevel}</div>
              <div><strong>Duration:</strong> {course.duration}</div>
              <div >
                <div><strong>Fees:</strong> KES {course.fees.toLocaleString()}</div>
                <div><strong>Amount Paid:</strong> KES {amountPaid.toLocaleString()}</div>
                <div><strong>Fee Status:</strong> {feeStatus}</div>
              </div>
            </div>
            <div>
              <strong>Parents:</strong>
              {parents && parents.length > 0 ? (
                <div className="mt-2 space-y-3">
                  {parents.map((parent, index) => (
                    <div key={index} className="border p-3 rounded-md">
                      <p><strong>Name:</strong> {parent.name}</p>
                      <p><strong>Relation:</strong> {parent.relation}</p>
                      <p><strong>Mobile:</strong> {parent.mobile}</p>
                      <p><strong>Email:</strong> {parent.email}</p>
                      {parent.address && (
                        <div className="text-sm text-white mt-1">
                          <p><strong>Address:</strong></p>
                          <p>{parent.address.street}, {parent.address.city}, {parent.address.country}</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm ">No parent data available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewStudent
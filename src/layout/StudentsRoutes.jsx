import React from 'react'
import { useSelector } from 'react-redux'
import isStudent from '../utils/isStudent'

const StudentsRoutes = ({children}) => {
    const user = useSelector((state) => state.user)
  return (
    <>
    {
         isStudent(user.role) ?  children : <p className='text-red-600 bg-red-100 p-4'>Not Authrised</p>
    }
    </>
  )
}

export default StudentsRoutes
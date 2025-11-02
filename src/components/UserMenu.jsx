import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { GiGraduateCap } from "react-icons/gi";
import {
    FaTachometerAlt, FaUserGraduate, FaChalkboardTeacher,
    FaUserFriends, FaBook, FaMoneyBillAlt
} from "react-icons/fa";
import isAdmin from '../utils/isAdmin'
import isTeacher from '../utils/isTeacher'
import isStudent from '../utils/isStudent';

const UserMenu = () => {
    const user = useSelector((state) => state.user)
    return (
        <section>
            <div className='text-sm grid gap-6 text-gray-200'>
                {
                    isAdmin(user.role) && (
                        <Link to={'/home/admin-dashboard'} className='flex gap-1 items-center'>
                            <p><FaTachometerAlt /></p>
                            <p>Admin</p>
                        </Link>
                    )
                }
                {
                    isStudent(user.role) && (
                        <Link to={'/home/staff-dashboard'} className='flex gap-1 items-center'>
                            <p><FaTachometerAlt /></p>
                            <p>Dashboard</p>
                        </Link>
                    )
                }
                {
                    isTeacher(user.role) && (
                        <Link to={'/home/student-dashboard'} className='flex gap-1 items-center'>
                            <p><FaTachometerAlt /></p>
                            <p>Dashboard</p>
                        </Link>
                    )
                }
                {
                    isAdmin(user.role) && (
                        <Link to={'/home/teachers'} className='flex gap-1 items-center'>
                            <p><FaChalkboardTeacher /></p>
                            <p>Teacher</p>
                        </Link>
                    )
                }
                {
                    isAdmin(user.role) && (
                        <Link to={'/home/students'} className='flex gap-1 items-center'>
                            <p><FaUserGraduate /></p>
                            <p> Student</p>
                        </Link>
                    )
                }
                {
                    isTeacher(user.role) && (
                        <Link to={'/home/students'} className='flex gap-1 items-center'>
                            <p> <FaUserGraduate /></p>
                            <p> Student</p>
                        </Link>
                    )
                }
                {
                    isAdmin(user.role) && (
                        <Link to={'/home/course'} className='flex gap-1 items-center'>
                            <p><GiGraduateCap /></p>
                            <p> Course</p>
                        </Link>
                    )
                }
                {
                    isAdmin(user.role) && (
                        <Link to={'/home/parents'} className='flex gap-1 items-center'>
                            <p><FaUserFriends /></p>
                            <p>Parents</p>
                        </Link>
                    )
                }
                {
                    isTeacher(user.role) && (
                        <Link to={'/home/parents'} className='flex gap-1 items-center'>
                            <p><FaUserFriends /></p>
                            <p>Parents</p>
                        </Link>
                    )
                }
                {
                    isAdmin(user.role) && (
                        <Link to={'/home/accounts'} className='flex gap-1 items-center'>
                            <p><FaMoneyBillAlt /></p>
                            <p> Accounts</p>
                        </Link>
                    )
                }

            </div>
        </section>
    )
}

export default UserMenu
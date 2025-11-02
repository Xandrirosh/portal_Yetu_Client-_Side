import { createBrowserRouter } from "react-router-dom";
import App from '../App'
import Home from "../pages/Home";
import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import OtpVerification from "../pages/OtpVerification"
import ResetPassword from "../pages/ResetPassword";
import Students from "../pages/Students";
import Parents from '../pages/Parents'
import Teachers from "../pages/Teachers";
import Library from '../pages/Library'
import Accounts from '../pages/Accounts'
import AdminDashboard from "../pages/AdminDashboard";
import TeachersDashboard from "../pages/TeachersDashboard";
import StudentDashboard from "../pages/StudentDashboard";
import Courses from "../pages/Courses";

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '/',
                element: <Login />
            },
            {
                path: '/forgot-password',
                element: <ForgotPassword />
            },
            {
                path: '/verification-otp',
                element: <OtpVerification />
            },
            {
                path: '/reset-password',
                element: <ResetPassword />
            },
            {
                path: '/home',
                element: <Home />,
                children: [
                    {
                        path:'/home/admin-dashboard',
                        element: <AdminDashboard/>
                    },
                    {
                        path: '/home/staff-dashboard',
                        element: <TeachersDashboard/>
                    },
                    {
                        path: '/home/student-dashboard',
                        element: <StudentDashboard/>
                    },
                    {
                        path: '/home/students',
                        element: <Students />
                    },
                    {
                        path: '/home/course',
                        element: <Courses/>
                    },
                    {
                        path: '/home/parents',
                        element: <Parents />
                    },
                    {
                        path: '/home/teachers',
                        element: <Teachers />
                    },
                    {
                        path: '/home/library',
                        element: <Library />
                    },
                    {
                        path: '/home/accounts',
                        element: <Accounts />
                    }
                ]
            },


        ]
    }
])
export default router
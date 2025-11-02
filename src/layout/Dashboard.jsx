import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import UserMenu from '../components/UserMenu'


const Dashboard = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === "/home" && user?.role) {
      if (user.role === "Admin") navigate("/home/admin-dashboard")
      else if (user.role === "Teacher") navigate("/home/staff-dashboard")
      else if (user.role === "Student") navigate("/home/student-dashboard")
    }
  }, [location.pathname, user, navigate])

  return (
    <section className="bg-gray-100 min-h-[78vh]">
      <div className="container mx-auto flex min-h-[78vh]">
        {/* Sidebar */}
        <aside className="bg-blue-900 w-24 md:w-52 lg:w-62 p-3 sticky top-20 max-h-[80vh] overflow-y-auto hidden lg:block ">
          <UserMenu />
        </aside>

        {/* Main content */}
        <main className="flex-1 p-4 bg-white shadow-sm overflow-y-auto min-h-[75vh]">
          <Outlet />
        </main>
      </div>
    </section>
  )
}

export default Dashboard

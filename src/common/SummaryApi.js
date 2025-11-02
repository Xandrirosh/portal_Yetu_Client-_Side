export const baseURL = import.meta.env.VITE_API_URL 

const SummaryApi = {
    register: {
        url: 'api/users/register',
        method: 'post'
    },
    login: {
        url: 'api/users/login',
        method: 'post'
    },
    logout: {
        url: 'api/users/logout',
        method: 'post'
    },
    uploadprofile: {
        url: 'api/users/upload-avatar',
        method: 'put'
    },
    updateUserDetails: {
        url: 'api/users/update-detail',
        method: 'put'
    },
    forgotPassword: {
        url: 'api/users/forgot-password',
        method: 'put'
    },
    verifyOtp: {
        url: 'api/users/verify-otp',
        method: 'put'
    },
    resetPassword: {
        url: 'api/users/reset-password',
        method: 'put'
    },
    refreshToken: {
        url: 'api/users/refresh-token',
        method: 'post'
    },
    userDetails: {
        url: 'api/users/user-details',
        method: 'get'
    },
    teachersDetails: {
        url: 'api/teachers/get-details',
        method: 'get'
    },
    updateTeachersDetails: {
        url: 'api/teachers/update-details',
        method: 'put'
    },
    deleteTeacher: {
        url: 'api/teachers/delete-details',
        method: 'delete'
    },
    expenseTeacher: {
        url: 'api/teachers/expense-summary',
        method: 'get'
    },
    viewInfo: {
        url: 'api/teachers/:userId/view',
        method: 'get'
    },
    uploadImage: {
        url: 'api/file/upload-image',
        method: 'post'
    },
    registerCourse: {
        url: 'api/course/register-course',
        method: 'post'
    },
    getCourse: {
        url: 'api/course/get-course',
        method: 'get'
    },
    updateCourse: {
        url: 'api/course/update-course/:id',
        method: 'put'
    },
    deleteCourse: {
        url: 'api/course/delete-course/:id',
        method: 'delete'
    },
    accountSummary: {
        url: 'api/course/get-fees',
        method: 'get'
    },
    getMonthlyAccounts: {
        url: 'api/course/get-monthy-summary',
        method: 'get'
    },
    studentsDetails: {
        url: 'api/students/get-details',
        method: 'get'
    },
    updateStudentDetails: {
        url: 'api/students/update-details/:id',
        method: 'post'
    },
    ViewStudentDetails: {
        url: 'api/students/:userId/view',
        method: 'get'
    },
    deleteStudentDetails: {
        url: 'api/students/delete-details',
        method: 'delete'
    },
    registerParents: {
        url: 'api/parents/register',
        method: 'post'
    },
    fetchAllParents: {
        url: 'api/parents/get-details',
        method: 'get'
    },
    updateParentsDetails: {
        url: 'api/parents/update-details/:id',
        method: 'put'
    },
    deleteParentsDetails: {
        url: 'api/parents/delete-details/:id',
        method: 'delete'
    },
    getEvents: {
        url: 'api/events/get-events',
        method: 'get'
    },
    createEvent: {
        url: 'api/events/create-event',
        method: 'post'
    },
    updateEvent: {
        url: 'api/events/update-event/:id',
        method: 'put'
    },
    deleteEvent: {
        url: 'api/events/delete-event/:id',
        method: 'delete'
    }
}

export default SummaryApi
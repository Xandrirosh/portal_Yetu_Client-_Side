import { createSlice } from '@reduxjs/toolkit'
const initialValue = {
    _id: "",
    userId: "",
    firstName: "",
    lastName: "",
    email: "",
    role: "",
    avatar: "",
    mobile: "",
    last_login_date: "",
    status: "",
    verify_email: "",
    studentProfile: null,
    teacherProfile : null
}

const userSlice = createSlice({
    name: 'user',
    initialState: initialValue,
    reducers: {
        setUserDetails: (state, action) => {
            state._id = action.payload?._id
            state.userId = action.payload?.userId
            state.firstName = action.payload?.firstName
            state.lastName = action.payload?.lastName
            state.email = action.payload?.email
            state.role = action.payload?.role
            state.avatar = action.payload?.avatar
            state.mobile = action.payload?.mobile
            state.last_login_date = action.payload?.last_login_date
            state.status = action.payload?.status
            state.verify_email = action.payload?.verify_email
            state.studentProfile = action.payload?.studentProfile || null
            state.teacherProfile = action.payload?.teacherProfile || null
        },
        updateAvatar: (state, action) => {
            state.avatar = action.payload
        },
        logout: (state, action) => {
            state._id = ""
            state.userId = ""
            state.firstName = ""
            state.lastName = ""
            state.email = ""
            state.role = ""
            state.avatar = ""
            state.mobile = ""
            state.last_login_date = ""
            state.status = ""
            state.verify_email = ""
            state.studentProfile = null
            state.teacherProfile = null
        }
    }
})

export const { setUserDetails, updateAvatar, logout } = userSlice.actions

export default userSlice.reducer
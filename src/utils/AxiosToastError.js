import toast from "react-hot-toast"

const AxiosToastError = (error) => {
 toast.error(
    error?.response?.data?.message  || "Something went wrong"

 )
}

export default AxiosToastError
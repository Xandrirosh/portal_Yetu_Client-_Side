import { IoClose } from "react-icons/io5";

const DeleteParent = ({ cancel, confirm, close ,data}) => {
    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black/50 z-50 flex items-center justify-center'>
            <div className='bg-white p-4 rounded  w-full max-w-md md:m-0 lg:m-0 m-4'>
                <div className="flex justify-between items-center gap-3">
                    <h1 className='font-semibold'>Permanent Delete</h1>
                    <button onClick={close}  >
                        <IoClose size={25} />
                    </button>
                </div>
                <p className='text-sm text-gray-600 my-4'>
                   {`Are you sure you want to delete "${data.name}"?`}
                </p>
                <div className="flex items-center justify-end gap-2">
                    <button onClick={confirm} className="px-4 py-1 border rounded border-green-700 text-green-700 hover:bg-green-500 hover:text-white">Confirm</button>
                    <button onClick={cancel} className="px-4 py-1 border rounded border-red-500 text-red-700 hover:bg-red-500 hover:text-white">Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default DeleteParent
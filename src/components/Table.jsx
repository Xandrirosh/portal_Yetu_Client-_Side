import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

const Table = ({ data, columns }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel()
    })
    return (
         <div className="p-2">
            <table className='w-full'>
                <thead className='bg-blue-900 text-white'>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            <th>Sr.No</th>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} className='border whitespace-nowrap'>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map((row,index) => (
                        <tr key={row.id}>
                            <td className='border px-2 py-1'>{index+1}</td>
                            {row.getVisibleCells().map(cell => (
                                <td key={cell.id} className='border px-2 py-1 whitespace-nowrap'>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>   
            </table>
            <div className="h-4" />
        </div>
    )
}

export default Table
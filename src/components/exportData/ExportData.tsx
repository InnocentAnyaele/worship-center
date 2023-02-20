import { CSVLink } from "react-csv";


export default function ExportData({data}) {
    return (
        <div className='mt-5'>
        <CSVLink data={data}><span className='text-green-600'>Export Data</span></CSVLink>
    </div>
    )
}
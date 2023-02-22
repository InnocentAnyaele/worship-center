import { CSVLink } from "react-csv";


export default function ExportData(props:any) {
    return (
        <div className='mt-5'>
        <CSVLink data={props.data}><span className='text-green-600'>Export Data</span></CSVLink>
    </div>
    )
}
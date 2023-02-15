import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"

export default function ViewContribution(props:any) {
    return (
        <div className="flex flex-col gap-y-4">
            <span>{`${props.data.month} ${props.data.year}`}</span>
            <span className="font-bold">Total Contributions</span>
            <span>{props.data.totalContributions}</span>
            <span className="font-bold">Dates Added</span>
            <div>
            {props.data.datesAdded.map((item:any, index:any) => (
                <div key={index} className="flex flex-row justify-between">
                    <span>{item.date}</span>
                    <span>{item.amount}</span>
                    <FontAwesomeIcon icon={faTrash} color='red'/>
                </div>
))}
            </div>  
        </div>
    )
}
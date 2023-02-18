import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"

import {getDocs, collection, query, orderBy, where, deleteDoc, doc} from 'firebase/firestore'
import { db } from "@/lib/firebase"

export default function ViewContribution(props:any) {

    console.log(props)

    const [contributions, setContributions] = useState<any>(null)
    const [deleteError, setDeleteError] = useState('')


    useEffect(() => {

        async function filterContributions() {
            let data:any = []
            props.data.datesAdded.forEach((item:any) => {
                if (props.data.monthYear == item.monthYear){
                         data.push(item)             
                }
            })
        console.log(data)
        setContributions(data)
        }
        filterContributions();
    },[])

    function deleteHandler(id:string){
        const docRef = doc(db, "contribution", id)
        deleteDoc(docRef)
        .then(() => {
          console.log('deleted')
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
          setDeleteError('Could not delete')
        })
      }

    return (
        <div className="flex flex-col gap-y-4">
            <span>{props.data.monthYear}</span>
            <span className="font-bold">Total Contributions</span>
            <span>{props.data.totalContributions}</span>
            <span className="font-bold">Dates Added</span>
            {
                      deleteError && 
                      
                      <div className={`text-center text-sm font-regular text-white bg-red-400 border p-1 rounded`}>
                      <span>{deleteError}</span>
                      </div>  
                    }
            <div>

                {
                    contributions ? 

                    <div>
                        {
                            contributions.map((item:any) => (
                                <div key={item.id} className="flex flex-row justify-between"> 
                                 <span>{item.date}</span>
                                 <span>{item.amount}</span>
                                 <FontAwesomeIcon icon={faTrash} color='red' onClick={() => deleteHandler(item.id)}/>
                                </div>
                            ))
                        }
                    </div>

                    
                    : 

                    <span>Loading contributions</span>
                }

            {/* {props.data.datesAdded.map((item:any, index:any) => (
                <div key={index} className="flex flex-row justify-between">
                    <span>{item.date}</span>
                    <span>{item.amount}</span>
                    <FontAwesomeIcon icon={faTrash} color='red'/>
                </div>
))} */}
            </div>  
        </div>
    )
}
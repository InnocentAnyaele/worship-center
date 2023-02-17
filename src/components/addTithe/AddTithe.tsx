import { useEffect, useState } from "react"
import {collection, addDoc, doc, setDoc, orderBy, query, getDocs} from 'firebase/firestore'
import { db } from "@/lib/firebase"

export default function AddTithe() {

    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [member, setMember] = useState('')
    const [error, setError] = useState('')

    const [memberDropdown, setMemberDropdown] = useState<any>(null)

    async function getMemberDropdown () {
        const memberRef = collection(db, "members")
        const memberRefQuery = query(memberRef, orderBy('lastName', 'asc'))
        const snapshots = await getDocs(memberRefQuery)
        .then((snapshots) => {
            const docs = snapshots.docs.map((doc) =>{
                const data = doc.data()
                data.id = doc.id
                return data
              } )
              console.log(docs)
              setMemberDropdown(docs)
        })
    }

    useEffect(() => {
        getMemberDropdown()
    },[])


    function submitHandler(e:any) {
        e.preventDefault()
        let data = {
            'date': date,
            'amount': parseInt(amount),
            'member' : member,
            'dateAdded' : new Date()
        }

        const dbRef = collection(db, "tithe")
        try {
            addDoc(dbRef, data)
            .then((res) => {
                console.log(res)
                window.location.reload()
            })
            .catch((err) => {
                console.log(err)
                setError('Something went wrong')
            })
        }
        catch(e) {
            console.log(e)
            setError('Something went wrong')
        }
    }

    return (
        
        <form className="flex flex-col m-10 border-y-spacing-4" onSubmit={submitHandler}>

            {
                memberDropdown ? 
            <>
            <label className="m-1">Date</label>
            <input className="border w-40 p-2 m-1 rounded" type='date' name='date' value={date}/>
            <label className="m-1">Select Member</label>
            <select className="border p-2 rounded" name="members" value={member} onChange={e => setMember(e.target.value)} required>
                {
                    memberDropdown.map(item => (
                        <option key={item.id} value={item.lastName + ' ' + item.otherNames}>{item.lastName + ' ' + item.otherNames}</option>
                    ))
                }
            </select>
            {/* <input className="border m-1 mb-4 w-40 p-2 rounded" type='number' name='members' value={member}/> */}
            <label className="m-1">Amount</label>
            <input className="border w-40 p-2 m-1 rounded" type='number' name='amount' value={amount} onChange={e=> setAmount(e.target.value)} required/>
            {
                    error && 
                    <div className={`text-center text-white bg-red-400 border p-2 rounded mb-2`}>
                    <span>{error && error}</span>
                </div>
                }
            <button className="text-white m-1 p-2 h-10 rounded w-40 bg-[#1A96FC]" type='submit'>Add Tithe</button>          
            </>
            : 

            <div>
                <span>Loading form...</span>
            </div>
            }


            


        </form>
    )
}
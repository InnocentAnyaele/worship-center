import { useState } from "react"
import {collection, addDoc} from 'firebase/firestore'
import { db } from "@/lib/firebase"

export default function AddContribution() {

    const [month, setMonth] = useState('January')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')

    const [error, setError] = useState('')


    function submitHandler(e:any) {
        e.preventDefault()
        e.preventDefault()  
        const data = {
            'date' : date,
            'month' : month,
            'amount' : parseInt(amount),
            'dateAdded': new Date()
        }
        const dbRef = collection(db, "contribution")
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
        
        <form className="flex flex-col m-10" onSubmit={submitHandler}>
            <label className="m-1">Month</label>
            <select className="border p-2 rounded mb-3" name='month' value={month} onChange={e => setMonth(e.target.value)} required>
                            <option value='January'>January</option>
                            <option value='February'>February</option>
                            <option value='March'>March</option>
                            <option value='April'>April</option>
                            <option value='May'>May</option>
                            <option value='June'>June</option>
                            <option value='July'>July</option>
                            <option value='August'>August</option>
                            <option value='September'>September</option>
                            <option value='October'>October</option>
                            <option value='November'>November</option>
                            <option value='December'>December</option>
            </select>
            <label className="m-1">Date</label>
                <input className="border w-40 p-2 mb-3 rounded" type='date' name='date' value={date} onChange={e=> setDate(e.target.value)} required/>
            <label className="m-1">Amount</label>
            <input className="border w-40 p-2 mb-3 rounded" type='number' name='amount' value={amount} onChange={e => setAmount(e.target.value)} required/>
            {
                    error && 
                    <div className={`text-center text-white bg-red-400 border p-2 rounded mb-2`}>
                    <span>{error}</span>
                </div>
                }
            <button className="text-white m-1 p-2 h-10 rounded w-40 bg-[#8B7E74]" type='submit'>Add Contribution</button>
        </form>
    )
}
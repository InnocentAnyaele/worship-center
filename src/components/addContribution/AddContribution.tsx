import { useState } from "react"

export default function AddContribution() {

    const [month, setMonth] = useState()
    const [date, setDate] = useState()
    const [amount, setAmount] = useState()

    return (
        
        <form className="flex flex-col m-10">
            <label className="m-1">Month</label>
            <select className="border p-2 rounded mb-3" name='month' value={month}>
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
            <input className="border w-40 p-2 mb-3 rounded" type='date' name='date' value={date}/>
            <label className="m-1">Amount</label>
            <input className="border w-40 p-2 mb-3 rounded" type='number' name='amount' value={amount}/>
            <button className="text-white m-1 p-2 h-10 rounded w-40 bg-[#1A96FC]">Add Contribution</button>
        </form>
    )
}
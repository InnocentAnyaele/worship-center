import { useState } from "react"

export default function AddTithe() {

    const [date, setDate] = useState()
    const [amount, setAmount] = useState()
    const [member, setMember] = useState()

    return (
        
        <form className="flex flex-col m-10 border-y-spacing-4">
            <label className="m-1">Date</label>
            <input className="border w-40 p-2 m-1 rounded" type='date' name='date' value={date}/>
            <label className="m-1">Select Member</label>
            <input className="border m-1 mb-4 w-40 p-2 rounded" type='number' name='members' value={member}/>
            <label className="m-1">Amount</label>
            <input className="border w-40 p-2 m-1 rounded" type='number' name='amount' value={amount}/>
            <button className="text-white m-1 p-2 h-10 rounded w-40 bg-[#1A96FC]">Add Tithe</button>
        </form>
    )
}
import { useState } from "react"

export default function AddMember (props:any) {

    let edit

    if (props.data.lastName)  {
        edit = true
    }
    else {
        edit = false
    }

    console.log(edit)


    const [welfare, setWelfare] = useState(props.data.welfare)
    const [lastName, setLastName] = useState(props.data.name)
    const [otherNames, setOtherNames] = useState(props.data.otherNames)
    const [address, setAddress] = useState(props.data.address)
    const [sex, setSex] = useState(props.data.sex)
    const [dateOfBirth, setDateOfBirth] = useState(props.data.dateOfBirth)
    const [nationality, setNationality] = useState(props.data.nationality)
    const [occupation, setOccupation] = useState(props.data.occupation)
    const [phone, setPhone] = useState(props.data.phone)
    const [hometown, setHometown] = useState(props.data.hometown)
    const [region, setRegion] = useState(props.data.region)
    const [residence, setResidence] = useState(props.data.residence)
    const [maritalStatus, setMaritalStatus] = useState(props.data.maritalStatus)
    const [department, setDepartment] = useState(props.data.department)
    const [spouseName, setSpouseName] = useState(props.data.spouseName)
    const [fatherName, setFatherName] = useState(props.data.fatherName)
    const [motherName, setMotherName] = useState(props.data.motherName)
    const [childrenName, setChildrenName] = useState(props.data.childrenName)
    const [nextOfKin, setNextOfKin] = useState(props.data.nextOfKin)
    const [nextOfKinPhone, setNextOfKinPhone] = useState(props.data.nextOfKinPhone)
    const [declaration, setDeclaration] = useState(props.data.declaration)
    const [dateOfFirstVisit, setDateOfFirstVisit] = useState(props.data.dateOfFirstVisit)
    const [dateOfBaptism, setDateOfBaptism] = useState(props.data.dateOfBaptism)
    const [membership, setMembership] = useState(props.membership)
    const [dateOfTransfer, setDateOfTransfer] = useState(props.data.dateOfTransfer)
    const [officerInCharge, setOfficerInCharge] = useState(props.data.officerInCharge)
    const [officerSignatureDate, setOfficerSignatureDate] = useState(props.data.officerSignatureDate)
    const [headPastorSignatureDate, setHeadPastorSignatureDate] = useState(props.data.headPastorSignatureDate)
    const [status, setStatus] = useState(props.data.status)



    return (
        // <div className="w-[50%] rounded border p-5 h-[100vh] overflow-auto text-sm">
            <form className="flex flex-col flex-wrap mt-10">
                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Welfare No.</label>
                        <input className="border p-2 rounded" name="welfare"  value={welfare} type='text'/>
                    </div>
                    <div className="flex flex-col">
                        <label>Last Name</label>
                        <input className="border p-2 rounded" name="lastName" type='text' value={lastName}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Other Names</label>
                        <input className="border p-2 rounded" name="otherNames" type='text' value={otherNames}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Address</label>
                        <input className="border p-2 rounded" name="address" type='text' value={address}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Sex</label>
                        <input className="border p-2 rounded" name="sex" type='text' value={sex}/>
                    </div>
                    <div className="flex flex-col w-[190px]">
                        <label>Date of Birth</label>
                        <input className="border p-2 rounded" name="dateOfBirth" value={dateOfBirth}  type='date'/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Nationality</label>
                        <input className="border p-2 rounded" name="nationality" type='text' value={nationality}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Occupation</label>
                        <input className="border p-2 rounded" name="occupation" type='text' value={occupation}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Phone Number</label>
                        <input className="border p-2 rounded" name="phone" type='text' value={phone}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Hometown</label>
                        <input className="border p-2 rounded" name="hometown" type='text' value={hometown} />
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Region</label>
                        <input className="border p-2 rounded" name="region" type='text' value={region} />
                    </div>
                    <div className="flex flex-col">
                        <label>Residence</label>
                        <input className="border p-2 rounded" name="residence" type='text' value={residence}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Marital Status</label>
                        <select className="border p-2 rounded w-[190px]" name='maritalStatus' value={maritalStatus}>
                            <option value='single'>Single</option>
                            <option value='married'>Married</option>
                        </select>
                    </div>
                    <div className="flex flex-col">
                        <label>Department</label>
                        <select className="border p-2 rounded w-[190px]" name='department' value={department}>
                            <option value='instrumentalist'>Instrumentalist</option>
                            <option value='choirister'>Chorister</option>
                            <option value='childrenMinistry'>Children Minstry</option>
                            <option value='teacher'>Teacher</option>
                            <option value='administration'>Adminstration</option>
                            <option value='usher'>Usher</option>
                        </select>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Spouse Name</label>
                        <input className="border p-2 rounded" name="spouseName" type='text' value={spouseName}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Fathers Name</label>
                        <input className="border p-2 rounded" name="fatherName" type='text' value={fatherName}/>
                    </div>
                </div>


                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Mothers Name</label>
                        <input className="border p-2 rounded" name="motherName" type='text' value={motherName}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Children Name</label>
                        <textarea className="border p-2 rounded" name="childrenName" value={childrenName}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                    <div className="flex flex-col">
                        <label>Next of Kin</label>
                        <input className="border p-2 rounded" name="nextOfKin" type='text' value={nextOfKin}/>
                    </div>
                    <div className="flex flex-col">
                        <label>Next of Kin Telephone</label>
                        <input className="border p-2 rounded" name="nextOfKinPhone" type='text' value={nextOfKinPhone}/>
                    </div>
                </div>


                <div className="flex flex-row justify-between my-5">
                <div className="flex flex-col">
                        <label>Declaration</label>
                        <select className="border p-2 rounded w-[190px]" name='declaration' value={declaration}>
                            <option value='signed'>Signed</option>
                            <option value='unsigned'>Unsigned</option>
                        </select>
                    </div>
                    <div className="flex flex-col w-[190px]">
                        <label>Date of First Visit</label>
                        <input className="border p-2 rounded" name="dateOfFirstVisit" type='date' value={dateOfFirstVisit}/>
                    </div>
                </div>

                
                <div className="flex flex-row justify-between my-5">
                <div className="flex flex-col w-[190px]">
                        <label>Date of Baptism</label>
                        <input className="border p-2 rounded" name="dateOfBaptism" type='date' value={dateOfBaptism}/>
                    </div>
                    <div className="flex flex-col w-[190px]">
                        <label>Membership</label>
                        <input className="border p-2 rounded" name="membership" type='text' value={membership}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                <div className="flex flex-col w-[190px]">
                        <label>Date of Transfer</label>
                        <input className="border p-2 rounded" name="dateOfTransfer" type='date' value={dateOfTransfer}/>
                    </div>
                    <div className="flex flex-col w-[190px]">
                        <label>Officer in Charge</label>
                        <input className="border p-2 rounded" name="officerInCharge" type='text' value={officerInCharge}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                <div className="flex flex-col w-[190px]">
                        <label>Officer Signature Date</label>
                        <input className="border p-2 rounded" name="officerSignatureDate" type='date' value={officerSignatureDate}/>
                    </div>
                    <div className="flex flex-col w-[190px]">
                        <label>Head Pastor Signature Date</label>
                        <input className="border p-2 rounded" name="headPastorSignatureDate" type='date' value={headPastorSignatureDate}/>
                    </div>
                </div>

                <div className="flex flex-row justify-between my-5">
                <div className="flex flex-col">
                        <label>Status</label>
                        <select className="border p-2 rounded w-[190px]" name='status' value={status}>
                            <option value='active'>Active</option>
                            <option value='inactive'>Inactive</option>
                        </select>
                    </div>
                </div>

                <button className="p-2 rounded bg-[#1A96FC] text-white">Add Member</button>

            </form>
        // </div>
    )
}
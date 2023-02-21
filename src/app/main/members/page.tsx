'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import AddMember from '@/components/addMember/AddMember'
import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment, useEffect } from 'react'
import ViewMember from '@/components/viewMember/ViewMember'
import Image from "next/image"

// import { viewDataInterface } from '@/lib/interfaces'

import {getDocs, collection, query, orderBy, where, deleteDoc, doc} from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage"
import { db, storage } from "@/lib/firebase"

import ExportData from '@/components/exportData/ExportData'


export interface viewDataInterface {
    'id': string,
    'imageUrl': string,
    'welfare' : string;
    'lastName' : string;
    'otherNames' : string;
    'address' : string;
    'sex' : string;
    'dateOfBirth' : string;
    'nationality' : string;
    'occupation' : string;
    'phone' : string;
    'hometown' : string;
    'region' : string;
    'residence' : string;
    'maritalStatus': string;
    'department' : string;
    'spouseName' : string;
    'fatherName' : string;
    'motherName' : string;
    'childrenName' : string;
    'nextOfKin' : string;
    'nextOfKinPhone': string;
    'declaration' : string;
    'dateOfFirstVisit': string;
    'dateOfBaptism': string;
    'membership' : string;
    'dateOfTransfer' : string;
    'officerInCharge': string;
    'officerSignatureDate': string;
    'headPastorSignatureDate': string;
    'status' : string;
}


import { Montserrat } from "@next/font/google"
import Link from 'next/link'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export default function Members () {

    const emptyMemberData= {
        'id': '',
        'imageUrl': '',
        'welfare' : '',
        'lastName' : '',
        'otherNames' : '',
        'address' : '',
        'sex' : 'Male',
        'dateOfBirth' : '',
        'nationality' : '',
        'occupation' : '',
        'phone' : '',
        'hometown' : '',
        'region' : '',
        'residence' : '',
        'maritalStatus': 'Single',
        'department' : 'Men Ministry',
        'spouseName' : '',
        'fatherName' : '',
        'motherName' : '',
        'childrenName' : '',
        'nextOfKin' : '',
        'nextOfKinPhone': '',
        'declaration' : 'Unsigned',
        'dateOfFirstVisit': '',
        'dateOfBaptism': '',
        'membership' : '',
        'dateOfTransfer' : '',
        'officerInCharge': '',
        'officerSignatureDate': '',
        'headPastorSignatureDate': '',
        'status' : 'Active',
    }

    let [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    let [isViewMemberOpen, setIsViewMemberOpen] = useState(false)
    let [viewMemberData, setViewMemberData] = useState<viewDataInterface>(emptyMemberData)


    let [exportData, setExportData] = useState<any>(null)

    const [memberData, setMemberData] = useState<any>(null)
    const [search, setSearch] = useState('')

    const [deleteError, setDeleteError] = useState('')


    useEffect(() => {
      const fetchMemberData = async () => {
        let exportDataTmp = [["Welfare No","Last Name", "First Name", "Department", "Sex", "Date of Birth", "Date of First Visit", "Phone", "Status", "Address", "Nationality", "Occupation", "Hometown", "Region", "Residence", "Marital Status", "Spouse Name", "Father's Name", "Mother's Name", "Children Name", "Next of Kin", "Next of Kin Phone", "Declaration", "Date of Baptism", "Membership", "Date of Transfer", "Officer in Charge", "Officer Signature Date", "Head Pastor Signature Date"]]
        const memberRef = collection(db, "members")
        const memberRefQuery = query(memberRef, orderBy('dateAdded', 'desc'))
        const snapshots = await getDocs(memberRefQuery)
        .then((snapshots) => {
          const docs = snapshots.docs.map((doc) =>{
            const data = doc.data()
            data.id = doc.id
            exportDataTmp.push([data.welfare ,data.lastName, data.firstName, data.department, data.sex, data.dateOfBirth, data.dateOfFirstVisit, data.phone, data.status, data.address, data.nationality, data.occupation, data.hometown, data.region, data.residence, data.maritalStatus, data.spouseName, data.fatherName, data.motherName, data.childrenName, data.nextOfKin, data.nextOfKinPhone, data.declaration, data.dateOfBaptism, data.membership, data.dateOfTransfer, data.officerInCharge, data.officerSignatureDate, data.headPastorSignatureDate])
            return data
          } )
          console.log(docs)
          setMemberData(docs)
          setExportData(exportDataTmp)
        })
      
      }
      fetchMemberData()
    },[])

    async function searchHandler(){
      if (search) {
        const memberRef = collection(db, "members")
        const memberRefQuery = query(memberRef, where('lastName', '==' , search))
        const snapshots = await getDocs(memberRefQuery)

        const docs = snapshots.docs.map((doc) =>{
          const data = doc.data()
          data.id = doc.id
          return data
        } )
        console.log(docs)
        setMemberData(docs)
      }
    }

     function deleteHandler(){
      try {
        const docRef = doc(db, "members", viewMemberData.id)
        const oldImageRef = ref(storage,viewMemberData.imageUrl)
        deleteObject(oldImageRef)
        .then(() => {
          deleteDoc(docRef)
          .then(() => {
            console.log('deleted')
            window.location.reload()
          })
          .catch((err) => {
            console.log(err)
            setDeleteError('Could not delete')
          })
        })
        .catch((err)=> {
          console.log(err)
          setDeleteError('Could not delete')
        })
      }
      catch(err) {
        console.log(err)
      }
    }

  function closeAddMemberModal() {
    setIsAddMemberOpen(false)
  }

  function openAddMemberModal() {
    setViewMemberData(emptyMemberData)
    setIsAddMemberOpen(true)
  }

  function closeViewMemberModal() {
    setIsViewMemberOpen(false)
  }


  function openViewMemberModal(data:viewDataInterface) {
    setViewMemberData(data)
    setIsViewMemberOpen(true)
  }

  function editHandler() {
    closeViewMemberModal()
    setIsAddMemberOpen(true)
    // openAddMemberModal()
  }

    
    return (
        <div className="flex flex-col justify-center py-10 px-40 flex-wrap w-[100%]">


{/* Add Member Modal */}
            <Transition appear show={isAddMemberOpen} as={Fragment}>
        <Dialog as="div" className={`${montserrat.variable} font-sans relative z-10 text-sm`} onClose={closeAddMemberModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform w-[40%] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Membership Form
                  </Dialog.Title>
                    <AddMember data={viewMemberData}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

{/* View Member Modal */}
      <Transition appear show={isViewMemberOpen} as={Fragment}>
        <Dialog as="div" className={`${montserrat.variable} font-sans relative z-10 text-sm`} onClose={closeViewMemberModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="transform w-[40%] overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    <div className='flex flex-row justify-between'>
                        <span>View Member</span>
                        <div>
                            <FontAwesomeIcon icon={faEdit} color='blue' className='mr-5' onClick={editHandler}/>
                            <FontAwesomeIcon icon={faTrash} color='red' onClick={deleteHandler}/>
                        </div>
                    </div>
                    {
                      deleteError && 
                      
                      <div className={`text-center text-sm font-regular text-white bg-red-400 border p-1 rounded my-5`}>
                      <span>{deleteError}</span>
                      </div>  
                    }
        
                  </Dialog.Title>
                    <ViewMember data = {viewMemberData}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

       
            <div className='flex flex-row justify-between flex-wrap'> 
            <div className="rounded border-2 h-10">
                <FontAwesomeIcon className='px-2' icon={faSearch} onClick={searchHandler}/>
                <input className='h-full p-2' placeholder='search by last name' name='search' value={search} onChange={e => setSearch(e.target.value)} type='text'/>
            </div>
                {/* <input className="p-2 rounded border-2 h-10" placeholder="Search" type='text'/> */}
                <div className='flex flex-col items-center'>
                <button className="bg-[#1A96FC] px-2 h-10 rounded w-40" onClick={() => openAddMemberModal()}><span className="text-white text-sm">Add Member</span></button>
                </div>
            </div>
            {exportData && 
              <ExportData data={exportData}/>
                }
            <table className='mt-10 table-auto border-separate border-spacing-y-[20px] text-[15px] w-[100%] flex-wrap text-sm'>
                <thead className='text-[#B2B2B2]'>
                <tr className='text-left'>
                  <th>Profile</th>
                    <th>Welfare No.</th>
                    <th>Last Name</th>
                    <th>Other Names</th>
                    <th>Department</th>
                    <th>Sex</th>
                    <th>Date of Birth</th>
                    <th>Date of first visit</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
                </thead>
                {
                  memberData ? 

                  <tbody> 
                  {

                    memberData.map(data => (
                      <tr className='hover:bg-gray-100 cursor-pointer' key={data.id}  onClick={() => openViewMemberModal({
                        'id' : data.id,
                        'imageUrl': data.imageUrl,
                        'welfare' : data.welfare,
                        'lastName' : data.lastName,
                        'otherNames' : data.otherNames,
                        'address' : data.address,
                        'sex' : data.sex,
                        'dateOfBirth' : data.dateOfBirth,
                        'nationality' : data.nationality,
                        'occupation' : data.occupation,
                        'phone' : data.phone,
                        'hometown' : data.dateOfBirth,
                        'region' : data.region,
                        'residence' : data.residence,
                        'maritalStatus': data.maritalStatus,
                        'department' : data.department,
                        'spouseName' : data.spouseName,
                        'fatherName' : data.fatherName,
                        'motherName' : data.motherName,
                        'childrenName' : data.childrenName,
                        'nextOfKin' : data.nextOfKin,
                        'nextOfKinPhone': data.nextOfKinPhone,
                        'declaration' : data.declaration,
                        'dateOfFirstVisit': data.dateOfFirstVisit,
                        'dateOfBaptism': data.dateOfBaptism,
                        'membership' : data.membership,
                        'dateOfTransfer' : data.dateOfTransfer,
                        'officerInCharge': data.officerInCharge,
                        'officerSignatureDate': data.officerSignatureDate,
                        'headPastorSignatureDate': data.headPastorSignatureDate,
                        'status' : data.status,
                  })}>
                    {/* <Link href={data.imageUrl}> */}
                    <td>
                <Image className="rounded-full h-10 w-10" src={data.imageUrl} alt='profile' width={10} height={10}/>
                    </td>
                    {/* </Link> */}
                      <td>{data.welfare}</td>
                      <td>{data.lastName}</td>
                      <td>{data.otherNames }</td>
                      <td>{data.department}</td>
                      <td>{data.sex}</td>
                      <td>{data.dateOfBirth}</td>
                      <td>{data.dateOfFirstVisit}</td>
                      <td>{data.phone}</td>
                      <td className={`${data.status == 'Active' ?'text-green-600' : 'text-red-600' } font-bold`}>{data.status}</td>
                      </tr>
                    ))
                  }
              </tbody>
                : 
<div className='mt-5 text-[#B2B2B2]'>
<span>Loading member data...</span>       
</div>
            }

      
            </table>
        </div>
    )
}
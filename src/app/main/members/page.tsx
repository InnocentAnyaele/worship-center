'use client'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons'
import AddMember from '@/components/addMember/AddMember'
import { Dialog, Transition } from '@headlessui/react'
import { useState, Fragment } from 'react'
import ViewMember from '@/components/viewMember/ViewMember'
// import { viewDataInterface } from '@/lib/interfaces'


export interface viewDataInterface {
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

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function Members () {

    const emptyMemberData= {
        'welfare' : '',
        'lastName' : '',
        'otherNames' : '',
        'address' : '',
        'sex' : '',
        'dateOfBirth' : '2000-07-22',
        'nationality' : '',
        'occupation' : '',
        'phone' : '',
        'hometown' : '',
        'region' : '',
        'residence' : '',
        'maritalStatus': '',
        'department' : '',
        'spouseName' : '',
        'fatherName' : '',
        'motherName' : '',
        'childrenName' : '',
        'nextOfKin' : '',
        'nextOfKinPhone': '',
        'declaration' : '',
        'dateOfFirstVisit': '',
        'dateOfBaptism': '',
        'membership' : '',
        'dateOfTransfer' : '',
        'officerInCharge': '',
        'officerSignatureDate': '',
        'headPastorSignatureDate': '',
        'status' : '',
    }

    let [isAddMemberOpen, setIsAddMemberOpen] = useState(false)
    let [isViewMemberOpen, setIsViewMemberOpen] = useState(false)
    let [viewMemberData, setViewMemberData] = useState<viewDataInterface>(emptyMemberData)


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
                            <FontAwesomeIcon icon={faTrash} color='red'/>
                        </div>
                    </div>
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
                <FontAwesomeIcon className='px-2' icon={faSearch}/>
                <input className='h-full p-2' placeholder='Search' name='search' type='text'/>
            </div>
                {/* <input className="p-2 rounded border-2 h-10" placeholder="Search" type='text'/> */}
                <button className="bg-[#1A96FC] px-2 h-10 rounded w-40" onClick={() => openAddMemberModal()}><span className="text-white text-sm">Add Member</span></button>
            </div>
            <table className='mt-10 table-auto border-separate border-spacing-[20px] text-[15px] w-[100%] flex-wrap text-sm'>
                <thead className='text-[#B2B2B2]'>
                <tr className='text-left'>
                    <th>Name</th>
                    <th>Department</th>
                    <th>Sex</th>
                    <th>Date of Birth</th>
                    <th>Date of first visit</th>
                    <th>Phone</th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody> 
                    <tr onClick={() => openViewMemberModal({
                          'welfare' : 'CWCWN001',
                          'lastName' : 'Hayford',
                          'otherNames' : 'Innocent',
                          'address' : 'Ashaiman',
                          'sex' : 'Male',
                          'dateOfBirth' : '2006-06-26',
                          'nationality' : 'Ghanaian',
                          'occupation' : 'Cyber Security Analyst',
                          'phone' : '233557187667',
                          'hometown' : 'Kumasi',
                          'region' : 'Eastern Region',
                          'residence' : 'Ashaiman',
                          'maritalStatus': 'Married',
                          'department' : 'Instrumentalist',
                          'spouseName' : '',
                          'fatherName' : '',
                          'motherName' : '',
                          'childrenName' : '',
                          'nextOfKin' : '',
                          'nextOfKinPhone': '',
                          'declaration' : 'signed',
                          'dateOfFirstVisit': '2006-06-26',
                          'dateOfBaptism': '2006-06-26',
                          'membership' : '',
                          'dateOfTransfer' : '2006-06-26',
                          'officerInCharge': 'Deacon Mat',
                          'officerSignatureDate': '2006-06-26',
                          'headPastorSignatureDate': '2006-06-26',
                          'status' : 'active',
                    })}> 
                        <td>Fifi Hayford</td>
                        <td>Instrumentalist</td>
                        <td>Male</td>
                        <td>21/06/2006</td>
                        <td>21/06/2006</td>
                        <td>233557187667</td>
                        <td className='text-red-600 font-bold'>Inactive</td>
                    </tr>
                    <tr> 
                        <td>Theresah Mills</td>
                        <td>Choirister</td>
                        <td>Female</td>
                        <td>21/06/2006</td>
                        <td>21/06/2006</td>
                        <td>233557187667</td>
                        <td className='text-green-600 font-bold'>Active</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
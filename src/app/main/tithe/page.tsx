'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons"
import { Fragment, useEffect, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import AddTithe from "@/components/addTithe/AddTithe"

import { Montserrat } from "@next/font/google"

import ExportData from '@/components/exportData/ExportData'


import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function Tithe() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)   
    }

    function openModal() {
        setIsOpen(true)   
    }

    let [exportData, setExportData] = useState<any>(null)

    const [titheData, setTitheData] = useState<any>(null)

    const [deleteError, setDeleteError] = useState('')

    const [search, setSearch] = useState('')

    let [deleteModal, setDeleteModal] = useState(false)
    let [deleteID, setDeleteID] = useState('')

    function openDeleteModal(id:string) {
      setDeleteID(id)
      setDeleteModal(true)
    }

    function closeDeleteModal() {
      setDeleteID('')
      setDeleteModal(false)
    }
    


    // const getTitheSum = async (id) => {
    //   const titheRef = collection(db, "tithe")
    //   const titheRefQuery = query(titheRef, orderBy('dateAdded', 'desc'))
    // }


  useEffect(() => {
        const fetchTitheData = async () => {
            let titheSum:any = {}
        let exportDataTmp = [["Date", "Member", "Amount", "TotalAmount"]] 
            const titheRef = collection(db, "tithe")
            const titheRefQuery = query(titheRef, orderBy('dateAdded', 'desc'))
            const snapshots = await getDocs(titheRefQuery)
            .then((snapshots) => {
              const docs = snapshots.docs.map((doc) =>{
                const data = doc.data()
                data.id = doc.id

                if (data.date in titheSum) {
                  titheSum[data.date] = titheSum[data.date] + data.amount
                }
                else {
                  titheSum[data.date] = data.amount
                }
                return data
              })
              docs.map(item => {
                item.sumOfTithe = titheSum[item.date]
                exportDataTmp.push([item.date, item.member, item.amount,titheSum[item.date]])
              })
              setExportData(exportDataTmp)
              console.log(docs)
              setTitheData(docs)
              console.log('tithe data', titheData)
              console.log('tithe sum', titheSum)
              console.log('tithe sum 2023-02-08', titheSum['2023-02-08'])
            })
        }
        fetchTitheData()
      },[])

      async function searchHandler(){
        if (search) {
          let titheSum:any = {}
          const titheRef = collection(db, "tithe")
          const titheRefQuery = query(titheRef, where('member', '==' , search))


         const snapshots = await getDocs(titheRefQuery)
            .then((snapshots) => {
              const docs = snapshots.docs.map((doc) =>{
                const data = doc.data()
                data.id = doc.id

                if (data.date in titheSum) {
                  titheSum[data.date] = titheSum[data.date] + data.amount
                }
                else {
                  titheSum[data.date] = data.amount
                }
                return data
              })
              docs.map(item => {
                item.sumOfTithe = titheSum[item.date]
              })
              console.log(docs)
              setTitheData(docs)
            })
        }
      }

      function deleteHandler() {
        const docRef = doc(db, "tithe", deleteID)
        deleteDoc(docRef)
        .then(() => {
            console.log('deleted')
            // setDeleteError('')
            window.location.reload()
          })
          .catch((err) => {
            console.log(err)
            setDeleteError('Could not delete')
          })
    }

    return (
        <div className="flex flex-col justify-center py-10 m-3 md:px-40 lg:px-40 flex-wrap w-[100%]">


<Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className={`${montserrat.variable} font-sans relative z-10 text-sm`} onClose={closeModal}>
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
                <Dialog.Panel className="text-left transform w-auto overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-bold leading-6 text-gray-900"
                  >
                    Add Tithe
                  </Dialog.Title>
                    <AddTithe/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      <Transition appear show={deleteModal} as={Fragment}>
        <Dialog as="div" className={`${montserrat.variable} font-sans relative z-10 text-sm`} onClose={closeDeleteModal}>
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
                <Dialog.Panel className="text-center transform w-auto overflow-hidden rounded-2xl bg-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg text-center font-bold leading-6 text-gray-900"
                  >
                    Are you sure you want to delete?
                  </Dialog.Title>
                  <div className="m-5 space-x-3">
                  <button className="bg-[#c16161] px-6 py-2 rounded" onClick={deleteHandler}><span className="text-white text-sm">Yes</span></button>
                  <button className="bg-[#789e56] px-6 py-2 rounded" onClick={closeDeleteModal}><span className="text-white text-sm">No</span></button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


      <div className='flex flex-row justify-between flex-wrap'> 
            <div className="rounded border-2 h-10">
                <FontAwesomeIcon className='px-2' icon={faSearch} onClick={searchHandler}/>
                <input className='h-full p-2' placeholder='Search Members' name='search' type='text' value={search}  onChange={e=>setSearch(e.target.value)}  />
            </div>
                {/* <input className="p-2 rounded border-2 h-10" placeholder="Search" type='text'/> */}
                <button className="text-white p-2 h-10 rounded md:my-0 lg:my-0 my-3 w-40 bg-[#8B7E74]" onClick={() => setIsOpen(true)}>Add Tithe</button>
            </div>

            {
                      deleteError && 
                      
                      <div className={`text-center text-sm font-regular text-white bg-red-400 border p-1 rounded my-5`}>
                      <span>Could not delete</span>
                      </div>  
                    }
        {exportData && 
              <ExportData data={exportData}/>
                }
            <table className='mt-10 table-auto border-separate border-spacing-[20px] text-[15px] w-[100%] flex-wrap text-sm'>
                <thead className='text-[#B2B2B2]'>
                <tr className='text-left'>
                    <th>Date</th>
                    <th>Member</th>
                    <th>Tithe Amount</th>
                    <th>Tithe Amount for the day</th>
                    <th></th>
                </tr>
                </thead>
                {
                  titheData ? 

                  <tbody> 

                    {
                      titheData.map((data:any) => (

                        <tr key={data.id}> 
                        <td>{data.date}</td>
                        <td>{data.member}</td>
                        <td>{data.amount}</td>
                        <td>{data.sumOfTithe}</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' onClick={()=>openDeleteModal(data.id)} /></td>
                    </tr>
                      ))
                    }
              </tbody>

                  : 

                  <div className='mt-5 text-[#B2B2B2]'>
                <span>Loading tithe data...</span>       
                </div>
                }
            </table>
        </div>
    )
}
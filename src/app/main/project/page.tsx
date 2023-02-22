'use client'

import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import AddContribution from "@/components/addContribution/AddContribution";
import ViewContribution from "@/components/viewContribution/ViewContribution";

import { Montserrat } from "@next/font/google"
import ExportData from '@/components/exportData/ExportData'

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"


export interface datesAddedInterface {
    date: string;
    amount: number;
}

export interface viewContributionDataInterface {
    monthYear: string;
    totalContributions: number;
    // datesAdded: datesAddedInterface[];
    datesAdded: any;
}


export default function Project(){


    let [isAddContributionOpen, setIsAddContributionOpen] = useState(false)
    let [isViewContributionOpen, setIsViewContributionOpen] = useState(false)
    let [viewContributionData, setViewContributionData] = useState<viewContributionDataInterface | null>()

    function closeAddContributionModal() {
        setIsAddContributionOpen(false)
    }

    
    function openAddContributionModal() {
        setIsAddContributionOpen(true)
    }

    
    function closeViewContributionModal() {
        setIsViewContributionOpen(false)
    }

    
    function openViewContributionModal() {
        setIsViewContributionOpen(false)
    }

    const [contributionData, setContributionData] = useState<any>(null)
    const [contributionAggData, setContributionAggData] = useState<any>(null)

    let [exportData, setExportData] = useState<any>(null)


    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  


    useEffect(() => {
      const fetchContributionData = async () => {
          const monthSum:any = {}
        let exportDataTmp = [["date", "amount"]]
          const contributionRef = collection(db, "contribution")
          const contributionRefQuery = query(contributionRef, orderBy('date', 'desc'))
          const snapshots = await getDocs(contributionRefQuery)
          .then((snapshots) => {
            const docs = snapshots.docs.map((doc) =>{
              const data = doc.data()
              exportDataTmp.push([data.date, data.amount])
              data.id = doc.id

              let contributionDate = new Date(data.date)
              let contributionYear = contributionDate.getFullYear()
              // let contributionMonth = monthNames[contributionDate.getMonth()]
              let contributionMonth = data.month
              let contributionFullDate = contributionMonth + ' ' + contributionYear

              if (contributionFullDate in monthSum){
                monthSum[contributionFullDate] = monthSum[contributionFullDate] + data.amount
              }
              else {
                monthSum[contributionFullDate]  = data.amount
              }

              return data

            })
            docs.map(item => {
              let itemDate = new Date(item.date)
              let itemYear = itemDate.getFullYear()
              // let itemMonth = monthNames[itemDate.getMonth()]
              let itemMonth = item.month
              let itemFullDate = itemMonth + ' ' + itemYear
              item.monthYear = itemFullDate
              item.totalMonthlyContribution = monthSum[itemFullDate]
            })
            setExportData(exportDataTmp)
            setContributionData(docs)
            setContributionAggData(monthSum)
            console.log(contributionData)
            console.log(contributionAggData)
          })
      }
      fetchContributionData()
    },[])




    return (
        <div className="flex m-3 flex-col justify-center py-10 md:px-40 lg:px-40 flex-wrap w-[100%]">

<Transition appear show={isAddContributionOpen} as={Fragment}>
        <Dialog as="div" className={`${montserrat.variable} font-sans relative z-10 text-sm`} onClose={closeAddContributionModal}>
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
                <Dialog.Panel className="transform w-auto text-left overflow-hidden rounded-2xl bg-white p-6  align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900"
                  >
                    Add Contribution
                  </Dialog.Title>
                    <AddContribution/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


      <Transition appear show={isViewContributionOpen} as={Fragment}>
        <Dialog as="div" className={`${montserrat.variable} font-sans relative z-10 text-sm`} onClose={closeViewContributionModal}>
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
                <Dialog.Panel className="transform w-auto overflow-hidden rounded-2xl bg-white p-10 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-bold leading-6 text-gray-900 mb-3"
                  >
                    Contributions
                  </Dialog.Title>
                    <ViewContribution data={viewContributionData}/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>


            {/* <div className="rounded border-2 h-10">
                <FontAwesomeIcon className='px-2' icon={faSearch}/>
                <input className='h-full p-2' placeholder='Search' name='search' type='text'/>
            </div> */}
                {/* <input className="p-2 rounded border-2 h-10" placeholder="Search" type='text'/> */}
                <button className="bg-[#1A96FC] px-2 h-10 rounded w-40" onClick={() => setIsAddContributionOpen(true)}><span className="text-white text-sm">Add Contribution</span></button>

            {exportData && 
            <div>
              <ExportData data={exportData}/>
              </div>
                }


            <table className='mt-10 table-auto border-separate border-spacing-[20px] text-[15px] w-[100%] flex-wrap text-sm'>
                <thead className='text-[#B2B2B2]'>
                <tr className='text-left'>
                    <th>Date</th>
                    <th>Total monthly contribution</th>
                    {/* <th>Date Modified</th> */}
                </tr>
                </thead>

                {
                  contributionAggData ? 

                  <tbody> 

{
  Object.keys(contributionAggData).map((item, index) => (
    <tr key={index} 
    className='hover:bg-gray-100 cursor-pointer'
    onClick={() => 
      
      {setViewContributionData({
      'monthYear' :  item,
      'totalContributions': contributionAggData[item],
      // 'datesAdded' : () => {
      //   let contribution:any = []
      //   contributionData.map((contributionItem:any) => {
      //     if (contributionItem.monthYear == item) {
      //       let data:any = {}
      //       data.date = contributionItem.date
      //       data.amount = contributionItem.amount
      //       data.id = contributionItem.id
      //       contribution.push(data)
      //     }
      //   })
      //   return contribution
      // }
      'datesAdded' : contributionData
    })
    setIsViewContributionOpen(true)

  }
  
  }
    
    >
        <td>{item}</td>
        <td>{contributionAggData[item]}</td>
    </tr>
  ))
}

                  {/* <tr onClick={() => {
                          setViewContributionData({
                              month: 'January',
                              year: '2023',
                              totalContributions: 5000,
                              datesAdded: [
                                  {date: '07/01/2023', amount: 200},
                                  {date: '07/01/2023', amount: 200},
                                  {date: '07/01/2023', amount: 200},
                                  {date: '07/01/2023', amount: 200},
                                  {date: '07/01/2023', amount: 200}
                              ]
                          });
                          setIsViewContributionOpen(true)
                      }}> 
                          <td>January 2023</td>
                          <td>5000</td>
                      </tr>  */}
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
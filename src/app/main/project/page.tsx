'use client'

import { faSearch, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import AddContribution from "@/components/addContribution/AddContribution";
import ViewContribution from "@/components/viewContribution/ViewContribution";

import { Montserrat } from "@next/font/google"

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export interface datesAddedInterface {
    date: string;
    amount: number;
}

export interface viewContributionDataInterface {
    month: string;
    year: string;
    totalContributions: number;
    datesAdded: datesAddedInterface[];
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

    return (
        <div className="flex flex-col justify-center py-10 px-40 flex-wrap w-[100%]">

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


<div className='flex flex-row justify-between flex-wrap'> 
            <div className="rounded border-2 h-10">
                <FontAwesomeIcon className='px-2' icon={faSearch}/>
                <input className='h-full p-2' placeholder='Search' name='search' type='text'/>
            </div>
                {/* <input className="p-2 rounded border-2 h-10" placeholder="Search" type='text'/> */}
                <button className="bg-[#1A96FC] px-2 h-10 rounded w-40" onClick={() => setIsAddContributionOpen(true)}><span className="text-white text-sm">Add Contribution</span></button>
            </div>


            <table className='mt-10 table-auto border-separate border-spacing-[20px] text-[15px] w-[100%] flex-wrap text-sm'>
                <thead className='text-[#B2B2B2]'>
                <tr className='text-left'>
                    <th>Date</th>
                    <th>Total monthly contribution</th>
                    <th>Date Modified</th>
                </tr>
                </thead>
                <tbody> 
                    <tr onClick={() => {
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
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>February 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>March 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>April 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>May 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>June 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>July 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>August 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>Sepetember 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>October 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>November 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr> <tr> 
                        <td>December 2023</td>
                        <td>5000</td>
                        <td>14/01/2023</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
'use client'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Fragment, useState } from "react"
import { Dialog, Transition } from "@headlessui/react"
import AddSeed from "@/components/addSeed/AddSeed"

import { Montserrat } from "@next/font/google"

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function Seed() {

    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)   
    }

    function openModal() {
        setIsOpen(true)   
    }

    return (
        <div className="flex flex-col justify-center py-10 px-40 flex-wrap w-[100%]">


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
                    Add Seed
                  </Dialog.Title>
                    <AddSeed/>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      
            <button className="text-white p-2 h-10 rounded w-40 bg-[#1A96FC]" onClick={() => setIsOpen(true)}>Add Seed</button>
            <table className='mt-10 table-auto border-separate border-spacing-[20px] text-[15px] w-[100%] flex-wrap text-sm'>
                <thead className='text-[#B2B2B2]'>
                <tr className='text-left'>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Members</th>
                    <th></th>
                </tr>
                </thead>
                <tbody> 
                    <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> <tr> 
                        <td>7/01/2022</td>
                        <td>850</td>
                        <td>200</td>
                        <td><FontAwesomeIcon icon={faTrash} color='red' /></td>
                    </tr> 
                </tbody>
            </table>
        </div>
    )
}
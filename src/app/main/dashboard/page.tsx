'use client'

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";
import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
Chart.defaults.scale.grid.display = false;
import {getDocs, collection, query, orderBy, where, deleteDoc, doc, getDoc} from 'firebase/firestore'
import { db } from "@/lib/firebase"
import { useEffect, useState } from "react";




export default function Dashboard(){

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [members, setMembers] = useState<any>(null)
    const data = {
        labels: labels,
        datasets: [
          {
            label: "Membership growth",
            backgroundColor: "rgb(74, 90, 234)",
            borderColor: "rgb(74, 90, 234)",
            data: members,
            fill: false,
          },
        ],
      };
      const [memberCount, setMemberCount] = useState<any>(null)
      const [departmentCount, setDepartmentCount] = useState<any>(null)
      const [offeringCount, setOfferingCount] = useState<any>(null)
      const [offeringDate, setOfferingDate] = useState<any>(null)
      const [titheCount, setTitheCount] = useState<any>(null)
      let growthYear = 2023
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const currMonth = new Date().getMonth()
  const currYear = new Date().getFullYear()

  
    async function getMembers() {
        const monthSum:any = {
            'January' : 0,
            'February' : 0,
            'March' : 0,
            'April' : 0,
            'May' : 0,
            'June' : 0,
            'July' : 0,
            'August' : 0,
            'September' : 0,
            'October' : 0,
            'November' : 0,
            'December' : 0,
        }
        const dptCount:any = {
            'Men Ministry' : 0,
            'Women Ministry': 0,
            'Youth Ministry' : 0,
            'Children Ministry': 0,
        }
        const memberRef = collection(db, 'members')
        const snapshots = await getDocs(memberRef)
        .then((snapshots) => {
            setMemberCount(snapshots.docs.length)
            snapshots.docs.map((doc) => {
                const data = doc.data()
                let dpt = data.department
                dptCount[dpt] = dptCount[dpt] + 1

                let dateOfFirstVisit = new Date(data.dateOfFirstVisit)
                let yearOfFistVisit = dateOfFirstVisit.getFullYear()
                let monthOfFirstVisit = monthNames[dateOfFirstVisit.getMonth()]
                if (yearOfFistVisit == growthYear) {
                    monthSum[monthOfFirstVisit] = monthSum[monthOfFirstVisit] + 1 
                }
            })
        })
        setMembers(Object.values(monthSum).slice(0,currMonth+1))
        setDepartmentCount(dptCount)
    }


    async function getOffering() {
        let offeringSum:number = 0
        const offeringRef = collection(db, 'offering')
        const offeringRefQuery = query(offeringRef, orderBy('date', 'desc'))
        const count = 0
        const snapshots = await getDocs(offeringRefQuery)
        .then((snapshots) => {
            const offeringDocs = snapshots.docs.map((doc) => {
                const data = doc.data()
                let offeringDate = new Date(data.date)
                let offeringYear = offeringDate.getFullYear()

                if (offeringYear == currYear) {
                    offeringSum = offeringSum + data.amount
                }
                return data          
            })
            setOfferingCount(offeringSum)
        })

    }   


    async function getcontribution() {
        let contributionSumForTheYear:number = 0
        const contributionRef = collection(db, 'contribution')
        const snapshots = await getDocs(contributionRef)
        .then((snapshots) => {
            snapshots.docs.map((doc) => {
                const data = doc.data()

                let contributionDate = new Date(data.date)
                let contributionYear = contributionDate.getFullYear()


                if (contributionYear == currYear) {
                    contributionSumForTheYear = contributionSumForTheYear + data.amount
                }

            })
            // console.log('contribution sum for the year', contributionSumForTheYear)
        })
    }

    async function getTithe(){
        let titheSum:number = 0
        const titheRef = collection(db, 'tithe')
        const titheRefQuery = query(titheRef, orderBy('dateAdded', 'desc'))
        const snapshots = await getDocs(titheRefQuery)
        .then((snapshots) => {
            const docs = snapshots.docs.map((doc) =>{
              const data = doc.data()
              data.id = doc.id

              let titheDate = new Date(data.date)
                let titheYear = titheDate.getFullYear()
                
              if (titheYear == currYear) {
                titheSum = titheSum + data.amount
              }
            })

          setTitheCount(titheSum)
          })
    }


    
    const row1content = [{'title': 'total members', 'figure' :memberCount || memberCount == 0 ?  memberCount : 'loading'},{'title': `offetory ${currYear}`, 'figure' : offeringCount || offeringCount == 0 ? `GHS ${offeringCount}` : 'loading'},{'title': `project ${currYear}`, 'figure' : offeringCount || offeringCount == 0  ? `GHS ${offeringCount}` : 'loading'}, {'title': 'tithe', 'figure' : titheCount || titheCount == 0 ? `GHS ${titheCount}` : 'loading'}]
    const col1content = [{'title': 'Men Ministry', 'figure' : departmentCount ?  departmentCount['Men Ministry'] : 'loading'},{'title': 'Women Ministry', 'figure' : departmentCount ? departmentCount['Women Ministry'] : 'loading'},{'title': 'Youth Ministry', 'figure' : departmentCount ? departmentCount['Youth Ministry'] : 'loading'}, {'title': 'Children ministry', 'figure' : departmentCount ? departmentCount['Children Ministry'] : 'loading'}]
    
    useEffect(() => {
        getMembers()
        getOffering()
        getcontribution()
        getTithe()
    },[])



    return (
<main className={`font-sans h-screen w-screen flex flex-col px-40`}>
            <div className="flex flex-row justify-between flex-wrap">
            {row1content.map((content, index) => (
                    <div key={index} className='flex flex-col md:items-center lg:items-center md:mx-10 lg:mx-10 my-4 md:my-0 lg:my-0'>
                            <span className="font-bold text-lg my-4"> {content.figure} </span>
                            <span className="text-sm mt-4">{content.title} </span>
                    </div>      
                ))}
            </div>
            <div className='flex flex-row justify-center md:mt-20 lg:mt-20 flex-wrap'>
                <div className="flex flex-col w-[100vh] md:h-96 lg-h-96 bg-col">
                    {/* w-3/4 */}
                    <span className="font-bold mb-10">Membership growth</span>
                    <Line data={data} />
                </div>
                <div className='flex flex-col items-center self-end h-full pt-10 ml-auto'>
                {col1content.map((content, index) => (
                    <div key={index} className='flex flex-col items-center'>
                            <span className="font-bold text-lg"> {content.figure} </span>
                            <span className="text-sm m-4">{content.title} </span>
                    </div>      
                ))}
                </div>
            </div>
        </main>

    )
}
'use client'

import NavBar from "@/components/navbar/NavBar";
// import { Montserrat } from "@next/font/google";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
Chart.defaults.scale.grid.display = false;

import {getDocs, collection, query, orderBy, where, deleteDoc, doc, getDoc} from 'firebase/firestore'
import { db } from "@/lib/firebase"
import { useEffect, useState } from "react";

// const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })




export default function Dashboard(){

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [members, setMembers] = useState<any>(null)
    // const members = [20,20,20,30,20,10,2,2,2,0,0,0];

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
      let growthYear = 2023
      
    const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

//   const currMonth = new Date('2000-07-07').getMonth()
// starts indexing the month from 0
  const currMonth = new Date().getMonth()
  const currYear = new Date().getFullYear()
  console.log('current month', currMonth)
  

    async function getMembers() {
        // const monthSum:any = {}
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
        // const memberRefQuery = query(memberRef)
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
                // console.log(dateOfFirstVisit)
                // console.log(yearOfFistVisit)
                // console.log(monthOfFirstVisit)
                if (yearOfFistVisit == growthYear) {
                    // if (monthOfFirstVisit in monthSum){
                    //     monthSum[monthOfFirstVisit] = monthSum[monthOfFirstVisit] + 1
                    // }
                    // else{
                    //     monthSum[monthOfFirstVisit] = 1
                    // }
                    monthSum[monthOfFirstVisit] = monthSum[monthOfFirstVisit] + 1 
                }
            })
        })
        console.log('monthsum', monthSum)
        console.log('department count', dptCount)
        console.log('filtered month sum',Object.values(monthSum).slice(0,currMonth+1))
        setMembers(Object.values(monthSum).slice(0,currMonth+1))
        setDepartmentCount(dptCount)
    }


    async function getOffering() {
        const offeringRef = collection(db, 'offering')
        const offeringRefQuery = query(offeringRef, orderBy('date', 'desc'))
        const count = 0
        const snapshots = await getDocs(offeringRefQuery)
        .then((snapshots) => {
            // setMemberCount(snapshots.docs.length)
            const todaysDate = new Date()
            const offeringDocs = snapshots.docs.map((doc) => {
                const data = doc.data()
                return data          
            })
        console.log(offeringDocs)
        setOfferingCount(offeringDocs[0].amount)
        setOfferingDate(offeringDocs[0].date)
        console.log(offeringCount)
        console.log(offeringDate)
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
            console.log('contribution sum for the year', contributionSumForTheYear)
        })
    }


    
    const row1content = [{'title': 'total members', 'figure' : '228'},{'title': 'offetory 2/9/2023', 'figure' : 'GHS 6066'},{'title': `project ${currYear}`, 'figure' : 'GHS 6066'}, {'title': 'tithe', 'figure' : 'GHS 6066'}]
    const col1content = [{'title': 'Clergy', 'figure' : '60'},{'title': 'Choristers', 'figure' : '120'},{'title': 'Ushers', 'figure' : '80'}, {'title': 'Chidlren ministry', 'figure' : '40'}]

    getOffering()

    
    useEffect(() => {
        getMembers()
        getOffering()
        getcontribution()
    },[])



    return (

        <main className={`font-sans h-screen w-screen flex flex-col px-40`}>
            <div className="flex flex-row justify-between mt-10 flex-wrap">
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
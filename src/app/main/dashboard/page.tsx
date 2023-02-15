'use client'

import NavBar from "@/components/navbar/NavBar";
// import { Montserrat } from "@next/font/google";

import Chart from "chart.js/auto";
import { Line } from "react-chartjs-2";

import {CategoryScale} from 'chart.js'; 
Chart.register(CategoryScale);
Chart.defaults.scale.grid.display = false;

// const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })




export default function Dashboard(){

    const labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const members = [20,20,20,30,20,10,2,2,2,8,4,48];

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
     


    const row1content = [{'title': 'total members', 'figure' : '228'},{'title': 'offetory 2/9/2023', 'figure' : 'GHS 6066'},{'title': 'project offering', 'figure' : 'GHS 6066'}, {'title': 'tithe', 'figure' : 'GHS 6066'}]
    const col1content = [{'title': 'Clergy', 'figure' : '60'},{'title': 'Choristers', 'figure' : '120'},{'title': 'Ushers', 'figure' : '80'}, {'title': 'Chidlren ministry', 'figure' : '40'}]



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
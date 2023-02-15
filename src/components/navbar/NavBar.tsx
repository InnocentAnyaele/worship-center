'use client'

import { usePathname } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
// import { Montserrat } from "@next/font/google"
import { useState } from "react"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { useRouter } from 'next/navigation';

import { auth } from "@/lib/firebase"
import { signOut } from "firebase/auth"

// const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })


export default function NavBar() {

    const pathname = usePathname()


    const [active, setActive] = useState(false)
    const [profileDropdown, setProfileDropdown] = useState(false)

    const router = useRouter()

    function logout(){
        signOut(auth)
        router.push('/')
    }


    const navItems = [{name: 'Dashboard', path: '/main/dashboard'},{name: 'Members', path: '/main/members'},{name: 'Offering', path: '/main/offering'},{name: 'Seed', path: '/main/seed'},{name: 'Tithe', path: '/main/tithe'},{name: 'Project', path: '/main/project'}]

    const handleClick = () => {
        setActive(!active)
        console.log(active)
    }

    return (
        <nav className={`flex flex-row px-6 w-[100%] lg:items-center flex-wrap`}>
            <div className="flex flex-row items-center lg:mr-40 md:mr-40">
            <FontAwesomeIcon className="md:hidden lg:hidden" onClick={handleClick} icon={faBars}/>
            <Image className="m-4" src='/images/logo.png' alt='logo' width={30} height={30}/>
            <span className="font-bold hidden lg:block md:block">Calvary Worship Center</span>
            </div>
            <div className={`${!active ? '' : 'hidden' } w-full lg:w-auto md:w-auto text-[#B2B2B2] order-last lg:order-none md:order-none flex-wrap flex flex-col md:flex-row items-center`}>
            
            {
               navItems.map((item,index) => (
                <div key={index} className={`${pathname === item.path ? 'p3 bg-[#D9D9D9] rounded' : 'invinsible' }`}>
                    <Link href={item.path} className='m-3'><span>{item.name}</span></Link>
                </div>
               ))
            }

            {/* <Link href='/dashboard' className="m-3"> <span>Dashboard</span> </Link>
            <Link href='/dashboard' className="m-3"> <span>Members</span> </Link>
            <Link href='/dashboard' className="m-3"> <span>Offering</span> </Link>
            <Link href='/dashboard' className="m-3"> <span>Tithe</span> </Link>
            <Link href='/dashboard' className="m-3"> <span>Project</span> </Link> */}


            </div>
            <div className="m-4 items-center ml-auto">
            <button onClick={logout}>logout</button>
                {/* <button className="rounded-full p-0.5 border-2" onClick={() => {setProfileDropdown(!profileDropdown)}}>
                <Image className="rounded-full h-10 w-10" src='https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3687&q=80' alt='profile' width={10} height={10}/>
                </button>
                {profileDropdown && 
                <div className={`rounded-lg flex flex-col p-4 m-2 border absolute right-0`}>
                    <span className="font-bold">Fifi Hayford</span>
                    <hr className="my-2"/>
                    <button onClick={logout}>logout</button>
                </div>
                } */}
            </div>
        </nav>
    )
}
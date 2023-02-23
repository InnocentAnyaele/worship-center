'use client'

import NavBar from "@/components/navbar/NavBar";
import { Montserrat } from "@next/font/google"

import { useAuth } from "@/lib/AuthContext";

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {

    // {user} = useAuth()
    const router = useRouter()

    // if (!user) {
    //   router.push('/')
    // }
    // else {
    //   return (

    //     <section className={`${montserrat.variable} font-sans`}>
    //       {/* Include shared UI here e.g. a header or sidebar */}
    //       <NavBar/>
    //       {children}
    //     </section>
       
    //   );
    // }

    if (typeof window !== 'undefined') {
      if (localStorage.getItem('user') == null) {
        router.push('/')
      }
      else {
        return (
  
          <div className={`${montserrat.variable} font-sans`}>
            {/* Include shared UI here e.g. a header or sidebar */}
            <NavBar/>
            <div className="mt-20">
            {children}
            </div>
          </div>
         
        );
    }
    }

    // return (

    //   <section className={`${montserrat.variable} font-sans`}>
    //     {/* Include shared UI here e.g. a header or sidebar */}
    //     <NavBar/>
    //     {children}
    //   </section>
     
    // );

  }
'use client'

import NavBar from "@/components/navbar/NavBar";
import { Montserrat } from "@next/font/google"

import { useAuth } from "@/lib/AuthContext";

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

import PrivateRoute from "@/lib/PrivateRoute";
import { useRouter } from "next/navigation";

export default function DashboardLayout({
    children, // will be a page or nested layout
  }: {
    children: React.ReactNode,
  }) {

    const {user} = useAuth()
    const router = useRouter()

    if (!user) {
      router.push('/')
    }
    else {
      return (

        <section className={`${montserrat.variable} font-sans`}>
          {/* Include shared UI here e.g. a header or sidebar */}
          <NavBar/>
          {children}
        </section>
       
      );
    }

  }
"use client";

import NavBar from "@/components/navbar/NavBar";
import { Montserrat } from "@next/font/google";

import { useAuth } from "@/lib/AuthContext";
import { auth } from "@/lib/firebase";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

import { redirect, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardLayout({
  children, // will be a page or nested layout
}: {
  children: React.ReactNode;
}) {
  // {user} = useAuth()
  const router = useRouter();
  const [isUserValid, setIsUserValid] = useState(false);

  // if (!user) {
  //   router.push('/')
  // }
  // else {
  // return (

  //   <section className={`${montserrat.variable} font-sans`}>
  //     {/* Include shared UI here e.g. a header or sidebar */}
  //     <NavBar/>
  //     {children}
  //   </section>

  // );
  // }

  useEffect(() => {
    const checkAuth = () => {
      auth.onAuthStateChanged((user) => {
        if (user) {
          setIsUserValid(true);
          console.log("This is the logged in user", user);
        } else {
          console.log("no user found");
          router.push("/");
        }
      });
    };

    checkAuth();
  }, []);

  // if (typeof window !== "undefined") {
  //   if (localStorage.getItem("user") == null) {
  //     router.push("/");
  //   } else {
  //     const user = localStorage.getItem("user");
  //     console.log("this is the user", user);
  // return (
  //   <div className={`${montserrat.variable} font-sans`}>
  //     {/* Include shared UI here e.g. a header or sidebar */}
  //     <NavBar />
  //     <div className="mt-20">{children}</div>
  //   </div>
  // );
  //   }
  // }

  if (isUserValid) {
    return (
      <div className={`${montserrat.variable} font-sans`}>
        {/* Include shared UI here e.g. a header or sidebar */}
        <NavBar />
        <div className="mt-20">{children}</div>
      </div>
    );
  }

  // return (

  //   <section className={`${montserrat.variable} font-sans`}>
  //     {/* Include shared UI here e.g. a header or sidebar */}
  //     <NavBar/>
  //     {children}
  //   </section>

  // );
}

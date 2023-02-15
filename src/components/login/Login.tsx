"use client"

import { Montserrat } from "@next/font/google";
import Image from "next/image";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useAuth } from "@/lib/AuthContext";

const montserrat = Montserrat({ subsets: ['latin'], variable: '--font-montserrat' })

export default function Login() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  
  // const {user} = useAuth()
  // console.log(user)


  function submitHandler(e:any) {
    e.preventDefault()
    console.log(email)
    console.log(password)
    signInWithEmailAndPassword(auth, email, password)
    .then((response) => {
      console.log(response)
    })
    .catch((err) => {
      console.log(err)
    })
  }


  return (
    <div className= {`${montserrat.variable} font-sans flex bg-white rounded-lg flex-col p-10 min-w-[30%] flex-wrap`}>
      <div className="flex flex-col items-center">
        <Image className="m-5" src='/images/logo.png' alt='logo' width={75} height={76}/>
        <div className="text-center flex flex-col">
          <span className='font-bold my-2'>WELCOME</span>
          <span className="text-[#9FA2B4] text-sm mb-8">Enter your email and password below</span>
        </div>
      </div>

      <form className="flex flex-col" onSubmit={submitHandler}>
        <span className="text-[#9FA2B4] my-2 text-sm">EMAIL</span>
        <input placeholder="Email address" className="border-2 rounded-lg p-2 mb-2" value={email} onChange={e => setEmail(e.target.value)} required></input>
        <div className="flex flex-row justify-between my-2">
          <span className="text-[#9FA2B4] text-sm">PASSWORD</span>
          {/* <span className="text-[#9FA2B4] text-sm">Forgot password?</span> */}
        </div>
        <input placeholder="Password" className="border-2 rounded-lg p-2 mb-10" value={password} onChange={e => setPassword(e.target.value)} required/>
        <button className="bg-[#3751ff] rounded-lg h-[10%] p-3" type='submit'><span className="text-white">Log In</span></button>
      </form>
    </div>
  );
}

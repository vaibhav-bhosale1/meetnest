"use client"
import { LogoutLink, useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { getFirestore, collection, getDoc,doc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import {app} from '../../../config/Firebaseconfig.js'
import { useRouter } from 'next/navigation';
import { Loader } from 'lucide-react';
import MeetingType from './meeting-type/page';


const Dashboard = () => {

  const {user}=useKindeBrowserClient();  
  const [loading,setloading]=useState(true);
 
  const db = getFirestore(app);

  const router=useRouter();


  useEffect(()=>{
    user&&isBuisenessRegistered();
  },[user])

  
  const isBuisenessRegistered= async ()=>{
    const docRef=doc(db,"Business",user.email);
    const docSnap=await getDoc(docRef)
    if(docSnap.exists()){
        console.log("doc present",docSnap.data())
        setloading(false)
    }else{
      console.log("doc absent")
      setloading(false)
      router.replace('/create-buiseness')
    }
  }
  if(loading){
    return <Loader className='animate-spin items-center justify-center relative top-[40px] left-[60x]' height={50} width={50}></Loader>
  }

  return (
  <>
     <div>Dashboard</div>
     <MeetingType/>
  
  </>
 
  )
}

export default Dashboard
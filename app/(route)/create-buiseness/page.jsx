"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { doc, getFirestore, setDoc } from "firebase/firestore";
import {app} from '@/config/Firebaseconfig.js'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs';
import { toast } from "sonner"
import { useRouter } from 'next/navigation';



const CreateBuiseness = () => {
  const [businessName,setBusinessName]=useState()


  const router=useRouter();
  const db = getFirestore(app);
  const {user}=useKindeBrowserClient();

  const onCreateBusiness= async ()=>{
    console.log("created",businessName)
    await setDoc(doc(db,'Business',user.email),{
      businessName:businessName,
      email:user.email,
      userName:user.given_name+" "+user.family_name
    }).then(resp=>{
      router.replace('/dashboard')
      console.log("document saved")
      toast.success("Event has been created.")
     
    })

  }

  return (
      <div className='flex flex-col gap-20 my-10 p-14 items-center'> 
        <h1>image</h1>
        <div className='flex flex-col items-center gap-4 max-w-3xl'>
          <h2 className='text-4xl font-bold'>What should we call our buiseness</h2>
          <p className='text-slate-400'>What should we call our buiseness</p>
          <div className='w-full'>
            <label className='text-slate-400'>Team Name</label>
            <Input placeholder='Vaibhav' className='mt-2'
            onChange={(event)=>setBusinessName(event.target.value)}
            />
          </div>
          <Button className='w-full'disabled={!businessName}  onClick={onCreateBusiness}>Create Business</Button>
        </div>

    </div>
  )
}

export default CreateBuiseness
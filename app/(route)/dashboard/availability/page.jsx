"use client"
import DaysList from '@/app/_utils/DaysList'
import React, { useEffect, useState } from 'react'
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { collection, doc, getDoc, getFirestore, updateDoc } from 'firebase/firestore'
import { app } from '@/config/Firebaseconfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { toast } from 'sonner'


const Availability = () => {
  const [daysAvailable,setdaysAvailable]=useState(
      {
          Sunday:false
      },
      {
          Monday:false
      },
      {
          Tuesday:false
      },
      {
          Wednesday:false
      },
      {
          Thursday:false
      },
      {
          Friday:false
      },
      {
          Saturday:false
      
      }
)
  const [startTime,setStartTime]=useState();
  const [endTime,setEndTime]=useState();


  const db=getFirestore(app)
  const {user}=useKindeBrowserClient();

useEffect(()=>{
    user&&getBusinessInfo();
},[user])
  const getBusinessInfo= async ()=>{
    const docRef=doc(db,"Business",user?.email)
    const docSnap=await getDoc(docRef);
    const result=docSnap.data();
    setdaysAvailable(result.daysAvailable);
    setStartTime(result.startTime);
    setEndTime(result.endTime)
  }
  const onHandleChange=(day,value)=>{
      setdaysAvailable({
        ...daysAvailable,
        [day]:value
      })
      
  }

const handleSave=async ()=>{
    console.log(daysAvailable,startTime,endTime)
    const docRef=doc(db,'Business',user?.email)
    await updateDoc(docRef,{
        daysAvailable:daysAvailable,
        startTime:startTime,
        endTime:endTime
    }).then(resp=>{
      toast.success('Data Updated')
    })
}

  return (
    <div className='p-10 bg-white rounded-lg shadow-sm'>
    <h1 className='text-2xl font-bold text-orange-600'>Availability</h1>
    <hr className='my-7 border-orange-200'/>
    
    <div className='mb-10'>
      <h2 className='font-bold my-3 text-gray-700 flex items-center gap-2'>
        <span className='h-4 w-1 bg-orange-500 rounded-full'></span>
        Available Days
      </h2>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>
        {DaysList.map((item, index) => (
          <div key={index} className='flex items-center space-x-2 p-3 rounded-md hover:bg-orange-50 transition-colors'> 
            <Checkbox
              checked={daysAvailable[item.day] ? daysAvailable : false}
              onCheckedChange={(e) => onHandleChange(item.day, e)}
              className="border-orange-300 data-[state=checked]:bg-orange-500 data-[state=checked]:border-orange-500"
            />
            <label className='text-gray-700 cursor-pointer'>{item.day}</label>
          </div>
        ))}
      </div>
    </div>
    
    <div>
      <h2 className='font-bold mt-10 mb-4 text-gray-700 flex items-center gap-2'>
        <span className='h-4 w-1 bg-orange-500 rounded-full'></span>
        Availability Time
      </h2>
      <div className='flex flex-col md:flex-row gap-6'>
        <div className='mt-3'>
          <h3 className='text-sm text-gray-600 mb-2'>Start Time</h3>
          <Input 
            type='time'
            defaultValue={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className='border-orange-200 focus:border-orange-400 focus:ring-orange-400 w-full'
          />
        </div>
        <div className='mt-3'>
          <h3 className='text-sm text-gray-600 mb-2'>End Time</h3>
          <Input 
            type='time'
            defaultValue={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            className='border-orange-200 focus:border-orange-400 focus:ring-orange-400 w-full'
          />
        </div>
      </div>
      
      <Button 
        className='mt-10 bg-orange-500 hover:bg-orange-600 text-white px-6 py-2'
        onClick={handleSave}
      >
        Save Changes
      </Button>
    </div>
  </div>
  )
}

export default Availability
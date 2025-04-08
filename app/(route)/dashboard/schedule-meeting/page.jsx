"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import ScheduleMeetingList from './_component/ScheduleMeetingList'

import { app } from '../../../../config/Firebaseconfig.js'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { format } from 'date-fns'
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const ScheduleMeeting = () => {
  const db=getFirestore(app)
    const {user}=useKindeBrowserClient()
    const [meetingList,setMeetingList]=useState([]);
    useEffect(()=>{
        user&&getScheduleMeeting()
    },[user])

    const getScheduleMeeting=async()=>{
      setMeetingList([])
        const q=query(collection(db,'ScheduleMeetings'),
        where('businessEmail','==',user.email)
    )
    const querySnapshot=await getDocs(q)
    querySnapshot.forEach(doc=>{
        setMeetingList(prev=>[...prev,doc.data()])
        console.log(doc.data());
    })
    }

    const filterMeeetingList=(type)=>{
            if(type=='upcoming'){
                return meetingList.filter(item=>item.formattedDate>=format(new Date(),'t'))
            }else{
              return meetingList.filter(item=>item.formattedDate<format(new Date(),'t'))
            }
    }
  return (
    <div className='p-10'>
    <h2 className='font-bold text-2xl text-orange-600'>Schedule Meeting</h2>
    <hr className='my-4 border-orange-200' />
    <Tabs defaultValue="upcoming" className="w-[400px]">
      <TabsList className="bg-orange-100">
        <TabsTrigger 
          value="upcoming"
          className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
        >
          Upcoming
        </TabsTrigger>
        <TabsTrigger 
          value="expired"
          className="data-[state=active]:bg-orange-500 data-[state=active]:text-white"
        >
          Expired
        </TabsTrigger>
      </TabsList>
      <TabsContent value="upcoming" className="mt-4">
        <ScheduleMeetingList
          meetingList={filterMeeetingList('upcoming')}
        />
      </TabsContent>
      <TabsContent value="expired" className="mt-4">
        <ScheduleMeetingList
          meetingList={filterMeeetingList('expired')}
        />
      </TabsContent>
    </Tabs>
  </div>
  )
}

export default ScheduleMeeting
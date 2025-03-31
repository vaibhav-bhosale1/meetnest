"use client"
import React, { useEffect, useState } from 'react'
import { app } from '@/config/Firebaseconfig'
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import { getFirestore ,collection, query, where, getDocs,deleteDoc,doc, getDoc} from 'firebase/firestore'
import { Clock, Copy, Delete, LoaderCircle, MapPin, PencilIcon, Settings, Trash } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"


const MeetingEventList = () => {
    const db=getFirestore(app)
    const {user}=useKindeBrowserClient();
    const [eventList,setEventList]=useState([]);
    const [businessInfo,setBusinessInfo]=useState()

  useEffect(()=>{
    user&&getEventList();
    user&&BusinessInfo()

  },[user])
  const BusinessInfo= async()=>{
    const docRef=doc(db,'Business',user.email);
    const docSnap=await getDoc(docRef);
    setBusinessInfo(docSnap.data())
  }
  
    const getEventList= async()=>{
        setEventList([])
         const q = query(collection(db, "MeetingEvent"), where("createdBy", "==", user?.email));
        
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          setEventList(previosEvent=>[...previosEvent,doc.data()])
        });
  
    }
     const onDeleteMeetingEvent=async (event)=>{
        await deleteDoc(doc(db, "MeetingEvent",event?.id))
        .then(resp=>{
            toast.success("Deleted Successfully")
            console.log("Deleted Successfully")
            getEventList();
        })
     }


     const onCopyClipHandler=(event)=>{
      const meetingEventUrl=process.env.NEXT_PUBLIC_BASE_URL+businessInfo.businessName+'/'+event.id
      navigator.clipboard.writeText(meetingEventUrl)
      toast.success("Copied to Clipboard")
     }
  return (
    <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-5'>
         {eventList.length > 0 ? (
        eventList.map((event, index) => (
          <motion.div
            key={index}
            className="border shadow-lg border-t-8 rounded-xl p-3 flex flex-col gap-3 bg-white hover:shadow-2xl transition-shadow duration-300"
            style={{ borderTopColor: event?.themeColor }}
            whileHover={{ scale: 1.03 }}
          >
            <div className="flex justify-end">
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Settings className="cursor-pointer text-gray-600 hover:text-gray-900 transition-colors" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                 
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className='flex gap-2'><PencilIcon/> Edit</DropdownMenuItem>
                  <DropdownMenuItem className='flex gap-2'
                  onClick={()=>onDeleteMeetingEvent(event)}
                  ><Trash/>  Delete</DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <h2 className="font-semibold text-2xl text-gray-800">{event?.eventName}</h2>
            <div className="flex justify-between mb-4 items-center mt-4 text-gray-600">
              <h2 className="flex gap-2 items-center"><Clock className="text-blue-500" /> {event?.duration} Minute</h2>
              <h2 className="flex gap-2 items-center"><MapPin className="text-green-500" /> {event?.locationType}</h2>
            </div>
            <hr className="border-gray-300" />
            <div className="flex justify-between items-center mt-3">
             
                <h2 className="flex gap-2 text-sm items-center text-blue-500 hover:underline cursor-pointer"
                onClick={()=>{
                    onCopyClipHandler(event);
                 
                }}
                >
                  <Copy className="h-4 w-4" /> Copy Url
                </h2>
              
              <Button className="bg-blue-500 hover:bg-blue-600 rounded-full text-white px-4 py-2 shadow-md transition-transform transform hover:scale-105">
                Share
              </Button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="flex justify-center items-center h-40">
          <LoaderCircle className="animate-spin text-blue-500 h-10 w-10" />
        </div>
      )}
    </div>
  )
}

export default MeetingEventList
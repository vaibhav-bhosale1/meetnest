"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import LocationOption from '@/app/_utils/LocationOption'
import Image from 'next/image'
import ThemeOption from '@/app/_utils/ThemeOption'



function MeetingForm  ({setFormValue}) {

const [themeColor,setThemeColor]=useState()
const [eventName,setEventName]=useState()
const [duration,setDuration]=useState(30)
const [locationType,setLocationType]=useState("")
const [locationUrl,setLocationUrl]=useState("")


useEffect(()=>{
  console.log("Updated State:", { eventName, duration, locationType, locationUrl, themeColor });
  setFormValue({
    eventName:eventName,
    locationType:locationType,
    locationUrl:locationUrl,
    themeColor:themeColor,
    duration:duration
  })

},[eventName,duration,locationType,locationUrl,themeColor])

  return (
    <div className='p-8'>
         <Link href={'/dashboard'}><h2 className='flex gap-2'><ChevronLeft/> Cancel</h2></Link>
         <div className='mt-4'>
            <h2 className='font-bold my-4 text-2xl '>Create New Event</h2>
            <hr/>
         </div>
         <div className='flex flex-col gap-3 my-4'>
            <h2 className='font-bold'>Event Name*</h2>
            <Input placeholder="Name of your meeting"
            onChange={(event)=>setEventName(event.target.value)}
            />
            <h2 className='font-bold'>Duration*</h2>
          
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className='max-w-40'
                
                >{duration} Minute</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                 
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={()=>{setDuration(15)}}>15 Minute</DropdownMenuItem>
                  <DropdownMenuItem  onClick={()=>{setDuration(30)}}>30 Minute</DropdownMenuItem>
                  <DropdownMenuItem  onClick={()=>{setDuration(45)}}>45 Minute</DropdownMenuItem>
                  <DropdownMenuItem  onClick={()=>{setDuration(60)}}>1 Hour</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          <h2 className='font-bold'>Location</h2>
          <div className='grid grid-cols-4 gap-3 cursor-pointer' >
            {LocationOption.map((item,index)=>(
                  <div key={index}className={`border flex flex-col items-center justify-center p-3 rounded-lg hover:bg-amber-300 hover:border-orange-500${locationType==item.name&&`bg-amber-300 border-orange-500`}`}
                  onClick={()=>setLocationType(item.name)}
                  >
                      <Image src={item.icons} width={30} height={30} alt={item.name} key={index}/>
                      <h2>{item.name}</h2>
                  </div>
            ))}
          </div>
          {locationType&&<>
          <h2 className='font-bold'>Add {locationType} Url</h2>
          <Input placeholder='add url'
          value={locationUrl}
          onChange={(event)=>{setLocationUrl(event.target.value)}}
          />

          </>}
          <h2 className='font-bold'>
            Select Theme Color
          </h2>
          <div className='flex justify-evenly cursor-pointer '>
              {ThemeOption.map((item,index)=>(
                <div key={index} className={`h-7 w-7 rounded-full ${themeColor==item&& 'border border-3 border-black'}`}
                style={{backgroundColor:item}}
                onClick={()=>setThemeColor(item)}
                >

                </div>
              ))}
          </div>
           
         </div>
         <Button className='mt-9 w-full'
          disabled={!eventName || !locationType || !locationUrl}>Create</Button>
        
    </div>
  )
}

export default MeetingForm
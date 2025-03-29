"use client"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ChevronLeft } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
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



const MeetingForm = () => {
const [location,setLocation]=useState()

  return (
    <div className='p-8'>
         <Link href={'/dashboard'}><h2 className='flex gap-2'><ChevronLeft/> Cancel</h2></Link>
         <div className='mt-4'>
            <h2 className='font-bold my-4 text-2xl '>Create New Event</h2>
            <hr/>
         </div>
         <div className='flex flex-col gap-3 my-4'>
            <h2 className='font-bold'>Event Name*</h2>
            <Input placeholder="Name of your meeting"/>
            <h2 className='font-bold'>Duration*</h2>
          
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                <Button variant="outline" className='max-w-40'>15 Minute</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                 
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>30 Minute</DropdownMenuItem>
                  <DropdownMenuItem>45 Minute</DropdownMenuItem>
                  <DropdownMenuItem>1 Hour</DropdownMenuItem>
                  <DropdownMenuItem>2 Hour</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
          <h2 className='font-bold'>Location</h2>
          <div className='grid grid-cols-4 gap-3'>
            {LocationOption.map((item,index)=>(
                  <div className={`border flex flex-col items-center justify-center p-3 rounded-lg hover:bg-amber-300 hover:border-orange-500${location==item.name&&`bg-amber-300 border-orange-500`}`}
                  onClick={()=>setLocation(item.name)}
                  >
                      <Image src={item.icons} width={30} height={30} alt={item.name} key={index}/>
                      <h2>{item.name}</h2>
                  </div>
            ))}
          </div>
          {location&&<>
          <h2 className='font-bold'>Add {location} Url</h2>
          <Input placeholder='add url'/>
          </>}
           
         </div>
         <Button className='mt-9 w-full'>Create</Button>
        
    </div>
  )
}

export default MeetingForm
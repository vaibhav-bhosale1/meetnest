"use client"

import { Calendar1, Clock, Clock10 } from 'lucide-react'
import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import Link from 'next/link'
import { Button } from '@/components/ui/button'

  
const ScheduleMeetingList = ({meetingList}) => {
    
    return (
    <div className=''>
      {meetingList&&meetingList.map((meeting,index)=>(
          <Accordion type="single" collapsible key={index}>
          <AccordionItem value="item-1">
              <AccordionTrigger>{meeting?.formattedDate}</AccordionTrigger>
              <AccordionContent>
                <div>
                <div className='flex flex-col gap-4 mt-5'>
                    <h2 className='flex gap-2'><Clock/>{meeting?.duration} Minute</h2>
                    
                    <h2 className='flex gap-2'><Calendar1/>{meeting?.formattedDate}</h2>
                   {meeting?.SelectedTime&& <h2 className='flex gap-2'><Clock10/>{meeting?.SelectedTime}</h2>}
                    <Link className='flex gap-2 text-blue-400' href={meeting?.locationUrl?meeting?.locationUrl:"#"}>{meeting?.locationUrl} Meeting</Link>
                  <Link href={meeting?.locationUrl}>
                  <Button className='mt-5'>
                            Join Now
                    </Button>
                  
                  </Link>  
                </div>
                </div>
           
              </AccordionContent>
          </AccordionItem>
          </Accordion>

      ))}

        
    </div>
  )
}

export default ScheduleMeetingList
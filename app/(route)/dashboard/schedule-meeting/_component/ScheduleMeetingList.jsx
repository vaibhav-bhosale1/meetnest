"use client"

import { Calendar1, Clock, Clock10, ExternalLink, MapPin, Video } from 'lucide-react'
import React from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "../../../../../components/ui/accordion"
import Link from 'next/link'
import { Button } from '../../../../../components/ui/button'
import { Calendar } from '../../../../../components/ui/calendar'


  
const ScheduleMeetingList = ({meetingList}) => {
    
    return (
      <div className="p-4 md:p-6">
  {meetingList && meetingList.length > 0 ? (
    <div className="space-y-4">
      {meetingList.map((meeting, index) => (
        <Accordion type="single" collapsible key={index}>
          <AccordionItem 
            value="item-1" 
            className="border border-orange-200 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
          >
            <AccordionTrigger className="px-4 py-3 hover:bg-orange-50 text-lg font-medium text-gray-800">
              <div className="flex items-center gap-3">
                <Calendar1 className="h-5 w-5 text-orange-500" />
                <span>{meeting?.formattedDate}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="bg-gradient-to-br from-white to-orange-50">
              <div className="p-5">
                <div className="flex flex-col gap-5 border-l-4 border-orange-400 pl-4">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-orange-500 mt-0.5" />
                    <div>
                      <p className="text-gray-700">{meeting?.duration} Minute</p>
                      <p className="text-sm text-gray-500">Meeting Duration</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                  
                    <div>
                      <p className="text-gray-700">{meeting?.formattedDate}</p>
                      <p className="text-sm text-gray-500">Meeting Date</p>
                    </div>
                  </div>
                  
                  {meeting?.SelectedTime && (
                    <div className="flex items-start gap-3">
                      <Clock10 className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <p className="text-gray-700">{meeting?.SelectedTime}</p>
                        <p className="text-sm text-gray-500">Meeting Time</p>
                      </div>
                    </div>
                  )}
                  
                  {meeting?.locationUrl && (
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-orange-500 mt-0.5" />
                      <div>
                        <Link 
                          className="text-orange-600 hover:text-orange-700 hover:underline flex items-center gap-1" 
                          href={meeting?.locationUrl || "#"}
                        >
                          <span>Meeting Location</span>
                          <ExternalLink className="h-3 w-3" />
                        </Link>
                        <p className="text-sm text-gray-500 break-all line-clamp-1">{meeting?.locationUrl}</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Link href={meeting?.locationUrl || "#"}>
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-2">
                      <Video className="h-4 w-4" />
                      Join Meeting
                    </Button>
                  </Link>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center p-10 bg-orange-50 rounded-xl border border-orange-100">
      
      <h3 className="text-xl font-medium text-gray-800 mb-2">No Meetings Scheduled</h3>
      <p className="text-gray-500 text-center mb-6">You don't have any upcoming meetings at the moment.</p>
     <Link href={'/create-meeting'}>
     <Button className="bg-orange-500 hover:bg-orange-600 text-white">
        Schedule a Meeting
      </Button>
     </Link> 
    </div>
  )}
</div>
    
    )
}

export default ScheduleMeetingList
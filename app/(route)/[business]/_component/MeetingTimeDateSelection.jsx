
import { Clock, LocateIcon, MapPin } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { format, interval, min } from 'date-fns'
import { Button } from '@/components/ui/button'


const MeetingTimeDateSelection = ({eventInfo,businessInfo}) => {
    const [date, setDate] = useState(new Date())
    const [enableTimeSlots,setenableTimeSlots]=useState(false);
    const [timeSlots,setTimeSlots]=useState()
    useEffect(()=>{
        eventInfo?.duration&&createTimeSlot(eventInfo?.duration)
    },[eventInfo])
    const createTimeSlot=(interval)=>{
        const startTime=8*60;
        const endTime=22*60;
        const totalSlots=(endTime-startTime)/interval;
        const slots=Array.from({length:totalSlots},(_,i)=>{
            const totalMinute=startTime+i*interval;
            const hours=Math.floor(totalMinute/60);
            const minutes=totalMinute%60;
            const formattedHours=hours>12 ? hours-12 :hours;
            const period =hours>=12 ? 'PM':'AM';
            return `${String(formattedHours).padStart(2,'0')}:${String(minutes).padStart(2,'0')} ${period}`
        })
        console.log(slots)
        setTimeSlots(slots)
    }

    const handleDateChange=(date)=>{
        setDate(date);
        const day=format(date,'EEEE')
        if(businessInfo?.daysAvailable?.[day]){

        }

    }
    
  return (
    <div className='p-2 py-10 shadow-md m-5 border-t-8 my-10
    mx-10 md:mx-26 lg:mx-56 
    '
    style={{borderTopColor:eventInfo?.themeColor}}
    >
        <div>
            image
        </div>
        <div className='grid grid-cols-1 md:grid-cols-3 mt-5'>
            
            <div className='p-3 border-r'>
                <h2>{businessInfo?.businessName}</h2>
                <h2
                className='font-bold text-2xl'
                >{eventInfo?.eventName?eventInfo.eventName:"meeting Name"}</h2>
                <div className='flex flex-col gap-4 mt-5'>
                    <h2 className='flex gap-2'><Clock/>{eventInfo?.duration} Minute</h2>
                    <h2 className='flex gap-2'><MapPin/>{eventInfo?.locationType} Meeting</h2>
                    <Link className='flex gap-2 text-blue-400' href={eventInfo?.locationUrl?eventInfo?.locationUrl:"#"}>{eventInfo?.locationUrl} Meeting</Link>
                </div>

            </div>
            <div className='md:col-span-2 flex px-7'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-lg'>Select Date and Time</h2>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date)=>handleDateChange(date)}
                    className="rounded-md border mt-5"
                    disabled={(date)=>date<=new Date()}
                />

                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-5' style={{maxHeight:'440px'}}>
                    {timeSlots?.map((time,index)=>(
                        <Button className='border-primary text-primary' variant='outline' key={index}>{time}</Button>
                    ))}
                </div>
            

            </div>

        </div>
    </div>
  )
}

export default MeetingTimeDateSelection
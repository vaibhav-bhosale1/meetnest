import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
const TimeDateSelection = ({date,handleDateChange,timeSlots,setSelectedTime,enableTimeSlots}) => {
  return (
    <div>
        
        <div className='flex'>
                <div className='flex flex-col'>
                    <h2 className='font-bold text-lg'>Select Date and Time</h2>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d)=>handleDateChange(d)}
                    className="rounded-md border mt-5"
                    disabled={(date)=>date<=new Date()}
                />

                </div>
                <div className='flex flex-col w-full overflow-auto gap-4 p-5' style={{maxHeight:'440px'}}>
                    {timeSlots?.map((time,index)=>(
                        <Button className='border-primary text-primary' variant='outline' key={index}
                        disabled={!enableTimeSlots}
                        onClick={()=>setSelectedTime(time)}
                        >{time}</Button>
                    ))}
                </div>
            

            </div>

    </div>
  )
}

export default TimeDateSelection
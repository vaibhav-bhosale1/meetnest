import React from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'

const TimeDateSelection = ({date,handleDateChange,timeSlots,setSelectedTime,enableTimeSlots,SelectedTime,prevBooking}) => {
    const checkTimeSlot=(time)=>{
        return (prevBooking.filter(item=>item.SelectedTime==time)).length>0
    }
    return (
    <div>
        <div className='md:col-span-2 flex px-4 '>
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
            <div className='flex flex-col w-1/2 md:w-2/3 lg:w-3/4 overflow-auto gap-4 p-5' style={{maxHeight:'440px'}}>
                {timeSlots?.map((time,index)=>(
                    <Button className=
                    {`border-primary text-primary
                        ${time==SelectedTime&&'bg-orange-400 text-black'}`} variant='ghost' key={index}
                    disabled={!enableTimeSlots || checkTimeSlot(time)}
                    onClick={()=>setSelectedTime(time)}
                    >{time}</Button>
                ))}
            </div>
        </div>
    </div>
  )
}

export default TimeDateSelection
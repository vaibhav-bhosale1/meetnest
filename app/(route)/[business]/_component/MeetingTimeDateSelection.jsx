
import { Calendar1, Clock, Clock10, LocateIcon, MapPin } from 'lucide-react'
import Link from 'next/link'
import React, { use, useEffect, useState } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { format, interval, min } from 'date-fns'
import { Button } from '@/components/ui/button'
import TimeDateSelection from './TimeDateSelection'
import UserFormInfo from './UserFormInfo'
import { collection, doc, getDocs, getFirestore, query, setDoc, where } from 'firebase/firestore'
import { app } from '@/config/Firebaseconfig'
import { toast } from 'sonner'
import Plunk from "@plunk/node";
import { render } from "@react-email/components";

import MeetingScheduleEmail from '@/emails'
import { useRouter } from 'next/navigation'


const MeetingTimeDateSelection = ({eventInfo,businessInfo}) => {
    const [date, setDate] = useState(new Date())
    const [enableTimeSlots,setenableTimeSlots]=useState(false);
    const [timeSlots,setTimeSlots]=useState()
    const [SelectedTime,setSelectedTime]=useState()
    const [step,setStep]=useState(1)
     const [userNotes,setUserNotes]=useState('')
    const [userEmail,setUserEmail]=useState();   
     const [userName,setUserName]=useState();
     const [prevBooking,setPrevBooking]=useState([]);
     const plunk = new Plunk(process.env.NEXT_PUBLIC_PLUNK_API_KEY);
     const db=getFirestore(app)

     const router=useRouter();
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

    /**
     * used to fetch prev booking time slots
     * @param {*} date 
     */
    const handleDateChange = (date) => {
        setDate(date);
        const day = format(date, 'EEEE');
    
        if (businessInfo && businessInfo.daysAvailable && businessInfo.daysAvailable[day]) {
           getPrevEventBooking(date)
            setenableTimeSlots(true);
        } else {
           
            setenableTimeSlots(false);
        }
    };
    
    
    const handleScheduleEvent=async()=>{
        console.log("hey")
         const regx= /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
        if(!regx.test(userEmail)){
            toast.error("Enter valid E-mail")
            console.log("enter Valid email")
                return;
         }
         const docId=Date.now().toString();
         console.log("SelectedTime:", businessInfo?.SelectedTime);

         await setDoc(doc(db,'ScheduleMeetings',docId),{
            businessName:businessInfo?.businessName,
            businessEmail:businessInfo?.email,
            SelectedTime:SelectedTime,
            selectedDate:date,
            formattedDate:format(date,'PPP'),
            formattedTimeStamp:format(date,'t'),
            duration:eventInfo?.duration,
            locationUrl:eventInfo?.locationUrl,
            eventId:eventInfo?.id,
            id:docId,
            userName:userName,
            userEmail:userEmail,
            userNotes:userNotes,

         }).then(resp=>{
            console.log("Meeting Schedule Successfully")
            toast.success("Meeting Schedule Successfully")
            senEmail(userName)
            router.replace('/confirmation')
         })
    }

    const getPrevEventBooking=async(date_)=>{
        const  q=query(collection(db,'ScheduleMeetings'),where('selectedDate','==',date_),
                where('eventId','==',eventInfo.id))
        const querySnapshot=await getDocs(q);
        querySnapshot.forEach((doc)=>{
            console.log("--",doc.data())
            setPrevBooking(prev=>[...prev,doc.data()]);
        })
    }


    const senEmail=async(user)=>{
        const emailHtml = await render(<MeetingScheduleEmail
        businessName={businessInfo?.businessName}
        date={format(date,'PPP').toString()}
        duration={eventInfo?.duration}
        meetingTime={SelectedTime}
        meetingUrl={eventInfo?.locationUrl}
        userFirstName={user}
        />);

            plunk.emails.send({
            to:userEmail,
            subject: "New Meeting Schedule Details",
            body: emailHtml,
            }).then(resp=>{
                console.log(resp,"email sent")
            })
    }
  return (
    <div className='p-2 py-10 shadow-md m-5 border-t-8 my-10
    mx-10 md:mx-26  lg:mx-56'
    style={{borderTopColor:eventInfo?.themeColor}}
    >
        <div>
            image
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2  mt-5'>
            
            <div className='p-3 border-r'>
                <h2>{businessInfo?.businessName}</h2>
                <h2
                className='font-bold text-2xl'
                >{eventInfo?.eventName?eventInfo.eventName:"meeting Name"}</h2>
                <div className='flex flex-col gap-4 mt-5'>
                    <h2 className='flex gap-2'><Clock/>{eventInfo?.duration} Minute</h2>
                    <h2 className='flex gap-2'><MapPin/>{eventInfo?.locationType} Meeting</h2>
                    <h2 className='flex gap-2'><Calendar1/>{format(date,'PPP')}</h2>
                   {SelectedTime&& <h2 className='flex gap-2'><Clock10/>{SelectedTime}</h2>}
                    <Link className='flex gap-2 text-blue-400' href={eventInfo?.locationUrl?eventInfo?.locationUrl:"#"}>{eventInfo?.locationUrl} Meeting</Link>
                </div>

            </div>
            <div>
                {step==1?<TimeDateSelection 
                date={date}
                prevBooking={prevBooking}
                handleDateChange={handleDateChange}
                timeSlots={timeSlots}
                setSelectedTime={setSelectedTime}
                enableTimeSlots={enableTimeSlots}
                SelectedTime={SelectedTime}
                />
                :
                <UserFormInfo setUserEmail={setUserEmail} setUserName={setUserName} setUserNotes={setUserNotes}/>
                
                }

            </div>
           

        </div>
        <div className='flex gap-3 justify-end'>
            {step==2&&
            <Button variant='outline'
            onClick={()=>setStep(1)}
            >
                Back
            </Button>
            }
            {step==1?
                <Button className='float-right'
                disabled={!SelectedTime || !date}
                onClick={()=>setStep(step+1)}
                >Next
                </Button>
                :
                <Button
                onClick={()=>handleScheduleEvent()}
                disabled={!userEmail || !userName}
                >
                Schedule
                </Button>
            }

        </div>
      
    </div>
  )
}

export default MeetingTimeDateSelection
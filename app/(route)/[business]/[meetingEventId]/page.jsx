"use client"
import React, { useEffect, useState } from 'react'
import MeetingTimeDateSelection from '../_component/MeetingTimeDateSelection'
import { collection, doc, getDoc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import { app } from '@/config/Firebaseconfig'
import { useParams } from 'next/navigation';

const SharedMeetingEvent = () => {
    const params = useParams(); 
    const [businessInfo,setBusinessInfo]=useState();
    const [eventInfo,setEventInfo]=useState();
    const [loading,setLoading]=useState(false);

    const db = getFirestore(app);

    useEffect(() => {
        if (params?.business) {
            getEventAndBusinessDetails();
        }
    }, [params]);

    const getEventAndBusinessDetails = async () => {
            setLoading(true)
            const q = query(collection(db, 'Business'), where('businessName', '==', params?.business));
            const querySnapshot = await getDocs(q);
            
            querySnapshot.forEach((doc) => {
                setBusinessInfo(doc.data())
            });

        const docRef=doc(db,'MeetingEvent',params?.meetingEventId)
        const result=await getDoc(docRef);
        setEventInfo(result.data())
        console.log(result.data())
        setLoading(false)
    };

    return (
        <div>
            <MeetingTimeDateSelection eventInfo={eventInfo} businessInfo={businessInfo}/>
        </div>
    );
}

export default SharedMeetingEvent;

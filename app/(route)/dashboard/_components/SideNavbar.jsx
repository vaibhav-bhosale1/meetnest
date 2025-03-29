"use client"
import { Briefcase, Calendar, Clock, Ghost, Plus, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const SideNavbar = () => {
    const path=usePathname();
    const [activePath,setActivePath]=useState();
    useEffect(()=>{
        path&&setActivePath(path);
    },[path])

const menu=[
    {
        id:1,
        name:'Meeting Type',
        path:'/dashboard/meeting-type',
        icon:<Briefcase/>
    },
    {
        id:2,
        name:'Schedule Meeting',
        path:'/dashboard/schedule-meeting',
        icon:<Calendar/>
    },
    {
        id:3,
        name:'Availability',
        path:'/dashboard/availability',
        icon:<Clock/>
    },
    {
        id:4,
        name:'Settings',
        path:'/dashboard/settings',
        icon:<Settings/>
    }
]

  return (
    <div className='p-4 py-10'>
        <div>
        <p>Image</p>

        </div>
        
            <Button className='flex gap-2 w-full rounded-full mt-7'><Plus/>Create</Button>
            
        
        <div className='mt-5 gap-5 flex flex-col'>
            {
                menu.map((item,index)=>(
                    <Link href={item.path} key={index}>
                     <Button key={index} className={`w-full flex justify-start gap-2${activePath==item.path&&'text-white bg-orange-300'}`} variant="ghost">{item.icon}{item.name}</Button>
                    
                    </Link>
                   
                ))
            }

        </div>
       

    </div>
  )
}

export default SideNavbar
import React from 'react'
import SideNavbar from './_components/SideNavbar'
import DashboardHeader from './_components/DashboardHeader'
import NextTopLoader from 'nextjs-toploader';
import { Toaster } from "@/components/ui/sonner"

const Dashboardlayout = ({children}) => {
  return (
    <div>
        <div className='hidden md:block md:w-64 bg-slate-50 h-screen fixed'>
            <SideNavbar/>
        </div>
        <div className='md:ml-64'>
        <NextTopLoader />
        <Toaster richColors  position="top-center" />
            <DashboardHeader/>
        {children}
        </div>
      
        
    </div>
  )
}

export default Dashboardlayout
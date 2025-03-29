import React from 'react'
import SideNavbar from './_components/SideNavbar'
import DashboardHeader from './_components/DashboardHeader'

const Dashboardlayout = ({children}) => {
  return (
    <div>
        <div className='hidden md:block md:w-64 bg-slate-50 h-screen fixed'>
            <SideNavbar/>
        </div>
        <div className='md:ml-64'>
            <DashboardHeader/>
        {children}
        </div>
      
        
    </div>
  )
}

export default Dashboardlayout
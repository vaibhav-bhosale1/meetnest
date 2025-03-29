"use client"
import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

const DashboardHeader = () => {
    const {user}=useKindeBrowserClient();
  return user&&(
    <div className='p-4 px-10'>
        <div className='float-right'>
            <p>image of user logout</p>
        </div>

    </div>
  )
}

export default DashboardHeader
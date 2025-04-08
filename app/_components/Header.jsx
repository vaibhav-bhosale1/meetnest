"use client"
import { Button } from '../../components/ui/button'
import { LoginLink, RegisterLink } from '@kinde-oss/kinde-auth-nextjs'
import Link from 'next/link'
import React from 'react'

const Header = () => {
  return (
        <div className='flex mt-2 justify-between items-center p-2 shadow-md'>
            <div>
                image
            </div>
            <ul className='hidden md:flex gap-3 font-medium text-lg'>
                <li className='hover:text-orange-500 transition-all duration-200 cursor-pointer'>Product</li>
                <li className='hover:text-orange-500 transition-all duration-200 cursor-pointer' >Pricing </li>
                <li className='hover:text-orange-500 transition-all duration-200 cursor-pointer'>Contact us</li>
                <li className='hover:text-orange-500 transition-all duration-200 cursor-pointer'>About us</li>
            </ul>
            <div className='flex justify-center items-center gap-3'>
                <LoginLink><Button variant="ghost">Log in</Button></LoginLink>
              <RegisterLink><Button>Get started</Button></RegisterLink>  
            </div>
        </div>
  )
}

export default Header
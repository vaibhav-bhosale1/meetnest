import { Button } from '../../components/ui/button'
import Image from 'next/image'
import React from 'react'
import googleimg from  '../../public/google.png'
import facebookimg from  '../../public/facebook.png'

const Hero = () => {
  return (
    <div className='flex flex-col justify-center items-center my-20'>
        <div className='text-center max-w-2xl'>
            <h2 className='font-bold text-[60px] text-slate-600'>Easy Scheduling Ahead</h2>
            <h2 className='text-xl mt-5 text-slate-500'>Seamless scheduling made easy, helping you sync, plan, and connect effortlessly because your time matters.</h2>
        
        <div className='flex flex-col gap-4 mt-5'>
            <h3 className='text-sm'>Sign Up free with Google and Facebook</h3>
            <div className='flex justify-center gap-6'>
                <Button><Image src={googleimg} height={20} width={20} alt='googleimg'/>Sign up with Google</Button>
                <Button><Image src={facebookimg} height={20} width={20} alt='googleimg'/>Sign up with facebook</Button>
            </div>
        </div>
        </div>
     
    </div>
  )
}

export default Hero
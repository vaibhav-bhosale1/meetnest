"use client"
import { Input } from '../../../../components/ui/input'
import React from 'react'
import MeetingEventList from './_components/MeetingEventList'
import { motion } from 'framer-motion'
import Link from 'next/link'

const MeetingType = ({businessInfo,event}) => {
  return (
   
    
    <motion.div 
      initial={{ opacity: 0, y: -20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5 }} 
      className='p-6 bg-orange-50 min-h-screen'
    >
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, delay: 0.2 }} 
        className='flex flex-col gap-6 bg-white shadow-lg rounded-2xl p-6 border border-orange-300'
      > 
        <h2 className='font-bold text-4xl text-orange-600 text-center'>Meeting Event Type</h2>
        <motion.div 
          initial={{ opacity: 0, x: -20 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <Input 
            placeholder="Search..." 
            className='max-w-xs p-3 border border-orange-400 focus:ring-orange-500 focus:border-orange-500 rounded-lg'
          />
        </motion.div>
        <hr className='border-orange-300' />
        <motion.div 
          initial={{ opacity: 0, y: 10 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <MeetingEventList />
        </motion.div>
      </motion.div>
    </motion.div>
    
  )
}

export default MeetingType

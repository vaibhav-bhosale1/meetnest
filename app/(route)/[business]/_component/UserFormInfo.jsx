import { Input } from '../../../../components/ui/input'
import React from 'react'

const UserFormInfo = ({setUserName,setUserEmail,setUserNotes}) => {
  return (
    <div className='p-4 px-8 flex flex-col gap-4'>
        <h2 className='font-bold text-xl'>
            Enter Details
        </h2>
        <div>
            <h2>
                Name*
            </h2>
            <Input placeholder='Vaibhav Bhosale'
            onChange={(event)=>setUserName(event.target.value)}
            />
        </div>
        <div>
            <h2>
                Email*
            </h2>
            <Input placeholder='textmevaibhav@gmail.com'
            onChange={(event)=>setUserEmail(event.target.value)}
            />
        </div>
        <div>
            <h2>
                Share any Notes*
            </h2>
            <Input 
            onChange={(event)=>setUserNotes(event.target.value)}
            />
        </div>
        <div>
            <h2 className='text-xs text-gray-400'>
              By Proceeding, you confirm that you read and agree MeetNest Terms and conditions
            </h2>
        </div>
    </div>
  )
}

export default UserFormInfo
import React from 'react'

import MeetingForm from './_component/MeetingForm'

const CreateMeeting = () => {
  return (
    <div className='sgrid grid-cols-1 md:grid-cols-3 lg:grid-cols-3'>
        <div>
            <MeetingForm/>
        </div>
        <div className='md:col-span-2'>

        </div>
        
    </div>
  )
}

export default CreateMeeting
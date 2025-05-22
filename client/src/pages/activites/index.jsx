import React from 'react'
import TimeEnter from '../../component/timeEnter'
import Tasks from '../../component/tasks'
import BackButton from '../../component/BackSwitch'

export default function DailyActivities() {
  return (
    <div className='md:max-w-[768px] md:mx-auto md:px-12'>
      <BackButton/>
      <TimeEnter/>
      <Tasks/>
    </div>
  )
}

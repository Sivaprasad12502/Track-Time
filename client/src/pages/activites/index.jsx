import React from 'react'
import TimeEnter from '../../component/timeEnter'
import Tasks from '../../component/tasks'

export default function DailyActivities() {
  return (
    <div className='md:max-w-[768px] md:mx-auto px-12'>
      <TimeEnter/>
      <Tasks/>
    </div>
  )
}

import React from 'react'
import ActivityItem from './ActivityItem'


const ActivityList = ({data}) => {
  return (
    <div className='bg-white p-6 pl-10 mt-5 border border-[#E7E7E9] rounded-lg'>
      <div className="mt-6 flow-root">
        <ul role="list" className="divide-y divide-gray-100">
        {data.map((i) => (
          <li key={i.name} className="flex justify-between gap-x-6 py-5">
            <ActivityItem data={i} />
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default ActivityList
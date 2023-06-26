import React from 'react'

const Task = () => {
  return (
    <div className='p-20'><section className="mt-0">
    <h2 className="font-semibold text-gray-900 text-left">Upcoming events</h2>
    <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
      <li className="py-4 sm:flex">
        <time dateTime="2022-01-17" className="w-28 flex-none text-left">
          Wed, Jan 12
        </time>
        <p className="mt-2 flex-auto sm:mt-0 text-left">Nothing on today’s schedule</p>
      </li>
      <li className="py-4 sm:flex">
        <time dateTime="2022-01-19" className="w-28 flex-none text-left">
          Thu, Jan 13
        </time>
        <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0 text-left">View house with real estate agent</p>
        <p className="flex-none sm:ml-6">
          <time dateTime="2022-01-13T14:30">2:30 PM</time> - <time dateTime="2022-01-13T16:30">4:30 PM</time>
        </p>
      </li>
      <li className="py-4 sm:flex">
        <time dateTime="2022-01-20" className="w-28 flex-none text-left">
          Fri, Jan 14
        </time>
        <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0 text-left">Meeting with bank manager</p>
        <p className="flex-none sm:ml-6">All day</p>
      </li>
      <li className="py-4 sm:flex">
        <time dateTime="2022-01-18" className="w-28 flex-none text-left">
          Mon, Jan 17
        </time>
        <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0 text-left">Sign paperwork at lawyers</p>
        <p className="flex-none sm:ml-6">
          <time dateTime="2022-01-17T10:00">10:00 AM</time> - <time dateTime="2022-01-17T10:15">10:15 AM</time>
        </p>
      </li>
    </ol>
  </section></div>
  )
}

export default Task
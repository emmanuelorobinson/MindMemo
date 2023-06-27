import React from 'react'
import ProjectItem from './ProjectItem'

const entries = [
  {
  id : 1,
  name: "Farming For Eggs",
  status: "In Progress",
  due: "March 17, 2023",
  createdBy: "John Doe"
  },
  {
  id : 2,
  name: "Project 2",
  status: "Completed",
  due: "March 17, 2023",
  createdBy: "John Doe"
  },
]

const ProjectList = () => {
  return (
    <div className='bg-white p-6 pl-10 mt-5 border border-[#E7E7E9] rounded-lg'>
      <div className="mt-6 flow-root">
        <ul role="list" className="divide-y divide-gray-100">
        {entries.map((entry) => (
          <li key={entry.name} className="flex justify-between gap-x-6 py-5">
            <ProjectItem data={entry} />
          </li>
        ))}
        </ul>
      </div>
    </div>
  )
}

export default ProjectList
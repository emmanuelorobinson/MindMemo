import React from 'react'
import EmptyProject from '../components/Project/EmptyProject'
import ProjectList from '../components/Project/ProjectList'
import Breadcrumbs from '../components/Breadcrumbs'

const project = [1,2]

const Project = () => {
  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {project.length ? <ProjectList /> : <EmptyProject/>}
    </div>
  )
}

export default Project
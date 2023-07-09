import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import CreateProjectComponent from '../components/Project/CreateProjectComponent'

const CreateProject = () => {
  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      <CreateProjectComponent />
    </div>
  )
}

export default CreateProject
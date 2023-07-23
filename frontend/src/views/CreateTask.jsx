import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
// import CreateActivityComponent from '../components/Activity/CreateActivityComponent'
import CreateTaskComponent from '../components/Task/CreateTaskComponent';
import { useParams } from "react-router-dom";

const CreateTask = () => {

  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      <CreateTaskComponent />
    </div>
  )
}

export default CreateTask
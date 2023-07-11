import React from 'react'
import Breadcrumbs from '../components/Breadcrumbs'
import CreateActivityComponent from '../components/Activity/CreateActivityComponent'
import { useParams } from "react-router-dom";

const CreateActivity = () => {

  const { id } = useParams();
  console.log(id);

  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      <CreateActivityComponent projectId={id} />
    </div>
  )
}

export default CreateActivity
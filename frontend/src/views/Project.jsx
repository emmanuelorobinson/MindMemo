import React, {useEffect, useState} from 'react'
import EmptyItem from '../components/EmptyItem'
import ProjectList from '../components/Project/ProjectList'
import Breadcrumbs from '../components/Breadcrumbs'
import { getProjects } from '../utils/ProjectController'
import { useClerk } from '@clerk/clerk-react'
import { Navigate } from 'react-router-dom'


// const project = [1, 2]

const Project = () => {

  const { user } = useClerk()
  // console.log('use.id', user.id)

  const [project, setProject] = useState([])


  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects(user.id)
      // console.log('response', response)
      setProject(response)
    }
    fetchProjects()
  }, [])

  const onEmptyButtonClick = () => {
    Navigate('/project/create')
  }



  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {project.length ? <ProjectList projectList={project} /> : <EmptyItem title={"No projects"} subtitle={"Get started by creating a new project."} buttonText={"New Project"} onButtonClick={onEmptyButtonClick}/>}
    </div>
  )
}

export default Project
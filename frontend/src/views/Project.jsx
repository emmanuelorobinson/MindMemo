import React, {useEffect, useState} from 'react'
import EmptyProject from '../components/Project/EmptyProject'
import ProjectList from '../components/Project/ProjectList'
import Breadcrumbs from '../components/Breadcrumbs'
import { getProjects } from '../utils/ProjectController'
import { useClerk } from '@clerk/clerk-react'


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




  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {project.length ? <ProjectList projectList={project} /> : <EmptyProject/>}
    </div>
  )
}

export default Project
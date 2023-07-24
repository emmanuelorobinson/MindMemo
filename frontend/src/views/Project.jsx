import React, {useEffect, useState} from 'react'
import EmptyItem from '../components/EmptyItem'
import ProjectList from '../components/Project/ProjectList'
import Breadcrumbs from '../components/Breadcrumbs'
import { getProjects } from '../utils/ProjectController'
import { useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'


// const project = [1, 2]

const Project = () => {

  const { user } = useClerk()
  // console.log('use.id', user.id)

  const [project, setProject] = useState([])
  const [reFetch, setReFetch] = React.useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects(user.id)
      setProject(response)
    }
    fetchProjects()
  }, [reFetch])

  const triggerReFetch = () => {
    setReFetch(!reFetch)
    console.log('triggered')
  }


  const onEmptyButtonClick = () => {
    navigate('/project/create')
  }



  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {project.length ? <ProjectList projectList={project} reFetch={triggerReFetch} /> : <EmptyItem title={"No projects"} subtitle={"Get started by creating a new project."} buttonText={"New Project"} onButtonClick={onEmptyButtonClick}/>}
    </div>
  )
}

export default Project
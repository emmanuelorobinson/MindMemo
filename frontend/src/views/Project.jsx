import React, {useEffect, useState} from 'react'
import EmptyItem from '../components/EmptyItem'
import ProjectList from '../components/Project/ProjectList'
import Breadcrumbs from '../components/Breadcrumbs'
import { getProjects } from '../utils/ProjectController'
import { useClerk } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'
import AppContext from '../context/AppContext'


// const project = [1, 2]

const Project = () => {

  const {refetch, setProjectCycles} = React.useContext(AppContext)

  const { user } = useClerk()
  // console.log('use.id', user.id)

  const [project, setProject] = useState([])
  const [reFetch, setReFetch] = React.useState(false)
  const navigate = useNavigate()


  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getProjects(user.id)
      // filter by project with save_as_cycle = true
      const filteredResponse = response.filter((item) => item.save_as_cycle === true)
      setProjectCycles(filteredResponse)
      setProject(response)

    }
    fetchProjects()
  }, [refetch])




  const onEmptyButtonClick = () => {
    navigate('/project/create')
  }



  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {project.length ? <ProjectList projectList={project} /> : <EmptyItem title={"No projects"} subtitle={"Get started by creating a new project."} buttonText={"New Project"} onButtonClick={onEmptyButtonClick}/>}
    </div>
  )
}

export default Project
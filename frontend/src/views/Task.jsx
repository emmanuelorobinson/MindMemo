import React, {useEffect, useState} from 'react'
import TaskList from '../components/Task/TaskList'
import Breadcrumbs from '../components/Breadcrumbs'
import { Link, useParams, useLocation } from "react-router-dom";
import { getTasks } from '../utils/TaskController'

const Task = () => {

  const search = useLocation().search;
  const projectId = new URLSearchParams(search).get('projectId');
  const activityId = new URLSearchParams(search).get('activityId');

  const [task, setTask] = React.useState([])

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTasks(activityId)
      console.log('response', response)
      setTask(response)
    }
    fetchTask()
  }, [])


  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {task.length ? <TaskList taskList={task} /> : ""}
    </div>
  )
}

export default Task
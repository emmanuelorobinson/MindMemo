import React, {useEffect, useState} from 'react'
import TaskList from '../components/Task/TaskList'
import Breadcrumbs from '../components/Breadcrumbs'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getTasks } from '../utils/TaskController'
import EmptyItem from '../components/EmptyItem';

const Task = () => {

  const search = useLocation().search;
  const projectId = new URLSearchParams(search).get('projectId');
  const activityId = new URLSearchParams(search).get('activityId');
  const navigate = useNavigate();

  const [task, setTask] = React.useState([])
  const [reFetch, setReFetch] = React.useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTasks(activityId)
      console.log('response', response)
      setTask(response)
    }
    fetchTask()
  }, [reFetch])

  const onEmptyButtonClick = () => {
    navigate(`/project/activity/task/create?projectId=${projectId}&activityId=${activityId}`);
  }

  const triggerReFetch = () => {
    setReFetch(!reFetch)
    console.log('triggered')
  }



  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {task.length ? <TaskList taskList={task} reFetch={triggerReFetch} /> : <EmptyItem title={"No task"} subtitle={"Get started by creating a new task."} buttonText={"New Task"} onButtonClick={onEmptyButtonClick}/>}
    </div>
  )
}

export default Task
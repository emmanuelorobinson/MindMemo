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

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTasks(activityId)
      console.log('response', response)
      setTask(response)
    }
    fetchTask()
  }, [])

  const onEmptyButtonClick = () => {
    navigate(`/project/activity/task/create?projectId=${projectId}&activityId=${activityId}`);
  }



  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {task.length ? <TaskList taskList={task} /> : <EmptyItem title={"No task"} subtitle={"Get started by creating a new task."} buttonText={"New Task"} onButtonClick={onEmptyButtonClick}/>}
    </div>
  )
}

export default Task
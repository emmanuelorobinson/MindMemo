import React, {useEffect, useState} from 'react'
import TaskList from '../components/Task/TaskList'
import Breadcrumbs from '../components/Breadcrumbs'
import { Link, useNavigate, useLocation } from "react-router-dom";
import { getTasks } from '../utils/TaskController'
import EmptyItem from '../components/EmptyItem';
import AppContext from '../context/AppContext';

const Task = () => {

  const search = useLocation().search;
  const projectId = new URLSearchParams(search).get('projectId');
  const activityId = new URLSearchParams(search).get('activityId');
  const navigate = useNavigate();

  // const [task, setTask] = React.useState([])
  const { task, setTask, refetch } = React.useContext(AppContext);
  const [reFetch, setReFetch] = React.useState(false)

  useEffect(() => {
    const fetchTask = async () => {
      const response = await getTasks(activityId)
      setTask(response)
    }
    fetchTask()
  }, [refetch])

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
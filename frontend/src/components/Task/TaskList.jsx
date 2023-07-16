import React from 'react'
import TaskTable from './TaskTable'
import AddButton from '../AddButton'
import { useNavigate, useParams, useLocation } from "react-router-dom";

const TaskList = ({taskList}) => {

  const onAddClick = () => {
    console.log('add')
    // navigate(`/project/activity/create?id=${id}`);
  };

  return (
    <div className="bg-white p-6 pl-10 mt-5 border border-[#E7E7E9] rounded-lg">
      <div className="flex flex-row justify-between">
        <div className="flex flex-col justify-start text-left">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Task
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            View all your tasks and create new ones.
          </p>
        </div>
        <div className="flex justify-end">
          <AddButton onAddClick={onAddClick} />
        </div>
      </div>
      <div className="mt-6 flow-root">
        <TaskTable taskList={taskList} />
      </div>
    </div>
  )
}

export default TaskList
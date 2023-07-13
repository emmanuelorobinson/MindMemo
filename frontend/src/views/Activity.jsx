import React from 'react'
import EmptyProject from '../components/Project/EmptyProject'
import ActivityList from '../components/Activity/ActivityList'
import Breadcrumbs from '../components/Breadcrumbs'
import { Link, useParams, useLocation } from "react-router-dom";

const activity = [
  {
    id: 1,
    projectId : 1,
    name: "Activity 1",
    status: "In Progress",
    tags: ["tag1", "tag2", "tag3"],
  },
  {
    id: 2,
    projectId : 1,
    name: "Activity 2",
    status: "Completed",
  },
  {
    id: 3,
    projectId : 2,
    name: "Activity 3",
    status: "Completed",
  },
]

const Activity = () => {

  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  const data = activity.filter((item) => item.projectId == id);

  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {activity.length ? <ActivityList data={data} /> : ""}
    </div>
  )
}

export default Activity
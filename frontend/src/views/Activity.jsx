import React, { useEffect } from 'react'
import EmptyProject from '../components/Project/EmptyProject'
import ActivityList from '../components/Activity/ActivityList'
import Breadcrumbs from '../components/Breadcrumbs'
import { Link, useParams, useLocation } from "react-router-dom";
import { getActivities } from '../utils/ActivityController'


const Activity = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');

  const [activity, setActivity] = React.useState([])

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await getActivities(id)
      // console.log('response', response)
      setActivity(response)
    }
    fetchActivity()
  }, [])


  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {activity.length ? <ActivityList activityList={activity} /> : ""}
    </div>
  )
}

export default Activity
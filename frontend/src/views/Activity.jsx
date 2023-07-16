import React, { useEffect } from 'react'
import EmptyItem from '../components/EmptyItem'
import ActivityList from '../components/Activity/ActivityList'
import Breadcrumbs from '../components/Breadcrumbs'
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { getActivities } from '../utils/ActivityController'


const Activity = () => {
  const search = useLocation().search;
  const id = new URLSearchParams(search).get('id');
  const navigate = useNavigate();

  const [activity, setActivity] = React.useState([])

  useEffect(() => {
    const fetchActivity = async () => {
      const response = await getActivities(id)
      // console.log('response', response)
      setActivity(response)
    }
    fetchActivity()
  }, [])

  const onEmptyButtonClick = () => {
    navigate(`/project/activity/create?id=${id}`);
  }


  return (
    <div className='p-5 h-[100vh]'>
      <Breadcrumbs />
      {activity.length ? <ActivityList activityList={activity} /> : <EmptyItem title={"No activity"} subtitle={"Get started by creating a new activity."} buttonText={"New Activity"} onButtonClick={onEmptyButtonClick}/>}
    </div>
  )
}

export default Activity
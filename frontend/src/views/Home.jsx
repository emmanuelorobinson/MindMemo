import React from 'react'
import Calendar from '../components/Home/Calendar'
import Task from '../components/Home/Task'
import { useClerk } from '@clerk/clerk-react'
import { getUpcomingTasks } from '../utils/TaskController'
import Spinner from '../components/Spinner'
const Home = () => {

  const { user } = useClerk()
  const [task, setTask] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchTask = async () => {
      const response = await getUpcomingTasks(user.id)
      console.log('response', response)
      setTask(response)
      setLoading(false)
    }
    fetchTask()
  }, [])

  if (loading) {
    
    return <div className='flex w-[100%] h-[100vh] justify-center align-middle my-auto'>
      <Spinner />
    </div>
  }
  else {
    console.log('task', task)
  }



  return (
    <div>
      <Calendar />
      <Task />
    </div>
  )
}

export default Home
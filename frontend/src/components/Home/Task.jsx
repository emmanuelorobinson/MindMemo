import React from 'react';

const formatDate = (date, duration) => {
  const dueDate = new Date(date);
  dueDate.setDate(dueDate.getDate() + duration);
  const formattedDueDate = dueDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'long',
    day: 'numeric',
  });

  return formattedDueDate;
};

const separateDates = (taskList) => {
  const dates = {};
  taskList.forEach((item) => {
    const formattedDate = formatDate(item.start_date, item.duration);
    if (!dates[formattedDate]) {
      dates[formattedDate] = [];
    }
    dates[formattedDate].push(item);
  });
  return dates;
};

const Task = ({ taskList }) => {
  const today = formatDate(new Date(), 0);
  const taskForToday = taskList.find((item) => formatDate(item.start_date, item.duration) === today);
  const dates = separateDates(taskList);

  return (
    <div className="p-20">
      <section className="md:mt-[-5rem]">
        <h2 className="font-semibold text-gray-900 text-left">Upcoming events</h2>
        <ol className="mt-2 divide-y divide-gray-200 text-sm leading-6 text-gray-500">
          <li className="py-4 sm:flex">
            <time dateTime="2022-01-17" className="w-28 flex-none text-left">
              {today}
            </time>
            <p className="mt-2 flex-auto sm:mt-0 text-left">
              {taskForToday ? taskForToday.task_name : "Nothing on today's schedule"}
            </p>
          </li>
          {Object.entries(dates).map(([formattedDate, tasks]) => (
            <li key={formattedDate} className="py-4 sm:flex">
              <time dateTime={tasks[0].start_date} className="w-28 flex-none text-left">
                {formattedDate}
              </time>
              <ul>
                {tasks.map((task) => (
                  <li key={task.id}>
                    <p className="mt-2 flex-auto font-semibold text-gray-900 sm:mt-0 text-left">{task.task_name}</p>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};

export default Task;

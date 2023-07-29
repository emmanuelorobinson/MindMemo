export function generateDays(currentMonth, currentYear, events) {
  // fill in the days of the month for currentMonth and currentYear
  const days = [];
  const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();
  // console.log("daysInMonth", daysInMonth);
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(currentYear, currentMonth, i)
      .toISOString()
      .slice(0, 10);
    days.push({ date, events: [] });
    // console.log('date', date)
  }
  // console.log("days", days);
  // remove earliest date from array
  days.shift();

  // fill the days from the previous month for the first week of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  if (firstDayOfMonth !== 0) {
    const daysInPreviousMonth = new Date(
      currentYear,
      currentMonth,
      0
    ).getDate();
    for (let i = firstDayOfMonth; i > 0; i--) {
      const date = new Date(
        currentYear,
        currentMonth - 1,
        daysInPreviousMonth - i + 2
      )
        .toISOString()
        .slice(0, 10);
      days.unshift({ date, events: [] });
    }
  }

  // sort the days in the previous month
  days.sort((a, b) => {
    return new Date(a.date) - new Date(b.date);
  });

  // fill the days from the next month for the last week of the month
  const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0).getDay();
  if (lastDayOfMonth !== 6) {
    for (let i = lastDayOfMonth; i < 6; i++) {
      const date = new Date(
        currentYear,
        currentMonth + 1,
        i - lastDayOfMonth + 2
      )
        .toISOString()
        .slice(0, 10);
      days.push({ date, events: [] });
    }
  }

  // is today?
  const today = new Date();
  days.forEach((day) => {
    // get the month from today
    const todayMonth = today.getMonth();
    // console.log("todayMonth", todayMonth);

    const storedMonth = Number(day.date.slice(5, 7)) - 1;
    // console.log("storedMonth", storedMonth);

    if (todayMonth === storedMonth) {
      day.isCurrentMonth = true;
    }
  });

  days.forEach((day) => {
    if (day.date === today.toISOString().slice(0, 10)) {
      day.isToday = true;
    }
  });

  // print the days to the console
  // console.log("days", days);

  return days;
}

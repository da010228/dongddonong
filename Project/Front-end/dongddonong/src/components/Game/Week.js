import { useState, useCallback, useMemo, useEffect } from "react";

const Week = ({ onChange, selectedDate }) => {
  const daysOfWeek = ["일", "월", "화", "수", "목", "금", "토"];
  const [currentWeek, setCurrentWeek] = useState(() =>
    getWeekArray(selectedDate)
  );

  const handleClick = useCallback((date) => {
    onChange(date);
  }, []);

  const isDateSelected = useCallback(
    (date) => {
      return (
        selectedDate &&
        date.getDate() === selectedDate.getDate() &&
        date.getMonth() === selectedDate.getMonth() &&
        date.getFullYear() === selectedDate.getFullYear()
      );
    },
    [selectedDate]
  );

  const getDayClassName = useCallback(
    (date) => {
      const baseClassName = "text-center hover:cursor-pointer";
      return isDateSelected(date)
        ? `${baseClassName} border-b border-orange`
        : baseClassName;
    },
    [isDateSelected]
  );

  const weekArray = useMemo(() => getWeekArray(currentWeek[0]), [currentWeek]);

  const goToNextWeek = () => {
    const nextWeekDate = new Date(currentWeek[0]);
    nextWeekDate.setDate(nextWeekDate.getDate() + 7);
    setCurrentWeek([nextWeekDate, ...weekArray.slice(0, 6)]);
  };

  const goToPreviousWeek = () => {
    const previousWeekDate = new Date(currentWeek[0]);
    previousWeekDate.setDate(previousWeekDate.getDate() - 7);
    setCurrentWeek([previousWeekDate, ...weekArray.slice(0, 6)]);
  };

  useEffect(() => {
    setCurrentWeek(getWeekArray(selectedDate));
  }, [selectedDate]);

  function getWeekArray(startDate) {
    const weekArray = [];
    const startDayOfWeek = startDate.getDay();
    const firstDate = new Date(startDate);
    firstDate.setDate(startDate.getDate() - startDayOfWeek);
    for (let i = 0; i < 7; i++) {
      const date = new Date(firstDate);
      date.setDate(firstDate.getDate() + i);
      weekArray.push(date);
    }
    return weekArray;
  }

  const currentMonth = currentWeek[0].getMonth();
  const currentYear = currentWeek[0].getFullYear();

  return (
    <div className="text-center">
      <div>
        {currentYear}년 {currentMonth + 1}월
      </div>
      <div className="flex justify-center">
        <button onClick={goToPreviousWeek}>＜</button>

        <div className="">
          <div className="flex justify-between">
            {daysOfWeek.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>

          <div className="flex justify-between">
            {weekArray.map((date, index) => (
              <div
                key={index}
                className={getDayClassName(date)}
                onClick={() => handleClick(date)}
              >
                {date.getDate()}
              </div>
            ))}
          </div>
        </div>

        <button onClick={goToNextWeek}>＞</button>
      </div>
    </div>
  );
};

export default Week;
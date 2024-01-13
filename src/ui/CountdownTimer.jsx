import { useState, useEffect } from "react";

const CountdownTimer = ({ targetDate }) => {
  const [timeRemaining, setTimeRemaining] = useState(getTimeRemaining());

  useEffect(() => {
    const interval = setInterval(() => {
      const remainingTime = getTimeRemaining();
      setTimeRemaining(remainingTime);

      if (remainingTime.total <= 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  function getTimeRemaining() {
    const now = new Date().getTime();
    const targetTime = new Date(targetDate).getTime();
    const total = Math.max(targetTime - now, 0);

    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));

    return {
      total,
      days,
      hours,
      minutes,
      seconds,
    };
  }

  return (
    <div>
      {timeRemaining.total > 0 ? (
        <div>
          <div>{timeRemaining.days} ngày</div>
          <div>{timeRemaining.hours} giờ</div>
          <div>{timeRemaining.minutes} phút</div>
          <div>{timeRemaining.seconds} giây</div>
        </div>
      ) : (
        <div>Hết thời gian</div>
      )}
    </div>
  );
};

const App = () => {
  const targetDate = new Date("2023-12-31T23:59:59").toISOString();

  return (
    <div>
      <h1>Đồng hồ đếm ngược</h1>
      <CountdownTimer targetDate={targetDate} />
    </div>
  );
};

export default App;

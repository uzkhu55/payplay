"use client";

import { useEffect, useState } from "react";

const ComingSoon = ({ launchDate }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(launchDate).getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (distance < 0) {
        clearInterval(countdown);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(countdown);
  }, [launchDate]);

  return (
    <div className="flex flex-col items-center justify-center ">
      <h1 className="text-4xl font-bold mb-4">Coming Soon</h1>
      <p className="text-lg mb-6">
        We are working hard to bring this page to you soon!
      </p>

      <div className="flex space-x-4 text-center text-xl">
        <div>
          <p className="font-bold">{timeLeft.days}</p>
          <p>Days</p>
        </div>
        <div>
          <p className="font-bold">{timeLeft.hours}</p>
          <p>Hours</p>
        </div>
        <div>
          <p className="font-bold">{timeLeft.minutes}</p>
          <p>Minutes</p>
        </div>
        <div>
          <p className="font-bold">{timeLeft.seconds}</p>
          <p>Seconds</p>
        </div>
      </div>

      <p className="text-sm mt-6 text-gray-500">Stay tuned for the launch!</p>
    </div>
  );
};

export default ComingSoon;

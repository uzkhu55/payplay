"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

export const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/leaderboard"
        );
        setLeaderboard(response.data);
      } catch (err) {
        setError("Error fetching leaderboard.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center   bg-white p-6">
      <h1 className="text-3xl font-bold text-white mb-6">Leaderboard</h1>
      <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-lg">
        <thead>
          <tr className="bg-gray-200">
            <th className="py-2 px-4 border-b">Username</th>
            <th className="py-2 px-4 border-b">Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr
              key={user.username}
              className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="py-2 text-center px-4 border-b">
                {user.username}
              </td>
              <td className="py-2 text-center px-4 border-b">{user.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

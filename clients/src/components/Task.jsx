"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useUser } from "@/provider/UserProvider";

export const Task = () => {
  const { token } = useUser();

  const [question, setQuestion] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userAnswer, setUserAnswer] = useState("");
  const [answerFeedback, setAnswerFeedback] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [countdown, setCountdown] = useState(100);
  const [points, setPoints] = useState(0);
  const [isDone, setIsDone] = useState(false); // Track if done button is clicked

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown]);

  const fetchRandomQuestion = async () => {
    setLoading(true);
    setError(null);
    setUserAnswer("");
    setAnswerFeedback("");
    setIsChecking(false);
    setCountdown(100);

    try {
      const token = localStorage.getItem("token");
      const response = await axios("http://localhost:8000/api/question", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const questions = response.data.questions;
      if (questions && questions.length > 0) {
        const randomIndex = Math.floor(Math.random() * questions.length);
        setQuestion(questions[randomIndex]);
      } else {
        setError("No questions found.");
      }
    } catch (err) {
      setError("Error fetching questions.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const checkAnswer = async () => {
    if (userAnswer.trim().toLowerCase() === question.answer.toLowerCase()) {
      setAnswerFeedback("Correct!");
      const earnedPoints = countdown; // Points to add based on countdown
      setPoints((prev) => prev + earnedPoints); // Update local points state
    } else {
      setAnswerFeedback("Incorrect. The correct answer is: " + question.answer);
    }
    setIsChecking(true);
  };

  const updateUserPoints = async (earnedPoints) => {
    try {
      await axios.post(
        `http://localhost:8000/api/user/points`,
        {
          points: earnedPoints,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
    } catch (err) {
      console.error("Error updating points:", err);
    }
  };

  const handleDone = async () => {
    if (points > 0) {
      await updateUserPoints(points); // Update user points with total points earned
      setIsDone(true); // Indicate that the user has finished
      setUserAnswer(""); // Clear the answer input
      setAnswerFeedback(""); // Clear feedback
      setPoints(0); // Reset local points after updating
      setIsChecking(false); // Reset checking state
      setCountdown(100); // Reset countdown for the next question
      fetchRandomQuestion(); // Fetch a new question
    }
  };

  const handleNextQuestion = () => {
    fetchRandomQuestion();
    setUserAnswer("");
    setAnswerFeedback("");
    setIsChecking(false);
    setIsDone(false); // Reset done state
  };

  return (
    <div className="flex flex-col items-center justify-center  p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Random Question Generator
      </h1>

      <button
        onClick={fetchRandomQuestion}
        className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
        disabled={loading}
      >
        {loading ? "Loading..." : "Generate Random Question"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {question && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <p className="text-lg font-semibold text-gray-700">
            Question: {question.question}
          </p>

          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            placeholder="Your answer..."
            className="border p-2 mt-4 w-full rounded"
          />

          <button
            onClick={isChecking ? handleNextQuestion : checkAnswer}
            className={`bg-${
              isChecking ? "green" : "blue"
            }-500 text-black px-6 py-2 rounded-lg shadow hover:bg-${
              isChecking ? "green" : "blue"
            }-600 transition duration-200 mt-2`}
          >
            {isChecking ? "Next" : "Check Answer"}
          </button>

          {isChecking && (
            <button
              onClick={handleDone}
              className="bg-yellow-500 text-white px-6 py-2 rounded-lg shadow hover:bg-yellow-600 transition duration-200 mt-2"
            >
              Done
            </button>
          )}

          {answerFeedback && (
            <p className="mt-4 text-md text-gray-600">{answerFeedback}</p>
          )}

          <p className="mt-4 text-lg font-semibold text-gray-700">
            Countdown: {countdown}
          </p>
          <p className="mt-2 text-md text-gray-600">Points: {points}</p>
        </div>
      )}
    </div>
  );
};

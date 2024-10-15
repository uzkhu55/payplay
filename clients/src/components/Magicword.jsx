"use client";
import axios from "axios";
import { useState, useEffect } from "react";

const Magicword = () => {
  const [inputValue, setInputValue] = useState("");
  const [magicWord, setMagicWord] = useState("thisisamagicword"); // Assuming magic word
  const [tickets, setTickets] = useState();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [isCorrect, setIsCorrect] = useState(false); // Track if magic word is correct

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios("http://localhost:8000/api/ticket", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTickets(response.data.ticket);
      } catch (error) {
        console.error("Error fetching ticket data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePasswordChange = async () => {
    const token = window.localStorage.getItem("token");

    if (inputValue === magicWord) {
      setMessage("Congrats! You guessed the magic word.");
      setIsCorrect(true); // Set to true when correct
    } else {
      setMessage("That's not correct.");
      setIsCorrect(false); // Set to false when incorrect
      const updatedTickets = tickets - 1;
      setTickets(updatedTickets);
    }

    setShowModal(true); // Show modal in both cases

    try {
      await axios.post(
        "https://payplay-plhh.onrender.com/api/updateTicket",
        { tickets },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (error) {
      console.error("Error updating ticket:", error);
    }

    // Clear input after handling the magic word check
    setInputValue("");
  };

  return (
    <div className="text-white h-full justify-center gap-4 flex flex-col items-center ">
      {/* Modal */}
      {showModal && (
        <div className=" inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="text-center">
            {isCorrect ? (
              <div className="bg-green-300 border-2 border-green-500 px-[100px] bg-opacity-20 text-white p-8 rounded-lg text-center">
                <h2 className="text-2xl text-yellow-300 font-bold mb-4">
                  Таньд баяр хүргье!
                </h2>
                <p>
                  Та "thisisamagicword" шидэт үгийг бичсэнээр та манай хонжворын
                  сангаас 3,000,000₮ хожлоо.!
                </p>
                <button
                  className="mt-4  text-white px-4 py-2 rounded-lg"
                  onClick={() => {
                    window.location.href = "tel:97699999999";
                  }}
                >
                  Та тус хонжвороо дараах дугаар луу залган авах боломжтой{" "}
                  <br /> <br />
                  "Залгах"
                </button>
              </div>
            ) : (
              <div className="bg-red-300 border-2 border-red-500 w-[900px] bg-opacity-20 text-white p-8 rounded-lg text-center">
                <p>Та буруу шидэт үг оруулсан байна.</p>
                <p>Та дахин оролдоно уу.</p>
              </div>
            )}
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={() => setShowModal(false)} // Close modal
            >
              Хаах
            </button>
          </div>
        </div>
      )}

      <div className="flex gap-6 ">
        <button className="border-2 px-[100px] border-white">ADD MAGIC</button>
        <button className="border-2 px-[100px] border-white">
          SEE ALL MAGIC
        </button>
        <button className="border-2 px-[100px] border-white">
          LEADERBOARD
        </button>
      </div>
      <div>
        <input
          className="border-2 border-orange-400 outline-none p-4 px-[340px] bg-black"
          placeholder="What is the magic word"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className={`border-2 border-orange-400 border-l-transparent p-4 bg-black ${
            tickets === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={handlePasswordChange}
          disabled={tickets === 0} // Disable the button if tickets === 0
        >
          See Magic
        </button>
      </div>
      {message && <p>{message}</p>}
      <p>Tickets remaining: {tickets}</p>
    </div>
  );
};

export default Magicword;

"use client";
import { useState } from "react";
import axios from "axios";
import { useUser } from "@/provider/UserProvider";

const Profile = () => {
  const [birthdaySearch, setBirthdaySearch] = useState("");
  const [foundUsernames, setFoundUsernames] = useState([]);
  const { logOutHandler, username } = useUser();
  const [profilePic, setProfilePic] = useState(null);
  const [updatePassword, setUpdatePassword] = useState("");
  const [password, setPassword] = useState("");
  const [balance, setBalance] = useState(0);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  const [qrCodeData, setQrCodeData] = useState("");
  const [searchUsername, setSearchUsername] = useState("");
  const [chargeAmount, setChargeAmount] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");
  const [questionError, setQuestionError] = useState(null);

  const isAdmin = username === "Admin";

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setProfilePic(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSearchByBirthday = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.get(
        `http://localhost:8000/api/birthday?birthday=${birthdaySearch}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = response.data;

      if (Array.isArray(data)) {
        setFoundUsernames(data);
      } else {
        setFoundUsernames([]);
      }
    } catch (error) {
      console.error("Error searching users by birthday:", error);
      alert("Failed to search users by birthday.");
      setFoundUsernames([]);
    }
  };

  const handlePasswordChange = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/change-password",
        {
          password,
          updatePassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Password changed successfully!");
    } catch (error) {
      console.error("Error changing password:", error);
      alert("Failed to change password.");
    }
  };

  const toggleQrCodeModal = () => {
    setQrCodeModal(!qrCodeModal);
  };

  const handleChargeByUsername = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/updateBalance",
        {
          username: searchUsername,
          amount: chargeAmount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        alert("Balance updated successfully!");
        setQrCodeModal(false);
      }
    } catch (error) {
      console.error("Error updating balance:", error);
      alert("Failed to update balance.");
    }
  };

  const handleAddQuestion = async () => {
    const token = window.localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:8000/api/addquestion",
        { question: newQuestion, answer: newAnswer },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        alert("Question added successfully!");

        setNewQuestion("");
        setNewAnswer("");
      }
    } catch (error) {
      console.error("Error adding question:", error);
      alert("Failed to add question.");
    }
  };

  return (
    <div className="flex flex-col items-center h-full bg-black text-white ">
      <h1 className="text-2xl font-bold">Profile</h1>
      <div className="mt-4 flex flex-col items-center justify-center">
        <h2 className="text-xl font-semibold">Profile Photo</h2>
        <div className="flex items-center gap-4">
          <img
            src={
              "https://user-images.githubusercontent.com/11250/39013954-f5091c3a-43e6-11e8-9cac-37cf8e8c8e4e.jpg"
            }
            alt="Profile"
            className="w-24 h-24 flex items-center rounded-full object-cover"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
            className="bg-black p-2 rounded"
          />
        </div>
      </div>

      {!isAdmin && (
        <div className="mt-6 items-center flex flex-col gap-4">
          <h2 className="text-xl font-semibold">Change Password</h2>
          <div className="flex flex-col gap-2">
            <input
              type="password"
              placeholder="Current Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-100 text-black p-2 rounded w-64"
            />
            <input
              type="password"
              placeholder="New Password"
              value={updatePassword}
              onChange={(e) => setUpdatePassword(e.target.value)}
              className="bg-gray-100 p-2 text-black rounded w-64"
            />
            <button
              onClick={handlePasswordChange}
              className="bg-gradient-to-r from-orange-400 to-pink-600 text-white px-4 py-2 rounded mt-2"
            >
              Update Password
            </button>
          </div>
        </div>
      )}

      {isAdmin && (
        <>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">
              Charged amount: ₮{balance.toFixed()}
            </h2>
            <button
              onClick={toggleQrCodeModal}
              className="bg-gradient-to-r from-orange-400 to-pink-600 text-white px-[100px] py-2 rounded mt-2"
            >
              Charge
            </button>
          </div>

          <div className="mt-6 flex flex-col text-center">
            {foundUsernames.length > 0 ? (
              <div className="mt-4">
                <h3 className="text-lg font-bold">Usernames Found:</h3>
                <ul>
                  {foundUsernames.map((username, index) => (
                    <li key={index}>{username}</li>
                  ))}
                </ul>
              </div>
            ) : (
              <p>No users found with that birthday.</p>
            )}

            <h2 className="text-xl font-semibold">Search by Birthday</h2>
            <input
              type="date"
              value={birthdaySearch}
              onChange={(e) => setBirthdaySearch(e.target.value)}
              className="bg-gray-100 text-black p-2 rounded w-64"
            />
            <button
              onClick={handleSearchByBirthday}
              className="bg-gradient-to-r from-orange-400 to-pink-600 text-white px-4 py-2 rounded mt-2"
            >
              Search
            </button>
          </div>

          <div className="mt-4 flex flex-col mb-8">
            <h2 className="text-xl font-semibold">Add Question</h2>
            <input
              className="bg-gray-100 text-black p-2 rounded w-64 mb-2"
              type="text"
              placeholder="New Question"
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
            />
            <input
              type="text"
              className="bg-gray-100 text-black p-2 rounded w-64 mb-2"
              placeholder="Answer"
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
            />
            <button
              className="bg-gradient-to-r from-orange-400 to-pink-600 text-white px-4 py-2 rounded"
              onClick={handleAddQuestion}
            >
              Add Question
            </button>
            {questionError && (
              <p className="text-red-500 mt-2">{questionError}</p>
            )}
          </div>
        </>
      )}
      <button
        className="p-2 rounded-md bg-gradient-to-r from-orange-400 to-pink-600 text-black"
        onClick={logOutHandler}
      >
        Log out
      </button>

      {qrCodeModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Charge Balance</h2>

            <input
              type="text"
              placeholder="Search by Username"
              value={searchUsername}
              onChange={(e) => setSearchUsername(e.target.value)}
              className="bg-gray-100 text-black p-2 rounded w-full mb-4"
            />

            <input
              type="text"
              placeholder="Enter amount to charge"
              value={chargeAmount}
              onChange={(e) => setChargeAmount(e.target.value)}
              className="bg-gray-100 text-black p-2 rounded w-full mb-4"
            />

            <button
              onClick={handleChargeByUsername}
              className="bg-green-500 text-white px-4 py-2 rounded"
            >
              Charge Balance
            </button>
            <button
              onClick={toggleQrCodeModal}
              className="bg-red-500 text-white px-4 py-2 rounded ml-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

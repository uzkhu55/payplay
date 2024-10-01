"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { QRCodeCanvas } from "qrcode.react"; // Library for generating QR code

const Magicheader = () => {
  const [ticket, setTicket] = useState();
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");

      try {
        const response = await axios("http://localhost:8000/api/ticket", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setTicket(response.data.ticket);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const handleRechargeClick = () => {
    setShowModal(true); // Show modal when "RECHARGE" is clicked
  };

  const closeModal = () => {
    setShowModal(false); // Close modal when user clicks on close button
  };

  return (
    <div className="max-w-10xl w-full mx-auto">
      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-semibold mb-4">
              Recharge using QR Code
            </h2>
            {/* QR Code */}
            <QRCodeCanvas value="https://example.com/recharge" size={256} />
            <button
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
              onClick={closeModal} // Close modal
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 w-screen md:grid-cols-3 text-sm text-black">
        <div className="flex flex-col p-4 border-2 border-orange-400 justify-center bg-black text-center">
          <p className="font-semibold text-white">{ticket}</p>
        </div>
        <button
          onClick={handleRechargeClick}
          className="flex flex-col gap-2 justify-center border-2 border-orange-400 bg-black items-center"
        >
          <p className="font-semibold text-white">RECHARGE</p>
        </button>
        <Link
          className="flex flex-col gap-2 justify-center border-2 border-orange-400 bg-black text-center"
          href="/menu"
        >
          <div>
            <p className="font-semibold text-white">Menu</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Magicheader;

"use client";

import Image from "next/image";
import { useState } from "react";

export default function BookingPage() {
const [parentName, setParentName] = useState("");
const [childName, setChildName] = useState("");
const [mobile, setMobile] = useState("");
const [activity, setActivity] = useState("");
const [date, setDate] = useState("");
const [timeSlot, setTimeSlot] = useState("");
const [notes, setNotes] = useState("");

const handleBooking = () => {
  const message = `
🎟️ New Booking Request

👤 Parent Name: ${parentName}
🧒 Child Name: ${childName}
📱 Mobile Number: ${mobile}

🎮 Activity: ${activity}
📅 Date: ${date}
⏰ Time Slot: ${timeSlot}

📝 Special Requests:
${notes}
  `;

  const whatsappUrl = `https://wa.me/916360921458?text=${encodeURIComponent(
    message
  )}`;

  window.open(whatsappUrl, "_blank");
};
  return (
   <main className="min-h-screen bg-gradient-to-b from-amber-100 via-white to-sky-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">

          <Image
            src="/images/logo.png"
            alt="Sarojani Funland"
            width={500}
            height={250}
            className="mx-auto rounded-3xl shadow-2xl"
          />
<h1 className="text-5xl md:text-6xl font-extrabold">
  Book Your Visit
</h1>

          <p className="text-xl text-gray-600 mt-3">
            Fun • Adventure • Family Entertainment
          </p>
        </div>

        {/* Pricing Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold">🎠 Play Area</h3>
    <p className="text-gray-600 mt-2">Slides, Ball Pool & Indoor Fun</p>
    <p className="text-4xl font-black text-orange-500 mt-4">₹100</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold">🤸 Trampoline</h3>
    <p className="text-gray-600 mt-2">Jump, Bounce & Enjoy</p>
    <p className="text-4xl font-black text-green-500 mt-4">₹100</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold">🛵 Scooter Ride</h3>
    <p className="text-gray-600 mt-2">Safe Scooter Fun For Kids</p>
    <p className="text-4xl font-black text-pink-500 mt-4">₹100</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold">🚗 Small Electric Car</h3>
    <p className="text-gray-600 mt-2">Exciting Driving Experience</p>
    <p className="text-4xl font-black text-blue-500 mt-4">₹120</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold">🚙 Large Electric Car</h3>
    <p className="text-gray-600 mt-2">Bigger Ride, Bigger Fun</p>
    <p className="text-4xl font-black text-purple-500 mt-4">₹150</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold">🥽 VR / AR Games</h3>
    <p className="text-gray-600 mt-2">Immersive Virtual Adventures</p>
    <p className="text-4xl font-black text-indigo-500 mt-4">₹150</p>
  </div>

</div>

        
        {/* Booking Form */}

        <div className="bg-white rounded-[32px] shadow-[0_25px_60px_rgba(0,0,0,0.15)] p-8 md:p-10 border-2 border-yellow-200">

          <h2 className="text-4xl font-bold text-center mb-8">
            Reservation Form
          </h2>

          <div className="space-y-5">
        

  <input
  type="text"
  placeholder="Parent Name"
  value={parentName}
  onChange={(e) => setParentName(e.target.value)}
  className="w-full p-4 border rounded-xl"
/>
<input
  type="text"
  placeholder="Child Name"
  value={childName}
  onChange={(e) => setChildName(e.target.value)}
  className="w-full p-4 border rounded-xl"
/>

<input
  type="tel"
  placeholder="Mobile Number"
  value={mobile}
  onChange={(e) => setMobile(e.target.value)}
  className="w-full p-4 border rounded-xl"
/>
           <select
  value={activity}
  onChange={(e) => setActivity(e.target.value)}
  className="w-full p-4 border rounded-xl"
>
              <option>Select Activity</option>
              <option>Full Play Zone Package - ₹250</option>
              <option>Play Area - ₹100</option>
              <option>Trampoline - ₹100</option>
              <option>Scooter Ride - ₹100</option>
              <option>Small Electric Car - ₹120</option>
              <option>Large Electric Car - ₹150</option>
              <option>VR / AR Games - ₹150</option>
            </select>

            <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  className="w-full p-4 border rounded-xl"
/>

        <select
  value={timeSlot}
  onChange={(e) => setTimeSlot(e.target.value)}
  className="w-full p-4 border rounded-xl"
>
              <option>Select Time Slot</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
              <option>01:00 PM</option>
              <option>02:00 PM</option>
              <option>03:00 PM</option>
              <option>04:00 PM</option>
              <option>05:00 PM</option>
              <option>06:00 PM</option>
            </select>

            <textarea
  placeholder="Special Requests"
  rows={4}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  className="w-full p-4 border rounded-xl"
/>

            <label className="flex items-start gap-3 text-gray-700">
              <input type="checkbox" className="mt-1" />
              <span>
                I agree to follow all safety rules and understand
                that tickets are non-refundable.
              </span>
            </label>


<button
  type="button"
  onClick={handleBooking}
  className="
    w-full
    mt-10
    bg-yellow-500
    hover:bg-yellow-600
    text-black
    font-bold
    text-xl
    py-5
    rounded-2xl
    shadow-lg
    hover:shadow-2xl
    hover:-translate-y-1
    transition-all
    duration-300
    border-b-4
    border-yellow-700
  "
>
  🎟️ BOOK MY FUNLAND ADVENTURE
</button>
          </div>

        </div>

      </div>


    </main>
  );
}
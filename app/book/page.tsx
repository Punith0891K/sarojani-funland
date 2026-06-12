"use client";

import Image from "next/image";
import { useState } from "react";

import {
  User,
  Phone,
  Calendar,
  Clock,
  Gamepad2,
} from "lucide-react";

export default function BookingPage() {
const [parentName, setParentName] = useState("");
const [childName, setChildName] = useState("");
const [mobile, setMobile] = useState("");
const [activity, setActivity] = useState("");
const [date, setDate] = useState("");
const [timeSlot, setTimeSlot] = useState("");
const [notes, setNotes] = useState("");
const [showSuccess, setShowSuccess] = useState(false);


  const handleBooking = () => {
  if (!parentName.trim()) {
    alert("Please enter Parent Name");
    return;
  }

  if (!childName.trim()) {
    alert("Please enter Child Name");
    return;
  }

  if (!/^[0-9]{10}$/.test(mobile)) {
    alert("Please enter a valid 10-digit mobile number");
    return;
  }

  if (!activity || activity === "Select Activity") {
    alert("Please select an activity");
    return;
  }

  if (!date) {
    alert("Please select a date");
    return;
  }

  if (!timeSlot || timeSlot === "Select Time Slot") {
    alert("Please select a time slot");
    return;
  }

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
setShowSuccess(true);

setTimeout(() => {
  window.open(whatsappUrl, "_blank");
  setShowSuccess(false);
}, 2000);

};

return (
  <main className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-blue-50 py-10 px-4">

    {showSuccess && (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
        <div className="bg-white rounded-3xl p-8 text-center shadow-2xl max-w-md mx-4">
          <div className="text-6xl mb-4">🎉</div>

          <h3 className="text-3xl font-bold text-green-600 mb-2">
            Booking Ready!
          </h3>

          <p className="text-gray-600">
            Redirecting you to WhatsApp...
          </p>
        </div>
      </div>
    )}

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
<h1 className="text-4xl md:text-6xl font-extrabold text-gray-900">
  Book Your Visit
</h1>

          <p className="text-xl text-gray-600 mt-3">
            Fun • Adventure • Family Entertainment
          </p>
        </div>

        {/* Pricing Cards */}

        <div className="grid md:grid-cols-3 gap-6 mb-12">

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold text-gray-600">🎠 Play Area</h3>
    <p className="text-gray-600 mt-2">Slides, Ball Pool & Indoor Fun</p>
    <p className="text-4xl font-black text-orange-500 mt-4">₹100</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold text-gray-600">🤸 Trampoline</h3>
    <p className="text-gray-600 mt-2">Jump, Bounce & Enjoy</p>
    <p className="text-4xl font-black text-green-500 mt-4">₹100</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold text-gray-600">🛵 Scooter Ride</h3>
    <p className="text-gray-600 mt-2">Safe Scooter Fun For Kids</p>
    <p className="text-4xl font-black text-pink-500 mt-4">₹100</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold text-gray-600">🚗 Small Electric Car</h3>
    <p className="text-gray-600 mt-2">Exciting Driving Experience</p>
    <p className="text-4xl font-black text-blue-500 mt-4">₹120</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold text-gray-600">🚙 Large Electric Car</h3>
    <p className="text-gray-600 mt-2">Bigger Ride, Bigger Fun</p>
    <p className="text-4xl font-black text-purple-500 mt-4">₹150</p>
  </div>

  <div className="bg-white rounded-3xl p-6 shadow-xl hover:scale-105 transition">
    <h3 className="text-2xl font-bold text-gray-600">🥽 VR / AR Games</h3>
    <p className="text-gray-600 mt-2">Immersive Virtual Adventures</p>
    <p className="text-4xl font-black text-indigo-500 mt-4">₹150</p>
  </div>

</div>
<div className="max-w-5xl mx-auto mb-10">
  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

    <div className="bg-white rounded-2xl p-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center">
      <div className="text-3xl mb-2">⚡</div>
      <h3 className="font-bold text-gray-900">
        Instant Confirmation
      </h3>
    </div>

    <div className="bg-white rounded-2xl p-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center">
      <div className="text-3xl mb-2">🛡️</div>
      <h3 className="font-bold text-gray-900">
        Safe Environment
      </h3>
    </div>

    <div className="bg-white rounded-2xl p-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center">
      <div className="text-3xl mb-2">🎮</div>
      <h3 className="font-bold text-gray-900">
        Multiple Activities
      </h3>
    </div>

    <div className="bg-white rounded-2xl p-4 shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 text-center">
      <div className="text-3xl mb-2">👨‍👩‍👧</div>
      <h3 className="font-bold text-gray-900">
        Family Friendly
      </h3>
    </div>

  </div>
</div>
        
        {/* Booking Form */}

      <div
 className="
  max-w-3xl
  mx-auto
  bg-white/80
  backdrop-blur-xl
  rounded-[40px]
  border
  border-white/50
  shadow-[0_20px_60px_rgba(0,0,0,0.15)]
  p-8
  md:p-10
"
>
  <h2 className="text-4xl md:text-5xl font-black text-center text-slate-900">
  Reserve Your
  <br />
  Adventure
</h2>
          <div className="space-y-5">

   <div className="flex items-center justify-center gap-4 mb-8">
  <div className="w-20 h-1 bg-yellow-400 rounded-full" />
  <span className="text-3xl">⭐</span>
  <div className="w-20 h-1 bg-yellow-400 rounded-full" />
</div>
        
<div className="relative">
  <User
    size={24}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-500 z-10"
  />

  <input
    type="text"
    placeholder="Parent Name"
    value={parentName}
    onChange={(e) => setParentName(e.target.value)}
    className="
      w-full
      h-20
      pl-24
      pr-6
      text-xl
      border-2
      border-gray-200
      rounded-3xl
      bg-white
      text-gray-900
      placeholder:text-gray-500
      focus:outline-none
      focus:ring-4
      focus:ring-yellow-200
    "
  />
</div>
  
<div className="relative">
  <User
    size={24}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-yellow-500"
  />

  <input
    type="text"
    placeholder="Child Name"
    value={childName}
    onChange={(e) => setChildName(e.target.value)}
    className="
      w-full
      h-20
      pl-24
      pr-6
      text-xl
      border-2
      border-gray-200
      rounded-3xl
      bg-white
      text-gray-900
      placeholder:text-gray-500
      focus:outline-none
      focus:ring-4
      focus:ring-yellow-200
    "
  />
</div>

<div className="relative">
  <Phone
    size={24}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-green-500"
  />

  <input
    type="tel"
    placeholder="Mobile Number"
    value={mobile}
    onChange={(e) => setMobile(e.target.value)}
    className="
      w-full
      h-20
      pl-24
      pr-6
      text-xl
      border-2
      border-gray-200
      rounded-3xl
      bg-white
      text-gray-900
      placeholder:text-gray-500
      focus:outline-none
      focus:ring-4
      focus:ring-yellow-200
    "
  />
</div>

   <div className="relative">
  <Gamepad2
    size={24}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-purple-500 pointer-events-none"
  />

  <select
    value={activity}
    onChange={(e) => setActivity(e.target.value)}
    className="
      w-full
      h-20
      pl-24
      pr-6
      text-xl
      border-2
      border-gray-200
      rounded-3xl
      bg-white
      text-gray-900
      focus:outline-none
      focus:ring-4
      focus:ring-yellow-200
    "
  >
    <option value="">Select Activity</option>
    <option>Full Play Zone Package - ₹250</option>
    <option>Play Area - ₹100</option>
    <option>Trampoline - ₹100</option>
    <option>Scooter Ride - ₹100</option>
    <option>Small Electric Car - ₹120</option>
    <option>Large Electric Car - ₹150</option>
    <option>VR / AR Games - ₹150</option>
  </select>
</div>

    <div className="relative">
  <Calendar
    size={24}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-blue-500"
  />

  <input
    type="date"
    value={date}
    onChange={(e) => setDate(e.target.value)}
    className="
      w-full
      h-20
      pl-24
      pr-6
      text-xl
      border-2
      border-gray-200
      rounded-3xl
      bg-white
      text-gray-900
      focus:outline-none
      focus:ring-4
      focus:ring-yellow-200
    "
  />
</div>

<div className="relative">
  <Clock
    size={24}
    className="absolute left-5 top-1/2 -translate-y-1/2 text-red-500 pointer-events-none"
  />

  <select
    value={timeSlot}
    onChange={(e) => setTimeSlot(e.target.value)}
    className="
      w-full
      h-20
      pl-24
      pr-6
      text-xl
      border-2
      border-gray-200
      rounded-3xl
      bg-white
      text-gray-900
      focus:outline-none
      focus:ring-4
      focus:ring-yellow-200
    "
  >
    <option value="">Select Time Slot</option>
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
</div>

    <textarea
  placeholder="Special Requests(Optional)"
  rows={4}
  value={notes}
  onChange={(e) => setNotes(e.target.value)}
  className="
w-full
h-20
px-6
text-xl
border-2
border-gray-200
rounded-3xl
bg-white
text-gray-900
placeholder:text-gray-500
focus:outline-none
focus:ring-4
focus:ring-yellow-200
"
/>

            <label className="flex items-start gap-3 text-gray-700">
              <input type="checkbox" className="mt-1" />
              <span>
                I agree to follow all safety rules and understand
                that tickets are non-refundable.
              </span>
            </label>

<div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-3xl p-6">
  <h3 className="text-2xl font-bold mb-4 text-gray-800">
    🎟️ Booking Summary
  </h3>

  <div className="space-y-2 text-lg text-gray-800">
    <p><strong>Activity:</strong> {activity || "Not Selected"}</p>
    <p><strong>Date:</strong> {date || "Not Selected"}</p>
    <p><strong>Time:</strong> {timeSlot || "Not Selected"}</p>
  </div>
</div>

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

<div className="mt-6 text-center text-gray-600">
  <p>🔒 Your details are secure and never shared.</p>
  <p className="mt-2">📞 Need help? Call +91 63609 21458</p>
</div>
    </main>
  );
}
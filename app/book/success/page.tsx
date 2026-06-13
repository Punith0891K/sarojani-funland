import Link from "next/link";

export default async function BookingSuccess({
  searchParams,
}: {
  searchParams: Promise<{
    id?: string;
    activity?: string;
    date?: string;
    time?: string;
  }>;
}) {
  const params = await searchParams;

  const bookingId = params.id;
  const activity = params.activity;
  const date = params.date;
  const time = params.time;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 via-white to-green-50">
      <div
  className="
    bg-white
    max-w-2xl
    w-full
    rounded-[40px]
    shadow-2xl
    p-10
    border
    border-green-100
    text-center
  "
>

<div className="w-28 h-28 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
  <span className="text-6xl">✅</span>
</div>

<h1 className="text-6xl font-black text-green-600 mb-4">
  Booking Confirmed!
</h1>

<p className="text-xl text-gray-600">
  Thank you for choosing
</p>

<p className="text-3xl font-bold text-yellow-500 mb-6">
  Sarojani Funland
</p>

<p className="text-gray-500">
  Your reservation has been successfully received.
</p>

<div className="bg-green-50 rounded-3xl p-6 mt-8 text-left border border-green-100">

  <h3 className="text-2xl font-bold mb-4 text-gray-700">
    🎟 Booking Details
  </h3>

  <div className="space-y-3 text-lg text-gray-700">

   <p>
  <strong>Booking ID:</strong> SF-{bookingId}
</p>

<p>
  <strong>Activity:</strong> {activity}
</p>

<p>
  <strong>Date:</strong> {date}
</p>

<p>
  <strong>Time:</strong> {time}
</p>

<p>
  <strong>Status:</strong>
  <span className="text-green-600 font-bold">
    {" "}Confirmed
  </span>
</p>

<p>
  <strong>Venue:</strong> Sarojani Funland
</p>

  </div>

<div className="mt-6 bg-blue-50 border border-blue-200 rounded-3xl p-6">

  <h3 className="text-2xl font-bold mb-3 text-gray-700">
    📍 Visit Sarojani Funland
  </h3>

  <p className="text-gray-700 mb-4">
    Inside Hotel Continental Ground Floor, Mysuru
  </p>

  <a
    href="https://maps.app.goo.gl/D7EoLf8fCPaSfjGMA"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl font-bold transition-all"
  >
    🗺️ Open in Google Maps
  </a>

</div>

</div>

<div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-3xl p-5">

  <h4 className="font-bold text-lg mb-2 text-gray-700">
    ⭐ Important
  </h4>

  <p className="text-gray-700">
 Please arrive 10 minutes before your scheduled activity.
📍 Show your Booking ID at the reception desk.
  </p>

</div>

    <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">

  <Link
    href="/"
    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold transition-all"
  >
    🏠 Home
  </Link>

  <Link
    href="/book"
    className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-2xl font-bold transition-all"
  >
    🎟 Book Again
  </Link>

</div>

      </div>
    </main>
  );
}
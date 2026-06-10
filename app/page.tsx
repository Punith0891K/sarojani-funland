import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-white">

      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/70 backdrop-blur text-white">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="font-bold text-xl">Sarojani Funland</h1>

          <div className="hidden md:flex gap-6">
            <a href="#about">About</a>
            <a href="#gallery">Gallery</a>
            <a href="#pricing">Pricing</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative h-screen">
        <Image
          src="/images/20260604_220824.jpg"
          alt="Sarojani Funland"
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-6">
          <h1 className="text-6xl md:text-7xl font-bold">
            Sarojani Funland
          </h1>

          <p className="text-2xl mt-4">
            Where Fun & Happiness Come Alive
          </p>

          <p className="mt-4 text-lg">
            Play Zone • Trampoline • Electric Cars • Scooter Rides • VR Games
          </p>

         <a
      href="/book"
      className="mt-8 bg-yellow-400 text-black px-8 py-4 rounded-xl font-bold hover:bg-yellow-300 inline-block"
>
  Book Now
</a>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="max-w-6xl mx-auto px-6 py-20"
      >
        <h2 className="text-5xl font-bold mb-8">
          Welcome to Sarojani Funland
        </h2>

        <p className="text-lg leading-9 text-gray-700">
          Sarojani Funland is a family entertainment destination located
          inside Hotel Continental, Mysore. Designed for children and
          families, our indoor play area offers exciting activities
          including a dedicated play zone, trampoline fun, electric cars,
          scooter rides and immersive VR experiences.
        </p>
      </section>


     
 {/* Our Attractions */}
<section className="py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-4">
      Our Attractions
    </h2>

    <p className="text-center text-gray-600 mb-12">
      Fun-filled experiences for kids and families.
    </p>

    <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">

      {/* Play Area */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="/images/20260604_220537.jpg"
          alt="Play Area"
          className="w-full h-56 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2">🛝 Play Area</h3>
          <p className="text-gray-600">
            Slides, ball pool, swings and fun indoor activities.
          </p>
        </div>
      </div>

      {/* Trampoline */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="/images/20260302_203851.jpg"
          alt="Trampoline"
          className="w-full h-56 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2">🤸 Trampoline</h3>
          <p className="text-gray-600">
            Safe and exciting trampoline fun for energetic kids.
          </p>
        </div>
      </div>

      {/* Electric Cars */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="/images/20260604_220227.jpg"
          alt="Electric Cars"
          className="w-full h-56 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2">🚗 Electric Cars</h3>
          <p className="text-gray-600">
            Exciting electric car rides in a safe environment.
          </p>
        </div>
      </div>

      {/* Scooter */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="/images/20260610_175214.jpg"
          alt="Scooter Ride"
          className="w-full h-56 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2">🛵 Scooter Rides</h3>
          <p className="text-gray-600">
            Fun scooter rides designed especially for kids.
          </p>
        </div>
      </div>

      {/* VR Games */}
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-xl transition">
        <img
          src="/images/20260302_205538.jpg"
          alt="VR Games"
          className="w-full h-56 object-cover"
        />
        <div className="p-5">
          <h3 className="text-xl font-bold mb-2">🥽 VR Games</h3>
          <p className="text-gray-600">
            Immersive VR and AR gaming experiences for all ages.
          </p>
        </div>
      </div>

    </div>

  </div>
</section>
      {/* Gallery */}
      <section
        id="gallery"
        className="bg-gray-100 py-20"
      >
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-12">
            Explore The Fun
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="h-72 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/20260604_220537.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-72 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/20260604_220623.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-72 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/20260302_203851.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-72 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/20260604_220555.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-72 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/20260604_220719.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="h-72 overflow-hidden rounded-2xl shadow-lg">
              <img
                src="/images/20260604_220824.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-20"
      >
        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-12">
            Activities & Pricing
          </h2>

          <div className="grid md:grid-cols-3 gap-6">

            <div className="p-6 border rounded-2xl shadow">
              <h3 className="text-2xl font-bold">Full Play Zone Package</h3>
              <p>30 mins (+10 mins extendable)</p>
              <p className="text-4xl font-bold mt-4">₹250</p>
            </div>

            <div className="p-6 border rounded-2xl shadow">
              <h3 className="text-2xl font-bold">Play Zone</h3>
              <p>15 mins</p>
              <p className="text-4xl font-bold mt-4">₹100</p>
            </div>

            <div className="p-6 border rounded-2xl shadow">
              <h3 className="text-2xl font-bold">Trampoline</h3>
              <p>15 mins</p>
              <p className="text-4xl font-bold mt-4">₹100</p>
            </div>

            <div className="p-6 border rounded-2xl shadow">
              <h3 className="text-2xl font-bold">Scooter Ride</h3>
              <p>10 mins</p>
              <p className="text-4xl font-bold mt-4">₹100</p>
            </div>

            <div className="p-6 border rounded-2xl shadow">
              <h3 className="text-2xl font-bold">Small Electric Car</h3>
              <p>2 Rounds</p>
              <p className="text-4xl font-bold mt-4">₹120</p>
            </div>

            <div className="p-6 border rounded-2xl shadow">
              <h3 className="text-2xl font-bold">Large Electric Car</h3>
              <p>2 Rounds</p>
              <p className="text-4xl font-bold mt-4">₹150</p>
            </div>

          </div>
        </div>
      </section>

      {/* Contact */}
    {/* Contact Section */}
<section
  id="contact"
  className="bg-black text-white py-20"
>
  <div className="max-w-6xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-12">
      Contact Us
    </h2>

    <div className="grid md:grid-cols-2 gap-8">

      {/* Location Card */}
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">

        <h3 className="text-2xl font-bold mb-6">
          📍 Our Location
        </h3>

        <p className="text-gray-300 leading-8">
          Sarojani Funland <br />
          Opposite Taluk Office <br />
          Near Sub-Urban Bus Stand <br />
          Inside Hotel Continental Ground Floor <br />
          Residency Road, Nazarbad <br />
          Mysuru - 570010 <br />
          Karnataka, India
        </p>

        <a
          href="https://maps.app.goo.gl/D7EoLf8fCPaSfjGMA"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-6 bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition"
        >
          📍 Open in Google Maps
        </a>

      </div>

      {/* Contact Card */}
      <div className="bg-gray-900 p-8 rounded-2xl shadow-lg">

        <h3 className="text-2xl font-bold mb-6">
          📞 Get In Touch
        </h3>

        <div className="space-y-5">

          <div>
            <p className="text-gray-400">Phone</p>
            <a
              href="tel:6360921458"
              className="text-lg hover:text-green-400"
            >
              +91 63609 21458
            </a>
          </div>

          <div>
            <p className="text-gray-400">Email</p>
            <a
              href="mailto:sarojanifunland@gmail.com"
              className="text-lg hover:text-blue-400"
            >
              sarojanifunland@gmail.com
            </a>
          </div>

          <div>
            <p className="text-gray-400">Instagram</p>
            <a
              href="https://instagram.com/sarojani_funland"
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg hover:text-pink-400"
            >
              @sarojani_funland
            </a>
          </div>

        </div>

      </div>

    </div>

  </div>
</section>
<a
  href="https://wa.me/916360921458"
  target="_blank"
  className="fixed bottom-6 right-6 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg z-50"
>
  WhatsApp Us
</a>

    </main>
  );
}
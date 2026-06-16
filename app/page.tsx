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
        <h2 className="text-5xl font-bold mb-8 text-gray-900">
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

{/* Why Choose Us */}
<section className="pt-8 pb-16 px-6 bg-gradient-to-b from-white to-yellow-50">
  <div className="max-w-6xl mx-auto">

   <div className="text-center mb-12">

  <div className="inline-block bg-gradient-to-r from-yellow-700 to-amber-500 text-black px-10 py-6 rounded-full font-bold text-lg shadow-lg mb-8">
    ⭐⭐⭐⭐⭐ Mysore's Family Entertainment Center
  </div>

  <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight max-w-5xl mx-auto">
    Kids Play Zone & Family Entertainment in Mysuru
  </h2>

  <p className="mt-8 text-xl md:text-2xl text-gray-600 leading-relaxed max-w-4xl mx-auto">
    Sarojani Funland is Mysore's destination for indoor play, trampolines,
    electric car rides, scooter adventures and immersive VR gaming experiences,
    creating unforgettable memories for children and families.
  </p>

</div>

    <div className="grid md:grid-cols-3 gap-8">

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center text-gray-900">
        <div className="text-5xl mb-4">🎠</div>
        <h3 className="text-2xl font-bold mb-3">
  Indoor Play Zone
</h3>

<p className="text-gray-600">
  A vibrant indoor play area in Mysore featuring slides, soft play
  attractions, and interactive activities designed for children of all ages.
</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center text-gray-900">
        <div className="text-5xl mb-4">🤸</div>
        <h3 className="text-2xl font-bold mb-3">
  Trampoline & Fun Rides
</h3>

<p className="text-gray-600">
  Enjoy exciting trampoline sessions, scooter rides, and electric car
  adventures in a safe and family-friendly environment.
</p>
      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8 text-center text-gray-900">
        <div className="text-5xl mb-4">🥽</div>
        <h3 className="text-2xl font-bold mb-3">
  VR & Gaming Experiences
</h3>

<p className="text-gray-600">
  Experience the future of entertainment with immersive VR games and
  interactive virtual adventures available exclusively at Sarojani Funland.
</p>
      </div>

    </div>
  </div>

  <div className="text-center mb-12">
 

  <p className="mt-6 text-xl text-gray-600 max-w-4xl mx-auto leading-9">
    Sarojani Funland is one of Mysore's most exciting destinations for
    children and families, offering a modern indoor play zone, trampoline
    fun, electric car rides, scooter rides, and immersive VR gaming
    experiences. Located in Nazarbad, Mysore, we provide a safe, engaging,
    and memorable environment where kids can play, explore, and create
    unforgettable memories.
  </p>
</div>
</section>

     
 {/* Our Attractions */}
<section className="py-20 bg-gray-100">
  <div className="max-w-7xl mx-auto px-6">

    <h2 className="text-5xl font-bold text-center mb-4 text-gray-900">
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
          <h3 className="text-xl font-bold mb-2 text-gray-900">🛝 Play Area</h3>
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
          <h3 className="text-xl font-bold mb-2 text-gray-900">🤸 Trampoline</h3>
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
          <h3 className="text-xl font-bold mb-2 text-gray-900">🚗 Electric Cars</h3>
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
          <h3 className="text-xl font-bold mb-2 text-gray-900">🛵 Scooter Rides</h3>
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
          <h3 className="text-xl font-bold mb-2 text-gray-900">🥽 VR Games</h3>
          <p className="text-gray-600">
            Immersive VR and AR gaming experiences for all ages.
          </p>
        </div>
      </div>

    </div>

  </div>
  
<section
  id="gallery"
  className="py-24 px-6 bg-gradient-to-b from-white to-yellow-50"
></section>
        <div className="max-w-7xl mx-auto px-6">
<div className="text-center mb-16">
  <h2 className="text-4xl md:text-5xl font-black text-gray-900">
    Fun Moments Gallery
  </h2>

  <div className="flex items-center justify-center gap-4 mt-5">
<div className="flex items-center justify-center gap-4 mt-5">
  <div className="w-20 h-1 bg-yellow-400 rounded-full"></div>
  <span className="text-4xl">📸</span>
  <div className="w-20 h-1 bg-yellow-400 rounded-full"></div>
</div>
  </div>

  <p className="text-xl text-gray-600 mt-6">
    Explore the excitement and adventure waiting at Sarojani Funland
  </p>
</div>

<div className="grid md:grid-cols-3 gap-8">

  {/* Play Zone */}
  <div className="relative group h-72 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
    <img
      src="/images/20260604_220537.jpg"
      alt="Kids Play Zone Mysuru"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

    <div className="absolute bottom-4 left-4">
      <h3 className="text-white text-xl font-bold">
        🎠 Play Zone Adventure
      </h3>
    </div>
  </div>

  {/* Indoor Play */}
  <div className="relative group h-72 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
    <img
      src="/images/20260604_220623.jpg"
      alt="Indoor Play Area Mysuru"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

    <div className="absolute bottom-4 left-4">
      <h3 className="text-white text-xl font-bold">
        🧸 Indoor Play Area
      </h3>
    </div>
  </div>

  {/* Trampoline */}
  <div className="relative group h-72 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
    <img
      src="/images/20260302_203851.jpg"
      alt="Trampoline Park Mysuru"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

    <div className="absolute bottom-4 left-4">
      <h3 className="text-white text-xl font-bold">
        🤸 Trampoline Fun
      </h3>
    </div>
  </div>

  {/* Electric Cars */}
  <div className="relative group h-72 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
    <img
      src="/images/20260604_220555.jpg"
      alt="Electric Car Ride Mysuru"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

    <div className="absolute bottom-4 left-4">
      <h3 className="text-white text-xl font-bold">
        🚗 Electric Car Ride
      </h3>
    </div>
  </div>

  {/* Family Fun */}
  <div className="relative group h-72 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
    <img
      src="/images/20260604_220719.jpg"
      alt="Family Fun Mysuru"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

    <div className="absolute bottom-4 left-4">
      <h3 className="text-white text-xl font-bold">
        ⭐ Family Fun Moments
      </h3>
    </div>
  </div>

  {/* Funland View */}
  <div className="relative group h-72 overflow-hidden rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300">
    <img
      src="/images/20260604_220824.jpg"
      alt="Sarojani Funland Mysuru"
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
    />

    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>

    <div className="absolute bottom-4 left-4">
      <h3 className="text-white text-xl font-bold">
        🎉 Sarojani Funland
      </h3>
    </div>
  </div>
</div>
</div>
     
      </section>

      {/* Pricing */}
      <section
        id="pricing"
        className="py-20"
      >
       <section

  id="pricing"
  className="bg-gradient-to-b from-white to-yellow-50 rounded-[40px] p-10"
>
  <div className="max-w-7xl mx-auto">

    <h2 className="text-5xl md:text-6xl font-black text-center text-gray-900">
      🎡 Activities & Pricing
    </h2>

    <div className="flex items-center justify-center gap-6 mt-6 mb-12">
      <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
      <span className="text-4xl">⭐</span>
      <div className="h-1 w-24 bg-yellow-400 rounded-full"></div>
    </div>

    <p className="text-center text-xl text-gray-600 mb-16">
      Choose your adventure and create unforgettable memories
    </p>

  <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

      {/* Full Package */}
      <div className="bg-white border-2 border-yellow-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">🎠</span>
          <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-bold">
            30 mins
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
  <h3 className="text-2xl font-bold text-gray-900">
    Full Play Zone Package
  </h3>

  <span className="bg-green-500 text-white text-xs px-3 py-1 rounded-full font-bold">
    MOST POPULAR
  </span>
</div>

        <p className="text-gray-600 mb-6">
          +10 mins extendable
        </p>

        <p className="text-5xl font-black text-yellow-600">
          ₹250
        </p>
      </div>

      {/* Play Zone */}
      <div className="bg-white border-2 border-yellow-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">🧸</span>
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
            15 mins
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Play Zone
        </h3>

        <p className="text-5xl font-black text-blue-600">
          ₹100
        </p>
      </div>

      {/* Trampoline */}
      <div className="bg-white border-2 border-yellow-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">🤸</span>
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
            15 mins
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Trampoline
        </h3>

        <p className="text-5xl font-black text-green-600">
          ₹100
        </p>
      </div>

      {/* Scooter */}
      <div className="bg-white border-2 border-yellow-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">🛴</span>
          <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
            10 mins
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Scooter Ride
        </h3>

        <p className="text-5xl font-black text-purple-600">
          ₹100
        </p>
      </div>

      {/* Small Car */}
      <div className="bg-white border-2 border-yellow-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">🚗</span>
          <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
            2 Rounds
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Small Electric Car
        </h3>

        <p className="text-5xl font-black text-red-600">
          ₹120
        </p>
      </div>

      {/* Large Car */}
      <div className="bg-white border-2 border-yellow-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
        <div className="flex justify-between items-center mb-4">
          <span className="text-5xl">🏎️</span>
          <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm font-bold">
            2 Rounds
          </span>
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          Large Electric Car
        </h3>

        <p className="text-5xl font-black text-orange-600">
          ₹150
        </p>
      </div>

      <div className="bg-white border-2 border-yellow-200 rounded-3xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
  <div className="flex justify-between items-center mb-4">
    <span className="text-5xl">🎮</span>

    <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-bold">
      15 mins
    </span>
  </div>

  <h3 className="text-2xl font-bold text-gray-900 mb-6">
    VR / AR Games
  </h3>

  <p className="text-5xl font-black text-indigo-600">
    ₹150
  </p>
</div>

    </div>
  </div>
</section>
          
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

{/* WhatsApp */}
<a
  href="https://wa.me/916360921458"
  target="_blank"
  className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-full shadow-lg z-[9999] transition-all"
>
  WhatsApp Us
</a>


    </main>
  );
}
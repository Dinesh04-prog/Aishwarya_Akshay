import Door from "./components/Door";
import { useState, useEffect } from "react";
import { Interactive3DModel } from "./components/Interactive3DModel";
import logo from "@/assets/logo.png";
import { Heart, MapPin, Calendar, Clock, Phone, Mail, Users, UtensilsCrossed } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import familyPhoto from "@/assets/19758cd13caa79ed5da96db2e4f1e6d429476895.png";

type TabType = "home" | "details" | "venue" | "schedule" | "gallery";

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>("home");
  const [showDoor, setShowDoor] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDoor(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, [showDoor]);

  const tabs = [
    { id: "home" as TabType, label: "Home", icon: Heart },
    { id: "details" as TabType, label: "Wedding Details", icon: Calendar },
    { id: "venue" as TabType, label: "Venue", icon: MapPin },
    { id: "schedule" as TabType, label: "Schedule", icon: Clock },
    { id: "gallery" as TabType, label: "Gallery", icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-orange-50 overflow-hidden">
      {showDoor && <Door />}
      <div className={`min-h-screen ${!showDoor ? 'animate-fade-in' : 'opacity-0'}`}>
        {/* Navigation Tabs */}
        <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-md border-b-2 border-rose-200">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="h-14 w-16 flex items-center justify-center">
                  <img src={logo} alt="Logo" className="h-full w-full object-contain" />
                </div>
                <div>
                  <h1
                    className="text-2xl text-rose-800"
                    style={{ fontFamily: "'Monotype Corsiva'" }}
                  >
                    Aishwarya & Akshay
                  </h1>
                  <p className="text-xs text-rose-600">February 26, 2026</p>
                </div>
              </div>

              <div className="hidden md:flex gap-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`relative px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        activeTab === tab.id
                          ? "text-white"
                          : "text-rose-700 hover:bg-rose-50"
                      }`}
                    >
                      {activeTab === tab.id && (
                        <motion.div
                          layoutId="activeTab"
                          className="absolute inset-0 bg-gradient-to-r from-rose-500 to-orange-500 rounded-lg"
                          transition={{ type: "spring", duration: 0.5 }}
                        />
                      )}
                      <Icon className="w-4 h-4 relative z-10" />
                      <span className="relative z-10 text-sm">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* Mobile Menu */}
              <div className="md:hidden">
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value as TabType)}
                  className="px-4 py-2 rounded-lg bg-rose-500 text-white border-none outline-none"
                >
                  {tabs.map((tab) => (
                    <option key={tab.id} value={tab.id}>
                      {tab.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </nav>

        {/* Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-88px)]"
          >
            {activeTab === "home" && <HomeTab />}
            {activeTab === "details" && <DetailsTab />}
            {activeTab === "venue" && <VenueTab />}
            {activeTab === "schedule" && <ScheduleTab />}
            {activeTab === "gallery" && <GalleryTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function HomeTab() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", duration: 0.8 }}
            className="inline-block mb-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className="h-60 w-50 flex items-center justify-center">
              <img src={logo} alt="ganesh" className="h-full w-full object-contain drop-shadow-lg" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            <p className="text-rose-700 text-lg italic">
              || Shri Gajanana Prasanna ||
            </p>
            <p className="text-rose-700 text-lg italic">
              || Shri Markandeya Prasanna ||
            </p>
            <div className="my-6">
              <p className="text-gray-700 text-lg italic max-w-2xl mx-auto">
                Destiny brought them together,
                <br />
                and now Love will seal their bond... Forever
              </p>
            </div>
          </motion.div>
        </div>

        {/* 3D Model */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <Interactive3DModel />
          <p className="text-center text-sm text-rose-600 mt-4 italic">
            Move your cursor over the photo to see the 3D effect
          </p>
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border-4 border-rose-200"
        >
          <div className="text-center space-y-6">
            <div>
              <p className="text-gray-700 mb-2">
                Sou. Jyoti & Shri. Rajendra Chandrayya Battul
              </p>
              <p className="text-gray-600 text-sm mb-4">
                desire the sweet fragrance of your loving presence
                <br />
                at the auspicious occasion of wedding Ceremony
                <br />
                to shower your blessings of their loving daughter
              </p>
              <h2
                className="text-6xl md:text-7xl text-rose-700 my-4"
                style={{ fontFamily: "'Monotype Corsiva', cursive" }}
              >
                Aishwarya
              </h2>
            </div>

            <div className="flex items-center justify-center gap-4 my-6">
              <div className="h-px bg-rose-300 w-20"></div>
              <p className="text-2xl text-gray-600" style={{ fontFamily: "'Playfair Display', serif" }}>
                Weds
              </p>
              <div className="h-px bg-rose-300 w-20"></div>
            </div>

            <div>
              <h2
                className="text-6xl md:text-7xl text-rose-700 my-4"
                style={{ fontFamily: "'Monotype Corsiva', cursive" }}
              >
                Akshay
              </h2>
              <p className="text-gray-600 text-sm mt-4">
                (S/O. Sou. Vanita & Shri. Shriniwas Mallappa Piske)
              </p>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-rose-200">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Calendar className="w-6 h-6 text-rose-600" />
                <p className="text-xl text-gray-800">
                  On Thursday 26th February 2026
                </p>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Clock className="w-6 h-6 text-rose-600" />
                <p className="text-xl text-gray-800">
                  at 11.56 a.m.
                </p>
              </div>
            </div>

            <div className="mt-6 p-6 bg-gradient-to-r from-rose-100 to-orange-100 rounded-2xl">
              <p className="text-sm text-gray-600 mb-2">~ Sharing the Joy ~</p>
              <p className="text-lg text-gray-800" style={{ fontFamily: "'Playfair Display', serif" }}>
                Battul Family
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function DetailsTab() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl text-rose-700 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Wedding Details
          </h2>
          <p className="text-gray-600 text-lg">
            All the important information about our special day
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bride's Details */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-rose-200"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-400 to-pink-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <h3
                className="text-4xl text-rose-700 mb-2"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                The Bride
              </h3>
              <h4
                className="text-3xl text-rose-800 mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Aishwarya
              </h4>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="bg-rose-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Daughter of</p>
                <p className="text-base">Sou. Jyoti Battul</p>
                <p className="text-base">&</p>
                <p className="text-base">Shri. Rajendra Chandrayya Battul</p>
              </div>
            </div>
          </motion.div>

          {/* Groom's Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-3xl p-8 shadow-xl border-2 border-orange-200"
          >
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-amber-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <h3
                className="text-4xl text-orange-700 mb-2"
                style={{ fontFamily: "'Great Vibes', cursive" }}
              >
                The Groom
              </h3>
              <h4
                className="text-3xl text-orange-800 mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Akshay
              </h4>
            </div>
            <div className="space-y-3 text-gray-700">
              <div className="bg-orange-50 p-4 rounded-xl">
                <p className="text-sm text-gray-600 mb-1">Son of</p>
                <p className="text-base">Sou. Vanita Piske</p>
                <p className="text-base">&</p>
                <p className="text-base">Shri. Shriniwas Mallappa Piske</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Date & Time */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-8 md:p-12 text-white shadow-2xl"
        >
          <div className="text-center space-y-6">
            <h3
              className="text-4xl mb-6"
              style={{ fontFamily: "'Great Vibes', cursive" }}
            >
              Save the Date
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <Calendar className="w-12 h-12 mx-auto mb-4" />
                <p className="text-sm opacity-90 mb-2">Wedding Date</p>
                <p className="text-2xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Thursday
                </p>
                <p className="text-3xl">26th February 2026</p>
              </div>
              <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                <Clock className="w-12 h-12 mx-auto mb-4" />
                <p className="text-sm opacity-90 mb-2">Auspicious Time</p>
                <p className="text-4xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  11:56 AM
                </p>
                <p className="text-sm opacity-90 mt-2">Muhurat Time</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function VenueTab() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl text-rose-700 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Venue Details
          </h2>
          <p className="text-gray-600 text-lg">
            Where our beautiful journey begins
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-rose-200"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Venue Information */}
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-rose-600" />
                </div>
                <div>
                  <h3
                    className="text-2xl text-rose-700 mb-3"
                    style={{ fontFamily: "'Playfair Display', serif" }}
                  >
                    Dussa Events (Garden)
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p>Plot No. D-45/2/1</p>
                    <p>Near MIDC</p>
                    <p>Bhadravati Shopping Center</p>
                    <p>Laxminarayan Talkies</p>
                    <p>In front of the lane, Solapur</p>
                  </div>
                </div>
              </div>

              <div className="bg-rose-50 rounded-2xl p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-rose-600" />
                  <div>
                    <p className="text-sm text-gray-600">Contact</p>
                    <p className="text-gray-800">+91 7350614455</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-rose-600" />
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-gray-800">rajendrabattul@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-rose-500 to-orange-500 rounded-2xl p-6 text-white text-center">
                <UtensilsCrossed className="w-12 h-12 mx-auto mb-3" />
                <p className="text-xl" style={{ fontFamily: "'Playfair Display', serif" }}>
                  Followed By Lunch
                </p>
                <p className="text-sm opacity-90 mt-2">
                  Join us for a delicious traditional meal
                </p>
              </div>

              <a
                href="https://www.google.com/maps/search/Dussa+Events+Solapur"
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center px-6 py-4 bg-rose-600 text-white rounded-full hover:bg-rose-700 transition-colors shadow-lg"
              >
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>Get Directions</span>
                </div>
              </a>
            </div>

            {/* Map */}
            <div className="h-[500px] rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60901.15329894373!2d75.87288199999999!3d17.6599!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc5db0d070a5f0f%3A0x5e5e9e5e9e5e9e5e!2sSolapur%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Wedding Venue Location"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ScheduleTab() {
  const schedule = [
    {
      time: "10:00 AM",
      event: "Prathanam & Ganesh Pooja",
      description: "Welcome drinks and refreshments",
      icon: Users,
      color: "from-rose-400 to-pink-500",
    },
    {
      time: "11:56 AM",
      event: "Wedding Ceremony",
      description: "The auspicious muhurat - Sacred wedding rituals",
      icon: Heart,
      color: "from-orange-400 to-amber-500",
    },
    {
      time: "1:30 PM",
      event: "Lunch",
      description: "Traditional vegetarian feast",
      icon: UtensilsCrossed,
      color: "from-rose-500 to-orange-500",
    },
    {
      time: "3:00 PM",
      event: "Blessings & Photos",
      description: "Family photos and blessings ceremony",
      icon: Users,
      color: "from-pink-400 to-rose-500",
    },
  ];

  return (
    <div className="py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl text-rose-700 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Event Schedule
          </h2>
          <p className="text-gray-600 text-lg">
            Timeline of celebrations for the day
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-rose-300 via-orange-300 to-rose-300 hidden md:block" />

          <div className="space-y-8">
            {schedule.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="relative"
                >
                  <div className="flex gap-6 items-start">
                    {/* Timeline dot */}
                    <div className="hidden md:block relative z-10">
                      <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-xl border-2 border-rose-100">
                      <div className="flex items-start justify-between gap-4 flex-wrap">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <div className="md:hidden">
                              <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${item.color} flex items-center justify-center`}>
                                <Icon className="w-5 h-5 text-white" />
                              </div>
                            </div>
                            <h3
                              className="text-2xl text-gray-800"
                              style={{ fontFamily: "'Playfair Display', serif" }}
                            >
                              {item.event}
                            </h3>
                          </div>
                          <p className="text-gray-600">{item.description}</p>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 rounded-full">
                          <Clock className="w-4 h-4 text-rose-600" />
                          <span className="text-rose-700">{item.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12 bg-gradient-to-br from-rose-100 to-orange-100 rounded-3xl p-8 text-center"
        >
          <p className="text-gray-700 text-lg mb-4">
            <span className="text-2xl" style={{ fontFamily: "'Great Vibes', cursive" }}>
              Traditional Dress Code
            </span>
          </p>
          <p className="text-gray-600">
            We would be delighted if you could join us in traditional Indian attire to celebrate this auspicious occasion
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function GalleryTab() {
  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2
            className="text-5xl md:text-6xl text-rose-700 mb-4"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Our Families
          </h2>

        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl p-4 shadow-2xl border-2 border-rose-200"
        >
          <img
            src={familyPhoto}
            alt="Family"
            className="w-full rounded-2xl"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center bg-gradient-to-br from-rose-500 to-orange-500 rounded-3xl p-12 text-white shadow-2xl"
        >
          <Heart className="w-16 h-16 mx-auto mb-6 fill-white" />
          <h3
            className="text-4xl mb-6"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            Your Presence is Our Greatest Gift
          </h3>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            We request the honor of your presence as we embark on this beautiful journey together. Your blessings mean the world to us.
          </p>
          <div className="space-y-2">
            <p
              className="text-2xl"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              ~ Sharing the Joy ~
            </p>
            <p className="text-xl">Battul Family</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
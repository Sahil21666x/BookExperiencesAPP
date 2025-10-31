import React, { useState } from 'react';
import { ArrowLeft} from 'lucide-react';

// Types
interface Experience {
  id: number;
  title: string;
  location: string;
  price: number;
  image: string;
  description: string;
}

interface BookingDetails {
  experience: Experience | null;
  date: string;
  time: string;
  quantity: number;
}

// Mock data
const experiences: Experience[] = [
  {
    id: 1,
    title: 'Kayaking',
    location: 'Udupi',
    price: 999,
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  },
  {
    id: 2,
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    price: 899,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  },
  {
    id: 3,
    title: 'Coffee Trail',
    location: 'Coorg',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  },
  {
    id: 4,
    title: 'Kayaking',
    location: 'Udupi, Karnataka',
    price: 999,
    image: 'https://images.unsplash.com/photo-1502933691298-84fc14542831?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  },
  {
    id: 5,
    title: 'Nandi Hills Sunrise',
    location: 'Bangalore',
    price: 899,
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  },
  {
    id: 6,
    title: 'Boat Cruise',
    location: 'Sunderban',
    price: 999,
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  },
  {
    id: 7,
    title: 'Bunjee Jumping',
    location: 'Manali',
    price: 999,
    image: 'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  },
  {
    id: 8,
    title: 'Coffee Trail',
    location: 'Coorg',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1511576661531-b34d7da5d0bb?w=500',
    description: 'Curated small-group experience. Certified guide. Safety first with gear included.'
  }
];

const TestApp: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'details' | 'checkout' | 'confirmation'>('home');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [booking, setBooking] = useState<BookingDetails>({
    experience: null,
    date: 'Oct 22',
    time: '07:00 am',
    quantity: 1
  });
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    promoCode: '',
    agreeTerms: false
  });
  const [confirmationId, setConfirmationId] = useState('');

  // Navbar Component
  const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="bg-black rounded-full w-10 h-10 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-gray-900">highway</span>
              <span className="text-sm font-semibold text-gray-900">delite</span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Kayak"
              className="w-64 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors text-sm"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

  // Home Screen
  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {experiences.map((exp) => (
            <div key={exp.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
              <img src={exp.image} alt={exp.title} className="w-full h-48 object-cover" />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">{exp.location}</span>
                </div>
                <p className="text-sm text-gray-600 mb-4">{exp.description}</p>
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs text-gray-500">From </span>
                    <span className="font-semibold text-gray-900">₹{exp.price}</span>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedExperience(exp);
                      setBooking({ ...booking, experience: exp });
                      setCurrentScreen('details');
                    }}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-lg transition-colors"
                  >
                    View Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Details Screen
  const DetailsScreen = () => {
    if (!selectedExperience) return null;

    const subtotal = selectedExperience.price * booking.quantity;
    const taxes = 59;
    const total = subtotal + taxes;

    const dates = ['Oct 22', 'Oct 23', 'Oct 24', 'Oct 25', 'Oct 26'];
    const times = [
      { time: '07:00 am', left: 4 },
      { time: '9:00 am', left: 2 },
      { time: '11:00 am', left: 5 },
      { time: '1:00 pm', soldOut: true }
    ];

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center space-x-2 text-gray-700 mb-6 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Details</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <img src={selectedExperience.image} alt={selectedExperience.title} className="w-full h-96 object-cover rounded-xl" />
              
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{selectedExperience.title}</h1>
                <p className="text-gray-600 mb-6">{selectedExperience.description} Helmet and Life jackets along with an expert will accompany in kayaking.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Choose date</h2>
                <div className="flex space-x-3">
                  {dates.map((date) => (
                    <button
                      key={date}
                      onClick={() => setBooking({ ...booking, date })}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        booking.date === date
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {date}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Choose time</h2>
                <div className="flex space-x-3">
                  {times.map((timeSlot, idx) => (
                    <button
                      key={idx}
                      onClick={() => !timeSlot.soldOut && setBooking({ ...booking, time: timeSlot.time })}
                      disabled={timeSlot.soldOut}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors relative ${
                        timeSlot.soldOut
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : booking.time === timeSlot.time
                          ? 'bg-yellow-400 text-gray-900'
                          : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      {timeSlot.time}
                      {!timeSlot.soldOut && timeSlot.left && (
                        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded">
                          {timeSlot.left} left
                        </span>
                      )}
                      {timeSlot.soldOut && <span className="text-xs block">Sold out</span>}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-600">Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-6 border-2 border-green-500 sticky top-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Starts at</span>
                    <span className="text-xl font-semibold">₹{selectedExperience.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setBooking({ ...booking, quantity: Math.max(1, booking.quantity - 1) })}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        -
                      </button>
                      <span className="font-semibold">{booking.quantity}</span>
                      <button
                        onClick={() => setBooking({ ...booking, quantity: booking.quantity + 1 })}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-semibold">₹{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Taxes</span>
                    <span className="font-semibold">₹{taxes}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold flex items-center">
                        Total
                      </span>
                      <span className="text-xl font-bold">₹{total}</span>
                    </div>
                    <button
                      onClick={() => setCurrentScreen('checkout')}
                      className="w-full py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors"
                    >
                      Confirm
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Checkout Screen
  const CheckoutScreen = () => {
    if (!selectedExperience) return null;

    const subtotal = selectedExperience.price * booking.quantity;
    const taxes = 59;
    const total = subtotal + taxes;

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setCurrentScreen('details')}
            className="flex items-center space-x-2 text-gray-700 mb-6 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Checkout</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Full name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-600 mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                    />
                  </div>
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Promo code"
                    value={formData.promoCode}
                    onChange={(e) => setFormData({ ...formData, promoCode: e.target.value })}
                    className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  />
                  <button className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors">
                    Apply
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeTerms}
                    onChange={(e) => setFormData({ ...formData, agreeTerms: e.target.checked })}
                    className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 rounded"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and safety policy
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 rounded-xl p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Experience</span>
                  <span className="font-semibold">{selectedExperience.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-semibold">2025-10-22</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Time</span>
                  <span className="font-semibold">{booking.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Qty</span>
                  <span className="font-semibold">{booking.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-semibold">₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Taxes</span>
                  <span className="font-semibold">₹{taxes}</span>
                </div>
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold">₹{total}</span>
                  </div>
                  <button
                    onClick={() => {
                      setConfirmationId('HUF56&SO');
                      setCurrentScreen('confirmation');
                    }}
                    className="w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors"
                  >
                    Pay and Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Confirmation Screen
  const ConfirmationScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Booking Confirmed</h1>
        <p className="text-gray-600 mb-8">Ref ID: {confirmationId}</p>
        <button
          onClick={() => {
            setCurrentScreen('home');
            setSelectedExperience(null);
            setBooking({
              experience: null,
              date: 'Oct 22',
              time: '07:00 am',
              quantity: 1
            });
            setFormData({
              fullName: '',
              email: '',
              promoCode: '',
              agreeTerms: false
            });
          }}
          className="px-8 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  // Render current screen
  return (
    <>
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'details' && <DetailsScreen />}
      {currentScreen === 'checkout' && <CheckoutScreen />}
      {currentScreen === 'confirmation' && <ConfirmationScreen />}
    </>
  );
};

export default TestApp;
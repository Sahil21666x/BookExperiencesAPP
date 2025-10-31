import { useState, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Menu, X, Search } from 'lucide-react';
import { experiencesAPI, bookingsAPI, promoAPI } from './api';

interface Experience {
  id: number;
  title: string;
  location: string;
  price: string;
  imageUrl: string;
  description: string;
}

interface Slot {
  id: number;
  experienceId: number;
  date: string;
  time: string;
  capacity: number;
  booked: number;
}

interface ExperienceWithSlots extends Experience {
  slots: Slot[];
}

interface BookingDetails {
  experience: Experience | null;
  date: string;
  time: string;
  quantity: number;
  slotId: number | null;
}

interface FormData {
  fullName: string;
  email: string;
  promoCode: string;
  agreeTerms: boolean;
}

// Move Navbar outside to prevent re-renders
const Navbar = ({ searchTerm, setSearchTerm }: { searchTerm: string; setSearchTerm: (term: string) => void }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  const handleSearch = () => {
    console.log('Searching for:', searchTerm);
    if (window.innerWidth < 768) {
      setShowMobileSearch(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch(!showMobileSearch);
    if (!showMobileSearch) {
      // Focus search input when opening mobile search
      setTimeout(() => {
        const searchInput = document.getElementById('mobile-search-input');
        if (searchInput) {
          (searchInput as HTMLInputElement).focus();
        }
      }, 100);
    }
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Navbar */}
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

          {/* Desktop Search */}
          <div className="hidden md:flex items-center space-x-2">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Search experiences..."
              className="w-64 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
            />
            <button
              onClick={handleSearch}
              className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors text-sm"
            >
              Search
            </button>
          </div>

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center space-x-2">
            {/* Mobile Search Button */}
            <button
              onClick={toggleMobileSearch}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
            
            {/* Hamburger Menu */}
            <button
              onClick={toggleMobileMenu}
              className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {showMobileSearch && (
          <div className="md:hidden pb-4">
            <div className="flex space-x-2">
              <input
                id="mobile-search-input"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Search experiences..."
                className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
              />
              <button
                onClick={handleSearch}
                className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors text-sm"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-2">
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Home
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Experiences
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                About
              </button>
              <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors">
                Contact
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

const App = () => {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'details' | 'checkout' | 'confirmation'>('home');
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [filteredExperiences, setFilteredExperiences] = useState<Experience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<ExperienceWithSlots | null>(null);
  const [loading, setLoading] = useState(false);
  const [booking, setBooking] = useState<BookingDetails>({
    experience: null,
    date: '',
    time: '',
    quantity: 1,
    slotId: null,
  });
  const [discount, setDiscount] = useState(0);
  const [confirmationId, setConfirmationId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // React Hook Form for checkout - move inside component but stabilize
  const { 
    register, 
    handleSubmit, 
    watch, 
    setValue,
    formState: { errors } 
  } = useForm<FormData>({
    defaultValues: {
      fullName: '',
      email: '',
      promoCode: '',
      agreeTerms: false
    }
  });

  const formData = watch();

  useEffect(() => {
    if (currentScreen === 'home') {
      loadExperiences();
    }
  }, [currentScreen]);

  useEffect(() => {
    // Filter experiences based on search term
    if (searchTerm.trim() === '') {
      setFilteredExperiences(experiences);
    } else {
      const filtered = experiences.filter(exp =>
        exp.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredExperiences(filtered);
    }
  }, [searchTerm, experiences]);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experiencesAPI.getAll();
      setExperiences(data);
      setFilteredExperiences(data);
    } catch (error) {
      console.error('Error loading experiences:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadExperienceDetails = async (id: number) => {
    try {
      setLoading(true);
      const data = await experiencesAPI.getById(id);
      setSelectedExperience(data);
      setBooking({
        experience: data,
        date: data.slots[0]?.date || '',
        time: data.slots[0]?.time || '',
        quantity: 1,
        slotId: data.slots[0]?.id || null,
      });
      setCurrentScreen('details');
    } catch (error) {
      console.error('Error loading experience details:', error);
    } finally {
      setLoading(false);
    }
  };

  // Move screens to separate components with proper props
  const HomeScreen = () => (
    <div className="min-h-screen bg-gray-50">
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-400"></div>
          </div>
        ) : (
          <>
            {searchTerm && (
              <div className="mb-6">
                <p className="text-gray-600">
                  {filteredExperiences.length} experience{filteredExperiences.length !== 1 ? 's' : ''} found for "{searchTerm}"
                </p>
              </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
              {filteredExperiences.map((exp) => (
                <div key={exp.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                  <img src={exp.imageUrl} alt={exp.title} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 text-sm sm:text-base">{exp.title}</h3>
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded whitespace-nowrap">{exp.location}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">{exp.description.substring(0, 80)}...</p>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-xs text-gray-500">From </span>
                        <span className="font-semibold text-gray-900">₹{exp.price}</span>
                      </div>
                      <button
                        onClick={() => loadExperienceDetails(exp.id)}
                        className="px-3 py-2 bg-yellow-400 hover:bg-yellow-500 text-sm font-medium rounded-lg transition-colors whitespace-nowrap"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filteredExperiences.length === 0 && searchTerm && (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No experiences found for "{searchTerm}"</p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-medium rounded-lg transition-colors"
                >
                  Clear Search
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );

  const DetailsScreen = () => {
    if (!selectedExperience) return null;

    const subtotal = parseFloat(selectedExperience.price) * booking.quantity;
    const taxes = 59;
    const total = subtotal + taxes;

    const availableDates = [...new Set(selectedExperience.slots.map((slot) => slot.date))];
    const timesForDate = selectedExperience.slots.filter((slot) => slot.date === booking.date);

    const handleDateSelect = (date: string) => {
      const firstSlot = selectedExperience.slots.find((slot) => slot.date === date);
      setBooking({
        ...booking,
        date,
        time: firstSlot?.time || '',
        slotId: firstSlot?.id || null,
      });
    };

    const handleTimeSelect = (slot: Slot) => {
      setBooking({
        ...booking,
        time: slot.time,
        slotId: slot.id,
      });
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setCurrentScreen('home')}
            className="flex items-center space-x-2 text-gray-700 mb-6 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Details</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2 space-y-6">
              <img src={selectedExperience.imageUrl} alt={selectedExperience.title} className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-xl" />
              
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{selectedExperience.title}</h1>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">{selectedExperience.description} Helmet and Life jackets along with an expert will accompany in kayaking.</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-4">Choose date</h2>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {availableDates.map((date) => (
                    <button
                      key={date}
                      onClick={() => handleDateSelect(date)}
                      className={`px-3 py-2 text-sm sm:px-4 sm:py-2 rounded-lg font-medium transition-colors ${
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
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {timesForDate.map((slot) => {
                    const isSoldOut = slot.booked >= slot.capacity;
                    const spotsLeft = slot.capacity - slot.booked;
                    
                    return (
                      <button
                        key={slot.id}
                        onClick={() => !isSoldOut && handleTimeSelect(slot)}
                        disabled={isSoldOut}
                        className={`px-3 py-2 text-sm sm:px-4 sm:py-2 rounded-lg font-medium transition-colors relative ${
                          isSoldOut
                            ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                            : booking.slotId === slot.id
                            ? 'bg-yellow-400 text-gray-900'
                            : 'bg-white border border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {slot.time}
                        {!isSoldOut && spotsLeft <= 5 && (
                          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1 py-0.5 rounded text-xs">
                            {spotsLeft} left
                          </span>
                        )}
                        {isSoldOut && <span className="text-xs block">Sold out</span>}
                      </button>
                    );
                  })}
                </div>
                <p className="text-xs text-gray-500 mt-2">All times are in IST (GMT +5:30)</p>
              </div>

              <div>
                <h2 className="text-xl font-semibold mb-2">About</h2>
                <p className="text-gray-600 text-sm sm:text-base">Scenic routes, trained guides, and safety briefing. Minimum age 10.</p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl p-4 sm:p-6 border-2 border-green-500 sticky top-8">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Starts at</span>
                    <span className="text-lg sm:text-xl font-semibold">₹{selectedExperience.price}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Quantity</span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setBooking({ ...booking, quantity: Math.max(1, booking.quantity - 1) })}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
                      >
                        -
                      </button>
                      <span className="font-semibold text-sm sm:text-base">{booking.quantity}</span>
                      <button
                        onClick={() => setBooking({ ...booking, quantity: booking.quantity + 1 })}
                        className="w-6 h-6 sm:w-8 sm:h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                    <span className="font-semibold text-sm sm:text-base">₹{subtotal}</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 text-sm sm:text-base">Taxes</span>
                    <span className="font-semibold text-sm sm:text-base">₹{taxes}</span>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-lg font-semibold">Total</span>
                      <span className="text-xl font-bold">₹{total}</span>
                    </div>
                    <button
                      onClick={() => setCurrentScreen('checkout')}
                      className="w-full py-3 bg-gray-200 text-gray-900 font-semibold rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
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

  const CheckoutScreen = () => {
    if (!selectedExperience) return null;

    const subtotal = parseFloat(selectedExperience.price) * booking.quantity;
    const taxes = 59;
    const total = subtotal + taxes - discount;

    const handleApplyPromo = async () => {
      try {
        const result = await promoAPI.validate(formData.promoCode, subtotal);
        if (result.valid) {
          setDiscount(result.discount);
          alert(result.message);
        } else {
          alert(result.message);
        }
      } catch (error) {
        alert('Failed to validate promo code');
      }
    };

    const onSubmit = async (data: FormData) => {
      if (!data.agreeTerms) {
        alert('Please agree to the terms and safety policy');
        return;
      }

      try {
        const bookingData = {
          userName: data.fullName,
          email: data.email,
          experienceId: selectedExperience.id,
          slotId: booking.slotId!,
          quantity: booking.quantity,
          totalPrice: total.toString(),
          promoCode: data.promoCode || undefined,
          discount: discount.toString(),
          bookingStatus: 'confirmed',
        };

        const result = await bookingsAPI.create(bookingData);
        setConfirmationId(result.confirmationId);
        setCurrentScreen('confirmation');
      } catch (error) {
        alert('Failed to create booking. Please try again.');
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <button
            onClick={() => setCurrentScreen('details')}
            className="flex items-center space-x-2 text-gray-700 mb-6 hover:text-gray-900"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Checkout</span>
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
            <div className="bg-white rounded-xl p-4 sm:p-6">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label className="block text-sm text-gray-600 mb-2">Full name</label>
                    <input
                      {...register('fullName', { 
                        required: 'Full name is required',
                        minLength: {
                          value: 2,
                          message: 'Full name must be at least 2 characters'
                        }
                      })}
                      type="text"
                      placeholder="Your name"
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    />
                    {errors.fullName && (
                      <p className="text-red-500 text-xs mt-1">{errors.fullName.message}</p>
                    )}
                  </div>
                  <div className="sm:col-span-2 sm:col-start-1">
                    <label className="block text-sm text-gray-600 mb-2">Email</label>
                    <input
                      {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      type="email"
                      placeholder="Your email"
                      className="w-full px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex space-x-2">
                    <input
                      {...register('promoCode')}
                      type="text"
                      placeholder="Promo code"
                      className="flex-1 px-4 py-2 bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400 text-sm"
                    />
                    <button
                      type="button"
                      onClick={handleApplyPromo}
                      className="px-4 sm:px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors text-sm whitespace-nowrap"
                    >
                      Apply
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Try: SAVE10 (10% off) or FLAT100 (₹100 off)</p>
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    {...register('agreeTerms', { 
                      required: 'You must agree to the terms and safety policy'
                    })}
                    type="checkbox"
                    id="terms"
                    className="w-4 h-4 text-yellow-400 focus:ring-yellow-400 rounded mt-1 flex-shrink-0"
                  />
                  <label htmlFor="terms" className="text-sm text-gray-600">
                    I agree to the terms and safety policy
                  </label>
                </div>
                {errors.agreeTerms && (
                  <p className="text-red-500 text-xs mt-1">{errors.agreeTerms.message}</p>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-yellow-400 text-gray-900 font-semibold rounded-lg hover:bg-yellow-500 transition-colors mt-4 text-sm sm:text-base"
                >
                  Pay and Confirm
                </button>
              </form>
            </div>

            <div className="bg-gray-100 rounded-xl p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Experience</span>
                  <span className="font-semibold text-sm sm:text-base text-right">{selectedExperience.title}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Date</span>
                  <span className="font-semibold text-sm sm:text-base">{booking.date}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Time</span>
                  <span className="font-semibold text-sm sm:text-base">{booking.time}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Qty</span>
                  <span className="font-semibold text-sm sm:text-base">{booking.quantity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Subtotal</span>
                  <span className="font-semibold text-sm sm:text-base">₹{subtotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 text-sm sm:text-base">Taxes</span>
                  <span className="font-semibold text-sm sm:text-base">₹{taxes}</span>
                </div>
                {discount > 0 && (
                  <div className="flex items-center justify-between text-green-600">
                    <span className="text-sm sm:text-base">Discount</span>
                    <span className="font-semibold text-sm sm:text-base">-₹{discount}</span>
                  </div>
                )}
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-xl sm:text-2xl font-bold">₹{total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ConfirmationScreen = () => (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="text-center max-w-md w-full">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
          <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Booking Confirmed</h1>
        <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base">Ref ID: {confirmationId}</p>
        <button
          onClick={() => {
            setCurrentScreen('home');
            setSelectedExperience(null);
            setBooking({
              experience: null,
              date: '',
              time: '',
              quantity: 1,
              slotId: null,
            });
            setDiscount(0);
            setSearchTerm('');
            // Reset form
            setValue('fullName', '');
            setValue('email', '');
            setValue('promoCode', '');
            setValue('agreeTerms', false);
          }}
          className="w-full sm:w-auto px-8 py-3 border-2 border-green-500 text-green-600 font-semibold rounded-lg hover:bg-green-50 transition-colors text-sm sm:text-base"
        >
          Back to Home
        </button>
      </div>
    </div>
  );

  // Use a key for each screen to force proper re-rendering
  return (
    <>
      {currentScreen === 'home' && <HomeScreen key="home" />}
      {currentScreen === 'details' && <DetailsScreen key="details" />}
      {currentScreen === 'checkout' && <CheckoutScreen key="checkout" />}
      {currentScreen === 'confirmation' && <ConfirmationScreen key="confirmation" />}
    </>
  );
};

export default App;
import React from 'react';
import {
    Search,
    MapPin,
    Calendar,
    Clock,
    Users,
    ChevronDown,
    ChevronRight,
    ChevronLeft,
    TrendingUp,
    Star
} from 'lucide-react';

export function Component() {
    return (
        <div className="min-h-screen bg-white font-sans text-[#2d333f]" >
            {/* Top Utility Bar */}
            < div className="border-b border-gray-100" >
                <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-end space-x-6 text-xs text-gray-500" >
                    <button className="hover:underline" > Mobile </button>
                    < button className="hover:underline" > For Businesses </button>
                    < button className="hover:underline" > FAQs </button>
                    < button className="flex items-center hover:underline" >
                        EN < ChevronDown size={12} className="ml-1" />
                    </button>
                </div>
            </div>

            {/* Main Header */}
            <header className="border-b border-gray-200 sticky top-0 bg-white z-50" >
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between" >
                    <div className="flex items-center space-x-8" >
                        {/* Logo */}
                        < div className="flex items-center space-x-1 cursor-pointer" >
                            <div className="w-8 h-8 bg-[#da3743] rounded-full flex items-center justify-center" >
                                <div className="w-2 h-2 bg-white rounded-full" > </div>
                            </div>
                            < span className="text-xl font-bold tracking-tight text-[#2d333f]" > OpenTable </span>
                        </div>

                        {/* Location Selector */}
                        <button className="flex items-center space-x-1 text-sm font-medium hover:bg-gray-50 p-2 rounded" >
                            <MapPin size={18} className="text-gray-600" />
                            <ChevronDown size={14} className="text-gray-400" />
                        </button>
                    </div>

                    < div className="flex items-center space-x-4" >
                        <button className="text-sm font-medium px-4 py-2 hover:bg-gray-50 rounded" > Join rewards </button>
                        < button className="bg-[#247f9e] text-white text-sm font-bold px-4 py-2 rounded transition hover:bg-[#1d6680]" >
                            Sign in
                        </button>
                        < button className="p-2 hover:bg-gray-50 rounded" >
                            <Search size={20} className="text-gray-600" />
                        </button>
                    </div>
                </div>
            </header>

            {/* Search Section */}
            <div className="max-w-7xl mx-auto px-4 pt-12 pb-8 flex flex-col items-center" >
                <div className="w-full max-w-5xl flex items-center bg-white border border-gray-300 rounded-md overflow-hidden shadow-sm" >
                    {/* Date Picker */}
                    < div className="flex-1 flex items-center px-4 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition" >
                        <Calendar size={18} className="text-gray-500 mr-3" />
                        <span className="text-sm font-medium" > Jan 30 </span>
                        < ChevronDown size={14} className="text-gray-400 ml-auto" />
                    </div>
                    {/* Time Picker */}
                    <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition" >
                        <Clock size={18} className="text-gray-500 mr-3" />
                        <span className="text-sm font-medium" > 7:00 PM </span>
                        < ChevronDown size={14} className="text-gray-400 ml-auto" />
                    </div>
                    {/* Party Size */}
                    <div className="flex-1 flex items-center px-4 py-3 border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition" >
                        <Users size={18} className="text-gray-500 mr-3" />
                        <span className="text-sm font-medium" > 2 people </span>
                        < ChevronDown size={14} className="text-gray-400 ml-auto" />
                    </div>
                    {/* Search Input */}
                    <div className="flex-[2] flex items-center px-4 py-3" >
                        <Search size={18} className="text-gray-500 mr-3" />
                        <input
                            type="text"
                            placeholder="Location, Restaurant, or Cuisine"
                            className="w-full text-sm outline-none placeholder-gray-400 font-medium"
                        />
                    </div>
                    {/* Submit Button */}
                    <button className="bg-[#da3743] text-white font-bold py-4 px-8 hover:bg-[#be2d38] transition" >
                        Let's go
                    </button>
                </div>

                {/* Location Hint */}
                <div className="mt-4 flex items-center text-xs text-gray-500" >
                    <span>It looks like you're in West Hollywood. Not correct?</span>
                    < button className="ml-2 text-[#da3743] flex items-center font-medium" >
                        <MapPin size={12} className="mr-1 fill-current" /> Get current location
                    </button>
                </div>
            </div>

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 pb-20" >

                {/* Sapphire Reserve Banner */}
                < div className="relative group mb-12" >
                    <div className="flex h-[280px] rounded-lg overflow-hidden shadow-lg" >
                        {/* Left side text */}
                        < div className="flex-1 bg-[#002f6c] p-10 flex flex-col justify-center text-white relative" >
                            <div className="flex items-center space-x-2 mb-6" >
                                <div className="w-4 h-4 bg-white/20 rounded-sm" > </div>
                                < span className="text-[10px] uppercase tracking-widest font-bold opacity-80 italic" > Sapphire Reserve®</span>
                            </div>
                            < h2 className="text-2xl font-bold mb-3" > Sapphire Reserve Exclusive Tables </h2>
                            < p className="text-sm opacity-90 leading-relaxed mb-6 max-w-sm" >
                                New cardmembers can book exclusive tables and enjoy a $300 annual dining credit from Chase.
                            </p>
                            < button className="w-fit border border-white text-xs font-bold px-4 py-2 rounded hover:bg-white/10 transition" >
                                Explore restaurants
                            </button>
                        </div>
                        {/* Right side image placeholder */}
                        <div className="flex-1 relative" >
                            <img
                                src="https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=800"
                                alt="Sapphire Reserve Banner"
                                className="absolute inset-0 w-full h-full object-cover"
                            />
                            <div className="absolute top-1/2 left-0 right-0 h-1/2 bg-gradient-to-t from-black/20 to-transparent" > </div>
                        </div>
                    </div>
                    {/* Carousel Arrows */}
                    <button className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow-md border border-gray-200 rounded-full p-2 z-10 hover:bg-gray-50 hidden group-hover:block transition" >
                        <ChevronRight size={20} className="text-gray-600" />
                    </button>
                </div>

                {/* Recommended Section */}
                <section className="mb-12" >
                    <div className="flex items-center justify-between mb-6" >
                        <h2 className="text-2xl font-bold" > Available for dinner now </h2>
                        < button className="text-[#da3743] text-sm font-medium hover:underline" > View all </button>
                    </div>

                    < div className="relative" >
                        <div className="grid grid-cols-5 gap-4" >
                            {
                                restaurants.map((res, i) => (
                                    <div key={i} className="flex flex-col border border-gray-100 rounded-lg overflow-hidden transition-shadow hover:shadow-md cursor-pointer bg-white group" >
                                        <div className="h-36 overflow-hidden relative" >
                                            <img
                                                src={res.image}
                                                alt={res.name}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        < div className="p-3 flex flex-col flex-1" >
                                            <h3 className="font-bold text-sm truncate leading-tight mb-1" > {res.name} </h3>

                                            {/* Rating */}
                                            < div className="flex items-center mb-1" >
                                                <div className="flex mr-1" >
                                                    {
                                                        [...Array(5)].map((_, j) => (
                                                            <Star
                                                                key={j}
                                                                size={12}
                                                                className={`fill-[#da3743] text-[#da3743] ${j >= Math.floor(res.rating) ? 'opacity-30' : ''}`}
                                                            />
                                                        ))
                                                    }
                                                </div>
                                                < span className="text-[11px] text-gray-500" > {res.reviews} reviews </span>
                                            </div>

                                            {/* Details */}
                                            <div className="text-[11px] text-gray-600 mb-3" >
                                                {res.cuisine} • {res.price} • {res.location}
                                            </div>

                                            {/* Booking Stats */}
                                            <div className="flex items-center text-[11px] font-medium text-gray-700 mb-4" >
                                                <TrendingUp size={14} className="mr-1 text-gray-500" />
                                                Booked {res.booked} times today
                                            </div>

                                            {/* Time Slots */}
                                            <div className="flex space-x-2 mt-auto" >
                                                {
                                                    res.slots.map((slot, k) => (
                                                        <div key={k} className="flex-1 flex flex-col" >
                                                            <button className="bg-[#da3743] text-white text-[11px] font-bold py-1.5 rounded hover:bg-[#be2d38] transition" >
                                                                {slot}
                                                            </button>
                                                            < span className="text-[9px] text-[#da3743] text-center mt-1 font-bold" > +1,000 pts </span>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                        {/* Carousel Nav Right */}
                        <button className="absolute -right-5 top-1/2 -translate-y-1/2 bg-white shadow-md border border-gray-200 rounded-full p-2 z-10 hover:bg-gray-50" >
                            <ChevronRight size={20} className="text-gray-600" />
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

const restaurants = [
    {
        name: "Telefèric Barcelona - Bren...",
        image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=400",
        rating: 4.8,
        reviews: "901",
        cuisine: "Spanish",
        price: "$$$$",
        location: "Brentwood",
        booked: 75,
        slots: ["5:30 PM", "5:45 PM", "8:00 PM"]
    },
    {
        name: "Benihana - Santa Monica, ...",
        image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&q=80&w=400",
        rating: 4.2,
        reviews: "4,213",
        cuisine: "Japanese",
        price: "$$",
        location: "Santa Monica",
        booked: 66,
        slots: ["5:30 PM", "5:45 PM", "6:00 PM"]
    },
    {
        name: "Lunetta",
        image: "https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&q=80&w=400",
        rating: 4.7,
        reviews: "2,339",
        cuisine: "Californian",
        price: "$$$$",
        location: "Santa Monica",
        booked: 44,
        slots: ["5:30 PM", "5:45 PM", "6:00 PM"]
    },
    {
        name: "The Courtyard Kitchen",
        image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&q=80&w=400",
        rating: 4.5,
        reviews: "191",
        cuisine: "Contemporary American",
        price: "$$$",
        location: "...",
        booked: 41,
        slots: ["5:30 PM", "5:45 PM", "6:00 PM"]
    },
    {
        name: "Fia Steak",
        image: "https://images.unsplash.com/photo-1544148103-0773bf10d330?auto=format&fit=crop&q=80&w=400",
        rating: 4.9,
        reviews: "418",
        cuisine: "Steakhouse",
        price: "$$$$",
        location: "Santa Monica",
        booked: 12,
        slots: ["5:30 PM", "5:45 PM", "6:00 PM"]
    }
];
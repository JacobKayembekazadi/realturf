
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Award, ExternalLink } from 'lucide-react';

const PRODUCTS = [
  // ========== LANDSCAPE PRODUCTS ==========
  {
    name: 'Absolute',
    image: 'https://realturf.com/us/wp-content/uploads/2025/09/Absolute-artificial-turf-01-1.jpg',
    pileHeight: '2"',
    faceWeight: '107 oz/yd²',
    fiber: 'C & Diamond',
    apps: ['Commercial', 'Rooftop', 'Pool', 'Patio', 'Yard'],
    features: ['Look & Feel', 'MaxDrain', 'LongLife', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/absolute/'
  },
  {
    name: 'All Seasons',
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/AllSeasons_Standard.jpg',
    pileHeight: '1.56"',
    faceWeight: '87 oz/yd²',
    fiber: 'Wave + D + S',
    apps: ['Commercial', 'Rooftop', 'Patio', 'Yard'],
    features: ['LongLife', 'BodyShape', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/all-seasons/'
  },
  {
    name: 'Altitude',
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/Altitude-artificial-turf-01-1.jpg',
    pileHeight: '1.75"',
    faceWeight: '107 oz/yd²',
    fiber: 'Wave + D + S',
    apps: ['Commercial', 'Yard'],
    features: ['Look & Feel', 'LongLife', 'BodyShape', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/altitude/'
  },
  {
    name: 'Comfort',
    image: 'https://realturf.com/us/wp-content/uploads/2025/09/Comfort-artificial-turf-01.jpg',
    pileHeight: '1.375"',
    faceWeight: '117 oz/yd²',
    fiber: 'Diamond',
    apps: ['Commercial', 'Rooftop', 'Play', 'Pet', 'Pool', 'Yard'],
    features: ['Look & Feel', 'LongLife', 'SoftMax', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/comfort/'
  },
  {
    name: 'Deluxe',
    image: 'https://realturf.com/us/wp-content/uploads/2025/09/Deluxe-artificial-turf-01.jpg',
    pileHeight: '1.56"',
    faceWeight: '97 oz/yd²',
    fiber: 'Wave',
    apps: ['Commercial', 'Rooftop', 'Play', 'Pet', 'Pool', 'Yard'],
    features: ['Look & Feel', 'LongLife', 'BodyShape', 'SoftMax', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/deluxe/'
  },
  {
    name: 'ECO C',
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/EcoC-01-scaled-1.jpg',
    pileHeight: '1.25"',
    faceWeight: '102 oz/yd²',
    fiber: 'C + Flat',
    apps: ['Commercial', 'Pet', 'Pool', 'Patio', 'Yard'],
    features: ['Look & Feel', 'LongLife', 'BodyShape', 'SoftMax', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/eco-c/'
  },
  {
    name: 'ECO D',
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/EcoD-01-scaled-1.jpg',
    pileHeight: '1.56"',
    faceWeight: '82 oz/yd²',
    fiber: 'Stem',
    apps: ['Commercial', 'Play', 'Pet', 'Pool', 'Yard'],
    features: ['Look & Feel', 'LongLife', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/eco-d/'
  },
  {
    name: 'ECO H',
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/EcoH-01-scaled-1.jpg',
    pileHeight: '1.75"',
    faceWeight: '117 oz/yd²',
    fiber: 'Omega',
    apps: ['Commercial', 'Pet', 'Yard'],
    features: ['Look & Feel', 'MaxDrain', 'LongLife', 'SoftMax', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/eco-h/'
  },
  {
    name: 'ECO P',
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/Eco-P-Product-Photo.jpg',
    pileHeight: '1"',
    faceWeight: '82 oz/yd²',
    fiber: 'C + Flat',
    apps: ['Commercial', 'Pet', 'Yard'],
    features: ['MaxDrain', 'LongLife', 'BodyShape', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/eco-p/'
  },
  {
    name: 'Elite',
    image: 'https://realturf.com/us/wp-content/uploads/2025/10/Elite-Product-Photo.jpg',
    pileHeight: '1.5"',
    faceWeight: '83 oz/yd²',
    fiber: 'Wave',
    apps: ['Commercial', 'Rooftop', 'Patio', 'Yard'],
    features: ['Look & Feel', 'MaxDrain', 'LongLife', 'MaxRecover', 'FiberFresh', 'PetFriendly', 'KidsProof'],
    category: 'landscape',
    url: 'https://realturf.com/us/products/elite/'
  },

  // ========== SPORTS PRODUCTS ==========
  {
    name: 'Golf Putt',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=800&q=80',
    pileHeight: '9/16"',
    faceWeight: '46 oz/yd²',
    fiber: 'Textured',
    apps: ['Golf', 'Putting Greens'],
    features: ['Professional Grade', 'True Roll', 'UV Protected', 'All-Weather'],
    category: 'sports',
    url: 'https://realturf.com/us/products/sports/golf-putt-artificial-turf/'
  },
  {
    name: 'Golf Pro',
    image: 'https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?w=800&q=80',
    pileHeight: '5/8"',
    faceWeight: '53 oz/yd²',
    fiber: 'Pro Textured',
    apps: ['Golf', 'Professional Putting Greens'],
    features: ['Tour Level', 'Perfect Roll', 'Long Lasting', 'Easy Maintenance'],
    category: 'sports',
    url: 'https://realturf.com/us/products/sports/golf-pro-artificial-turf/'
  },
  {
    name: 'Natural Putt',
    image: 'https://images.unsplash.com/photo-1592919505780-303950717480?w=800&q=80',
    pileHeight: '0.63"',
    faceWeight: '60 oz/yd²',
    fiber: 'Natural Textured',
    apps: ['Golf', 'Practice Greens'],
    features: ['Realistic Feel', 'Great Drainage', 'Weather Resistant', 'Low Maintenance'],
    category: 'sports',
    url: 'https://realturf.com/us/products/golf-natural-putt/'
  },
  {
    name: 'Multisport',
    image: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
    pileHeight: '1-3/16"',
    faceWeight: '70 oz/yd²',
    fiber: 'Flat Monofilament',
    apps: ['Soccer', 'Multipurpose', 'Training'],
    features: ['High Durability', 'Quick Recovery', 'Versatile', 'All Sports'],
    category: 'sports',
    url: 'https://realturf.com/us/products/sports/multisport/'
  },
  {
    name: 'Multisport Blue',
    image: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&q=80',
    pileHeight: '1-3/16"',
    faceWeight: '70 oz/yd²',
    fiber: 'Flat',
    apps: ['Soccer', 'Lacrosse', 'Multi-use Courts'],
    features: ['Bright Blue Color', 'Team Branding', 'Intensive Play', 'Premium Drainage'],
    category: 'sports',
    url: 'https://realturf.com/us/products/multisport/'
  },
  {
    name: 'Soccer Turf',
    image: 'https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aab?w=800&q=80',
    pileHeight: '1.5"',
    faceWeight: '75 oz/yd²',
    fiber: 'High Performance',
    apps: ['Soccer', 'Football Fields'],
    features: ['FIFA Certified', 'Player Safety', 'Ball Interaction', 'Max Durability'],
    category: 'sports',
    url: 'https://realturf.com/us/artificial-grass/sport/soccer/'
  },
  {
    name: 'Gym Turf',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80',
    pileHeight: '1"',
    faceWeight: '65 oz/yd²',
    fiber: 'Dense Low-Pile',
    apps: ['Gym', 'Training', 'Fitness'],
    features: ['Sled Compatible', 'Weight Safe', 'Shock Absorption', 'Easy Clean'],
    category: 'sports',
    url: 'https://realturf.com/us/applications/sports/gym/'
  },
  {
    name: 'Baseball Turf',
    image: 'https://images.unsplash.com/photo-1566577739112-5180d4bf9390?w=800&q=80',
    pileHeight: '1.5"',
    faceWeight: '70 oz/yd²',
    fiber: 'Performance Grade',
    apps: ['Baseball', 'Infield', 'Outfield'],
    features: ['Professional Grade', 'True Bounce', 'Weather Proof', 'High Traffic'],
    category: 'sports',
    url: 'https://realturf.com/us/applications/sports/baseball/'
  },
  {
    name: 'Padel/Tennis',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=800&q=80',
    pileHeight: '0.75"',
    faceWeight: '55 oz/yd²',
    fiber: 'Court Specialist',
    apps: ['Padel', 'Tennis', 'Court Surface'],
    features: ['ITF Certified', 'Consistent Bounce', 'Low Abrasion', 'Professional'],
    category: 'sports',
    url: 'https://realturf.com/us/applications/sports/padel-tennis/'
  },
  {
    name: 'Football Turf',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=800&q=80',
    pileHeight: '2"',
    faceWeight: '85 oz/yd²',
    fiber: 'Heavy Duty',
    apps: ['Football', 'Professional Fields'],
    features: ['Max Impact Protection', 'Player Safety', 'Extreme Durability', 'Professional'],
    category: 'sports',
    url: 'https://realturf.com/us/applications/sports/football/'
  }
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'landscape' | 'sports'>('all');
  const [selectedApp, setSelectedApp] = useState('all');

  const filteredProducts = PRODUCTS.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesApp = selectedApp === 'all' || p.apps.some(app => app.toLowerCase() === selectedApp);
    return matchesSearch && matchesCategory && matchesApp;
  });

  return (
    <section className="pt-32 pb-20 px-6 bg-gray-50">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Our <span className="text-red-600">Products</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore our range of premium artificial turf solutions, each featuring proprietary RealTech® technologies
          </p>
        </motion.div>

        {/* Category Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex justify-center gap-4 mb-8"
        >
          {[
            { id: 'all', label: 'All Products', icon: '🏆' },
            { id: 'landscape', label: 'Landscape', icon: '🌿' },
            { id: 'sports', label: 'Sports', icon: '⚽' }
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id as any)}
              className={`px-8 py-4 rounded-xl font-bold text-lg transition transform hover:scale-105 ${
                selectedCategory === cat.id
                  ? 'bg-red-600 text-white shadow-2xl shadow-red-600/40'
                  : 'bg-white text-gray-700 border-2 border-gray-200 hover:border-red-300'
              }`}
            >
              <span className="mr-2">{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg p-6 mb-12 border-2 border-red-50"
        >
          <div className="grid md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none"
              />
            </div>

            {/* Application Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <select
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-red-500 focus:outline-none appearance-none bg-white"
              >
                <option value="all">All Applications</option>
                <optgroup label="Landscape">
                  <option value="commercial">Commercial</option>
                  <option value="yard">Yard</option>
                  <option value="pet">Pet</option>
                  <option value="pool">Pool</option>
                  <option value="play">Play</option>
                  <option value="patio">Patio</option>
                  <option value="rooftop">Rooftop</option>
                </optgroup>
                <optgroup label="Sports">
                  <option value="golf">Golf</option>
                  <option value="soccer">Soccer</option>
                  <option value="gym">Gym</option>
                  <option value="baseball">Baseball</option>
                  <option value="football">Football</option>
                  <option value="padel">Padel/Tennis</option>
                  <option value="training">Training</option>
                </optgroup>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Results Count */}
        <div className="text-center mb-6">
          <p className="text-gray-600">
            Showing <span className="font-bold text-red-600">{filteredProducts.length}</span> products
            {selectedCategory !== 'all' && ` in ${selectedCategory}`}
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl hover:scale-105 transition transform border-2 border-gray-100 hover:border-red-200"
            >
              {/* Product Image */}
              <div className="relative h-64 overflow-hidden bg-gray-100">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full shadow-lg">
                  {product.category === 'sports' ? '⚽ Sports' : '🌿 Landscape'}
                </div>
                {product.features.includes('FIFA Certified') && (
                  <div className="absolute top-4 left-4 px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full flex items-center gap-1">
                    <Award className="w-3 h-3" />
                    FIFA
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{product.name}</h3>
                
                <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-red-600 text-xs mb-1 font-semibold">Pile Height</p>
                    <p className="font-bold text-gray-900">{product.pileHeight}</p>
                  </div>
                  <div className="bg-red-50 rounded-lg p-3">
                    <p className="text-red-600 text-xs mb-1 font-semibold">Face Weight</p>
                    <p className="font-bold text-gray-900">{product.faceWeight}</p>
                  </div>
                </div>

                {/* Fiber Type */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs font-semibold text-gray-500 mb-1">FIBER TYPE</p>
                  <p className="text-sm font-bold text-gray-900">{product.fiber}</p>
                </div>

                {/* Applications */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 mb-2">APPLICATIONS</p>
                  <div className="flex flex-wrap gap-2">
                    {product.apps.slice(0, 4).map(app => (
                      <span
                        key={app}
                        className="px-2 py-1 bg-red-50 text-red-700 text-xs font-medium rounded-lg border border-red-200"
                      >
                        {app}
                      </span>
                    ))}
                    {product.apps.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-lg">
                        +{product.apps.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 mb-2">
                    {product.category === 'sports' ? 'KEY FEATURES' : 'REALTECH® FEATURES'}
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {product.features.slice(0, 4).map(feature => (
                      <span
                        key={feature}
                        className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-lg"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-lg">
                        +{product.features.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* CTA - Now a link to actual product page */}
                <a
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-red-600 text-white font-bold rounded-xl hover:bg-red-700 transition shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  View Details
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* No Results */}
        {filteredProducts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your filters or search term</p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
                setSelectedApp('all');
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}

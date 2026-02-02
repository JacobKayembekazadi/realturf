
import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, ArrowRight, Users, ShieldCheck, Clock } from 'lucide-react';

interface HeroProps {
  onGetQuote: () => void;
}

export default function Hero({ onGetQuote }: HeroProps) {
  const cardVariants = {
    offscreen: { y: 50, opacity: 0 },
    onscreen: (i: number) => ({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
        delay: i * 0.1
      }
    })
  };

  return (
    <section className="bg-gradient-to-br from-red-50 via-white to-gray-50 pt-16 pb-20 px-4 sm:px-6">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-100 to-red-50 rounded-full mb-6 border border-red-200"
          >
            <MapPin className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-800">
              Serving Houston, Dallas, Las Vegas & West Palm Beach
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Premium Artificial Turf
            <span className="block text-red-600 mt-2">Installed by Local Pros</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
          >
            Get a free estimate in minutes. We'll connect you with a certified installer in your area who will transform your outdoor space with premium RealTurf products.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={onGetQuote}
              className="group px-8 py-4 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-transform duration-300 hover:scale-105 font-semibold text-lg shadow-xl shadow-red-600/40 flex items-center justify-center gap-2"
            >
              Get Free Estimate
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="tel:+18001234567"
              className="group px-8 py-4 bg-white border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
            >
              Call Us Now
              <span className="text-sm font-normal">(800) 123-4567</span>
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-6 text-sm text-gray-500"
          >
            A local installer will contact you within 24 hours
          </motion.p>
        </div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto"
        >
          {[
            { icon: Users, title: 'Certified Local Installers', description: 'Our network of professional installers are trained and certified to deliver perfect results every time.' },
            { icon: Clock, title: 'Fast Response Time', description: 'Get connected with an installer in your area quickly. Most customers receive a callback within 24 hours.' },
            { icon: ShieldCheck, title: '15-Year Warranty', description: 'All RealTurf products come with industry-leading warranties and are backed by our quality guarantee.' }
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              custom={idx}
              variants={cardVariants}
              className="bg-white border border-gray-200 rounded-xl p-8 text-center hover:border-red-400 hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
            >
              <div className="inline-block p-4 bg-red-100 rounded-full mb-4">
                <feature.icon className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

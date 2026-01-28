
import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Bot, Scissors, ShieldCheck } from 'lucide-react';

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
  
  const handleAskAi = () => {
    const chatButton = document.getElementById('chat-widget-button');
    if (chatButton) {
      chatButton.click();
      // Small delay to allow the widget to open before focusing
      setTimeout(() => {
        const chatInput = document.querySelector('input[placeholder="Ask me anything..."]') as HTMLInputElement;
        if (chatInput) chatInput.focus();
      }, 300);
    }
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
            <Sparkles className="w-5 h-5 text-red-600" />
            <span className="text-sm font-semibold text-red-800">
              Now Powered by AI - Get Instant Recommendations
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Transform Your Landscaping
            <span className="block text-red-600 mt-2">With Premium Turf</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed"
          >
            Premium artificial turf with intelligent product matching. Upload a photo, answer a few questions, and our AI will find your perfect turf solution in seconds.
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
              Get Instant AI Quote
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            </button>
            <button
              onClick={handleAskAi}
              className="group px-8 py-4 bg-white border-2 border-red-600 text-red-600 rounded-xl hover:bg-red-50 transition-all duration-300 font-semibold text-lg flex items-center justify-center gap-2"
            >
              Ask AI Assistant
              <Bot className="w-5 h-5" />
            </button>
          </motion.div>
        </div>

        <motion.div
          initial="offscreen"
          whileInView="onscreen"
          viewport={{ once: true, amount: 0.3 }}
          className="grid md:grid-cols-3 gap-8 mt-20 max-w-6xl mx-auto"
        >
          {[
            { icon: Bot, title: 'AI Product Matching', description: 'Describe your needs or upload a photo. Our AI recommends the perfect products.' },
            { icon: Scissors, title: 'Customized Installation Advice', description: 'Get AI-powered guidance on installation for your specific surface and project size.' },
            { icon: ShieldCheck, title: '24/7 Expert Support', description: 'Ask questions about maintenance, durability, or products anytime and get instant answers.' }
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

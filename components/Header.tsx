
import React from 'react';
import { Section } from '../App';

interface HeaderProps {
  onGetQuote: () => void;
  setActiveSection: (section: Section) => void;
  activeSection: Section;
}

const NavButton: React.FC<{
  label: string;
  isActive: boolean;
  onClick: () => void;
}> = ({ label, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative font-medium text-gray-700 transition-colors duration-300 hover:text-red-600 ${isActive ? 'text-red-600' : ''}`}
  >
    {label}
    {isActive && (
      <span className="absolute bottom-[-8px] left-1/2 h-0.5 w-full -translate-x-1/2 rounded-full bg-red-600"></span>
    )}
  </button>
);

export default function Header({ onGetQuote, setActiveSection, activeSection }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 z-40">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveSection('home')}>
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-2xl">R</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">RealTurf</h1>
              <p className="text-xs text-red-600 font-semibold -mt-1">AI-Powered</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <NavButton label="Products" isActive={activeSection === 'products'} onClick={() => setActiveSection('products')} />
            <NavButton label="Dealers" isActive={activeSection === 'dealers'} onClick={() => setActiveSection('dealers')} />
            <NavButton label="Resources" isActive={activeSection === 'resources'} onClick={() => setActiveSection('resources')} />
          </nav>

          <button
            onClick={onGetQuote}
            className="hidden md:inline-block px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-transform duration-300 hover:scale-105 font-semibold shadow-lg shadow-red-600/30"
          >
            Get Instant Quote
          </button>
        </div>
      </div>
    </header>
  );
}

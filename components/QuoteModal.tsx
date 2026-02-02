
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ArrowRight, Check, Calendar, Loader2, User, Mail, Phone, MapPin, CheckCircle } from 'lucide-react';
import { getQuoteAnalysis } from '../services/geminiService';
import { allProducts, dealers } from '../constants';

interface QuoteModalProps {
  onClose: () => void;
}

const StepIndicator: React.FC<{ currentStep: number }> = ({ currentStep }) => (
  <div className="flex justify-center items-center gap-2 sm:gap-4 mb-8">
    {[1, 2, 3, 4].map(step => (
      <React.Fragment key={step}>
        <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${currentStep >= step ? 'bg-red-600 border-red-600 text-white' : 'border-gray-300 text-gray-500'}`}>
          {currentStep > step ? <Check className="w-6 h-6" /> : step}
        </div>
        {step < 4 && <div className={`h-1 flex-1 ${currentStep > step ? 'bg-red-600' : 'bg-gray-300'}`}></div>}
      </React.Fragment>
    ))}
  </div>
);

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = error => reject(error);
  });

export default function QuoteModal({ onClose }: QuoteModalProps) {
  const [step, setStep] = useState(1);
  const [projectData, setProjectData] = useState({
    description: '',
    sqft: '',
    usage: [] as string[],
    location: '',
    propertyType: 'residential',
    timeline: '',
  });
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '', address: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ recommendations: { productName: string, reason: string }[], analysis: string } | null>(null);

  // Track object URL for cleanup to prevent memory leaks
  const imagePreviewUrlRef = useRef<string | null>(null);

  // Cleanup object URL on unmount to prevent memory leaks
  useEffect(() => {
    return () => {
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
    };
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Revoke previous URL to prevent memory leak
      if (imagePreviewUrlRef.current) {
        URL.revokeObjectURL(imagePreviewUrlRef.current);
      }
      const newPreviewUrl = URL.createObjectURL(file);
      imagePreviewUrlRef.current = newPreviewUrl;
      setImageFile(file);
      setImagePreview(newPreviewUrl);
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
        setIsLoading(true);
        setStep(2);
        let imagePayload;
        if (imageFile) {
            const data = await fileToBase64(imageFile);
            imagePayload = { mimeType: imageFile.type, data };
        }
        try {
            const resultJson = await getQuoteAnalysis(projectData, imagePayload);
            const parsedResult = JSON.parse(resultJson);
            setAnalysisResult(parsedResult);
        } catch (e) {
            console.error("Failed to get analysis", e);
            setAnalysisResult({
            recommendations: [{ productName: "Absolute", reason: "A versatile and popular high-quality choice for most applications."}],
            analysis: "Based on your requirements, we've selected our most popular products. Your local installer will help finalize the perfect choice."
            });
        } finally {
            setIsLoading(false);
            setStep(3);
        }
    } else {
      setStep(s => s + 1);
    }
  };

  const USAGE_OPTIONS = ["Pets", "Kids / Playground", "High Traffic", "Poolside", "Sports (e.g., golf)", "General Lawn"];
  const TIMELINE_OPTIONS = ["As soon as possible", "Within 1 month", "1-3 months", "Just researching"];
  const LOCATION_OPTIONS = ["Houston, TX", "Dallas, TX", "Las Vegas, NV", "West Palm Beach, FL", "Other"];

  // Simple email validation
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  // Check if contact form is valid
  const isContactFormValid = contactInfo.name.trim() !== '' &&
    isValidEmail(contactInfo.email) &&
    contactInfo.phone.trim() !== '';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[95vh] flex flex-col"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900">Get Your Free Estimate</h2>
            <button onClick={onClose} className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"><X/></button>
        </div>
        <div className="p-8 overflow-y-auto">
            <StepIndicator currentStep={step} />
            <AnimatePresence mode="wait">
            <motion.div
                key={step}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
            >
                {step === 1 && (
                    <div>
                        <h3 className="font-bold text-xl mb-4">Tell Us About Your Project</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold text-gray-700 block mb-2">Property Photo (helps us give accurate estimate)</label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        {imagePreview ? <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto mb-4"/> : <Upload className="mx-auto h-12 w-12 text-gray-300" />}
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500">
                                                <span>Upload a photo</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold text-gray-700 block mb-2">Property Type</label>
                                    <select
                                        value={projectData.propertyType}
                                        onChange={e => setProjectData({...projectData, propertyType: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="residential">Residential</option>
                                        <option value="commercial">Commercial</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold text-gray-700 block mb-2">Approx. Square Footage</label>
                                    <input type="number" min="1" value={projectData.sqft} onChange={e => {
                                        const value = e.target.value;
                                        if (value === '' || (Number(value) > 0)) {
                                            setProjectData({...projectData, sqft: value});
                                        }
                                    }} placeholder="e.g., 500" className="w-full p-2 border border-gray-300 rounded-md"/>
                                </div>
                            </div>

                            <div>
                                <label className="font-semibold text-gray-700 block mb-2">Primary Use (select all that apply)</label>
                                <div className="grid grid-cols-2 gap-2">
                                    {USAGE_OPTIONS.map(opt => (
                                        <label key={opt} className={`flex items-center gap-2 p-3 border rounded-md cursor-pointer ${projectData.usage.includes(opt) ? 'bg-red-100 border-red-500' : 'border-gray-300'}`}>
                                            <input type="checkbox" checked={projectData.usage.includes(opt)} onChange={() => {
                                                const newUsage = projectData.usage.includes(opt) ? projectData.usage.filter(u => u !== opt) : [...projectData.usage, opt];
                                                setProjectData({...projectData, usage: newUsage});
                                            }} className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-600" />
                                            {opt}
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="font-semibold text-gray-700 block mb-2">Your Location</label>
                                    <select
                                        value={projectData.location}
                                        onChange={e => setProjectData({...projectData, location: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">Select area...</option>
                                        {LOCATION_OPTIONS.map(loc => (
                                            <option key={loc} value={loc}>{loc}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="font-semibold text-gray-700 block mb-2">Timeline</label>
                                    <select
                                        value={projectData.timeline}
                                        onChange={e => setProjectData({...projectData, timeline: e.target.value})}
                                        className="w-full p-2 border border-gray-300 rounded-md"
                                    >
                                        <option value="">When do you need it?</option>
                                        {TIMELINE_OPTIONS.map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <button onClick={handleNextStep} className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
                                Continue <ArrowRight />
                            </button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="text-center py-10">
                        <Loader2 className="w-16 h-16 text-red-500 mx-auto animate-spin mb-4"/>
                        <h3 className="font-bold text-2xl mb-4">Finding Your Perfect Match...</h3>
                        <p className="text-gray-600">We're analyzing your project to recommend the best turf options.</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8"><div className="bg-red-600 h-2.5 rounded-full animate-pulse" style={{width: '75%'}}></div></div>
                    </div>
                )}
                {step === 3 && analysisResult && (
                    <div>
                        <h3 className="font-bold text-2xl text-center mb-2">Recommended Products</h3>
                        <p className="text-center text-gray-600 mb-6">Based on your project details, here are our top recommendations. Your installer will discuss pricing and options.</p>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 mb-6">
                            <h4 className="font-semibold text-green-800">Project Summary:</h4>
                            <p className="text-green-700">{analysisResult.analysis}</p>
                        </div>
                        <div className="space-y-4">
                            {analysisResult.recommendations.map(rec => {
                                const product = allProducts.find(p => p.name === rec.productName);
                                return product && (
                                    <div key={rec.productName} className="p-4 border border-gray-200 rounded-lg flex gap-4">
                                        <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded-md"/>
                                        <div>
                                            <h4 className="font-bold text-lg">{product.name}</h4>
                                            <p className="text-sm text-gray-500">{product.description}</p>
                                            <div className="mt-2 p-2 bg-gray-50 border-l-4 border-red-500 rounded-r-md">
                                                <p className="text-sm text-gray-700"><strong className="text-gray-800">Why it's a match:</strong> {rec.reason}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                         <button onClick={handleNextStep} className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">
                            Get Connected with Installer <ArrowRight />
                        </button>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <h3 className="font-bold text-2xl mb-2 text-center">Almost There!</h3>
                        <p className="text-gray-600 text-center mb-6">Enter your contact info and a certified local installer will reach out within 24 hours.</p>
                        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
                            <h4 className="font-semibold text-gray-800 flex items-center justify-center gap-2"><MapPin className="w-5 h-5"/>Your Area</h4>
                            <p className="text-gray-600">{projectData.location || 'Location not specified'}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input type="text" placeholder="Full Name" className="w-full p-3 pl-10 border border-gray-300 rounded-md" value={contactInfo.name} onChange={e => setContactInfo({...contactInfo, name: e.target.value})} /></div>
                            <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input type="tel" placeholder="Phone Number (best way to reach you)" className="w-full p-3 pl-10 border border-gray-300 rounded-md" value={contactInfo.phone} onChange={e => setContactInfo({...contactInfo, phone: e.target.value})} /></div>
                            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input type="email" placeholder="Email Address" className="w-full p-3 pl-10 border border-gray-300 rounded-md" value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} /></div>
                            <div className="relative"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input type="text" placeholder="Property Address (optional)" className="w-full p-3 pl-10 border border-gray-300 rounded-md" value={contactInfo.address} onChange={e => setContactInfo({...contactInfo, address: e.target.value})} /></div>
                        </div>
                        <button onClick={() => setStep(5)} disabled={!isContactFormValid} className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2 disabled:bg-gray-300 disabled:cursor-not-allowed">
                            Request Callback <Calendar />
                        </button>
                        <p className="text-xs text-gray-500 text-center mt-3">By submitting, you agree to be contacted by a local installer.</p>
                    </div>
                )}
                 {step === 5 && (
                    <div className="text-center py-10">
                        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-4"/>
                        <h3 className="font-bold text-3xl mb-4">Request Received!</h3>
                        <p className="text-gray-600 mb-2">Thank you, {contactInfo.name}!</p>
                        <p className="text-gray-600 mb-6">A certified installer in the <strong>{projectData.location || 'your'}</strong> area will contact you within 24 hours to discuss your project and provide a detailed quote.</p>
                        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
                            <h4 className="font-semibold mb-2">What happens next:</h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                                <li>1. An installer will call to discuss your project</li>
                                <li>2. They'll schedule a free on-site consultation</li>
                                <li>3. You'll receive a detailed quote with no obligation</li>
                            </ul>
                        </div>
                        <button onClick={onClose} className="bg-red-600 text-white px-8 py-3 rounded-lg font-bold hover:bg-red-700 transition">Done</button>
                    </div>
                 )}
            </motion.div>
            </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

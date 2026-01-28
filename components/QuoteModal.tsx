
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, ArrowRight, Check, Calendar, Sparkles, User, Mail, Phone, Building2, CheckCircle } from 'lucide-react';
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
  });
  const [contactInfo, setContactInfo] = useState({ name: '', email: '', phone: '' });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<{ recommendations: { productName: string, reason: string }[], analysis: string } | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleNextStep = async () => {
    if (step === 1) { // Trigger analysis when moving from step 1 to 2
        setIsLoading(true);
        setStep(2); // Move to loading screen
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
            recommendations: [{ productName: "Absolute", reason: "A versatile and popular high-quality choice."}],
            analysis: "Could not generate a detailed analysis, but our team can help you find the perfect fit."
            });
        } finally {
            setIsLoading(false);
            setStep(3); // Move to results
        }
    } else {
      setStep(s => s + 1);
    }
  };
  
  const USAGE_OPTIONS = ["Pets", "Kids / Playground", "High Traffic", "Poolside", "Sports (e.g., golf)", "General Lawn"];

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
            <h2 className="text-2xl font-bold text-gray-900">Get Your AI-Powered Quote</h2>
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
                        <h3 className="font-bold text-xl mb-4">Project Details</h3>
                        <div className="space-y-4">
                            <div>
                                <label className="font-semibold text-gray-700 block mb-2">Project Area Photo (Optional)</label>
                                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                    <div className="text-center">
                                        {imagePreview ? <img src={imagePreview} alt="Preview" className="mx-auto h-32 w-auto mb-4"/> : <Upload className="mx-auto h-12 w-12 text-gray-300" />}
                                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                                            <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-red-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-red-600 focus-within:ring-offset-2 hover:text-red-500">
                                                <span>Upload a file</span>
                                                <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleImageChange} accept="image/*" />
                                            </label>
                                            <p className="pl-1">or drag and drop</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700 block mb-2">Approximate Square Footage</label>
                                <input type="number" value={projectData.sqft} onChange={e => setProjectData({...projectData, sqft: e.target.value})} placeholder="e.g., 500" className="w-full p-2 border border-gray-300 rounded-md"/>
                            </div>
                            <div>
                                <label className="font-semibold text-gray-700 block mb-2">Primary Usage (select all that apply)</label>
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
                            <div>
                                <label className="font-semibold text-gray-700 block mb-2">Project Location (City, State)</label>
                                <input type="text" value={projectData.location} onChange={e => setProjectData({...projectData, location: e.target.value})} placeholder="e.g., Houston, TX" className="w-full p-2 border border-gray-300 rounded-md"/>
                            </div>
                            <button onClick={handleNextStep} className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">Analyze Project <ArrowRight /></button>
                        </div>
                    </div>
                )}
                {step === 2 && (
                    <div className="text-center py-10">
                        <Sparkles className="w-16 h-16 text-red-500 mx-auto animate-pulse mb-4"/>
                        <h3 className="font-bold text-2xl mb-4">AI Analysis in Progress...</h3>
                        <p className="text-gray-600">Our AI is analyzing your project details to find the perfect turf. This will just take a moment.</p>
                        <div className="w-full bg-gray-200 rounded-full h-2.5 mt-8"><div className="bg-red-600 h-2.5 rounded-full animate-pulse" style={{width: '75%'}}></div></div>
                    </div>
                )}
                {step === 3 && analysisResult && (
                    <div>
                        <h3 className="font-bold text-2xl text-center mb-2">Your AI-Powered Recommendations</h3>
                        <p className="text-center text-gray-600 mb-6">Based on your project, here are the top products we recommend. No prices are shown to respect our dealer network.</p>
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 mb-6">
                            <h4 className="font-semibold text-red-800">AI Project Analysis:</h4>
                            <p className="text-red-700">{analysisResult.analysis}</p>
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
                                            <div className="mt-2 p-2 bg-red-50 border-l-4 border-red-500 rounded-r-md">
                                                <p className="text-sm text-red-700"><strong className="text-red-800">Why it's a match:</strong> {rec.reason}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                         <button onClick={handleNextStep} className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">Schedule Free Consultation <ArrowRight /></button>
                    </div>
                )}
                {step === 4 && (
                    <div>
                        <h3 className="font-bold text-2xl mb-2 text-center">Schedule Your Free Consultation</h3>
                        <p className="text-gray-600 text-center mb-6">One final step. Provide your contact info and our team from the nearest dealer will reach out to schedule a free, no-obligation consultation.</p>
                        <div className="bg-gray-100 p-4 rounded-lg mb-6 text-center">
                            <h4 className="font-semibold text-gray-800 flex items-center justify-center gap-2"><Building2 className="w-5 h-5"/>Your Nearest Dealer</h4>
                            <p className="text-gray-600">{dealers.find(d => d.address?.includes(projectData.location.split(',')[1]?.trim()))?.name || dealers[0].name}</p>
                            <p className="text-sm text-gray-500">{dealers.find(d => d.address?.includes(projectData.location.split(',')[1]?.trim()))?.address || dealers[0].address}</p>
                        </div>
                        <div className="space-y-4">
                            <div className="relative"><User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input type="text" placeholder="Full Name" className="w-full p-3 pl-10 border border-gray-300 rounded-md" value={contactInfo.name} onChange={e => setContactInfo({...contactInfo, name: e.target.value})} /></div>
                            <div className="relative"><Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input type="email" placeholder="Email Address" className="w-full p-3 pl-10 border border-gray-300 rounded-md" value={contactInfo.email} onChange={e => setContactInfo({...contactInfo, email: e.target.value})} /></div>
                            <div className="relative"><Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"/><input type="tel" placeholder="Phone Number" className="w-full p-3 pl-10 border border-gray-300 rounded-md" value={contactInfo.phone} onChange={e => setContactInfo({...contactInfo, phone: e.target.value})} /></div>
                        </div>
                        <button onClick={() => setStep(5)} className="w-full mt-6 bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition flex items-center justify-center gap-2">Submit Request <Calendar /></button>
                    </div>
                )}
                 {step === 5 && (
                    <div className="text-center py-10">
                        <CheckCircle className="w-20 h-20 text-red-500 mx-auto mb-4"/>
                        <h3 className="font-bold text-3xl mb-4">Consultation Requested!</h3>
                        <p className="text-gray-600 mb-6">Thank you, {contactInfo.name}! A representative from our local dealer will be in touch shortly to schedule your free consultation.</p>
                        <button onClick={onClose} className="bg-red-600 text-white p-3 rounded-lg font-bold hover:bg-red-700 transition">Close</button>
                    </div>
                 )}
            </motion.div>
            </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
}

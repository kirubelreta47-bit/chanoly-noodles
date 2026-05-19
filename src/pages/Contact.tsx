
import { useState } from "react";
import { motion } from "motion/react";
import { Phone, MapPin, Instagram, Facebook, Clock, Mail, Send, Star } from "lucide-react";

export default function Contact() {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating > 0) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setRating(0);
        setComment("");
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div>
            <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Say Hello</span>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-10">GET IN <span className="text-primary not-italic">TOUCH.</span></h1>
            
            <div className="space-y-12">
              <div className="flex gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm">
                  <MapPin size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">LOCATION</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Bole Road, behind Friendship Mall,<br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm">
                  <Phone size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">RESERVATIONS</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    092 734 9509
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded-[1.5rem] flex items-center justify-center text-primary shadow-sm">
                  <Clock size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-black mb-2">WORKING HOURS</h3>
                  <p className="text-gray-500 text-lg leading-relaxed">
                    Monday - Sunday<br />
                    11:00 AM - 10:00 PM
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-16 flex gap-4">
              <a href="https://www.instagram.com/chanoly_noodle_official/" target="_blank" rel="noreferrer" className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-colors shadow-lg">
                <Instagram size={24} />
              </a>
              <a href="https://web.facebook.com/p/Chanoly-Noodle-Official-61555720320412/?_rdc=1&_rdr" target="_blank" rel="noreferrer" className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-colors shadow-lg">
                <Facebook size={24} />
              </a>
              <a href="#" className="w-14 h-14 bg-black text-white rounded-2xl flex items-center justify-center hover:bg-primary transition-colors shadow-lg">
                <Mail size={24} />
              </a>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-black rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 md:p-16 text-white"
          >
            <h2 className="text-3xl font-black mb-8 italic">SEND A MESSAGE.</h2>
            <div className="space-y-6">
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Your Name</label>
                <input 
                  type="text" 
                  placeholder="Enter name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-primary transition-all text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Email Address</label>
                <input 
                  type="email" 
                  placeholder="name@email.com"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-primary transition-all text-lg"
                />
              </div>
              <div>
                <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Message</label>
                <textarea 
                  rows={4}
                  placeholder="Tell us something..."
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 outline-none focus:border-primary transition-all text-lg resize-none"
                />
              </div>
              <button className="w-full py-6 bg-primary text-white rounded-[1.5rem] font-black text-2xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl flex items-center justify-center gap-3">
                <Send size={24} />
                SEND MESSAGE
              </button>
            </div>
          </motion.div>
        </div>

        {/* Feedback Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 max-w-4xl mx-auto"
        >
          <div className="bg-white rounded-[3rem] p-10 md:p-16 border-2 border-gray-100 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            
            <div className="text-center mb-10 relative z-10">
              <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Customer Satisfaction</span>
              <h2 className="text-4xl md:text-5xl font-black italic tracking-tight">RATE YOUR EXPERIENCE.</h2>
            </div>

            {isSubmitted ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 relative z-10"
              >
                <div className="w-20 h-20 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Star size={40} fill="currentColor" />
                </div>
                <h3 className="text-3xl font-black italic mb-4">THANK YOU!</h3>
                <p className="text-gray-500 text-lg">Your feedback helps us serve you better next time.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleFeedbackSubmit} className="max-w-2xl mx-auto relative z-10">
                <div className="flex justify-center gap-2 mb-8">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoveredRating(star)}
                      onMouseLeave={() => setHoveredRating(0)}
                      onClick={() => setRating(star)}
                      className="transition-transform hover:scale-110 active:scale-95"
                    >
                      <Star 
                        size={48} 
                        className={`transition-colors ${
                          (hoveredRating || rating) >= star 
                            ? "text-primary fill-primary" 
                            : "text-gray-200"
                        }`} 
                      />
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-black uppercase tracking-widest text-gray-400 mb-2 block">Your Comments (Optional)</label>
                    <textarea 
                      rows={4}
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      placeholder="Tell us what you loved or how we can improve..."
                      className="w-full bg-gray-50 border border-gray-100 rounded-2xl p-5 outline-none focus:border-primary focus:bg-white transition-all text-lg resize-none"
                    />
                  </div>
                  <button 
                    type="submit"
                    disabled={rating === 0}
                    className="w-full py-5 bg-black text-white rounded-[1.5rem] font-black text-xl hover:bg-gray-900 active:scale-[0.98] transition-all shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    <Send size={20} />
                    SUBMIT FEEDBACK
                  </button>
                </div>
              </form>
            )}
          </div>
        </motion.div>

        {/* Map Section */}
        <div className="mt-32 h-[500px] bg-gray-100 rounded-[3.5rem] overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000 shadow-xl border border-gray-100">
           {/* In a real app, integrate Google Maps here */}
           <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
              <MapPin size={64} className="text-primary mb-6 animate-bounce" />
              <h3 className="text-3xl font-black mb-4 italic">WE ARE EVERYWHERE.</h3>
              <p className="text-gray-500 max-w-sm mb-10">Find Chanoly Noodles across Addis Ababa. Bole, Sarbet, Lebu, Summit, and more!</p>
              <a 
                href="https://www.google.com/maps/search/Chanoly+Noodles+Addis+Ababa" 
                target="_blank" 
                rel="noreferrer"
                className="px-10 py-4 bg-black text-white rounded-2xl font-black tracking-wider hover:bg-gray-900 transition-all flex items-center gap-3"
              >
                OPEN IN GOOGLE MAPS
                <ArrowRight size={20} />
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}

function ArrowRight({ size }: { size: number }) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

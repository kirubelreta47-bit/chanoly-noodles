
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShoppingCart, Search, Info, ChefHat, Sparkles, Send } from "lucide-react";
import { MENU_ITEMS } from "../constants/menu";

export default function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [aiQuestion, setAiQuestion] = useState("");
  const [aiAnswer, setAiAnswer] = useState("");
  const [isAiLoading, setIsAiLoading] = useState(false);

  const categories = ["All", ...MENU_ITEMS.map(cat => cat.category)];

  const filteredItems = MENU_ITEMS.flatMap(cat => 
    (activeCategory === "All" || cat.category === activeCategory) 
      ? cat.items.map(item => ({ ...item, category: cat.category }))
      : []
  ).filter(item => 
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getClientSideRecommendation = (question: string): string => {
    const q = question.toLowerCase();
    
    if (q.includes("spicy") || q.includes("hot") || q.includes("chili") || q.includes("fire")) {
      return "I highly recommend our Stir Fry Chicken Noodle (1,025 ETB) or the Beef Sizzling (1,275 ETB) served on a roaring hot plate. Both have that bold, spicy wok kick you're looking for!";
    }
    if (q.includes("veggie") || q.includes("vegetable") || q.includes("vegan") || q.includes("tofu") || q.includes("spinach") || q.includes("broccoli")) {
      return "You should try our Stir Vegetable Noodle (800 ETB) or the Broccoli Garlic (625 ETB). If you want something crispy, our Fried Tofu with special chili sauce (765 ETB) is a chef favorite!";
    }
    if (q.includes("smoothie") || q.includes("drink") || q.includes("beverage") || q.includes("fruit") || q.includes("sweet") || q.includes("avocado") || q.includes("mango")) {
      return "To quench your thirst, try one of our 100% natural, freshly blended Smoothies (250 ETB) in Mango, Avocado, or Strawberry. No added sugar, just pure fruit goodness!";
    }
    if (q.includes("chicken") || q.includes("lollipop")) {
      return "You can't go wrong with our Stir Fry Chicken Noodle (1,025 ETB). Or, if you want something to share, try the Chicken Lollipop (1,310 ETB) - 8 pieces on the bone, served sizzling!";
    }
    if (q.includes("beef") || q.includes("meat")) {
      return "Go for the Stir Fry Beef Noodle (985 ETB) or the Beef Fried Rice (875 ETB). For the ultimate experience, try our hot Beef Sizzling plate (1,275 ETB)!";
    }
    if (q.includes("fish") || q.includes("seafood")) {
      return "Try our Stir Fry Fish Noodle (875 ETB) or the Fish Fried Rice (810 ETB). They are light, healthy, and packed with flavor!";
    }
    if (q.includes("salad") || q.includes("healthy") || q.includes("diet")) {
      return "I recommend our famous Combo Salad (840 ETB). It has chicken, beef, fish, avocado sauce, and is topped with crispy Dirkosh (fried injera) for that perfect local crunch!";
    }
    if (q.includes("rice")) {
      return "Try our Combo Fried Rice (885 ETB), which features a mix of chicken, beef, and fish, cooked to perfection with soy sauce and vegetables.";
    }
    
    // Default recommendation
    return "How about trying our absolute favorite? The Combo Special Noodles (960 ETB) combines marinated stir-fried chicken breast and beef with fresh vegetables in our special house sauce. It's the best of both worlds!";
  };

  const handleAskChef = async () => {
    if (!aiQuestion.trim()) return;
    setIsAiLoading(true);
    setAiAnswer("");
    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: `User asks: ${aiQuestion}. The menu includes: ${JSON.stringify(MENU_ITEMS)}` }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to get AI response");
      }
      setAiAnswer(data.text);
    } catch (error) {
      // Fallback to client-side smart recommendation
      setAiAnswer(getClientSideRecommendation(aiQuestion));
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-primary font-black uppercase tracking-widest text-[10px] sm:text-sm mb-2 block">Fresh from the Wok</span>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black italic tracking-tighter">OUR MENU.</h1>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative flex-1 sm:flex-none">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="Search cravings..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 pr-4 py-3 bg-white rounded-xl border border-gray-100 focus:border-primary focus:ring-1 focus:ring-primary outline-none font-medium transition-all shadow-sm text-sm"
                />
              </div>
              <div className="flex gap-2">
                <a 
                  href="https://deliveraddis.com/restaurants/chanoly-noodles"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-xl font-black shadow-lg text-xs transition-all whitespace-nowrap"
                >
                  DeliverAddis
                </a>
                <a 
                  href="https://beudelivery.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-black text-white rounded-xl font-black shadow-lg text-xs transition-all whitespace-nowrap"
                >
                  beU Delivery
                </a>
              </div>
            </div>
          </div>

        {/* Categories - Sticky on mobile */}
        <div className="sticky top-[72px] z-30 -mx-4 px-4 py-3 bg-gray-50/80 backdrop-blur-md mb-8 overflow-x-auto no-scrollbar flex flex-nowrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-lg font-bold text-xs sm:text-sm transition-all whitespace-nowrap shadow-sm ${
                activeCategory === cat 
                  ? "bg-black text-white scale-105" 
                  : "bg-white text-gray-500 hover:bg-gray-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.name}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="group bg-white p-5 sm:p-6 rounded-2xl sm:rounded-[2rem] shadow-sm hover:shadow-xl transition-all border border-gray-100 relative overflow-hidden flex flex-col"
              >
                {item.tag && (
                  <div className="absolute top-3 right-3 bg-primary text-white px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-1 z-10">
                    <Sparkles size={10} />
                    {item.tag}
                  </div>
                )}
                <div className="mb-4 sm:mb-6">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary mb-1 block">{item.category}</span>
                  <h3 className="text-xl sm:text-2xl font-black mb-2 group-hover:text-primary transition-colors leading-tight">{item.name}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm leading-relaxed mb-4 italic line-clamp-3 sm:line-clamp-none">{item.description}</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-auto pt-4 border-t border-gray-50">
                  <span className="text-lg sm:text-xl font-black text-black">{item.price}</span>
                  <div className="flex gap-2 w-full sm:w-auto">
                    <a 
                      href="https://deliveraddis.com/restaurants/chanoly-noodles" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 sm:flex-none text-center text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-2 bg-gray-100 rounded-lg hover:bg-primary hover:text-white transition-colors"
                    >
                      DeliverAddis
                    </a>
                    <a 
                      href="https://beudelivery.com/" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="flex-1 sm:flex-none text-center text-[10px] sm:text-xs font-bold px-2.5 sm:px-3 py-2 bg-gray-100 rounded-lg hover:bg-black hover:text-white transition-colors"
                    >
                      beU
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* AI Chef Interactive Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-32 p-8 md:p-12 bg-black rounded-[3rem] text-white relative overflow-hidden border-4 border-primary/20"
        >
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-primary rounded-2xl">
                  <ChefHat size={32} />
                </div>
                <div>
                  <h2 className="text-3xl font-black tracking-tight">ASK THE CHEF.</h2>
                  <p className="text-primary font-bold text-sm tracking-widest uppercase">AI RECOMMENDATIONS</p>
                </div>
              </div>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed italic">
                Can't decide what to order? Ask our virtual Chef for recommendations based on your mood or taste preferences.
              </p>
              
              <div className="relative mb-6">
                <input 
                  type="text" 
                  placeholder="I'm feeling spicy, what should I get?"
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleAskChef()}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 pr-20 outline-none focus:border-primary transition-all text-lg"
                />
                <button 
                  onClick={handleAskChef}
                  disabled={isAiLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-4 bg-primary rounded-xl text-white hover:scale-105 transition-all active:scale-95 disabled:opacity-50"
                >
                  <Send size={24} />
                </button>
              </div>

              {isAiLoading && (
                 <div className="flex gap-2 items-center text-primary font-bold italic animate-pulse">
                   <Sparkles size={18} />
                   Chef is thinking...
                 </div>
              )}

              {aiAnswer && (
                 <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-6 bg-white/5 rounded-2xl border border-white/10 italic text-lg"
                 >
                   "{aiAnswer}"
                 </motion.div>
              )}
            </div>
            
            <div className="hidden lg:block relative">
              <div className="aspect-square bg-white/5 rounded-3xl border border-white/10 overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1512058560555-587930ed6957?auto=format&fit=crop&q=80&w=800" 
                  alt="Chef at work"
                  className="w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

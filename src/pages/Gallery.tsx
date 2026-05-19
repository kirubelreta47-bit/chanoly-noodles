
import { motion } from "motion/react";
import { GALLERY_IMAGES } from "../constants/menu";
import { Instagram, ExternalLink } from "lucide-react";

export default function Gallery() {
  return (
    <div className="min-h-screen bg-white pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div className="max-w-2xl">
            <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">Our Visual Story</span>
            <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter leading-none mb-6">THE FEED.</h1>
            <p className="text-gray-500 text-xl font-medium leading-relaxed">
              A glimpse into our kitchen, our passion, and our delicious results. Snap, tag, and feast.
            </p>
          </div>
          
          <a 
            href="https://www.instagram.com/chanoly_noodle_official/" 
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-black text-white rounded-2xl font-black text-lg hover:bg-gray-900 transition-all shadow-xl shadow-black/10"
          >
            <Instagram size={24} />
            FOLLOW @CHANOLY
          </a>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
          {GALLERY_IMAGES.map((src, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="relative group overflow-hidden rounded-[2.5rem] break-inside-avoid"
            >
              <img 
                src={src} 
                alt={`Chanoly Dish ${idx}`} 
                className="w-full h-auto object-cover grayscale-[0.8] group-hover:grayscale-0 transition-all duration-700 hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-8">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-white font-black italic text-lg capitalize">Noodle Craft</p>
                    <p className="text-primary font-bold text-sm">#ChanolyNoodles</p>
                  </div>
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                    <ExternalLink size={20} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 p-12 md:p-20 bg-black text-white rounded-[4rem] text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/20 to-transparent pointer-events-none" />
           <div className="relative z-10">
             <div className="inline-flex items-center gap-2 px-6 py-2 bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary rounded-full text-sm font-black uppercase tracking-[0.2em] mb-8">
               <Instagram size={16} />
               Weekly Giveaway
             </div>
             <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight italic">SNAP, TAG & WIN!</h2>
             <p className="text-gray-300 text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
               Show us how you enjoy your Chanoly! Post a photo of yourself eating or just a great shot of your food, and tag <span className="text-primary font-bold">@chanoly_noodle_official</span> on Instagram. Or, simply DM us your best pictures enjoying our meals!
             </p>
             <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-3xl max-w-3xl mx-auto mb-12">
                <h3 className="text-2xl font-black text-primary mb-4">WHAT YOU CAN WIN</h3>
                <p className="text-lg font-medium text-white/90">
                  Every week, the best photos win <span className="text-white font-black underline decoration-primary underline-offset-4">FREE Vouchers, Free Noodles, or Free Smoothies!</span>
                </p>
             </div>
             <a 
                href="https://www.instagram.com/chanoly_noodle_official/" 
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-3 px-10 py-5 bg-primary text-white rounded-full font-black text-xl hover:scale-105 active:scale-95 transition-all shadow-[0_0_40px_-10px_rgba(234,88,12,0.6)]"
              >
                <Instagram size={24} />
                TAG US NOW
              </a>
           </div>
        </div>
      </div>
    </div>
  );
}

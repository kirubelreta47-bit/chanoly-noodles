
import { Link } from "react-router-dom";
import { Instagram, Facebook, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="inline-block mb-6">
              <span className="text-3xl font-black italic">CHANOLY <span className="text-primary">SMOOTHIE & NOODLES.</span></span>
            </Link>
            <p className="text-gray-400 max-w-sm mb-8 leading-relaxed">
              Authentic stir-fried noodles and refreshing smoothies served with a modern twist. Fresh ingredients, bold flavors, and served with a passion for excellence in Addis Ababa.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/chanoly_noodle_official/" target="_blank" rel="noreferrer" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center hover:bg-primary hover:border-primary transition-all">
                <Facebook size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">QUICK LINKS</h4>
            <div className="flex flex-col space-y-4">
              <Link to="/" className="text-gray-400 hover:text-primary transition-colors">Home</Link>
              <Link to="/menu" className="text-gray-400 hover:text-primary transition-colors">Our Menu</Link>
              <Link to="/gallery" className="text-gray-400 hover:text-primary transition-colors">Gallery</Link>
              <Link to="/contact" className="text-gray-400 hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-6">VISIT US</h4>
            <div className="flex flex-col space-y-4 text-gray-400">
              <div className="flex gap-3">
                <MapPin size={18} className="text-primary shrink-0" />
                <span>Bole Road, behind Friendship Mall, Addis Ababa</span>
              </div>
              <div className="flex gap-3">
                <Phone size={18} className="text-primary shrink-0" />
                <span>092 734 9509</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-500 text-sm italic">© {new Date().getFullYear()} Chanoly Smoothie & Noodles. Made with passion.</p>
          <div className="flex gap-8">
            <a href="https://deliveraddis.com/restaurants/chanoly-noodles" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">DeliverAddis</a>
            <a href="https://beudelivery.com/" className="text-xs font-bold uppercase tracking-widest text-primary hover:underline">beU Delivery</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

import { motion, useScroll, useTransform, useSpring, useInView } from "motion/react";
import { Link } from "react-router-dom";
import { ShoppingCart, ArrowRight, Star, Flame, Sparkles } from "lucide-react";
import { useRef } from "react";

/* ─── Reusable fade-up on scroll ─── */
function FadeUp({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  /* ── Parallax refs ── */
  const heroRef = useRef(null);
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const bgY = useTransform(heroScroll, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(heroScroll, [0, 0.8], [1, 0]);
  const heroScale = useTransform(heroScroll, [0, 1], [1, 1.06]);

  /* ── Horizontal marquee (CSS only) ── */
  const marqueeText = "BOLDER FLAVOURS · HOT WOK · FRESH SMOOTHIES · ";

  return (
    <div className="overflow-hidden">
      {/* ════════════════════════════════
          HERO
      ════════════════════════════════ */}
      <section
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center pt-20"
      >
        {/* Parallax BG */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: bgY, scale: heroScale }}
        >
          <img
            src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&q=80&w=2000"
            alt="Hero Background"
            className="w-full h-full object-cover brightness-[0.3]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/50" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-20"
        >
          {/* Badge */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-2 px-6 py-2 bg-primary/20 backdrop-blur-xl border border-primary/30 text-primary rounded-full text-sm font-black uppercase tracking-[0.2em] mb-8"
          >
            <motion.span
              animate={{ rotate: [0, 15, -15, 0] }}
              transition={{ duration: 1.4, repeat: Infinity, repeatDelay: 2 }}
            >
              <Flame size={16} />
            </motion.span>
            The Wok is Hot
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-4xl sm:text-7xl md:text-[10rem] font-black text-white leading-[0.9] tracking-tighter mb-8 italic"
          >
            BOLDER
            <br />
            <span className="text-primary not-italic text-4xl sm:text-6xl md:text-[6rem] block mt-4">
              SMOOTHIES & NOODLES.
            </span>
          </motion.h1>

          {/* CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55, duration: 0.7 }}
            className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-16 mt-8 sm:mt-12"
          >
            {/* Stars blurb */}
            <div className="max-w-[200px] text-center md:text-left">
              <div className="flex justify-center md:justify-start gap-1 text-primary mb-2">
                {[...Array(5)].map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.08 }}
                  >
                    <Star size={14} fill="currentColor" />
                  </motion.span>
                ))}
              </div>
              <p className="text-white/60 text-xs sm:text-sm font-medium italic">
                "Fresh, fast, and remarkably bold flavors."
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto px-4 sm:px-0">
              {/* Explore Menu — animated orange & black pill */}
              <Link
                to="/menu"
                className="
                  group relative inline-flex items-center justify-center gap-2
                  w-full sm:w-auto max-w-[10rem] mx-auto sm:mx-0
                  px-4 py-3 text-sm font-black tracking-widest uppercase
                  rounded-xl border border-primary bg-black
                  text-primary hover:bg-primary hover:text-black
                  transition-all duration-300 overflow-hidden shadow-xl
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  EXPLORE MENU
                  <ArrowRight
                    size={6}
                    className="group-hover:translate-x-1 transition-transform duration-300"
                  />
                </span>
                <motion.div
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-primary/30 to-transparent skew-x-12"
                />
              </Link>

              {/* Delivery buttons */}
              <div className="flex flex-col gap-2.5">
                <motion.a
                  href="https://deliveraddis.com/restaurants/chanoly-noodles"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-white font-black rounded-xl text-sm shadow-xl"
                >
                  <ShoppingCart size={16} />
                  DeliverAddis
                </motion.a>
                <motion.a
                  href="https://beudelivery.com/"
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-black border border-white/10 text-white font-black rounded-xl text-sm shadow-xl"
                >
                  <ShoppingCart size={16} />
                  beU Delivery
                </motion.a>
              </div>
            </div>

            {/* Prep time stat */}
            <div className="max-w-xs text-right hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 }}
                className="text-primary text-4xl font-black mb-1"
              >
                10MIN
              </motion.div>
              <p className="text-white/60 text-sm font-medium uppercase tracking-widest">
                Average Prep Time
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll indicator removed */}
      </section>

      {/* ════════════════════════════════
          MARQUEE STRIP
      ════════════════════════════════ */}
      <div className="overflow-hidden bg-primary py-4 select-none">
        <div
          className="flex whitespace-nowrap"
          style={{ animation: "marqueeScroll 18s linear infinite" }}
        >
          {[...Array(4)].map((_, i) => (
            <span
              key={i}
              className="text-white font-black uppercase tracking-widest text-sm mr-12"
            >
              {marqueeText}
            </span>
          ))}
        </div>
        <style>{`
          @keyframes marqueeScroll {
            from { transform: translateX(0); }
            to   { transform: translateX(-50%); }
          }
        `}</style>
      </div>

      {/* ════════════════════════════════
          FEATURED DISH
      ════════════════════════════════ */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            {/* Image */}
            <FadeUp className="lg:w-1/2 relative">
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 0 }}
                  initial={{ rotate: 3 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-square bg-gray-100 rounded-[3rem] overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1552611052-33e04de081de?auto=format&fit=crop&q=80&w=800"
                    alt="Signature Dish"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-primary rounded-[3rem] -z-10 -rotate-6" />
              </div>
              {/* Badge */}
              <motion.div
                animate={{ rotate: [12, 18, 12] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-10 right-0 z-20 w-32 h-32 bg-black text-white rounded-full flex flex-col items-center justify-center text-center p-4 shadow-2xl"
              >
                <span className="text-xs font-bold uppercase">Must Try</span>
                <span className="text-xl font-black text-primary">#1</span>
              </motion.div>
            </FadeUp>

            {/* Copy */}
            <div className="lg:w-1/2">
              <FadeUp delay={0.1}>
                <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">
                  Signature Series
                </span>
              </FadeUp>
              <FadeUp delay={0.18}>
                <h2 className="text-5xl md:text-7xl font-black mb-8 italic">
                  THE SPECIAL MIX.
                </h2>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
                  Our legendary bowl that started it all. Hand-pulled wheat noodles
                  flash-fried in a roaring wok with soy-glazed chicken, tender beef
                  strips, and a mountain of seasonal vegetables.
                </p>
              </FadeUp>
              <FadeUp delay={0.32}>
                <div className="flex flex-wrap gap-4 mb-12">
                  {["Farm Fresh", "Soy Glazed", "Hand Pulled", "Wok Hei"].map(
                    (tag, i) => (
                      <motion.div
                        key={tag}
                        whileHover={{ y: -3, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="px-5 py-2 bg-gray-100 rounded-xl font-bold text-sm flex items-center gap-2"
                      >
                        <Sparkles size={14} className="text-primary" />
                        {tag}
                      </motion.div>
                    )
                  )}
                </div>
              </FadeUp>
              <FadeUp delay={0.38}>
                <Link
                  to="/menu"
                  className="inline-flex items-center gap-4 text-2xl font-black hover:text-primary transition-colors group"
                >
                  BROWSE ALL DISHES
                  <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          FEATURED SMOOTHIE
      ════════════════════════════════ */}
      <section className="py-32 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-20">
            {/* Image */}
            <FadeUp className="lg:w-1/2 relative">
              <div className="relative z-10">
                <motion.div
                  whileHover={{ rotate: 0 }}
                  initial={{ rotate: -3 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="aspect-square bg-white rounded-[3rem] overflow-hidden shadow-2xl"
                >
                  <img
                    src="https://images.unsplash.com/photo-1556881286-fc6915169721?auto=format&fit=crop&q=80&w=800"
                    alt="Fresh Smoothie"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
                <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary rounded-[3rem] -z-10 rotate-6" />
              </div>
            </FadeUp>

            {/* Copy */}
            <div className="lg:w-1/2">
              <FadeUp delay={0.1}>
                <span className="text-primary font-black uppercase tracking-widest text-sm mb-4 block">
                  Refreshing Drinks
                </span>
              </FadeUp>
              <FadeUp delay={0.18}>
                <h2 className="text-5xl md:text-7xl font-black mb-8 italic">
                  FRESH SMOOTHIES.
                </h2>
              </FadeUp>
              <FadeUp delay={0.25}>
                <p className="text-gray-500 text-lg mb-10 leading-relaxed font-medium">
                  Quench your thirst with our freshly blended smoothies. Made from 100%
                  natural fruits, with no added sugars or preservatives. The perfect
                  companion to your hot noodles.
                </p>
              </FadeUp>
              <FadeUp delay={0.32}>
                <div className="flex flex-wrap gap-4 mb-12">
                  {["100% Natural", "No Added Sugar", "Fresh Fruits", "Ice Cold"].map(
                    (tag) => (
                      <motion.div
                        key={tag}
                        whileHover={{ y: -3, scale: 1.04 }}
                        transition={{ type: "spring", stiffness: 300 }}
                        className="px-5 py-2 bg-white rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm"
                      >
                        <Sparkles size={14} className="text-primary" />
                        {tag}
                      </motion.div>
                    )
                  )}
                </div>
              </FadeUp>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════
          QUICK CTA
      ════════════════════════════════ */}
      <section className="py-20 bg-primary overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
          <FadeUp>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-10 italic">
              CRAVING A MEAL?
            </h2>
          </FadeUp>
          <FadeUp delay={0.15}>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <motion.a
                href="https://deliveraddis.com/restaurants/chanoly-noodles"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-4 px-8 py-5 bg-black text-white rounded-2xl font-black text-xl shadow-2xl"
              >
                <ShoppingCart size={24} />
                DELIVERADDIS
              </motion.a>
              <motion.a
                href="https://beudelivery.com/"
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center justify-center gap-4 px-8 py-5 bg-white text-black rounded-2xl font-black text-xl shadow-2xl"
              >
                <ShoppingCart size={24} />
                BEU DELIVERY
              </motion.a>
            </div>
          </FadeUp>
        </div>

        {/* Scrolling background text */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-white/5 text-[20rem] font-black pointer-events-none whitespace-nowrap italic">
          CHANOLY CHANOLY CHANOLY
        </div>
      </section>
    </div>
  );
}
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import QuoteDialog from "@/components/QuoteDialog";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-copper-wires.jpg";
import copperFlowImage from "@/assets/hero-copper-flow.jpg";
import copperFlowVideoAsset from "@/assets/hero-copper-flow.mp4.asset.json";
import { assetUrl } from "@/lib/assetUrl";

const copperFlowVideo = assetUrl(copperFlowVideoAsset);

const slides = [
  {
    image: copperFlowImage,
    video: copperFlowVideo,
    alt: "Copper rods and conductor coils flowing through the Rational Engineers production line",
    eyebrow: "Precision in Every Conductor",
    title: "From Copper Rod to Performance",
    description:
      "Precision-drawn copper flows through controlled manufacturing processes to become reliable conductors engineered for demanding electrical applications.",
  },
  {
    image: heroImage,
    video: null as string | null,
    alt: "Copper wire rod coils on the Rational Engineers manufacturing floor",
    eyebrow: "Product Engineering Partner · Established 1989",
    title: "Empowering Transformation",
    description:
      "Your product engineering partner for high performance copper CTC conductors, enamelled winding wires, busbars and paper covered strips. Engineered in India for transformer, motor and infrastructure OEMs across four continents.",
  },
];

const Hero = () => {
  const [isQuoteOpen, setIsQuoteOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = window.setInterval(
      () => setActiveSlide((current) => (current + 1) % slides.length),
      7000,
    );
    return () => window.clearInterval(timer);
  }, [isPaused, reduceMotion]);

  const slide = slides[activeSlide];

  return (
    <section
      className="relative flex min-h-[88vh] items-end overflow-hidden bg-foreground"
      aria-roledescription="carousel"
      aria-label="Rational Engineers introduction"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={() => setIsPaused(false)}
    >
      <AnimatePresence initial={false} mode="sync">
        {slide.video && !reduceMotion ? (
          <motion.div
            key={slide.video}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8 } }}
          >
            <video
              className="pointer-events-none h-full w-full object-cover"
              src={slide.video}
              poster={slide.image}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-label={slide.alt}
            />
          </motion.div>
        ) : (
          <motion.img
            key={slide.image}
            src={slide.image}
            alt={slide.alt}
            className="absolute inset-0 h-full w-full object-cover"
            loading={activeSlide === 0 ? "eager" : "lazy"}
            decoding="async"
            initial={{ opacity: 0, scale: reduceMotion ? 1 : 1.04 }}
            animate={{ opacity: 1, scale: reduceMotion ? 1 : 1.08 }}
            exit={{ opacity: 0 }}
            transition={{ opacity: { duration: 0.8 }, scale: { duration: 7.5, ease: "linear" } }}
          />
        )}
      </AnimatePresence>

      

      {/* Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-foreground/95 via-foreground/70 to-foreground/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-foreground/90 via-transparent to-foreground/50" />

      {/* Content */}
      <div className="relative z-10 container mx-auto w-full px-6 pb-20 pt-48 md:pb-24 md:pt-60 lg:pt-64">
        <div className="max-w-4xl">
          <motion.div
            key={`${activeSlide}-eyebrow`}
            initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 flex items-center gap-4"
          >
            <span className="h-px w-12 bg-rational-red" />
            <span className="text-xs font-medium uppercase text-background/70 md:text-sm">
              {slide.eyebrow}
            </span>
          </motion.div>

          <h1 className="mb-8 min-h-[1.9em] text-5xl font-light text-background text-architectural md:text-7xl lg:text-[5rem]">
            <AnimatePresence mode="wait">
              <motion.span
                key={slide.title}
                className="block"
                initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduceMotion ? 0 : -16 }}
                transition={{ duration: 0.55 }}
              >
                {slide.title}
              </motion.span>
            </AnimatePresence>
          </h1>

          <AnimatePresence mode="wait">
            <motion.p
              key={slide.description}
              className="mb-10 max-w-2xl text-base font-light leading-relaxed text-background/70 md:text-xl"
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, delay: 0.08 }}
            >
              {slide.description}
            </motion.p>
          </AnimatePresence>

          <div className="flex flex-wrap gap-4">
            <Button asChild className="group h-auto rounded-none bg-rational-red px-10 py-5 text-xs font-bold uppercase hover:bg-rational-red/90">
              <a href="#products">
                Explore Products
                <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </Button>
            <Button
              variant="outline"
              onClick={() => setIsQuoteOpen(true)}
              className="h-auto rounded-none border-background/25 bg-transparent px-10 py-5 text-xs font-bold uppercase text-background hover:bg-background/10 hover:text-background"
            >
              Request a Quote
            </Button>
          </div>
        </div>

        <div className="mt-10 flex items-center gap-3" aria-label="Select banner slide">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-background hover:bg-background/10 hover:text-background"
            onClick={() => setActiveSlide((current) => (current - 1 + slides.length) % slides.length)}
            aria-label="Previous slide"
          >
            <ArrowLeft />
          </Button>
          {slides.map((item, index) => (
            <Button
              key={item.title}
              type="button"
              variant="ghost"
              onClick={() => setActiveSlide(index)}
              className={`h-1 min-w-0 rounded-none p-0 transition-all duration-300 hover:bg-rational-red ${index === activeSlide ? "w-12 bg-rational-red" : "w-6 bg-background/40"}`}
              aria-label={`Show slide ${index + 1}: ${item.title}`}
              aria-current={index === activeSlide}
            />
          ))}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="rounded-full text-background hover:bg-background/10 hover:text-background"
            onClick={() => setActiveSlide((current) => (current + 1) % slides.length)}
            aria-label="Next slide"
          >
            <ArrowRight />
          </Button>
        </div>
      </div>

      <QuoteDialog open={isQuoteOpen} onOpenChange={setIsQuoteOpen} />
    </section>
  );
};

export default Hero;

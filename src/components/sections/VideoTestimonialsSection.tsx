import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Play } from "lucide-react";
import { fadeUpVariants, staggerContainer, viewportSettings } from "@/lib/animations";
import VideoPlayer from "@/components/ui/VideoPlayer";

// Demo video testimonials - replace with actual video URLs
const videoTestimonials = [
  {
    id: 1,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    posterUrl: "",
    quote: "Auxility transformed our entire digital banking experience. The platform they built handles millions of transactions seamlessly.",
    author: "Sarah Chen",
    role: "CTO",
    company: "FinanceFlow",
    industry: "FinTech",
  },
  {
    id: 2,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    posterUrl: "",
    quote: "The telemedicine platform exceeded all our expectations. Patient engagement increased by 60% in just three months.",
    author: "Dr. Michael Roberts",
    role: "Chief Medical Officer",
    company: "Regional Health Network",
    industry: "Healthcare",
  },
  {
    id: 3,
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    posterUrl: "",
    quote: "Working with Auxility felt like having an extended team. They understood our compliance needs from day one.",
    author: "Emily Watson",
    role: "VP of Technology",
    company: "MedTech Solutions",
    industry: "Healthcare",
  },
];

const VideoTestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [isCarouselFocused, setIsCarouselFocused] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  const thumbnailRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  const goToPrevious = useCallback(() => {
    setPlayingIndex(null);
    setActiveIndex((current) => 
      (current - 1 + videoTestimonials.length) % videoTestimonials.length
    );
  }, []);

  const goToNext = useCallback(() => {
    setPlayingIndex(null);
    setActiveIndex((current) => 
      (current + 1) % videoTestimonials.length
    );
  }, []);

  const goToSlide = useCallback((index: number) => {
    setPlayingIndex(null);
    setActiveIndex(index);
  }, []);

  // Announce slide changes to screen readers
  useEffect(() => {
    if (liveRegionRef.current) {
      const testimonial = videoTestimonials[activeIndex];
      liveRegionRef.current.textContent = `Slide ${activeIndex + 1} of ${videoTestimonials.length}: ${testimonial.author}, ${testimonial.role} at ${testimonial.company}`;
    }
  }, [activeIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isCarouselFocused) return;

      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case "Home":
          e.preventDefault();
          goToSlide(0);
          break;
        case "End":
          e.preventDefault();
          goToSlide(videoTestimonials.length - 1);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isCarouselFocused, goToPrevious, goToNext, goToSlide]);

  // Focus management for thumbnails
  useEffect(() => {
    if (thumbnailRefs.current[activeIndex] && isCarouselFocused) {
      thumbnailRefs.current[activeIndex]?.focus();
    }
  }, [activeIndex, isCarouselFocused]);

  const handleVideoPlay = (index: number) => {
    setPlayingIndex(index);
  };

  const handleVideoPause = () => {
    setPlayingIndex(null);
  };

  const handleCarouselFocus = () => {
    setIsCarouselFocused(true);
  };

  const handleCarouselBlur = (e: React.FocusEvent) => {
    if (!carouselRef.current?.contains(e.relatedTarget as Node)) {
      setIsCarouselFocused(false);
    }
  };

  return (
    <section 
      id="video-testimonials" 
      className="py-28 md:py-40 bg-background relative overflow-hidden"
      aria-label="Video testimonials from clients"
    >
      {/* Screen reader live region for announcements */}
      <div
        ref={liveRegionRef}
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[600px] bg-gradient-radial from-accent/5 via-transparent to-transparent rounded-full" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <motion.span
            variants={fadeUpVariants}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-semibold mb-6 tracking-wide"
          >
            Video Testimonials
          </motion.span>
          <motion.h2
            variants={fadeUpVariants}
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-6 leading-tight"
          >
            Hear From Our Clients
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-muted-foreground text-lg md:text-xl leading-relaxed"
          >
            Watch success stories from industry leaders who chose to partner with us.
          </motion.p>
        </motion.div>

        {/* Video Carousel */}
        <motion.div
          ref={carouselRef}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={fadeUpVariants}
          className="max-w-5xl mx-auto"
          onFocus={handleCarouselFocus}
          onBlur={handleCarouselBlur}
          role="region"
          aria-roledescription="carousel"
          aria-label="Video testimonials carousel"
        >
          {/* Keyboard hint */}
          <div className="sr-only">
            Use left and right arrow keys to navigate between testimonials. Press Home to go to first slide, End to go to last slide.
          </div>

          <div 
            className="grid lg:grid-cols-2 gap-8 items-center"
            role="group"
            aria-roledescription="slide"
            aria-label={`${activeIndex + 1} of ${videoTestimonials.length}`}
          >
            {/* Video Player */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -50 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="aspect-video rounded-3xl overflow-hidden shadow-2xl shadow-accent/10"
                >
                  <VideoPlayer
                    src={videoTestimonials[activeIndex].videoUrl}
                    poster={videoTestimonials[activeIndex].posterUrl}
                    title={`${videoTestimonials[activeIndex].author} - ${videoTestimonials[activeIndex].company}`}
                    className="w-full h-full"
                    onPlay={() => handleVideoPlay(activeIndex)}
                    onPause={handleVideoPause}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Industry badge */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-semibold ${
                  videoTestimonials[activeIndex].industry === "FinTech"
                    ? "bg-fintech/90 text-fintech-foreground"
                    : "bg-healthcare/90 text-healthcare-foreground"
                }`}
                aria-label={`Industry: ${videoTestimonials[activeIndex].industry}`}
              >
                {videoTestimonials[activeIndex].industry}
              </motion.div>
            </div>

            {/* Quote and Info */}
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-accent/10" aria-hidden="true" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="pl-8"
                >
                  <blockquote>
                    <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
                      "{videoTestimonials[activeIndex].quote}"
                    </p>

                    <footer className="flex items-center gap-4">
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-display font-bold text-lg shadow-lg ${
                          videoTestimonials[activeIndex].industry === "FinTech"
                            ? "bg-gradient-to-br from-fintech to-fintech/80 shadow-fintech/25"
                            : "bg-gradient-to-br from-healthcare to-healthcare/80 shadow-healthcare/25"
                        }`}
                        aria-hidden="true"
                      >
                        {videoTestimonials[activeIndex].author.split(" ").map(n => n[0]).join("")}
                      </motion.div>
                      
                      <cite className="not-italic">
                        <div className="font-display font-bold text-foreground text-lg">
                          {videoTestimonials[activeIndex].author}
                        </div>
                        <div className="text-muted-foreground">
                          {videoTestimonials[activeIndex].role}, {videoTestimonials[activeIndex].company}
                        </div>
                      </cite>
                    </footer>
                  </blockquote>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <nav 
            className="flex items-center justify-center gap-6 mt-12"
            aria-label="Testimonial navigation"
          >
            {/* Dots */}
            <div className="flex gap-2" role="tablist" aria-label="Select testimonial">
              {videoTestimonials.map((testimonial, index) => (
                <motion.button
                  key={index}
                  role="tab"
                  aria-selected={index === activeIndex}
                  aria-label={`View testimonial from ${testimonial.author}`}
                  tabIndex={index === activeIndex ? 0 : -1}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => goToSlide(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                    index === activeIndex
                      ? "w-10 bg-accent"
                      : "w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40"
                  }`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className="p-3 rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-5 h-5" aria-hidden="true" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className="p-3 rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-5 h-5" aria-hidden="true" />
              </motion.button>
            </div>
          </nav>

          {/* Thumbnail strip */}
          <div 
            className="flex justify-center gap-4 mt-8" 
            role="tablist" 
            aria-label="Video thumbnails"
          >
            {videoTestimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Play video testimonial from ${testimonial.author}, ${testimonial.role} at ${testimonial.company}`}
                tabIndex={index === activeIndex ? 0 : -1}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => goToSlide(index)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    e.preventDefault();
                    const nextIndex = (index + 1) % videoTestimonials.length;
                    goToSlide(nextIndex);
                    thumbnailRefs.current[nextIndex]?.focus();
                  } else if (e.key === "ArrowLeft") {
                    e.preventDefault();
                    const prevIndex = (index - 1 + videoTestimonials.length) % videoTestimonials.length;
                    goToSlide(prevIndex);
                    thumbnailRefs.current[prevIndex]?.focus();
                  }
                }}
                className={`relative w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  index === activeIndex
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <div 
                  className={`absolute inset-0 ${
                    testimonial.industry === "FinTech"
                      ? "bg-gradient-to-br from-fintech/30 to-fintech/10"
                      : "bg-gradient-to-br from-healthcare/30 to-healthcare/10"
                  }`} 
                  aria-hidden="true"
                />
                <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-foreground/70" />
                </div>
                <span 
                  className="absolute bottom-1 left-1 text-[10px] md:text-xs text-foreground/80 font-medium truncate max-w-[90%]"
                  aria-hidden="true"
                >
                  {testimonial.author.split(" ")[0]}
                </span>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default VideoTestimonialsSection;

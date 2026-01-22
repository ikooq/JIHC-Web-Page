import { useState, useRef, useCallback } from "react";
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
  const carouselRef = useRef<HTMLDivElement>(null);

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

  const handleVideoPlay = (index: number) => {
    setPlayingIndex(index);
  };

  const handleVideoPause = () => {
    setPlayingIndex(null);
  };

  return (
    <section id="video-testimonials" className="py-28 md:py-40 bg-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
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
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center">
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
              >
                {videoTestimonials[activeIndex].industry}
              </motion.div>
            </div>

            {/* Quote and Info */}
            <div className="relative">
              <Quote className="absolute -top-4 -left-4 w-12 h-12 text-accent/10" />
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="pl-8"
                >
                  <p className="text-xl md:text-2xl text-foreground font-medium leading-relaxed mb-8">
                    "{videoTestimonials[activeIndex].quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-display font-bold text-lg shadow-lg ${
                        videoTestimonials[activeIndex].industry === "FinTech"
                          ? "bg-gradient-to-br from-fintech to-fintech/80 shadow-fintech/25"
                          : "bg-gradient-to-br from-healthcare to-healthcare/80 shadow-healthcare/25"
                      }`}
                    >
                      {videoTestimonials[activeIndex].author.split(" ").map(n => n[0]).join("")}
                    </motion.div>
                    
                    <div>
                      <div className="font-display font-bold text-foreground text-lg">
                        {videoTestimonials[activeIndex].author}
                      </div>
                      <div className="text-muted-foreground">
                        {videoTestimonials[activeIndex].role}, {videoTestimonials[activeIndex].company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            {/* Dots */}
            <div className="flex gap-2">
              {videoTestimonials.map((_, index) => (
                <motion.button
                  key={index}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    setPlayingIndex(null);
                    setActiveIndex(index);
                  }}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === activeIndex
                      ? "w-10 bg-accent"
                      : "w-2.5 bg-muted-foreground/25 hover:bg-muted-foreground/40"
                  }`}
                  aria-label={`Go to video ${index + 1}`}
                />
              ))}
            </div>

            {/* Arrow buttons */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToPrevious}
                className="p-3 rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
                aria-label="Previous video"
              >
                <ChevronLeft className="w-5 h-5" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={goToNext}
                className="p-3 rounded-xl border border-border hover:border-accent hover:text-accent hover:bg-accent/5 transition-all duration-200"
                aria-label="Next video"
              >
                <ChevronRight className="w-5 h-5" />
              </motion.button>
            </div>
          </div>

          {/* Thumbnail strip */}
          <div className="flex justify-center gap-4 mt-8">
            {videoTestimonials.map((testimonial, index) => (
              <motion.button
                key={testimonial.id}
                whileHover={{ scale: 1.05, y: -4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setPlayingIndex(null);
                  setActiveIndex(index);
                }}
                className={`relative w-20 h-14 md:w-28 md:h-20 rounded-xl overflow-hidden transition-all duration-300 ${
                  index === activeIndex
                    ? "ring-2 ring-accent ring-offset-2 ring-offset-background"
                    : "opacity-50 hover:opacity-80"
                }`}
              >
                <div className={`absolute inset-0 ${
                  testimonial.industry === "FinTech"
                    ? "bg-gradient-to-br from-fintech/30 to-fintech/10"
                    : "bg-gradient-to-br from-healthcare/30 to-healthcare/10"
                }`} />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Play className="w-4 h-4 md:w-5 md:h-5 text-foreground/70" />
                </div>
                <span className="absolute bottom-1 left-1 text-[10px] md:text-xs text-foreground/80 font-medium truncate max-w-[90%]">
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

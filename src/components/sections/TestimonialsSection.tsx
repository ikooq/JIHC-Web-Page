import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Auxility delivered our banking platform ahead of schedule with exceptional attention to security. Their FinTech expertise saved us months of development time.",
    author: "Sarah Chen",
    role: "CTO, Digital Banking Startup",
    company: "FinanceFlow",
  },
  {
    id: 2,
    quote: "The telemedicine solution they built has transformed how we deliver care. Patient satisfaction increased by 40% within the first quarter.",
    author: "Dr. Michael Roberts",
    role: "Chief Medical Officer",
    company: "Regional Health Network",
  },
  {
    id: 3,
    quote: "Working with Auxility felt like having an in-house team. They understood our compliance requirements from day one and delivered a HIPAA-compliant solution.",
    author: "Emily Watson",
    role: "VP of Technology",
    company: "MedTech Solutions",
  },
  {
    id: 4,
    quote: "Their market research helped us pivot our product strategy before development. We avoided costly mistakes and launched with product-market fit.",
    author: "James Okonkwo",
    role: "Founder & CEO",
    company: "PaymentPro",
  },
  {
    id: 5,
    quote: "Outstanding technical expertise combined with genuine care for our business outcomes. The ICU system they built is now saving lives daily.",
    author: "Dr. Lisa Park",
    role: "Director of Critical Care",
    company: "Metropolitan Hospital",
  },
];

const TestimonialsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setActiveIndex((current) => (current + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block px-4 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4">
            Client Stories
          </span>
          <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground mb-4">
            What Our Clients Say
          </h2>
          <p className="text-muted-foreground text-lg">
            Don't just take our word for it — hear from the leaders we've helped succeed.
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-card rounded-2xl border border-border p-8 md:p-12 shadow-xl">
            {/* Quote icon */}
            <div className="absolute top-6 right-6 md:top-8 md:right-8">
              <Quote className="w-12 h-12 md:w-16 md:h-16 text-accent/20" />
            </div>

            {/* Testimonial content */}
            <div className="relative">
              <p className="text-lg md:text-2xl text-foreground font-medium leading-relaxed mb-8 pr-8">
                "{testimonials[activeIndex].quote}"
              </p>

              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="w-14 h-14 rounded-full bg-gradient-accent flex items-center justify-center text-accent-foreground font-display font-bold text-xl">
                  {testimonials[activeIndex].author.split(" ").map(n => n[0]).join("")}
                </div>
                
                <div>
                  <div className="font-display font-bold text-foreground">
                    {testimonials[activeIndex].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIndex].role}, {testimonials[activeIndex].company}
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setIsAutoPlaying(false);
                      setActiveIndex(index);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "w-8 bg-accent"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  onClick={goToPrevious}
                  className="p-2 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={goToNext}
                  className="p-2 rounded-full border border-border hover:border-accent hover:text-accent transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fadeUpVariants, staggerContainer, viewportSettings, slideInLeft, slideInRight } from "@/lib/animations";

const ContactSection = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });
  };

  return (
    <section id="contact" className="py-28 md:py-40 bg-hero relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px]"
        />
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="absolute bottom-1/4 -left-64 w-[500px] h-[500px] bg-cta/10 rounded-full blur-[100px]"
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center"
        >
          {/* Left content */}
          <motion.div variants={slideInLeft}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary-foreground/10 text-accent text-sm font-semibold mb-6">
              Let's Talk
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-8 leading-tight">
              Ready to Transform Your Business?
            </h2>
            <p className="text-primary-foreground/60 text-lg md:text-xl mb-10 leading-relaxed">
              Whether you're launching a new product or modernizing existing systems, 
              we're here to help you succeed. Let's discuss your project.
            </p>

            {/* Contact info */}
            <div className="space-y-5 mb-10">
              {[
                { icon: Mail, text: "hello@auxility.ca", href: "mailto:hello@auxility.ca" },
                { icon: MapPin, text: "Toronto, Canada" },
                { icon: Phone, text: "+1 (416) 555-0123" },
              ].map((item, index) => (
                <motion.div
                  key={item.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  {item.href ? (
                    <a href={item.href} className="flex items-center gap-4 text-primary-foreground/60 hover:text-accent transition-colors group">
                      <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      {item.text}
                    </a>
                  ) : (
                    <div className="flex items-center gap-4 text-primary-foreground/60">
                      <div className="w-12 h-12 rounded-xl bg-primary-foreground/10 flex items-center justify-center">
                        <item.icon className="w-5 h-5 text-accent" />
                      </div>
                      {item.text}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {/* Trust badges */}
            <div className="flex items-center gap-6 text-primary-foreground/40 text-sm">
              <span className="flex items-center gap-2">
                <span className="text-lg">🔒</span> Your data is secure
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg">⚡</span> Response within 24h
              </span>
            </div>
          </motion.div>

          {/* Right - Form */}
          <motion.div variants={slideInRight}>
            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-2xl border border-border">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                    className="w-20 h-20 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-8"
                  >
                    <CheckCircle className="w-10 h-10 text-accent" />
                  </motion.div>
                  <h3 className="text-2xl font-display font-bold text-foreground mb-4">
                    Thank You!
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    We've received your message and will be in touch shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-14 rounded-xl border-border/50 focus:border-accent bg-background/50"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-14 rounded-xl border-border/50 focus:border-accent bg-background/50"
                      maxLength={255}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
                      Tell Us About Your Project
                    </label>
                    <Textarea
                      id="message"
                      placeholder="I'm looking to build a..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="min-h-[140px] resize-none rounded-xl border-border/50 focus:border-accent bg-background/50"
                      maxLength={1000}
                    />
                  </div>

                  <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
                    <Button
                      type="submit"
                      variant="cta"
                      size="lg"
                      className="w-full h-14 text-base shadow-xl shadow-cta/25 hover:shadow-2xl hover:shadow-cta/35 transition-shadow"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-cta-foreground/30 border-t-cta-foreground rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    By submitting, you agree to our privacy policy.
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone, Send, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { fadeUpVariants, staggerContainer, viewportSettings, slideInLeft, slideInRight } from "@/lib/animations";
import { submitToGoogleSheets } from "@/lib/googleSheets";
import { useGoogleSheetsData } from "@/hooks/useGoogleSheetsData";
import { ContactData } from "@/lib/googleSheetsCMS";
import { useCopy } from "@/hooks/useCopy";
import { useLanguage } from "@/hooks/useLanguage";
import { pickLocalized } from "@/lib/i18n";

const defaultContactItems = [
  { icon: Mail, text: "hello@auxility.ca", href: "mailto:hello@auxility.ca" },
  { icon: MapPin, text: "Toronto, Canada" },
  { icon: Phone, text: "+1 (416) 555-0123" },
];

const ContactSection = () => {
  const { get } = useCopy();
  const { language } = useLanguage();
  const { data: contactData } = useGoogleSheetsData<ContactData>({ sheetName: "Contact" });
  const contactItems = useMemo(() => {
    if (!contactData || contactData.length === 0) return defaultContactItems;
    const byField = contactData.reduce<Record<string, string>>((acc, row) => {
      if (row.field) {
        const v = pickLocalized(row as any, "value", language, String((row as any).value ?? ""));
        if (v) acc[String(row.field).toLowerCase()] = v;
      }
      return acc;
    }, {});
    const email = byField.email ?? defaultContactItems[0].text;
    const address = byField.address ?? defaultContactItems[1].text;
    const phone = byField.phone ?? defaultContactItems[2].text;
    return [
      { icon: Mail, text: email, href: email ? `mailto:${email}` : undefined },
      { icon: MapPin, text: address },
      { icon: Phone, text: phone },
    ];
  }, [contactData, language]);
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
        title: get("contact_toast_fill_fields"),
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast({
        title: get("contact_toast_invalid_email"),
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const result = await submitToGoogleSheets(formData);

    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
      toast({
        title: get("contact_toast_success_title"),
        description: get("contact_toast_success_desc"),
      });
    } else {
      toast({
        title: "Failed to send message",
        description: result.error || "Please try again later.",
        variant: "destructive",
      });
    }
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
              {get("contact_badge")}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground mb-8 leading-tight">
              {get("contact_heading")}
            </h2>
            <p className="text-primary-foreground/60 text-lg md:text-xl mb-10 leading-relaxed">
              {get("contact_subheading")}
            </p>

            {/* Contact info — из Google Sheets (лист Contact) или fallback */}
            <div className="space-y-5 mb-10">
              {contactItems.map((item, index) => (
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
                <span className="text-lg">🔒</span> {get("contact_secure")}
              </span>
              <span className="flex items-center gap-2">
                <span className="text-lg">⚡</span> {get("contact_24h")}
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
                    {get("contact_success_title")}
                  </h3>
                  <p className="text-muted-foreground mb-8">
                    {get("contact_success_message")}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({ name: "", email: "", message: "" });
                    }}
                  >
                    {get("contact_send_another")}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-foreground mb-3">
                      {get("contact_form_name")}
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder={get("contact_placeholder_name")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="h-14 rounded-xl border-border/50 focus:border-accent bg-background/50"
                      maxLength={100}
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-foreground mb-3">
                      {get("contact_form_email")}
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={get("contact_placeholder_email")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="h-14 rounded-xl border-border/50 focus:border-accent bg-background/50"
                      maxLength={255}
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-foreground mb-3">
                      {get("contact_form_message")}
                    </label>
                    <Textarea
                      id="message"
                      placeholder={get("contact_placeholder_message")}
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
                          <Loader2 className="w-5 h-5 animate-spin" />
                          {get("contact_sending")}
                        </>
                      ) : (
                        <>
                          {get("contact_submit")}
                          <Send className="w-5 h-5" />
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <p className="text-xs text-muted-foreground text-center pt-2">
                    {get("contact_privacy")}
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

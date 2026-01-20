import { motion } from "framer-motion";
import { Linkedin, Twitter, Github } from "lucide-react";
import { fadeUpVariants, staggerContainer, viewportSettings } from "@/lib/animations";

const footerLinks = {
  services: [
    { label: "Web Development", href: "#services" },
    { label: "Mobile Development", href: "#services" },
    { label: "Consulting", href: "#services" },
    { label: "System Integration", href: "#services" },
  ],
  company: [
    { label: "About Us", href: "#why-us" },
    { label: "Case Studies", href: "#cases" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Contact", href: "#contact" },
  ],
  industries: [
    { label: "FinTech", href: "#services" },
    { label: "Healthcare", href: "#services" },
    { label: "Banking", href: "#services" },
    { label: "Telemedicine", href: "#services" },
  ],
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-20 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          variants={staggerContainer}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 md:gap-8 mb-16"
        >
          {/* Brand Column */}
          <motion.div variants={fadeUpVariants} className="lg:col-span-2">
            <a href="#" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg shadow-accent/20">
                <span className="text-accent-foreground font-display font-bold text-2xl">A</span>
              </div>
              <span className="text-2xl font-display font-bold">Auxility</span>
            </a>
            <p className="text-primary-foreground/60 max-w-sm mb-8 leading-relaxed">
              Building secure, compliant, and user-friendly custom software for FinTech and Healthcare industries.
            </p>
            <div className="flex gap-3">
              {[
                { icon: Linkedin, label: "LinkedIn" },
                { icon: Twitter, label: "Twitter" },
                { icon: Github, label: "GitHub" },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {[
            { title: "Services", links: footerLinks.services },
            { title: "Company", links: footerLinks.company },
            { title: "Industries", links: footerLinks.industries },
          ].map((column) => (
            <motion.div key={column.title} variants={fadeUpVariants}>
              <h4 className="font-display font-bold text-lg mb-6">{column.title}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-primary-foreground/60 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="pt-10 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-6"
        >
          <p className="text-primary-foreground/40 text-sm">
            © {currentYear} Auxility. All rights reserved.
          </p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

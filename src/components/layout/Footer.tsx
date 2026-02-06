import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Linkedin, Twitter, Github } from "lucide-react";
import { fadeUpVariants, staggerContainer, viewportSettings } from "@/lib/animations";
import Logo from "@/components/brand/Logo";
import { useCopy } from "@/hooks/useCopy";

const footerLinks = {
  services: [
    { key: "footer_link_web_dev", href: "/services" },
    { key: "footer_link_mobile_dev", href: "/services" },
    { key: "footer_link_consulting", href: "/services" },
    { key: "footer_link_integration", href: "/services" },
  ],
  company: [
    { key: "footer_link_about", href: "/about" },
    { key: "footer_link_cases", href: "/cases" },
    { key: "footer_link_testimonials", href: "/#testimonials" },
    { key: "footer_link_contact", href: "/#contact" },
  ],
  industries: [
    { key: "footer_link_fintech", href: "/services" },
    { key: "footer_link_healthcare", href: "/services" },
    { key: "footer_link_banking", href: "/services" },
    { key: "footer_link_telemedicine", href: "/services" },
  ],
};

const Footer = () => {
  const { get } = useCopy();
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
            <Link to="/" className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/20 to-white/10 flex items-center justify-center shadow-lg overflow-hidden">
                <Logo className="h-8 w-8" />
              </div>
              <span className="text-2xl font-display font-bold">{get("site_name")}</span>
            </Link>
            <p className="text-primary-foreground/60 max-w-sm mb-8 leading-relaxed">
              {get("footer_tagline")}
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
                  className="w-11 h-11 rounded-xl bg-primary-foreground/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links Columns */}
          {[
            { titleKey: "footer_services" as const, links: footerLinks.services },
            { titleKey: "footer_company" as const, links: footerLinks.company },
            { titleKey: "footer_industries" as const, links: footerLinks.industries },
          ].map((column) => (
            <motion.div key={column.titleKey} variants={fadeUpVariants}>
              <h4 className="font-display font-bold text-lg mb-6">{get(column.titleKey)}</h4>
              <ul className="space-y-4">
                {column.links.map((link) => (
                  <li key={link.key}>
                    <Link
                      to={link.href}
                      className="text-primary-foreground/60 hover:text-white transition-colors text-sm"
                    >
                      {get(link.key)}
                    </Link>
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
            © {currentYear} {get("site_name")}. {get("footer_copyright")}
          </p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              {get("footer_privacy")}
            </a>
            <a href="#" className="text-primary-foreground/40 hover:text-primary-foreground transition-colors">
              {get("footer_terms")}
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

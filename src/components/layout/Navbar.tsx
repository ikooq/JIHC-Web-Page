import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { Menu, X } from "lucide-react";
import Logo from "@/components/brand/Logo";

const navItems = [
  { label: "Services", href: "/services" },
  { label: "Case Studies", href: "/cases" },
  { label: "About", href: "/about" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const showDarkNav = !isHomePage || scrolled;

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        showDarkNav
          ? "bg-background/80 backdrop-blur-2xl border-b border-border shadow-lg shadow-primary/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-lg shadow-primary/30 overflow-hidden">
                <Logo className="h-7 w-7" />
              </div>
              <span className={`text-xl font-display font-bold transition-colors duration-300 ${
                showDarkNav ? "text-foreground" : "text-white"
              }`}>
                Auxility
              </span>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.3 }}
              >
                <Link
                  to={item.href}
                  className={`relative px-4 py-2 text-sm font-medium transition-all duration-200 rounded-lg ${
                    location.pathname === item.href
                      ? showDarkNav
                        ? "text-primary bg-primary/10"
                        : "text-white bg-white/20"
                      : showDarkNav 
                        ? "text-muted-foreground hover:text-foreground hover:bg-muted" 
                        : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="hidden md:flex items-center gap-3">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
            >
              <ThemeToggle scrolled={showDarkNav} />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link to="/#contact">
                <Button
                  variant={showDarkNav ? "default" : "accent"}
                  size="sm"
                  className="shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  Get in Touch
                </Button>
              </Link>
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle scrolled={showDarkNav} />
            <motion.button
              whileTap={{ scale: 0.9 }}
              className={`p-2 rounded-lg transition-colors ${
                showDarkNav ? "text-foreground hover:bg-muted" : "text-white hover:bg-white/10"
              }`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden overflow-hidden"
            >
              <div className={`py-4 border-t ${showDarkNav ? "border-border" : "border-white/10"}`}>
                <div className="flex flex-col gap-1">
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Link
                        to={item.href}
                        className={`py-3 px-4 rounded-lg text-base font-medium transition-colors block ${
                          location.pathname === item.href
                            ? showDarkNav
                              ? "text-primary bg-primary/10"
                              : "text-white bg-white/20"
                            : showDarkNav
                              ? "text-muted-foreground hover:text-foreground hover:bg-muted"
                              : "text-white/70 hover:text-white hover:bg-white/10"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  ))}
                  <Link to="/#contact">
                    <Button variant="accent" size="sm" className="mt-3 w-full">
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;

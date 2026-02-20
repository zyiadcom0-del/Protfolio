import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Github, MessageCircle, Globe, Mail, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import SmoothScroll from './components/SmoothScroll';
import Magnetic from './components/Magnetic';
import Preloader from './components/Preloader';
import ContactPage from './ContactPage';
import ServicesPage from './ServicesPage';
import { LanguageContext } from './LanguageContext';
import './App.css';

const translations = {
    EN: {
        home: "home",
        service: "service",
        contact: "contact",
        heroTitle: "Build Smart Systems",
        heroSub: "& Modern Websites.",
        heroDesc: "Transforming your ideas into high-performance digital experiences with cutting-edge technology and premium design.",
        projects: "Projects",
        systemsDemo: "Systems Demo",
        ourSolutions: "Our Solutions",
        webDev: "Web Development",
        webDevDesc: "High-end websites with focus on UX, performance and measurable results.",
        sysSol: "System Solutions",
        sysSolDesc: "Complex internal systems and management platforms for your business.",
        viewDetails: "View Details",
        letsWork: "Let's work",
        together: "together",
        getInTouch: "Get in touch",
        protected: "PROTECTED BY HABIBA",
        viewDemo: "View Demo",
        viewProject: "View Project"
    },
    AR: {
        home: "الرئيسية",
        service: "الخدمات",
        contact: "اتصل بنا",
        heroTitle: "بناء أنظمة ذكية",
        heroSub: "ومواقع حديثة.",
        heroDesc: "تحويل أفكارك إلى تجارب رقمية عالية الأداء باستخدام أحدث التقنيات والتصميمات المتميزة.",
        projects: "المشاريع",
        systemsDemo: "عرض الأنظمة",
        ourSolutions: "حلولنا",
        webDev: "تطوير المواقع",
        webDevDesc: "مواقع راقية تركز على تجربة المستخدم والأداء والنتائج الملموسة.",
        sysSol: "حلول الأنظمة",
        sysSolDesc: "أنظمة داخلية معقدة ومنصات إدارة مخصصة لعملك.",
        viewDetails: "عرض التفاصيل",
        letsWork: "دعنا نعمل",
        together: "معاً",
        getInTouch: "تواصل معنا",
        protected: "بواسطة حبيبة © مـحـمـي",
        viewDemo: "عرض النموذج",
        viewProject: "مشاهدة المشروع"
    }
};


const FloatingSideBar = () => {
    const { lang, setLang } = React.useContext(LanguageContext);

    return (
        <div className="fixed-side-bar">
            <button
                onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
                className="side-lang-btn"
            >
                <Globe size={18} />
                <span>{lang}</span>
            </button>
            <div className="side-divider"></div>
            <div className="side-socials">
                <a href="https://github.com/habibamohamed8360" target="_blank" className="side-social-link"><Github size={20} /></a>
                <a href="https://www.facebook.com/share/18LcxZR83d/" target="_blank" className="side-social-link"><Facebook size={20} /></a>
                <a href="https://www.instagram.com/habibamohamed8360?igsh=MXQwdGV3bGNkd2t0NA==" target="_blank" className="side-social-link"><Instagram size={20} /></a>
                <a href="https://www.linkedin.com/in/habiba-mohamed-8b9b3a260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="side-social-link"><Linkedin size={20} /></a>
            </div>
        </div>
    );
};

const WaveTransition = ({ fromColor = 'var(--bg)', toColor = '#1c1d20' }) => (
    <div className="wave-transition-wrap" style={{ background: fromColor }}>
        <svg viewBox="0 0 1440 150" preserveAspectRatio="none" className="wave-svg">
            <path d="M0,64 C360,150 720,0 1080,80 C1260,120 1380,40 1440,64 L1440,150 L0,150 Z" fill={toColor} />
        </svg>
    </div>
);

const FloatingWhatsApp = () => (
    <motion.a
        href="https://wa.me/201204951383"
        target="_blank"
        rel="noopener noreferrer"
        className="floating-whatsapp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        style={{
            position: 'fixed',
            bottom: '40px',
            right: '40px',
            width: '65px',
            height: '65px',
            background: '#25D366',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            boxShadow: '0 10px 25px rgba(37, 211, 102, 0.4)',
            zIndex: 9999,
            cursor: 'pointer'
        }}
    >
        <MessageCircle size={32} />
    </motion.a>
);

// Selection Modal Component
const SelectionModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;
    return (
        <div className="selection-modal" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0,0,0,0.8)', zIndex: 10000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                className="modal-box"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '60px', borderRadius: '40px', textAlign: 'center', maxWidth: '450px', width: '90%' }}
            >
                <div style={{ width: '60px', height: '60px', background: '#455ce9', borderRadius: '50%', margin: '0 auto 25px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem' }}>👋</div>
                <h2 style={{ fontSize: '2.4rem', marginBottom: '15px', fontWeight: 800 }}>Let's Build Something</h2>
                <p style={{ color: '#666', marginBottom: '40px', fontSize: '1.1rem' }}>Choose your preferred way to connect with us</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <a href="https://wa.me/201204951383" target="_blank" rel="noopener noreferrer" className="nav-link-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '22px', background: '#25D366', color: 'white', border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
                        <MessageCircle size={20} />
                        <span>WhatsApp</span>
                    </a>
                    <a href="https://www.facebook.com/share/18LcxZR83d/" target="_blank" rel="noopener noreferrer" className="nav-link-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '22px', background: '#1877F2', color: 'white', border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
                        <Facebook size={20} />
                        <span>Facebook</span>
                    </a>
                </div>
                <button onClick={onClose} style={{ marginTop: '30px', color: '#888', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', opacity: 0.6 }}>Maybe later</button>
            </motion.div>
        </div>
    );
};


const Header = () => {
    const { lang, setLang, t } = React.useContext(LanguageContext);

    return (
        <header className="site-header">
            <div className="header-left-group">
                <div className="logo"><Link to="/">Habiba.</Link></div>
                <div className="header-socials desktop-only">
                    <a href="https://github.com/habibamohamed8360" target="_blank" className="social-icon-link"><Github size={18} /></a>
                    <a href="https://www.facebook.com/share/18LcxZR83d/" target="_blank" className="social-icon-link"><Facebook size={18} /></a>
                    <a href="https://www.instagram.com/habibamohamed8360?igsh=MXQwdGV3bGNkd2t0NA==" target="_blank" className="social-icon-link"><Instagram size={18} /></a>
                    <a href="https://www.linkedin.com/in/habiba-mohamed-8b9b3a260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="social-icon-link"><Linkedin size={18} /></a>

                    <button
                        onClick={() => setLang(lang === 'EN' ? 'AR' : 'EN')}
                        className="lang-circle-btn"
                    >
                        <Globe size={16} />
                        <span className="lang-text-overlay">{lang}</span>
                    </button>
                </div>
            </div>

            <div className="header-right-group">
                <nav className="main-nav">
                    <Link to="/" className="nav-link-box">{t.home}</Link>
                    <Link to="/services" className="nav-link-box">{t.service}</Link>
                    <Link to="/contact" className="nav-link-box">{t.contact}</Link>
                </nav>
            </div>
        </header>
    );
};

// Dynamic Image Component for a "Alive" feel
const DynamicContent = ({ image }) => {
    return (
        <div className="pricing-image-container">
            <motion.img
                src={image}
                alt="dynamic"
                animate={{
                    scale: [1, 1.1, 1],
                    x: [0, -10, 0, 10, 0],
                    y: [0, 5, 0, -5, 0]
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.3))' }}></div>
        </div>
    );
};

const ProjectCard = ({ name, type, year, image, link, btnText = "View Project" }) => (
    <a href={link} target="_blank" rel="noopener noreferrer" className="card-premium">
        <DynamicContent image={image} />
        <div className="card-title">{name}</div>
        <div className="project-meta">{type} / {year}</div>
        <div className="btn-circle-action" style={{ marginTop: '30px' }}>
            {btnText.includes(' ') ? <>{btnText.split(' ')[0]}<br />{btnText.split(' ')[1]}</> : btnText}
        </div>
    </a>
);

const PriceCard = ({ title, price, image, onClick, btnText }) => (
    <div className="card-premium">
        <DynamicContent image={image} />
        <div className="card-title">{title}</div>
        <div className="card-price">{price}</div>
        <button className="btn-circle-action" onClick={onClick}>
            {btnText.split(' ').length > 1 ? <>{btnText.split(' ')[0]}<br />{btnText.split(' ')[1]}</> : btnText}
        </button>
    </div>
);

const Footer = () => {
    const { t } = React.useContext(LanguageContext);
    return (
        <footer className="site-footer">
            <div className="container">
                <div className="footer-hero-wrap">
                    <div className="footer-profile-box">
                        <div className="footer-img-circle"><img src="/imgs/habiba2.png" alt="Habiba" /></div>
                        <div className="footer-big-h">{t.letsWork} <br /><span style={{ color: 'var(--accent)' }}>{t.together}</span></div>
                    </div>
                    <Link to="/contact"><div className="footer-blue-btn">{t.getInTouch}</div></Link>
                </div>
                <div style={{ display: 'flex', gap: '30px', marginBottom: '80px', flexWrap: 'wrap' }}>
                    <a href="mailto:hm5395681@gmail.com" className="nav-link-box" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Mail size={18} /> hm5395681@gmail.com
                    </a>
                    <a href="tel:+201204951383" className="nav-link-box" style={{ background: 'transparent', color: 'white', borderColor: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <Phone size={18} /> +20 120 495 1383
                    </a>
                </div>
                <div className="footer-bottom">
                    <div style={{ display: 'flex', gap: '40px', opacity: 0.4, fontSize: '0.8rem', flexWrap: 'wrap' }}>
                        <p>VERSION — 2026 © Edition</p>
                        <p>LOCAL TIME — {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p style={{ fontWeight: 800, color: '#455ce9', opacity: 1 }}>{t.protected}</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

const HomePage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const location = useLocation();
    const { t, lang } = React.useContext(LanguageContext);

    useEffect(() => {
        if (location.hash === '#services') {
            const element = document.getElementById('services');
            if (element) element.scrollIntoView({ behavior: 'smooth' });
        }
    }, [location]);

    const projects = [
        { name: 'Zaki Pro', type: 'Design & Development', year: '2025', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015&auto=format&fit=crop', link: 'https://zaki-pro-v1-main-8657.vercel.app/', btnText: t.viewProject },
        { name: 'AF Group', type: 'Creative System', year: '2025', image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', link: 'https://Afgroupsa.com', btnText: t.viewProject },
        { name: 'Nile Company', type: 'System Engineering', year: '2026', image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop', link: 'https://nilecompanyegypt.com/', btnText: t.viewProject }
    ];

    return (
        <div className="home-content-wrap">
            <SelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <section id="home" className="hero-section">
                <video autoPlay muted loop playsInline className="hero-video-bg">
                    <source src="https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-her-laptop-at-home-4348-large.mp4" type="video/mp4" />
                </video>
                <div className="hero-overlay"></div>
                <div className="container hero-content">
                    <motion.h1
                        className="hero-title"
                        initial={{ y: 80, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
                    >
                        {lang === 'EN' ? (
                            <>Build <span style={{ color: 'var(--accent)' }}>Smart Systems</span> <br />& Modern Websites.</>
                        ) : (
                            <>بناء <span style={{ color: 'var(--accent)' }}>أنظمة ذكية</span> <br />ومواقع حديثة.</>
                        )}
                    </motion.h1>
                    <motion.p
                        initial={{ y: 30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 1.2, delay: 0.3, ease: [0.76, 0, 0.24, 1] }}
                        style={{ color: 'var(--muted)', fontSize: '1.2rem', marginTop: '30px', maxWidth: '600px', lineHeight: '1.6' }}
                    >
                        {t.heroDesc}
                    </motion.p>
                </div>
            </section>


            <section id="projects" className="container" style={{ position: 'relative' }}>
                <div className="section-pill-wrap"><div className="pill-badge">{t.projects}</div></div>
                <div className="scroll-indicators-mobile desktop-only-hidden">
                    <div className="scroll-arrow"><ChevronLeft size={20} /></div>
                    <div className="scroll-arrow"><ChevronRight size={20} /></div>
                </div>
                <div className="projects-grid">
                    {projects.map((p, i) => <ProjectCard key={i} {...p} />)}
                </div>
            </section>

            <section id="systems-showcase" className="container" style={{ position: 'relative' }}>
                <div className="section-pill-wrap"><div className="pill-badge">{t.systemsDemo}</div></div>
                <div className="scroll-indicators-mobile desktop-only-hidden">
                    <div className="scroll-arrow"><ChevronLeft size={20} /></div>
                    <div className="scroll-arrow"><ChevronRight size={20} /></div>
                </div>
                <div className="projects-grid">
                    <ProjectCard name="Boutique PMS" type="Hospitality" year="2025" image="https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070" link="https://demo.hotelogix.com/" btnText={t.viewDemo} />
                    <ProjectCard name="Resort Hub" type="Management" year="2025" image="https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070" link="https://www.cloudbeds.com/" btnText={t.viewDemo} />
                    <ProjectCard name="Enterprise Admin" type="Dashboard" year="2026" image="https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974" link="https://www.mews.com/" btnText={t.viewDemo} />
                </div>
            </section>

            <section id="services-preview" className="container">
                <div className="section-pill-wrap"><div className="pill-badge">{t.ourSolutions}</div></div>
                <div className="solutions-preview-grid">
                    <div className="card-premium solution-card">
                        <DynamicContent image="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2072" />
                        <div className="card-title">{t.webDev}</div>
                        <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>{t.webDevDesc}</p>
                        <Link to="/services"><div className="btn-circle-action">{t.viewDetails}</div></Link>
                    </div>
                    <div className="card-premium solution-card">
                        <DynamicContent image="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070" />
                        <div className="card-title">{t.sysSol}</div>
                        <p style={{ color: 'var(--muted)', marginBottom: '30px' }}>{t.sysSolDesc}</p>
                        <Link to="/services"><div className="btn-circle-action">{t.viewDetails}</div></Link>
                    </div>
                </div>
            </section>

            <WaveTransition fromColor="var(--bg)" toColor="#1c1d20" />
            <Footer />
        </div>
    );
};

const AnimatedRoutes = () => {
    const location = useLocation();
    const [displayLocation, setDisplayLocation] = useState(location);
    const [transitionStage, setTransitionStage] = useState("fadeIn");
    const [pageTitle, setPageTitle] = useState("");

    useEffect(() => {
        if (location.pathname !== displayLocation.pathname) {
            setTransitionStage("fadeOut");
            const name = location.pathname.split("/")[1] || "home";
            setPageTitle(name.toUpperCase());
        }
    }, [location, displayLocation]);

    const onAnimationComplete = () => {
        if (transitionStage === "fadeOut") {
            setDisplayLocation(location);
            setTransitionStage("fadeIn");
            window.scrollTo(0, 0);
        }
    };

    return (
        <div style={{ position: 'relative' }}>
            <AnimatePresence mode="wait">
                {transitionStage === "fadeOut" && (
                    <motion.div
                        key="transition"
                        initial={{ y: "100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                        className="page-transition-overlay"
                        onAnimationComplete={onAnimationComplete}
                    >
                        <h1 className="page-transition-text">{pageTitle}</h1>
                    </motion.div>
                )}
            </AnimatePresence>

            <Routes location={displayLocation}>
                <Route path="/" element={<HomePage />} />
                <Route path="/services" element={<><ServicesPage /><WaveTransition fromColor="var(--bg)" toColor="#1c1d20" /><Footer /></>} />
                <Route path="/contact" element={<><ContactPage /><WaveTransition fromColor="var(--bg)" toColor="#1c1d20" /><Footer /></>} />
            </Routes>
        </div>
    );
};

function App() {
    const [isLoading, setIsLoading] = useState(true);
    const [lang, setLang] = useState('EN');

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500);
    }, []);

    useEffect(() => {
        document.documentElement.lang = lang.toLowerCase();
        document.documentElement.dir = lang === 'AR' ? 'rtl' : 'ltr';
    }, [lang]);

    const contextValue = {
        lang,
        setLang,
        t: translations[lang]
    };

    return (
        <LanguageContext.Provider value={contextValue}>
            <Router>
                <div className={`app-main-container ${lang === 'AR' ? 'rtl-mode' : ''}`}>
                    <AnimatePresence mode="wait">{isLoading && <Preloader key="preloader" />}</AnimatePresence>
                    <SmoothScroll />
                    <Header />
                    <FloatingSideBar />
                    <AnimatedRoutes />
                    <FloatingWhatsApp />
                </div>
            </Router>
        </LanguageContext.Provider>
    );
}

export default App;

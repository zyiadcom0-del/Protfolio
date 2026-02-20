import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { LanguageContext } from './LanguageContext';

// Reuse the SelectionModal and DynamicContent from App if possible, 
// but since they are defined in App.jsx and not exported, 
// I'll redefine or move them. For now, I'll redefine them for simplicity or assume they are available if I were to refactor.
// Better: I'll make a more self-contained ServicesPage.

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

const PriceCard = ({ title, price, image, features, onClick, btnText }) => (
    <div className="card-premium">
        <DynamicContent image={image} />
        <div className="card-title">{title}</div>
        <div className="card-price">{price}</div>
        <ul className="pricing-features">
            {features.map((f, i) => (
                <li key={i}>{f}</li>
            ))}
        </ul>
        <button className="btn-circle-action" onClick={onClick}>
            {btnText.split(' ').length > 1 ? <>{btnText.split(' ')[0]}<br />{btnText.split(' ')[1]}</> : btnText}
        </button>
    </div>
);

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
                        <span>WhatsApp</span>
                    </a>
                    <a href="https://www.facebook.com/share/18LcxZR83d/" target="_blank" rel="noopener noreferrer" className="nav-link-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '22px', background: '#1877F2', color: 'white', border: 'none', fontWeight: 700, fontSize: '1.1rem' }}>
                        <span>Facebook</span>
                    </a>
                </div>
                <button onClick={onClose} style={{ marginTop: '30px', color: '#888', fontWeight: 600, fontSize: '1rem', cursor: 'pointer', opacity: 0.6 }}>Maybe later</button>
            </motion.div>
        </div>
    );
};

const ServicesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lang, t } = React.useContext(LanguageContext);

    const webServices = [
        {
            title: 'Business Start',
            price: '16,000 EGP',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964',
            features: ['Responsive Landing Page', 'Basic SEO Setup', 'Contact Form Integration', 'Hosting Setup'],
            btnText: 'Order Now'
        },
        {
            title: 'Corporate Pro',
            price: '40,000 EGP',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
            features: ['Multi-page Website', 'CMS Integration', 'Advanced UI/UX', 'Performance Optimization', 'Analytics Dashboard'],
            btnText: 'Order Now'
        },
        {
            title: 'Enterprise Store',
            price: '72,000 EGP',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089',
            features: ['Full E-commerce System', 'Payment Gateway Integration', 'Inventory Management', 'User Accounts', 'Custom CRM'],
            btnText: 'Order Now'
        }
    ];

    const systemServices = [
        {
            title: 'Basic Management',
            price: '60,000 EGP',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
            features: ['Internal Admin Panel', 'Database Management', 'Employee Tracking', 'Sales Reports'],
            btnText: 'Order Now'
        },
        {
            title: 'Advanced ERP',
            price: '140,000 EGP',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070',
            features: ['Supply Chain Integration', 'Cloud Synchronized', 'AI Driven Insights', 'HR & Payroll System'],
            btnText: 'Order Now'
        },
        {
            title: 'Custom Ecosystem',
            price: 'Custom',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974',
            features: ['Cross-platform Integration', 'Blockchain Security', 'Scalable Microservices', '24/7 Dedicated Support'],
            btnText: 'Get Quote'
        }
    ];

    return (
        <div className="services-page-wrapper" style={{ paddingTop: '180px', background: 'var(--bg)' }}>
            <SelectionModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

            <section className="container" style={{ padding: '0 0 100px 0' }}>
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    style={{ textAlign: 'center', marginBottom: '100px' }}
                >
                    <h1 style={{ fontSize: 'clamp(3rem, 7vw, 5rem)', fontWeight: 800, marginBottom: '20px', color: 'var(--fg)' }}>
                        {lang === 'EN' ? <>Our <span style={{ color: 'var(--accent)' }}>Services</span></> : <>خدماتنا <span style={{ color: 'var(--accent)' }}>المميزة</span></>}
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>{t.heroDesc}</p>
                </motion.div>

                {/* Web Services Section */}
                <div className="section-pill-wrap"><div className="pill-badge">{t.webDev}</div></div>
                <div style={{ position: 'relative' }}>
                    <div className="scroll-indicators-mobile desktop-only-hidden">
                        <div className="scroll-arrow"><ChevronLeft size={20} /></div>
                        <div className="scroll-arrow"><ChevronRight size={20} /></div>
                    </div>
                    <div className="pricing-grid">
                        {webServices.map((item, i) => (
                            <PriceCard key={i} {...item} btnText={t.viewProject} onClick={() => setIsModalOpen(true)} />
                        ))}
                    </div>
                </div>

                {/* System Services Section */}
                <div className="section-pill-wrap" style={{ marginTop: '150px' }}><div className="pill-badge">{t.sysSol}</div></div>
                <div style={{ position: 'relative' }}>
                    <div className="scroll-indicators-mobile desktop-only-hidden">
                        <div className="scroll-arrow"><ChevronLeft size={20} /></div>
                        <div className="scroll-arrow"><ChevronRight size={20} /></div>
                    </div>
                    <div className="pricing-grid">
                        {systemServices.map((item, i) => (
                            <PriceCard key={i} {...item} btnText={item.btnText === 'Get Quote' ? (lang === 'EN' ? 'Get Quote' : 'اطلب عرض سعر') : t.viewProject} onClick={() => setIsModalOpen(true)} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;

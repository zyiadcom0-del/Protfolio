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

const PriceCard = ({ title, price, image, features, whatsappMsg, desc, lang }) => {
    const whatsappNumber = "201204951383";
    const waLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMsg)}`;

    return (
        <div className="card-premium pricing-card">
            <DynamicContent image={image} />
            <div className="card-title">{title}</div>
            <div className="card-price">{price}</div>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px', minHeight: '60px' }}>{desc}</p>
            <ul className="pricing-features">
                {features.map((f, i) => (
                    <li key={i}>✓ {f}</li>
                ))}
            </ul>
            <a href={waLink} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
                <button className="btn-circle-action">
                    {lang === 'EN' ? 'Order' : 'اطلب'}<br />{lang === 'EN' ? 'Now' : 'الآن'}
                </button>
            </a>
        </div>
    );
};

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

    const whatsappNumber = "201204951383";
    const getWhatsAppLink = (message) => `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    const webServices = [
        {
            title: lang === 'EN' ? 'Business Start' : 'باقة Business Start',
            price: '9,500 EGP',
            image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=1964',
            features: lang === 'EN' ?
                ['Professional Landing Page', 'High Performance', 'Ads Optimization', 'Lead Generation'] :
                ['صفحة هبوط احترافية', 'سرعة فائقة', 'مثالية للإعلانات', 'جمع بيانات العملاء'],
            desc: lang === 'EN' ?
                'Professional Landing Page, ultra-fast, and perfect for ads and lead conversion.' :
                'صفحة هبوط (Landing Page) احترافية، سريعة جداً، ومثالية للإعلانات وجمع بيانات العملاء.',
            whatsappMsg: 'أهلاً، أرغب في الاستفسار عن باقة Business Start لعمل Landing Page'
        },
        {
            title: lang === 'EN' ? 'Corporate Pro' : 'باقة Corporate Pro',
            price: '28,000 EGP',
            image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2015',
            features: lang === 'EN' ?
                ['Complete Business Site', 'Easy CMS Panel', 'Modern UI/UX', 'Brand Focus'] :
                ['موقع شركات متكامل', 'لوحة تحكم سهلة', 'تصميم عصري UI/UX', 'تعزيز العلامة التجارية'],
            desc: lang === 'EN' ?
                'Full corporate website with an easy-to-use CMS and modern design that reflects your brand strength.' :
                'موقع متكامل للشركات مع لوحة تحكم سهلة لتعديل المحتوى وتصميم عصري (UI/UX) يعكس قوة علامتك التجارية.',
            whatsappMsg: 'أهلاً، أعجبني عرض Corporate Pro وأريد البدء في تصميم موقع لشركتي'
        },
        {
            title: lang === 'EN' ? 'Enterprise Store' : 'باقة Enterprise Store',
            price: '55,000 EGP',
            image: 'https://images.unsplash.com/photo-1557821552-17105176677c?q=80&w=2089',
            features: lang === 'EN' ?
                ['Full E-commerce Store', 'Online Payment', 'Stock Management', 'CRM Dashboard'] :
                ['متجر إلكتروني شامل', 'دفع إلكتروني (فيزا)', 'إدارة مخازن', 'لوحة تحكم مبيعات CRM'],
            desc: lang === 'EN' ?
                'Comprehensive e-commerce system with payment gateway, inventory management, and CRM dashboard.' :
                'متجر إلكتروني شامل بنظام دفع بالفيزا، إدارة مخازن، ولوحة تحكم لمتابعة المبيعات والعملاء (CRM).',
            whatsappMsg: 'أهلاً، أريد تفاصيل أكثر عن باقة Enterprise Store لإنشاء متجر إلكتروني متكامل'
        }
    ];

    const systemServices = [
        {
            title: lang === 'EN' ? 'Clinic/Office Management' : 'نظام إدارة العيادات والمكاتب',
            price: '12,000 EGP',
            image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2070',
            features: lang === 'EN' ?
                ['Patient/Client Records', 'Booking System', 'Smart Reports', 'Local/Cloud Support'] :
                ['إدارة ملفات العملاء', 'نظام المواعيد', 'تقارير ذكية', 'دعم سحابي ومحلي'],
            desc: lang === 'EN' ?
                'Smart management system for clinics and offices to organize clients and workflows.' :
                'نظام إدارة ذكي للعيادات والمكاتب لتنظيم شؤون العملاء وسير العمل بدقة.',
            whatsappMsg: 'أهلاً حبيبة، أريد الاستفسار عن نظام إدارة العيادات والمكاتب الذكي'
        },
        {
            title: lang === 'EN' ? 'Inventory & Sales' : 'إدارة المخازن والمبيعات',
            price: '25,000 EGP',
            image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=2070',
            features: lang === 'EN' ?
                ['Advanced Inventory', 'Barcode Integration', 'Profit Analysis', 'Suppliers Manager'] :
                ['إدارة مخازن متطورة', 'دعم الباركود', 'تحليل الأرباح', 'إدارة الموردين'],
            desc: lang === 'EN' ?
                'Advanced inventory and sales tracking system for corporate efficiency.' :
                'نظام متطور لإدارة المخازن وحركة المبيعات مصمم لرفع كفاءة شركتك.',
            whatsappMsg: 'أهلاً، مهتم بنظام إدارة المخازن والمبيعات المتقدم لشركتي'
        },
        {
            title: lang === 'EN' ? 'Enterprise ERP' : 'نظام متكامل (ERP) للمؤسسات',
            price: '45,000 EGP',
            image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1974',
            features: lang === 'EN' ?
                ['Full Department Integration', 'Financial Planning', 'Scalable Architecture', '24/7 Support'] :
                ['ربط كافة القطاعات', 'تخطيط مالي متكامل', 'بنية قابلة للتوسع', 'دعم فني 24/7'],
            desc: lang === 'EN' ?
                'Integrated ERP system for large corporations to manage all sectors seamlessly.' :
                'نظام ERP متكامل للمؤسسات الكبيرة لإدارة كافة قطاعات المؤسسة في مكان واحد.',
            whatsappMsg: 'أهلاً، أريد تفاصيل نظام الـ ERP المتكامل لإدارة كافة قطاعات المؤسسة'
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
                            <PriceCard key={i} {...item} lang={lang} />
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
                            <PriceCard key={i} {...item} lang={lang} />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ServicesPage;

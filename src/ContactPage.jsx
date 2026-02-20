import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Facebook, Instagram, Linkedin, Github, MessageCircle } from 'lucide-react';
import { LanguageContext } from './LanguageContext';

// Selection Modal Component for Contact Page
const ContactSelectionModal = ({ isOpen, onClose, onSelect }) => {
    if (!isOpen) return null;
    return (
        <div className="selection-modal" onClick={onClose} style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', background: 'rgba(0,0,0,0.9)', zIndex: 12000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                className="modal-box"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                onClick={(e) => e.stopPropagation()}
                style={{ background: 'white', padding: '50px', borderRadius: '40px', textAlign: 'center', maxWidth: '450px', width: '90%' }}
            >
                <h2 style={{ fontSize: '1.8rem', marginBottom: '15px', fontWeight: 700 }}>Choose Platform</h2>
                <p style={{ color: '#888', marginBottom: '30px' }}>Where would you like to send your message?</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <button onClick={() => onSelect('whatsapp')} className="nav-link-box" style={{ display: 'block', width: '100%', padding: '20px', background: '#25D366', color: 'white', border: 'none', fontSize: '1.1rem', fontWeight: 600 }}>WhatsApp</button>
                    <button onClick={() => onSelect('facebook')} className="nav-link-box" style={{ display: 'block', width: '100%', padding: '20px', background: '#1877F2', color: 'white', border: 'none', fontSize: '1.1rem', fontWeight: 600 }}>Facebook</button>
                </div>
                <button onClick={onClose} style={{ marginTop: '25px', color: '#888', fontWeight: 500 }}>Cancel</button>
            </motion.div>
        </div>
    );
};

const ContactPage = () => {
    const formRef = useRef();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { lang, t } = React.useContext(LanguageContext);

    const contactT = {
        EN: {
            title: <>Let's start a <br />project together</>,
            name: "What's your name?",
            email: "What's your email?",
            org: "What's the name of your organization?",
            services: "What services are you looking for?",
            message: "Your message",
            send: "Send it!",
            details: "Contact Details",
            socials: "Socials"
        },
        AR: {
            title: <>لنبدأ <br />مشروعاً معاً</>,
            name: "ما هو اسمك؟",
            email: "ما هو بريدك الإلكتروني؟",
            org: "ما اسم منظمتك/شركتك؟",
            services: "ما هي الخدمات التي تبحث عنها؟",
            message: "رسالتك",
            send: "أرسل الآن!",
            details: "تفاصيل الاتصال",
            socials: "وسائل التواصل"
        }
    };

    const ct = contactT[lang];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validate form if needed, then open modal
        setIsModalOpen(true);
    };

    const handleSend = (platform) => {
        const formData = new FormData(formRef.current);
        const name = formData.get('user_name');
        const email = formData.get('user_email');
        const org = formData.get('organization');
        const service = formData.get('service_needed');
        const message = formData.get('message');

        if (platform === 'whatsapp') {
            const waMessage = `Hello Habiba!%0A%0A` +
                `*Name:* ${name}%0A` +
                `*Email:* ${email}%0A` +
                `*Organization:* ${org}%0A` +
                `*Service:* ${service}%0A` +
                `*Message:* ${message}`;

            window.open(`https://wa.me/201204951383?text=${waMessage}`, '_blank');
        } else if (platform === 'facebook') {
            // Since we don't have a specific Facebook Page ID for messaging link structure (m.me/...), 
            // we will redirect to the Facebook profile/page. 
            // Ideally should be https://m.me/yourpageid
            window.open(`https://www.facebook.com/share/18LcxZR83d/`, '_blank');
        }
        setIsModalOpen(false);
    };

    return (
        <div className="contact-page-wrapper">
            <ContactSelectionModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSelect={handleSend}
            />

            <div className="contact-bg-blob"></div>
            <main className="container contact-container">
                <div className="contact-left">
                    <motion.h1
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        style={{ marginBottom: '100px' }}
                    >
                        {ct.title}
                    </motion.h1>

                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className="contact-form-field">
                            <label><span>01</span> {ct.name}</label>
                            <input name="user_name" type="text" placeholder="John Doe *" required />
                        </div>
                        <div className="contact-form-field">
                            <label><span>02</span> {ct.email}</label>
                            <input name="user_email" type="email" placeholder="john@doe.com *" required />
                        </div>
                        <div className="contact-form-field">
                            <label><span>03</span> {ct.org}</label>
                            <input name="organization" type="text" placeholder="Company Name" />
                        </div>
                        <div className="contact-form-field">
                            <label><span>04</span> {ct.services}</label>
                            <input name="service_needed" type="text" placeholder="Web Design, Development..." />
                        </div>
                        <div className="contact-form-field">
                            <label><span>05</span> {ct.message}</label>
                            <textarea name="message" placeholder="..." rows="3"></textarea>
                        </div>

                        <div style={{ marginTop: '50px' }}>
                            <button type="submit" className="send-globe-btn">
                                {ct.send}
                            </button>
                        </div>
                    </form>
                </div>

                <div className="contact-right" style={{ paddingTop: '50px' }}>
                    <div className="contact-card-glass" style={{ background: 'rgba(20,21,22,0.03)', padding: '40px', borderRadius: '40px', border: '1px solid rgba(20,21,22,0.05)' }}>
                        <div style={{ width: '100%', borderRadius: '30px', overflow: 'hidden', marginBottom: '40px' }}>
                            <img src="/imgs/habiba2.png" alt="Habiba" style={{ width: '100%', display: 'block' }} />
                        </div>
                        <h4 style={{ opacity: 0.4, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '20px' }}>{ct.details}</h4>
                        <p style={{ fontSize: '1.4rem', marginBottom: '10px' }}>hm5395681@gmail.com</p>
                        <p style={{ fontSize: '1.4rem' }}>+20 120 495 1383</p>

                        <div style={{ marginTop: '60px' }}>
                            <h4 style={{ opacity: 0.4, textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '0.1em', marginBottom: '20px' }}>{ct.socials}</h4>
                            <div style={{ display: 'flex', gap: '15px' }}>
                                <a href="https://www.facebook.com/share/18LcxZR83d/" target="_blank" className="social-icon-link"><Facebook size={20} /></a>
                                <a href="https://www.instagram.com/habibamohamed8360?igsh=MXQwdGV3bGNkd2t0NA==" target="_blank" className="social-icon-link"><Instagram size={20} /></a>
                                <a href="https://wa.me/201204951383" target="_blank" className="social-icon-link"><MessageCircle size={20} /></a>
                                <a href="https://www.linkedin.com/in/habiba-mohamed-8b9b3a260?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" target="_blank" className="social-icon-link"><Linkedin size={20} /></a>
                                <a href="https://github.com/habibamohamed8360" target="_blank" className="social-icon-link"><Github size={20} /></a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ContactPage;

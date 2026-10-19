import { Mail, MapPin } from "lucide-react";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import logo from "./assets/logo.jpeg";
import "./Footer.css";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">

                <div className="footer-col">
                    <img src={logo} alt="DigitalStore" className="footer-logo" />
                    <p>
                        Des données aux décisions, des idées aux solutions.
                        Nous concevons des outils numériques sur mesure.
                    </p>
                    <div className="footer-socials">
                        <a href="https://www.facebook.com/profile.php?id=61594859519018" target="_blank" rel="noopener noreferrer">
                            <FaFacebook size={18} />
                        </a>
                        <a href="https://www.linkedin.com/in/abdou-hamissou-boni-b191aa332/" target="_blank" rel="noopener noreferrer">
                            <FaLinkedin size={18} />
                        </a>
                    </div>
                </div>

                <div className="footer-col">
                    <h4>Navigation</h4>
                    <Link to="/">Accueil</Link>
                    <Link to="/boutique">Boutique</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/apropos">À propos</Link>

                </div>

                <div className="footer-col">
                    <h4><Link to="/contact" className="ctc">Contact</Link></h4>
                    <p>

                        <a href="mailto:hamissouboni29@gmail.com">
                            <Mail size={16} />
                            hamissouboni29@gmail.com
                        </a>
                    </p>
                    <p>

                        <a href="https://wa.me/2290140413865">
                            <FaWhatsapp size={16} />
                            +229 01 40 41 38 65
                        </a>
                    </p>
                    <p>

                        <a href="https://wa.me/2290153409169" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={16} />
                            +229 01 53 40 91 69
                        </a>
                    </p>
                    <p><MapPin size={16} /> Parakou, Bénin</p>
                </div>

            </div>

            <div className="footer-bottom">
                <p>© {new Date().getFullYear()} DigitalStore. Tous droits réservés.</p>
            </div>
        </footer>
    );
}

export default Footer;
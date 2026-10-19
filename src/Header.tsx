import { useState, useEffect } from "react";
import type { FormEvent } from "react";
import { Search, Menu, X } from "lucide-react";
import logo from "./assets/logo.jpeg";
import "./Header.css";
import { Link, useNavigate } from "react-router-dom";
import { getProducts } from "./productsApi";
import { getServices } from "./ServicesApi";

function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [recherche, setRecherche] = useState("");
    const [categorie, setCategorie] = useState("");
    const [categories, setCategories] = useState<string[]>([]);
    const naviguer = useNavigate();

    const closeMenu = () => setMenuOpen(false);

    useEffect(() => {
        Promise.all([getProducts(), getServices()])
            .then(([produits, services]) => {
                const noms = [
                    ...produits.filter((p) => p.publie).map((p) => p.categorie),
                    ...services.filter((s) => s.publie).map((s) => s.categorie),
                ].filter((nom) => nom !== "");
                setCategories(Array.from(new Set(noms)).sort());
            })
            .catch(() => setCategories([]));
    }, []);

    const naviguerVersRecherche = (terme: string, nomCategorie: string) => {
        const parametres = new URLSearchParams();
        if (terme) parametres.set("q", terme);
        if (nomCategorie) parametres.set("categorie", nomCategorie);
        const chaine = parametres.toString();
        naviguer(chaine ? `/recherche?${chaine}` : "/boutique");
        closeMenu();
    };

    const lancerRecherche = (e: FormEvent) => {
        e.preventDefault();
        naviguerVersRecherche(recherche.trim(), categorie);
    };

    const choisirCategorie = (nomCategorie: string) => {
        setCategorie(nomCategorie);
        naviguerVersRecherche(recherche.trim(), nomCategorie);
    };

    return (
        <header className="site-header">

            {/* Bande 1 : slogan + liens secondaires (desktop uniquement) */}
            <div className="top-bar">
                <p className="slogan">
                    Des données aux décisions. Des idées aux solutions.
                </p>
                <div className="top-links">
                    <Link to="/apropos">À propos</Link>
                    <a href="#">Blog</a>
                    <Link to="/contact">Contact</Link>
                </div>
            </div>

            {/* Bande 2 : logo + recherche + hamburger */}
            <div className="main-bar">
                <div className="logo">
                    <img src={logo} alt="DigitalStore" />
                </div>

                <form className="search-bar" onSubmit={lancerRecherche}>
                    <select
                        className="search-category"
                        value={categorie}
                        onChange={(e) => choisirCategorie(e.target.value)}
                    >
                        <option value="">Catégories</option>
                        {categories.map((nom) => (
                            <option key={nom} value={nom}>{nom}</option>
                        ))}
                    </select>
                    <input
                        type="text"
                        placeholder="Rechercher un produit ou un service..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />
                    <button type="submit" className="search-btn" aria-label="Rechercher">
                        <Search size={18} />
                    </button>
                </form>

                {/* Icône hamburger : visible uniquement sur mobile */}
                <button
                    className="hamburger-btn"
                    aria-label="Ouvrir le menu"
                    onClick={() => setMenuOpen(true)}
                >
                    <Menu size={26} />
                </button>
            </div>

            {/* Bande 3 : navigation (desktop uniquement) */}
            <nav className="nav-bar">
                <div className="navigation">
                    <Link to="/">Accueil</Link>
                    <Link to="/services">Services</Link>
                    <Link to="/boutique">Boutique</Link>
                </div>
            </nav>

            {/* Menu mobile plein écran */}
            <div className={`mobile-menu ${menuOpen ? "open" : ""}`}>
                <div className="mobile-menu-header">
                    <img src={logo} alt="DigitalStore" className="mobile-logo" />
                    <button
                        className="close-btn"
                        aria-label="Fermer le menu"
                        onClick={closeMenu}
                    >
                        <X size={26} />
                    </button>
                </div>

                <select
                    className="mobile-categorie"
                    value={categorie}
                    onChange={(e) => choisirCategorie(e.target.value)}
                >
                    <option value="">Catégories</option>
                    {categories.map((nom) => (
                        <option key={nom} value={nom}>{nom}</option>
                    ))}
                </select>

                <form className="mobile-search" onSubmit={lancerRecherche}>
                    <input
                        type="text"
                        placeholder="Rechercher..."
                        value={recherche}
                        onChange={(e) => setRecherche(e.target.value)}
                    />
                    <button type="submit" aria-label="Rechercher">
                        <Search size={18} />
                    </button>
                </form>

                <div className="mobile-links">
                    <Link to="/" onClick={closeMenu}>Accueil</Link>
                    <Link to="/services" onClick={closeMenu}>Services</Link>
                    <Link to="/boutique" onClick={closeMenu}>Boutique</Link>
                </div>

                <div className="mobile-divider" />

                <div className="mobile-links secondary">
                    <Link to="/apropos" onClick={closeMenu}>À propos</Link>
                    <a href="#" onClick={closeMenu}>Blog</a>
                    <Link to="/contact" onClick={closeMenu}>Contact</Link>
                </div>
            </div>

            {/* Fond sombre derrière le menu ouvert */}
            {menuOpen && <div className="mobile-overlay" onClick={closeMenu} />}

        </header>
    );
}

export default Header;
import {
    BarChart3,
    Code2,
    LayoutDashboard,
    Workflow,
    ClipboardList,
    FileSpreadsheet,
    Globe,
    Lightbulb,
} from "lucide-react";
import { ShieldCheck, Clock, Headphones, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import image1 from "./assets/Image1.jpg";
import image2 from "./assets/Image2.png";
import image3 from "./assets/Image3.png";
import image4 from "./assets/Image4.png";
import image5 from "./assets/Image5.png";
import "./Home.css";
import { useNavigate } from "react-router-dom";

const slides: string[] = [image1, image2, image3, image4, image5];

function Home() {
    const [current, setCurrent] = useState<number>(0);
    const naviguer = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 10000); // 10 secondes

        return () => clearInterval(interval);
    }, []);

    const goToSlide = (index: number) => {
        setCurrent(index);
    };
    const categories = [
        { icon: BarChart3, color: "icon-blue", title: "Data & Statistiques", desc: "Analyses, rapports et études de données" },
        { icon: Code2, color: "icon-teal", title: "Applications & Logiciels", desc: "Outils métiers et applications sur mesure" },
        { icon: LayoutDashboard, color: "icon-purple", title: "Dashboards", desc: "Tableaux de bord clairs et interactifs" },
        { icon: Workflow, color: "icon-orange", title: "Automatisation", desc: "Scripts et workflows automatisés" },
        { icon: ClipboardList, color: "icon-pink", title: "Enquêtes & Collecte", desc: "Formulaires et questionnaires digitalisés" },
        { icon: FileSpreadsheet, color: "icon-green", title: "Templates", desc: "Modèles Excel, Word et PowerPoint prêts à l'emploi" },
        { icon: Globe, color: "icon-indigo", title: "Solutions Web", desc: "Sites vitrines et applications web" },
        { icon: Lightbulb, color: "icon-navy", title: "Consulting & Stratégie", desc: "Accompagnement personnalisé pour vos projets" },
    ];
    const reasons = [
        { icon: ShieldCheck, title: "Solutions fiables", desc: "Des outils testés et adaptés à vos besoins réels" },
        { icon: Clock, title: "Livraison rapide", desc: "Des délais courts sans sacrifier la qualité" },
        { icon: Headphones, title: "Accompagnement", desc: "Un suivi personnalisé avant et après la livraison" },
        { icon: Sparkles, title: "Sur mesure", desc: "Chaque solution est pensée pour votre contexte" },
    ];
    return (
        <main className="home">
            <section className="hero">
                {/* Images en arrière-plan, superposées, une seule visible à la fois */}
                <div className="hero-background">
                    {slides.map((img, index) => (
                        <div
                            key={index}
                            className={`hero-slide ${index === current ? "active" : ""}`}
                            style={{ backgroundImage: `url(${img})` }}
                        />
                    ))}
                    <div className="hero-overlay" />
                </div>

                {/* Texte par-dessus les images */}
                <div className="hero-content">

                    <p>
                        Nous concevons des solutions numériques qui combinent analyse de
                        données, statistiques et développement logiciel.
                    </p>

                    <p>
                        Applications, dashboards, outils statistiques, automatisations,
                        questionnaires d'enquête et solutions web : nous transformons vos
                        besoins en outils concrets, simples et efficaces.
                    </p>

                    <div className="hero-buttons">
                        <button onClick={() => naviguer("/boutique")}>Voir nos produits</button>
                        <button onClick={() => naviguer("/services")}>Découvrir nos services</button>
                    </div>
                </div>

                {/* Dots cliquables pour naviguer entre les slides */}
                <div className="hero-dots">
                    {slides.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === current ? "active" : ""}`}
                            onClick={() => goToSlide(index)}
                        />
                    ))}
                </div>
            </section>
            <section className="categories">
                <h2>Nos catégories</h2>
                <p className="categories-subtitle">
                    Des solutions numériques adaptées à vos besoins
                </p>

                <div className="categories-grid">
                    {categories.map((cat, index) => (
                        <div className="category-card" key={index}>
                            <div className={`icon-circle ${cat.color}`}>
                                <cat.icon size={28} />
                            </div>
                            <h3>{cat.title}</h3>
                            <p>{cat.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
            <section className="why-us">
                <h2>Pourquoi nous choisir</h2>
                <p className="why-us-subtitle">
                    Une approche pensée pour votre réussite
                </p>

                <div className="why-us-grid">
                    {reasons.map((reason, index) => (
                        <div className="why-us-card" key={index}>
                            <div className="why-us-icon">
                                <reason.icon size={26} />
                            </div>
                            <h3>{reason.title}</h3>
                            <p>{reason.desc}</p>
                        </div>
                    ))}
                </div>
            </section>
        </main>
    );
}

export default Home;
import {
    BarChart3,
    Database,
    Laptop,
    Target,
    Users,
    ShieldCheck
} from "lucide-react";
import { Link } from "react-router-dom";
import "./About.css";
import ImageApropos from "./assets/ImageApropos.png";

function About() {
    return (
        <main className="about">

            {/* HERO */}
            <section className="about-header">


                <h1>À propos de nous</h1>

                <p>
                    Des données aux décisions, des idées aux solutions.
                </p>
            </section>


            {/* IMAGE / INTRODUCTION */}
            <section className="about-intro">

                <div className="about-image">
                    <img
                        src={ImageApropos}
                        alt="DigitalStore - Data, statistique et solutions numériques"
                    />

                    <div className="image-overlay">
                        <span>DigitalStore</span>
                        <strong>
                            DATA • STATISTIQUE • NUMÉRIQUE
                        </strong>
                    </div>
                </div>

            </section>


            {/* HISTOIRE */}
            <section className="about-story">

                <div className="section-label">
                    NOTRE HISTOIRE
                </div>

                <h2>
                    Une vision née de la rencontre entre
                    la statistique et le numérique
                </h2>

                <p>
                    DigitalStore a été fondé par{" "}
                    <a
                        href="https://www.linkedin.com/in/abdou-hamissou-boni-b191aa332/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="founder-link"
                    >
                        Abdou-Hamissou BONI
                    </a>
                    , statisticien et concepteur de solutions numériques,
                    avec une conviction simple : les données et les
                    technologies peuvent transformer des besoins concrets
                    en solutions utiles.
                </p>

                <p>
                    DigitalStore associe la statistique, l'analyse de données
                    et les technologies numériques afin d'accompagner les
                    particuliers, entreprises et organisations dans leurs
                    projets.
                </p>

                <p>
                    Notre approche consiste à comprendre le besoin,
                    analyser les données disponibles et concevoir une
                    solution adaptée, accessible et réellement exploitable.
                </p>

                <p>
                    Aujourd'hui, DigitalStore intervient notamment dans
                    l'analyse et le traitement des données, la conception
                    de tableaux de bord, l'automatisation des tâches,
                    la digitalisation des enquêtes et le développement
                    de solutions web.
                </p>

            </section>


            {/* DOMAINES */}
            <section className="expertise">

                <div className="section-label">
                    NOS DOMAINES D'EXPERTISE
                </div>

                <h2>
                    Des compétences au service de vos projets
                </h2>

                <div className="expertise-grid">

                    <div className="expertise-card">
                        <BarChart3 size={34} />
                        <h3>Statistique & Data</h3>
                        <p>
                            Analyse statistique, traitement des données,
                            visualisation, interprétation et aide à la décision.
                        </p>
                    </div>

                    <div className="expertise-card">
                        <Database size={34} />
                        <h3>Collecte & Digitalisation</h3>
                        <p>
                            Conception de questionnaires, collecte numérique,
                            structuration et gestion des bases de données.
                        </p>
                    </div>

                    <div className="expertise-card">
                        <Laptop size={34} />
                        <h3>Solutions numériques</h3>
                        <p>
                            Conception de sites web, outils numériques,
                            automatisation et solutions adaptées aux besoins.
                        </p>
                    </div>

                </div>

            </section>


            {/* VALEURS */}
            <section className="values-section">

                <div className="section-label">
                    NOS ENGAGEMENTS
                </div>

                <h2>
                    Ce qui guide notre travail
                </h2>

                <div className="values-grid">

                    <div className="value-card">
                        <ShieldCheck size={30} />
                        <h3>Rigueur</h3>
                        <p>
                            Nous accordons une importance particulière
                            à la qualité, à la fiabilité et à la cohérence
                            des données et des résultats.
                        </p>
                    </div>

                    <div className="value-card">
                        <Target size={30} />
                        <h3>Solutions concrètes</h3>
                        <p>
                            Nous privilégions des solutions utiles,
                            compréhensibles et adaptées aux besoins réels.
                        </p>
                    </div>

                    <div className="value-card">
                        <Users size={30} />
                        <h3>Accompagnement</h3>
                        <p>
                            Nous restons à l'écoute de nos clients,
                            de l'identification du besoin jusqu'à la
                            mise en œuvre de la solution.
                        </p>
                    </div>

                </div>

            </section>





            {/* CTA */}
            <section className="about-cta">

                <div className="section-label">
                    PASSONS À L'ACTION
                </div>

                <h2>
                    Vous avez un projet ?
                </h2>

                <p>
                    Parlons de votre besoin et construisons ensemble
                    une solution adaptée.
                </p>

                <Link
                    to="/contact"
                    className="about-btn"
                >
                    Contactez-nous
                </Link>

            </section>

        </main>
    );
}

export default About;
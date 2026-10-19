import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getProducts, prixAffiche } from "./productsApi";
import type { Product } from "./productsApi";
import { getServices } from "./ServicesApi";
import type { Service } from "./ServicesApi";
import { scoreRecherche } from "./rechercheFloue";
import "./Boutique.css";
import "./Recherche.css";

function Recherche() {
    const [params] = useSearchParams();
    const terme = (params.get("q") ?? "").trim();
    const categorie = params.get("categorie") ?? "";

    const [produits, setProduits] = useState<Product[]>([]);
    const [services, setServices] = useState<Service[]>([]);
    const [chargement, setChargement] = useState(true);
    const [erreur, setErreur] = useState(false);

    useEffect(() => {
        Promise.all([getProducts(), getServices()])
            .then(([listeProduits, listeServices]) => {
                setProduits(listeProduits);
                setServices(listeServices);
            })
            .catch(() => setErreur(true))
            .finally(() => setChargement(false));
    }, []);

    const produitsTrouves = produits
        .filter((p) => p.publie && (!categorie || p.categorie === categorie))
        .map((p) => ({
            element: p,
            score: scoreRecherche(terme, `${p.nom} ${p.description} ${p.categorie}`),
        }))
        .filter((r) => r.score !== null)
        .sort((a, b) => (a.score as number) - (b.score as number) || a.element.ordre - b.element.ordre)
        .map((r) => r.element);

    const servicesTrouves = services
        .filter((s) => s.publie && (!categorie || s.categorie === categorie))
        .map((s) => ({
            element: s,
            score: scoreRecherche(terme, `${s.nom} ${s.description} ${s.categorie}`),
        }))
        .filter((r) => r.score !== null)
        .sort((a, b) => (a.score as number) - (b.score as number) || a.element.ordre - b.element.ordre)
        .map((r) => r.element);

    const aucunResultat = produitsTrouves.length === 0 && servicesTrouves.length === 0;

    let titre = "Tous les résultats";
    if (terme && categorie) titre = `Résultats pour « ${terme} » dans ${categorie}`;
    else if (terme) titre = `Résultats pour « ${terme} »`;
    else if (categorie) titre = `Catégorie : ${categorie}`;

    return (
        <main className="recherche">
            <h1>{titre}</h1>

            {chargement && <p className="boutique-message">Chargement...</p>}
            {erreur && <p className="boutique-message">Impossible de charger la recherche.</p>}
            {!chargement && !erreur && aucunResultat && (
                <p className="boutique-message">
                    Aucun résultat. Essayez un autre mot, ou parcourez la{" "}
                    <Link to="/boutique">boutique</Link> et les{" "}
                    <Link to="/services">services</Link>.
                </p>
            )}

            {produitsTrouves.length > 0 && (
                <section className="recherche-section">
                    <h2>Produits ({produitsTrouves.length})</h2>
                    <div className="products-grid">
                        {produitsTrouves.map((produit) => (
                            <div className="product-card" key={produit.id}>
                                {produit.image ? (
                                    <img src={produit.image} alt={produit.nom} className="product-image" />
                                ) : (
                                    <div className="product-image-placeholder" />
                                )}
                                <h3>{produit.nom}</h3>
                                <p className="product-category">{produit.categorie}</p>
                                <p className="product-price">{prixAffiche(produit.prix)}</p>
                                <Link to={`/boutique/${produit.id}`} className="product-link">
                                    Voir le produit
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {servicesTrouves.length > 0 && (
                <section className="recherche-section">
                    <h2>Services ({servicesTrouves.length})</h2>
                    <div className="services-resultats">
                        {servicesTrouves.map((service) => (
                            <div className="service-resultat" key={service.id}>
                                <h3>{service.nom}</h3>
                                <p>{service.description}</p>
                                <Link
                                    to={`/contact?service=${encodeURIComponent(service.nom)}`}
                                    className="product-link"
                                >
                                    Demander ce service
                                </Link>
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}

export default Recherche;
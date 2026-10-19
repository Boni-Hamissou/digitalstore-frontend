import { useState, useEffect } from "react";
import { getProducts, prixAffiche } from "./productsApi";
import type { Product } from "./productsApi";
import "./Boutique.css";
import { Link } from "react-router-dom";

function Boutique() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getProducts()
            .then((data) => setProducts(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const visibleProducts = products
        .filter((p) => p.publie)
        .sort((a, b) => a.ordre - b.ordre);

    return (
        <main className="boutique">
            <h1>Notre Boutique</h1>
            <p className="boutique-subtitle">
                Découvrez nos produits numériques
            </p>

            {loading && <p className="boutique-message">Chargement...</p>}
            {error && <p className="boutique-message">Impossible de charger les produits.</p>}
            {!loading && !error && visibleProducts.length === 0 && (
                <p className="boutique-message">Aucun produit disponible pour le moment.</p>
            )}

            <div className="products-grid">
                {visibleProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        {product.image ? (
                            <img src={product.image} alt={product.nom} className="product-image" />
                        ) : (
                            <div className="product-image-placeholder" />
                        )}
                        <h3>{product.nom}</h3>
                        <p className="product-category">{product.categorie}</p>
                        <p className="product-price">{prixAffiche(product.prix)}</p>
                        <Link to={`/boutique/${product.id}`} className="product-link">
                            Voir le produit
                        </Link>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Boutique;
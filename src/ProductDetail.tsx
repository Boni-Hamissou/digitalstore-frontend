import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getProduct, createOrder, prixAffiche } from "./productsApi";
import type { Product } from "./productsApi";
import "./ProductDetail.css";

function getEmbedUrl(url: string): string | null {
    try {
        const u = new URL(url);
        let videoId = "";
        if (u.hostname.includes("youtu.be")) {
            videoId = u.pathname.slice(1);
        } else if (u.hostname.includes("youtube.com")) {
            videoId = u.searchParams.get("v") || u.pathname.split("/").pop() || "";
        }
        return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
    } catch {
        return null;
    }
}

function ProductDetail() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    const [showModal, setShowModal] = useState(false);
    const [email, setEmail] = useState("");
    const [ordering, setOrdering] = useState(false);
    const [orderError, setOrderError] = useState("");

    useEffect(() => {
        if (!id) return;
        getProduct(id)
            .then((data) => setProduct(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [id]);

    const closeModal = () => {
        setShowModal(false);
        setOrderError("");
    };

    const handleBuy = async () => {
        if (!product) return;
        if (!email.includes("@")) {
            setOrderError("Entre une adresse email valide.");
            return;
        }
        setOrderError("");
        setOrdering(true);
        try {
            const newOrder = await createOrder(product.id, email);
            navigate(`/commande/${newOrder.token}`);
        } catch {
            setOrderError("Impossible de créer la commande. Réessaie.");
        } finally {
            setOrdering(false);
        }
    };

    if (loading) return <p className="boutique-message">Chargement...</p>;
    if (error || !product) return <p className="boutique-message">Produit introuvable.</p>

    return (
        <main className="detail">
            <Link to="/boutique" className="detail-back">← Retour à la boutique</Link>

            <div className="detail-top">
                {product.image ? (
                    <img src={product.image} alt={product.nom} className="detail-image" />
                ) : (
                    <div className="detail-image-placeholder" />
                )}

                <div className="detail-info">
                    {product.categorie && (
                        <span className="detail-category">{product.categorie}</span>
                    )}
                    <h1>{product.nom}</h1>
                    <p className="detail-description">{product.description}</p>
                    <p className="detail-price">{prixAffiche(product.prix)}</p>
                    <button className="detail-buy" onClick={() => setShowModal(true)}>
                        Acheter
                    </button>
                    <p className="detail-note">
                        Téléchargement disponible dès que le paiement est confirmé.
                    </p>
                    <p className="detail-note">
                        <Link to={`/contact?produit=${encodeURIComponent(product.nom)}`}>
                            Une question sur ce produit ?
                        </Link>
                    </p>
                </div>
            </div>

            {product.description_detaillee && (
                <section className="detail-section">
                    <h2>Description détaillée</h2>
                    <p className="detail-long">{product.description_detaillee}</p>
                </section>
            )}

            {product.video_url && getEmbedUrl(product.video_url) && (
                <section className="detail-section">
                    <h2>Démo en vidéo</h2>
                    <div className="detail-video">
                        <iframe
                            src={getEmbedUrl(product.video_url) as string}
                            title={`Démo de ${product.nom}`}
                            allowFullScreen
                        />
                    </div>
                </section>
            )}


            {showModal && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
                        <h3>Dernière étape</h3>
                        <p>
                            Entre ton email : ton lien de commande y sera associé,
                            pour retrouver ton achat si besoin.
                        </p>
                        <input
                            type="email"
                            placeholder="ton@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoFocus
                        />
                        {orderError && <p className="modal-error">{orderError}</p>}
                        <button className="detail-buy" onClick={handleBuy} disabled={ordering}>
                            {ordering ? "Création..." : "Continuer vers le paiement"}
                        </button>
                        <button className="modal-cancel" onClick={closeModal}>
                            Annuler
                        </button>
                    </div>
                </div>
            )}
        </main>
    );
}

export default ProductDetail;
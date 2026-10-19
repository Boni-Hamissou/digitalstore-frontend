import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useKKiaPay } from "kkiapay-react";
import {
    getOrderStatus,
    confirmPayment,
    getDownloadUrl,
    prixAffiche,
} from "./productsApi";
import type { OrderStatus } from "./productsApi";

function OrderPage() {
    const { token } = useParams();
    const { openKkiapayWidget, addKkiapayListener, removeKkiapayListener } = useKKiaPay();

    const [order, setOrder] = useState<OrderStatus | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [payMessage, setPayMessage] = useState("");

    const loadOrder = () => {
        if (!token) return;
        setLoading(true);
        getOrderStatus(token)
            .then((data) => setOrder(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    };

    useEffect(loadOrder, [token]);

    useEffect(() => {
        const successHandler = async (response: { transactionId?: string }) => {
            console.log("Réponse Kkiapay :", response);
            if (!token || !response?.transactionId) {
                setPayMessage("Paiement effectué, mais identifiant de transaction introuvable.");
                return;
            }
            setPayMessage("Vérification du paiement...");
            try {
                await confirmPayment(token, response.transactionId);
                setPayMessage("");
            } catch {
                setPayMessage("Le paiement n'a pas pu être confirmé. Actualise la page dans un instant.");
            }
            loadOrder();
        };

        const failureHandler = () => {
            setPayMessage("Le paiement a échoué. Tu peux réessayer.");
        };

        addKkiapayListener("success", successHandler);
        addKkiapayListener("failed", failureHandler);

        return () => {
            removeKkiapayListener("success");
            removeKkiapayListener("failed");
        };
    }, [token, addKkiapayListener, removeKkiapayListener]);

    const handlePay = () => {
        if (!order) return;
        setPayMessage("");
        openKkiapayWidget({
            amount: Number(order.montant),
            api_key: import.meta.env.VITE_KKIAPAY_PUBLIC_KEY,
            sandbox: true,
            partnerId: order.token,
        });
    };

    if (loading) return <p className="boutique-message">Chargement...</p>;
    if (error || !order) return <p className="boutique-message">Commande introuvable.</p>;

    return (
        <main className="boutique">
            <h1>Ta commande</h1>
            <p>{order.produit_nom}</p>
            <p className="product-price">{prixAffiche(order.montant)}</p>

            {order.statut === "payee" ? (
                <div>
                    <p className="boutique-message">Paiement confirmé. Merci pour ton achat.</p>
                    <a className="product-link" href={getDownloadUrl(order.token)}>
                        Télécharger
                    </a>
                </div>
            ) : (
                <div>
                    <p className="boutique-message">
                        Paiement non confirmé pour l'instant (statut : {order.statut}).
                    </p>
                    <button className="product-link" onClick={handlePay}>
                        Payer maintenant
                    </button>{" "}
                    <button className="product-link" onClick={loadOrder}>
                        Actualiser
                    </button>
                    {payMessage && <p className="boutique-message">{payMessage}</p>}
                </div>
            )}

            <p style={{ marginTop: 24 }}>
                <Link to="/boutique">← Retour à la boutique</Link>
            </p>
            <p className="boutique-message" style={{ fontSize: 13 }}>
                Garde cette page dans tes favoris : son adresse est le lien de ta commande.
                Un problème après paiement ? Écris-nous sur{" "}
                <a href="https://wa.me/2290153409169" target="_blank" rel="noreferrer">WhatsApp</a>{" "}
                ou à <a href="mailto:hamissouboni29@gmail.com">hamissouboni29@gmail.com</a>, avec ton numéro de commande.
            </p>
            <p className="boutique-message" style={{ fontSize: 13 }}>
                <Link to={`/contact?commande=${order.token}`}>
                    Un problème avec cette commande ?
                </Link>
            </p>
        </main>
    );
}

export default OrderPage;
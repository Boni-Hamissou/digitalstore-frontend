export type Product = {
    id: number;
    nom: string;
    description: string;
    description_detaillee: string;
    video_url: string;
    problemes_resolus: string;
    categorie: string;
    prix: string;
    image: string | null;
    fichier: string | null;
    publie: boolean;
    ordre: number;
};

const API_URL = "http://127.0.0.1:8000/api/products/";

export async function getProducts(): Promise<Product[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erreur lors du chargement des produits");
    }

    return response.json();
}

export function formatPrix(prix: string): string {
    const nombre = parseFloat(prix);
    return new Intl.NumberFormat('fr-FR').format(nombre) + ' FCFA';
}

export async function getProduct(id: string): Promise<Product> {
    const response = await fetch(`${API_URL}${id}/`);

    if (!response.ok) {
        throw new Error("Produit introuvable");
    }

    return response.json();
}

const ORDERS_URL = "http://127.0.0.1:8000/api/orders/";

export type Order = {
    id: number;
    produit: number;
    email: string;
    montant: string;
    statut: string;
    token: string;
};

export async function createOrder(produitId: number, email: string): Promise<Order> {
    const response = await fetch(ORDERS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produit: produitId, email }),
    });

    if (!response.ok) {
        throw new Error("Impossible de créer la commande");
    }

    return response.json();
}

export type OrderStatus = {
    produit_nom: string;
    montant: string;
    statut: string;
    token: string;
};

export async function getOrderStatus(token: string): Promise<OrderStatus> {
    const response = await fetch(`${ORDERS_URL}${token}/`);

    if (!response.ok) {
        throw new Error("Commande introuvable");
    }

    return response.json();
}

export function getDownloadUrl(token: string): string {
    return `http://127.0.0.1:8000/api/download/${token}/`;
}

export async function confirmPayment(token: string, transactionId: string): Promise<OrderStatus> {
    const response = await fetch(`${ORDERS_URL}${token}/confirm/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ transactionId }),
    });

    if (!response.ok) {
        throw new Error("Paiement non confirmé");
    }

    return response.json();
}

const TAUX_CARTE = 0.04;

export function prixAffiche(prix: string): string {
    const total = Math.round(parseFloat(prix) * (1 + TAUX_CARTE));
    return new Intl.NumberFormat('fr-FR').format(total) + ' FCFA';
}
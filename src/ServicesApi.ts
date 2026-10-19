export type Service = {
    id: number;
    nom: string;
    description: string;
    categorie: string;
    image: string | null;
    publie: boolean;
    ordre: number;
};

const API_URL = "http://127.0.0.1:8000/api/services/";

export async function getServices(): Promise<Service[]> {
    const response = await fetch(API_URL);

    if (!response.ok) {
        throw new Error("Erreur lors du chargement des services");
    }

    return response.json();
}
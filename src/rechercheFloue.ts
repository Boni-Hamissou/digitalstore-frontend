export function normaliser(texte: string): string {
    return texte
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");
}

function decouperEnMots(texte: string): string[] {
    return normaliser(texte)
        .split(/[^a-z0-9]+/)
        .filter((mot) => mot !== "");
}

function distanceEdition(a: string, b: string): number {
    let precedente: number[] = Array.from({ length: b.length + 1 }, (_, j) => j);
    for (let i = 1; i <= a.length; i++) {
        const courante: number[] = [i];
        for (let j = 1; j <= b.length; j++) {
            const cout = a[i - 1] === b[j - 1] ? 0 : 1;
            courante[j] = Math.min(
                precedente[j] + 1,
                courante[j - 1] + 1,
                precedente[j - 1] + cout
            );
        }
        precedente = courante;
    }
    return precedente[b.length];
}

function erreursAutorisees(mot: string): number {
    if (mot.length <= 3) return 0;
    if (mot.length <= 6) return 1;
    return 2;
}

/** Retourne un score (0 = parfait) ou null si le texte ne correspond pas. */
export function scoreRecherche(requete: string, texte: string): number | null {
    const motsRequete = decouperEnMots(requete);
    if (motsRequete.length === 0) return 0;

    const texteNormalise = normaliser(texte);
    const motsTexte = decouperEnMots(texte);
    let total = 0;

    for (const mot of motsRequete) {
        if (texteNormalise.includes(mot)) continue;

        let meilleure = Infinity;
        for (const motTexte of motsTexte) {
            meilleure = Math.min(meilleure, distanceEdition(mot, motTexte));
        }
        if (meilleure > erreursAutorisees(mot)) return null;
        total += meilleure;
    }
    return total;
}
import { useState } from "react";
import type { MouseEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { Mail, MapPin } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import "./Contact.css";

const EMAIL_CONTACT = "hamissouboni29@gmail.com";
const NUMERO_WHATSAPP = "2290153409169";
const FORMAT_JETON = /^[0-9a-fA-F-]{36}$/;

function Contact() {
    const [params] = useSearchParams();
    const service = (params.get("service") ?? "").trim();
    const produit = (params.get("produit") ?? "").trim();
    const jetonCommande = (params.get("commande") ?? "").trim();

    const [nom, setNom] = useState("");
    const [message, setMessage] = useState("");

    let objet = "Message via DigitalStore";
    let contexte = "";
    let lignesContexte: string[] = [];

    if (service) {
        objet = `Demande de service : ${service}`;
        contexte = objet;
        lignesContexte = [`Service concerné : ${service}`];
    } else if (produit) {
        objet = `Question sur le produit : ${produit}`;
        contexte = objet;
        lignesContexte = [`Produit concerné : ${produit}`];
    } else if (FORMAT_JETON.test(jetonCommande)) {
        objet = "Réclamation";
        contexte = "Réclamation sur votre commande";
        lignesContexte = [
            `Page de la commande : ${window.location.origin}/commande/${jetonCommande}`,
        ];
    }

    const construireMessage = () =>
        [
            "Bonjour DigitalStore,",
            "",
            `Nom : ${nom}`,
            ...lignesContexte,
            "",
            message,
        ].join("\n");

    const envoyerParWhatsApp = (e: MouseEvent<HTMLButtonElement>) => {
        if (!e.currentTarget.form?.reportValidity()) return;
        const texte = `Objet : ${objet}\n\n${construireMessage()}`;
        window.open(
            `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(texte)}`,
            "_blank"
        );
    };

    const envoyerParEmail = (e: MouseEvent<HTMLButtonElement>) => {
        if (!e.currentTarget.form?.reportValidity()) return;
        window.location.href =
            `mailto:${EMAIL_CONTACT}?subject=${encodeURIComponent(objet)}` +
            `&body=${encodeURIComponent(construireMessage())}`;
    };

    return (
        <main className="contact">
            <h1>Contactez-nous</h1>
            <p className="contact-subtitle">
                Décrivez votre besoin, nous revenons vers vous rapidement
            </p>

            <div className="contact-layout">
                <div className="contact-info">
                    <h3>Nos coordonnées</h3>
                    <p>
                        <a href={`mailto:${EMAIL_CONTACT}`}>
                            <Mail size={18} />
                            {EMAIL_CONTACT}
                        </a>
                    </p>
                    <p>
                        <a href="https://wa.me/2290140413865" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={18} />
                            +229 01 40 41 38 65
                        </a>
                    </p>
                    <p>
                        <a href="https://wa.me/2290153409169" target="_blank" rel="noopener noreferrer">
                            <FaWhatsapp size={18} />
                            +229 01 53 40 91 69
                        </a>
                    </p>
                    <p>
                        <MapPin size={18} />
                        Parakou, Bénin
                    </p>
                </div>

                <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
                    {contexte && <p className="contact-contexte">{contexte}</p>}

                    <label>Votre nom</label>
                    <input
                        type="text"
                        required
                        value={nom}
                        onChange={(e) => setNom(e.target.value)}
                    />

                    <label>Votre message</label>
                    <textarea
                        rows={5}
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                    />

                    <div className="contact-boutons">

                        <button type="button" onClick={envoyerParEmail}>
                            <Mail size={16} />
                            Continuer par email
                        </button>

                        <button type="button" onClick={envoyerParWhatsApp}>
                            <FaWhatsapp size={16} />
                            Continuer sur WhatsApp
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default Contact;
import { useState, useEffect } from "react";
import { Briefcase } from "lucide-react";
import { Link } from "react-router-dom";
import { getServices } from "./ServicesApi";
import type { Service } from "./ServicesApi";
import "./Services.css";

function Services() {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        getServices()
            .then((data) => setServices(data))
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, []);

    const visibleServices = services
        .filter((s) => s.publie)
        .sort((a, b) => a.ordre - b.ordre);

    return (
        <main className="services">
            <h1>Nos services</h1>
            <p className="services-subtitle">
                Des solutions sur mesure, portées par une expertise statistique
            </p>

            {loading && <p className="services-message">Chargement...</p>}
            {error && <p className="services-message">Impossible de charger les services.</p>}
            {!loading && !error && visibleServices.length === 0 && (
                <p className="services-message">Aucun service disponible pour le moment.</p>
            )}

            <div className="services-grid">
                {visibleServices.map((service) => (
                    <div
                        className="service-card"
                        key={service.id}
                        style={service.image ? { backgroundImage: `url(${service.image})` } : undefined}
                    >
                        <div className="service-overlay" />
                        <div className="service-content">
                            {!service.image && (
                                <div className="service-icon">
                                    <Briefcase size={28} />
                                </div>
                            )}
                            <h3>{service.nom}</h3>
                            <p>{service.description}</p>
                            <Link
                                to={`/contact?service=${encodeURIComponent(service.nom)}`}
                                className="service-btn"
                            >
                                Demander ce service
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}

export default Services;
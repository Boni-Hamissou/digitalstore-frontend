import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import Boutique from "./Boutique";
import Services from "./Services";
import Footer from "./Footer";
import Contact from "./Contact";
import About from "./About";
import ProductDetail from "./ProductDetail";
import OrderPage from "./OrderPage";
import Recherche from "./Recherche";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/boutique" element={<Boutique />} />
        <Route path="/services" element={<Services />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/apropos" element={<About />} />
        <Route path="/boutique/:id" element={<ProductDetail />} />
        <Route path="/commande/:token" element={<OrderPage />} />
        <Route path="/recherche" element={<Recherche />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
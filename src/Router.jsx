import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import {
  Home,
  About,
  Services,
  Contact,
  ServiceDetail,
  Book,
  Booking,
  ThankYou,
} from "./components/page/Export";


const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="services" element={<Services />} />
        <Route path="contact" element={<Contact />} />
        <Route path="service/:id" element={<ServiceDetail />} />
        <Route path="booking/:id" element={<Booking />} />
        <Route path="book" element={<Book />} />
        <Route path="thankyou" element={<ThankYou />} />
      </Route>
    </Routes>
  );
};

export default Router;

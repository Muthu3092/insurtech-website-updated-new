import React from "react";
import "@/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@/components/site/Layout";
import Home from "@/pages/site/Home";
import About from "@/pages/site/About";
import Services from "@/pages/site/Services";
import ServiceSingle from "@/pages/site/ServiceSingle";
import Pricing from "@/pages/site/Pricing";
import Team from "@/pages/site/Team";
import Blog from "@/pages/site/Blog";
import BlogSingle from "@/pages/site/BlogSingle";
import Testimonials from "@/pages/site/Testimonials";
import Contact from "@/pages/site/Contact";
import NotFound from "@/pages/site/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/services/:slug" element={<ServiceSingle />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogSingle />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

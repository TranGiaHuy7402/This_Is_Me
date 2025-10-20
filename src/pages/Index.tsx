import Hero from "@/components/Hero";
import About from "@/components/About";
// import Gallery from "@/components/Gallery"; // ❌ tạm ẩn
import Video from "@/components/Video"; // ✅ thêm dòng này
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import LanguageToggle from "@/components/LanguageToggle";

const Index = () => {
  return (
    <div className="min-h-screen">
      <LanguageToggle />
      <Hero />
      <About />
      {/* <Gallery /> */} {/* ❌ tạm ẩn gallery */}
      <Video /> {/* ✅ thay bằng video */}
      <Contact />
      <Footer />
    </div>
  );
};

export default Index;

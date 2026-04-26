import Header from "@/features/landing/components/Header";
import Footer from "@/features/landing/components/Footer";
import { useLocation } from "react-router-dom";

export default function MainLayout({ children }) {
  const location = useLocation();
  const isChat = location.pathname === "/chat";

  return (
    <div className={`min-h-screen flex flex-col ${isChat ? "h-screen overflow-hidden" : ""}`}>
      <Header />
      <main className={`flex-1 ${isChat ? "h-[calc(100vh-73px)] overflow-hidden" : ""}`}>{children}</main>
      {!isChat && <Footer />}
    </div>
    
  );
}
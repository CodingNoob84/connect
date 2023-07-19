import Bodycontent from "@/components/segments/Bodycontent";
import Footer from "@/components/segments/Footer";
import Navbar from "@/components/segments/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="max-w-screen min-h-screen bg-slate-100 p-2">
      <Navbar />
      <Bodycontent />
      <Footer />
    </main>
  );
}

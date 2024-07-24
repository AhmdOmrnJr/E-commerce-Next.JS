import { Inter } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import '@fortawesome/fontawesome-free/js/all.min.js';
import 'react-toastify/dist/ReactToastify.css';
import "./globals.css";
import Navbar from "./(Components)/Navbar/navbar";
import Footer from "./(Components)/Footer/Footer";
import UseBootstrap from "./Hooks/UseBootstrap";
import { ToastContainer } from "react-toastify";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "E Commerce",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  
  

  return (
    <html lang="en">
      <body className={inter.className}>
        <UseBootstrap />
        <ToastContainer />
        <Navbar/>
        <div className="container">{children}</div>
        <Footer />
        </body>
    </html>
  );
}

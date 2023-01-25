import NavBar from "@/components/Navbar.component";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <NavBar />
      <Component {...pageProps} />
    </>
  );
}

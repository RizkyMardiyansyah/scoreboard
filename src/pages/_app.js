import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

function MyApp({ Component, pageProps }) {
  return (
    <main className={poppins.className}>
      <ClerkProvider {...pageProps} publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
        <Component {...pageProps} />
      </ClerkProvider>
    </main>
  );
}

export default MyApp;

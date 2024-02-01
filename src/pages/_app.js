import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProps } from "next/app";

function MyApp({ Component, pageProps }) {
  return (
    <ClerkProvider {...pageProps}>
      <Component {...pageProps} />
    </ClerkProvider>
  );
}

export default MyApp;

import "../styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";

function MyApp({ Component, pageProps }) {
  return (
    <main className={``}>
      <ClerkProvider {...pageProps}>
        <Component {...pageProps} />
      </ClerkProvider>
    </main>
  );
}

export default MyApp;

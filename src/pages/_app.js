import "../app/globals.css";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { StopwatchProvider } from "@/components/StopwatchContext";

function MyApp({ Component, pageProps }) {
  return (
    <StopwatchProvider>
      <Component {...pageProps} />
    </StopwatchProvider>
  );
}

export default MyApp;

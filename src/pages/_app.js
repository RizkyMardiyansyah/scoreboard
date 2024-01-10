import "../app/globals.css";
import { ComponentProvider } from "../components/ComponentContext"; // Import your context provider
import { StopwatchProvider } from "@/components/StopwatchContext";
import { Provider } from "react-redux";
import store from "@/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
      {/* <StopwatchProvider>
        <Component {...pageProps} />
      </StopwatchProvider> */}
      {/* <ComponentProvider>
        {" "}
        <Component {...pageProps} />
      </ComponentProvider> */}
    </>
  );
}

export default MyApp;
// pages/_app.js

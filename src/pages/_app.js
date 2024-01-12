import "../app/globals.css";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { StopwatchProvider } from "@/components/StopwatchContext";

function MyApp({ Component, pageProps }) {
  return (
    // <>
    //   {
    //     <Provider store={store}>
    //       <Component {...pageProps} />
    //     </Provider>
    //   }
    // </>
    <StopwatchProvider>
      <Component {...pageProps} />
    </StopwatchProvider>
  );
}

export default MyApp;

import "../app/globals.css";

import { Provider } from "react-redux";
import store from "@/redux/store";
import { StopwatchProvider } from "@/components/StopwatchContext";
import "bootstrap/dist/css/bootstrap.min.css";

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

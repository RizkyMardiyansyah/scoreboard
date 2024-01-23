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

// App.js
// pages/_app.js
// import React from "react";
// import { Provider } from "react-redux";
// import store from "@/redux/store";

// function MyApp({ Component, pageProps }) {
//   return (
//     <Provider store={store}>
//       <div>
//         <h1>Page 1</h1>
//         <Component {...pageProps} />
//       </div>
//     </Provider>
//   );
// }

// export default MyApp;

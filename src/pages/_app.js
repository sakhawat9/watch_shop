import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/styles/global.css";
import { bodyFont, headingFont } from "../utils/fonts";
import StoreProvider from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${headingFont.variable} ${bodyFont.variable} font-sans`}>
      <StoreProvider>
        <Component {...pageProps} />

        {/* Single toast host for the whole app. Cart, wishlist and form
            feedback route through this instead of window.alert(). */}
        <ToastContainer
          position="bottom-right"
          autoClose={3200}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          pauseOnFocusLoss={false}
          draggable={false}
          theme="light"
        />
      </StoreProvider>
    </div>
  );
}

export default MyApp;

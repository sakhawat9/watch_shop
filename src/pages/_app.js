import "../assets/styles/global.css";
import "../assets/styles/scss/main.scss";
import StoreProvider from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}

export default MyApp;

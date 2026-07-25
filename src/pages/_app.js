import "../assets/styles/global.css";
import "../assets/styles/scss/main.scss";
import { bodyFont, headingFont } from "../utils/fonts";
import StoreProvider from "../utils/Store";

function MyApp({ Component, pageProps }) {
  return (
    <div className={`${headingFont.variable} ${bodyFont.variable} font-sans`}>
      <StoreProvider>
        <Component {...pageProps} />
      </StoreProvider>
    </div>
  );
}

export default MyApp;

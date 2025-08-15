import React from "react";
import Head from "next/head";
import appData from "@data/app.json";
import 'leaflet/dist/leaflet.css';
import '../styles/scss/style.scss';
import "../styles/globals.css";
import "../styles/careers.css";

import { register } from "swiper/element/bundle";
// register Swiper custom elements
register();

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* SEO begin */}
        <title>{appData.settings.siteName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {appData.settings.meta_description && (
          <meta name="description" content={appData.settings.meta_description} />
        )}
        {appData.settings.meta_keywords && (
          <meta name="keywords" content={appData.settings.meta_keywords} />
        )}
        {/* SEO end */}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;

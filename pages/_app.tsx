// pages/_app.tsx
import React from "react";
import { AppProps } from "next/app";
import Layout from "../src/app/layout";
import '../src/app//globals.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;

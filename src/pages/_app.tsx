import React from 'react';
import { AppProps } from 'next/app';
import Layout from '../app/layout';
import '../app/globals.css';  // Убедитесь, что путь корректен

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default MyApp;

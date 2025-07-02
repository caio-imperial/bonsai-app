import '@/scss/custom.scss'
import 'bootstrap-icons/font/bootstrap-icons.css'
import Head from "next/head";
import { AppProps } from 'next/app';
import Layout from "@/components/Layout"; 
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // @ts-expect-error - bootstrap.bundle.min.js is not a module
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <Layout>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
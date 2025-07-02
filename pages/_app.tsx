import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/css/style.css";
import Head from "next/head";
import { AppProps } from 'next/app';
import Layout from "@/components/Layout";

function MyApp({ Component, pageProps }: AppProps) {
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
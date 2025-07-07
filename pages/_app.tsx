import '@/src/styles/globals.css'
import { AppProps } from 'next/app';
import Layout from "@/components/Layout"; 
import { ConfirmProvider } from '@/context/ConfirmContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ConfirmProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>  
    </ConfirmProvider>
  );
}

export default MyApp;
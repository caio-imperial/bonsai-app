import { useEffect } from "react";
import Head from "next/head";

import BonsaisView from "@/features/Bonsais/BonsaisView";

export default function Home() {

  return (
    <>
      <Head>
        <title>Bonsais</title>
        <meta name="description" content="Bonsais" />
        <meta name="keywords" content="Bonsais" />
      </Head>
      <BonsaisView />
    </>
  );
}

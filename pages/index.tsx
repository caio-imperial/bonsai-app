import Head from "next/head";

import BonsaisListPage from "@/features/bonsais/list/BonsaisListPage";

export default function Home() {

  return (
    <>
      <Head>
        <title>Bonsais</title>
        <meta name="description" content="Bonsais" />
        <meta name="keywords" content="Bonsais" />
      </Head>
      <BonsaisListPage />
    </>
  );
}

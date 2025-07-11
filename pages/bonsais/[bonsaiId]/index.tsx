import Head from "next/head";

import EntriesView from "@/features/Entries/EntriesViews";

export default function BonsaiSelectedView() {
  return (
    <>
      <Head>
        <title>Bonsai</title>
        <meta name="description" content="Bonsai" />
        <meta name="keywords" content="Bonsai" />
      </Head>
      <EntriesView />
    </>
  );
}
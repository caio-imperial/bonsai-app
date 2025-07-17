import Head from 'next/head'

import EntriesListPage from '@/features/entries/list/EntriesListPage'

export default function BonsaiSelectedView() {
  return (
    <>
      <Head>
        <title>Bonsai</title>
        <meta name="description" content="Bonsai" />
        <meta name="keywords" content="Bonsai" />
      </Head>
      <EntriesListPage />
    </>
  )
}

import Head from "next/head";
import MiniProfiles from "@/components/MiniProfiles.component";

export default function Home() {
  return (
    <>
      <Head>
        <title>Jobs - Directory to jobs seekers</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <MiniProfiles />
      </main>
    </>
  );
}

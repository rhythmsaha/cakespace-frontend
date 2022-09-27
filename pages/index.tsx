import type { NextPageWithLayout } from "./_app";
import Head from "next/head";
import DefaultLayout from "../components/layouts/DefaultLayout";

const Home: NextPageWithLayout = () => {
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <Head>
        <title>Cakespace</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>Cakespace</div>
    </div>
  );
};

Home.getLayout = (page) => {
  return <DefaultLayout>{page}</DefaultLayout>;
};

export default Home;

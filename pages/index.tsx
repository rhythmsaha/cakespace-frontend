import type { NextPageWithLayout } from "./_app";
import Head from "next/head";

const Home: NextPageWithLayout = () => {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center py-2">
            <Head>
                <title>Cakespace</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <div>Cakespace</div>
        </div>
    );
};

export default Home;

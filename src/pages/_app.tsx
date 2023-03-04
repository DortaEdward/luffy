import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import Container from "../components/Container";
import { trpc } from "../utils/trpc";

import "../styles/globals.css";
import Navbar from "../components/Navbar";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Container>
        <Navbar />
        <main>
          <Component {...pageProps} />
        </main>
      </Container>
    </SessionProvider>
  );
};

export default trpc.withTRPC(MyApp);

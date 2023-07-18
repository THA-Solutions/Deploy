import MainContainer from "@/components/MainContainer";
import { SearchProvider } from "@/context/SearchContext";
import { SessionProvider } from "next-auth/react";
import { FilterProvider } from "@/context/FilterContext";
import Script from "next/script";

import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=G-9E8GDZLZPJ`}
      />
      <Script id="google-analytics">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
 
          gtag('config', 'G-9E8GDZLZPJ');
        `}
      </Script>

      <SearchProvider>
        <FilterProvider>
          <MainContainer>
            <Component {...pageProps} />
          </MainContainer>
        </FilterProvider>
      </SearchProvider>
    </SessionProvider>
  );
}

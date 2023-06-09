import MainContainer from "@/components/MainContainer";
import { SearchProvider } from "@/context/SearchContext";
import { SessionProvider } from "next-auth/react";
import { FilterProvider } from "@/context/FilterContext";

import "@/styles/globals.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
    
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

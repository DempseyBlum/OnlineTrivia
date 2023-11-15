import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../components/header/header";
import Homepage from "./homepage";

// initialize apollo client
const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <BrowserRouter>
      <ApolloProvider client={client}>
        <div className="page_wrapper">
          <Header title={"Administratum"} />
          {/* <Header title={"Army Builder"} /> */}
          <div className="page_content_wrapper">
            <Routes>
              <Route path="/" element={<Homepage />} />
            </Routes>
          </div>
        </div>
      </ApolloProvider>
    </BrowserRouter>
  );
}

export default App;

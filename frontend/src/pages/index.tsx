import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Header from "../components/header/header";
import Homepage from "./homepage";
import TopicPage from "./topic";

// initialize apollo client
const client = new ApolloClient({
  uri:
    process.env.NEXT_PUBLIC_STRAPI_API_URL || "http://localhost:1337/graphql",
  cache: new InMemoryCache(),
});

function App() {
  return (
    <HashRouter>
      <ApolloProvider client={client}>
        <div className="page_wrapper">
          <Header title={"TRIVIA GAME"} />
          {/* <Header title={"Army Builder"} /> */}
          <div className="page_content_wrapper">
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/topic/:topicId" element={<TopicPage />} />
            </Routes>
          </div>
        </div>
      </ApolloProvider>
    </HashRouter>
  );
}

export default App;

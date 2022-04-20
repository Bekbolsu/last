import { useContext } from "react";
import "./App.css";
import Deepstash from "./components/Deepstash/Deepstash";

import Routing from "./components/Routing";
import AuthContextProvider, { authContext } from "./context/authContext";
import FavContextProvider from "./context/favContext";
import PostContextProvider from "./context/postContext";

function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <FavContextProvider>
          <Routing />
        </FavContextProvider>
      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default App;

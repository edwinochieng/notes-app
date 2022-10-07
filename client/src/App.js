import React from "react";
import Header from "./components/Header";
import Notes from "./components/Notes";
import CreateNote from "./components/CreateNote";
import { GlobalProvider } from "./context/GlobalContext";

function App() {
  return (
    <div className="min-h-screen bg-zinc-300">
      <GlobalProvider>
        <Header />
        <div className="flex flex-col items-center">
          <CreateNote />
          <Notes />
        </div>
      </GlobalProvider>
    </div>
  );
}

export default App;

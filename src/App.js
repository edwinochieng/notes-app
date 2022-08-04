import React from "react";
import Header from "./components/Header";
import Notes from "./components/Notes"
import CreateNote from "./components/CreateNote";


function App() {
  return (
    <div className="h-full bg-zinc-300">

    <Header/>
    <div className="flex flex-col items-center">
    <CreateNote/>
    <Notes/>
    </div>
   
    
    
    </div>
  );
}

export default App;

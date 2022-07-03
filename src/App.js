import React  from "react";
import '../src/styles/App.css'
import ServerPosts from "./components/ServerPosts";


function App() {
  return (
    <div className="App">
        <h1>Space</h1>
        <ServerPosts />
    </div>
  );
}

export default App;

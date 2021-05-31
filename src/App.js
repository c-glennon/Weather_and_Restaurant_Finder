import React from "react";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Finder from "./Components/Finder";
import Weather from "./Components/Weather";
import Home from "./Components/Home";
import NavBar from "./Components/NavBar";
import AddressProvider from "./Contexts/addressContext";
import IsSubmitProvider from "./Contexts/isSubmitContext";

function App() {
  return (
    <AddressProvider>
      <IsSubmitProvider>
    <BrowserRouter>
    <div className="App">
      <NavBar />
      <Switch>
        <Route path="/" component={Home} exact/>
        <Route path="/weather" component={Weather} />
        <Route path="/finder" component={Finder} />
      </Switch>
    </div>
    </BrowserRouter>
    </IsSubmitProvider>
    </AddressProvider>
  );
}

export default App;

import { useState } from "react";
import "./App.css";
import {
  Route,
  BrowserRouter,
  Switch,
} from "react-router-dom/cjs/react-router-dom";
import Homepage from "./pages/Homepage";
import Chatpage from "./pages/Chatpage";
import { createBrowserHistory } from "history";
import withAuth from "./hoc/withAuth";

function App() {
  const [count, setCount] = useState(0);
  const history = createBrowserHistory();

  return (
    <div className="app">
      <Switch>
        <Route path="/" component={Homepage} exact></Route>
        <Route path="/chats" component={withAuth(Chatpage)} exact></Route>
      </Switch>
    </div>
  );
}

export default App;

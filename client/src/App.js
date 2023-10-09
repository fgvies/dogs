import './App.css';
import { Route } from "react-router-dom";
import { Form, Detail, Landing, Home } from "./views/Views";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const location = useLocation();
  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/" component={Landing} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/create" component={Form} />
      <Route exact path="/detail/:id" component={Detail} />
    </div>
  );
}

export default App;

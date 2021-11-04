import {
  BrowserRouter as Router,
  Switch,
  Route,
  // Link
} from "react-router-dom";
import 'swiper/swiper.min.css';
import 'antd/dist/antd.css';
import Home from "./pages/Home";
import NotFound from "./components/NotFound";
import Header from './components/Header';
import ViewMovie from "./pages/ViewMovie";
import Catalog from "./pages/Catalog";
import Search from "./pages/Search";
import ScrollToTop from "./components/ScrollToTop";

// import 'swiper/swiper-bundle.css'







const App = () => {
  return (
    <div className="wrapper">
     
      <Router> 
        <ScrollToTop />
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/catalog/:genreid">
            <Catalog />
          </Route>
          <Route path="/catalog">
            <Catalog />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/movie/:id">
            <ViewMovie />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;

import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Home, Login, Registration, Singlepost } from "../views";
// import Registration from "../view/Registration";
import "react-toastify/dist/ReactToastify.css";
import {
  Tags,
  Categories,
  Posts,
  PrivateRouter,
  TagsTitle,
  CategoriesTitle,
} from "../components";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <PrivateRouter path="/admin/tags" component={Tags} exact={true} />
        <PrivateRouter
          path="/admin/categories"
          component={Categories}
          exact={true}
        />
        <PrivateRouter path="/admin/posts" component={Posts} exact={true} />
        <Route path="/tag" component={TagsTitle} exact={true} />
        <Route path="/category" component={CategoriesTitle} exact={true} />
        <Route path="/" component={Home} exact={true} />
        <Route path="/login" component={Login} exact={true} />
        <Route path="/registration" component={Registration} exact={true} />
        <Route path="/:slug-:id" component={Singlepost} exact={true} />

        {/* <PrivateRoute path="/dashboard" component={Dashboard}></PrivateRoute> */}
      </Switch>
    </Router>
  );
}

export default App;

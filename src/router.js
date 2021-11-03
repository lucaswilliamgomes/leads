import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterUserPage from "./views/signup/index";
import ListLeadPage from "./views/leads/index";
import RegisterLeadPage from "./views/register_leads/index";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={RegisterUserPage} />
        <Route path="/leads" component={ListLeadPage} />
        <Route path="/new_lead" component={RegisterLeadPage} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;

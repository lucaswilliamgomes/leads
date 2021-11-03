import { BrowserRouter, Switch, Route } from "react-router-dom";
import RegisterUserPage from "./views/signup/signup_view";
import ListLeadPage from "./views/leads/leads_view";
import RegisterLeadPage from "./views/register_leads/register_leads_view";

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

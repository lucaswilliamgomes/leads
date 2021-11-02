import { BrowserRouter, Switch, Route } from 'react-router-dom';  
import RegisterUserPage from "./signup/page";
import ListLeadPage from "./list_lead/page";
import RegisterLeadPage from "./register_lead/page";

function Routes(){
    return(
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
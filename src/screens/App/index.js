import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from 'screens/Login';
import Signup from 'screens/Signup';
import SignupSuccess from 'screens/SignupSuccess';
import Dashboard from 'screens/Dashboard';
import ResetPassword from 'screens/ResetPassword';
import HeaderMenu from 'components/HeaderMenu';
import VerificationUser from "screens/SignupSuccess/confirm";
import CheckToken from './CheckToken';
import Logout from './Logout';
import Redirect from './Redirect';

class App extends React.Component {
    componentDidMount() {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.async = true;
        script.innerText = `
            window.$zopim||(function(d,s){var z=$zopim=function(c){z._.push(c)},$=z.s=
            d.createElement(s),e=d.getElementsByTagName(s)[0];z.set=function(o){z.set.
            _.push(o)};z._=[];z.set._=[];$.async=!0;$.setAttribute("charset","utf-8");
            $.src="https://v2.zopim.com/?5WAfwmvEvuizK4ZNTuBBNO9RVYepv5Ai";z.t=+new Date;$.
            type="text/javascript";e.parentNode.insertBefore($,e)})(document,"script");
        `;
        this.scriptNode.appendChild(script);
    }
     render () {
        return (
            <div>
                <CheckToken />
                <div ref={node => (this.scriptNode = node)} className={"sads"}/>
                <main>
                    <HeaderMenu/>
                    <Switch>
                        <Route exact path={'/'} component={Login} />
                        <Route exact path={'/login'} component={Login} />
                        <Route exact path={'/signup'} component={Signup} />
                        <Route exact path={'/signupsuccess'} component={SignupSuccess} />
                        <Route path={'/dashboard'} component={localStorage.jwt ? Dashboard : Redirect } />
                        <Route path={'/reset'} component={ResetPassword} />
                        <Route path={'/logout'} component={Logout} />
                        <Route path={'/confirm'} component={VerificationUser} />
                    </Switch>
                </main>
            </div>
        )
    }
}
export default App;

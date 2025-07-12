import { Switch, Route } from "wouter";
import BusinessHealthDashboard from './components/BusinessHealthDashboard';

const App = () => {
  return (
    <>
      <Switch>
        <Route path="/" component={BusinessHealthDashboard} />
      </Switch>
    </>
  );
};

export default App;
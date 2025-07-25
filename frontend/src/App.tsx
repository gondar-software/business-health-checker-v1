import { Switch, Route } from "wouter";
import { Provider } from 'react-redux';
import BusinessHealthDashboard from '@/pages/BusinessHealthDashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import RePwd from '@/pages/RePwd';
import NotFound from "@/pages/not-found";
import Header from "./components/Header";
import Assessors from "@/pages/Assessors";
import AcceptInvite from "@/pages/AcceptInvite";
import Accounts from "@/pages/Accounts";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { store } from "@/global/store";

function Router() {
  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/re-pwd" component={RePwd} />
        <Route path="/accept-invite" component={AcceptInvite} />
        <Route path="/accounts" component={Accounts} />
        <Route path="/" component={BusinessHealthDashboard} />
        <Route path="/assessors" component={Assessors} />
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Header />
          <Router />
        </TooltipProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

import { Switch, Route, Redirect } from "wouter";
import BusinessHealthDashboard from '@/pages/BusinessHealthDashboard';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import RePwd from '@/pages/RePwd';
import NotFound from "@/pages/not-found";
import { useAuth } from "@/hooks/useAuth";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

function Router() {
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/re-pwd" component={RePwd} />
        <Route path="/">
          {isAuthenticated ? (
            <BusinessHealthDashboard />
          ) : (
            <Redirect to="/login" />
          )}
        </Route>
        <Route component={NotFound} />
      </Switch>
    </>
  );
}

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;

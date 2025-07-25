import { useEffect, useState } from "react";
import { useLocation, Link } from "wouter";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { FcGoogle } from "react-icons/fc";
import { loginSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

export default function Login() {
  const { isAuthenticated, refresh } = useAuth();
  const [googleLogin, setGoogleLogin] = useState<boolean>(true);
  const [, navigate] = useLocation();

  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      navigate(localStorage.getItem('redirectionUrl') || "/");
      localStorage.removeItem('redirectionUrl');
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const throwIfResNotOk = async (res: Response) => {
      if (!res.ok) {
        const text = (await res.text()) || res.statusText;
        throw new Error(`${res.status}: ${text}`);
      }
    }
    const initCheck = async () => {
      try {
        const searchString = window.location.search;
        if (searchString === ""){
          setGoogleLogin(false);
          return
        }
        const response = await apiRequest("GET", `/api/users/google?${searchString.substring(1)}`);
        await throwIfResNotOk(response);
        const responseData = await response.json();
        localStorage.setItem('jwtToken', responseData.token);
        setGoogleLogin(false);
        form.reset();

        refresh();
      }
      catch (_) {
        toast({
          title: "Error",
          description: "Failed to login with google.",
          variant: "destructive",
        });
        setGoogleLogin(false);
      }
    }
    initCheck();
  }, []);
  
  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      pwd: ""
    }
  });

  const loginMutation = useMutation({
    mutationFn: async (data: typeof form.getValues) => {
      const response = await apiRequest("POST", "/api/users/login", {
        data: {
          email: (data as any).email,
          password: (data as any).pwd
        }
      });
      const responseData = await response.json();
      localStorage.setItem('jwtToken', responseData.token);
    },
    onSuccess: () => {
      form.reset();
      refresh();
    },
    onError: (_) => {
      toast({
        title: "Error",
        description: "Failed to login. Please try again.",
        variant: "destructive",
      });
    },
  });

  const loginWithGoogleMutation = useMutation({
    mutationFn: async () => {
      setGoogleLogin(true);
      window.location.href = "/api/users/google/login";
    }
  });

  const onSubmit = (data: any) => {
    loginMutation.mutate(data);
  };

  const onWithGoogle = () => {
    loginWithGoogleMutation.mutate();
  };

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Login
            </h1>
          </div>
          
          <div className="gap-12 max-w-xl">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your.email@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="pwd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={loginMutation.isPending || googleLogin}
                    >
                      {loginMutation.isPending ? 
                        "Logging in..." : "Login"}
                    </Button>

                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-full"
                      onClick={onWithGoogle}
                      disabled={loginWithGoogleMutation.isPending || googleLogin}
                    >
                      {(loginWithGoogleMutation.isPending || googleLogin) ? (
                        "Redirecting..."
                      ) : (
                        <div className="flex items-center gap-2">
                          <FcGoogle />
                          Login with Google
                        </div>
                      )}
                    </Button>

                    {/* 🔗 Add Auth Links Below Buttons */}
                    <div className="flex justify-between text-sm text-blue-600 pt-4">
                      <Link
                        href="/register"
                        className="hover:underline"
                      >
                        Don't have an account? Register
                      </Link>
                    
                      <Link
                        href="/re-pwd"
                        className="hover:underline"
                      >
                        Forgot Password?
                      </Link>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

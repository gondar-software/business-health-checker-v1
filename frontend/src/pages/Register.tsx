import { useState, useEffect } from 'react';
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
import { signUpSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignUpState } from "@/types/enums";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from "@/hooks/useAuth";

export default function Register() {
  const { isAuthenticated, refresh } = useAuth();
  const { toast } = useToast();
  const [state, setSignUpState] = useState<SignUpState>("email");
  const [code, setCode] = useState<string>("");
  const [googleSignup, setGoogleSignup] = useState<boolean>(true);
  const [, navigate] = useLocation();

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
        if (searchString === "") {
          setGoogleSignup(false);
          return
        }
        const response = await apiRequest("GET", `/api/users/google?${searchString.substring(1)}`);
        await throwIfResNotOk(response);
        const responseData = await response.json();
        localStorage.setItem('jwtToken', responseData.token);
        setGoogleSignup(false);
        form.reset();
        
        refresh();
      }
      catch (_) {
        toast({
          title: "Error",
          description: "Failed to sign up with google.",
          variant: "destructive",
        });
        setGoogleSignup(false);
      }
    }
    initCheck();
  }, []);
  
  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      pwd: "",
      "con-pwd": ""
    }
  });

  const signUpMutation = useMutation({
    mutationFn: async (data: typeof form.getValues) => {
      await apiRequest("POST", "/api/users/ccode", {
        data: {
          email: (data as any).email
        }
      });
    },
    onSuccess: () => {
      setSignUpState("vcode");
      toast({
        title: "Success",
        description: "Verification code is sent to your email. Please check.",
        variant: "default",
      });
    },
    onError: (err) => {
      if (err.message.split(':')[0] === "429")
        toast({
          title: "Error",
          description: "Too many verification attempts. Please wait before requesting a new code.",
          variant: "destructive",
        });
      if (err.message.split(':')[0] === "400")
        toast({
          title: "Error",
          description: "User already exist. Please login.",
          variant: "destructive",
        });
      else toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const verifyCodeMutation = useMutation({
    mutationFn: async (code: number) => {
      const data = form.getValues();
      const response = await apiRequest("POST", "/api/users/vccode", {
        data: {
          email: data.email,
          code: code,
          password: data.pwd
        }
      });

      const responseData = await response.json()
      localStorage.setItem('jwtToken', responseData.token);
      
      refresh();
    },
    onSuccess: () => {
      setSignUpState("email");
      form.reset();
      setCode("");
    },
    onError: (err) => {
      if (err.message.split(':')[0] === "429")
        toast({
          title: "Error",
          description: "Too many verification attempts. Please resend a new code.",
          variant: "destructive",
        });
      else toast({
        title: "Error",
        description: "Failed to send verification code. Please try again.",
        variant: "destructive",
      });
    },
  });

  const signUpWithGoogleMutation = useMutation({
    mutationFn: async () => {
      setGoogleSignup(true);
      window.location.href = "/api/users/google/signup";
    }
  });

  const onSubmit = (data: any) => {
    setCode("");
    signUpMutation.mutate(data);
  };

  const onWithGoogle = () => {
    signUpWithGoogleMutation.mutate();
  };

  const onCodeChange = (code: string) => {
    if (code === "")
    {
      setCode("");
      return;
    }

    const codeInt = Number(code);
    if (codeInt)
      setCode(String(codeInt));

    if (codeInt >= 100000 && codeInt <= 999999) {
      verifyCodeMutation.mutate(codeInt)
    }
  }

  const onCodeClose = () => {
    setSignUpState("email");
    setCode("");
  }

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Register Account
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

                    <FormField
                      control={form.control}
                      name="con-pwd"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Confirm Password</FormLabel>
                          <FormControl>
                            <Input placeholder="Retype password" type="password" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={signUpMutation.isPending || googleSignup}
                    >
                      {signUpMutation.isPending ? 
                        "Sending code..." : "Register"}
                    </Button>

                    <Button 
                      type="button" 
                      variant="outline"
                      className="w-full"
                      onClick={onWithGoogle}
                      disabled={signUpWithGoogleMutation.isPending || googleSignup}
                    >
                      {(signUpWithGoogleMutation.isPending || googleSignup) ? (
                        "Redirecting..."
                      ) : (
                        <div className="flex items-center gap-2">
                          <FcGoogle />
                          Register with Google
                        </div>
                      )}
                    </Button>
                    
                    {/* 🔗 Add Auth Links Below Buttons */}
                    <div className="flex justify-between text-sm text-blue-600 pt-4">
                      <Link
                        href="/login"
                        className="hover:underline"
                      >
                        Aleady registered? Login
                      </Link>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          <Dialog open={state === "vcode"}>
            <DialogContent onClose={onCodeClose} className="flex flex-col items-center">
              <DialogTitle>
                Verify Email
              </DialogTitle>
              <DialogDescription>
                Please check email and enter code here to continue.
              </DialogDescription>
              <InputOTP 
                maxLength={6}
                minLength={6}
                value={code}
                onChange={onCodeChange}
                disabled={verifyCodeMutation.isPending}
              >
                <InputOTPGroup>
                  {[...Array(6)].map((_, index) => (
                    <InputOTPSlot key={index} index={index} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
              <DialogFooter>
                <div className="underline text-blue-500 text-sm cursor-pointer" onClick={() => onSubmit(form.getValues())}>
                  Resend Code
                </div>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </section>
    </div>
  );
}

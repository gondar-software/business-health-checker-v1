import { useState } from 'react';
import { Link } from "wouter";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { RePwdState } from "@/types/enums"
import { rePwdSchema1, rePwdSchema2 } from "@/shared/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog } from "@/components/ui/dialog";

export default function RePwd() {
  const { toast } = useToast();
  const [state, _] = useState<RePwdState>("email");
  
  const form1 = useForm({
    resolver: zodResolver(rePwdSchema1),
    defaultValues: {
      email: ""
    },
  });
  const form2 = useForm({
    resolver: zodResolver(rePwdSchema2),
    defaultValues: {
      pwd: "",
      "con-pwd": ""
    },
  });

  const form1Mutation = useMutation({
    mutationFn: async (data: typeof form1.getValues) => {
      await apiRequest("POST", "/api/users/rcode", {
        data: {
          email: (data as any).email
        }
      });
    },
    onSuccess: () => {
      
    },
    onError: (err) => {
      if (err.message === '400: {"detail":"Email not found"}')
        toast({
          title: "Error",
          description: "Email not found",
          variant: "destructive",
        });
      else
        toast({
          title: "Error",
          description: "Failed to send message. Please try again.",
          variant: "destructive",
        });
    },
  });

  const form2Mutation = useMutation({
    mutationFn: async (data: typeof form2.getValues) => {
      await apiRequest("POST", "/api/users/rcode", {
        data: {
          password: (data as any).pwd
        }
      });
    },
    onSuccess: () => {
      toast({
        title: "Verification Code Sent!",
        description: "We sent verification code to your email. Please check your email.",
      });
    },
    onError: (_) => {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit1 = (data: any) => {
    form1Mutation.mutate(data);
  };

  const onSubmit2 = (data: any) => {
    form2Mutation.mutate(data);
  };

  return (
    <div className="pt-16 min-h-screen">
      <section className="py-20">
        <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
              Reset Password
            </h1>
          </div>
          
          <div className="gap-12 max-w-xl">
            {/* Contact Form */}
            <Card>
              <CardContent className="p-8">
                {state !== "re-pwd" && <Form {...form1}>
                  <form onSubmit={form1.handleSubmit(onSubmit1)} className="space-y-6">
                    <FormField
                      control={form1.control}
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

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={form1Mutation.isPending}
                    >
                      {form1Mutation.isPending ? 
                        "Sending code..." : "Send Code"}
                    </Button>
                                        
                    {/* 🔗 Add Auth Links Below Buttons */}
                    <div className="flex justify-between text-sm text-blue-600 pt-4">
                      <Link
                        href="/login"
                        className="hover:underline"
                      >
                        Go back to Login
                      </Link>
                    </div>
                  </form>
                </Form>}
                {state === "re-pwd" && <Form {...form2}>
                  <form onSubmit={form2.handleSubmit(onSubmit2)} className="space-y-6">
                    <FormField
                      control={form2.control}
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
                      control={form2.control}
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
                      disabled={form2Mutation.isPending}
                    >
                      {form2Mutation.isPending ? 
                        "Resetting..." : "Reset Password"}
                    </Button>
                                        
                    {/* 🔗 Add Auth Links Below Buttons */}
                    <div className="flex justify-between text-sm text-blue-600 pt-4">
                      <Link
                        href="/login"
                        className="hover:underline"
                      >
                        Go back to Login
                      </Link>
                    </div>
                  </form>
                </Form>}
              </CardContent>
            </Card>
          </div>

          <Dialog>

          </Dialog>
        </div>
      </section>
    </div>
  );
}

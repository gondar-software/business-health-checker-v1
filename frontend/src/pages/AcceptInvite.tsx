import { useEffect } from "react";
import { useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { assessorSchema } from "@/types/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/useAuth";

export default function AcceptInvite() {
    const { isAuthenticated, refresh } = useAuth();
    const [, navigate] = useLocation();
    const { toast } = useToast();
    const searchString = window.location.search;

    if (!isAuthenticated) {
        localStorage.setItem('redirectionUrl', window.location.href);
        navigate("/");
    }

    useEffect(() => {
        const redirectIfNotInvitationForMe = async () => {
            if (searchString === "") {
                toast({
                    title: "Error",
                    description: "No invitation parameter found.",
                    variant: "destructive",
                });
                navigate("/");
                return;
            }
            try {
                await apiRequest("GET", `/api/assessors/check?${searchString.substring(1)}`, {
                    useToken: true
                });
            } catch (error) {
                navigate("/");
            }
        }
        if (isAuthenticated) redirectIfNotInvitationForMe();
    }, [isAuthenticated]);

    const form = useForm({
        resolver: zodResolver(assessorSchema),
        defaultValues: {
            name: "",
            role: ""
        }
    });

    const saveAssessorInfoMutation = useMutation({
        mutationFn: async (data: typeof form.getValues) => {
            await apiRequest("POST", `/api/assessors/?${searchString.substring(1)}`, {
                data: {
                    name: (data as any).name,
                    role: (data as any).role
                },
                useToken: true
            });
        },
        onSuccess: () => {
            refresh();
            navigate("/");
        },
        onError: (_) => {
            toast({
                title: "Error",
                description: "Failed to login. Please try again.",
                variant: "destructive",
            });
        },
    });

    const declineInvitationMutation = useMutation({
        mutationFn: async () => {
            await apiRequest("DELETE", `/api/assessors/?${searchString.substring(1)}`, {
                useToken: true
            });
        },
        onSuccess: () => {
            refresh();
            navigate("/");
        },
        onError: (_) => {
            toast({
                title: "Error",
                description: "Failed to decline invitation.",
                variant: "destructive",
            });
        },
    });

    const declineInvitation = () => {
        declineInvitationMutation.mutate();
    };

    const onSubmit = (data: any) => {
        saveAssessorInfoMutation.mutate(data);
    };

    return (
        <div className="pt-16 min-h-screen">
            <section className="py-20">
                <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                            Accept Invitation
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
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" type="text" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <FormField
                                            control={form.control}
                                            name="role"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Role</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Software Engineer" type="text" {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />

                                        <div className="flex justify-between">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="w-full mr-2"
                                                onClick={declineInvitation}
                                            >
                                                Decline Invitation
                                            </Button>
                                            <Button
                                                type="submit"
                                                className="w-full ml-2"
                                                disabled={saveAssessorInfoMutation.isPending}
                                            >
                                                {saveAssessorInfoMutation.isPending ? "Accepting..." : "Accept Invitation"}
                                            </Button>
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

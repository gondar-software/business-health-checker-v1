import { useLocation } from "wouter";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trash2, Users } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Accounts() {
    const { user, isAuthenticated, isLoading, refresh } = useAuth();
    const [, navigate] = useLocation();

    if (!isAuthenticated) {
        navigate('/login');
        return null;
    }

    if (isLoading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }
    const { toast } = useToast();

    const deleteAssessorMutation = useMutation({
        mutationFn: async (assessorId: number) => {
            await apiRequest("DELETE", `/api/assessors/${assessorId}`, {
                useToken: true
            });
        },
        onSuccess: () => {
            refresh();
            toast({
                title: "Success",
                description: "Assessor deleted successfully."
            });
        },
    });

    return (
        <div className="pt-16 min-h-screen">
            <section className="py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Assessors
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Manage your assessors
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-gray-600 dark:text-gray-400 text-sm">Assessors</p>
                                        <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                            {user?.assessors?.length || "0"}
                                        </p>
                                    </div>
                                    <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            {user?.assessors ? (
                                <div className="space-y-4">
                                    {user.assessors.map((assessor) => (
                                        <div key={assessor.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden flex items-center justify-center">
                                                    {assessor.customer?.logo_url ? (
                                                        <img src={assessor.customer.logo_url} alt={assessor.customer.name} className="w-full h-full" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
                                                            N/A
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h2 className="text-xl text-blue-900 dark:text-blue-400">
                                                        {assessor.customer?.name}
                                                    </h2>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                                        {`${assessor.name} - ${assessor.role}`}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    onClick={() => deleteAssessorMutation.mutate(assessor.id)}
                                                    disabled={deleteAssessorMutation.isPending}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Users className="h-12 w-12 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                                    <p className="text-gray-600 dark:text-gray-300">No assessors yet.</p>
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </section>
        </div>
    );
}

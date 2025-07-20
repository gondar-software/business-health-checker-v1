import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users, User } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useAssessors } from "@/hooks/useAssessors";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Assessors() {
    const { assessors, refresh } = useAssessors();
    const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
    const [email, setEmail] = useState("");
    const { toast } = useToast();

    const onClose = () => {
        setInviteDialogOpen(false);
        setEmail("");
    }

    const inviteMutation = useMutation({
        mutationFn: async (email: string) => {
            await apiRequest("POST", "/api/assessors/invite", {
                data: { email },
                useToken: true
            });
        },
        onSuccess: () => {
            refresh();
            onClose();
        },
        onError: (_) => {
            toast({
                title: "Error",
                description: "Failed to invite assessor.",
                variant: "destructive",
            });
        },
    });

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
                                            {assessors.length || "0"}
                                        </p>
                                    </div>
                                    <Users className="h-8 w-8 text-primary-600 dark:text-primary-400" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardContent className="p-6">
                            <div className="flex justify-between items-center">
                                <Button onClick={() => setInviteDialogOpen(true)} className="mb-4">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Invite Assessor
                                </Button>
                            </div>

                            {assessors.length > 0 ? (
                                <div className="space-y-4">
                                    {assessors.map((assessor) => (
                                        <div key={assessor.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                                                    <User className="h-6 w-6 text-gray-400" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900 dark:text-white">
                                                        {assessor.pending ? `${assessor.email}` : `${assessor.name} (${assessor.email}) - ${assessor.role}`}
                                                    </h3>
                                                    {assessor.pending && <div className="flex items-center space-x-2 mt-1">
                                                        <Badge variant="outline">PENDING</Badge>
                                                    </div>}
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

            <Dialog open={inviteDialogOpen}>
                <DialogContent onClose={onClose}>
                    <DialogTitle>Invite Assessor</DialogTitle>
                    <DialogDescription>
                        Enter the email address of the assessor you want to invite.
                    </DialogDescription>
                    <Input
                        placeholder="email"
                        type="email"
                        className="mt-4"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <DialogFooter>
                        <Button
                            variant="outline"
                            onClick={onClose}
                            className="mr-2"
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={() => {
                                inviteMutation.mutate(email);
                            }}
                        >
                            {inviteMutation.isPending ? "Inviting..." : "Invite"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

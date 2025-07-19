import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Plus, Users, User } from "lucide-react";
import { Assessor } from "@/types/packets";

export default function Assessors() {
    const assessors: Assessor[] = [];

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
                                            3
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
                                <Button>
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
                                                        {assessor.name}
                                                    </h3>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Badge variant="outline">{assessor.role}</Badge>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-2">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    // onClick={() => deleteProjectMutation.mutate(project.id)}
                                                    // disabled={deleteProjectMutation.isPending}
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

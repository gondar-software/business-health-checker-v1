import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Header() {
    const { user, isAuthenticated, logout } = useAuth();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center space-x-8">
                        <Link href="/" className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10 border-2 border-primary">
                                <AvatarImage src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" />
                                <AvatarFallback>BH</AvatarFallback>
                            </Avatar>
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                Business Health Checker
                            </span>
                        </Link>
                        {(user && (!user.user_idx || user.user_idx === -1)) && user.customer && (
                            <Link href="/assessors" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                Manage Assessors
                            </Link>
                        )}
                        {isAuthenticated && (
                            <Link href="/accounts" className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400">
                                My Accounts
                            </Link>
                        )}
                    </div>
                    <div className="flex flex-row items-center space-x-4">
                        {isAuthenticated && (
                            <div>
                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full"
                                    onClick={logout}
                                >
                                    Logout
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}

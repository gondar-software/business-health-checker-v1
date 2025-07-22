import { useState } from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu, X } from "lucide-react";
import { useUserIdx } from "@/global/interface";

export default function Header() {
  const { userIdx, setUserIdx } = useUserIdx();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  const handleSelectChange = (value: string) => {
    if (user) {
      setUserIdx(parseInt(value));
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-3">
            <Link href="/" className="flex items-center space-x-3">
              <Avatar className="w-10 h-10 border-2 border-primary">
                <AvatarImage src="https://cdn-icons-png.flaticon.com/512/1828/1828817.png" />
                <AvatarFallback>BH</AvatarFallback>
              </Avatar>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:inline">
                Business Health Checker
              </span>
            </Link>
            <div className="hidden lg:flex space-x-4 px-16">
                {user && userIdx === -1 && user.customer && (
                <Link
                    href="/assessors"
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                    Manage Assessors
                </Link>
                )}
                {isAuthenticated && (
                <Link
                    href="/accounts"
                    className="text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
                >
                    My Accounts
                </Link>
                )}
            </div>
          </div>

          {/* Hamburger Menu */}
          <div className="lg:hidden">
            <Button variant="ghost" size="icon" onClick={toggleMenu}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">

            {user && (
              <Select defaultValue={`${userIdx}`} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select Business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">My Business</SelectItem>
                  {user.assessors?.map((assessor) => (
                    <SelectItem key={assessor.id} value={`${assessor.id}`}>
                      <div className="flex items-center">
                        <Avatar className="w-5 h-5 border-2 border-primary">
                          <AvatarImage src={assessor.customer?.logo_url} />
                          <AvatarFallback style={{ fontSize: "6px" }}>
                            N/A
                          </AvatarFallback>
                        </Avatar>
                        <span className="w-28 truncate ml-2 text-left">
                          {assessor.customer?.name || "No Business"}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

            {isAuthenticated && (
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden px-2 py-2 space-y-2 bg-white dark:bg-slate-900 border-t border-gray-200 dark:border-gray-700">
          {user && userIdx === -1 && user.customer && (
            <Link
              href="/assessors"
              className="block px-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              Manage Assessors
            </Link>
          )}
          {isAuthenticated && (
            <Link
              href="/accounts"
              className="block px-3 text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400"
            >
              My Accounts
            </Link>
          )}

          {user && (
            <div className="mt-2">
              <Select defaultValue={`${userIdx}`} onValueChange={handleSelectChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Business" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="-1">My Business</SelectItem>
                  {user.assessors?.map((assessor) => (
                    <SelectItem key={assessor.id} value={`${assessor.id}`}>
                      <div className="flex items-center">
                        <Avatar className="w-5 h-5 border-2 border-primary">
                          <AvatarImage src={assessor.customer?.logo_url} />
                          <AvatarFallback style={{ fontSize: "6px" }}>
                            N/A
                          </AvatarFallback>
                        </Avatar>
                        <span className="w-28 truncate ml-2 text-left">
                          {assessor.customer?.name || "No Business"}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {isAuthenticated && (
            <Button variant="outline" size="sm" className="w-full" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  );
}

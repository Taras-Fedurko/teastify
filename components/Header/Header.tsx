'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { UserRolesEnum } from '@prisma/client';
import { useSession, signOut } from 'next-auth/react';
import { Menu } from 'lucide-react';
import { routes } from '@/routes';

import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const isActive = (path: string) => pathname === path;

  // Public routes available to all users
  const publicRoutes = [
    { name: 'Home', path: routes.landing },
    { name: 'Recipes', path: routes.recipes.list },
    { name: 'Categories', path: routes.recipes.categories },
    { name: 'Community', path: routes.community.root },
  ];

  // Protected routes only available to authenticated users
  const protectedRoutes = [
    { name: 'My Profile', path: routes.profile.root },
    { name: 'My Recipes', path: routes.my.recipes },
    { name: 'My Favorites', path: routes.my.favorites },
    { name: 'Meal Plans', path: routes.my.mealPlans },
    { name: 'Nutrition Journal', path: routes.nutrition.journal },
  ];

  // Admin routes only available to admin users
  const adminRoutes = [
    { name: 'Dashboard', path: routes.admin.root },
    { name: 'Users', path: routes.admin.users },
    { name: 'Recipes', path: routes.admin.recipes },
    { name: 'Categories', path: routes.admin.categories },
    { name: 'Meal Plans', path: routes.admin.mealPlans },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-14 flex items-center">
        <div className="flex w-full items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-emerald-600">Teastify</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {/* Public Routes */}
            {publicRoutes.map((route) => (
              <Link
                key={route.path}
                href={route.path}
                className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                  isActive(route.path)
                    ? 'text-emerald-600'
                    : 'text-muted-foreground'
                }`}
              >
                {route.name}
              </Link>
            ))}

            {/* Protected Routes Dropdown - Only show if user is authenticated */}
            {session?.user && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    My Account
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {protectedRoutes.map((route) => (
                    <DropdownMenuItem key={route.path} asChild>
                      <Link
                        href={route.path}
                        className={
                          isActive(route.path)
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        }
                      >
                        {route.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Admin Routes Dropdown - Only show if user is admin */}
            {session?.user?.role === UserRolesEnum.ADMIN && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    Admin
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  {adminRoutes.map((route) => (
                    <DropdownMenuItem key={route.path} asChild>
                      <Link
                        href={route.path}
                        className={
                          isActive(route.path)
                            ? 'bg-accent text-accent-foreground'
                            : ''
                        }
                      >
                        {route.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}

            {/* Auth Buttons */}
            {session?.user ? (
              <Button
                variant="default"
                onClick={() => signOut()}
                className="h-8"
              >
                Sign Out
              </Button>
            ) : (
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  asChild
                  className="h-8"
                >
                  <Link href="/auth/signin">Sign In</Link>
                </Button>
                <Button
                  variant="default"
                  asChild
                  className="h-8"
                >
                  <Link href="/auth/signup">Sign Up</Link>
                </Button>
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" className="h-8 w-8 p-0">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[385px]">
              <div className="flex flex-col gap-4 py-4">
                {/* Public Routes */}
                {publicRoutes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm font-medium transition-colors hover:text-emerald-600 ${
                      isActive(route.path)
                        ? 'text-emerald-600'
                        : 'text-muted-foreground'
                    }`}
                  >
                    {route.name}
                  </Link>
                ))}

                {/* Protected Routes Section */}
                {session?.user && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      My Account
                    </div>
                    {protectedRoutes.map((route) => (
                      <Link
                        key={route.path}
                        href={route.path}
                        onClick={() => setIsOpen(false)}
                        className={`block text-sm font-medium ${
                          isActive(route.path)
                            ? 'text-emerald-600'
                            : 'text-muted-foreground hover:text-emerald-600'
                        }`}
                      >
                        {route.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Admin Routes Section */}
                {session?.user?.role === UserRolesEnum.ADMIN && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                      Admin
                    </div>
                    {adminRoutes.map((route) => (
                      <Link
                        key={route.path}
                        href={route.path}
                        onClick={() => setIsOpen(false)}
                        className={`block text-sm font-medium ${
                          isActive(route.path)
                            ? 'text-emerald-600'
                            : 'text-muted-foreground hover:text-emerald-600'
                        }`}
                      >
                        {route.name}
                      </Link>
                    ))}
                  </div>
                )}

                {/* Auth Buttons */}
                <div className="pt-4 border-t">
                  {session?.user ? (
                    <Button
                      variant="default"
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="w-full"
                    >
                      Sign Out
                    </Button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      <Button
                        variant="outline"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/auth/signin">Sign In</Link>
                      </Button>
                      <Button
                        variant="default"
                        asChild
                        onClick={() => setIsOpen(false)}
                      >
                        <Link href="/auth/signup">Sign Up</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
};

export default Header; 
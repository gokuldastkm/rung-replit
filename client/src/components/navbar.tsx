import { useLocation, Link as WouterLink } from "wouter";
import { Logo } from "./ui/logo";
import { Button } from "@/components/ui/button";
import { useContext } from "react";
import { AuthContext } from "@/hooks/use-auth";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState } from "react";
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Added ThemeProvider


const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Example primary color
    },
  },
});


export function Navbar() {
  const [location] = useLocation();
  const authContext = useContext(AuthContext);
  const user = authContext?.user || null;
  const logoutMutation = authContext?.logoutMutation;
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    if (logoutMutation && typeof logoutMutation.mutate === 'function') {
      logoutMutation.mutate();
    }
  };

  const navLinks = user 
    ? [
        { name: "Dashboard", href: "/dashboard" },
        { name: "Test Series", href: "#" },
        { name: "Resources", href: "#" },
      ]
    : [];

  const isAuthPage = location === "/auth";

  if (isAuthPage) {
    return (
      <div className="py-4 px-6 border-b border-gray-200">
        <span className="text-dark text-lg font-medium">Login</span>
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}> {/* Added ThemeProvider */}
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <WouterLink href="/"> {/* Changed Link to WouterLink */}
              <a className="flex-shrink-0 flex items-center">
                <Logo />
              </a>
            </WouterLink>
            <div className="hidden md:ml-6 md:flex md:space-x-6">
              {navLinks.map((link) => (
                <WouterLink key={link.name} href={link.href}> {/* Changed Link to WouterLink */}
                  <a className="text-dark-muted hover:text-primary px-3 py-2 text-sm font-medium">
                    {link.name}
                  </a>
                </WouterLink>
              ))}
            </div>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-4">
            {!user ? (
              <>
                <Button variant="ghost" asChild>
                  <WouterLink href="/auth">Login</WouterLink> {/* Changed Link to WouterLink */}
                </Button>
                <Button asChild>
                  <WouterLink href="/auth">Sign Up</WouterLink> {/* Changed Link to WouterLink */}
                </Button>
              </>
            ) : (
              <Button variant="ghost" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </div>

          <div className="flex items-center sm:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col space-y-4 mt-6">
                  {navLinks.map((link) => (
                    <WouterLink key={link.name} href={link.href}> {/* Changed Link to WouterLink */}
                      <a 
                        className="text-dark-muted hover:text-primary px-3 py-2 text-sm font-medium"
                        onClick={() => setIsOpen(false)}
                      >
                        {link.name}
                      </a>
                    </WouterLink>
                  ))}
                  {!user ? (
                    <>
                      <Button variant="ghost" asChild onClick={() => setIsOpen(false)}>
                        <WouterLink href="/auth">Login</WouterLink> {/* Changed Link to WouterLink */}
                      </Button>
                      <Button asChild onClick={() => setIsOpen(false)}>
                        <WouterLink href="/auth">Sign Up</WouterLink> {/* Changed Link to WouterLink */}
                      </Button>
                    </>
                  ) : (
                    <Button 
                      variant="ghost" 
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                    >
                      Logout
                    </Button>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
    </ThemeProvider> {/* Added ThemeProvider closing tag */}
  );
}
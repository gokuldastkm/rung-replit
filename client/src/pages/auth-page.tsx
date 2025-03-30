import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Navbar } from "@/components/navbar";
import { insertUserSchema } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"; // Assuming this import is needed


// Extend the schema with additional validation
const loginSchema = insertUserSchema.extend({
  rememberMe: z.boolean().optional(),
});

const registerSchema = insertUserSchema.extend({
  confirmPassword: z.string().min(6, {
    message: "Password must be at least 6 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginFormValues = z.infer<typeof loginSchema>;
type RegisterFormValues = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { user, loginMutation, registerMutation } = useAuth();
  const [_, navigate] = useLocation();

  // Redirect if user is already logged in
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
      rememberMe: false,
    },
  });

  const registerForm = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onLoginSubmit = (values: LoginFormValues) => {
    const { username, password } = values;
    loginMutation.mutate({ username, password });
  };

  const onRegisterSubmit = (values: RegisterFormValues) => {
    const { username, password } = values;
    registerMutation.mutate({ username, password });
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden">
          <Dialog>
            <div className="flex flex-col md:flex-row">
              {/* Left side - Image */}
              <div className="md:w-1/2 bg-primary relative">
                <div className="absolute inset-0 bg-primary bg-opacity-70 flex flex-col justify-end p-8">
                  <h2 className="text-white text-3xl font-bold font-poppins">Unlock Your Exam Success!</h2>
                </div>
                <svg className="w-full h-full" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
                  <g fill="none" stroke="#fff" strokeWidth="1" opacity="0.2">
                    <path d="M300,150 L450,300 L300,450 L150,300 Z" />
                    <circle cx="300" cy="300" r="100" />
                    <circle cx="300" cy="300" r="200" />
                  </g>
                  <g fill="#fff" opacity="0.3">
                    <rect x="250" y="200" width="100" height="150" rx="5" />
                    <rect x="270" y="170" width="60" height="20" rx="5" />
                    <path d="M300,400 L270,450 L330,450 Z" />
                  </g>
                </svg>
              </div>

              {/* Right side - Form */}
              <DialogContent>
                <DialogTitle className="text-xl font-semibold">
                  {activeTab === "login" ? "Login" : "Sign Up"}
                </DialogTitle>
                <div className="md:w-1/2 p-8">
                  <div className="text-center">
                    <h2 className="text-xl font-semibold text-dark">Welcome to <span className="text-primary">Rung</span>!</h2>
                    <div className="mt-6 flex justify-center space-x-2">
                      <Button
                        variant={activeTab === "login" ? "default" : "outline"}
                        className={activeTab === "login" ? "" : "bg-gray-100 text-dark hover:text-primary"}
                        onClick={() => setActiveTab("login")}
                      >
                        Login
                      </Button>
                      <Button
                        variant={activeTab === "register" ? "default" : "outline"}
                        className={activeTab === "register" ? "" : "bg-gray-100 text-dark hover:text-primary"}
                        onClick={() => setActiveTab("register")}
                      >
                        Register
                      </Button>
                    </div>
                    <p className="mt-6 text-sm text-dark-muted">
                      Lorem ipsum is simply dummy text of the printing and typesetting industry.
                    </p>
                  </div>

                  {activeTab === "login" ? (
                    <Form {...loginForm}>
                      <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="mt-8 space-y-6">
                        <FormField
                          control={loginForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your username"
                                  className="rounded-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={loginForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    type={showLoginPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="rounded-full pr-10"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full"
                                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                                  >
                                    {showLoginPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div className="flex items-center justify-between">
                          <FormField
                            control={loginForm.control}
                            name="rememberMe"
                            render={({ field }) => (
                              <FormItem className="flex flex-row items-center space-x-2 space-y-0">
                                <FormControl>
                                  <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                </FormControl>
                                <FormLabel className="text-sm font-normal cursor-pointer">Remember me</FormLabel>
                              </FormItem>
                            )}
                          />

                          <a href="#" className="text-sm text-primary hover:text-primary-dark">
                            Forgot Password?
                          </a>
                        </div>

                        <Button
                          type="submit"
                          className="w-full rounded-full"
                          disabled={loginMutation.isPending}
                        >
                          {loginMutation.isPending ? "Logging in..." : "Login"}
                        </Button>
                      </form>
                    </Form>
                  ) : (
                    <Form {...registerForm}>
                      <form onSubmit={registerForm.handleSubmit(onRegisterSubmit)} className="mt-8 space-y-6">
                        <FormField
                          control={registerForm.control}
                          name="username"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Username</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Choose a username"
                                  className="rounded-full"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="password"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    type={showRegisterPassword ? "text" : "password"}
                                    placeholder="Create a password"
                                    className="rounded-full pr-10"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full"
                                    onClick={() => setShowRegisterPassword(!showRegisterPassword)}
                                  >
                                    {showRegisterPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={registerForm.control}
                          name="confirmPassword"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Confirm Password</FormLabel>
                              <FormControl>
                                <div className="relative">
                                  <Input
                                    {...field}
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Confirm your password"
                                    className="rounded-full pr-10"
                                  />
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                  >
                                    {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                  </Button>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <Button
                          type="submit"
                          className="w-full rounded-full"
                          disabled={registerMutation.isPending}
                        >
                          {registerMutation.isPending ? "Creating account..." : "Register"}
                        </Button>
                      </form>
                    </Form>
                  )}
                </div>
              </DialogContent>
            </div>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
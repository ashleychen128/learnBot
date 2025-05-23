import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";

interface AuthFormProps {
  mode: 'login' | 'register';
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const endpoint = mode === "login" ? "/auth/login" : "/auth/register";
    const payload =
      mode === "login"
        ? { email, password }
        : { name, email, password };

    try {
      const response = await fetch("http://localhost:8000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        let message = "Something went wrong";
        try {
          const errorData = await response.json();
          message = errorData.detail || message;
        } catch {
          message = "Load failed";
        }
        throw new Error(message);
      }

      const data = await response.json();

      if (mode === "login") {
        localStorage.setItem("email", email);
        toast({ title: "Login successful", description: "Welcome back to AI Learning Agent!" });
      } else {
        toast({ title: "Registration successful", description: "Your account has been created." });
      }

      navigate("/chat");
    } catch (error: any) {
      toast({
        title: "Authentication failed",
        description: error.message || "Unexpected error",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>
          {mode === 'login' ? 'Login' : 'Create an account'}
        </CardTitle>
        <CardDescription>
          {mode === 'login'
            ? 'Enter your credentials to access your account'
            : 'Fill in the details below to create your account'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="John Doe"
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
            />
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="animate-pulse mr-2">•</span>
                <span>{mode === 'login' ? 'Signing in...' : 'Creating account...'}</span>
              </>
            ) : (
              mode === 'login' ? 'Sign in' : 'Sign up'
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter>
        <div className="text-center w-full text-sm">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => navigate('/register')}>
                Register here
              </Button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <Button variant="link" className="p-0" onClick={() => navigate('/login')}>
                Sign in
              </Button>
            </p>
          )}
        </div>
      </CardFooter>
    </Card>
  );
};

export default AuthForm;

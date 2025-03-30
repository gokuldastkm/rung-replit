import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email is required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }
    
    try {
      setIsSubmitting(true);
      await apiRequest("POST", "/api/newsletter", { email });
      
      toast({
        title: "Thank you for subscribing!",
        description: "You've been added to our newsletter.",
      });
      
      setEmail("");
    } catch (error) {
      toast({
        title: "Subscription failed",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-8 w-full max-w-md mx-auto">
      <h3 className="text-lg font-medium">Subscribe to get our Newsletter</h3>
      <form className="mt-4 flex" onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Your Email"
          className="rounded-l-full rounded-r-none border-r-0"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
        />
        <Button 
          type="submit" 
          className="rounded-l-none rounded-r-full"
          disabled={isSubmitting}
        >
          Subscribe
        </Button>
      </form>
    </div>
  );
}

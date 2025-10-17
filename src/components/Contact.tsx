import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:bethebayou@gmail.com?subject=Message from ${formData.name}&body=${formData.message}%0D%0A%0D%0AFrom: ${formData.email}`;
    window.location.href = mailtoLink;
  };

  return (
    <footer id="contact" className="py-20 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-medium mb-8 text-center uppercase tracking-wider">
            Contact Me
          </h2>

          <div className="space-y-4 mb-8 text-center text-sm">
            <p>
              Email:{" "}
              <a href="mailto:bethebayou@gmail.com" className="hover:underline">
                bethebayou@gmail.com
              </a>
              <button
                onClick={() => copyToClipboard("bethebayou@gmail.com", "Email")}
                className="ml-2 inline-flex items-center justify-center hover:opacity-70 transition-opacity"
                title="Copy Email"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
              {" | "}
              Phone:{" "}
              <a href="tel:+251920420134" className="hover:underline">
                +251920420134
              </a>
              <button
                onClick={() => copyToClipboard("+251920420134", "Phone")}
                className="ml-2 inline-flex items-center justify-center hover:opacity-70 transition-opacity"
                title="Copy Phone"
              >
                <Copy className="w-3.5 h-3.5" />
              </button>
            </p>
            <p className="text-muted-foreground">Address: Addis Ababa, Ethiopia</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-w-xl mx-auto">
            <Input
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="bg-background border-border"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-background border-border"
            />
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="bg-background border-border resize-none"
            />
            <Button 
              type="submit" 
              className="w-full bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Send
            </Button>
          </form>

          <div className="text-center mt-12 text-xs text-muted-foreground">
            <p>&copy; 2025 Bethe Bayou. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";
import emailjs from '@emailjs/browser';

// EmailJS configuration - Update these with your EmailJS credentials
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate EmailJS configuration
    if (EMAILJS_SERVICE_ID === 'your_service_id' || 
        EMAILJS_TEMPLATE_ID === 'your_template_id' || 
        EMAILJS_PUBLIC_KEY === 'your_public_key') {
      toast({
        title: "Configuration Error",
        description: "EmailJS is not configured. Please set up your EmailJS credentials in .env file.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Initialize EmailJS with public key (only once)
      if (!emailjs.init) {
        emailjs.init(EMAILJS_PUBLIC_KEY);
      }

      // Send email using EmailJS
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_email: 'bethebayou@gmail.com',
        reply_to: formData.email,
      };

      const response = await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        templateParams,
        EMAILJS_PUBLIC_KEY
      );

      console.log('EmailJS Response:', response);

      if (response.text === 'OK' || response.status === 200) {
        toast({
          title: "Message sent!",
          description: "Thank you for contacting me. I'll get back to you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          message: "",
        });
      } else {
        throw new Error('Unexpected response from EmailJS');
      }
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      let errorMessage = "Failed to send message. Please try again later.";
      
      if (error?.text) {
        errorMessage = `Error: ${error.text}`;
      } else if (error?.message) {
        errorMessage = `Error: ${error.message}`;
      }
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer id="contact" className="py-8 bg-card border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2 uppercase tracking-wider">
              Get In Touch
            </h2>
            <p className="text-sm text-muted-foreground">
              Let's discuss your next project
            </p>
          </div>

          <div className="space-y-3 mb-6 text-center text-sm">
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
              className="bg-background border-border dev-mode:rounded-none dev-mode:border-2 dev-mode:hover:border-foreground/40 dev-mode:focus:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dev-mode:transition-all dev-mode:duration-300"
            />
            <Input
              type="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="bg-background border-border dev-mode:rounded-none dev-mode:border-2 dev-mode:hover:border-foreground/40 dev-mode:focus:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dev-mode:transition-all dev-mode:duration-300"
            />
            <Textarea
              placeholder="Your Message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              rows={6}
              className="bg-background border-border resize-none dev-mode:rounded-none dev-mode:border-2 dev-mode:hover:border-foreground/40 dev-mode:focus:shadow-[4px_4px_0_0_rgba(0,0,0,0.1)] dev-mode:transition-all dev-mode:duration-300"
            />
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-foreground text-background hover:opacity-90 transition-all duration-300 dev-mode:rounded-none dev-mode:border-2 dev-mode:hover:scale-105 dev-mode:hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.2)] dev-mode:hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Sending..." : "Send"}
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

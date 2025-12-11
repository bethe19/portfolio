import { useParams, Link, useNavigate } from "react-router-dom";
import { featuredProjects } from "@/components/Projects";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Github, ExternalLink, ArrowLeft, Code2, FileCode, Database, Brain, Atom, Palette, Server } from "lucide-react";
import { useEffect } from "react";
import fintrack1 from "../../images/fintrackimgs/1.png";
import fintrack2 from "../../images/fintrackimgs/2.png";
import fintrack3 from "../../images/fintrackimgs/3.png";
import fintrackAdmin from "../../images/fintrackimgs/admin.png";
import fintrackAdmin2 from "../../images/fintrackimgs/admin2.png";
import nextstopArchitecture from "../../images/nextstop/nextstop-architecture.png";
import nextstopMain from "../../images/nextstop/nextstop.png";
import nextstopPhoto from "../../images/nextstop/photo_2025-12-11_15-22-41.jpg";

// Project details data
const projectDetails: Record<string, {
  fullDescription: string;
  features: string[];
  challenges: string[];
  learnings: string[];
  images: string[];
  imageDescriptions?: string[];
}> = {
  fintrack: {
    fullDescription: "FinTrack is a comprehensive personal finance management application designed to help users track their expenses, income, and budgets effectively. Built with modern web technologies, it provides an intuitive interface for managing financial data with real-time analytics and insights. The application features both user and admin dashboards, offering different levels of access and functionality for various user roles.",
    features: [
      "Real-time expense and income tracking",
      "Budget creation and monitoring",
      "Interactive charts and financial analytics",
      "Multi-category expense classification",
      "Admin dashboard for user management",
      "Secure user authentication and authorization",
      "Responsive design for mobile and desktop",
      "Data export and reporting capabilities"
    ],
    challenges: [
      "Implementing secure authentication and role-based access control",
      "Designing an intuitive UI for complex financial data visualization",
      "Optimizing database queries for real-time analytics",
      "Creating responsive charts that work across all devices",
      "Managing state efficiently across multiple components"
    ],
    learnings: [
      "Advanced React patterns and state management",
      "Building RESTful APIs with Node.js",
      "Database design and optimization",
      "Implementing secure authentication systems",
      "Creating responsive and accessible UI components"
    ],
    images: [
      fintrack1,
      fintrack2,
      fintrack3,
      fintrackAdmin,
      fintrackAdmin2
    ],
    imageDescriptions: [
      "Dashboard Overview",
      "Expense Tracking Interface",
      "Budget Management",
      "Admin Dashboard",
      "User Management Panel"
    ]
  },
  nextstop: {
    fullDescription: "NextStop is a comprehensive RESTful API backend for a tour booking platform focused on African destinations, particularly Ethiopia. Built with Node.js, Express, and MongoDB, this backend implements a robust 3-tier architecture following MVC patterns. The API features JWT-based authentication with role-based access control (5 user roles), Stripe payment integration, advanced security layers, and comprehensive CRUD operations for tours, bookings, reviews, and user management. The system includes email services, image processing, geospatial queries, and analytics dashboards.",
    features: [
      "RESTful API with 50+ endpoints across 8 resource categories",
      "JWT authentication with 5 role-based access levels (user, guide, lead-guide, admin, superadmin)",
      "Stripe payment integration with checkout sessions and webhook handling",
      "Advanced security: Helmet, CORS, rate limiting, NoSQL injection prevention, XSS protection",
      "MongoDB with Mongoose ODM - 8 core models with relationships and indexes",
      "Email service with Nodemailer for password reset and notifications",
      "Image processing with Sharp and Multer for tour and user photos",
      "Geospatial queries for tour location-based searches",
      "Advanced filtering, sorting, pagination, and field selection",
      "View tracking and analytics for tour popularity",
      "Favorites/wishlist functionality",
      "Review and rating system with duplicate prevention",
      "Dashboard endpoints for user and admin statistics",
      "Singleton models for company info and discover page content",
      "Error handling with custom error classes and global error handler",
      "API features utility for query building and data transformation"
    ],
    challenges: [
      "Implementing secure JWT authentication with token refresh and password reset flows",
      "Designing role-based authorization middleware for 5 different user roles",
      "Integrating Stripe webhooks securely with raw body parsing before JSON middleware",
      "Building advanced query features (filtering, sorting, pagination) with MongoDB",
      "Handling geospatial data and queries for tour locations",
      "Implementing comprehensive security layers without impacting performance",
      "Creating reusable handler factory pattern for CRUD operations",
      "Managing complex relationships between 8 database models",
      "Optimizing image upload and processing pipeline with Sharp",
      "Building singleton models (Company, Discover) with proper validation",
      "Implementing view tracking without impacting performance",
      "Creating flexible API that supports multiple frontend clients"
    ],
    learnings: [
      "Building production-ready RESTful APIs with Express.js",
      "MongoDB schema design with Mongoose, including virtuals and indexes",
      "JWT authentication and authorization patterns",
      "Stripe payment integration and webhook security",
      "Security best practices: Helmet, CORS, rate limiting, sanitization",
      "Error handling patterns and custom error classes",
      "Middleware architecture and request/response flow",
      "Geospatial queries with MongoDB 2dsphere indexes",
      "Image processing and optimization with Sharp",
      "Email service integration with Nodemailer",
      "Factory pattern for reusable CRUD operations",
      "API design principles: filtering, pagination, field selection",
      "MVC architecture in Node.js applications",
      "Environment variable management and configuration",
      "Testing APIs with Postman collections"
    ],
    images: [
      nextstopMain,
      nextstopArchitecture,
      nextstopPhoto
    ],
    imageDescriptions: [
      "NextStop Application Overview",
      "System Architecture Diagram - 3-tier architecture showing Presentation, Application, and Data layers",
      "Auth interface frontend"
    ]
  }
};

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  
  const project = featuredProjects.find(p => p.id === projectId);
  const details = projectId ? projectDetails[projectId] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!project || !project.detail) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <p className="text-muted-foreground mb-6">The project you're looking for doesn't exist or doesn't have detailed information.</p>
          <Button asChild>
            <Link to="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary/10 via-background to-background border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Button 
            variant="ghost" 
            className="mb-6 dev-mode:border dev-mode:border-foreground/10 dev-mode:hover:border-foreground"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          
          <div className="max-w-4xl">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              {details?.fullDescription || project.description}
            </p>
            
            {/* Tech Stack Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              {project.techStack.map((tech, index) => (
                <Badge 
                  key={index} 
                  variant="secondary" 
                  className="px-3 py-1.5 text-sm dev-mode:border-2 dev-mode:border-foreground/10"
                >
                  <span className="mr-1.5">{tech.icon}</span>
                  {tech.name}
                </Badge>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3">
              {project.github !== "#" && (
                <Button 
                  asChild 
                  variant="outline"
                  className="dev-mode:border-2 dev-mode:border-foreground/20 dev-mode:hover:border-foreground"
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </a>
                </Button>
              )}
              {project.live !== "#" && (
                <Button asChild>
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Project Images Gallery */}
          {details?.images && details.images.length > 0 && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Project Screenshots</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {details.images.map((image, index) => (
                  <div 
                    key={index} 
                    className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 dev-mode:rounded-none dev-mode:border-2 dev-mode:border-foreground/10 dev-mode:hover:border-foreground"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden bg-muted">
                      <img
                        src={image}
                        alt={details.imageDescriptions?.[index] || `Screenshot ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                    {details.imageDescriptions?.[index] && (
                      <div className="p-3 bg-card">
                        <p className="text-sm text-muted-foreground text-center">
                          {details.imageDescriptions[index]}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Features Section */}
          {details?.features && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Key Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {details.features.map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border hover:border-primary/50 transition-colors dev-mode:rounded-none dev-mode:border-2 dev-mode:hover:border-foreground"
                  >
                    <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0 dev-mode:w-3 dev-mode:h-3 dev-mode:rounded-none" />
                    <p className="text-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Challenges Section */}
          {details?.challenges && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">Challenges & Solutions</h2>
              <div className="space-y-4">
                {details.challenges.map((challenge, index) => (
                  <div 
                    key={index}
                    className="p-5 rounded-lg bg-muted/50 border-l-4 border-primary dev-mode:rounded-none"
                  >
                    <p className="text-foreground">{challenge}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Learnings Section */}
          {details?.learnings && (
            <section className="mb-16">
              <h2 className="text-3xl font-bold mb-6">What I Learned</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {details.learnings.map((learning, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg bg-card border border-border hover:shadow-md transition-shadow dev-mode:rounded-none dev-mode:border-2 dev-mode:hover:border-foreground/50"
                  >
                    <p className="text-sm text-foreground">{learning}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* CTA Section */}
          <section className="mt-16 p-8 rounded-2xl bg-gradient-to-br from-primary/10 to-background border border-border text-center dev-mode:rounded-none dev-mode:border-2">
            <h2 className="text-2xl font-bold mb-4">Interested in this project?</h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Check out the source code on GitHub or try the live demo to see it in action.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {project.github !== "#" && (
                <Button asChild variant="outline" size="lg">
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2" />
                    GitHub Repository
                  </a>
                </Button>
              )}
              {project.live !== "#" && (
                <Button asChild size="lg">
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </a>
                </Button>
              )}
              <Button asChild variant="ghost" size="lg">
                <Link to="/#projects">
                  View All Projects
                </Link>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}


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


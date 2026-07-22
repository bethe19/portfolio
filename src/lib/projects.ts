import nextstopImg from "@/assets/projects/nextstop.jpg";
import fintrackImg from "@/assets/projects/fintrack.jpg";
import moodieImg from "@/assets/projects/moodie.jpg";
import perceptronImg from "@/assets/projects/perceptron.jpg";

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: string;
  year: string;
  github: string;
  live?: string;
  image: string;
  about: string[];
  highlights: string[];
  tech: string[];
};

export const projects: Project[] = [
  {
    slug: "nextstop",
    name: "NextStop",
    tagline: "A full-featured travel booking backend. It handles tours, guides, bookings, and reviews behind a clean REST API, complete with role-scoped access and Stripe payments.",
    stack: "Node.js · Express · MongoDB",
    year: "2025",
    github: "https://github.com/bethe19/Next-Stop",
    image: nextstopImg,
    about: [
      "NextStop is a full-featured travel booking backend that handles the messy parts of running a tour business — trips, guides, bookings, payments and reviews — behind a single clean REST API.",
      "I built it end-to-end: data modeling in MongoDB, 50+ Express endpoints, JWT-based auth with role-scoped access for admins, guides and travelers, and Stripe for payments. The goal was to design it like a real product, not a class assignment.",
    ],
    highlights: [
      "50+ REST endpoints covering tours, users, bookings and reviews",
      "Role-based access control for admin / guide / user",
      "Stripe integration for real checkout flows",
      "Image uploads, filtering, sorting and geospatial tour queries",
    ],
    tech: ["Node.js", "Express", "MongoDB", "Mongoose", "JWT", "Stripe"],
  },
  {
    slug: "fintrack",
    name: "FinTrack",
    tagline: "Turn bank SMS and CSV statements into clean, structured spending data. It parses notification chaos into readable transactions, giving you instant clarity on spending trends.",
    stack: "React · Node.js · MongoDB",
    year: "2025",
    github: "https://github.com/bethe19/FinTrack",
    live: "https://fin-track-eth.vercel.app",
    image: fintrackImg,
    about: [
      "FinTrack is a personal finance tool that eats the notification chaos most people already have on their phone. Forward a bank SMS or drop in a CSV statement, and it parses it into normalized transactions you can actually read.",
      "It gives instant clarity on income vs. spending, category breakdowns, and month-over-month trends — without the manual entry that kills every budgeting app.",
    ],
    highlights: [
      "SMS + CSV parsers that normalize into a single transaction schema",
      "Category detection and spending analytics dashboard",
      "Auth + per-user data isolation",
      "Charts and filters for fast month-by-month review",
    ],
    tech: ["React", "Node.js", "Express", "MongoDB", "Chart.js"],
  },
  {
    slug: "moodie",
    name: "Moodie",
    tagline: "Discover movies that match your mood—just type how you feel. The backend maps your free-text mood into structured tags and queries a film API to recommend exact matches.",
    stack: "TypeScript · React · LLM",
    year: "2025",
    github: "https://github.com/bethe19/moodie-movie-site",
    live: "https://moodie-neon.vercel.app",
    image: moodieImg,
    about: [
      "Moodie is a movie discovery site that skips the endless scroll. You describe how you feel in plain language and it recommends films that fit — cozy, angry, nostalgic, whatever.",
      "The backend maps the free-text mood into structured tags and queries a movie API for matches, then ranks them. The frontend is a minimal, focused UI built for one job: get you to a good movie fast.",
    ],
    highlights: [
      "Natural-language mood → structured genre/tone mapping",
      "Movie search + ranking against a public film API",
      "Clean, single-purpose UI with typed React components",
      "Deployed as a live web app",
    ],
    tech: ["TypeScript", "React", "Vite", "LLM API", "TMDB API"],
  },
  {
    slug: "perceptron-svm",
    name: "Perceptron & SVM from Scratch",
    tagline: "Classic ML algorithms implemented from first principles. Built during my iCog Labs internship to deeply understand the core math, update rules, and the dual form of SVMs without shortcuts.",
    stack: "Python · NumPy",
    year: "2025",
    github: "https://github.com/bethe19/perceptron-svm-implementation",
    image: perceptronImg,
    about: [
      "Built during my iCog Labs internship training, this project implements the Perceptron and Support Vector Machine from scratch — no scikit-learn shortcuts for the core math.",
      "The point wasn't a benchmark, it was understanding: the update rule, the margin, the dual form, and why each choice matters. Good ML intuition comes from writing the loop yourself.",
    ],
    highlights: [
      "Perceptron learning rule implemented in pure NumPy",
      "SVM with hinge loss and gradient-based optimization",
      "Visualizations of decision boundaries on 2D datasets",
      "Written as a teaching-quality reference, not a black box",
    ],
    tech: ["Python", "NumPy", "Matplotlib", "Jupyter"],
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

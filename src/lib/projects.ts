export type Project = {
  slug: string;
  name: string;
  tagline: string;
  stack: string;
  year: string;
  github: string;
  live?: string;
  logo?: string;
  about: string[];
  highlights: string[];
  tech: string[];
  architecture: {
    overview: string;
    decisions: { title: string; detail: string }[];
    components?: { name: string; role: string }[];
    dataFlow?: string[];
  };
};

export const projects: Project[] = [
  {
    slug: "mini-order",
    name: "Mini-Order",
    tagline:
      "A modular Go microservices e-commerce system with dual REST & gRPC protocols, Kafka event streaming, and distributed Saga transaction rollback.",
    stack: "Go · gRPC · Kafka · Docker",
    year: "2026",
    github: "https://github.com/bethe19/mini-order",
    about: [
      "Mini-Order is a distributed microservices e-commerce backend architected in Go for high throughput, fault isolation, and low tail latency.",
      "The system cleanly decouples synchronous operations (such as high-speed internal gRPC stock deductions) from asynchronous side effects via Apache Kafka (KRaft), and handles multi-service failures through Saga pattern compensation rollback.",
    ],
    highlights: [
      "Dual-protocol communication: external REST endpoints paired with internal gRPC for stock deductions",
      "Asynchronous event streaming with Apache Kafka (KRaft) and Snappy wire compression",
      "Distributed transaction compensation implementing the Saga rollback pattern across services",
      "Edge API Gateway featuring reverse proxy, IP token-bucket rate limiting, and X-Correlation-ID tracing",
      "Isolated per-service PostgreSQL databases containerized and orchestrated with Docker Compose",
    ],
    tech: [
      "Go",
      "gRPC",
      "Protocol Buffers",
      "Apache Kafka",
      "Docker",
      "PostgreSQL",
      "REST API",
    ],
    architecture: {
      overview:
        "Mini-Order follows a microservices architecture with an edge API Gateway acting as the single entry point. Services communicate internally via gRPC for synchronous operations and Apache Kafka for asynchronous event-driven side effects. Each service owns its own PostgreSQL database, enforcing data isolation and bounded contexts.",
      decisions: [
        {
          title: "Dual-Protocol Communication (REST + gRPC)",
          detail:
            "External clients hit the API Gateway over REST for simplicity and broad compatibility. Internally, services communicate via gRPC with Protocol Buffers for type-safe, low-latency RPC calls — particularly critical for the stock deduction path where microseconds matter during high-concurrency order placement.",
        },
        {
          title: "Apache Kafka for Event Streaming",
          detail:
            "Kafka (KRaft mode, no ZooKeeper) decouples synchronous order placement from asynchronous side effects like notification dispatch and analytics. Using Snappy wire compression reduces network overhead. Consumer groups ensure exactly-once processing semantics per partition.",
        },
        {
          title: "Saga Pattern for Distributed Transactions",
          detail:
            "Instead of distributed 2PC locks (which kill throughput), Mini-Order implements the Saga compensation pattern. If the inventory service confirms a deduction but the payment service fails, compensation events trigger automatic stock rollback — maintaining eventual consistency without cross-service locks.",
        },
        {
          title: "API Gateway with Rate Limiting & Tracing",
          detail:
            "The edge gateway implements reverse proxy routing, IP-based token-bucket rate limiting to prevent abuse, and injects X-Correlation-ID headers for distributed request tracing across all downstream services.",
        },
        {
          title: "Database-per-Service Isolation",
          detail:
            "Each microservice owns its PostgreSQL instance, containerized via Docker Compose. This prevents cross-service schema coupling and allows independent scaling, migration, and failure isolation.",
        },
      ],
      components: [
        {
          name: "API Gateway",
          role: "Edge reverse proxy, rate limiter, correlation-ID injector, and request router",
        },
        {
          name: "Order Service",
          role: "Handles order lifecycle — creation, status tracking, and Saga orchestration",
        },
        {
          name: "Inventory Service",
          role: "Manages product stock via gRPC; processes deductions and compensation rollbacks",
        },
        {
          name: "Payment Service",
          role: "Processes payment transactions and publishes success/failure events to Kafka",
        },
        {
          name: "Notification Service",
          role: "Kafka consumer that sends order confirmations and alert notifications asynchronously",
        },
        {
          name: "Kafka Broker (KRaft)",
          role: "Event bus for async inter-service communication with Snappy compression",
        },
      ],
      dataFlow: [
        "Client sends POST /orders to API Gateway (REST)",
        "Gateway injects X-Correlation-ID and proxies to Order Service",
        "Order Service calls Inventory Service via gRPC to deduct stock",
        "Order Service publishes 'order.created' event to Kafka",
        "Payment Service consumes event, processes payment",
        "On payment success → Notification Service sends confirmation",
        "On payment failure → Saga compensation triggers stock rollback via gRPC",
      ],
    },
  },
  {
    slug: "goom-crm",
    name: "Goom CRM",
    logo: "/goom-crm-logo.svg",
    tagline:
      "A fast, focused CRM for small sales teams: a visual pipeline, contacts, companies, activities, tasks, forecasting, and reports.",
    stack: "React · TypeScript · Vite · Supabase",
    year: "2026",
    github: "https://github.com/bethe19/goom-crm",
    live: "https://goom-crm.vercel.app",
    about: [
      "Goom is a fast, focused CRM tailored for small sales teams. It provides a visual Kanban pipeline, robust contact and company management, activity tracking, forecasting, and detailed reports in team workspaces with role-based access control.",
      "It features an integrated AI assistant that runs securely through rate-limited Edge Functions to answer pipeline questions and draft follow-ups without exposing API keys to the browser.",
    ],
    highlights: [
      "Drag-and-drop Kanban pipeline with optimistic updates and undo capability",
      "Comprehensive contact, company, and activity management with bulk actions",
      "Real-time dashboards for forecasting, win rates, and sales cycle reporting",
      "Secure AI assistant running on Supabase Edge Functions for pipeline insights",
      "Full CSV import/export wizards and team workspaces with strict Row Level Security",
    ],
    tech: ["React 18", "TypeScript", "Vite", "Supabase", "PostgreSQL", "Tailwind CSS"],
    architecture: {
      overview:
        "Goom CRM is a modern Single Page Application built with React and Vite, backed by Supabase. It heavily leverages Supabase's PostgreSQL database for data storage, Auth for secure team workspaces, and Row Level Security (RLS) to enforce data isolation between different workspaces.",
      decisions: [
        {
          title: "Supabase as Backend-as-a-Service",
          detail:
            "Supabase was chosen for its tightly integrated PostgreSQL database, authentication, and real-time capabilities. Row Level Security ensures that even with a shared database, users can only access their workspace's CRM data.",
        },
        {
          title: "Edge Functions for AI Integration",
          detail:
            "The AI assistant relies on external provider APIs. By proxying these requests through Supabase Edge Functions, API keys remain securely on the server and usage can be rate-limited per user.",
        },
        {
          title: "Optimistic UI Updates",
          detail:
            "For actions like moving a deal across the Kanban board, the UI updates instantly while the mutation happens asynchronously in the background. If the request fails, the state is rolled back, providing a highly responsive feel.",
        },
      ],
      components: [
        {
          name: "Pipeline Kanban",
          role: "Interactive drag-and-drop board for managing deal stages, probabilities, and totals",
        },
        {
          name: "Insights Dashboard",
          role: "Renders real-time KPIs, forecasts, and period-over-period sales reports",
        },
        {
          name: "AI Assistant",
          role: "Secure conversational interface grounded in the user's workspace data",
        },
      ],
      dataFlow: [
        "User logs into a specific workspace via Supabase Auth",
        "React frontend queries Supabase PostgreSQL directly, filtered transparently by RLS",
        "User drags a deal to a new stage → UI updates optimistically",
        "Background mutation commits the stage change to the database",
        "If user queries the AI, request routes through Supabase Edge Functions for secure API handling",
      ],
    },
  },
  {
    slug: "event-booking",
    name: "Event Booking API",
    tagline:
      "A RESTful backend service for event ticketing and booking with automated cleanup, JWT authentication, and Chapa payment integration.",
    stack: "Go · Gin · PostgreSQL · Chapa",
    year: "2026",
    github: "https://github.com/bethe19/event-booking-app",
    about: [
      "Event Booking API is a backend service built in Go with Gin and PostgreSQL (pgx v5) designed to streamline event registration, ticketing lifecycles, and secure payment processing.",
      "It features automated background cleanup of expired or abandoned reservations, webhook-verified transactions via the Chapa payment gateway, and verifiable digital ticket generation.",
    ],
    highlights: [
      "Event management, seat reservations, and automated cleanup workers for expired bookings",
      "Chapa payment gateway integration with real-time webhook verification",
      "JWT authentication with role-based access control and bcrypt password security",
      "High-performance PostgreSQL data persistence utilizing the pgx v5 driver",
      "Containerized with Docker and structured for clean separation of concerns with graceful shutdown",
    ],
    tech: ["Go", "Gin", "PostgreSQL", "pgx", "JWT", "Chapa API", "Docker"],
    architecture: {
      overview:
        "Event Booking follows a layered clean architecture with clear separation between HTTP handlers, business logic services, and data access repositories. Background goroutines handle expired reservation cleanup, and webhook endpoints verify Chapa payment callbacks for transactional integrity.",
      decisions: [
        {
          title: "Clean Architecture Layering",
          detail:
            "The codebase separates concerns into handler → service → repository layers. HTTP handlers parse and validate requests, services contain business logic (booking rules, seat availability), and repositories manage PostgreSQL queries via pgx v5. This makes each layer independently testable.",
        },
        {
          title: "Background Cleanup Workers",
          detail:
            "A dedicated goroutine runs on a configurable ticker interval, scanning for expired or abandoned reservations and releasing held seats back to the available pool. This prevents phantom bookings from permanently locking inventory.",
        },
        {
          title: "Webhook-Verified Payments (Chapa)",
          detail:
            "Payment state transitions are driven by Chapa webhook callbacks, not client-side polling. The webhook handler verifies signatures, updates booking status atomically, and generates digital tickets only after confirmed payment — preventing race conditions between payment and ticket issuance.",
        },
        {
          title: "JWT + RBAC Authentication",
          detail:
            "Stateless JWT tokens carry role claims (admin, organizer, attendee). Middleware validates tokens and enforces role-based access on protected routes — organizers manage their own events, admins have global access, attendees can only book.",
        },
        {
          title: "Graceful Shutdown",
          detail:
            "The server listens for OS interrupt signals and drains active connections before shutting down. Background workers are cancelled via context propagation, ensuring no in-flight cleanup operations are lost.",
        },
      ],
      components: [
        {
          name: "HTTP Layer (Gin)",
          role: "Request routing, validation, JWT middleware, and response serialization",
        },
        {
          name: "Service Layer",
          role: "Business logic for events, bookings, tickets, and payment orchestration",
        },
        {
          name: "Repository Layer",
          role: "PostgreSQL data access via pgx v5 with connection pooling",
        },
        {
          name: "Cleanup Worker",
          role: "Background goroutine that releases expired seat reservations",
        },
        {
          name: "Chapa Webhook Handler",
          role: "Verifies payment callbacks and triggers ticket generation",
        },
      ],
      dataFlow: [
        "User authenticates via POST /auth/login → receives JWT token",
        "User browses events via GET /events with filtering & pagination",
        "User reserves seats via POST /bookings → seats locked temporarily",
        "Chapa payment initiated → user redirected to payment gateway",
        "Chapa webhook fires POST /webhooks/chapa with payment confirmation",
        "Booking status updated to 'confirmed', digital ticket generated",
        "Background worker periodically releases unpaid expired reservations",
      ],
    },
  },
  {
    slug: "nextstop",
    name: "NextStop",
    tagline:
      "A full-featured travel booking backend. It handles tours, guides, bookings, and reviews behind a clean REST API, complete with role-scoped access and Stripe payments.",
    stack: "Node.js · Express · MongoDB",
    year: "2025",
    github: "https://github.com/bethe19/Next-Stop",
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
    architecture: {
      overview:
        "NextStop is a monolithic Node.js backend following the MVC pattern with Express middleware chains. MongoDB with Mongoose provides flexible schema modeling for tours, users, bookings, and reviews. The API is RESTful with full CRUD, filtering, sorting, pagination, and geospatial queries.",
      decisions: [
        {
          title: "MVC Pattern with Middleware Chains",
          detail:
            "Express middleware handles cross-cutting concerns (auth, error handling, rate limiting) before requests reach controllers. Controllers delegate to Mongoose models for data access. This keeps route handlers thin and composable.",
        },
        {
          title: "MongoDB for Flexible Tour Schemas",
          detail:
            "Tours have deeply nested data (itineraries, locations with GeoJSON coordinates, image arrays, guide references). MongoDB's document model handles this naturally without complex JOINs, and Mongoose's population handles reference resolution.",
        },
        {
          title: "Geospatial Queries for Location-Based Search",
          detail:
            "Tour start locations are stored as GeoJSON points with 2dsphere indexes. Users can search for tours within a radius of their location, or find tours near specific coordinates — critical for a travel product.",
        },
        {
          title: "Stripe Checkout Integration",
          detail:
            "Bookings go through Stripe Checkout Sessions for PCI-compliant payment processing. Webhook handlers confirm successful payments and update booking records, keeping sensitive card data entirely off our servers.",
        },
      ],
      components: [
        {
          name: "Express Router",
          role: "50+ RESTful endpoints with nested resource routing",
        },
        {
          name: "Auth Middleware",
          role: "JWT verification, role-based route protection, password reset flows",
        },
        {
          name: "Tour Model",
          role: "Mongoose schema with GeoJSON locations, virtual properties, and aggregation pipelines",
        },
        {
          name: "Booking Service",
          role: "Manages reservation lifecycle and Stripe payment session creation",
        },
        {
          name: "Review System",
          role: "User reviews with aggregation-based average rating computation on tours",
        },
      ],
      dataFlow: [
        "User signs up / logs in → JWT issued with role claim",
        "User searches tours with filters, sorts, and geo-radius queries",
        "User selects tour → creates booking → Stripe Checkout Session generated",
        "Stripe webhook confirms payment → booking marked as paid",
        "Post-trip, user submits review → tour average rating recalculated via aggregation",
      ],
    },
  },
  {
    slug: "fintrack",
    name: "FinTrack",
    tagline:
      "Turn bank SMS and CSV statements into clean, structured spending data. It parses notification chaos into readable transactions, giving you instant clarity on spending trends.",
    stack: "React · Node.js · MongoDB",
    year: "2025",
    github: "https://github.com/bethe19/FinTrack",
    live: "https://fin-track-eth.vercel.app",
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
    architecture: {
      overview:
        "FinTrack is a full-stack application with a React SPA frontend and Node.js/Express backend. The parsing engine normalizes heterogeneous input formats (SMS text, CSV files) into a unified transaction schema stored in MongoDB. The analytics layer aggregates data for chart rendering on the client.",
      decisions: [
        {
          title: "Multi-Format Parsing Engine",
          detail:
            "SMS messages and CSV files have wildly different structures. The parser uses regex-based pattern matching for Ethiopian bank SMS formats and streaming CSV parsing for statement files. Both converge into a normalized { amount, category, date, type, merchant } schema.",
        },
        {
          title: "Per-User Data Isolation",
          detail:
            "Every transaction is scoped to its owner via user ID foreign keys and middleware-enforced query filters. Users can never access or aggregate across another user's financial data, even through aggregation pipeline queries.",
        },
        {
          title: "Aggregation-Powered Analytics",
          detail:
            "MongoDB aggregation pipelines compute category breakdowns, monthly totals, and income vs. expense ratios server-side. This avoids transferring raw transaction data to the client for computation, reducing payload size and improving dashboard load times.",
        },
      ],
      components: [
        {
          name: "React SPA",
          role: "Dashboard UI with Chart.js visualizations and transaction list views",
        },
        {
          name: "Express API",
          role: "REST endpoints for auth, transaction CRUD, and analytics queries",
        },
        {
          name: "SMS Parser",
          role: "Regex-based extraction engine for Ethiopian bank notification formats",
        },
        {
          name: "CSV Parser",
          role: "Streaming parser that maps bank statement columns to the unified schema",
        },
        {
          name: "Analytics Engine",
          role: "MongoDB aggregation pipelines for spending summaries and trend computation",
        },
      ],
      dataFlow: [
        "User pastes SMS text or uploads CSV bank statement",
        "Parser normalizes input into unified transaction schema",
        "Transactions stored in MongoDB with user-scoped isolation",
        "Analytics API aggregates data by category, month, and type",
        "React frontend renders Chart.js visualizations and filterable lists",
      ],
    },
  },
  {
    slug: "moodie",
    name: "Moodie",
    tagline:
      "Discover movies that match your mood—just type how you feel. The backend maps your free-text mood into structured tags and queries a film API to recommend exact matches.",
    stack: "TypeScript · React · LLM",
    year: "2025",
    github: "https://github.com/bethe19/moodie-movie-site",
    live: "https://moodie-neon.vercel.app",
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
    architecture: {
      overview:
        "Moodie uses a pipeline architecture: natural-language input → LLM-powered mood analysis → structured genre/tone tags → TMDB API query → ranked recommendations. The React frontend handles input and display, while the backend orchestrates the NLP-to-search pipeline.",
      decisions: [
        {
          title: "LLM-Powered Mood Parsing",
          detail:
            "Instead of a rigid mood selector dropdown, users type free-form text. An LLM API call extracts structured tags (genres, tones, themes) from the natural language input. This handles ambiguous descriptions like 'something cozy but a little sad' that a dropdown can't express.",
        },
        {
          title: "TMDB API for Film Discovery",
          detail:
            "The extracted tags map to TMDB genre IDs and keyword filters. Multiple API calls are batched to maximize match diversity, then results are ranked by relevance score and popularity to surface the best recommendations.",
        },
        {
          title: "Typed React Component Architecture",
          detail:
            "Every component has strict TypeScript interfaces for props and state. This catches mismatched data shapes at compile time rather than runtime, which is critical when the data pipeline involves external API responses.",
        },
      ],
      components: [
        {
          name: "Mood Input UI",
          role: "Free-text input with real-time character feedback and submit handler",
        },
        {
          name: "LLM Mood Analyzer",
          role: "Extracts structured genre/tone/theme tags from natural language",
        },
        {
          name: "TMDB Query Builder",
          role: "Maps extracted tags to TMDB API parameters and batches requests",
        },
        {
          name: "Recommendation Ranker",
          role: "Scores and sorts movie results by relevance and popularity",
        },
        {
          name: "Movie Card Grid",
          role: "Renders ranked results with posters, ratings, and descriptions",
        },
      ],
      dataFlow: [
        "User types mood description in free-text input",
        "LLM API extracts structured tags (genres, tones, themes)",
        "Tags mapped to TMDB API genre IDs and keyword filters",
        "Batched TMDB API requests fetch matching movies",
        "Results ranked by relevance score and displayed in card grid",
      ],
    },
  },
  {
    slug: "perceptron-svm",
    name: "Perceptron & SVM from Scratch",
    tagline:
      "Classic ML algorithms implemented from first principles. Built during my iCog Labs internship to deeply understand the core math, update rules, and the dual form of SVMs without shortcuts.",
    stack: "Python · NumPy",
    year: "2025",
    github: "https://github.com/bethe19/perceptron-svm-implementation",
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
    architecture: {
      overview:
        "This project follows a computational notebook architecture with modular implementations. Each algorithm is built from mathematical definitions, with separate modules for model definition, training loop, loss computation, and visualization. No ML framework abstractions are used — every gradient and update step is explicit.",
      decisions: [
        {
          title: "First-Principles Implementation (No sklearn)",
          detail:
            "The entire point was to internalize the math. The Perceptron update rule (w ← w + yᵢxᵢ), hinge loss computation, and gradient descent steps are all written explicitly in NumPy. This forces understanding of why convergence happens, not just that it happens.",
        },
        {
          title: "NumPy Vectorization over Python Loops",
          detail:
            "Training loops use NumPy matrix operations instead of Python for-loops where possible. This teaches the difference between O(n) Python iteration and O(1) vectorized operations — a critical skill for performant ML code.",
        },
        {
          title: "Decision Boundary Visualization",
          detail:
            "Matplotlib renders 2D decision boundaries showing how the hyperplane separates classes. Visualizing the margin for SVM versus the simple boundary for Perceptron makes the geometric intuition concrete and debuggable.",
        },
      ],
      components: [
        {
          name: "Perceptron Module",
          role: "Implements the Perceptron learning algorithm with configurable learning rate and epochs",
        },
        {
          name: "SVM Module",
          role: "Implements SVM with hinge loss, gradient computation, and regularization",
        },
        {
          name: "Data Generator",
          role: "Creates synthetic 2D datasets for training and evaluation",
        },
        {
          name: "Visualizer",
          role: "Matplotlib-based decision boundary and training progress plots",
        },
      ],
      dataFlow: [
        "Generate or load 2D classification dataset",
        "Initialize model weights to zeros",
        "Run training loop: compute loss → compute gradient → update weights",
        "Track convergence metrics per epoch",
        "Render decision boundary visualization with Matplotlib",
      ],
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}

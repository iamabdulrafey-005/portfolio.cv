export const portfolioData = {
  personal: {
    name: "Abdul Rafey",
    title: "CS Student & Full-Stack Developer",
    educationLevel: "BS Computer Science (BSCS) - 5th Semester",
    university: "Qarshi University, Lahore",
    rollNo: "24L-0043",
    status: "Available for Internships & Projects",
    location: "Lahore, Pakistan",
    email: "iamabdulrafey005@gmail.com",
    githubUsername: "iamabdulrafey-005",
    githubUrl: "https://github.com/iamabdulrafey-005",
    linkedinUrl: "https://www.linkedin.com/in/iamabdulrafey-005",
    shortBio: "Passionate 5th-semester Computer Science undergraduate at Qarshi University, Lahore. Specializing in high-performance web applications, distributed systems architecture, and modern full-stack development using React, Node.js, and Tailwind CSS.",
    longBio: "I am a dedicated Computer Science student with a deep passion for building resilient web systems and clean, user-centric interfaces. From developing adaptive load-shedding middleware in SurgeTicket (CIT331 Web Technologies) to deploying conversion-engineered digital platforms like Web Launch, I blend algorithmic problem solving with cutting-edge frontend engineering."
  },

  stats: [
    { label: "Current Semester", value: "5th BSCS", detail: "Qarshi University" },
    { label: "University Roll", value: "24L-0043", detail: "Lahore Campus" },
    { label: "Core Projects", value: "SurgeTicket & Web Launch", detail: "Full-Stack & Systems" },
    { label: "Tech Stack", value: "10+ Modern Tools", detail: "React, Node, Git & Cloud" }
  ],

  projects: [
    {
      id: "surgeticket",
      title: "SurgeTicket (VaultProxy)",
      tagline: "Adaptive Traffic Control Ticketing Platform with Load-Shedding & Atomic Seat Holds",
      badge: "CIT331 Web Technologies Project",
      highlight: "High Concurrency & Fault Tolerance",
      description: "A resilient ticket booking infrastructure engineered for extreme flash-sale traffic surges. Implements token-bucket rate limiting, circuit breaker middleware, and atomic seat reservation locks with automated 5-minute TTL to eliminate double bookings and race conditions.",
      keyFeatures: [
        "Load-Shedding Middleware: Automatically throttles low-priority background jobs during peak 10,000+ req/s bursts.",
        "Atomic Seat Holds: Prevents double-booking via distributed locking principles with automatic TTL expiration.",
        "Anti-Scalper Virtual Queue: Prioritizes verified human sessions while placing suspicious traffic into pacing rooms.",
        "Real-Time Metrics Telemetry: Live latency tracking, throughput graphs, and circuit-breaker trip states."
      ],
      techStack: ["Node.js", "Express", "React", "JavaScript (ES6+)", "Tailwind CSS", "REST API", "XAMPP / MySQL"],
      metrics: {
        throughput: "12,500 req/min simulated",
        lockReliability: "100% race-condition free",
        p99Latency: "18ms under normal load"
      },
      codeSnippet: `// SurgeTicket: Atomic Seat Hold with 5-minute TTL Middleware
export async function holdSeatAtomically(seatId, userId) {
  const lockKey = \`seat_lock:\${seatId}\`;
  const isAcquired = await redisClient.set(lockKey, userId, {
    NX: true, // Only set if not already locked
    EX: 300   // 5-minute automatic reservation TTL
  });

  if (!isAcquired) {
    throw new SeatAlreadyHeldError("Seat currently reserved by another buyer");
  }

  // Dispatch circuit-breaker checked checkout session
  return generateReservationToken(seatId, userId);
}`
    },
    {
      id: "weblaunch",
      title: "Web Launch",
      tagline: "Digital Agency Platform for Web Dev, High-Performance Hosting & Meta Ads Management",
      badge: "Commercial Client Agency Platform",
      highlight: "Live on Vercel Edge",
      liveUrl: "https://web-launch-gules.vercel.app",
      description: "A full-scale digital agency web solution built to provide businesses with custom web architecture, ultra-fast cloud hosting configurations, and data-driven Meta ads growth funnels.",
      keyFeatures: [
        "Conversion-Engineered UI: Dynamic interactive ROI calculators, responsive hero sections, and sleek aesthetic.",
        "Vercel Edge Deployment: Optimized asset delivery, zero-layout-shift rendering, and sub-second initial loads.",
        "Interactive Service Suites: Tailored packages for custom web development, hosting migrations, and Meta Ads scaling.",
        "Client Onboarding Funnel: Streamlined project intake flow with real-time quote estimations."
      ],
      techStack: ["React", "JavaScript", "Tailwind CSS", "Vercel", "Git & GitHub", "Responsive UI"],
      metrics: {
        lighthouseScore: "99/100 Performance",
        deployment: "Vercel Edge Global CDN",
        responsiveScore: "100% Cross-Device Adaptability"
      }
    }
  ],

  skills: {
    categories: [
      {
        id: "frontend",
        name: "Frontend & UI Engineering",
        items: [
          { name: "React", level: 92, status: "Advanced", desc: "Component architecture, hooks, state patterns, Vite" },
          { name: "JavaScript (ES6+)", level: 94, status: "Core Proficiency", desc: "Async/await, closures, prototypes, event loop" },
          { name: "Tailwind CSS", level: 95, status: "Expert", desc: "Utility-first design, fluid responsive systems, glassmorphism" },
          { name: "HTML5 & CSS3", level: 96, status: "Semantic Mastery", desc: "Modern layouts, Flexbox, Grid, 3D CSS transforms" }
        ]
      },
      {
        id: "backend",
        name: "Backend, Systems & Databases",
        items: [
          { name: "Node.js & Express", level: 88, status: "Proficient", desc: "RESTful architecture, custom middleware, rate-limiters" },
          { name: "XAMPP & MySQL", level: 86, status: "Proficient", desc: "Relational schema design, normalization, ACID transactions" },
          { name: "REST APIs", level: 92, status: "Advanced", desc: "API design, status codes, payload optimization, security" },
          { name: "Concurrency & Locks", level: 84, status: "Specialized", desc: "Atomic operations, TTL locks, load-shedding concepts" }
        ]
      },
      {
        id: "tools",
        name: "Developer Tools & DevOps",
        items: [
          { name: "Git & GitHub", level: 92, status: "Daily Workflow", desc: "Branching strategies, PRs, version control (@iamabdulrafey-005)" },
          { name: "VS Code", level: 95, status: "Primary IDE", desc: "Debugging, extensions, snippet workflows, terminal mastery" },
          { name: "Vercel", level: 90, status: "Deployment", desc: "CI/CD continuous pipelines, edge functions, DNS routing" },
          { name: "Postman", level: 87, status: "API Testing", desc: "Endpoint validation, load checks, integration test suites" }
        ]
      }
    ]
  },

  education: {
    degree: "Bachelor of Science in Computer Science (BSCS)",
    institution: "Qarshi University, Lahore",
    currentStatus: "5th Semester Undergraduate",
    rollNumber: "24L-0043",
    period: "2023 - Present",
    highlights: [
      {
        course: "CIT331 Web Technologies",
        description: "Created SurgeTicket (VaultProxy) adaptive ticketing platform. Explored high-concurrency request patterns, distributed locks, and responsive frontend integration."
      },
      {
        course: "Data Structures & Algorithms",
        description: "Deep study of asymptotic complexity, trees, graphs, dynamic programming, and search/sort optimizations."
      },
      {
        course: "Database Systems",
        description: "Mastery of relational database schema modeling, SQL query optimizations, indexing, and transactional isolation."
      },
      {
        course: "Software Engineering & Architecture",
        description: "Focus on clean code, modular design patterns, client-server separation, and agile lifecycle."
      }
    ]
  }
};

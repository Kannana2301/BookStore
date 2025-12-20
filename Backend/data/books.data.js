const books = [
  // Free Books
  {
    name: "Introduction to JavaScript",
    title: "Learn the basics of JavaScript programming from scratch",
    category: "Free",
    price: 0,
    image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=400&h=600&fit=crop",
    description: "Perfect for beginners! This comprehensive guide covers JavaScript fundamentals including variables, functions, loops, and DOM manipulation. Start your coding journey today with practical examples and exercises.",
    author: "John Smith",
    pages: 320,
    language: "English",
    publisher: "Tech Books Inc",
    rating: 4.5
  },
  {
    name: "HTML & CSS Essentials",
    title: "Master web design with HTML5 and CSS3",
    category: "Free",
    price: 0,
    image: "https://images.unsplash.com/photo-1523437113738-bbd3cc89fb19?w=400&h=600&fit=crop",
    description: "Build beautiful, responsive websites from the ground up. Learn HTML5 semantic elements, CSS3 animations, flexbox, and grid layout with real-world projects.",
    author: "Sarah Johnson",
    pages: 280,
    language: "English",
    publisher: "Web Dev Press",
    rating: 4.7
  },
  {
    name: "Python for Beginners",
    title: "Start your programming journey with Python",
    category: "Free",
    price: 0,
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=600&fit=crop",
    description: "Python made easy! Learn syntax, data structures, functions, and object-oriented programming. Includes hands-on projects like building a calculator and a simple game.",
    author: "Michael Chen",
    pages: 350,
    language: "English",
    publisher: "Code Academy Publishing",
    rating: 4.6
  },
  {
    name: "Git Version Control",
    title: "Essential guide to Git and GitHub",
    category: "Free",
    price: 0,
    image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=600&fit=crop",
    description: "Master version control with Git. Learn branching, merging, collaboration workflows, and best practices for team development. Perfect for developers of all levels.",
    author: "David Martinez",
    pages: 180,
    language: "English",
    publisher: "DevOps Publishing",
    rating: 4.4
  },

  // Programming Books
  {
    name: "Advanced React Patterns",
    title: "Build scalable React applications",
    category: "Programming",
    price: 29,
    image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=600&fit=crop",
    description: "Deep dive into React best practices, custom hooks, context API, state management, and performance optimization. Build production-ready applications with confidence.",
    author: "Emily Rodriguez",
    pages: 420,
    language: "English",
    publisher: "Modern Web Publishing",
    rating: 4.8
  },
  {
    name: "Node.js Mastery",
    title: "Backend development with Node.js and Express",
    category: "Programming",
    price: 35,
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=400&h=600&fit=crop",
    description: "Build RESTful APIs, handle authentication, work with databases, and deploy scalable Node.js applications. Includes real-world projects and best practices.",
    author: "Robert Taylor",
    pages: 480,
    language: "English",
    publisher: "Backend Press",
    rating: 4.7
  },
  {
    name: "TypeScript Deep Dive",
    title: "Write type-safe JavaScript applications",
    category: "Programming",
    price: 32,
    image: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?w=400&h=600&fit=crop",
    description: "Master TypeScript from basics to advanced types. Learn generics, decorators, utility types, and how to integrate TypeScript in React, Node.js, and Angular projects.",
    author: "Lisa Anderson",
    pages: 390,
    language: "English",
    publisher: "Type Systems Inc",
    rating: 4.6
  },
  {
    name: "MongoDB Complete Guide",
    title: "NoSQL database design and optimization",
    category: "Programming",
    price: 28,
    image: "https://images.unsplash.com/photo-1544256718-3bcf237f3974?w=400&h=600&fit=crop",
    description: "Learn MongoDB from scratch including CRUD operations, aggregation, indexing, sharding, and replica sets. Build scalable database solutions.",
    author: "James Wilson",
    pages: 340,
    language: "English",
    publisher: "Database Publishers",
    rating: 4.5
  },
  {
    name: "Docker & Kubernetes",
    title: "Containerization and orchestration mastery",
    category: "Programming",
    price: 45,
    image: "https://images.unsplash.com/photo-1605745341112-85968b19335b?w=400&h=600&fit=crop",
    description: "Master containerization with Docker and orchestration with Kubernetes. Learn deployment strategies, scaling, monitoring, and cloud-native development.",
    author: "Karen Lee",
    pages: 520,
    language: "English",
    publisher: "Cloud Native Press",
    rating: 4.9
  },

  // Web Development Books
  {
    name: "Full Stack Web Development",
    title: "Complete guide to modern web development",
    category: "Web Development",
    price: 42,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=600&fit=crop",
    description: "Learn to build complete web applications from frontend to backend. Covers React, Node.js, databases, authentication, deployment, and more.",
    author: "Andrew White",
    pages: 650,
    language: "English",
    publisher: "Full Stack Publishing",
    rating: 4.8
  },
  {
    name: "Responsive Web Design",
    title: "Create mobile-first websites",
    category: "Web Development",
    price: 25,
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166?w=400&h=600&fit=crop",
    description: "Master responsive design principles, mobile-first approach, CSS frameworks, and progressive web apps. Make your websites work perfectly on all devices.",
    author: "Nicole Brown",
    pages: 300,
    language: "English",
    publisher: "Design Web Press",
    rating: 4.6
  },
  {
    name: "Vue.js Complete Course",
    title: "Build interactive UIs with Vue 3",
    category: "Web Development",
    price: 30,
    image: "https://images.unsplash.com/photo-1619410283995-43d9134e7656?w=400&h=600&fit=crop",
    description: "Learn Vue 3 composition API, routing with Vue Router, state management with Pinia, and build real-world single-page applications.",
    author: "Christopher Davis",
    pages: 380,
    language: "English",
    publisher: "Vue Publishing House",
    rating: 4.7
  },
  {
    name: "Next.js for Production",
    title: "Server-side React applications",
    category: "Web Development",
    price: 38,
    image: "https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=400&h=600&fit=crop",
    description: "Build SEO-friendly, fast React applications with Next.js. Learn server-side rendering, static generation, API routes, and deployment strategies.",
    author: "Jennifer Garcia",
    pages: 410,
    language: "English",
    publisher: "SSR Books",
    rating: 4.8
  },

  // Data Science Books
  {
    name: "Data Science with Python",
    title: "Analytics and machine learning fundamentals",
    category: "Data Science",
    price: 48,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=600&fit=crop",
    description: "Learn data analysis, visualization, and machine learning with Python. Covers NumPy, Pandas, Matplotlib, Scikit-learn, and real-world datasets.",
    author: "Dr. Maria Santos",
    pages: 580,
    language: "English",
    publisher: "Data Science Press",
    rating: 4.9
  },
  {
    name: "Machine Learning A-Z",
    title: "Practical machine learning algorithms",
    category: "Data Science",
    price: 52,
    image: "https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&h=600&fit=crop",
    description: "Comprehensive guide to machine learning algorithms including regression, classification, clustering, and neural networks. Hands-on projects included.",
    author: "Dr. Richard Kumar",
    pages: 620,
    language: "English",
    publisher: "ML Publishing",
    rating: 4.8
  },
  {
    name: "Deep Learning Essentials",
    title: "Neural networks and AI fundamentals",
    category: "Data Science",
    price: 55,
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400&h=600&fit=crop",
    description: "Master deep learning with TensorFlow and PyTorch. Build CNNs, RNNs, GANs, and transformers. Includes computer vision and NLP projects.",
    author: "Dr. Sophia Zhang",
    pages: 680,
    language: "English",
    publisher: "AI Research Press",
    rating: 4.9
  },

  // Business & Finance Books
  {
    name: "Startup Founder's Guide",
    title: "Launch and grow your tech startup",
    category: "Business",
    price: 35,
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&h=600&fit=crop",
    description: "Everything you need to know about starting a tech company. From ideation to fundraising, hiring, product development, and scaling your business.",
    author: "Mark Thompson",
    pages: 380,
    language: "English",
    publisher: "Entrepreneur Press",
    rating: 4.7
  },
  {
    name: "Digital Marketing Mastery",
    title: "Grow your business online",
    category: "Business",
    price: 32,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=600&fit=crop",
    description: "Master SEO, social media marketing, content marketing, email campaigns, and analytics. Practical strategies to grow your online presence.",
    author: "Amanda Foster",
    pages: 320,
    language: "English",
    publisher: "Marketing World",
    rating: 4.6
  },
  {
    name: "Product Management 101",
    title: "Build products people love",
    category: "Business",
    price: 38,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=600&fit=crop",
    description: "Learn product strategy, user research, roadmap planning, agile methodologies, and data-driven decision making. Essential for product managers.",
    author: "Brian Mitchell",
    pages: 360,
    language: "English",
    publisher: "Product Leadership Press",
    rating: 4.8
  },

  // Design Books
  {
    name: "UI/UX Design Principles",
    title: "Create beautiful user experiences",
    category: "Design",
    price: 40,
    image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=400&h=600&fit=crop",
    description: "Master user interface and user experience design. Learn design thinking, wireframing, prototyping, user testing, and Figma/Adobe XD.",
    author: "Jessica Park",
    pages: 420,
    language: "English",
    publisher: "Design Masters",
    rating: 4.9
  },
  {
    name: "Graphic Design Theory",
    title: "Visual communication fundamentals",
    category: "Design",
    price: 36,
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=600&fit=crop",
    description: "Learn color theory, typography, composition, branding, and visual hierarchy. Create stunning designs for print and digital media.",
    author: "Daniel Russo",
    pages: 340,
    language: "English",
    publisher: "Visual Arts Press",
    rating: 4.7
  },

  // Cybersecurity Books
  {
    name: "Ethical Hacking Guide",
    title: "Learn penetration testing and security",
    category: "Cybersecurity",
    price: 45,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=600&fit=crop",
    description: "Learn ethical hacking techniques, penetration testing, vulnerability assessment, and security best practices. Protect systems and networks.",
    author: "Alex Turner",
    pages: 480,
    language: "English",
    publisher: "Security Press",
    rating: 4.8
  },
  {
    name: "Network Security Fundamentals",
    title: "Protect your infrastructure",
    category: "Cybersecurity",
    price: 42,
    image: "https://images.unsplash.com/photo-1563206767-5b18f218e8de?w=400&h=600&fit=crop",
    description: "Comprehensive guide to network security including firewalls, VPNs, intrusion detection, encryption, and security protocols.",
    author: "Patricia Moore",
    pages: 440,
    language: "English",
    publisher: "InfoSec Publishing",
    rating: 4.7
  }
];

export default books;

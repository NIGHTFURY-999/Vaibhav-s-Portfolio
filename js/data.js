/**
 * Vaibhav Shekhar Haldankar - Portfolio Master Data Store
 * Refined with realistic fresher competencies, authentic human tone,
 * updated social links, and Google Drive certificates folder.
 */

const PORTFOLIO_DATA = {
  personal: {
    name: "Vaibhav Shekhar Haldankar",
    title: "AI / Machine Learning Engineer & Data Analyst",
    subtitle: "MCA in AI & Data Science | Python, Data Analytics & Cloud Enthusiast",
    tagline: "Passionate about turning raw data into meaningful insights and building intelligent, scalable machine learning applications.",
    email: "vaibhavhaldankar999@gmail.com",
    phone: "+91 8177923800",
    phoneDisplay: "+91 81779 23800",
    location: "Pune / Goa, India",
    availability: "Available for Full-Time & Graduate Opportunities",
    statusBadge: "🟢 Actively Seeking AI/ML & Data Analyst Roles",
    resumeLink: "https://drive.google.com/file/d/1yiuKrMVoF2x1alWFS7DphZCEtGoZ2DOV/view?usp=drive_link",
    certificatesFolder: "https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u",
    socials: {
      github: "https://github.com/NIGHTFURY-999",
      linkedin: "https://www.linkedin.com/in/vaibhav-haldankar/",
      leetcode: "https://leetcode.com/u/Vaibhav-Haldankar/",
      email: "mailto:vaibhavhaldankar999@gmail.com"
    },
    bio: [
      "Hello! I am Vaibhav, an MCA Postgraduate specializing in Artificial Intelligence & Data Science from DY Patil International University, Pune. I enjoy working at the intersection of data analysis, applied machine learning, and clean software development.",
      "As a fresher, I have invested significant time into hands-on projects—such as researching spatio-temporal water quality prediction using Kalman filters and XGBoost, engineering semantic search systems with FAISS vector indexing and LLMs, and building cloud monitoring workflows with AWS CloudWatch and Lambda.",
      "I love digging into complex datasets, uncovering patterns through exploratory data analysis, and collaborating with cross-functional teams. During my academic journey, I had the privilege of serving as Student Placement Coordinator and Class Representative, which honed my communication, adaptability, and teamwork skills."
    ],
    stats: [
      { label: "Hands-on Projects", value: "6+", icon: "fa-code-branch" },
      { label: "Core Technologies", value: "15+", icon: "fa-layer-group" },
      { label: "Industry Certifications", value: "4+", icon: "fa-certificate" },
      { label: "Academic CGPA (MCA)", value: "6.7", icon: "fa-graduation-cap" }
    ]
  },

  skills: {
    categories: [
      {
        id: "ai-data",
        name: "AI, Machine Learning & Data Analytics",
        icon: "fa-chart-pie",
        skills: [
          { name: "Python (Data Analysis & ML)", level: 72, tag: "Proficient" },
          { name: "Pandas & NumPy", level: 70, tag: "Data Wrangling" },
          { name: "Scikit-Learn & XGBoost", level: 66, tag: "Predictive Models" },
          { name: "Matplotlib & Seaborn", level: 68, tag: "Visualization" },
          { name: "FAISS & Vector Embeddings", level: 62, tag: "Semantic Search" },
          { name: "PyTorch & Deep Learning", level: 58, tag: "Neural Networks" },
          { name: "NLTK & Text Processing", level: 64, tag: "NLP" },
          { name: "OpenCV", level: 55, tag: "Computer Vision" }
        ]
      },
      {
        id: "databases-sql",
        name: "Databases & Data Querying",
        icon: "fa-database",
        skills: [
          { name: "SQL (Joins, Aggregations, Subqueries)", level: 72, tag: "Core SQL" },
          { name: "MySQL & PostgreSQL", level: 66, tag: "RDBMS" },
          { name: "MongoDB", level: 58, tag: "NoSQL" },
          { name: "SQLite", level: 64, tag: "Embedded DB" },
          { name: "Data Cleaning & Preprocessing", level: 70, tag: "ETL / Wrangling" }
        ]
      },
      {
        id: "cloud-tools",
        name: "Cloud, Systems & Developer Tools",
        icon: "fa-cloud",
        skills: [
          { name: "AWS (EC2, S3, CloudWatch, Lambda)", level: 62, tag: "Cloud Foundations" },
          { name: "Git & GitHub Version Control", level: 72, tag: "Collaboration" },
          { name: "Linux & Bash Basics", level: 60, tag: "Command Line" },
          { name: "Streamlit", level: 68, tag: "Data Apps" },
          { name: "VS Code & Jupyter Notebooks", level: 75, tag: "IDE / Analysis" }
        ]
      },
      {
        id: "web-dev",
        name: "Web & Application Development",
        icon: "fa-code",
        skills: [
          { name: "HTML5 & Modern CSS3", level: 70, tag: "Frontend" },
          { name: "JavaScript (ES6+)", level: 62, tag: "Web Scripting" },
          { name: "React.js Basics", level: 55, tag: "Component UI" },
          { name: "Node.js & Express REST APIs", level: 56, tag: "Backend APIs" },
          { name: "PHP Basics", level: 52, tag: "Server Scripting" }
        ]
      }
    ]
  },

  projects: [
    {
      id: "water-quality",
      title: "Urban Water Quality Prediction Using Ubiquitous Data",
      category: "ai-data",
      featured: true,
      badge: "Research & Predictive Modeling",
      shortDesc: "Built a spatio-temporal predictive model to forecast urban water pollutant levels using sensor feeds, inspired by IEEE Transactions research.",
      fullDesc: "This project tackles the challenge of noisy IoT environmental sensors. I implemented Kalman Filtering for noise reduction and ARMA time-series trend extraction, feeding the processed features into XGBoost and Random Forest regression models to forecast water quality metrics across urban nodes.",
      techStack: ["Python", "Pandas", "NumPy", "Kalman Filter", "ARMA", "XGBoost", "Random Forest", "Matplotlib"],
      impact: "Demonstrated strong predictive correlation (94% R² score) and effective handling of missing sensor telemetry through hybrid modeling.",
      highlights: [
        "Preprocessed and cleaned multi-sensor temporal datasets",
        "Applied Kalman Filter noise smoothing to handle real-world sensor inaccuracies",
        "Trained and evaluated XGBoost and Random Forest regressors with cross-validation",
        "Visualized pollutant distribution trends and spatial patterns using Matplotlib"
      ],
      github: "https://github.com/NIGHTFURY-999",
      demo: "#",
      accentColor: "#2997ff"
    },
    {
      id: "querytube",
      title: "QueryTube – AI Semantic Video Search & Summarizer",
      category: "ai-data",
      featured: true,
      badge: "NLP & Vector Search",
      shortDesc: "Developed an NLP-driven semantic search tool that indexes YouTube transcript embeddings with FAISS for fast query matching and summaries.",
      fullDesc: "Traditional keyword search often misses conversational context. QueryTube parses video transcripts into semantic chunks, generates vector embeddings, and performs ultra-fast cosine similarity searches via FAISS. It pairs with local LLMs (Ollama) to synthesize concise takeaways with timestamps.",
      techStack: ["Python", "FAISS", "Vector Embeddings", "Ollama LLM", "LangChain", "NLP", "Streamlit"],
      impact: "Achieved sub-second transcript retrieval across hours of video content, making technical learning and research more efficient.",
      highlights: [
        "Implemented sliding-window text chunking for transcript data",
        "Generated dense vector embeddings and indexed them using FAISS for nearest-neighbor search",
        "Built an interactive query interface with Streamlit",
        "Enabled automated timestamp citation and key insight summaries"
      ],
      github: "https://github.com/NIGHTFURY-999",
      demo: "#",
      accentColor: "#64d2ff"
    },
    {
      id: "agri-ai",
      title: "Agri AI – Smart Agriculture Analysis & Marketplace",
      category: "web-dev",
      featured: true,
      badge: "Full-Stack + Machine Learning",
      shortDesc: "Created an agricultural application combining crop leaf disease detection, weather data insights, and a marketplace for farmers.",
      fullDesc: "An end-to-end full-stack web application with computer vision support. Farmers can upload crop leaf photos to detect common diseases, view local weather forecasts, and list agricultural products directly in a digital marketplace.",
      techStack: ["MongoDB", "Express.js", "React.js", "Node.js (MERN)", "Python", "OpenCV", "Machine Learning"],
      impact: "Bridged practical machine learning with an easy-to-use web interface for community farmers.",
      highlights: [
        "Integrated image classification pipeline for plant leaf pathology detection",
        "Built responsive MERN stack REST APIs and database models",
        "Incorporated weather data feeds and crop care recommendations",
        "Created an intuitive, clean user dashboard"
      ],
      github: "https://github.com/NIGHTFURY-999",
      demo: "#",
      accentColor: "#30d158"
    },
    {
      id: "aws-observability",
      title: "Cloud Observability & Event Pipeline (AWS)",
      category: "cloud-tools",
      featured: true,
      badge: "Cloud & Automation",
      shortDesc: "Implemented a cloud logging and monitoring pipeline using AWS CloudWatch, automated Amazon SNS alerts, and Lambda triggers.",
      fullDesc: "Designed an automated monitoring setup on AWS. Application logs from EC2 instances are tracked in AWS CloudWatch. Metric alarms detect anomalous error patterns, firing instant notifications through Amazon SNS and invoking serverless Python Lambda functions for automated response.",
      techStack: ["AWS CloudWatch", "AWS Lambda", "Amazon SNS", "AWS EC2", "Python", "Streamlit"],
      impact: "Helped reduce manual monitoring effort through real-time alert notifications and serverless automated handling.",
      highlights: [
        "Configured CloudWatch Metric Filters and alarm thresholds for application logs",
        "Set up Amazon SNS topics to broadcast automated alerts to email channels",
        "Wrote Python Lambda scripts to handle auto-remediation triggers",
        "Built a Streamlit dashboard to monitor health metrics visually"
      ],
      github: "https://github.com/NIGHTFURY-999",
      demo: "#",
      accentColor: "#bf5af2"
    },
    {
      id: "gfa-portal",
      title: "Goa Football Association Official Web Platform",
      category: "web-dev",
      featured: false,
      badge: "Team Project (Cybernetrix Group)",
      shortDesc: "Worked as a core web developer in Cybernetrix Group to build the official Goa Football Association digital portal.",
      fullDesc: "Contributed to database structure design, tournament fixture management, player registration features, and end-to-end testing for the Goa Football Association. Awarded an official certificate of appreciation by the GFA General Secretary.",
      techStack: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
      impact: "Delivered a vital digital management system used across football clubs and tournaments in Goa.",
      highlights: [
        "Designed and normalized MySQL tables for clubs, players, and match schedules",
        "Implemented secure administration forms for match score updates",
        "Conducted thorough testing and quality assurance prior to launch",
        "Recognized by GFA with an official commendation certificate"
      ],
      github: "https://github.com/NIGHTFURY-999",
      demo: "#",
      accentColor: "#ff9f0a"
    },
    {
      id: "hotel-pos",
      title: "POS Hotel Billing & Invoicing System",
      category: "web-dev",
      featured: false,
      badge: "Database & Backend Application",
      shortDesc: "Created a point-of-sale billing application to manage dining orders, generate tax invoices, and track daily sales data.",
      fullDesc: "Developed to streamline restaurant order processing, table management, and itemized billing. Generates accurate invoices with automated tax calculations and daily sales summaries.",
      techStack: ["Python", "PHP", "MySQL", "JavaScript", "Bootstrap"],
      impact: "Reduced billing calculation errors and simplified daily revenue reconciliation.",
      highlights: [
        "Designed structured relational schemas for menu items, orders, and receipts",
        "Implemented automatic tax calculation and invoice printing routines",
        "Built daily summary views for cashier shift handovers"
      ],
      github: "https://github.com/NIGHTFURY-999",
      demo: "#",
      accentColor: "#ff375f"
    }
  ],

  experience: [
    {
      role: "Machine Learning Intern",
      company: "Codtech IT Solutions Pvt. Ltd.",
      period: "June 2025 - August 2025",
      type: "Internship",
      location: "Remote / Hybrid",
      description: "Gained practical experience developing machine learning workflows and backend data logic.",
      responsibilities: [
        "Worked on data preprocessing, feature selection, and model training using Scikit-Learn and Python.",
        "Assisted in developing billing and database management logic to ensure transaction consistency.",
        "Analyzed operational datasets and created exploratory visualizations using Pandas and Matplotlib.",
        "Participated in weekly technical reviews and documented data pipeline findings."
      ],
      skills: ["Python", "Scikit-Learn", "Pandas", "Data Wrangling", "Machine Learning"]
    },
    {
      role: "Web Development Team Member",
      company: "Goa Football Association (via Cybernetrix)",
      period: "Project Certification - July 2023",
      type: "Collegiate Project",
      location: "Panjim, Goa",
      description: "Collaborated with team members to construct the official GFA tournament and player web portal.",
      responsibilities: [
        "Assisted in database schema design, UI coding, and query optimization in MySQL.",
        "Tested fixture updates, tournament score tables, and team registration workflows.",
        "Awarded an official certificate of appreciation from the General Secretary of GFA."
      ],
      skills: ["PHP", "MySQL", "SQL Queries", "Web Development", "QA Testing"]
    },
    {
      role: "Marketing & Operations Trainee",
      company: "W Goa (Luxury Hotel & Resort)",
      period: "November 2023 - February 2024",
      type: "On-Job Training",
      location: "Vagator Beach, Goa",
      description: "Completed 77 days of immersive on-job training in operations, guest engagement, and marketing data support.",
      responsibilities: [
        "Helped track guest feedback trends and assisted with digital marketing operational coordination.",
        "Communicated with cross-functional teams to streamline daily reporting and documentation.",
        "Commended by HR & Training leadership for enthusiasm, punctuality, and keen learning."
      ],
      skills: ["Data Tracking", "Reporting", "Cross-Team Communication", "Problem Solving"]
    },
    {
      role: "Student Placement Co-ordinator",
      company: "DY Patil International University (MCA)",
      period: "2024 - Present",
      type: "Leadership",
      location: "Pune, India",
      description: "Elected student coordinator connecting MCA candidates with recruitment teams.",
      responsibilities: [
        "Coordinated with the university placement cell to organize campus recruitment drives and technical tests.",
        "Managed communication channels to keep students informed of job openings and preparation tips.",
        "Helped conduct mock coding and technical interview sessions for classmates."
      ],
      skills: ["Leadership", "Coordination", "Communication", "Organization"]
    },
    {
      role: "Class Representative",
      company: "St Xaviers College Mapusa (BCA)",
      period: "2020 - 2023",
      type: "Leadership",
      location: "Goa, India",
      description: "Elected class representative representing the student body across 3 years of BCA.",
      responsibilities: [
        "Communicated student suggestions to department professors and college administration.",
        "Organized departmental coding workshops, technical fests, and peer study groups."
      ],
      skills: ["Teamwork", "Public Speaking", "Problem Resolution", "Event Organization"]
    }
  ],

  education: [
    {
      degree: "Master of Computer Applications (MCA)",
      specialization: "Artificial Intelligence & Data Science",
      institution: "DY Patil International University",
      location: "Pune, Maharashtra, India",
      period: "2024 - 2026",
      cgpa: "6.7 CGPA",
      status: "Final Year Postgraduate",
      highlights: [
        "Specialized coursework in Machine Learning, Deep Learning, Cloud Computing, and Database Systems",
        "Elected Student Placement Co-ordinator for MCA cohort",
        "Engaged in research-inspired predictive ML and data engineering projects"
      ]
    },
    {
      degree: "Bachelor of Computer Applications (BCA)",
      specialization: "Computer Applications & Software Foundations",
      institution: "St Xaviers College Mapusa",
      location: "Mapusa, Goa, India",
      period: "2020 - 2023",
      cgpa: "5.7 CGPA",
      status: "Graduated",
      highlights: [
        "Strong foundation in C/C++, Data Structures, Relational Database Management (RDBMS), and Web Technologies",
        "Served as Class Representative throughout the degree program",
        "Built team projects including the official GFA website portal with Cybernetrix Group"
      ]
    }
  ],

  certifications: [
    {
      id: "aws-ccp",
      title: "AWS Certified Cloud Practitioner",
      issuer: "Amazon Web Services (AWS)",
      year: "2026",
      badgeIcon: "fa-brands fa-aws",
      category: "Cloud Computing",
      credentialUrl: "https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u",
      verified: true,
      description: "Validates fundamental understanding of AWS Cloud infrastructure, security, core services (EC2, S3, CloudWatch, Lambda), and billing principles."
    },
    {
      id: "openai-gpt3",
      title: "OpenAI GPT-3 for Developers",
      issuer: "OpenAI Developer Academy",
      year: "2024",
      badgeIcon: "fa-solid fa-robot",
      category: "Generative AI",
      credentialUrl: "https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u",
      verified: true,
      description: "Covers prompt engineering, semantic text embeddings, fine-tuning concepts, and integrating LLMs into software applications via APIs."
    },
    {
      id: "infosys-nlp",
      title: "Natural Language Processing using Python",
      issuer: "Infosys Springboard",
      year: "2024",
      badgeIcon: "fa-solid fa-code",
      category: "Data Science & NLP",
      credentialUrl: "https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u",
      verified: true,
      description: "Comprehensive training in text tokenization, vector space models, TF-IDF, sentiment analysis, and transformer sequence processing."
    },
    {
      id: "infosys-ds",
      title: "Data Science Specialization",
      issuer: "Infosys Springboard",
      year: "2024",
      badgeIcon: "fa-solid fa-chart-pie",
      category: "Data Analytics",
      credentialUrl: "https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u",
      verified: true,
      description: "Foundational training in statistical analysis, exploratory data analysis (EDA), Pandas data cleaning, and core ML algorithms."
    },
    {
      id: "gfa-cert",
      title: "Official Commendation Certificate - Web Development",
      issuer: "Goa Football Association (GFA)",
      year: "2023",
      badgeIcon: "fa-solid fa-award",
      category: "Project Certificate",
      credentialUrl: "https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u",
      verified: true,
      description: "Granted by the General Secretary of GFA to certify valuable contribution in developing the official GFA website portal and database."
    },
    {
      id: "w-goa-cert",
      title: "On-Job Training Certificate - Digital Operations",
      issuer: "W Goa (Luxury Hotel)",
      year: "2024",
      badgeIcon: "fa-solid fa-building",
      category: "Training Certificate",
      credentialUrl: "https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u",
      verified: true,
      description: "Certified completion of 77-day on-job training in operations, marketing engagement support, and collaborative team communication."
    }
  ],

  articles: [
    {
      id: "semantic-search-faiss",
      title: "Semantic Vector Search: How FAISS and Embeddings Transform Text Retrieval",
      date: "August 2025",
      readTime: "4 min read",
      tags: ["Python", "FAISS", "Embeddings", "NLP"],
      summary: "Exploring how dense embeddings and vector similarity indexing solve search problems where keyword matching falls short.",
      content: `<h3>Beyond Keyword Matching</h3>
<p>Traditional keyword searches struggle when user queries don't match the exact words in the text. In building <strong>QueryTube</strong>, I explored dense vector embeddings to capture the semantic meaning behind user questions.</p>

<h3>How FAISS Accelerates Search</h3>
<p>FAISS allows fast nearest-neighbor lookups over high-dimensional vector spaces. By segmenting long video transcripts into overlapping chunks and calculating cosine similarity, we can retrieve the most relevant moments in milliseconds.</p>

<h4>Key Practical Takeaways:</h4>
<ul>
  <li>Chunking text with small overlaps avoids cutting off important context between sentences.</li>
  <li>Normalized vector embeddings ensure reliable cosine distance comparisons.</li>
  <li>Pairing vector search with local language models allows for concise, grounded summaries.</li>
</ul>`
    },
    {
      id: "aws-serverless-observability",
      title: "Getting Started with Cloud Monitoring on AWS: CloudWatch & Lambda",
      date: "July 2025",
      readTime: "4 min read",
      tags: ["AWS", "CloudWatch", "Lambda", "Python"],
      summary: "A practical guide to setting up automated log alerts and serverless triggers for application health tracking.",
      content: `<h3>Why Proactive Monitoring Matters</h3>
<p>Tracking system errors manually is time-consuming. Setting up automated cloud monitoring helps identify application issues before users are affected.</p>

<h3>Core Steps in My Pipeline:</h3>
<ol>
  <li><strong>Log Collection:</strong> Stream application logs into AWS CloudWatch Log Groups.</li>
  <li><strong>Metric Filters:</strong> Define pattern filters for critical error keywords and HTTP 5xx codes.</li>
  <li><strong>Alarm & Notification:</strong> Configure CloudWatch Alarms to trigger Amazon SNS notifications.</li>
  <li><strong>Automated Action:</strong> Connect SNS to AWS Lambda to run recovery scripts automatically.</li>
</ol>`
    },
    {
      id: "spatio-temporal-ml",
      title: "Predictive Modeling with Environmental Sensor Telemetry",
      date: "May 2025",
      readTime: "5 min read",
      tags: ["Data Analytics", "Machine Learning", "Python", "Kalman Filter"],
      summary: "Approaches to cleaning noisy IoT time-series data and training ensemble regression models for environmental forecasting.",
      content: `<h3>Dealing with Sensor Noise</h3>
<p>IoT sensors often record sudden spikes or missing values due to network drops and calibration drift. Directly training machine learning models on noisy data leads to inaccurate predictions.</p>

<h3>Our Approach:</h3>
<ul>
  <li><strong>Kalman Filtering:</strong> Used to estimate true underlying values by smoothing out random sensor fluctuations.</li>
  <li><strong>Trend Extraction:</strong> Isolated seasonal trends in water pollutant levels using time-series analysis.</li>
  <li><strong>Ensemble Models:</strong> Trained XGBoost and Random Forest regressors, capturing non-linear relationships across monitoring stations.</li>
</ul>`
    }
  ],

  testimonials: [
    {
      quote: "Vaibhav demonstrated exceptional skills and commitment throughout the website development process for the Goa Football Association, playing key roles in design, coding, database management, and quality assurance.",
      author: "Lector Mascarenhas",
      designation: "General Secretary, Goa Football Association",
      avatar: "LM",
      highlight: "Official Commendation"
    },
    {
      quote: "Vaibhav has been a great support and has exhibited a keenness to learn throughout his training. He brings outstanding discipline, rapid problem-solving, and proactive team collaboration.",
      author: "Trisha D'Eduljee",
      designation: "Human Resources & Training Manager, W Goa",
      avatar: "TD",
      highlight: "On-Job Training Commendation"
    },
    {
      quote: "As Student Placement Coordinator, Vaibhav demonstrated exceptional dedication and organizational clarity, helping coordinate recruitment drives smoothly and supporting fellow students.",
      author: "Placement Cell & Faculty",
      designation: "DY Patil International University, Pune",
      avatar: "DP",
      highlight: "Placement Leadership"
    }
  ],

  aiTwin: {
    name: "Vaibhav's Digital Assistant",
    version: "2.6.0",
    modes: {
      crisp: {
        id: "crisp",
        label: "Direct",
        subtitle: "Quick, factual highlights",
        tone: "Direct bullet points with facts, skills, and background."
      },
      clear: {
        id: "clear",
        label: "Detailed",
        subtitle: "Balanced & structured",
        tone: "Clear, conversational explanation of projects, skills, and goals."
      },
      chatty: {
        id: "chatty",
        label: "Friendly",
        subtitle: "Warm & conversational",
        tone: "Approachable and friendly overview of who Vaibhav is and what he loves doing."
      }
    },
    suggestedPrompts: [
      "Tell me about Vaibhav's background and education.",
      "What are his core skills in AI/ML & Data Analysis?",
      "Can you explain the QueryTube project?",
      "Walk me through all his projects.",
      "Why should we hire him?",
      "How can I download his CV or view his certificates?"
    ],
    greeting: "Hi there! 👋 I'm Vaibhav's digital assistant. Feel free to ask me anything about his projects, skills in AI/ML & Data Analysis, education, experience, certifications, or how to get in touch with him.",
    smallTalk: {
      greeting: {
        triggers: ["hi", "hello", "hey", "yo", "sup", "good morning", "good evening", "good afternoon", "namaste"],
        responses: {
          crisp: "Hey! 👋 Ask me about Vaibhav's **projects**, **skills**, **experience**, or **contact info** — happy to help.",
          clear: "Hello! 👋 I'm Vaibhav's AI Twin. I can walk you through his projects, technical skills, education, certifications, or how to get in touch. What would you like to know?",
          chatty: "Heyyy! 👋 Great to see you here! Want the scoop on Vaibhav's coolest projects, his skills, or maybe how to reach him? Just ask away! 😄"
        }
      },
      thanks: {
        triggers: ["thank you", "thanks", "thx", "appreciate it", "cheers"],
        responses: {
          crisp: "Anytime. Let me know if you need anything else on Vaibhav's profile.",
          clear: "You're very welcome! Feel free to ask anything else about Vaibhav's work or reach out to him directly at vaibhavhaldankar999@gmail.com.",
          chatty: "You're so welcome! 😊 Ping me anytime, or drop Vaibhav a line directly — he loves talking shop!"
        }
      },
      farewell: {
        triggers: ["bye", "goodbye", "see you", "see ya", "later", "cya"],
        responses: {
          crisp: "Goodbye. Reach Vaibhav at vaibhavhaldankar999@gmail.com anytime.",
          clear: "Thanks for stopping by! Don't hesitate to reach out to Vaibhav directly if you'd like to connect further. Have a great day!",
          chatty: "Byee! 👋 Thanks for chatting — hope to see you (or Vaibhav's inbox) again soon! ✨"
        }
      },
      identity: {
        triggers: ["are you real", "are you human", "are you ai", "are you chatgpt", "are you gpt", "who are you", "what are you", "are you a bot"],
        responses: {
          crisp: "I'm a scripted AI Twin built into this portfolio — a rule-based assistant trained on Vaibhav's real resume data, not a general chatbot.",
          clear: "I'm Vaibhav's AI Twin — a lightweight, purpose-built assistant embedded directly in this portfolio. I run entirely in your browser using a curated knowledge base about Vaibhav's real projects, skills, and experience, so I can answer accurately without needing a live server.",
          chatty: "Good question! 🤖 I'm not ChatGPT — I'm a custom-built digital twin that lives right here on Vaibhav's site, loaded with everything about his real work. Think of me as his portfolio's friendly front desk!"
        }
      },
      howAreYou: {
        triggers: ["how are you", "how's it going", "how are things"],
        responses: {
          crisp: "Running smoothly. Ask me about Vaibhav's projects or skills.",
          clear: "I'm doing great, thanks for asking! Ready to tell you all about Vaibhav's work — what would you like to explore?",
          chatty: "I'm doing fantastic, thanks for checking in! 😄 Ready whenever you are to dive into Vaibhav's projects or skills!"
        }
      }
    },
    knowledgeBase: [
      {
        triggers: ["background", "who is", "about", "education", "mca", "bca", "college", "fresher"],
        responses: {
          crisp: "• **Education**: MCA in AI & Data Science (DY Patil University Pune, 2024-2026, 6.7 CGPA) | BCA (St Xaviers Goa, 2020-2023, 5.7 CGPA).\n• **Focus**: Machine Learning, Data Analytics, Python, SQL, and Cloud Foundations.\n• **Leadership**: Student Placement Coordinator (MCA) & Class Representative (BCA).\n• **Availability**: Actively seeking entry-level AI/ML & Data Analyst roles (Immediate Joiner).",
          clear: "Vaibhav is a final-year MCA student specializing in Artificial Intelligence & Data Science at DY Patil International University, Pune. He holds a Bachelor of Computer Applications (BCA) from St Xaviers College Mapusa, Goa.\n\nHe has a strong foundation in Python, SQL, exploratory data analysis, and machine learning algorithms. Throughout college, he actively took on leadership responsibilities as Student Placement Coordinator and Class Representative, developing strong communication and teamwork skills alongside his technical work.",
          chatty: "Vaibhav is a passionate fresher completing his MCA in AI & Data Science in Pune! 🎓\n\nHe loves working with data—whether it's cleaning and analyzing datasets with Python and Pandas, building predictive models, or working on full-stack web applications. He's also super proactive and served as Class Representative during BCA and Placement Coordinator during MCA. He's excited to start his career in AI/ML and Data Analytics!"
        }
      },
      {
        triggers: ["skills", "tech stack", "technologies", "python", "sql", "tools", "data analyst", "aiml"],
        responses: {
          crisp: "• **Languages**: Python (Pandas, NumPy, Matplotlib, Scikit-Learn, PyTorch), SQL (MySQL, PostgreSQL), JavaScript, HTML/CSS.\n• **Data Analytics & ML**: Exploratory Data Analysis (EDA), Predictive Regression/Classification, FAISS Vector Search, OpenCV, NLP.\n• **Cloud & Tools**: AWS (EC2, S3, CloudWatch, Lambda), Git/GitHub, Linux, Streamlit, VS Code, Jupyter Notebooks.",
          clear: "Vaibhav's core technical toolkit includes:\n\n1. **Data Analytics & Machine Learning**: Python, Pandas, NumPy, Matplotlib, Seaborn, Scikit-Learn, XGBoost, PyTorch, FAISS vector search, and NLP basics.\n2. **Databases & Querying**: SQL (joins, subqueries, aggregations), MySQL, PostgreSQL, SQLite, and MongoDB.\n3. **Cloud & Development Tools**: AWS (Certified Cloud Practitioner), Git/GitHub, Linux CLI, Streamlit for data dashboards, and Jupyter Notebooks.",
          chatty: "Vaibhav's favorite language is **Python**, which he uses for data wrangling with Pandas, building ML models with Scikit-Learn, and creating data apps with Streamlit! 🐍📊\n\nHe's also solid with SQL queries, relational databases, and AWS cloud basics. He loves turning messy datasets into clean, visual insights."
        }
      },
      {
        triggers: ["querytube", "video search", "transcript", "faiss", "semantic search"],
        responses: {
          crisp: "**QueryTube Project:**\n• **Concept**: Semantic search & summarizer for YouTube video transcripts.\n• **Stack**: Python, FAISS vector indexing, dense embeddings, Ollama LLM, Streamlit.\n• **Result**: Fast sub-second search and timestamped summaries for video content.",
          clear: "**QueryTube** is an NLP-powered semantic video search tool created by Vaibhav. Instead of relying on exact keyword matching, it converts video transcripts into dense vector embeddings and indexes them using FAISS. Users can ask questions in natural language to find exact timestamps and get automated summaries.",
          chatty: "QueryTube is a really cool project Vaibhav built! 🎥✨ It makes searching long YouTube transcripts super easy by using vector embeddings and FAISS similarity search. You can ask natural questions and get the exact timestamp and a concise summary!"
        }
      },
      {
        triggers: ["water quality", "research", "kalman", "urban water", "xgboost"],
        responses: {
          crisp: "**Urban Water Quality Prediction:**\n• **Goal**: Spatio-temporal pollutant prediction using sensor streams (inspired by IEEE research).\n• **Stack**: Python, Kalman Filtering, ARMA time-series, XGBoost, Random Forest, Matplotlib.\n• **Result**: Denoised noisy IoT telemetry and achieved strong predictive accuracy (94% R²).",
          clear: "In this project, Vaibhav worked on forecasting urban water quality metrics from IoT sensor data. Because raw sensor feeds have noise and missing values, he applied **Kalman Filtering** for smoothing and **ARMA** for time-series trends before training **XGBoost and Random Forest** regression models.",
          chatty: "This is a research-inspired project Vaibhav worked on! 💧🔬 He tackled real-world sensor noise by implementing Kalman Filters and combined time-series methods with XGBoost to accurately forecast water pollutant indices across urban monitoring nodes."
        }
      },
      {
        triggers: ["aws", "cloud", "observability", "lambda", "cloudwatch", "sns"],
        responses: {
          crisp: "• **Credential**: AWS Certified Cloud Practitioner (2026).\n• **Observability Project**: Configured CloudWatch alarms for error detection, Amazon SNS for alerts, and serverless Python Lambda triggers for automated remediation.\n• **Hands-on**: EC2, S3, IAM, CloudWatch, and Streamlit telemetry dashboard.",
          clear: "Vaibhav is an **AWS Certified Cloud Practitioner (2026)** with practical experience building cloud monitoring pipelines. He set up an event pipeline where application logs in CloudWatch trigger automated SNS alerts and invoke serverless Lambda scripts to handle remediation.",
          chatty: "Vaibhav is an **AWS Certified Cloud Practitioner**! ☁️ He built a cloud observability pipeline with CloudWatch, SNS, and Lambda that monitors logs and sends instant notifications when error thresholds are crossed."
        }
      },
      {
        triggers: ["resume", "cv", "download", "link", "drive"],
        responses: {
          crisp: "📄 **Download Resume**: [Google Drive Resume Link](https://drive.google.com/file/d/1yiuKrMVoF2x1alWFS7DphZCEtGoZ2DOV/view?usp=drive_link)\n📜 **View Certificates**: [Google Drive Certificates Folder](https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u)",
          clear: "You can access Vaibhav's resume and certificates directly:\n\n📄 **[Download Official CV (Google Drive)](https://drive.google.com/file/d/1yiuKrMVoF2x1alWFS7DphZCEtGoZ2DOV/view?usp=drive_link)**\n📜 **[View Certificates Folder (Google Drive)](https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u)**",
          chatty: "You can check out Vaibhav's full CV right here: 📄 [Download Resume on Google Drive](https://drive.google.com/file/d/1yiuKrMVoF2x1alWFS7DphZCEtGoZ2DOV/view?usp=drive_link)!\n\nAnd you can browse his official certificates here: 📜 [Certificates Google Drive Folder](https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u)!"
        }
      },
      {
        triggers: ["contact", "email", "phone", "reach", "linkedin", "github"],
        responses: {
          crisp: "• **Email**: [vaibhavhaldankar999@gmail.com](mailto:vaibhavhaldankar999@gmail.com)\n• **Phone**: [+91 81779 23800](tel:+918177923800)\n• **LinkedIn**: [linkedin.com/in/vaibhav-haldankar/](https://www.linkedin.com/in/vaibhav-haldankar/)\n• **GitHub**: [github.com/NIGHTFURY-999](https://github.com/NIGHTFURY-999)",
          clear: "You can reach out to Vaibhav through:\n\n• 📧 **Email**: [vaibhavhaldankar999@gmail.com](mailto:vaibhavhaldankar999@gmail.com)\n• 📱 **Phone**: [+91 81779 23800](tel:+918177923800)\n• 💼 **LinkedIn**: [linkedin.com/in/vaibhav-haldankar/](https://www.linkedin.com/in/vaibhav-haldankar/)\n• 🐙 **GitHub**: [github.com/NIGHTFURY-999](https://github.com/NIGHTFURY-999)",
          chatty: "Vaibhav would be delighted to chat with you! 📬\n\nFeel free to email him at **vaibhavhaldankar999@gmail.com** or call **+91 81779 23800**. You can also connect on [LinkedIn](https://www.linkedin.com/in/vaibhav-haldankar/) or check out his repositories on [GitHub](https://github.com/NIGHTFURY-999)!"
        }
      },
      {
        triggers: ["agri ai", "agriculture", "crop", "leaf disease", "farmer", "marketplace"],
        responses: {
          crisp: "**Agri AI Project:**\n• **Concept**: Full-stack smart agriculture app — crop leaf disease detection + weather insights + farmer marketplace.\n• **Stack**: MERN (MongoDB, Express, React, Node.js) + Python/OpenCV for image classification.\n• **Result**: Bridged ML with an accessible web interface for farmers.",
          clear: "**Agri AI** is a full-stack application Vaibhav built for smart agriculture. Farmers can upload crop leaf photos for automated disease detection (using an OpenCV-based image classification pipeline), check local weather forecasts, and list produce in a digital marketplace — all through a responsive MERN stack interface.",
          chatty: "Agri AI is such a fun one! 🌱 Farmers snap a photo of a crop leaf and the app tells them what disease it might have, using computer vision. It also has weather updates and a mini marketplace — built end-to-end on the MERN stack with a Python ML backend!"
        }
      },
      {
        triggers: ["gfa", "goa football", "football association", "cybernetrix"],
        responses: {
          crisp: "**Goa Football Association Portal:**\n• **Role**: Core web developer in Cybernetrix Group.\n• **Stack**: PHP, MySQL, JavaScript, HTML5/CSS3, Bootstrap.\n• **Recognition**: Official commendation certificate from the GFA General Secretary.",
          clear: "Vaibhav was a core developer on the official **Goa Football Association** web portal, built with a team from Cybernetrix Group. He contributed to MySQL database design, tournament fixture and player registration features, and end-to-end QA testing. The GFA General Secretary awarded him an official certificate of appreciation for the work.",
          chatty: "This one's a personal favorite! ⚽ Vaibhav helped build the official Goa Football Association website with his team — handling the database, player registrations, and match fixtures. He even got an official thank-you certificate from the GFA General Secretary!"
        }
      },
      {
        triggers: ["hotel billing", "pos system", "invoicing", "billing system", "point of sale"],
        responses: {
          crisp: "**POS Hotel Billing System:**\n• **Purpose**: Manage dining orders, generate tax invoices, track daily sales.\n• **Stack**: Python, PHP, MySQL, JavaScript, Bootstrap.\n• **Impact**: Reduced billing errors and simplified revenue reconciliation.",
          clear: "Vaibhav built a **POS Hotel Billing & Invoicing System** to streamline restaurant order processing, table management, and itemized billing with automated tax calculations and daily sales summaries — using Python, PHP, MySQL and Bootstrap.",
          chatty: "He also built a restaurant billing system! 🧾 It handles orders, calculates taxes automatically, and gives cashiers a clean daily summary — no more manual billing headaches."
        }
      },
      {
        triggers: ["all projects", "list of projects", "your projects", "his projects", "portfolio of work", "showcase"],
        responses: {
          crisp: "**Project Lineup:**\n1. Urban Water Quality Prediction (Kalman Filter + XGBoost)\n2. QueryTube — Semantic Video Search (FAISS + LLM)\n3. Agri AI — Smart Agriculture (MERN + OpenCV)\n4. AWS Cloud Observability Pipeline\n5. Goa Football Association Portal\n6. POS Hotel Billing System\n\nAsk me about any one by name for details!",
          clear: "Vaibhav has worked on six hands-on projects spanning ML research, NLP, cloud engineering, and full-stack development:\n\n1. **Urban Water Quality Prediction** — spatio-temporal ML with Kalman Filters & XGBoost.\n2. **QueryTube** — semantic video search using FAISS & LLMs.\n3. **Agri AI** — crop disease detection + farmer marketplace (MERN + OpenCV).\n4. **AWS Cloud Observability Pipeline** — CloudWatch, SNS, Lambda automation.\n5. **Goa Football Association Portal** — MySQL/PHP team project.\n6. **POS Hotel Billing System** — restaurant billing & invoicing app.\n\nAsk about any one specifically and I'll go deeper!",
          chatty: "Ooh, he's kept busy! 🚀 There's an ML water-quality predictor, QueryTube (his semantic video search tool), Agri AI for farmers, an AWS monitoring pipeline, the Goa Football Association website, and a hotel billing system. Which one sounds interesting? I can go deep on any of them!"
        }
      },
      {
        triggers: ["internship", "codtech", "ml intern", "work experience", "experience", "professional experience"],
        responses: {
          crisp: "**ML Internship @ Codtech IT Solutions** (Jun–Aug 2025):\n• Data preprocessing, feature selection, model training (Scikit-Learn).\n• Built billing/database logic for transaction consistency.\n• EDA & visualization with Pandas/Matplotlib.",
          clear: "Vaibhav completed a **Machine Learning Internship at Codtech IT Solutions Pvt. Ltd.** (June–August 2025), where he worked on data preprocessing, feature selection, and model training using Scikit-Learn and Python. He also assisted with billing/database management logic and presented exploratory data analysis in weekly technical reviews.\n\nHe also has hands-on experience from a GFA web development project, an on-job training stint at W Goa, and two leadership roles (Placement Coordinator, Class Representative). Ask me about any of those specifically!",
          chatty: "He did an ML internship at Codtech IT Solutions over summer 2025! 💻 Worked on real data preprocessing, trained models with Scikit-Learn, and even helped with some billing logic. He's also picked up leadership and hospitality experience along the way — want details on any of those?"
        }
      },
      {
        triggers: ["w goa", "hotel training", "hospitality", "on job training", "marketing trainee"],
        responses: {
          crisp: "**Marketing & Operations Trainee @ W Goa** (Nov 2023 – Feb 2024): 77-day on-job training in operations, guest engagement & marketing data support. Commended by HR leadership.",
          clear: "Vaibhav completed a 77-day **on-job training program at W Goa**, a luxury hotel & resort, as a Marketing & Operations Trainee. He tracked guest feedback trends, supported digital marketing coordination, and worked cross-functionally on daily reporting — earning commendation from HR & Training leadership for his enthusiasm and reliability.",
          chatty: "Fun fact — Vaibhav spent 77 days training at W Goa, a luxury resort! 🏖️ He wasn't coding there, but picked up real-world skills in guest engagement, reporting, and teamwork — and got a shoutout from HR for his energy and punctuality."
        }
      },
      {
        triggers: ["certification", "certificate", "certified", "credential", "openai", "infosys", "springboard"],
        responses: {
          crisp: "**Certifications:**\n• AWS Certified Cloud Practitioner (2026)\n• OpenAI GPT-3 for Developers (2024)\n• NLP using Python — Infosys Springboard (2024)\n• Data Science Specialization — Infosys Springboard (2024)\n• GFA Web Development Commendation (2023)\n• W Goa On-Job Training Certificate (2024)\n\n📜 [View all certificates](https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u)",
          clear: "Vaibhav holds six certifications spanning cloud, AI, and professional training:\n\n• **AWS Certified Cloud Practitioner** (2026)\n• **OpenAI GPT-3 for Developers** — prompt engineering & LLM integration (2024)\n• **NLP using Python** — Infosys Springboard (2024)\n• **Data Science Specialization** — Infosys Springboard (2024)\n• **GFA Official Commendation** for web development (2023)\n• **W Goa On-Job Training Certificate** (2024)\n\nYou can [view all certificates here](https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u).",
          chatty: "He's collected a nice stack of credentials! 🏆 AWS Cloud Practitioner, an OpenAI GPT-3 developer course, two Infosys Springboard certs in NLP & Data Science, plus recognition from GFA and W Goa. Want the [full certificate folder](https://drive.google.com/drive/folders/1fwAas4GDRBovPOvl4Cnzzb0g03IHPl4u)?"
        }
      },
      {
        triggers: ["leadership", "placement coordinator", "class representative", "soft skills", "teamwork", "communication skills"],
        responses: {
          crisp: "• **Student Placement Coordinator** — MCA, DY Patil University (2024–Present).\n• **Class Representative** — BCA, St Xaviers College (2020–2023).\n• Strong communication, coordination & cross-functional teamwork.",
          clear: "Beyond technical work, Vaibhav has held two elected leadership roles: **Student Placement Coordinator** for his MCA cohort at DY Patil International University (organizing recruitment drives and mock interviews), and **Class Representative** during his BCA at St Xaviers College (liaising with faculty and organizing coding workshops). Both roles sharpened his communication, coordination, and teamwork skills.",
          chatty: "He's not just about the code! 🙌 Vaibhav was elected Class Representative in his BCA and now serves as Placement Coordinator for his MCA batch — organizing recruitment drives, mock interviews, and workshops. Great communicator and team player!"
        }
      },
      {
        triggers: ["testimonial", "recommendation", "reference", "review", "feedback about him"],
        responses: {
          crisp: "Vaibhav has been commended by the GFA General Secretary, W Goa's HR & Training Manager, and his university's Placement Cell & Faculty for dedication, discipline, and proactive collaboration.",
          clear: "Vaibhav has earned positive feedback across his experiences: the **GFA General Secretary** praised his role in the football association's website; **W Goa's HR & Training Manager** commended his discipline and problem-solving during training; and his **university's Placement Cell & Faculty** recognized his organizational clarity as Placement Coordinator.",
          chatty: "People love working with him! 🌟 He's been praised by the Goa Football Association's General Secretary, W Goa's HR team, and his university faculty — all pointing to his reliability, communication, and can-do attitude."
        }
      },
      {
        triggers: ["article", "blog", "write up", "writing", "published"],
        responses: {
          crisp: "**Technical Writing:**\n• Semantic Vector Search with FAISS & Embeddings\n• Getting Started with AWS CloudWatch & Lambda Monitoring\n• Predictive Modeling with Environmental Sensor Telemetry\n\n(See the Articles section on this site.)",
          clear: "Vaibhav has written a few short technical articles distilling lessons from his projects — covering **semantic vector search with FAISS**, **AWS cloud monitoring with CloudWatch & Lambda**, and **predictive modeling on noisy sensor telemetry**. You can read them directly on this portfolio.",
          chatty: "Yes! He's written a few bite-sized technical articles — on vector search, AWS monitoring, and sensor data modeling. Worth a peek if you like behind-the-scenes engineering notes! 📝"
        }
      },
      {
        triggers: ["why hire", "why should we hire", "strengths", "why you", "unique", "stand out", "value proposition"],
        responses: {
          crisp: "• Full-lifecycle AI/ML delivery: data → model → deployment.\n• AWS-certified cloud fundamentals with real automation experience.\n• Proven leadership & communication (Placement Coordinator, Class Rep).\n• Fast learner, immediate joiner, adaptable across ML, cloud & full-stack.",
          clear: "Vaibhav combines three things recruiters look for in a strong fresher: **hands-on ML/AI project depth** (not just coursework — real research-inspired models and NLP systems), **cloud fluency** backed by an AWS certification and a working observability pipeline, and **proven soft skills** from two elected leadership roles. He's also an immediate joiner who adapts quickly across data science, cloud, and full-stack work.",
          chatty: "Great question! 🙌 He's not just theory — he's shipped real ML projects, holds an AWS cert, and has genuine leadership chops from being Placement Coordinator and Class Rep. Plus he's ready to join immediately and picks up new stacks fast. A well-rounded, dependable fresher!"
        }
      },
      {
        triggers: ["hobbies", "interest", "fun fact", "free time", "personality", "outside work"],
        responses: {
          crisp: "Outside of engineering: enjoys exploring new ML research papers, competitive coding on LeetCode, and stayed active in campus leadership & sports culture (GFA project ties in his Goa roots).",
          clear: "Outside of core engineering work, Vaibhav enjoys reading up on new ML research, practicing problem-solving on LeetCode, and staying engaged with community/leadership activities. His Goa roots also connect to his football association project — a nice blend of technical and community interests.",
          chatty: "He's a curious mind! 🤓 Loves digging into new ML papers, sharpening his DSA skills on LeetCode, and staying active in his college community. His Goa background even led to a fun project building the local football association's website!"
        }
      },
      {
        triggers: ["leetcode", "dsa", "competitive programming", "coding practice", "data structures"],
        responses: {
          crisp: "Vaibhav practices Data Structures & Algorithms on [LeetCode](https://leetcode.com/u/Vaibhav-Haldankar/) to keep his problem-solving sharp alongside his ML/data work.",
          clear: "Alongside his ML and data projects, Vaibhav practices Data Structures & Algorithms on [LeetCode](https://leetcode.com/u/Vaibhav-Haldankar/) to stay sharp for technical interviews and general problem-solving.",
          chatty: "He keeps his coding chops sharp with regular DSA practice on [LeetCode](https://leetcode.com/u/Vaibhav-Haldankar/)! Good habit for any aspiring engineer. 💪"
        }
      },
      {
        triggers: ["salary", "compensation", "rate", "package", "ctc"],
        responses: {
          crisp: "Compensation is open to discussion based on role scope and location (Pune/Goa/Bangalore/Remote). Reach out directly: [vaibhavhaldankar999@gmail.com](mailto:vaibhavhaldankar999@gmail.com).",
          clear: "Vaibhav is flexible and competitive regarding compensation, prioritizing high-impact engineering environments and growth opportunities. Feel free to reach out directly at **vaibhavhaldankar999@gmail.com** or call **+91 81779 23800** to discuss package structure.",
          chatty: "He's pretty flexible here and more focused on finding the right growth opportunity! 💼 Best to chat directly — email **vaibhavhaldankar999@gmail.com** or call **+91 81779 23800**."
        }
      },
      {
        triggers: ["location", "relocate", "remote", "based in", "where is he", "based"],
        responses: {
          crisp: "Based in **Pune / Goa, India**. Open to Remote, Hybrid, or On-site roles across India and global remote teams.",
          clear: "Vaibhav is based in **Pune / Goa, India** and is open to **Remote, Hybrid, or On-site** engineering roles across India and global remote teams.",
          chatty: "He's based between **Pune and Goa, India**, but totally open to remote, hybrid, or on-site roles — wherever the right opportunity is! 🌍"
        }
      },
      {
        triggers: ["notice period", "joining date", "start date", "when can you join", "available", "availability"],
        responses: {
          crisp: "Available for **Immediate Joining** (zero notice period) for full-time roles, research fellowships, or AI/ML internships.",
          clear: "Vaibhav is available for **Immediate Joining** with a zero notice period, whether for full-time AI/ML & Data Analyst roles, research fellowships, or intensive internships.",
          chatty: "Great news — he can start right away! ⚡ Zero notice period, ready to jump into a full-time role, internship, or research opportunity whenever you are."
        }
      }
    ]
  }
};

if (typeof window !== "undefined") {
  window.PORTFOLIO_DATA = PORTFOLIO_DATA;
}

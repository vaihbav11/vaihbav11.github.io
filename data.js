/* ============================================================
   YOUR CONTENT — EDIT EVERYTHING HERE
   ------------------------------------------------------------
   This is the ONLY file you need to touch to update your site.
   Change the text between the quotes. Keep the quotes, commas,
   and curly braces exactly where they are.

   To add a project/job/skill: copy a whole { ... } block,
   paste it below, add a comma between blocks, then edit it.
   ============================================================ */

const DATA = {

  /* ---------- 1. BASICS ---------- */
  name: "Vaibhav Chaturvedi",
  initials: "VC",
  location: "Bhilai, Chhattisgarh, India",
  email: "vaihbavv11@gmail.com",
  phone: "+91 76938 41707",

  links: {
    github:   "https://github.com/vaihbav11",
    linkedin: "https://www.linkedin.com/in/vaibhavchaturvedi11",
    leetcode: "https://leetcode.com/vaihbav",
    resume:   "vaibhav_chaturvedi_cv.pdf"
  },

  /* ---------- 2. HERO SECTION ---------- */
  roles: [
    "AI/ML Engineer",
    "NLP Enthusiast",
    "Deep Learning Learner",
    "Python Developer"
  ],

  tagline: "Transforming complex data into deployable AI solutions. Specializing in ML pipelines, deep NLP, and robust API architecture.",

  stats: [
    { value: "10+", label: "AI & ML Systems Built" },
    { value: "4",   label: "Internships" },
    { value: "40%", label: "Manual Triage Reduction" }
  ],

  /* ---------- 3. SKILLS MARQUEE ---------- */
  marquee: [
    "Python", "TensorFlow", "Keras", "HuggingFace", "BERT", "DistilBERT",
    "Whisper", "scikit-learn", "FastAPI", "Streamlit", "Flask", "LangChain",
    "Claude API", "Docker", "Pandas", "NumPy", "SQL", "Power BI",
    "Git & GitHub", "REST APIs", "C++", "Tableau", "Flutter", "Android Studio", "Arduino"
  ],

  /* ---------- 4. PROJECTS (bento grid) ---------- */
  projects: [
    {
      size: "large",
      title: "Multi-Agent AI System",
      date: "Sept 2026",
      blurb: "A three-agent system — Email Assistant, Code Generator, and Research Agent — each calling the Claude API for its own task and exposed as REST endpoints through FastAPI. The Research Agent uses server-side web search, so the model decides how many searches to run and returns a synthesized answer with deduplicated, cited sources.",
      tags: ["Python", "Claude API", "FastAPI", "Agents"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    },
    {
      size: "small",
      title: "Live Voice Translation",
      date: "Apr 2026",
      blurb: "Real-time speech-to-speech translation across 10+ languages with under 3s latency, using Whisper ASR and Helsinki-NLP transformers. Deployed as a Streamlit app with live audio in and out.",
      tags: ["Whisper", "Helsinki-NLP", "gTTS", "Streamlit"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    },
    {
      size: "small",
      title: "Content Moderation API",
      date: "Mar 2026",
      blurb: "Fine-tuned DistilBERT on 15K labeled social posts to flag toxic content at 91% precision, then shipped it as a scalable REST API architected for throughput and low latency.",
      tags: ["DistilBERT", "HuggingFace", "REST API"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    },
    {
      size: "small",
      title: "Sentiment & Intent Pipeline",
      date: "Jan 2026",
      blurb: "BERT-based NLP pipeline classifying customer feedback by sentiment and intent across 8 categories at 91% accuracy — cutting manual ticket triage time by 40% through automated routing.",
      tags: ["BERT", "TF-IDF", "scikit-learn", "Pandas"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    },
    {
      size: "small",
      title: "Hate Speech Detection",
      date: "Jul 2025",
      blurb: "Full NLP pipeline with TF-IDF vectorization and multi-classifier benchmarking across SVM, Naive Bayes, and Logistic Regression — 92% accuracy, with confusion matrices and ROC curves.",
      tags: ["scikit-learn", "SVM", "Naive Bayes"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    },
    {
      size: "small",
      title: "Student Marks Prediction & Profiling",
      date: "Feb 2025",
      blurb: "Engineered a predictive scoring and student profile modeling system to forecast academic performance using regression algorithms.",
      tags: ["Python", "Pandas", "scikit-learn"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    },
    {
      size: "small",
      title: "Smart Irrigation System",
      date: "2024",
      blurb: "IoT-based smart irrigation project leveraging C++ and Arduino to orchestrate and process data gathered via integrated hardware sensors.",
      tags: ["C++", "Arduino", "IoT", "Hardware"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    },
    {
      size: "small",
      title: "Web Music Application",
      date: "2023",
      blurb: "A foundational web-based music streaming application featuring core playback controls. Built from scratch as a first programming project.",
      tags: ["Web Dev", "UI/UX", "Audio"],
      demo: "",
      code: "https://github.com/vaihbav11/"
    }
  ],

  /* ---------- 5. EXPERIENCE TIMELINE ---------- */
  experience: [
    {
      role: "Machine Learning Intern",
      org: "BharatCares",
      place: "Remote",
      date: "Aug 2026 – Present",
      current: true,
      points: [
        "Selected for a 6-week Applied AI & Machine Learning internship (AICTE-recognized, IBM SkillsBuild curriculum).",
        "Building and evaluating models across supervised, unsupervised, deep learning, and reinforcement learning paradigms."
      ]
    },
    {
      role: "Machine Learning Intern",
      org: "Unified Mentor",
      place: "Remote",
      date: "Sept 2025 – Nov 2025",
      current: false,
      points: [
        "Deployed a Fraud Detection classifier (Random Forest + SMOTE) hitting 94% precision on heavily imbalanced data.",
        "Maintained production-ready ETL pipelines for ingestion, cleaning, and feature engineering.",
        "Built a Lung Cancer Prediction ANN (89% validation accuracy) and a Vehicle Price regression pipeline that cut RMSE by 18%."
      ]
    },
    {
      role: "Machine Learning Intern",
      org: "Bharat Intern",
      place: "Remote",
      date: "May 2024 – Jun 2024",
      current: false,
      points: [
        "Developed and evaluated multiple predictive models, including a Wine Quality classifier, an Iris dataset model, and a House Price prediction regression pipeline.",
        "Gained hands-on experience in full-cycle model training, data preprocessing, and algorithm selection across diverse datasets."
      ]
    },
    {
      role: "Research Intern",
      org: "IIIT Naya Raipur",
      place: "Raipur, CG",
      date: "Mar 2024 – Jun 2024",
      current: false,
      points: [
        "Engineered a Diabetes Prediction model (scikit-learn, 85% accuracy) with a full preprocessing pipeline — feature selection, cleaning, and iterative hyperparameter tuning on a clinical dataset.",
        "Ran systematic algorithm benchmarking and applied statistical analysis to select optimal model configurations."
      ]
    }
  ],

  /* ---------- 6. ABOUT SECTION ---------- */
  about: [
    "I'm a CS Engineer specialising in AI, and most of what I do lives in the gap between a model that works in a notebook and a model that works for real people.",
    "That means fine-tuning transformers like BERT, DistilBERT, and Whisper, then actually shipping them — REST APIs with FastAPI, Streamlit apps with live audio, agentic systems built on the Claude API. I've consistently landed above 90% accuracy across projects, but the part I care about more is whether the thing stays fast and reliable once it's deployed.",
    "I've worked across four internships — BharatCares, Unified Mentor, Bharat Intern, and IIIT Naya Raipur — spanning applied research and production ML. Right now I'm looking for a remote AI/ML role where I can build systems that drive real business impact."
  ],

  photo: "profile.jpg",

  /* ---------- 7. SKILLS GRID ---------- */
  skillGroups: [
    {
      title: "AI, ML & NLP",
      items: ["Python", "scikit-learn", "TensorFlow", "Keras", "HuggingFace Transformers", "BERT", "DistilBERT", "Whisper", "ANN", "Text Classification", "NER", "Sentiment Analysis"]
    },
    {
      title: "Data & Analytics",
      items: ["Pandas", "NumPy", "Matplotlib", "Seaborn", "SQL", "Power BI", "Tableau", "Feature Engineering", "Hyperparameter Tuning"]
    },
    {
      title: "Dev & Tools",
      items: ["C++", "C", "Git & GitHub", "FastAPI", "Streamlit", "Flask", "REST APIs", "Docker", "LangChain", "Claude API", "Jupyter", "Google Colab", "DSA", "DBMS", "OOP"]
    }
  ],

  /* ---------- 8. EDUCATION & CERTIFICATIONS ---------- */
  education: [
    { degree: "B.Tech, CSE (Artificial Intelligence)", school: "CSVTU, UTD, Bhilai", date: "2021 – 2025" },
    { degree: "Class XII (CBSE)", school: "Delhi Public School, Champa", date: "2021" }
  ],

  certifications: [
    { name: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "2026" },
    { name: "C++ Intermediate", issuer: "Sololearn", date: "2026" },
    { name: "DSA with Python", issuer: "TestDude", date: "2026" },
    { name: "Machine Learning", issuer: "TestDude", date: "2026" },
    { name: "UI/UX", issuer: "TestDude", date: "2026" },
    { name: "Algorithmic Game Theory", issuer: "NPTEL", date: "2026" },
    { name: "Management Game Theory", issuer: "NPTEL", date: "2026" },
    { name: "High Performance Scientific Computing", issuer: "NPTEL", date: "2026" },
    { name: "AI for Investment", issuer: "NPTEL", date: "2026" }
  ],

  /* ---------- 9. CONTACT FOOTER ---------- */
  contactHeading: "Let's build something.",
  contactBlurb: "I'm open to remote AI/ML roles and interesting problems. Email is the fastest way to reach me."
};

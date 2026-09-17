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
  initials: "VC",                     // shown in the navbar logo
  location: "Bhilai, Chhattisgarh, India",
  email: "vaihbavv11@gmail.com",
  phone: "+91 76938 41707",

  // Replace # with your real profile URLs
  links: {
    github:   "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    leetcode: "https://leetcode.com/yourusername",
    resume:   "autoCV.pdf"            // put your PDF next to index.html
  },

  /* ---------- 2. HERO SECTION ---------- */
  // These cycle in the animated typing effect
  roles: [
    "AI/ML Engineer",
    "NLP Specialist",
    "Deep Learning Developer",
    "Python Backend Developer"
  ],

  tagline: "I build end-to-end ML and NLP systems — from fine-tuned transformers to deployed REST APIs that hold up in production.",

  // Small stat chips under the hero
  stats: [
    { value: "5+",  label: "ML projects shipped" },
    { value: "3",   label: "Internships" },
    { value: "90%+", label: "Model accuracy" }
  ],

  /* ---------- 3. SKILLS MARQUEE ---------- */
  // Scrolls infinitely across the screen. Add or remove freely.
  marquee: [
    "Python", "TensorFlow", "Keras", "HuggingFace", "BERT", "DistilBERT",
    "Whisper", "scikit-learn", "FastAPI", "Streamlit", "Flask", "LangChain",
    "Claude API", "Docker", "Pandas", "NumPy", "SQL", "Power BI",
    "Git & GitHub", "REST APIs", "C++", "Tableau"
  ],

  /* ---------- 4. PROJECTS (bento grid) ---------- */
  // size: "large" = wide feature card, "small" = normal card.
  // Put your 1–2 best projects as "large".
  projects: [
    {
      size: "large",
      title: "Multi-Agent AI System",
      date: "Sept 2026",
      blurb: "A three-agent system — Email Assistant, Code Generator, and Research Agent — each calling the Claude API for its own task and exposed as REST endpoints through FastAPI. The Research Agent uses server-side web search, so the model decides how many searches to run and returns a synthesized answer with deduplicated, cited sources.",
      tags: ["Python", "Claude API", "FastAPI", "Agents"],
      demo: "",                        // live link — leave "" to hide the button
      code: ""                         // repo link — leave "" to hide the button
    },
    {
      size: "small",
      title: "Live Voice Translation",
      date: "Apr 2026",
      blurb: "Real-time speech-to-speech translation across 10+ languages with under 3s latency, using Whisper ASR and Helsinki-NLP transformers. Deployed as a Streamlit app with live audio in and out.",
      tags: ["Whisper", "Helsinki-NLP", "gTTS", "Streamlit"],
      demo: "",
      code: ""
    },
    {
      size: "small",
      title: "Content Moderation API",
      date: "Mar 2026",
      blurb: "Fine-tuned DistilBERT on 15K labeled social posts to flag toxic content at 91% precision, then shipped it as a scalable REST API architected for throughput and low latency.",
      tags: ["DistilBERT", "HuggingFace", "REST API"],
      demo: "",
      code: ""
    },
    {
      size: "small",
      title: "Sentiment & Intent Pipeline",
      date: "Jan 2026",
      blurb: "BERT-based NLP pipeline classifying customer feedback by sentiment and intent across 8 categories at 91% accuracy — cutting manual ticket triage time by 40% through automated routing.",
      tags: ["BERT", "TF-IDF", "scikit-learn", "Pandas"],
      demo: "",
      code: ""
    },
    {
      size: "small",
      title: "Hate Speech Detection",
      date: "Jun 2025",
      blurb: "Full NLP pipeline with TF-IDF vectorization and multi-classifier benchmarking across SVM, Naive Bayes, and Logistic Regression — 92% accuracy, with confusion matrices and ROC curves.",
      tags: ["scikit-learn", "SVM", "Naive Bayes"],
      demo: "",
      code: ""
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
  // Each string becomes its own paragraph.
  about: [
    "I'm a CS Engineer specialising in AI, and most of what I do lives in the gap between a model that works in a notebook and a model that works for real people.",
    "That means fine-tuning transformers like BERT, DistilBERT, and Whisper, then actually shipping them — REST APIs with FastAPI, Streamlit apps with live audio, agentic systems built on the Claude API. I've consistently landed above 90% accuracy across projects, but the part I care about more is whether the thing stays fast and reliable once it's deployed.",
    "I've worked across three internships — BharatCares, Unified Mentor, and IIIT Naya Raipur — spanning applied research and production ML. Right now I'm looking for a remote AI/ML role where I can build systems that drive real business impact."
  ],

  // Put a photo named "profile.jpg" next to index.html and it will
  // appear automatically. Leave it missing and you'll see your initials.
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
    { name: "Artificial Intelligence Fundamentals", issuer: "IBM SkillsBuild", date: "2026" }
  ],

  /* ---------- 9. CONTACT FOOTER ---------- */
  contactHeading: "Let's build something.",
  contactBlurb: "I'm open to remote AI/ML roles and interesting problems. Email is the fastest way to reach me."
};

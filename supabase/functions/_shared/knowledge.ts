// Knowledge base chunks for Anjani's AI twin. Each chunk is embedded and
// upserted to Pinecone. Keep chunks focused (one topic each) for best retrieval.

export const KNOWLEDGE_CHUNKS: { id: string; text: string }[] = [
  {
    id: "identity",
    text: `Identity: Anjani Kumar Kanamarlapudi. Title: AI Developer & Data Scientist. Status: Final-year B.Tech student in Artificial Intelligence & Data Science. Location: India. Email: venkat.kanamarlapudi1906@gmail.com. Phone: +91-9381861326. GitHub: https://github.com/anjihan3601K. LinkedIn: https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9. Portfolio: https://anjani-portfolio-sand.vercel.app`,
  },
  {
    id: "summary",
    text: `Summary: I'm a final-year AI & Data Science student passionate about building AI-powered solutions that solve real-world problems. I work across machine learning, computer vision, predictive analytics, and full-stack AI applications.`,
  },
  {
    id: "skills-languages",
    text: `Programming languages I use: Python (primary), C, and SQL. I'm strongest in Python for ML/AI workflows.`,
  },
  {
    id: "skills-ml",
    text: `Machine Learning & AI skills: TensorFlow, Scikit-learn, Convolutional Neural Networks (CNNs), Gradient Boosting, Transfer Learning, model evaluation, and deployment.`,
  },
  {
    id: "skills-data",
    text: `Data Science toolkit: Pandas, NumPy, Matplotlib, Seaborn, statistical modeling, feature engineering, EDA.`,
  },
  {
    id: "skills-infra",
    text: `Databases and tools: MySQL, MongoDB, Git, GitHub, Jupyter Notebook, Docker. Web frameworks: Flask, REST APIs.`,
  },
  {
    id: "experience-1m1b",
    text: `Experience — AI & Sustainability Intern at 1M1B Green Skills Academy (May 2025 – Jun 2025). I built an AI-based waste classification system using over 20,000 images. Achieved 95%+ accuracy by combining CNNs with transfer learning. Earned the 1M1B Green Skills AI certification.`,
  },
  {
    id: "experience-infosys",
    text: `Experience — Data Science Intern at Infosys Springboard (Sep 2025 – Nov 2025). I developed real estate price prediction models that reached around 90% accuracy. Earned the Infosys Springboard Data Science certification.`,
  },
  {
    id: "project-suraksha",
    text: `Project — Suraksha: An AI-powered multi-hazard disaster prediction system. Predicts floods, earthquakes, tsunamis, and hurricanes using trained classification models. Built with Python, ML, and Flask. Achieves 95%+ accuracy. One of my flagship projects.`,
  },
  {
    id: "project-car",
    text: `Project — Car Price Prediction: A regression-based ML system that estimates used-car prices. Reached 95% accuracy through careful feature engineering and model selection.`,
  },
  {
    id: "project-dynamic-pricing",
    text: `Project — Dynamic Pricing for Ride-Sharing: Demand- and supply-driven price optimization model. Achieved R² of 0.84 using Gradient Boosting.`,
  },
  {
    id: "project-healthcare",
    text: `Project — Healthcare AI Prediction System: Machine learning models for clinical risk prediction, helping prioritize patient care.`,
  },
  {
    id: "project-resume",
    text: `Project — AI Resume Analyzer: An NLP-based resume scoring and feedback tool that gives candidates actionable improvement tips.`,
  },
  {
    id: "project-sentiment",
    text: `Project — Sentiment Analysis Dashboard: Real-time social sentiment visualization built with Python and modern dashboarding tools.`,
  },
  {
    id: "education",
    text: `Education: B.Tech in Artificial Intelligence & Data Science, currently in my final year.`,
  },
  {
    id: "contact-cta",
    text: `Best ways to reach me: email venkat.kanamarlapudi1906@gmail.com, or LinkedIn https://www.linkedin.com/in/anjani-kumar-kanamarlapudi-3b5a002b9. I respond quickly to recruiters and collaboration requests.`,
  },
];

export const KNOWLEDGE_VERSION = "v1";

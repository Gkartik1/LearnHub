
// src/pages/Landing.jsx
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import "../styles/Landing.css";

const testimonials = [
  {
    id: 1,
    quote:
      "LearnHub helped me crack my first internship and polish my GitHub profile. Must use!",
    author: "Riya Singh",
  },
  {
    id: 2,
    quote:
      "The roadmap really cleared my confusion on what to learn when. Super clean!",
    author: "Mohit Sharma",
  },
  {
    id: 3,
    quote:
      "Mentorship sessions were a game changer for me. Highly recommend LearnHub.",
    author: "Anjali Patel",
  },
];

const mentors = [
  { id: 1, name: "Suman Das", expertise: "Frontend Developer" },
  { id: 2, name: "Mansi Gupta", expertise: "Data Structures & Algorithms" },
  { id: 3, name: "Rahul Verma", expertise: "Backend Developer" },
];

const faqs = [
  {
    question: "Is LearnHub free to use?",
    answer: "Yes! We offer a free tier with lots of resources and community support.",
  },
  {
    question: "How do I become a mentor?",
    answer:
      "Final year students can register as mentors after verification. Admin approval is required.",
  },
  {
    question: "Can I track my progress?",
    answer:
      "Absolutely! Our dashboard shows your learning streaks, completed topics, and more.",
  },
];

const blogs = [
  {
    id: 1,
    title: "Breaking into Web Development",
    excerpt:
      "Learn how to start your journey in web development with practical tips and resources.",
    url: "/blog/1",
  },
  {
    id: 2,
    title: "DSA Tips from a Final Year Student",
    excerpt:
      "Effective strategies to master data structures and algorithms for placements.",
    url: "/blog/2",
  },
];

const Landing = () => {
  const { t } = useTranslation();
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [email, setEmail] = useState("");
  const [newsletterMsg, setNewsletterMsg] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!email.match(/^\S+@\S+\.\S+$/)) {
      setNewsletterMsg("Please enter a valid email.");
      return;
    }
    setNewsletterMsg("Thank you for subscribing!");
    setEmail("");
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => !prev);
    document.body.classList.toggle("light-theme", darkMode);
  };

  return (
    <div className="landing-container">
      {/* Sticky CTA Bar */}
      <div className="sticky-cta">
        <p>
          Ready to level up your tech skills?{" "}
          <a href="/register" tabIndex={0}>
            Join LearnHub now!
          </a>
        </p>
      </div>

      {/* Hero Section with Video Background */}
      <section className="hero-section">
        <video
          className="hero-video"
          autoPlay
          muted
          loop
          playsInline
          src="/videos/Generated vide 1.mp4"
          aria-hidden="true"
        />
        <div className="hero-content" data-aos="fade-up">
          <h1>{t("welcome") || "🚀 Your Learning Journey Starts Here"}</h1>
          <p>
            LearnHub empowers tech students with curated content, structured roadmaps,
            real-world mentorship, and a growing developer community.
          </p>
          <a href="/register" className="cta-button" tabIndex={0}>
            {t("joinFree") || "Join Free"}
          </a>
          {/* <button
            className="theme-toggle"
            onClick={toggleDarkMode}
            aria-pressed={darkMode}
            aria-label="Toggle dark/light mode"
          >
            {darkMode ? "🌙 Dark Mode" : "☀ Light Mode"}
          </button> */}
        </div>
      </section>

      {/* Live Stats */}
      <section className="stats-section" data-aos="fade-up">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>10,000+</h3>
            <p>Active Students</p>
          </div>
          <div className="stat-card">
            <h3>500+</h3>
            <p>Mentors & Alumni</p>
          </div>
          <div className="stat-card">
            <h3>1,200+</h3>
            <p>Study Materials</p>
          </div>
          <div className="stat-card">
            <h3>95%</h3>
            <p>Placement Success Rate</p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features-section" data-aos="fade-up">
        <h2>Why Choose LearnHub?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              📚
            </div>
            <h3>Curated Roadmaps</h3>
            <p>
              Follow step-by-step learning paths designed by industry experts and
              top students.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              🧠
            </div>
            <h3>Mentorship</h3>
            <p>
              Connect with final-year mentors and alumni to get personalized guidance.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              💡
            </div>
            <h3>Community Support</h3>
            <p>
              Join active chatrooms, forums, and study groups to collaborate and grow.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon" aria-hidden="true">
              🎯
            </div>
            <h3>Career Prep</h3>
            <p>
              Access interview prep, resume reviews, and placement tips from experts.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works" data-aos="fade-up">
        <h2>How It Works</h2>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Create Your Profile</h3>
            <p>Sign up and tell us your interests and goals.</p>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Choose Your Roadmap</h3>
            <p>Select a learning path tailored to your career goals.</p>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Access Resources & Mentorship</h3>
            <p>Get curated materials and connect with mentors.</p>
          </div>
          <div className="step-card">
            <div className="step-number">4</div>
            <h3>Track Progress & Achieve</h3>
            <p>Monitor your learning and prepare for your dream job.</p>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials-section" data-aos="fade-up">
        <h2>What Our Students Say</h2>
        <blockquote>
          “{testimonials[currentTestimonial].quote}”
          <footer>— {testimonials[currentTestimonial].author}</footer>
        </blockquote>
      </section>

      {/* FAQ */}
      <section className="faq-section" data-aos="fade-up">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-list">
          {faqs.map(({ question, answer }, idx) => (
            <details key={idx} className="faq-item">
              <summary>{question}</summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter-section" data-aos="fade-up">
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest updates and tips.</p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            alert("Thank you for subscribing!");
          }}
          className="newsletter-form"
        >
          <input
            type="email"
            placeholder="Enter your email"
            required
            aria-label="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Subscribe</button>
        </form>
        {newsletterMsg && <p className="newsletter-msg">{newsletterMsg}</p>}
      </section>

      {/* Pricing */}
      <section className="pricing-section" data-aos="fade-up">
        <h2>Upgrade to Premium</h2>
        <p>
          Unlock exclusive content, priority mentorship, and ad-free experience.
        </p>
        <a href="/payment" className="cta-button">
          See Pricing
        </a>
      </section>

      {/* Footer CTA */}
      <section className="footer-cta" data-aos="fade-up">
        <h2>Ready to start your dream career in tech?</h2>
        <a href="/register" className="cta-button">
          Join LearnHub Today
        </a>
      </section>
    </div>
  );
};

export default Landing;
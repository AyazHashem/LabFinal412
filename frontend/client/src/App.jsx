import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/projects`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitStatus(null);

    try {
      const response = await fetch(`${API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({ type: "success", text: data.message });
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        setSubmitStatus({ type: "error", text: data.error || "Something went wrong" });
      }
    } catch {
      setSubmitStatus({ type: "error", text: "Failed to send message. Please try again." });
    }
  };

  return (
    <div className="container">
      <nav className="navbar">
        <h2 className="logo">Ayaz.</h2>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="hero">
        <p className="hero-eyebrow">Welcome to my portfolio</p>
        <h1>Hi, I am Ayaz</h1>
        <p className="hero-sub">CS Student &middot; Web Developer &middot; Problem Solver</p>
        <div className="hero-buttons">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Get in Touch</a>
        </div>
      </section>

      <section id="about">
        <h2>About Me</h2>
        <p className="about-text">
          I am a computer science student interested in software development and
          building useful applications. I enjoy crafting clean, functional
          experiences that solve real problems.
        </p>
      </section>

      <section id="skills">
        <h2>Skills</h2>
        <ul className="skills-list">
          <li>JavaScript</li>
          <li>React</li>
          <li>Express</li>
          <li>Node.js</li>
          <li>HTML</li>
          <li>CSS</li>
        </ul>
      </section>

      <section id="projects">
        <h2>Projects</h2>
        <div className="projects-grid">
          {projects.map((project) => (
            <div className="project-card" key={project.id}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <div className="tech-tags">
                {project.tech.map((t) => (
                  <span className="tech-tag" key={t}>{t}</span>
                ))}
              </div>
              <div className="card-links">
                <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
                <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="contact">
        <h2>Contact Me</h2>
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your name"
              value={formData.name}
              onChange={handleChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <textarea
            name="message"
            placeholder="Your message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
          />
          <button type="submit">Send Message</button>
        </form>
        {submitStatus && (
          <div className={`form-status ${submitStatus.type}`}>
            {submitStatus.text}
          </div>
        )}
      </section>

      <footer className="footer">
        <p>&copy; 2026 Ayaz. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;

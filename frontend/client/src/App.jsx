import { useEffect, useState } from "react";
import "./index.css";

function App() {
 const API_URL = import.meta.env.VITE_API_URL
 const [projects, setProjects] = useState([]);
 const [formData, setFormData] = useState({
   name: "",
   email: "",
   message: ""
 });

 useEffect(() => {
   fetch(`${API_URL}/projects`)
     .then((res) => res.json())
     .then((data) => setProjects(data))
     .catch((err) => console.error(err));
 }, []);

 const handleChange = (e) => {
   setFormData({
     ...formData,
     [e.target.name]: e.target.value
   });
 };

 const handleSubmit = async (e) => {
   e.preventDefault();

   const response = await fetch(`${API_URL}/contact`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(formData)
   });

   const data = await response.json();
   alert(data.message || data.error);

   if (response.ok) {
     setFormData({ name: "", email: "", message: "" });
   }
 };

 return (
   <div className="container">
     <nav className="navbar">
       <h2>My Portfolio</h2>
       <div>
         <a href="#about">About</a>
         <a href="#skills">Skills</a>
         <a href="#projects">Projects</a>
         <a href="#contact">Contact</a>
       </div>
     </nav>

     <section className="hero">
       <h1>Hello, I am Yasin</h1>
       <p>CS Student | Web Developer | Problem Solver</p>
     </section>

     <section id="about">
       <h2>About Me</h2>
       <p>
         I am a computer science student interested in software development and
         building useful applications.
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
             <p><strong>Tech:</strong> {project.tech.join(", ")}</p>
             <a href={project.github} target="_blank" rel="noreferrer">GitHub</a>
             {" | "}
             <a href={project.demo} target="_blank" rel="noreferrer">Live Demo</a>
           </div>
         ))}
       </div>
     </section>

     <section id="contact">
       <h2>Contact Me</h2>
       <form className="contact-form" onSubmit={handleSubmit}>
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
         <textarea
           name="message"
           placeholder="Your message"
           rows="5"
           value={formData.message}
           onChange={handleChange}
         />
         <button type="submit">Send</button>
       </form>
     </section>
   </div>
 );
}

export default App;

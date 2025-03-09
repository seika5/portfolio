import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaExternalLinkAlt, FaFileDownload } from 'react-icons/fa';

// Smooth scroll function
const scrollToSection = (id) => {
  document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
};

// Header component
const Header = () => (
  <header className="flex justify-between items-center p-6 bg-gray-800 text-white">
    <div className="text-2xl font-bold">Ryan Mar</div>
    <nav className="space-x-4">
      <button onClick={() => scrollToSection('#about')} className="hover:underline">About</button>
      <button onClick={() => scrollToSection('#projects')} className="hover:underline">Projects</button>
      <button onClick={() => scrollToSection('#contact')} className="hover:underline">Contact</button>
    </nav>
  </header>
);

// HeroSection component
const HeroSection = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePosition({
        x: event.clientX,
        y: event.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const backgroundPosition = {
    backgroundPosition: `${-mousePosition.x / 50}px ${-mousePosition.y / 50}px`,
  };

  // const foregroundPosition = {
  //   backgroundPosition: `${mousePosition.x / 50}px ${mousePosition.y / 50}px`,
  // };

  return (
    <section className="relative flex flex-col justify-center items-center h-screen bg-gray-900 text-white text-center p-6">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, rgba(0,0,0,0) 1px)',
          backgroundSize: '20px 20px',
          ...backgroundPosition,
        }}
      />
      <h1 className="text-5xl font-bold">Hi, I'm Ryan Mar</h1>
      <p className="text-xl mt-4">I build things</p>
      <div className="flex space-x-4 mt-6 z-10">
        <a href="https://github.com/seika5" className="text-2xl"><FaGithub /></a>
        <a href="https://www.linkedin.com/in/marryan/" className="text-2xl"><FaLinkedin /></a>
      </div>
      {/* <div */}
      {/*   className="absolute inset-0" */}
      {/*   style={{ */}
      {/*     backgroundImage: 'radial-gradient(circle, rgba(0,0,0,1) 1px, rgba(255,255,255,0) 3px)', */}
      {/*     backgroundSize: '20px 20px', */}
      {/*     ...foregroundPosition, */}
      {/*   }} */}
      {/* /> */}
    </section>
  );
};

// Reusable Section component
const Section = ({ id, title, children, className = '' }) => (
  <section id={id} className={`p-6 ${className}`}>
    <h2 className="text-3xl font-bold text-center mb-6">{title}</h2>
    <div className="max-w-4xl mx-auto text-center">
      {children}
    </div>
  </section>
);

// Reusable ProjectCard component
const ProjectCard = ({ title, description, imgUrl, repoUrls, deployUrl }) => (
  <div className="border-2 p-4 rounded-lg mb-6">
    <img src={imgUrl} alt={title} className="w-full h-80 object-cover rounded-md mb-4 border-[3px]" />
    <h3 className="text-xl font-semibold mb-2">{title}</h3>
    <p>{description}</p>
    <div className="flex space-x-4 mt-4">
      {repoUrls.map((repoUrl, index) => (
        <a key={index} href={repoUrl} className="flex items-center text-blue-600 hover:underline">
          <FaGithub className="mr-2" /> GitHub Repo
        </a>
      ))}
      {deployUrl && (
        <a href={deployUrl} className="flex items-center text-green-600 hover:underline">
          <FaExternalLinkAlt className="mr-2" /> Vercel Deployment
        </a>
      )}
    </div>
  </div>
);

// AboutSection component
const AboutSection = () => (
  <Section id="about" title="About Me" className="bg-gray-100 text-gray-800">
    <p>I'm a passionate Computer Science major with experience in full stack web development, machine learning, and more. I enjoy making fun/practical applications and challenging myself to learn about new technologies in the field of Computer Science.</p>
  </Section>
);

// ProjectsSection component
const ProjectsSection = () => (
  <Section id="projects" title="Projects" className="bg-white text-gray-800">
    <div className="max-w-4xl mx-auto">
      <ProjectCard 
        title="MooGuard" 
        description="HackMerced X 1st place. Digital livestock tagging, tracking, and health monitoring. Uses Tensor Processing Unit to deploy on-site at a low upfront and continuing cost." 
        imgUrl="/mooguard.png" 
        repoUrls={["https://github.com/airwuu/www"]}
      />
      <ProjectCard 
        title="DjN Data Visualizer" 
        description="Experimental data visualizer using Next.js for frontend and Django REST Framework for API backend. Features dashboard with 4 data visualizations using data from backend. Utilizes Docker for easy deployment." 
        imgUrl="/djndatavisualizer.png" 
        repoUrls={["https://github.com/seika5/api-data-visualizer"]}
      />
      <ProjectCard 
        title="Croppy Deals" 
        description="HackMerced IX 2nd place. Digital marketplace that provides farmers with both an alternative to contract farming and easily accessible market data to assist with determining future crop rotations." 
        imgUrl="/croppydeals.png" 
        repoUrls={["https://github.com/airhornwho/croppydeals"]}
        deployUrl="https://croppydeals-alpha.vercel.app"
      />
      <ProjectCard 
        title="Jamster" 
        description="YouTube Music listen along website. Uses a browser extension to grab YouTube Music URL and saves the link to Firebase. React App pulls the URL from Firebase and plays the song." 
        imgUrl="/jamster.png" 
        repoUrls={["https://github.com/seika5/jamster", "https://github.com/seika5/jamster-react-app"]}
        deployUrl="https://jamster.vercel.app"
      />
      <ProjectCard 
        title="Yukai" 
        description="Modern online merchandise store. Uses a Django framework to handle user accounts, a mailing system, and more. Uses Stripe for secure online payment handling." 
        imgUrl="/yukai.png" 
        repoUrls={["https://github.com/seika5/shirtmarket"]}
      />
      <ProjectCard 
        title="ByTech" 
        description="Educational tool for computer science classes. Seamlessly integrating familiar features of learning management systems, ByTech offers personalized assignment creation assistance for teachers and comprehensive assignment explanations for students. Provides a web-based development environment as well as unit test functionalities." 
        imgUrl="/bytech.png" 
        repoUrls={["https://github.com/Teddygat0r/dualhacks"]}
        deployUrl="https://dualhacks.vercel.app"
      />
      <ProjectCard 
        title="WildEyeAI" 
        description="AI-based wildlife protection. Uses image subtraction techniques to identify movement, then runs frames with movement through an image classification model. Collected data is then sent via POST request to a FLASK server. As it can be run on small installations, WildEyeAI provides a non-intrusive method of wildlife data collection." 
        imgUrl="/wildeyeai.png" 
        repoUrls={["https://github.com/seika5/deepimageclassifier"]}
      />
    </div>
  </Section>
);

// ContactSection component
const ContactSection = () => (
  <Section id="contact" title="Contact" className="bg-gray-100 text-gray-800">
    <p>Feel free to reach out if you want to collaborate on a project or just want to say hi!</p>
    <p className="mt-4">ryanmar05.business@gmail.com</p>
  </Section>
);

// Footer component
const Footer = () => (
  <footer className="flex justify-center items-center p-6 bg-gray-800 text-white">
    <a href="/Ryan_Mar_resume.pdf" className="flex items-center text-white hover:underline">
      <FaFileDownload className="mr-2" /> Download Resume
    </a>
  </footer>
);

// Main App component
export default function App() {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
    </div>
  );
}

"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Github, Linkedin, ExternalLink, UserCircle, Code, Briefcase, Monitor, ChevronRight, FileText, Mail } from 'lucide-react';

export default function PortfolioContent() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;

      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const sectionElements = sections.map(id => document.getElementById(id));

      const currentSection = sectionElements.reduce((acc, section) => {
        if (!section) return acc;

        const rect = section.getBoundingClientRect();
        if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
          return section.id;
        }
        return acc;
      }, 'home');

      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex min-h-screen text-white">
      <nav className="hidden lg:flex flex-col items-center w-24 bg-black/60 border-r border-white/10 fixed h-screen z-40">
        <div className="font-mono text-xl mt-16 mb-12 rotate-90 tracking-wider whitespace-nowrap">
          RYAN MAR
        </div>

        <div className="flex flex-col gap-10 items-center mt-8">
          <NavItem
            id="home"
            icon={<Monitor size={20} />}
            isActive={activeSection === 'home'}
            onClick={() => scrollToSection('home')}
          />
          <NavItem
            id="about"
            icon={<UserCircle size={20} />}
            isActive={activeSection === 'about'}
            onClick={() => scrollToSection('about')}
          />
          <NavItem
            id="skills"
            icon={<Code size={20} />}
            isActive={activeSection === 'skills'}
            onClick={() => scrollToSection('skills')}
          />
          <NavItem
            id="projects"
            icon={<Briefcase size={20} />}
            isActive={activeSection === 'projects'}
            onClick={() => scrollToSection('projects')}
          />
          <NavItem
            id="contact"
            icon={<Mail size={20} />}
            isActive={activeSection === 'contact'}
            onClick={() => scrollToSection('contact')}
          />
        </div>

        <div className="mt-auto mb-8 flex flex-col gap-4">
          <a href="https://github.com/seika5" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
            <Github size={20} />
          </a>
          <a href="https://www.linkedin.com/in/marryan/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
            <Linkedin size={20} />
          </a>
        </div>
      </nav>

      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black/60 border-t border-white/10">
        <div className="flex justify-around py-4">
          <MobileNavItem
            icon={<Monitor size={20} />}
            isActive={activeSection === 'home'}
            onClick={() => scrollToSection('home')}
          />
          <MobileNavItem
            icon={<UserCircle size={20} />}
            isActive={activeSection === 'about'}
            onClick={() => scrollToSection('about')}
          />
          <MobileNavItem
            icon={<Code size={20} />}
            isActive={activeSection === 'skills'}
            onClick={() => scrollToSection('skills')}
          />
          <MobileNavItem
            icon={<Briefcase size={20} />}
            isActive={activeSection === 'projects'}
            onClick={() => scrollToSection('projects')}
          />
          <MobileNavItem
            icon={<Mail size={20} />}
            isActive={activeSection === 'contact'}
            onClick={() => scrollToSection('contact')}
          />
        </div>
      </div>

      <main className="w-full lg:pl-24">
        <section id="home" className="flex flex-col justify-center px-8 lg:px-16 py-32">
          <div className="max-w-3xl mx-auto w-full">
            <div className="card-container bg-black/25 backdrop-blur-md border border-white/10 rounded-lg p-10 shadow-xl">
              <p className="text-[#d4af37] mb-4 font-mono">Hello, my name is</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                Ryan Mar
              </h1>
              <h2 className="text-2xl md:text-4xl lg:text-5xl text-white/70 font-semibold mb-6">
                Computer Science Major & Software Engineer
              </h2>
              <p className="text-white/70 max-w-xl mb-8 text-lg">
                I'm a passionate developer with experience in full stack web development,
                cloud technologies, machine learning, and more. I enjoy building practical and novel applications.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-32 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-container bg-black/25 backdrop-blur-md border border-white/10 rounded-lg p-10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#d4af37]">01.</span> About Me
              </h2>

              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3">
                  <p className="text-white/80 mb-4">
                    I enjoy designing scalable backend systems, working with databases, and building cloud-native
                    architecture and infrastructure on platforms like AWS.
                  </p>
                  <p className="text-white/80 mb-4">
                    My projects range from computer vision agriculture solutions to feature-complete e-commerce 
                    sites. I'm passionate about using technology to solve real-world problems and create innovative 
                    applications.
                  </p>
                  <p className="text-white/80 mb-6">
                    When I'm not in class, you'll find me prototyping side projects, trying out new frameworks, 
                    and getting boba with friends.
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-white/80">
                    <div>
                      <h3 className="text-[#d4af37] text-lg font-semibold mb-2">Education</h3>
                      <p className="mb-1">B.S. in Computer Science</p>
                      <p className="text-sm text-white/60">University of California, San Diego</p>
                    </div>
                    <div>
                      <h3 className="text-[#d4af37] text-lg font-semibold mb-2">Experience</h3>
                      <p className="mb-1">Software Engineer</p>
                      <p className="text-sm text-white/60">Various Projects & Internships</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="aspect-square bg-gradient-to-br from-[#d4af37]/20 to-black/30 backdrop-blur-md rounded-md p-1">
                    <div className="w-full h-full border border-[#d4af37]/30 rounded overflow-hidden">
                      <div className="w-full h-full bg-black/40 flex items-center justify-center text-[#d4af37]">
                        <UserCircle size={80} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="skills" className="py-32 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-container bg-black/25 backdrop-blur-md border border-white/10 rounded-lg p-10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-2">
                <span className="text-[#d4af37]">02.</span> Skills & Technologies
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <SkillCategory title="Frontend Development" skills={[
                  "Django",
                  "HTML/CSS",
                  "JavaScript",
                  "Next.js",
                  "React",
                  "TypeScript"
                ]} />

                <SkillCategory title="Backend Development" skills={[
                  "AWS (EC2, Lambda, RDS)",
                  "Django REST Framework",
                  "Firebase",
                  "MongoDB",
                  "REST APIs",
                  "SQL (MySQL, SQLite)"
                ]} />

                <SkillCategory title="AI & Machine Learning" skills={[
                  "Computer Vision",
                  "Image Classification",
                  "Natural Language Processing",
                  "OpenCV",
                  "PyTorch",
                  "TensorFlow"
                ]} />

                <SkillCategory title="Miscellaneous" skills={[
                  "Bash Scripting",
                  "Docker",
                  "Git",
                  "Jira",
                  "Stripe",
                  "Vercel"
                ]} />
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-32 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-container bg-black/25 backdrop-blur-md border border-white/10 rounded-lg p-10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-2">
                <span className="text-[#d4af37]">03.</span> Featured Projects
              </h2>

              <div className="space-y-16">
                <ProjectCard
                  title="MooGuard"
                  description="HackMerced X 1st place. Digital livestock tagging, tracking, and health monitoring. Uses tensor processing units to deploy on-site at a low upfront and continuing cost."
                  tags={["TensorFlow", "AI", "IoT", "Livestock Monitoring"]}
                  imageUrl="/mooguard.png"
                  githubUrl="https://github.com/airwuu/MooGuard"
                  liveUrl=""
                  reverse={false}
                />

                <ProjectCard
                  title="DjN Data Visualizer"
                  description="Sandbox project using Next.js for frontend and Django REST Framework for backend API to visualize data. Containerized using Docker for easy deployment of full stack application."
                  tags={["Next.js", "Django", "REST API", "Data Visualization", "Docker"]}
                  imageUrl="/djndatavisualizer.png"
                  githubUrl="https://github.com/seika5/api-data-visualizer"
                  liveUrl=""
                  reverse={true}
                />

                <ProjectCard
                  title="Croppy Deals"
                  description="HackMerced IX 2nd place. Digital marketplace providing farmers with an alternative to contract farming and an easily accessible market data visualizer."
                  tags={["React", "Digital Marketplace", "Agriculture", "Data Analysis"]}
                  imageUrl="/croppydeals.png"
                  githubUrl="https://github.com/airhornwho/croppydeals"
                  liveUrl="https://croppydeals-alpha.vercel.app"
                  reverse={false}
                />

                <ProjectCard
                  title="Jamster"
                  description="YouTube Music listen along website. Uses a browser extension to grab YouTube Music URL and saves the link to Firebase. React App pulls the URL from Firebase and plays the song for your friends."
                  tags={["React", "Firebase", "Browser Extension", "YouTube API"]}
                  imageUrl="/jamster.png"
                  githubUrl="https://github.com/seika5/jamster"
                  liveUrl="https://jamster.vercel.app"
                  reverse={true}
                />

                <ProjectCard
                  title="Yukai"
                  description="Modern online merchandise store. Uses a full stack Django framework to handle user accounts, mailing system, purchases, and more. Uses Stripe for secure online payment handling."
                  tags={["Django", "Stripe", "E-commerce", "Python"]}
                  imageUrl="/yukai.png"
                  githubUrl="https://github.com/seika5/shirtmarket"
                  liveUrl=""
                  reverse={false}
                />

                <ProjectCard
                  title="ByTech"
                  description="Educational tool for computer science classes. Offers personalized assignment creation assistance for teachers and comprehensive assignment explanations for students."
                  tags={["Web-based IDE", "LMS", "Education", "Computer Science"]}
                  imageUrl="/bytech.png"
                  githubUrl="https://github.com/Teddygat0r/dualhacks"
                  liveUrl="https://dualhacks.vercel.app"
                  reverse={true}
                />

                <ProjectCard
                  title="WildEyeAI"
                  description="AI-based wildlife protection. Low-cost image classification model for wildlife conservation and data collection."
                  tags={["Computer Vision", "AI", "Wildlife Conservation", "Python"]}
                  imageUrl="/wildeyeai.png"
                  githubUrl="https://github.com/seika5/deepimageclassifier"
                  liveUrl=""
                  reverse={false}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-32 px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-container bg-black/25 backdrop-blur-md border border-white/10 rounded-lg p-10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#d4af37]">04.</span> Get In Touch
              </h2>

              <p className="text-white/80 mb-12 max-w-2xl">
                Feel free to reach out if you want to collaborate on a project or just want to say hi!
              </p>

              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-8">
                  <ContactItem
                    icon={<Github size={20} />}
                    title="GitHub"
                    value="github.com/seika5"
                    link="https://github.com/seika5"
                  />

                  <ContactItem
                    icon={<Linkedin size={20} />}
                    title="LinkedIn"
                    value="linkedin.com/in/marryan"
                    link="https://www.linkedin.com/in/marryan/"
                  />

                  <ContactItem
                    icon={<FileText size={20} />}
                    title="Resume"
                    value="Download Resume (PDF)"
                    link="/Ryan_Mar_resume.pdf"
                  />

                  <div className="pt-8 border-t border-white/10">
                    <p className="text-white/60 text-sm">
                      Based in California
                      <br />
                      Available for collaboration and projects
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-8 lg:px-16 border-t border-white/10 bg-black/50">
          <div className="max-w-3xl mx-auto flex flex-col md:flex-row justify-between items-center">
            <p className="text-white/60 text-sm mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Ryan Mar. All rights reserved.
            </p>

            <div className="flex gap-6">
              <a href="https://github.com/seika5" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/marryan/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-white transition-colors">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}

function NavItem({ id, icon, isActive, onClick }: { id: string; icon: React.ReactNode; isActive: boolean; onClick: () => void }) {
  return (
    <button
      className={`flex items-center justify-center w-12 h-12 rounded-full transition-all ${
        isActive ? 'bg-[#d4af37]/20 text-[#d4af37]' : 'text-white/60 hover:text-white hover:bg-white/10'
      }`}
      onClick={onClick}
      aria-label={`Navigate to ${id} section`}
    >
      {icon}
    </button>
  );
}

function MobileNavItem({ icon, isActive, onClick }: { icon: React.ReactNode; isActive: boolean; onClick: () => void }) {
  return (
    <button
      className={`p-3 transition-all ${
        isActive ? 'text-[#d4af37]' : 'text-white/60'
      }`}
      onClick={onClick}
    >
      {icon}
    </button>
  );
}

function SkillCategory({ title, skills }: { title: string; skills: string[] }) {
  return (
    <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-6">
      <h3 className="text-lg font-semibold mb-4 text-[#d4af37]">{title}</h3>
      <ul className="space-y-2">
        {skills.map((skill, index) => (
          <li key={index} className="flex items-center gap-2 text-white/80">
            <ChevronRight size={14} className="text-[#d4af37]" />
            {skill}
          </li>
        ))}
      </ul>
    </div>
  );
}

function ProjectCard({
  title,
  description,
  tags,
  imageUrl,
  githubUrl,
  liveUrl,
  reverse
}: {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  githubUrl: string;
  liveUrl: string;
  reverse: boolean;
}) {
  return (
    <div className={`flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} gap-8`}>
      <div className="flex-1">
        <div className="aspect-video bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10">
          {imageUrl ? (
            <div
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${imageUrl})` }}
              aria-label={`${title} project image`}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-white/30">
              <Monitor size={48} />
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h3 className="text-2xl font-semibold mb-3 text-white">{title}</h3>

        <p className="text-white/70 mb-4">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {tags.map((tag, index) => (
            <span key={index} className="bg-[#d4af37]/10 text-[#d4af37] px-3 py-1 text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-4">
          {githubUrl && (
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
            >
              <Github size={16} />
              <span>Code</span>
            </a>
          )}

          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-white/80 hover:text-white transition-colors"
            >
              <ExternalLink size={16} />
              <span>Live Demo</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function ContactItem({
  icon,
  title,
  value,
  link
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  link: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="p-3 bg-[#d4af37]/10 backdrop-blur-sm rounded-full text-[#d4af37]">
        {icon}
      </div>

      <div>
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white/70 hover:text-[#d4af37] transition-colors"
        >
          {value}
        </a>
      </div>
    </div>
  );
}

function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' });
  }
}

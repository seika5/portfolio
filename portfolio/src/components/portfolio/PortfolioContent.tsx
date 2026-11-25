"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Github, Linkedin, ExternalLink, UserCircle, Briefcase, Monitor, Mail } from 'lucide-react';

export default function PortfolioContent() {
  const [activeSection, setActiveSection] = useState<string>('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.body.offsetHeight;

      const sections = ['home', 'about', 'projects', 'contact'];
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
        <button
          onClick={() => scrollToSection('home')}
          aria-label="Ryan Mar, back to top"
          className="mt-10 mb-6 w-12 h-12 flex items-center justify-center border border-[#d4af37] rounded-md font-mono font-bold text-lg tracking-tight text-[#d4af37] hover:bg-[#d4af37]/10 transition-colors"
        >
          RM
        </button>

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

      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-black border-t border-white/10">
        <div className="flex justify-around py-1">
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
        <section id="home" className="min-h-[100svh] flex flex-col justify-center px-4 sm:px-8 lg:px-16 pt-6 pb-20 lg:py-16">
          <div className="max-w-3xl mx-auto w-full">
            <div className="card-container bg-black/80 lg:bg-black/25 lg:backdrop-blur-md border border-white/10 rounded-lg p-6 sm:p-10 shadow-xl">
              <p className="text-[#d4af37] mb-4 font-mono">Hello, my name is</p>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
                Ryan Mar
              </h1>
              <h2 className="text-base md:text-xl lg:text-2xl text-white/70 font-semibold mb-4">
                Computer Science @ University of Southern California
              </h2>
              <p className="text-white/70 max-w-xl mb-8 text-lg">
                I'm a passionate developer with experience in full stack development, cloud technologies, 
                machine learning, and more.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-6 py-3 rounded-md font-medium transition-colors"
                >
                  Get in Touch
                </button>

                <a
                  href="/Ryan_Mar_resume.pdf"
                  className="border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 px-6 py-3 rounded-md font-medium transition-colors flex items-center gap-2"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        </section>

        <section id="about" className="py-6 lg:py-32 px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-container bg-black/80 lg:bg-black/25 lg:backdrop-blur-md border border-white/10 rounded-lg p-6 sm:p-10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#d4af37]">01.</span> About Me
              </h2>

              <div className="grid md:grid-cols-5 gap-8">
                <div className="md:col-span-3">
                  <p className="text-white/80 mb-4">
                    I enjoy designing scalable distributed systems, creating AI pipelines, and building cloud-native
                    architecture and infrastructure on platforms like AWS.
                  </p>
                  <p className="text-white/80 mb-4">
                    My projects range from feature-complete e-commerce sites to distributed machine learning model
                    training. I'm passionate about using technology to solve real-world problems and create innovative 
                    applications.
                  </p>
                  <p className="text-white/80 mb-6">
                    When I'm not in class, you'll find me prototyping side projects, trying out new frameworks, 
                    and getting boba with friends.
                  </p>

                  <div className="grid grid-cols-1 gap-4 text-white/80">
                    <div>
                      <h3 className="text-[#d4af37] text-lg font-semibold mb-2">Education</h3>
                      <p className="mb-1">University of Southern California</p>
                      <p className="text-sm text-white/60">B.S. in Computer Science</p>
                    </div>
                    <div>
                      <h3 className="text-[#d4af37] text-lg font-semibold mb-2">Work Experience</h3>

                      <p className="mb-1">Amazon</p>
                      <p className="text-sm text-white/60 mb-2">Software Development Engineer Intern</p>

                      <p className="mb-1">Jane Street</p>
                      <p className="text-sm text-white/60 mb-2">Trade Desk Operations Engineer Intern</p>

                      <p className="mb-1">Docflow Labs</p>
                      <p className="text-sm text-white/60 mb-2">Software Engineer Intern</p>

                      <p className="mb-1">U.S. Department of Homeland Security</p>
                      <p className="text-sm text-white/60">Software Engineer Intern</p>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2">
                  <div className="aspect-square rounded-lg overflow-hidden border border-white/10">
                    <img
                      src="/profile.jpg"
                      alt="Ryan Mar"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="py-6 lg:py-32 px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-container bg-black/80 lg:bg-black/25 lg:backdrop-blur-md border border-white/10 rounded-lg p-6 sm:p-10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 flex items-center gap-2">
                <span className="text-[#d4af37]">02.</span> Featured Projects
              </h2>

              <div className="space-y-16">
                <ProjectCard
                  title="Exurelay"
                  description="Hyper-private self-hosted E2EE messaging and encrypted voice/video. Built-in AWS CloudFormation template server setup."
                  tags={["AWS", "E2EE", "Next.js", "Prisma", "WebRTC"]}
                  imageUrl="/prj/relay.png"
                  githubUrl="https://github.com/seika5/relay"
                  liveUrl=""
                  reverse={false}
                />

                <ProjectCard
                  title="Jamster"
                  description="YouTube Music listen along website. Uses a browser extension to grab YouTube Music URL and saves the link to Firebase. React App pulls the URL from Firebase and plays the song for your friends."
                  tags={["Browser Extension", "Firebase", "Music", "React"]}
                  imageUrl="/prj/jamster.png"
                  githubUrl="https://github.com/seika5/jamster-react-app"
                  liveUrl="https://jamster.vercel.app"
                  reverse={true}
                />

                <ProjectCard
                  title="MooGuard"
                  description="Hackathon project, HackMerced X 1st place. Digital livestock tagging, tracking, and health monitoring. Uses tensor processing units to deploy on-site at a low upfront and continuing cost."
                  tags={["AI", "IoT", "Livestock Monitoring", "TensorFlow"]}
                  imageUrl="/prj/mooguard.png"
                  githubUrl="https://github.com/airwuu/MooGuard"
                  liveUrl="https://devpost.com/software/mooguard"
                  reverse={false}
                />

                <ProjectCard
                  title="Croppy Deals"
                  description="Hackathon project, HackMerced IX 2nd place. Digital marketplace providing farmers with an alternative to contract farming and an easily accessible market data visualizer."
                  tags={["Agriculture", "Data Analysis", "Digital Marketplace", "React"]}
                  imageUrl="/prj/croppydeals.png"
                  githubUrl="https://github.com/airhornwho/croppydeals"
                  liveUrl="https://devpost.com/software/croppy-deals"
                  reverse={true}
                />
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="py-6 lg:py-32 px-4 sm:px-8 lg:px-16">
          <div className="max-w-3xl mx-auto">
            <div className="card-container bg-black/80 lg:bg-black/25 lg:backdrop-blur-md border border-white/10 rounded-lg p-6 sm:p-10 shadow-xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 flex items-center gap-2">
                <span className="text-[#d4af37]">03.</span> Get In Touch
              </h2>

              <p className="text-white/80 mb-8 max-w-2xl">
                Feel free to reach out if you want to collaborate on a project or just want to say hi!
              </p>

              <div className="grid grid-cols-1 gap-8">
                <div className="space-y-8">
                  <ContactItem
                    icon={<Linkedin size={20} />}
                    title="LinkedIn"
                    value="linkedin.com/in/marryan"
                    link="https://www.linkedin.com/in/marryan/"
                  />

                  <ContactItem
                    icon={<Github size={20} />}
                    title="GitHub"
                    value="github.com/seika5"
                    link="https://github.com/seika5"
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

        <footer className="pt-8 pb-24 lg:py-8 px-4 sm:px-8 lg:px-16 border-t border-white/10 bg-black/50">
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
        <div className="aspect-video bg-black/50 rounded-lg overflow-hidden border border-white/10">
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
      <div className="p-3 bg-[#d4af37]/10 rounded-full text-[#d4af37]">
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

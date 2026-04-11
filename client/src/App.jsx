import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ChatbotWidget from './components/ChatbotWidget';
import { useScrollAnimation } from './hooks/useScrollAnimation';
import { useCustomCursor } from './hooks/useCustomCursor';

/**
 * App — root component composing all portfolio sections.
 */
function App() {
  useScrollAnimation();
  useCustomCursor();

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Education />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
      <ChatbotWidget />
    </>
  );
}

export default App;

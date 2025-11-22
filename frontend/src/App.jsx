// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  NavLink,
  Outlet,
  useNavigate,
  Navigate,
} from "react-router-dom";
import logo from "./assets/javeedresidency.jpg";

/* Team images - place these files in src/assets/team/ */
import syedAli from "./assets/team/syed-ali.jpg";
import omerImg from "./assets/team/omer.jpg";
import osmanImg from "./assets/team/osman.jpg";
import muneebImg from "./assets/team/muneeb.jpg";

/* Project images - place these files in src/assets/projects/ */
import bciLab from "./assets/projects/bci-lab.jpg";
import smartApartment from "./assets/projects/smart-apartment.jpg";
import openBciHub from "./assets/projects/openbci-hub.jpg";

import ChatWindow from "./components/ChatWindow.jsx"; // keep your ChatWindow component here
import "./index.css"; // keep Tailwind + helpers (append .text-gold, .bg-gold, .glass-card if needed)

/* --------------------------
   Layout (Navbar + Footer)
   -------------------------- */
function Layout({ token, onLogout }) {
  return (
    <div className="min-h-screen flex flex-col font-poppins">
      <header className="bg-[#23448f] text-white shadow-md">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-gold bg-white shadow-md">
              <img src={logo} alt="Javeed logo" className="w-full h-full object-cover" />
            </div>

            <div>
              <div className="font-bold tracking-wide text-base md:text-xl">JAVEED RESIDENCY × JAVEED ESTATE</div>
              <div className="text-xs md:text-sm text-gray-200">Smart — Sustainable — Stylish</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm md:text-[15px]">
            <NavLink to="/" end className={({ isActive }) => (isActive ? "text-gold" : "hover:text-gold")}>Home</NavLink>
            <NavLink to="/about-us" className={({ isActive }) => (isActive ? "text-gold" : "hover:text-gold")}>About Us</NavLink>
            <NavLink to="/our-services" className={({ isActive }) => (isActive ? "text-gold" : "hover:text-gold")}>Our Services</NavLink>
            <NavLink to="/projects" className={({ isActive }) => (isActive ? "text-gold" : "hover:text-gold")}>Projects</NavLink>
            <NavLink to="/meet-the-team" className={({ isActive }) => (isActive ? "text-gold" : "hover:text-gold")}>Meet the Team</NavLink>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-gold" : "hover:text-gold")}>Contact</NavLink>

            {!token ? (
              <NavLink to="/login" className="ml-4 bg-gold text-[#10203a] px-4 py-2 rounded font-semibold shadow-sm hover:brightness-110 transition">
                Login
              </NavLink>
            ) : (
              <>
                <Link to="/chat" className="ml-4 bg-white/10 px-3 py-1 rounded">Chat</Link>
                <button onClick={onLogout} className="ml-2 border px-3 py-1 rounded">Logout</button>
              </>
            )}
          </nav>

          {/* Mobile minimal fallback: login link */}
          <div className="md:hidden">
            {!token ? (
              <Link to="/login" className="bg-gold text-[#10203a] px-3 py-1 rounded text-sm">Login</Link>
            ) : (
              <Link to="/chat" className="bg-white/10 px-3 py-1 rounded text-sm">Chat</Link>
            )}
          </div>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="mt-auto bg-gradient-to-r from-[#152040] to-[#1E3A8A] text-center text-gray-200 py-6">
        <p>© 2025 Javeed Residency × Javeed Estate | All Rights Reserved</p>
      </footer>
    </div>
  );
}

/* --------------------------
   Home Page (Hero)
   -------------------------- */
function Home() {
  return (
    <>
      <section className="bg-[#1f2b5b] text-white">
        <div className="container mx-auto px-6 py-28 md:py-36 text-center">
          <div className="max-w-4xl mx-auto backdrop-blur-md bg-white/5 rounded-2xl p-10 shadow-xl glass-card">
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6">Smart Living.<br/>Human-Centered Design.</h1>
            <p className="text-gray-200 max-w-2xl mx-auto mb-8">
              Redefining modern housing through accessible architecture, premium designs, and intelligent living solutions.
            </p>

            <div className="flex justify-center gap-6">
              <Link to="/meet-the-team" className="px-6 py-3 rounded-lg border border-white/30 bg-transparent hover:bg-white/10 transition text-white shadow-sm">
                Meet the Team
              </Link>
              <Link to="/contact" className="px-6 py-3 rounded-lg bg-gold text-[#10203a] font-semibold hover:scale-105 transition shadow-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-12">
        <div className="container mx-auto px-6">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold mb-2">Welcome to Javeed Residency</h2>
            <p className="text-gray-600">Explore our projects, services, and team. Use the navigation above to move around.</p>
          </div>
        </div>
      </section>
    </>
  );
}

/* --------------------------
   About Page
   -------------------------- */
function About() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="col-span-1 flex flex-col items-center md:items-start">
          <div className="w-1 h-24 bg-gold rounded mb-6"></div>
          <h3 className="text-2xl font-bold text-gold mb-2">About Us</h3>
          <p className="text-gray-600">Building future-ready homes that combine elegant architecture with sustainable, smart technologies.</p>
        </div>

        <div className="md:col-span-2 bg-white rounded-2xl p-6 shadow-md glass-card">
          <p className="text-gray-700 leading-relaxed">
            Javeed Residency & Javeed Estate focus on creating living spaces that provide comfort, timeless elegance and pioneering innovation.
            Our design philosophy blends sustainability with smart-home automation — including ideas inspired by brain-computer interface (BCI) integrations — to create accessible and adaptive living environments.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gold">Sustainable Design</h4>
              <p className="text-gray-600 text-sm">Energy efficient systems, solar-ready infrastructure, and green spaces.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gold">Smart Automation</h4>
              <p className="text-gray-600 text-sm">Integrated smart home controls, automation and assistive tech.</p>
            </div>
            <div className="p-4 border rounded-lg">
              <h4 className="font-semibold text-gold">Community Focus</h4>
              <p className="text-gray-600 text-sm">Neighborhood planning, safety, and shared amenities.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------
   Services Page
   -------------------------- */
function Services() {
  const services = [
    { title: "Property Development", desc: "End-to-end residential and commercial development with smart infrastructure." },
    { title: "BCI & IoT Integration", desc: "Research & prototype integration of brain-computer interfaces with home automation." },
    { title: "Design & Consultancy", desc: "Architecture, interior design, and sustainability consulting." },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gold mb-8">Our Services</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <div key={s.title} className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <h3 className="font-semibold text-gold text-lg mb-2">{s.title}</h3>
              <p className="text-gray-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------
   Projects Page
   -------------------------- */
function Projects() {
  const projects = [
    {
      name: "BCI Prototype Lab",
      subtitle: "EEG-based control systems",
      img: bciLab,
      bullets: [
        "EEG headset capture & signal decoding",
        "Low-latency control pipeline (<200 ms)",
        "Accessibility-focused smart controls",
      ],
    },
    {
      name: "Smart Apartment (MIT-style)",
      subtitle: "Integrated BCI + IoT apartment",
      img: smartApartment,
      bullets: [
        "Adaptive lighting & climate based on intent",
        "Predictive automation and personalized profiles",
        "Fall-detection & eldercare features",
      ],
    },
    {
      name: "OpenBCI Community Hub",
      subtitle: "Open-source BCI development",
      img: openBciHub,
      bullets: [
        "Community-driven prototypes & workshops",
        "Data anonymization & security practices",
        "Rapid prototyping with Raspberry Pi / Arduino",
      ],
    },
  ];

  return (
    <section className="container mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center text-gold mb-10">Featured Projects</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {projects.map((p) => (
          <article key={p.name} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition transform hover:-translate-y-2">
            <div className="h-56 w-full bg-gray-200 overflow-hidden">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gold mb-1">{p.name}</h3>
              <p className="text-sm text-gray-600 mb-3">{p.subtitle}</p>
              <ul className="text-gray-600 text-sm list-disc list-inside space-y-1">
                {p.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* --------------------------
   Team Page (imports used)
   -------------------------- */
function Team() {
  const team = [
    { name: "Syed Ali", role: "Founder & Chief Visionary", img: syedAli, desc: "Engineer, strategist, and social innovator." },
    { name: "Syed Omer Ali", role: "Marketing Head", img: omerImg, desc: "Crafts brand strategy and outreach." },
    { name: "Syed Osman Ali", role: "3D Designer", img: osmanImg, desc: "Interior & 3D designer." },
    { name: "Mohammed Muneeb", role: "Website Developer", img: muneebImg, desc: "Frontend and full-stack web dev." },
  ];

  return (
    <section className="bg-gray-50 py-16 px-6">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center text-gold mb-8">Meet the Team</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {team.map((m) => (
            <div key={m.name} className="bg-white rounded-xl p-6 text-center shadow-md hover:shadow-xl transition transform hover:-translate-y-1">
              <div className="w-28 h-28 mx-auto rounded-full overflow-hidden mb-4">
                <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
              </div>
              <h4 className="text-lg font-semibold text-gold">{m.name}</h4>
              <p className="text-gray-600">{m.role}</p>
              <p className="text-gray-500 text-sm mt-2">{m.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------
   Contact, Login, Register
   -------------------------- */
function Contact() {
  return (
    <section className="container mx-auto py-16 px-6 text-center">
      <h2 className="text-3xl font-bold text-gold mb-6">Contact Us</h2>
      <p className="text-gray-600 mb-8">Have questions or want to collaborate? We’d love to hear from you.</p>

      <div className="bg-gray-100 max-w-lg mx-auto rounded-xl p-8 shadow-md space-y-3">
        <p>📍 <strong>Address:</strong> Kummari Basthi, Shah Ali Banda, Hyderabad, Telangana 500065{" "}
          <a href="https://maps.app.goo.gl/hYm6XKD85fW8aCF49" target="_blank" rel="noreferrer" className="ml-2 inline-block text-blue-500 hover:text-blue-700">🗺️</a>
        </p>
        <p>📞 <strong>Phone:</strong> 9381655894</p>
        <p>📧 <strong>Email:</strong> Javeedestate@gmail.com</p>
      </div>
    </section>
  );
}

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      // TODO: replace with your real login API (loginUser)
      const demoToken = "demo-token-123";
      onLoginSuccess(demoToken);
      navigate("/chat");
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
        <form onSubmit={submit} className="space-y-4">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full border px-3 py-2 rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border px-3 py-2 rounded" />
          <div className="flex gap-2 items-center justify-between">
            <button type="submit" className="bg-gold px-4 py-2 rounded font-semibold">Login</button>
            <Link to="/register" className="text-sm text-blue-600">Create an account</Link>
          </div>
        </form>
      </div>
    </div>
  );
}

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      // TODO: replace with your register API
      alert("Registered (demo). Now login.");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  }

  return (
    <div className="container mx-auto px-6 py-20">
      <div className="max-w-md mx-auto bg-white rounded-2xl p-8 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-center">Create Account</h2>
        <form onSubmit={submit} className="space-y-4">
          <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" className="w-full border px-3 py-2 rounded" />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full border px-3 py-2 rounded" />
          <button type="submit" className="w-full bg-gold px-4 py-2 rounded font-semibold">Register</button>
        </form>
      </div>
    </div>
  );
}

/* --------------------------
   App (routes + auth)
   -------------------------- */
export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  const handleLoginSuccess = (tokenValue) => setToken(tokenValue);
  const handleLogout = () => setToken(null);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout token={token} onLogout={handleLogout} />}>
          <Route index element={<Home />} />
          <Route path="about-us" element={<About />} />
          <Route path="our-services" element={<Services />} />
          <Route path="projects" element={<Projects />} />
          <Route path="meet-the-team" element={<Team />} />
          <Route path="contact" element={<Contact />} />

          <Route path="login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
          <Route path="register" element={<Register />} />

          <Route path="chat" element={token ? <ChatWindow token={token} conversationId="user_admin_123" /> : <Navigate to="/login" replace />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

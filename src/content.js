// All copy comes from Amit Kashyap's CV content (amit-portfolio-duplicate) + original portfolio (Lotus Puff).
const B = import.meta.env.BASE_URL + "work/";

export const profile = {
  first: "Amit",
  last: "Kashyap",
  role: "Graphic & Web UI Designer",
  location: "Ludhiana, India",
  mantra: "“Short and sweet” is my mantra. Simplicity and elegance in every digital design.",
  email: "amitkashyap777999@gmail.com",
  phones: ["+91-9803277171", "+91-7505973969"],
};

export const services = ["Branding", "Social Media", "Website UI", "App UI", "Packaging", "AI Visuals", "Posters", "Campaigns"];

export const about = {
  lead: "I shape ideas into bold, simple visuals for brands, feeds, websites and apps.",
  paragraphs: [
    "4+ years designing social creatives, brand identities, website & app UI and AI-generated visual content — across full-time and remote teams.",
    "Short and sweet: clear hierarchy, strong colour and type that delivers the message in a glance. High volume, tight deadlines, consistent brand identity.",
  ],
  image: B + "focus-03.webp",
  stats: [
    { value: 4, suffix: "+", label: "Years experience" },
    { value: 1000, suffix: "+", label: "Social creatives" },
    { value: 6, suffix: "", label: "Companies" },
  ],
};

// Work list (hover reveals a preview). img:null => typographic generated cover.
export const projects = [
  { title: "Lotus Puff", sub: "Makhana brand & packaging", cat: "Branding · Packaging", year: "2026", img: null, cover: { word: "LOTUS PUFF", from: "#f6c1d6", to: "#7a2d58", ink: "#2a0b1d" } },
  { title: "A Tasty Twist", sub: "Snack brand identity & pack", cat: "Branding · Packaging", year: "2025", img: B + "gallery-project-03.webp" },
  { title: "MyChamp11", sub: "Fantasy cricket app UI", cat: "Mobile App UI", year: "2024–25", img: null, cover: { word: "MyChamp11", from: "#5ce1ff", to: "#1a2a6c", ink: "#04121f" } },
  { title: "GrizonTech", sub: "Gaming & tech social creatives", cat: "Social Media", year: "2024–25", img: B + "gallery-poster-04.webp" },
  { title: "Landing Pages", sub: "Website & dashboard UI", cat: "Website UI", year: "2024–25", img: B + "gallery-banner-04.webp" },
  { title: "Starzlink", sub: "Education & immigration campaigns", cat: "Social · AI Reels", year: "2023–24", img: B + "gallery-social-05.webp" },
  { title: "Logo Suite", sub: "Horizon · Riwaaz · Exams Dojo", cat: "Logo Design", year: "2022–25", img: B + "gallery-logo-03.webp" },
  { title: "Shri Ram Inox", sub: "Steel industry branding", cat: "Branding", year: "2022", img: B + "gallery-poster-10.webp" },
];

// Horizontal gallery (his real creatives)
export const gallery = [
  { type: "image", src: B + "gallery-project-01.webp", cat: "Packaging" },
  { type: "video", src: B + "gallery-video-01.mp4", poster: B + "gallery-video-01-poster.webp", cat: "Reel" },
  { type: "image", src: B + "gallery-poster-02.webp", cat: "Poster" },
  { type: "image", src: B + "gallery-event-01.webp", cat: "Event" },
  { type: "image", src: B + "gallery-logo-01.webp", cat: "Logo" },
  { type: "image", src: B + "gallery-poster-06.webp", cat: "Poster" },
  { type: "video", src: B + "gallery-video-04.mp4", poster: B + "gallery-video-04-poster.webp", cat: "Reel" },
  { type: "image", src: B + "gallery-social-01.webp", cat: "Social" },
  { type: "image", src: B + "gallery-project-05.webp", cat: "Packaging" },
  { type: "image", src: B + "gallery-poster-11.webp", cat: "Poster" },
  { type: "image", src: B + "gallery-poster-07.webp", cat: "Social" },
  { type: "video", src: B + "gallery-video-05.mp4", poster: B + "gallery-video-05-poster.webp", cat: "Reel" },
  { type: "image", src: B + "gallery-poster-13.webp", cat: "Poster" },
  { type: "image", src: B + "gallery-social-10.webp", cat: "Social" },
];

// Textures for the orbiting 3D cards in the hero
export const orbitImages = [
  "gallery-project-03.webp", "gallery-poster-04.webp", "gallery-logo-01.webp", "gallery-poster-10.webp",
  "gallery-social-05.webp", "gallery-event-01.webp", "gallery-poster-06.webp", "gallery-poster-02.webp",
].map((f) => B + f);

export const experience = [
  { period: "Aug 2024 — Dec 2025", role: "Graphic & Web UI Designer", company: "GrizonTech", place: "Remote",
    points: ["Website UI layouts for landing & internal pages", "Mobile app UI screens for the “MyChamp11” fantasy cricket app", "Social creatives & graphic cards for the gaming brand", "Dashboard layouts & digital creatives for client platforms"] },
  { period: "Aug 2023 — Aug 2024", role: "Creative Graphic Designer", company: "Starzlink Corporation", place: "",
    points: ["Social media creatives & AI-based reels", "Branding visuals", "Campaign creative assets"] },
  { period: "Feb 2023 — Jul 2023", role: "Graphic Designer", company: "Digital Handlers India", place: "",
    points: ["High-volume social creatives — 12–13 per day across multiple client accounts"] },
  { period: "Jun 2022 — Dec 2022", role: "Graphic Designer", company: "VPro Infotech", place: "",
    points: ["Social media marketing graphics", "Branding & promotional materials", "Consistent visual themes across campaigns"] },
  { period: "Apr 2022 — Jun 2022", role: "Graphic Designer", company: "TTC Robotronics", place: "",
    points: ["Social creatives & branding visuals for steel industry projects"] },
  { period: "Feb 2020 — May 2020", role: "Graphic Designer", company: "Media Vox", place: "",
    points: ["Social creatives for immigration & property service brands"] },
];

export const tools = [
  { short: "Ps", name: "Photoshop", color: "#31a8ff", bg: "#001e36" },
  { short: "Ai", name: "Illustrator", color: "#ff9a00", bg: "#330000" },
  { short: "Fg", name: "Figma", color: "#a259ff", bg: "#1e1e1e" },
  { short: "Cv", name: "Canva", color: "#00c4cc", bg: "#062a2e" },
  { short: "AI", name: "AI Tools", color: "#d4ff3f", bg: "#1b2200" },
];

export const coreSkills = [
  "Social Media Creatives & Branding",
  "Website UI — landing & internal pages",
  "Mobile App UI Screens",
  "AI-generated Images, Videos & Reels",
  "Packaging & Print",
  "Digital Visual Content",
];

export const industries = ["Gaming", "Technology", "Real Estate", "Digital Marketing", "Food & Snacks", "Education", "Immigration", "Steel Industry", "Property Services"];

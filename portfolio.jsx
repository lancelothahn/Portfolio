const { useState, useEffect, useRef, useCallback } = React;

const PAGES = {
  COVER: "cover",
  MARKETING: "marketing",
  VOICE: "voice",
  SKILLS: "skills",
  CONTACT: "contact",
};

const PAGE_CHAPTERS = {
  [PAGES.COVER]: { num: "", title: "Cover" },
  [PAGES.MARKETING]: { num: "I", title: "Marketing & Strategy" },
  [PAGES.VOICE]: { num: "II", title: "Voice Acting" },
  [PAGES.SKILLS]: { num: "III", title: "About Me" },
  [PAGES.CONTACT]: { num: "IV", title: "Get in Touch" },
};

const noiseSVG = `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`;

const cream = "#F5ECD7";
const parchment = "#EDE0C8";
const warmWhite = "#FAF6EC";
const brown = "#6B3A1F";
const darkBrown = "#4A3728";
const medBrown = "#8B5A2B";
const lightBrown = "#A0896C";
const amber = "#B8860B";
const softAmber = "#D4A537";

function AudioPlayer({ tracks }) {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const intervalRef = useRef(null);

  const toggle = () => setPlaying((p) => !p);

  useEffect(() => {
    if (playing) {
      intervalRef.current = setInterval(() => {
        setProgress((p) => {
          if (p >= 100) { setPlaying(false); return 0; }
          return p + 0.5;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [playing]);

  const selectTrack = (i) => { setCurrent(i); setProgress(0); setPlaying(false); };

  return (
    <div style={{
      background: "linear-gradient(135deg, #2C1E12 0%, #3E2A1A 100%)",
      borderRadius: 14, padding: "28px 28px 20px", marginBottom: 30,
      boxShadow: "inset 0 2px 8px rgba(0,0,0,0.3), 0 4px 12px rgba(0,0,0,0.2)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
        <div style={{ fontSize: 28, color: softAmber, opacity: 0.8 }}>♫</div>
        <div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontWeight: 600, color: cream }}>{tracks[current].title}</div>
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, color: lightBrown, letterSpacing: 1 }}>{tracks[current].type}</div>
        </div>
      </div>
      <div style={{ width: "100%", height: 4, background: "rgba(160,137,108,0.2)", borderRadius: 2, position: "relative", marginBottom: 16 }}>
        <div style={{ height: "100%", background: `linear-gradient(90deg, ${amber}, ${softAmber})`, borderRadius: 2, transition: "width 0.1s linear", width: `${progress}%` }} />
        <div style={{ position: "absolute", top: -4, width: 12, height: 12, background: softAmber, borderRadius: "50%", transform: "translateX(-50%)", boxShadow: "0 0 6px rgba(212,165,55,0.4)", transition: "left 0.1s linear", left: `${progress}%` }} />
      </div>
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 20, marginBottom: 18 }}>
        <button onClick={() => selectTrack(Math.max(0, current - 1))} style={{ background: "none", border: "none", color: lightBrown, fontSize: 16, cursor: "pointer", padding: "6px 10px" }}>◂◂</button>
        <button onClick={toggle} style={{ background: "rgba(184,134,11,0.15)", border: `1px solid rgba(184,134,11,0.3)`, color: softAmber, fontSize: 18, cursor: "pointer", width: 48, height: 48, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{playing ? "❚❚" : "▶"}</button>
        <button onClick={() => selectTrack(Math.min(tracks.length - 1, current + 1))} style={{ background: "none", border: "none", color: lightBrown, fontSize: 16, cursor: "pointer", padding: "6px 10px" }}>▸▸</button>
      </div>
      <div style={{ borderTop: "1px solid rgba(160,137,108,0.15)", paddingTop: 8 }}>
        {tracks.map((t, i) => (
          <div key={i} onClick={() => selectTrack(i)} style={{
            display: "flex", alignItems: "center", gap: 12, padding: "9px 12px", cursor: "pointer", borderRadius: 8, transition: "all 0.2s ease",
            background: i === current ? "rgba(139,90,43,0.12)" : "transparent",
            borderLeft: i === current ? "3px solid #8B5A2B" : "3px solid transparent",
          }}>
            <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, color: lightBrown, opacity: 0.5, minWidth: 20 }}>{String(i + 1).padStart(2, "0")}</span>
            <span style={{ fontFamily: "'Lora', serif", fontSize: 13, color: cream, flex: 1 }}>{t.title}</span>
            <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 10, color: lightBrown, letterSpacing: 1, opacity: 0.6 }}>{t.type}</span>
            <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, color: lightBrown, opacity: 0.5, minWidth: 36, textAlign: "right" }}>{t.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function JournalEntry({ entry, index, featured }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: featured ? `linear-gradient(135deg, #FFF8E7, ${cream})` : `linear-gradient(135deg, ${warmWhite}, ${cream})`,
      border: "1px solid rgba(139,90,43,0.18)",
      borderLeft: featured ? `4px solid ${amber}` : "1px solid rgba(139,90,43,0.18)",
      borderRadius: 12, padding: "28px 32px", position: "relative", cursor: "default", overflow: "hidden",
      transition: "all 0.3s ease",
      transform: hovered ? "rotate(-0.3deg) translateY(-4px)" : `rotate(${index % 2 === 0 ? "0.4" : "-0.3"}deg)`,
      boxShadow: hovered ? "4px 6px 20px rgba(80,50,20,0.25)" : "2px 3px 10px rgba(80,50,20,0.12)",
    }}>
      {featured && <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 10, letterSpacing: 2, color: amber, marginBottom: 10 }}>★ FEATURED PROJECT</div>}
      <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 12, color: lightBrown, marginBottom: 6, letterSpacing: 1 }}>{entry.date}</div>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 700, color: brown, marginBottom: 10, lineHeight: 1.3 }}>{entry.title}</h3>
      <p style={{ fontFamily: "'Lora', serif", fontSize: 14, color: darkBrown, lineHeight: 1.75, marginBottom: 14 }}>{entry.description}</p>
      {entry.tags && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 12 }}>
          {entry.tags.map((t, i) => (
            <span key={i} style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, color: medBrown, background: "rgba(139,90,43,0.08)", padding: "3px 10px", borderRadius: 10, border: "1px solid rgba(139,90,43,0.12)", letterSpacing: 0.5 }}>{t}</span>
          ))}
        </div>
      )}
      {entry.outcome && (
        <div style={{ fontFamily: "'Lora', serif", fontSize: 13, color: brown, borderTop: "1px dashed rgba(139,90,43,0.2)", paddingTop: 10, fontStyle: "italic" }}>
          <span style={{ fontWeight: 600, fontStyle: "normal" }}>Outcome:</span> {entry.outcome}
        </div>
      )}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 24px 24px", borderColor: "transparent transparent rgba(139,90,43,0.08) transparent" }} />
    </div>
  );
}

function Tape({ rotation = -3, top = -8, left = "40%" }) {
  return <div style={{ position: "absolute", top, left, width: 80, height: 22, background: "rgba(210,180,120,0.45)", transform: `rotate(${rotation}deg)`, zIndex: 2, borderRadius: 1, boxShadow: "0 1px 3px rgba(0,0,0,0.1)" }} />;
}

function ProjectCard({ entry, index }) {
  const [hovered, setHovered] = useState(false);
  const fields = [
    { label: "Character", value: entry.character },
    { label: "Title", value: entry.title },
    { label: "Type", value: entry.type },
    { label: "Year", value: entry.year },
    { label: "Platform", value: entry.platform },
  ];
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{
      background: `linear-gradient(135deg, ${warmWhite}, ${cream})`,
      border: "1px solid rgba(139,90,43,0.18)",
      borderRadius: 12, padding: "26px 32px 22px", position: "relative", overflow: "hidden",
      transition: "all 0.3s ease",
      transform: hovered ? "rotate(-0.3deg) translateY(-4px)" : `rotate(${index % 2 === 0 ? "0.4" : "-0.3"}deg)`,
      boxShadow: hovered ? "4px 6px 20px rgba(80,50,20,0.25)" : "2px 3px 10px rgba(80,50,20,0.12)",
    }}>
      <div style={{ position: "absolute", top: 14, right: 18, fontFamily: "'Special Elite', cursive", fontSize: 10, letterSpacing: 2, color: lightBrown, opacity: 0.7 }}>No. {String(index + 1).padStart(2, "0")}</div>
      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", columnGap: 18, rowGap: 10, alignItems: "baseline" }}>
        {fields.map((f, i) => (
          <React.Fragment key={i}>
            <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: lightBrown, paddingTop: 4, whiteSpace: "nowrap" }}>{f.label}</div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 14, fontWeight: 500, color: darkBrown, lineHeight: 1.4, borderBottom: "1px dotted rgba(139,90,43,0.25)", paddingBottom: 4 }}>{f.value}</div>
          </React.Fragment>
        ))}
      </div>
      {entry.credit && (
        <div style={{ marginTop: 14, paddingTop: 10, borderTop: "1px dashed rgba(139,90,43,0.2)", fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 13, color: medBrown, textAlign: "right" }}>
          {entry.credit}
        </div>
      )}
      <div style={{ position: "absolute", bottom: 0, right: 0, width: 0, height: 0, borderStyle: "solid", borderWidth: "0 0 24px 24px", borderColor: "transparent transparent rgba(139,90,43,0.08) transparent" }} />
    </div>
  );
}

function Divider() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 14, margin: "36px 0" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(139,90,43,0.2), transparent)" }} />
      <span style={{ fontFamily: "serif", fontSize: 18, color: lightBrown, opacity: 0.5 }}>❧</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, rgba(139,90,43,0.2), transparent)" }} />
    </div>
  );
}

function ChapterHeader({ num, title, intro, featured }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 40, animation: "fadeInUp 0.6s ease" }}>
      {featured && <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, letterSpacing: 3, color: amber, marginBottom: 8, background: "linear-gradient(90deg, transparent, rgba(184,134,11,0.1), transparent)", padding: "4px 16px", display: "inline-block", borderRadius: 2 }}>★ PRIMARY DISCIPLINE ★</div>}
      <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 13, letterSpacing: 4, color: lightBrown, textTransform: "uppercase", display: "block" }}>Chapter {num}</span>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 700, color: brown, marginTop: 6, marginBottom: 12 }}>{title}</h2>
      <div style={{ width: 60, height: 2, background: `linear-gradient(90deg, transparent, ${medBrown}, transparent)`, margin: "0 auto 16px" }} />
      {intro && <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 15, color: lightBrown, maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>{intro}</p>}
    </div>
  );
}

function ResumeButton({ label = "Want the full story?" }) {
  return (
    <div style={{ textAlign: "center", padding: "20px 0 10px" }}>
      <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 14, color: lightBrown, marginBottom: 16 }}>{label}</div>
      <button className="resume-btn" style={{ background: "none", border: "none", cursor: "pointer", display: "inline-block", padding: 0 }}>
        <div style={{ width: 200, position: "relative" }}>
          <div style={{ width: "100%", height: 30, background: "linear-gradient(180deg, #C4A97D, #B89B6A)", clipPath: "polygon(0 0, 50% 100%, 100% 0)", marginBottom: -1 }} />
          <div style={{ background: "linear-gradient(180deg, #D4BA8A, #C4A97D)", padding: "20px 16px 18px", borderRadius: "0 0 4px 4px", border: "1px solid rgba(139,90,43,0.2)", borderTop: "none", textAlign: "center", position: "relative" }}>
            <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", width: 26, height: 26, background: "#B22222", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#F5ECD7", fontSize: 12, fontWeight: 700, boxShadow: "0 2px 6px rgba(0,0,0,0.2)" }}>✦</div>
            <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 13, color: darkBrown, letterSpacing: 1 }}>Download Résumé</span>
          </div>
        </div>
      </button>
    </div>
  );
}

/* ═══════ PAGE COMPONENTS ═══════ */

function CoverPage({ navigate }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 100); }, []);
  return (
    <div style={{ minHeight: "calc(100vh - 160px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "20px 0" }}>
      <div style={{ border: `2px solid ${medBrown}`, padding: 10, width: "100%", maxWidth: 820, borderRadius: 14 }}>
        <div style={{ border: "1px solid rgba(139,90,43,0.3)", padding: "72px 64px", position: "relative", background: `radial-gradient(ellipse at center, ${warmWhite} 0%, transparent 70%)`, borderRadius: 10 }}>
          {[
            { top: 10, left: 10 },
            { top: 10, right: 10 },
            { bottom: 10, left: 10, transform: "rotate(180deg)" },
            { bottom: 10, right: 10, transform: "rotate(180deg)" },
          ].map((pos, i) => (
            <span key={i} style={{ position: "absolute", fontFamily: "serif", fontSize: 28, color: medBrown, opacity: 0.5, lineHeight: 1, ...pos }}>❦</span>
          ))}
          <div style={{ textAlign: "center", transition: "all 0.8s ease", opacity: loaded ? 1 : 0, transform: loaded ? "translateY(0)" : "translateY(20px)" }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 68, fontWeight: 800, color: brown, lineHeight: 1.1, marginBottom: 16, letterSpacing: 2 }}>Lance Hahn</h1>
            <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 19, color: medBrown, letterSpacing: 5, marginBottom: 28 }}>Marketer · Voice Artist · Creator</div>
            <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 17, lineHeight: 1.7, color: lightBrown, maxWidth: 520, margin: "0 auto 32px" }}>
              "Crafting stories that resonate, strategies that convert,<br />and voices that linger."
            </div>
            <Divider />
            <div style={{ textAlign: "left", maxWidth: 480, margin: "0 auto" }}>
              <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 14, letterSpacing: 3, color: lightBrown, textTransform: "uppercase", marginBottom: 16, paddingBottom: 10, borderBottom: "1px solid rgba(139,90,43,0.15)" }}>Chapters</div>
              {[
                { p: PAGES.MARKETING, label: "I. Marketing & Strategy", star: true },
                { p: PAGES.VOICE, label: "II. Voice Acting" },
                { p: PAGES.SKILLS, label: "III. About Me" },
                { p: PAGES.CONTACT, label: "IV. Get in Touch" },
              ].map(({ p, label, star }) => (
                <button key={p} onClick={() => navigate(p)} className="cover-link" style={{
                  display: "block", width: "100%", padding: "13px 18px", background: "none", border: "none", cursor: "pointer",
                  fontFamily: "'Lora', serif", fontSize: 18, color: darkBrown, textAlign: "left", borderRadius: 6,
                  transition: "all 0.25s ease", fontWeight: star ? "700" : "400",
                }}>
                  {label}{star && <span style={{ marginLeft: 10, color: amber, fontSize: 15 }}>★ primary</span>}
                </button>
              ))}
            </div>
            <div style={{ marginTop: 40, display: "inline-block", animation: "stampPress 0.6s ease 1s both" }}>
              <div style={{ fontFamily: "'Special Elite', cursive", fontWeight: 700, color: "#B22222", border: "2.5px solid #B22222", borderRadius: "50%", width: 120, height: 120, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", transform: "rotate(-12deg)", opacity: 0.7, letterSpacing: 1, padding: 8 }}>
                <span style={{ fontSize: 12, lineHeight: 1.2 }}>OPEN FOR</span>
                <span style={{ fontSize: 14, letterSpacing: 3, lineHeight: 1.2 }}>OPPORTUNITIES</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketingPage() {
  const entries = [
    { date: "Jan. 2025 – Apr. 2025", title: "Media Resident — VaynerMedia", description: "Tracked and reported on key asset and campaign performance metrics to clients. Built out paid advertising campaigns utilizing TikTok, Meta, and Google Ads Manager. Developed firsthand experience with platform best practices by creating and experimenting with content on a fresh account, reaching 900 views on highest performing assets in a 30-day period.", tags: ["Paid Social", "TikTok Ads", "Meta Ads", "Google Ads", "Campaign Analytics"], outcome: "900 views on top-performing assets within 30 days on a fresh account." },
    { date: "Sep. 2022 – Feb. 2023", title: "Marketing & Administrative Assistant — Emory Arts & Social Justice", description: "Strengthened Instagram engagement (likes, shares) by 29-fold and increased followers by 21.2%. Created biweekly Instagram posts that increased brand awareness and audience interaction. Managed social media logistics including organizing a content calendar and designing promotional materials.", tags: ["Social Media Management", "Content Calendar", "Instagram", "Brand Awareness", "Graphic Design"], outcome: "29x increase in engagement; 21.2% follower growth." },
    { date: "May 2023 – Aug. 2023", title: "Digital Media Intern — Carahsoft", description: "Coordinated clear communication between cross-functional teams, ensuring key stakeholders had visibility on 100+ vendor updates and news. Collaborated with team members to review and improve slide decks aligned with current messaging and branding guidelines. Learned professional email copywriting in a business setting while utilizing brand messaging. Collected data across teams to help update the company website.", tags: ["Cross-Functional Communication", "Brand Messaging", "Copywriting", "Stakeholder Management", "Website Content"], outcome: "Managed communications across 100+ vendor relationships." },
  ];
  return (
    <div>
      <ChapterHeader num="I" title="Marketing & Strategy" featured />
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {entries.map((e, i) => <JournalEntry key={i} entry={e} index={i} featured={i === 0} />)}
      </div>
      <Divider />
      <ResumeButton />
    </div>
  );
}

function VoiceActingPage() {
  const tracks = [
    { title: "Track Title", type: "Type", duration: "0:00" },
  ];
  const entries = [
    { character: "Rylee Sinclair", title: "Knee Deep! In Love — Demo", type: "Visual Novel", year: "2026", platform: "PC · Comfort Kuma Studios", credit: "Dir. Lauren Baker" },
  ];
  const studio = ["Rodecaster Duo", "Rode NT1 Signature", "Hardwired Ethernet", "Reaper"];
  return (
    <div>
      <ChapterHeader num="II" title="Voice Acting" />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: brown, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18, opacity: 0.7 }}>🎧</span> Demo Reel & Samples
      </div>
      <AudioPlayer tracks={tracks} />
      <Divider />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: brown, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18, opacity: 0.7 }}>📎</span> Selected Projects
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {entries.map((e, i) => <ProjectCard key={i} entry={e} index={i} />)}
      </div>
      <Divider />
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: brown, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18, opacity: 0.7 }}>🎙</span> My Studio
      </div>
      <div style={{ background: `linear-gradient(160deg, ${warmWhite}, ${cream})`, border: "1px solid rgba(139,90,43,0.15)", borderRadius: 14, padding: "24px 28px", display: "flex", flexWrap: "wrap", gap: 10 }}>
        {studio.map((item, i) => (
          <span key={i} style={{ fontFamily: "'Special Elite', cursive", fontSize: 13, color: darkBrown, background: "rgba(139,90,43,0.07)", border: "1px solid rgba(139,90,43,0.12)", padding: "6px 16px", borderRadius: 20, letterSpacing: 0.5 }}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function SkillsPage() {
  const paragraphs = [
    "From a young age I've always loved shouting lines from kids shows, imitating emotional deliveries, and being the reader for English classes. Feeling was fun, and experiencing all these feelings through sympathizing with characters and events opened my eyes to the world more and more each day.",
    "Voice Acting has allowed me to keep doing so while creating unforgettable experiences for both myself and others.",
    "Outside of Voice Acting I currently work as a Marketing Associate, make content on a secret account, and enjoy playing many games — including the Riftbound TCG.",
    "I'm a graduate from Emory University's Goizueta Business School with a focus on Marketing and Management. I am currently based in Denver, Colorado, where I work while also pursuing content creation and voice acting.",
  ];
  const facts = [
    { label: "Based in", value: "Denver, Colorado" },
    { label: "Alma mater", value: "Emory University · Goizueta Business School" },
    { label: "By day", value: "Marketing Associate" },
    { label: "By night", value: "Voice Actor & Content Creator" },
    { label: "Currently obsessed with", value: "Riftbound TCG" },
  ];
  return (
    <div>
      <ChapterHeader num="III" title="About Me" intro="A short note from the desk of —" />

      {/* Signature-style name banner */}
      <div style={{ textAlign: "center", marginBottom: 36 }}>
        <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, letterSpacing: 4, color: lightBrown, marginBottom: 6, textTransform: "uppercase" }}>— signed —</div>
        <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 46, fontWeight: 700, color: brown, lineHeight: 1.1 }}>Lance Hahn</div>
        <div style={{ width: 140, height: 1, background: `linear-gradient(90deg, transparent, ${medBrown}, transparent)`, margin: "10px auto 0" }} />
      </div>

      {/* Letter card */}
      <div style={{
        background: `linear-gradient(160deg, ${warmWhite}, ${cream})`,
        border: "1px solid rgba(139,90,43,0.18)",
        borderRadius: 12,
        padding: "44px 48px 40px",
        position: "relative",
        boxShadow: "2px 3px 14px rgba(80,50,20,0.14)",
      }}>
        <Tape rotation={-3} top={-10} left="46%" />
        <div style={{ position: "absolute", top: 18, right: 22, fontFamily: "'Special Elite', cursive", fontSize: 11, letterSpacing: 2, color: lightBrown, opacity: 0.7 }}>Ch. III · About</div>

        {paragraphs.map((p, i) => (
          <p key={i} style={{
            fontFamily: "'Lora', serif",
            fontSize: 15,
            lineHeight: 1.85,
            color: darkBrown,
            marginBottom: i === paragraphs.length - 1 ? 0 : 18,
            textIndent: i === 0 ? 0 : 0,
          }}>
            {i === 0 && <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 800, color: brown, float: "left", lineHeight: 0.9, marginRight: 10, marginTop: 6 }}>F</span>}
            {i === 0 ? p.slice(1) : p}
          </p>
        ))}

        {/* Sign-off */}
        <div style={{ marginTop: 28, textAlign: "right" }}>
          <div style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 14, color: medBrown, marginBottom: 4 }}>— with care,</div>
          <div style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 26, fontWeight: 700, color: brown }}>Lance</div>
        </div>
      </div>

      <Divider />

      {/* Quick facts ledger */}
      <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: brown, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 18, opacity: 0.7 }}>📓</span> A Few Quick Facts
      </div>
      <div style={{
        background: `linear-gradient(160deg, ${warmWhite}, ${cream})`,
        border: "1px solid rgba(139,90,43,0.15)",
        borderRadius: 14,
        padding: "26px 30px",
        display: "grid",
        gridTemplateColumns: "auto 1fr",
        columnGap: 24,
        rowGap: 12,
        alignItems: "baseline",
      }}>
        {facts.map((f, i) => (
          <React.Fragment key={i}>
            <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, letterSpacing: 2, textTransform: "uppercase", color: lightBrown, whiteSpace: "nowrap" }}>{f.label}</div>
            <div style={{ fontFamily: "'Lora', serif", fontSize: 14, fontWeight: 500, color: darkBrown, borderBottom: "1px dotted rgba(139,90,43,0.25)", paddingBottom: 4 }}>{f.value}</div>
          </React.Fragment>
        ))}
      </div>

      <Divider />
      <ResumeButton label="For the complete picture —" />
    </div>
  );
}

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <div>
      <ChapterHeader num="IV" title="Get in Touch" />
      <div style={{ maxWidth: 560, margin: "0 auto", animation: "fadeInUp 0.6s ease 0.2s both" }}>
        <div style={{ textAlign: "center", marginBottom: 10 }}>
          <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 15, lineHeight: 1.7, color: darkBrown, marginBottom: 24 }}>
            If you've read this far, I'd love to hear from you. Whether it's a marketing role, a voice project, a creative collaboration, or just a conversation — my inbox is open.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10, alignItems: "center" }}>
            {[
              { icon: "✉", text: "lancejhahn@gmail.com", sub: "general", href: "mailto:lancejhahn@gmail.com" },
              { icon: "✉", text: "lancehahnVA@gmail.com", sub: "voice acting inquiries", href: "mailto:lancehahnVA@gmail.com" },
              { icon: "☎", text: "714-499-2257" },
              { icon: "⊕", text: "LinkedIn", href: "https://www.linkedin.com/" },
              { icon: "✕", text: "@lancelothahn", sub: "x.com", href: "https://x.com/lancelothahn" },
            ].map((c, i) => {
              const inner = (
                <>
                  <span style={{ fontSize: 16, opacity: 0.6, width: 22, textAlign: "center" }}>{c.icon}</span>
                  <span>{c.text}</span>
                  {c.sub && <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 11, color: lightBrown, letterSpacing: 1, opacity: 0.75 }}>— {c.sub}</span>}
                </>
              );
              const baseStyle = { display: "flex", alignItems: "center", gap: 10, fontFamily: "'Lora', serif", fontSize: 14, color: medBrown };
              return c.href ? (
                <a key={i} href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined} className="contact-link" style={{ ...baseStyle, textDecoration: "underline", textDecorationColor: "rgba(139,90,43,0.35)", textDecorationThickness: 1, textUnderlineOffset: 3, transition: "color 0.2s ease" }}>{inner}</a>
              ) : (
                <div key={i} style={baseStyle}>{inner}</div>
              );
            })}
          </div>
        </div>
        <Divider />
        {!sent ? (
          <div style={{ background: `linear-gradient(160deg, ${warmWhite}, ${cream})`, border: "1px solid rgba(139,90,43,0.15)", borderRadius: 4, padding: "28px 28px 24px" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 600, color: brown, marginBottom: 20, textAlign: "center" }}>Leave a Note</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[{ l: "Name", p: "Your name" }, { l: "Email", p: "Your email" }].map((f, i) => (
                <div key={i} style={{ marginBottom: 0 }}>
                  <label style={{ display: "block", fontFamily: "'Special Elite', cursive", fontSize: 12, color: lightBrown, letterSpacing: 1, marginBottom: 6 }}>{f.l}</label>
                  <input style={{ width: "100%", padding: "10px 14px", fontFamily: "'Lora', serif", fontSize: 14, color: darkBrown, background: "rgba(250,246,236,0.6)", border: "1px solid rgba(139,90,43,0.18)", borderRadius: 3, outline: "none" }} placeholder={f.p} />
                </div>
              ))}
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontFamily: "'Special Elite', cursive", fontSize: 12, color: lightBrown, letterSpacing: 1, marginBottom: 6 }}>Subject</label>
              <input style={{ width: "100%", padding: "10px 14px", fontFamily: "'Lora', serif", fontSize: 14, color: darkBrown, background: "rgba(250,246,236,0.6)", border: "1px solid rgba(139,90,43,0.18)", borderRadius: 3, outline: "none" }} placeholder="What's this about?" />
            </div>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: "block", fontFamily: "'Special Elite', cursive", fontSize: 12, color: lightBrown, letterSpacing: 1, marginBottom: 6 }}>Message</label>
              <textarea rows={5} style={{ width: "100%", padding: "10px 14px", fontFamily: "'Lora', serif", fontSize: 14, color: darkBrown, background: "rgba(250,246,236,0.6)", border: "1px solid rgba(139,90,43,0.18)", borderRadius: 3, outline: "none", resize: "vertical" }} placeholder="Write your message here..." />
            </div>
            <button onClick={() => setSent(true)} className="resume-btn" style={{ width: "100%", padding: "13px 20px", fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: cream, background: `linear-gradient(135deg, ${brown}, ${medBrown})`, border: "none", borderRadius: 4, cursor: "pointer", letterSpacing: 1 }}>
              Seal & Send ✦
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", animation: "fadeInUp 0.5s ease" }}>
            <div style={{ fontSize: 36, color: amber, marginBottom: 12 }}>✦</div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 700, color: brown, marginBottom: 10 }}>Message Sent</div>
            <p style={{ fontFamily: "'Lora', serif", fontStyle: "italic", fontSize: 14, color: lightBrown, lineHeight: 1.6 }}>Your note has been sealed and delivered. I'll get back to you soon — thanks for reaching out.</p>
          </div>
        )}
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <div style={{ display: "inline-block", border: "1px dashed rgba(139,90,43,0.25)", borderRadius: 3, padding: "20px 30px" }}>
            <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 13, color: lightBrown, lineHeight: 1.7, letterSpacing: 0.5 }}>
              This journal belongs to<br /><strong>Lance Hahn</strong><br />If found, please return with job offers.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════ MAIN APP ═══════ */

function VintagePortfolio() {
  const [page, setPage] = useState(PAGES.COVER);
  const [transitioning, setTransitioning] = useState(false);
  const [tocOpen, setTocOpen] = useState(false);
  const contentRef = useRef(null);

  const navigate = useCallback((p) => {
    if (p === page) { setTocOpen(false); return; }
    setTransitioning(true);
    setTocOpen(false);
    setTimeout(() => {
      setPage(p);
      setTransitioning(false);
      if (contentRef.current) contentRef.current.scrollTop = 0;
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 400);
  }, [page]);

  return (
    <div data-screen-label={`Page · ${PAGE_CHAPTERS[page].title}`} style={{ minHeight: "100vh", background: "linear-gradient(135deg, #E8DECE 0%, #DDD0BC 100%)", display: "flex", flexDirection: "column", alignItems: "center", fontFamily: "'Lora', serif", position: "relative" }}>
      {/* Binding */}
      <div style={{ position: "fixed", left: 0, top: 0, width: 12, height: "100vh", background: "linear-gradient(90deg, #CBBFAA, #D5C9B4, #CBBFAA)", zIndex: 100, boxShadow: "2px 0 8px rgba(0,0,0,0.15)" }} />

      {/* TOC Sidebar — legal-pad notepad */}
      <nav style={{
        position: "fixed", top: 0, left: 0, width: 290, height: "100vh",
        backgroundColor: "#FAEFA8",
        backgroundImage: `repeating-linear-gradient(to bottom, transparent 0, transparent 33px, rgba(60,90,180,0.32) 33px, rgba(60,90,180,0.32) 34px), linear-gradient(180deg, rgba(255,255,255,0.18) 0%, rgba(0,0,0,0.04) 100%)`,
        backgroundAttachment: "local",
        zIndex: 200,
        paddingTop: 0,
        transition: "transform 0.35s cubic-bezier(0.4,0,0.2,1)",
        boxShadow: "6px 0 24px rgba(40,30,15,0.35), inset -3px 0 6px rgba(0,0,0,0.06)",
        display: "flex", flexDirection: "column",
        transform: tocOpen ? "translateX(0)" : "translateX(-100%)",
        borderRight: "1px solid rgba(120,90,40,0.25)",
      }}>
        {/* Red left margin rule */}
        <div style={{ position: "absolute", top: 0, left: 44, width: 1, height: "100%", background: "rgba(200,40,40,0.55)", zIndex: 1, pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 46, width: 1, height: "100%", background: "rgba(200,40,40,0.25)", zIndex: 1, pointerEvents: "none" }} />

        {/* Spiral binding holes */}
        <div style={{ position: "absolute", top: 0, left: 14, width: 16, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around", paddingTop: 24, paddingBottom: 24, zIndex: 1, pointerEvents: "none" }}>
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} style={{
              width: 14, height: 14, borderRadius: "50%",
              background: "radial-gradient(circle at 35% 35%, #2A1F12 0%, #1A1208 60%, #0E0905 100%)",
              boxShadow: "inset 1px 1px 2px rgba(0,0,0,0.6), inset -1px -1px 1px rgba(255,255,255,0.06), 0 1px 0 rgba(255,255,255,0.4)",
            }} />
          ))}
        </div>

        <div style={{ position: "relative", zIndex: 2, paddingTop: 30, display: "flex", flexDirection: "column", flex: 1, minHeight: 0 }}>
          <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 18, fontWeight: 700, color: "#3A2A18", padding: "0 24px 14px 64px", letterSpacing: 1, lineHeight: "34px" }}>Table of Contents</div>

          {Object.entries(PAGE_CHAPTERS).map(([key, ch]) => (
            <button key={key} onClick={() => navigate(key)} className="toc-line" style={{
              display: "flex", alignItems: "center", gap: 10,
              width: "100%", padding: "0 24px 0 64px", height: 34,
              border: "none", cursor: "pointer", background: "transparent",
              fontFamily: "'Special Elite', cursive", fontSize: 15, textAlign: "left",
              transition: "all 0.18s ease",
              fontWeight: page === key ? 700 : 400,
              color: page === key ? "#1F3A6B" : "#2C3A5C",
              textDecoration: page === key ? "underline" : "none",
              textUnderlineOffset: 4,
              lineHeight: "34px",
            }}>
              {ch.num && <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 12, color: "#7A4A1F", minWidth: 32, opacity: 0.85 }}>{ch.num}.</span>}
              <span style={{ flex: 1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ch.title}</span>
              {key === PAGES.MARKETING && <span style={{ color: "#B8860B", fontSize: 13 }}>★</span>}
            </button>
          ))}

          <div style={{ height: 34 }} />

          {/* Doodle / scribble */}
          <div style={{ padding: "0 24px 0 64px", height: 34, lineHeight: "34px", fontFamily: "'Special Elite', cursive", fontSize: 13, color: "#2C3A5C", opacity: 0.7 }}>
            ✦ open for opportunities
          </div>

          <div style={{ marginTop: "auto", padding: "16px 24px 28px 64px" }}>
            <div style={{ fontFamily: "'Special Elite', cursive", fontSize: 12, color: "#7A4A1F", lineHeight: "34px", opacity: 0.85 }}>— portfolio journal —</div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header style={{ position: "sticky", top: 0, width: "100%", maxWidth: 900, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 24px", background: "rgba(222,212,196,0.95)", backdropFilter: "blur(10px)", zIndex: 50, borderBottom: "1px solid rgba(160,137,108,0.3)", borderRadius: "0 0 12px 12px" }}>
        <button onClick={() => setTocOpen((o) => !o)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer", padding: "6px 10px", borderRadius: 4 }} title="Table of Contents">
          <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
            <span style={{ display: "block", width: 22, height: 2, background: darkBrown, borderRadius: 1 }} />
            <span style={{ display: "block", width: 18, height: 2, background: darkBrown, borderRadius: 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: darkBrown, borderRadius: 1 }} />
          </div>
          <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 12, color: lightBrown, letterSpacing: 1 }}>Contents</span>
        </button>
        <button onClick={() => navigate(PAGES.COVER)} style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: brown, background: "none", border: "none", cursor: "pointer", letterSpacing: 1 }}>✦ My Portfolio</button>
        <span style={{ fontFamily: "'Special Elite', cursive", fontSize: 12, color: lightBrown, letterSpacing: 2 }}>{PAGE_CHAPTERS[page].num ? `Ch. ${PAGE_CHAPTERS[page].num}` : "Cover"}</span>
      </header>

      {/* Overlay */}
      {tocOpen && <div onClick={() => setTocOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 150 }} />}

      {/* Content */}
      <main ref={contentRef} style={{
        width: "100%", maxWidth: 900, minHeight: "calc(100vh - 100px)",
        background: `linear-gradient(175deg, ${warmWhite} 0%, ${cream} 40%, ${parchment} 100%)`,
        backgroundImage: noiseSVG, position: "relative",
        transition: "opacity 0.4s ease, transform 0.4s ease", transformOrigin: "left center",
        opacity: transitioning ? 0 : 1, transform: transitioning ? "rotateY(-4deg) scale(0.97)" : "rotateY(0) scale(1)",
        boxShadow: "0 4px 40px rgba(0,0,0,0.12), 0 1px 3px rgba(0,0,0,0.08), inset 0 0 80px rgba(139,90,43,0.05)",
        borderRadius: 16,
      }}>
        <div style={{ padding: "30px 40px 60px", minHeight: "calc(100vh - 100px)" }}>
          {page === PAGES.COVER && <CoverPage navigate={navigate} />}
          {page === PAGES.MARKETING && <MarketingPage />}
          {page === PAGES.VOICE && <VoiceActingPage />}
          {page === PAGES.SKILLS && <SkillsPage />}
          {page === PAGES.CONTACT && <ContactPage />}
        </div>
        <div style={{ position: "absolute", right: 0, top: 0, width: 6, height: "100%", background: "linear-gradient(90deg, transparent, rgba(0,0,0,0.06))" }} />
      </main>

      {/* Footer nav */}
      <footer style={{ width: "100%", maxWidth: 900, display: "flex", justifyContent: "center", gap: 4, padding: "8px 24px", background: "rgba(222,212,196,0.95)", borderTop: "1px solid rgba(160,137,108,0.2)", borderRadius: "12px 12px 0 0" }}>
        {Object.entries(PAGE_CHAPTERS).filter(([k]) => k !== PAGES.COVER).map(([key, ch]) => (
          <button key={key} onClick={() => navigate(key)} style={{
            fontFamily: "'Special Elite', cursive", fontSize: 13, color: brown, background: "none", border: "none", cursor: "pointer",
            padding: "6px 14px", transition: "all 0.2s ease", letterSpacing: 1,
            opacity: page === key ? 1 : 0.55, borderBottom: page === key ? "2px solid #8B5A2B" : "2px solid transparent",
          }}>{ch.num}</button>
        ))}
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<VintagePortfolio />);

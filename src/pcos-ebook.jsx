import { useState, useEffect } from "react";

function useWindowWidth() {
  const [width, setWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 1024);
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handle);
    return () => window.removeEventListener("resize", handle);
  }, []);
  return width;
}

const PCOS_TYPES = {
  insulin: {
    id: "insulin", name: "Insulin-Resistant PCOS", emoji: "🩸",
    color: "#C17F5A", bg: "#FDF3EC",
    tagline: "The most common type — your body's sugar regulation is at the root",
    description: "Insulin-Resistant PCOS is the most prevalent form, affecting up to 70% of women with PCOS. When your cells stop responding properly to insulin, your pancreas pumps out more of it — and that excess insulin signals your ovaries to produce extra androgens (male hormones) like testosterone. This hormonal imbalance disrupts ovulation, causing irregular or absent periods, and making conception harder.",
    symptoms: ["Irregular or absent periods", "Weight gain — especially around the belly", "Sugar cravings and energy crashes after meals", "Skin tags or darkened skin folds (acanthosis nigricans)", "Fatigue after eating carbohydrates", "Difficulty losing weight despite effort"],
    fertilityImpact: "Excess insulin directly suppresses ovulation. Without regular ovulation, there's no egg to fertilize — making cycle regularity the #1 priority for this type.",
    naturalPath: ["Low-glycemic, anti-inflammatory diet", "Inositol (Myo + D-Chiro ratio 40:1) — clinically shown to restore ovulation", "Berberine — natural insulin sensitizer", "Strength training + walking (30 min daily)", "Reducing refined sugar and processed carbs"],
    hopeStat: "Studies show up to 60% of women with IR-PCOS restore ovulation within 3–6 months of dietary changes alone.",
  },
  adrenal: {
    id: "adrenal", name: "Adrenal PCOS", emoji: "⚡",
    color: "#8B6BAE", bg: "#F3EEF8",
    tagline: "Stress is your trigger — your adrenal glands are running the show",
    description: "Adrenal PCOS is driven by an overactive stress response. Your adrenal glands produce a specific androgen called DHEA-S. In this type of PCOS, those glands are in overdrive, pumping out excess androgens in response to chronic stress — whether physical, emotional, or lifestyle-based. Importantly, insulin levels are often normal in this type.",
    symptoms: ["Elevated DHEA-S on blood work (normal testosterone)", "Anxiety, burnout, or feeling 'wired but tired'", "Acne — especially on the jawline and chin", "Hair thinning or loss", "Sleep disturbances and waking at 3–4am", "Symptoms worsen significantly during stressful periods"],
    fertilityImpact: "Elevated cortisol from chronic stress directly suppresses GnRH — the hormone that kickstarts your entire ovulation cascade. No GnRH signal = no ovulation.",
    naturalPath: ["Nervous system regulation (breathwork, somatic practices)", "Adaptogenic herbs: Ashwagandha, Rhodiola, Holy Basil", "Strict sleep hygiene (cortisol resets at night)", "Reducing intense cardio — walk, swim, yoga instead", "Magnesium glycinate for cortisol + sleep support"],
    hopeStat: "Women with Adrenal PCOS often see the fastest results when stress reduction is prioritized — some restore cycles within 8–12 weeks.",
  },
  inflammatory: {
    id: "inflammatory", name: "Inflammatory PCOS", emoji: "🔥",
    color: "#C45C5C", bg: "#FAEAEA",
    tagline: "Your immune system is inflamed — and it's blocking your hormones",
    description: "Inflammatory PCOS occurs when chronic, low-grade inflammation triggers the ovaries to produce excess androgens. This inflammation can come from food sensitivities (especially gluten and dairy), gut dysbiosis, environmental toxins, or underlying autoimmune activity. It's often overlooked because standard PCOS panels don't test for inflammatory markers.",
    symptoms: ["Headaches or migraines", "Chronic fatigue not explained by sleep", "Eczema, skin rashes, or psoriasis", "Digestive issues — bloating, IBS-like symptoms", "Joint pain or body aches", "Elevated CRP or inflammatory markers on bloodwork"],
    fertilityImpact: "Inflammation impairs egg quality, disrupts the uterine lining, and interferes with implantation — meaning even if ovulation occurs, conception can still be blocked.",
    naturalPath: ["Anti-inflammatory diet: Mediterranean-style, omega-3 rich", "Eliminate common triggers: gluten, dairy, seed oils", "Heal the gut: probiotics, bone broth, fermented foods", "Curcumin (turmeric extract) — powerful anti-inflammatory", "Test for food sensitivities and autoimmune markers"],
    hopeStat: "Removing inflammatory food triggers alone has been shown to significantly reduce androgen levels and restore cycle regularity within 3 months.",
  },
  postPill: {
    id: "postPill", name: "Post-Pill PCOS", emoji: "💊",
    color: "#4A8FA3", bg: "#EBF4F7",
    tagline: "Your hormones are recalibrating after stopping birth control",
    description: "Post-Pill PCOS develops after stopping hormonal birth control. The pill suppresses your natural hormone production, and when you stop, there can be a temporary surge in androgens and LH as your body tries to reboot its own hormonal system. This is often a temporary condition, but it can persist and mimic other PCOS types if not addressed.",
    symptoms: ["Regular periods before the pill, irregular after stopping", "Sudden onset acne after going off the pill", "Hair shedding or loss post-pill", "Mood swings and anxiety", "Absence of periods for 3+ months after stopping", "Symptoms appeared within 3–6 months of stopping birth control"],
    fertilityImpact: "The pill depletes key fertility nutrients (B6, B12, folate, zinc, magnesium) and can disrupt gut microbiome — both essential for a healthy hormonal environment for conception.",
    naturalPath: ["Replenish depleted nutrients: methylfolate, B-complex, zinc, magnesium", "Support liver detox to clear synthetic hormones", "Vitex (Chaste Tree Berry) to re-regulate LH/FSH ratio", "Seed cycling to gently reintroduce natural hormone rhythms", "Give your body 3–6 months of nutritional support before additional interventions"],
    hopeStat: "Post-Pill PCOS is often the most reversible type. With proper nutritional support, most women restore ovulatory cycles within 3–6 months.",
  },
};

const QUIZ_QUESTIONS = [
  { id: 1, question: "How would you describe your weight and metabolism?", options: [{ text: "I gain weight easily, especially in my belly, and struggle to lose it", scores: { insulin: 3, adrenal: 1 } }, { text: "My weight is fairly stable but I feel puffy or inflamed", scores: { inflammatory: 3 } }, { text: "I'm at a normal weight — PCOS symptoms seem unrelated to weight", scores: { adrenal: 2, postPill: 1 } }, { text: "I gained weight after stopping birth control", scores: { postPill: 3 } }] },
  { id: 2, question: "What does your stress and energy level feel like most days?", options: [{ text: "I'm constantly overwhelmed, anxious, or burned out", scores: { adrenal: 3 } }, { text: "I crash after meals and feel foggy — my energy is unpredictable", scores: { insulin: 3 } }, { text: "I'm exhausted no matter how much I sleep", scores: { inflammatory: 3 } }, { text: "My energy was fine until I stopped the pill", scores: { postPill: 3 } }] },
  { id: 3, question: "What does your skin and hair look like?", options: [{ text: "Acne on my jawline, chin — gets worse when I'm stressed", scores: { adrenal: 3 } }, { text: "Acne + oily skin + dark patches on my neck or underarms", scores: { insulin: 3 } }, { text: "Eczema, rashes, or skin that reacts easily to food or products", scores: { inflammatory: 3 } }, { text: "My skin and hair were fine on the pill — problems started after stopping", scores: { postPill: 3 } }] },
  { id: 4, question: "What are your eating patterns like?", options: [{ text: "I crave sugar and carbs constantly — hard to feel satisfied", scores: { insulin: 3 } }, { text: "I eat pretty well but my body still reacts — bloating, fatigue after meals", scores: { inflammatory: 3 } }, { text: "I eat when I can — stress makes me forget to eat or overeat", scores: { adrenal: 2 } }, { text: "My diet is fine — hormones feel 'off' despite eating well", scores: { postPill: 2, adrenal: 1 } }] },
  { id: 5, question: "When did your PCOS symptoms begin or get worse?", options: [{ text: "Gradually over the years — always had irregular cycles", scores: { insulin: 2, inflammatory: 2 } }, { text: "During an extremely stressful period in my life", scores: { adrenal: 3 } }, { text: "After a major health event, illness, or dietary change", scores: { inflammatory: 3 } }, { text: "Shortly after stopping hormonal birth control", scores: { postPill: 3 } }] },
  { id: 6, question: "Do you experience any of these physical symptoms regularly?", options: [{ text: "Joint pain, headaches, or chronic low-grade inflammation", scores: { inflammatory: 3 } }, { text: "Heart racing, anxiety, poor sleep, waking at night", scores: { adrenal: 3 } }, { text: "Dark skin patches, skin tags, or strong sugar cravings", scores: { insulin: 3 } }, { text: "Hair loss, mood swings — all starting after stopping birth control", scores: { postPill: 3 } }] },
];

const CHAPTERS = [
  { id: "intro", title: "Introduction", icon: "🌿" },
  { id: "ch1", title: "Ch 1: Why Holistic Healing Works", icon: "💡" },
  { id: "ch2", title: "Ch 2: Eat to Heal", icon: "🥗" },
  { id: "ch3", title: "Ch 3: Nature's Medicine Cabinet", icon: "🌿" },
  { id: "ch4", title: "Ch 4: Calm the Storm", icon: "🧘‍♀️" },
  { id: "ch5", title: "Ch 5: Know Your Cycle", icon: "📅" },
  { id: "ch6", title: "Ch 6: Move to Conceive", icon: "🏃‍♀️" },
  { id: "ch7", title: "Ch 7: Real Results", icon: "💛" },
  { id: "ch8", title: "Ch 8: 30-Day Plan", icon: "📋" },
];

export default function PCOSEbook() {
  const width = useWindowWidth();
  const isMobile = width < 768;
  const [screen, setScreen] = useState("cover");
  const [quizStep, setQuizStep] = useState(0);
  const [scores, setScores] = useState({ insulin: 0, adrenal: 0, inflammatory: 0, postPill: 0 });
  const [pcosType, setPcosType] = useState(null);
  const [activeChapter, setActiveChapter] = useState("intro");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [completedChapters, setCompletedChapters] = useState(new Set());

  const handleAnswer = (optionScores) => {
    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([t, pts]) => { newScores[t] = (newScores[t] || 0) + pts; });
    setScores(newScores);
    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 280);
    } else {
      const topType = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setPcosType(topType);
      setTimeout(() => setScreen("result"), 380);
    }
  };

  const enterEbook = () => { setScreen("chapter"); setActiveChapter("intro"); };
  const markComplete = (id) => setCompletedChapters(new Set([...completedChapters, id]));
  const type = PCOS_TYPES[pcosType];

  const goToChapter = (id) => { setActiveChapter(id); setDrawerOpen(false); if (typeof window !== "undefined") window.scrollTo(0, 0); };

  return (
    <div style={{ fontFamily: "Georgia, serif", minHeight: "100vh", background: "#FBF7F2", color: "#2D2416" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { overflow-x: hidden; }
        body { background: #FBF7F2; overflow-x: hidden; -webkit-text-size-adjust: 100%; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'Lato', sans-serif; }
        .btn-primary {
          background: #B06E4A; color: white; border: none;
          padding: 15px 36px; font-size: 15px; font-family: 'Lato', sans-serif;
          font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; border-radius: 4px; transition: background 0.2s;
          touch-action: manipulation;
        }
        .btn-primary:active { background: #8F5535; }
        .btn-ghost {
          background: transparent; color: #B06E4A; border: 2px solid #B06E4A;
          padding: 13px 28px; font-size: 14px; font-family: 'Lato', sans-serif;
          font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;
          cursor: pointer; border-radius: 4px; transition: all 0.2s;
          touch-action: manipulation;
        }
        .btn-ghost:active { background: #B06E4A; color: white; }
        .answer-card {
          background: white; border: 2px solid #E8DDD2; border-radius: 8px;
          padding: 15px 18px; cursor: pointer; transition: border-color 0.15s, background 0.15s;
          text-align: left; width: 100%; font-family: 'Lato', sans-serif;
          font-size: 15px; color: #2D2416; line-height: 1.5;
          margin-bottom: 11px; display: block; touch-action: manipulation;
        }
        .answer-card:active { border-color: #B06E4A; background: #FDF3EC; }
        .nav-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 13px 16px; cursor: pointer; border-radius: 6px;
          transition: background 0.15s; font-family: 'Lato', sans-serif;
          font-size: 14px; border: none; background: transparent;
          width: 100%; text-align: left; touch-action: manipulation;
        }
        .nav-btn:active { background: #3D3020; }
        .nav-btn.active { background: #B06E4A !important; color: white !important; }
        .fade-in { animation: fadeIn 0.4s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }
        .pill { display: inline-block; background: rgba(255,255,255,0.6); border: 1px solid currentColor; border-radius: 20px; padding: 5px 12px; font-size: 12px; font-family: 'Lato', sans-serif; font-weight: 700; margin: 3px; }
        .prog-bg { background: #E8DDD2; border-radius: 20px; height: 6px; }
        .prog-fill { background: linear-gradient(to right, #C47D52, #E8A87C); border-radius: 20px; height: 6px; transition: width 0.5s ease; }
        .stat-box { background: white; border-left: 4px solid #B06E4A; padding: 14px 18px; border-radius: 0 8px 8px 0; margin: 18px 0; font-family: 'Lato', sans-serif; font-style: italic; color: #5A3E2B; font-size: 14px; line-height: 1.7; }
        .cc h2 { font-family: 'Playfair Display', serif; font-size: clamp(20px, 5vw, 30px); margin-bottom: 14px; color: #2D2416; line-height: 1.25; }
        .cc h3 { font-family: 'Playfair Display', serif; font-size: clamp(16px, 4vw, 20px); margin: 24px 0 10px; color: #5A3E2B; }
        .cc p { font-family: 'Lato', sans-serif; font-size: clamp(14px, 2.5vw, 16px); line-height: 1.85; color: #3D2E1E; margin-bottom: 14px; }
        .cc ul { padding-left: 20px; margin-bottom: 14px; }
        .cc li { font-family: 'Lato', sans-serif; font-size: clamp(13px, 2vw, 15px); line-height: 1.8; color: #3D2E1E; margin-bottom: 6px; }
        .abox { background: #FDF3EC; border: 2px solid #C47D52; border-radius: 10px; padding: 18px; margin: 24px 0; }
        .abox h4 { font-family: 'Playfair Display', serif; font-size: 17px; color: #B06E4A; margin-bottom: 10px; }
        .scrollbar::-webkit-scrollbar { width: 4px; }
        .scrollbar::-webkit-scrollbar-thumb { background: #C47D52; border-radius: 10px; }
        /* Drawer */
        .overlay { display: none; position: fixed; inset: 0; background: rgba(0,0,0,0.55); z-index: 40; }
        .overlay.on { display: block; }
        .drawer { position: fixed; top: 0; left: 0; height: 100%; width: min(280px, 85vw); background: #2D2416; z-index: 50; transform: translateX(-100%); transition: transform 0.28s ease; overflow-y: auto; }
        .drawer.on { transform: translateX(0); }
        .desk-sidebar { width: 252px; min-width: 252px; background: #2D2416; flex-shrink: 0; overflow-y: auto; }
        @media (max-width: 767px) {
          .desk-sidebar { display: none; }
          .btn-primary { padding: 14px 24px; font-size: 14px; letter-spacing: 1px; }
          .btn-ghost { padding: 12px 20px; font-size: 13px; }
          .answer-card { font-size: 14px; padding: 13px 15px; }
        }
        @media (min-width: 768px) {
          .drawer { display: none !important; }
          .overlay { display: none !important; }
        }
      `}</style>

      {/* COVER */}
      {screen === "cover" && (
        <div className="fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "48px 20px 56px" : "40px 24px", background: "linear-gradient(160deg,#FDF3EC 0%,#FBF7F2 50%,#F0EAE2 100%)", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: -80, right: -80, width: 280, height: 280, borderRadius: "50%", background: "rgba(196,125,82,0.08)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: "rgba(139,107,174,0.06)", pointerEvents: "none" }} />
          <div style={{ textAlign: "center", maxWidth: 600, width: "100%" }}>
            <div style={{ fontSize: 11, fontFamily: "'Lato',sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "#B06E4A", marginBottom: 22, fontWeight: 700 }}>A Complete Holistic Guide</div>
            <h1 className="serif" style={{ fontSize: isMobile ? "clamp(26px,7vw,36px)" : "clamp(32px,5vw,52px)", fontWeight: 700, lineHeight: 1.2, color: "#2D2416", marginBottom: 18 }}>
              The Holistic PCOS Guide<br /><em style={{ color: "#B06E4A" }}>to Getting Pregnant Naturally</em>
            </h1>
            <div style={{ width: 56, height: 3, background: "#C47D52", margin: "18px auto", borderRadius: 2 }} />
            <p className="sans" style={{ fontSize: isMobile ? 15 : 17, color: "#6B5744", lineHeight: 1.7, marginBottom: 32, fontWeight: 300 }}>
              Simple, Science-Backed Steps to Balance Your Hormones and Reclaim Your Fertility
            </p>
            <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap", marginBottom: 36 }}>
              {["🧬 Science-Backed", "🌿 100% Natural", "💛 Compassionate"].map(t => (
                <span key={t} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 30, padding: "7px 16px", fontSize: 13, fontFamily: "'Lato',sans-serif", color: "#6B5744", fontWeight: 600 }}>{t}</span>
              ))}
            </div>
            <button className="btn-primary" onClick={() => setScreen("quiz")} style={{ width: isMobile ? "100%" : "auto" }}>Start My PCOS Journey →</button>
            <p className="sans" style={{ fontSize: 13, color: "#9C8472", marginTop: 14 }}>Begin with your free PCOS type assessment — 6 questions, personalized results</p>
          </div>
        </div>
      )}

      {/* QUIZ */}
      {screen === "quiz" && (
        <div className="fade-in" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: isMobile ? "32px 16px" : "40px 24px", background: "#FBF7F2" }}>
          <div style={{ width: "100%", maxWidth: 580 }}>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, fontFamily: "'Lato',sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "#B06E4A", fontWeight: 700, marginBottom: 10 }}>PCOS Type Assessment</div>
              <h2 className="serif" style={{ fontSize: isMobile ? 22 : 27, color: "#2D2416", marginBottom: 8 }}>Discover Your PCOS Type</h2>
              <p className="sans" style={{ fontSize: 14, color: "#7A6452" }}>Knowing your type is the foundation of effective, targeted healing</p>
            </div>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="sans" style={{ fontSize: 12, color: "#9C8472", fontWeight: 700 }}>Question {quizStep + 1} of {QUIZ_QUESTIONS.length}</span>
                <span className="sans" style={{ fontSize: 12, color: "#9C8472" }}>{Math.round((quizStep / QUIZ_QUESTIONS.length) * 100)}% complete</span>
              </div>
              <div className="prog-bg"><div className="prog-fill" style={{ width: `${(quizStep / QUIZ_QUESTIONS.length) * 100}%` }} /></div>
            </div>
            <div className="fade-in" key={quizStep}>
              <div style={{ background: "white", borderRadius: 12, padding: isMobile ? "20px 16px" : "28px", marginBottom: 16, border: "1px solid #E8DDD2", boxShadow: "0 3px 16px rgba(0,0,0,0.05)" }}>
                <h3 className="serif" style={{ fontSize: isMobile ? 17 : 21, color: "#2D2416", marginBottom: 22, lineHeight: 1.4 }}>{QUIZ_QUESTIONS[quizStep].question}</h3>
                {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                  <button key={i} className="answer-card" onClick={() => handleAnswer(opt.scores)}>
                    <span style={{ color: "#B06E4A", fontWeight: 700, marginRight: 8 }}>{String.fromCharCode(65 + i)}.</span>{opt.text}
                  </button>
                ))}
              </div>
            </div>
            <p className="sans" style={{ textAlign: "center", fontSize: 12, color: "#B0A090" }}>There are no wrong answers — this is just a starting point for your personalized journey</p>
          </div>
        </div>
      )}

      {/* RESULT */}
      {screen === "result" && type && (
        <div className="fade-in" style={{ minHeight: "100vh", background: type.bg, padding: isMobile ? "28px 16px 48px" : "40px 24px" }}>
          <div style={{ maxWidth: 700, margin: "0 auto" }}>
            <div style={{ textAlign: "center", marginBottom: 32 }}>
              <div style={{ fontSize: 42, marginBottom: 12 }}>{type.emoji}</div>
              <div style={{ fontSize: 11, fontFamily: "'Lato',sans-serif", letterSpacing: 3, textTransform: "uppercase", color: type.color, fontWeight: 700, marginBottom: 10 }}>Your PCOS Type</div>
              <h1 className="serif" style={{ fontSize: isMobile ? "clamp(22px,6vw,34px)" : "clamp(26px,4vw,40px)", color: "#2D2416", marginBottom: 10, lineHeight: 1.2 }}>{type.name}</h1>
              <p className="sans" style={{ fontSize: isMobile ? 14 : 16, color: "#5A4433", fontStyle: "italic", marginBottom: 18 }}>"{type.tagline}"</p>
              <div style={{ width: 48, height: 3, background: type.color, margin: "0 auto 24px" }} />
            </div>
            {[
              { title: "What This Means For You", body: <p className="sans" style={{ fontSize: 14, lineHeight: 1.85, color: "#3D2E1E", margin: 0 }}>{type.description}</p> },
              { title: `Common Symptoms`, body: <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>{type.symptoms.map((s, i) => <span key={i} className="pill" style={{ color: type.color, borderColor: type.color }}>✓ {s}</span>)}</div> },
              { title: "🤰 How This Affects Your Fertility", body: <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{type.fertilityImpact}</p> },
            ].map((c, i) => (
              <div key={i} style={{ background: "white", borderRadius: 12, padding: isMobile ? "18px 16px" : "24px", marginBottom: 14, border: `1px solid ${type.color}30` }}>
                <h3 className="serif" style={{ fontSize: 18, color: "#2D2416", marginBottom: 12 }}>{c.title}</h3>
                {c.body}
              </div>
            ))}
            <div style={{ background: "white", borderRadius: 12, padding: isMobile ? "18px 16px" : "24px", marginBottom: 14, border: `1px solid ${type.color}30` }}>
              <h3 className="serif" style={{ fontSize: 18, color: "#2D2416", marginBottom: 14 }}>🌿 Your Natural Path to Conception</h3>
              {type.naturalPath.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: type.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, fontFamily: "'Lato',sans-serif", flexShrink: 0 }}>{i + 1}</div>
                  <span className="sans" style={{ fontSize: 14, color: "#3D2E1E", paddingTop: 3, lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>
            <div className="stat-box">💛 <strong>Research says:</strong> {type.hopeStat}</div>
            <div style={{ background: "#FBF7F2", border: "1px solid #E8DDD2", borderRadius: 10, padding: "14px 18px", marginBottom: 24 }}>
              <p className="sans" style={{ fontSize: 13, color: "#7A6452", lineHeight: 1.7, margin: 0 }}><strong>Note:</strong> PCOS types can overlap. This guide covers all four types — your type tells you where to focus first.</p>
            </div>
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 12, justifyContent: "center" }}>
              <button className="btn-primary" onClick={enterEbook} style={{ width: isMobile ? "100%" : "auto" }}>Enter Your Guide →</button>
              <button className="btn-ghost" onClick={() => { setScreen("quiz"); setQuizStep(0); setScores({ insulin: 0, adrenal: 0, inflammatory: 0, postPill: 0 }); }} style={{ width: isMobile ? "100%" : "auto" }}>Retake Quiz</button>
            </div>
          </div>
        </div>
      )}

      {/* CHAPTER VIEW */}
      {screen === "chapter" && (
        <div style={{ display: "flex", minHeight: "100vh", position: "relative" }}>
          {/* Mobile overlay */}
          <div className={`overlay${drawerOpen ? " on" : ""}`} onClick={() => setDrawerOpen(false)} />
          {/* Mobile drawer */}
          <div className={`drawer${drawerOpen ? " on" : ""}`}>
            <SidebarInner type={type} completedChapters={completedChapters} activeChapter={activeChapter} goToChapter={goToChapter} showClose onClose={() => setDrawerOpen(false)} />
          </div>
          {/* Desktop sidebar */}
          <div className="desk-sidebar">
            <SidebarInner type={type} completedChapters={completedChapters} activeChapter={activeChapter} goToChapter={goToChapter} />
          </div>
          {/* Content */}
          <div style={{ flex: 1, overflow: "auto", minWidth: 0 }} className="scrollbar">
            {/* Top bar */}
            <div style={{ background: "white", borderBottom: "1px solid #E8DDD2", padding: isMobile ? "11px 14px" : "13px 26px", display: "flex", alignItems: "center", gap: 12, position: "sticky", top: 0, zIndex: 10 }}>
              <button onClick={() => setDrawerOpen(!drawerOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 22, color: "#B06E4A", padding: "2px 6px", flexShrink: 0, touchAction: "manipulation" }}>☰</button>
              <span className="sans" style={{ fontSize: isMobile ? 12 : 13, color: "#9C8472", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {CHAPTERS.find(c => c.id === activeChapter)?.title}
              </span>
              {type && !isMobile && (
                <span style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: type.color, background: type.bg, padding: "4px 12px", borderRadius: 20, fontWeight: 700, flexShrink: 0 }}>
                  {type.emoji} {type.name.split(" ")[0]} Type Tips
                </span>
              )}
            </div>
            {/* Chapter body */}
            <div style={{ maxWidth: 740, margin: "0 auto", padding: isMobile ? "24px 16px 56px" : "44px 32px" }} className="cc">
              <ChapterContent chapterId={activeChapter} pcosType={type} isMobile={isMobile}
                onComplete={() => markComplete(activeChapter)}
                onNext={() => { const idx = CHAPTERS.findIndex(c => c.id === activeChapter); if (idx < CHAPTERS.length - 1) { setActiveChapter(CHAPTERS[idx + 1].id); if (typeof window !== "undefined") window.scrollTo(0, 0); } }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SidebarInner({ type, completedChapters, activeChapter, goToChapter, showClose, onClose }) {
  return (
    <div style={{ padding: "24px 18px", minHeight: "100%" }}>
      {showClose && (
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 12 }}>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#9C8472", fontSize: 22, cursor: "pointer", padding: 4, touchAction: "manipulation" }}>✕</button>
        </div>
      )}
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C47D52", fontWeight: 700, marginBottom: 4 }}>Holistic PCOS Guide</div>
        <div style={{ fontFamily: "'Playfair Display',serif", color: "white", fontSize: 13, lineHeight: 1.4, fontStyle: "italic" }}>Getting Pregnant Naturally</div>
      </div>
      {type && (
        <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "10px 12px", marginBottom: 18, border: `1px solid ${type.color}40` }}>
          <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", color: "#C47D52", fontWeight: 700, marginBottom: 3 }}>Your Type</div>
          <div style={{ fontSize: 13, fontFamily: "'Lato',sans-serif", color: "white" }}>{type.emoji} {type.name}</div>
        </div>
      )}
      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
          <span style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", color: "#9C8472", textTransform: "uppercase", letterSpacing: 1 }}>Progress</span>
          <span style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", color: "#9C8472" }}>{completedChapters.size}/{CHAPTERS.length}</span>
        </div>
        <div style={{ background: "#4A3828", borderRadius: 10, height: 5 }}>
          <div style={{ width: `${(completedChapters.size / CHAPTERS.length) * 100}%`, background: "#C47D52", borderRadius: 10, height: 5, transition: "width 0.5s" }} />
        </div>
      </div>
      <nav>
        {CHAPTERS.map(ch => (
          <button key={ch.id} className={`nav-btn${activeChapter === ch.id ? " active" : ""}`}
            onClick={() => goToChapter(ch.id)}
            style={{ color: activeChapter === ch.id ? "white" : completedChapters.has(ch.id) ? "#7DC48A" : "#A89080" }}>
            <span style={{ fontSize: 15 }}>{completedChapters.has(ch.id) ? "✓" : ch.icon}</span>
            <span style={{ fontSize: 13 }}>{ch.title}</span>
          </button>
        ))}
      </nav>
      <div style={{ marginTop: 24, padding: "12px", background: "rgba(196,125,82,0.1)", borderRadius: 8, border: "1px solid rgba(196,125,82,0.2)" }}>
        <p style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: "#C47D52", lineHeight: 1.6, margin: 0 }}>💛 You are not broken. Your body is asking for support — and you're giving it exactly that.</p>
      </div>
    </div>
  );
}

function Ch2ActionBox() {
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);
  const p1 = `I'm a woman with PCOS working on improving my diet to support natural conception. I've attached a photo of a meal I just ate. Please analyze it and tell me:\n1. How well does this meal align with a PCOS-friendly, fertility-supportive diet?\n2. Does it support blood sugar balance, reduce inflammation, and include quality protein?\n3. What is working well in this meal?\n4. What one or two simple adjustments could make it even more PCOS-supportive?\nPlease keep your feedback encouraging and practical.`;
  const p2 = `I have PCOS and I'm trying to eat in a way that supports natural pregnancy. I've uploaded a photo of a meal I just made. Based on what you see:\n1. What nutrients does this meal appear to offer that support hormonal balance and fertility?\n2. Is there anything in this meal that might spike blood sugar or cause inflammation?\n3. Suggest one easy swap or addition I could make next time to make this meal more fertility-friendly for PCOS.\nKeep it simple — I'm building new habits one meal at a time.`;
  const copy = (text, n) => {
    navigator.clipboard.writeText(text).then(() => {
      if (n === 1) { setCopied1(true); setTimeout(() => setCopied1(false), 2500); }
      else { setCopied2(true); setTimeout(() => setCopied2(false), 2500); }
    });
  };
  return (
    <div className="abox">
      <h4>✏️ Your Action Step for Chapter 2</h4>
      <p className="sans" style={{ fontSize: 15, marginBottom: 0, lineHeight: 1.75 }}>
        For the next 7 days, build every meal around the PCOS Fertility Plate above. Take a photo of each meal. You don't need to be perfect — aim for 80% compliance. By day 7, notice: how is your energy? Your bloating? Your mood after meals?
      </p>
      <div style={{ borderTop: "1px solid #E0C9B5", margin: "18px 0" }} />
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 18 }}>🤖</span>
        <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#2D2416", fontWeight: 700 }}>Take It Further with AI</span>
      </div>
      <p className="sans" style={{ fontSize: 14, color: "#7A6452", lineHeight: 1.7, marginBottom: 4 }}>After you take your meal photo, upload it to ChatGPT or Claude and paste one of these prompts. The AI will break down your meal and give you personalized, PCOS-friendly feedback.</p>
      <p className="sans" style={{ fontSize: 13, color: "#9C8472", fontStyle: "italic", marginBottom: 18 }}>✨ Both ChatGPT and Claude offer free accounts — no payment required to get started.</p>
      {[{ label: "Prompt 1 — Meal Analysis", text: p1, copied: copied1, n: 1 }, { label: "Prompt 2 — Personalized Feedback", text: p2, copied: copied2, n: 2 }].map(({ label, text, copied, n }) => (
        <div key={n} style={{ marginBottom: 14 }}>
          <div style={{ fontFamily: "'Lato',sans-serif", fontSize: 11, fontWeight: 700, color: "#B06E4A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>{label}</div>
          <div style={{ background: "white", border: "1px solid #D9C5B2", borderRadius: 8, padding: "13px 14px" }}>
            <p className="sans" style={{ fontSize: 13, lineHeight: 1.75, color: "#3D2E1E", margin: "0 0 10px", whiteSpace: "pre-line" }}>{text}</p>
            <button onClick={() => copy(text, n)} style={{ background: copied ? "#4A8A5C" : "#B06E4A", color: "white", border: "none", borderRadius: 6, padding: "8px 16px", fontSize: 12, fontFamily: "'Lato',sans-serif", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, touchAction: "manipulation" }}>
              {copied ? "✓ Copied!" : "📋 Copy Prompt"}
            </button>
          </div>
        </div>
      ))}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 6 }}>
        <span className="sans" style={{ fontSize: 13, color: "#7A6452", fontWeight: 700 }}>Open your AI tool:</span>
        {[{ label: "↗ ChatGPT", href: "https://chatgpt.com", bg: "#10A37F" }, { label: "↗ Claude", href: "https://claude.ai", bg: "#C47D52" }].map(l => (
          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer"
            style={{ display: "inline-flex", alignItems: "center", gap: 5, background: l.bg, color: "white", borderRadius: 20, padding: "8px 16px", fontSize: 13, fontFamily: "'Lato',sans-serif", fontWeight: 700, textDecoration: "none" }}>
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

function ChapterContent({ chapterId, pcosType, isMobile, onComplete, onNext }) {
  const type = pcosType;
  const DoneBtn = () => (
    <div style={{ marginTop: 36 }}>
      <button className="btn-primary" onClick={() => { onComplete(); onNext(); }} style={{ width: isMobile ? "100%" : "auto" }}>Mark Complete & Continue →</button>
    </div>
  );
  const TypeTip = ({ children }) => type ? (
    <div style={{ background: type.bg, border: `2px solid ${type.color}50`, borderRadius: 10, padding: "16px 18px", margin: "18px 0" }}>
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", color: type.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 7 }}>{type.emoji} Specific to {type.name}</div>
      <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{children}</p>
    </div>
  ) : null;

  if (chapterId === "intro") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Introduction</div>
      <h2>From Overwhelmed to Empowered</h2>
      <p>If you're reading this, chances are you've been on a journey that feels more like a maze than a path. You've Googled at 2am. You've sat in a doctor's office and walked away with more confusion than clarity. You've watched your cycle come and go — or not come at all — wondering why your body seems to be working against you.</p>
      <p>You are not broken. And PCOS does not mean you cannot get pregnant.</p>
      <p>What it means is that your body is sending you a signal — a loud, persistent one — that it needs a different kind of support than what conventional medicine typically offers. This guide is that support.</p>
      <div className="abox">
        <h4>🌿 What You'll Learn in This Guide</h4>
        <ul>
          <li>The 4 types of PCOS and exactly how each one affects your fertility — plus which one is yours</li>
          <li>How to eat in a way that heals your hormones, not just manages symptoms</li>
          <li>The specific supplements and herbs clinically shown to restore ovulation</li>
          <li>How stress is quietly sabotaging your fertility — and how to stop it</li>
          <li>How to track your cycle with precision even when it's unpredictable</li>
          <li>The exact movement approach that supports fertility (and what to avoid)</li>
          <li>A complete 30-day kickstart plan that pulls everything together</li>
        </ul>
      </div>
      <p>This guide is written for the woman who is ready to take a holistic, informed, and compassionate approach to her fertility. Every recommendation is grounded in research, but delivered in a way that actually makes sense for real life.</p>
      <p>Your journey to motherhood starts here. Let's begin.</p>
      <div className="stat-box">💛 Research shows that lifestyle-based interventions for PCOS can restore ovulation in up to 90% of women when applied consistently for 3–6 months.</div>
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch1") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 1</div>
      <h2>Why Holistic Healing Changes Everything for PCOS</h2>
      <p>Here's what most women with PCOS are told: take Metformin, lose weight, come back when you're ready to try Clomid. While conventional medicine has its place, this approach misses something fundamental — PCOS is not a disease to be managed. It is a syndrome with a root cause that can be addressed.</p>
      <p>When you address the root — whether that's insulin resistance, adrenal dysfunction, inflammation, or post-pill hormonal rebound — everything improves: your cycle, your symptoms, your energy, your fertility.</p>
      <h3>The 5-Step Holistic Roadmap</h3>
      {[
        { icon: "🥗", title: "Nutrition", desc: "Eat to regulate insulin, reduce inflammation, and create a fertile hormonal environment" },
        { icon: "🌿", title: "Supplements", desc: "Use targeted, research-backed nutrients and herbs to fill the gaps and restore balance" },
        { icon: "🧘‍♀️", title: "Stress Regulation", desc: "Heal the nervous system — cortisol is one of the most underestimated fertility blockers" },
        { icon: "📅", title: "Cycle Awareness", desc: "Learn to read your body's signals and time conception with precision" },
        { icon: "🏃‍♀️", title: "Movement", desc: "Move in ways that work with your hormones, not against them" },
      ].map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 14, padding: "13px 0", borderBottom: "1px solid #E8DDD2" }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>{p.icon}</div>
          <div>
            <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#2D2416", marginBottom: 3 }}>{p.title}</div>
            <p style={{ margin: 0, fontSize: 14 }}>{p.desc}</p>
          </div>
        </div>
      ))}
      <TypeTip>
        {type?.id === "insulin" && "For Insulin-Resistant PCOS, Nutrition and Supplements are your highest-leverage pillars. Getting blood sugar stable is the single most impactful thing you can do for your fertility."}
        {type?.id === "adrenal" && "For Adrenal PCOS, Stress Regulation is your #1 priority pillar. Until you address cortisol, even perfect nutrition and supplements will have limited effect on your cycles."}
        {type?.id === "inflammatory" && "For Inflammatory PCOS, Nutrition (specifically eliminating triggers) and Supplements (specifically anti-inflammatory) are your foundation. Inflammation suppresses everything else."}
        {type?.id === "postPill" && "For Post-Pill PCOS, Supplements (nutrient replenishment) and giving your body time are the keys. Your hormonal system is rebooting — your job is to support that process, not rush it."}
      </TypeTip>
      <div className="abox">
        <h4>✏️ Your Action Step for Chapter 1</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>Write down your top 3 symptoms that are most affecting your quality of life and fertility right now. Keep this list — we'll revisit it in Chapter 8 to show you exactly which pillar addresses each one.</p>
      </div>
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch2") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 2</div>
      <h2>Eat to Heal — The PCOS Fertility Diet That Actually Works</h2>
      <p>Food is not just fuel for women with PCOS — it is medicine. The goal is to eat in a way that stabilizes blood sugar, reduces inflammation, lowers androgens, and creates a fertile internal environment.</p>
      <h3>How Food Affects Your Hormones</h3>
      <p>When you eat high-glycemic foods — white bread, sugar, processed carbs — your blood sugar spikes. Your pancreas releases insulin to bring it back down. In women with PCOS, this process is impaired, leading to chronically elevated insulin. That excess insulin tells your ovaries to make more testosterone — which disrupts ovulation. No ovulation = no pregnancy.</p>
      <h3>The PCOS Fertility Plate</h3>
      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12, margin: "18px 0" }}>
        {[
          { label: "50% Non-Starchy Vegetables", color: "#4A8A5C", items: "Leafy greens, broccoli, zucchini, bell peppers, cauliflower, asparagus" },
          { label: "25% Quality Protein", color: "#C47D52", items: "Pasture-raised eggs, wild salmon, organic chicken, lentils, grass-fed beef" },
          { label: "15% Low-Glycemic Carbs", color: "#8B6BAE", items: "Quinoa, sweet potato, brown rice, oats, chickpeas, berries" },
          { label: "10% Healthy Fats", color: "#4A8FA3", items: "Avocado, olive oil, walnuts, flaxseed, chia seeds, coconut oil" },
        ].map(p => (
          <div key={p.label} style={{ background: "white", border: `2px solid ${p.color}30`, borderRadius: 10, padding: 14 }}>
            <div style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", fontWeight: 700, color: p.color, marginBottom: 7 }}>{p.label}</div>
            <p className="sans" style={{ fontSize: 13, color: "#5A4433", margin: 0, lineHeight: 1.6 }}>{p.items}</p>
          </div>
        ))}
      </div>
      <h3>What to Avoid or Minimize</h3>
      <ul>
        <li><strong>Refined sugar and high-fructose corn syrup</strong> — directly raises insulin and androgens</li>
        <li><strong>Refined grains</strong> (white bread, white pasta, pastries) — spike blood sugar rapidly</li>
        <li><strong>Dairy</strong> — contains IGF-1 which can raise androgens; try eliminating for 30 days</li>
        <li><strong>Seed oils</strong> (canola, soybean, vegetable oil) — highly inflammatory</li>
        <li><strong>Alcohol</strong> — burdens the liver, which processes your hormones</li>
      </ul>
      <h3>Meal Timing for Hormonal Balance</h3>
      <ul>
        <li><strong>Eat breakfast within 90 minutes of waking</strong> — skipping breakfast raises cortisol</li>
        <li><strong>Front-load your calories</strong> — larger breakfast and lunch, lighter dinner</li>
        <li><strong>Avoid eating 2–3 hours before bed</strong> — improves insulin sensitivity overnight</li>
        <li><strong>Eat every 3–4 hours</strong> — prevents blood sugar crashes that spike cortisol and cravings</li>
      </ul>
      <TypeTip>
        {type?.id === "insulin" && "Your dietary priority is strict blood sugar management. Try eating protein and fat before any carbohydrates at each meal — this simple hack significantly blunts the insulin spike. Aim for under 100g of net carbs per day initially."}
        {type?.id === "adrenal" && "For Adrenal PCOS, never skip meals — blood sugar dips trigger cortisol spikes. Prioritize magnesium-rich foods (dark leafy greens, pumpkin seeds, dark chocolate) and reduce caffeine, which directly stimulates your adrenal glands."}
        {type?.id === "inflammatory" && "An elimination diet for 4 weeks is your most powerful starting point. Remove gluten, dairy, seed oils, and refined sugar simultaneously. Then reintroduce one at a time to identify your personal triggers."}
        {type?.id === "postPill" && "Focus on liver-supportive foods: cruciferous vegetables (broccoli, Brussels sprouts, cabbage), beets, and lemon water daily. These support your liver's detoxification pathways to clear synthetic hormones."}
      </TypeTip>
      <Ch2ActionBox />
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch3") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 3</div>
      <h2>Nature's Medicine Cabinet — Supplements, Herbs & Adaptogens</h2>
      <p>The right supplements, taken consistently, can meaningfully shift your hormonal environment. Women with PCOS are often deficient in key nutrients critical for ovulation, egg quality, and hormonal balance.</p>
      <h3>The Core PCOS Fertility Stack</h3>
      {[
        { name: "Myo-Inositol + D-Chiro Inositol (40:1)", icon: "⭐", priority: "Highest Priority", what: "The most extensively researched supplement for PCOS fertility. An insulin sensitizer that directly improves ovarian function, egg quality, and menstrual regularity.", dose: "4g Myo-Inositol + 100mg D-Chiro Inositol daily, in two divided doses", evidence: "Multiple RCTs show restoration of ovulation in 60–70% of women with PCOS within 3–6 months" },
        { name: "Folate (Methylfolate, not Folic Acid)", icon: "🧬", priority: "Essential for Conception", what: "Critical for preventing neural tube defects. Women with PCOS often have MTHFR gene variants that impair folic acid conversion — methylfolate bypasses this.", dose: "400–800mcg methylfolate daily", evidence: "Methylfolate form is superior for absorption in women with MTHFR variants" },
        { name: "Vitamin D3 + K2", icon: "☀️", priority: "Critical — Most Are Deficient", what: "Over 85% of women with PCOS are Vitamin D deficient. Vitamin D directly regulates ovarian function, AMH levels, and insulin signaling.", dose: "2,000–5,000 IU Vitamin D3 + 100mcg K2 daily. Test first — optimal is 60–80 ng/mL", evidence: "Supplementation shown to improve menstrual regularity and ovulation rates in deficient women" },
        { name: "Magnesium Glycinate", icon: "🌙", priority: "High Priority", what: "Improves insulin sensitivity, reduces cortisol, supports sleep, and reduces inflammation. The glycinate form is the most bioavailable and gentlest on digestion.", dose: "300–400mg magnesium glycinate, taken at night", evidence: "Improves fasting glucose and reduces inflammatory markers in insulin resistance" },
        { name: "N-Acetyl Cysteine (NAC)", icon: "🔬", priority: "High Priority", what: "Improves insulin sensitivity, reduces ovarian cyst formation, lowers androgens, and improves egg quality. Shown to improve ovulation rates comparable to Clomid in some studies.", dose: "600mg, 2–3x daily with meals", evidence: "Multiple studies show NAC reduces testosterone, improves insulin resistance, and restores ovulation" },
        { name: "Omega-3 Fatty Acids (EPA + DHA)", icon: "🐟", priority: "High Priority", what: "Reduce systemic inflammation, lower triglycerides, improve egg quality, and support hormonal balance. Critical for fetal brain development once pregnant.", dose: "2–3g combined EPA + DHA daily from a high-quality, third-party tested fish oil", evidence: "Shown to reduce testosterone, fasting insulin, and inflammatory markers in PCOS" },
      ].map((s, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 12, padding: isMobile ? "16px" : "22px", marginBottom: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span style={{ fontSize: 18 }}>{s.icon}</span>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 14 : 17, color: "#2D2416", lineHeight: 1.3 }}>{s.name}</span>
            </div>
            <span style={{ fontSize: 11, fontFamily: "'Lato',sans-serif", background: "#FDF3EC", color: "#B06E4A", borderRadius: 20, padding: "3px 10px", fontWeight: 700, whiteSpace: "nowrap" }}>{s.priority}</span>
          </div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", marginBottom: 10 }}>{s.what}</p>
          <div style={{ background: "#F5F0EA", borderRadius: 8, padding: "9px 12px", marginBottom: 8 }}>
            <span style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", fontWeight: 700, color: "#B06E4A" }}>Dose: </span>
            <span style={{ fontSize: 13, fontFamily: "'Lato',sans-serif", color: "#5A4433" }}>{s.dose}</span>
          </div>
          <p style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: "#9C8472", fontStyle: "italic", margin: 0 }}>Research: {s.evidence}</p>
        </div>
      ))}
      <TypeTip>
        {type?.id === "insulin" && "Your non-negotiables: Myo-Inositol (start here), NAC, Magnesium, and Vitamin D. Add Berberine (500mg 2–3x daily with meals) as a powerful natural Metformin alternative."}
        {type?.id === "adrenal" && "Add: Ashwagandha KSM-66 (600mg daily) for cortisol regulation, Phosphatidylserine (400mg daily) to blunt the cortisol spike, and Rhodiola Rosea (200–400mg) for HPA axis support. Avoid stimulant supplements."}
        {type?.id === "inflammatory" && "Prioritize: Omega-3s at highest dose (3g EPA+DHA), Curcumin with Bioperine (500–1000mg), and a high-quality probiotic to support gut health and reduce systemic inflammation."}
        {type?.id === "postPill" && "Your priority protocol: Methylfolate + B-complex, Zinc (30mg — often severely depleted by the pill), Magnesium, and Vitex/Chaste Tree Berry (400mg daily) to re-regulate the LH/FSH ratio."}
      </TypeTip>
      <div style={{ background: "#FDF3EC", border: "1px solid #E8DDD2", borderRadius: 10, padding: "14px 16px", margin: "18px 0" }}>
        <p className="sans" style={{ fontSize: 13, color: "#7A6452", lineHeight: 1.7, margin: 0 }}><strong>⚠️ Important:</strong> Always consult with your healthcare provider before starting a supplement protocol, especially if you are taking medications or have other health conditions.</p>
      </div>
      <div className="abox">
        <h4>✏️ Your Action Step for Chapter 3</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>Identify your top 3 supplements based on your PCOS type. Order them this week and commit to 90 days of consistent use. Set a phone reminder to take them daily.</p>
      </div>
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch4") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 4</div>
      <h2>Calm the Storm — Stress Management for Hormonal Balance</h2>
      <p>Stress management is the most underestimated pillar in PCOS healing. When you're chronically stressed, your adrenal glands pump out cortisol — which directly suppresses GnRH, the master hormone that triggers the entire ovulation cascade. Your body is literally choosing survival over reproduction.</p>
      <h3>Evidence-Based Practices to Regulate Your Stress Response</h3>
      {[
        { title: "4-7-8 Breathing", time: "5 min", when: "Morning + before bed", desc: "Inhale 4 counts, hold 7, exhale 8. This activates the parasympathetic nervous system and directly lowers cortisol within minutes. Clinical studies show HRV improvement after just 4 weeks." },
        { title: "Yoga Nidra (Yogic Sleep)", time: "20–30 min", when: "Afternoon or before bed", desc: "A guided meditative practice as restorative as 4 hours of sleep. One study showed significant reductions in testosterone, AMH, and anxiety after 12 weeks in PCOS patients." },
        { title: "Journaling: The Brain Dump Method", time: "10 min", when: "Morning", desc: "Write 3 pages of uncensored stream of consciousness. This empties the mental 'buffer' that keeps your stress response activated. Studies show expressive writing reduces cortisol." },
        { title: "Restorative Yoga", time: "30 min", when: "Evening", desc: "Passive, supported poses held for 3–5 minutes each. Unlike active yoga, restorative yoga actively brings cortisol down — especially important if you currently do intense exercise classes." },
        { title: "Nature Exposure (Green Therapy)", time: "20 min", when: "Daytime", desc: "Walking in nature reduces cortisol, blood pressure, and sympathetic nervous system activation. Even 20 minutes creates measurable hormonal shifts." },
      ].map((p, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: isMobile ? "14px" : "18px 22px", marginBottom: 10 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#2D2416" }}>{p.title}</span>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontSize: 11, fontFamily: "'Lato',sans-serif", background: "#EDE0D4", color: "#7A5C40", borderRadius: 20, padding: "3px 9px", fontWeight: 700 }}>⏱ {p.time}</span>
              <span style={{ fontSize: 11, fontFamily: "'Lato',sans-serif", background: "#EDE0D4", color: "#7A5C40", borderRadius: 20, padding: "3px 9px" }}>{p.when}</span>
            </div>
          </div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{p.desc}</p>
        </div>
      ))}
      <TypeTip>
        {type?.id === "adrenal" && "Stress management is your #1 fertility intervention — not diet, not supplements. Start with Yoga Nidra daily (20 min) and 4-7-8 breathing twice daily. This is non-negotiable for your type."}
        {type?.id === "insulin" && "Prioritize 7–9 hours of sleep (the most potent insulin sensitizer that exists) and add a 10-minute walk after meals to blunt blood sugar spikes."}
        {type?.id === "inflammatory" && "Chronic stress directly triggers inflammatory pathways. Calming your nervous system also calms gut-driven inflammation. Prioritize sleep and nature exposure alongside your anti-inflammatory diet."}
        {type?.id === "postPill" && "The pill can blunt your cortisol response, meaning your adrenals may be more reactive post-pill. Be gentle with yourself — restorative yoga and Ashwagandha are particularly supportive during this recalibration phase."}
      </TypeTip>
      <div className="abox">
        <h4>✏️ Your Action Step for Chapter 4</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>Choose ONE stress practice from this chapter and commit to it daily for 21 days. Just one — consistency beats variety. Set a non-negotiable 10-minute window in your day.</p>
      </div>
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch5") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 5</div>
      <h2>Know Your Cycle — Fertility Awareness for Women with PCOS</h2>
      <p>Even with irregular cycles, your body is still producing hormonal signals — and learning to read them gives you a powerful advantage. You don't need a 28-day cycle to get pregnant. You need to identify your fertile window, however it appears in your unique cycle.</p>
      <h3>The 4 Phases of Your Cycle</h3>
      {[
        { phase: "Menstruation", days: "Days 1–5 (approx)", desc: "Your period. Estrogen and progesterone are at their lowest. Rest, nourish, and don't push. This is a time for restoration." },
        { phase: "Follicular Phase", days: "Days 6–13 (varies widely with PCOS)", desc: "Estrogen rises as follicles develop. Energy increases. With PCOS, this phase may last much longer as your body tries repeatedly to ovulate." },
        { phase: "Ovulation", days: "Day 14+ (unpredictable with PCOS)", desc: "An LH surge triggers the release of a mature egg. This is your 12–24 hour conception window, preceded by a 3–5 day fertile window." },
        { phase: "Luteal Phase", days: "Days after ovulation to next period", desc: "Progesterone rises to support a potential pregnancy. With PCOS, low progesterone in the luteal phase can prevent implantation even when conception occurs." },
      ].map((p, i) => (
        <div key={i} style={{ borderLeft: "4px solid #C47D52", paddingLeft: 16, marginBottom: 16 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#2D2416", marginBottom: 4 }}>{p.phase} <span style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: "#9C8472", fontStyle: "italic" }}>— {p.days}</span></div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{p.desc}</p>
        </div>
      ))}
      <h3>The 4 Methods to Identify Ovulation with PCOS</h3>
      {[
        { method: "Basal Body Temperature (BBT)", icon: "🌡️", howTo: "Take your temperature with a basal thermometer every morning before getting out of bed. After ovulation, BBT rises 0.2°C and stays elevated. Log it in Kindara or Fertility Friend.", pros: "Confirms ovulation has occurred", cons: "Tells you after the fact — good for pattern recognition over multiple cycles" },
        { method: "Cervical Mucus Monitoring", icon: "💧", howTo: "Check your cervical mucus daily. As you approach ovulation, it changes from dry/sticky → creamy → egg-white consistency (EWCM). EWCM is your most fertile signal.", pros: "Real-time fertile window indicator", cons: "Requires practice to interpret correctly" },
        { method: "LH Strips (Ovulation Predictor Kits)", icon: "📊", howTo: "Begin testing from Day 10. Test twice daily. A solid second line (darker than the control) indicates an LH surge — ovulation typically occurs 12–36 hours later.", pros: "Detects the surge before ovulation", cons: "Women with PCOS can have multiple LH surges without ovulating — confirm with BBT" },
        { method: "Cycle Tracking Apps", icon: "📱", howTo: "Use apps like Natural Cycles, Kindara, or Premom (which reads LH strips). These help you spot patterns in your unique cycle over time.", pros: "Organizes all data in one place", cons: "Standard algorithms aren't built for irregular PCOS cycles — use apps that allow manual data entry" },
      ].map((m, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: isMobile ? "14px" : "20px 22px", marginBottom: 10 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 8 }}>
            <span style={{ fontSize: 20 }}>{m.icon}</span>
            <span style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 15 : 17, color: "#2D2416" }}>{m.method}</span>
          </div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", marginBottom: 8 }}>{m.howTo}</p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <span className="sans" style={{ fontSize: 12, color: "#4A8A5C" }}>✓ {m.pros}</span>
            <span className="sans" style={{ fontSize: 12, color: "#C45C5C" }}>⚠ {m.cons}</span>
          </div>
        </div>
      ))}
      <div className="stat-box">💡 For best results with PCOS, combine BBT + LH strips. These confirm each other and account for the false LH surges common in PCOS.</div>
      <div className="abox">
        <h4>✏️ Your Action Step for Chapter 5</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>This cycle, start charting your BBT and cervical mucus. Download Kindara or Fertility Friend and begin logging today — even if you're mid-cycle. The goal this month is to start gathering data about your body.</p>
      </div>
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch6") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 6</div>
      <h2>Move to Conceive — The Right Exercise Approach for PCOS Fertility</h2>
      <p>Exercise is one of the most powerful interventions for PCOS — but only when done correctly. The wrong kind spikes cortisol and suppresses ovulation. The right kind improves insulin sensitivity, lowers androgens, and supports fertility.</p>
      <h3>What NOT to Do</h3>
      <ul>
        <li><strong>Chronic cardio</strong> (daily long runs, daily intense spin classes) — chronically elevates cortisol</li>
        <li><strong>Intense HIIT every day</strong> — without recovery, this becomes a cortisol stressor</li>
        <li><strong>Training through fatigue and illness</strong> — rest is hormonal medicine for PCOS</li>
      </ul>
      <h3>The PCOS-Supportive Movement Protocol</h3>
      {[
        { type: "Strength Training", freq: "2–3x per week", icon: "💪", detail: "The single most effective exercise for insulin resistance and PCOS. Builds muscle (your primary glucose disposal tissue), lowers testosterone naturally. Focus on compound movements: squats, deadlifts, rows, presses." },
        { type: "Walking", freq: "Daily — 20–30 min", icon: "🚶‍♀️", detail: "A post-meal 10–15 minute walk reduces blood sugar spikes by up to 30%. Morning walks in sunlight also regulate cortisol rhythms and support Vitamin D production." },
        { type: "Low-Impact Cardio", freq: "1–2x per week", icon: "🏊‍♀️", detail: "Swimming, cycling at a gentle pace, elliptical, or barre. Improves cardiovascular health without the cortisol burden of intense cardio. Keep heart rate in Zone 2." },
        { type: "Yoga (Restorative or Hatha)", freq: "2–3x per week", icon: "🧘‍♀️", detail: "Lowers cortisol, improves HRV. One study showed 12 weeks of yoga reduced testosterone levels and anxiety scores significantly in women with PCOS." },
        { type: "Rest and Recovery", freq: "2 days per week minimum", icon: "🌙", detail: "Rest is not a gap in your routine — it is part of the protocol. This is when cortisol resets, muscle repairs, and hormonal balance is restored." },
      ].map((e, i) => (
        <div key={i} style={{ display: "flex", gap: 12, background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: isMobile ? "14px" : "16px 18px", marginBottom: 10 }}>
          <div style={{ fontSize: 24, flexShrink: 0 }}>{e.icon}</div>
          <div>
            <div style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 6, flexWrap: "wrap" }}>
              <span style={{ fontFamily: "'Playfair Display',serif", fontSize: 16, color: "#2D2416" }}>{e.type}</span>
              <span style={{ fontSize: 11, fontFamily: "'Lato',sans-serif", background: "#EDE0D4", color: "#7A5C40", borderRadius: 20, padding: "3px 9px", fontWeight: 700 }}>{e.freq}</span>
            </div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{e.detail}</p>
          </div>
        </div>
      ))}
      <TypeTip>
        {type?.id === "insulin" && "Strength training is your #1 priority. Aim for 3x/week strength + daily walks. This combination is as effective as Metformin for improving insulin sensitivity in multiple studies."}
        {type?.id === "adrenal" && "Step away from intense cardio entirely for 8–12 weeks. Your adrenals are depleted. Walking, gentle yoga, and restorative movement are your medicines right now."}
        {type?.id === "inflammatory" && "Avoid high-impact exercise during flare-up periods — it increases inflammatory markers. Focus on swimming, walking, and gentle yoga. As inflammation reduces, slowly add strength training."}
        {type?.id === "postPill" && "Your body is recalibrating. Walking, yoga, and light strength training 2x/week support your hormonal reboot without stressing a system that's already rebuilding."}
      </TypeTip>
      <div className="abox">
        <h4>✏️ Your Action Step for Chapter 6</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>Build your weekly movement plan for the next 4 weeks using the protocol above. Write it into your calendar. Start at 70% of what feels comfortable. Commit to the minimum: walks daily + 2 strength sessions per week.</p>
      </div>
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch7") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 7</div>
      <h2>Real Women, Real Results — PCOS Fertility Success Stories</h2>
      <p>Every piece of science in this guide is meaningful. But sometimes what you need most is proof that a real woman, with a body like yours, did this and it worked.</p>
      {[
        { name: "Mariana, 31", type: "Insulin-Resistant PCOS", color: "#C17F5A", before: "Mariana had been off birth control for 2 years and had only gotten her period three times. Her doctor had told her she'd likely need Clomid. She was exhausted after every meal, and had dark patches on the back of her neck.", journey: "Mariana started with dietary changes — removing refined sugar and building meals around protein and vegetables. She added Myo-Inositol, Vitamin D, and NAC. Within 6 weeks, her energy improved dramatically. By week 10, she got her first natural period in 8 months.", result: "Mariana conceived naturally in month 5 of her holistic protocol. She is now 27 weeks pregnant. Her testosterone levels normalized without medication." },
        { name: "Jasmine, 28", type: "Adrenal PCOS", color: "#8B6BAE", before: "Jasmine was a high-achieving executive who hadn't had a period in 6 months. Her bloodwork showed elevated DHEA-S but normal insulin. She was exercising intensely 6 days a week and eating 'perfectly' — and nothing was working.", journey: "The turning point was stopping intense cardio and replacing it with walking and Yoga Nidra. She started Ashwagandha and Magnesium, and implemented a non-negotiable 9pm phone-off rule. Within 3 weeks, her anxiety dropped noticeably. At week 8, she got her period.", result: "Jasmine conceived naturally at month 6. She credits the permission to do less as the most important shift in her journey. Her cortisol levels, retested at month 3, had normalized completely." },
        { name: "Priya, 34", type: "Post-Pill PCOS", color: "#4A8FA3", before: "Priya had been on the pill since age 16 and stopped at 33 to try to conceive. Eighteen months later, she had irregular, painful periods, severe hair loss, and debilitating acne she had never experienced before.", journey: "Once Priya understood she had Post-Pill PCOS, the confusion lifted. She began methylfolate, B-complex, Zinc, and Vitex. She added seed cycling and focused on liver-supportive nutrition. Her hair loss slowed at month 2. By month 4, her cycles became regular.", result: "Priya conceived naturally at month 7 post-protocol. She credits understanding her PCOS type as the most empowering moment of her entire journey." },
      ].map((s, i) => (
        <div key={i} style={{ background: "white", border: `2px solid ${s.color}30`, borderRadius: 12, padding: isMobile ? "18px 14px" : "26px", marginBottom: 18 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 16 }}>
            <div style={{ width: 42, height: 42, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 16, fontFamily: "'Playfair Display',serif", fontWeight: 700, flexShrink: 0 }}>{s.name[0]}</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 17, color: "#2D2416" }}>{s.name}</div>
              <div style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: s.color, fontWeight: 700 }}>{s.type}</div>
            </div>
          </div>
          {[["Before", s.before], ["The Journey", s.journey]].map(([label, text]) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", fontWeight: 700, color: "#9C8472", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>{label}</div>
              <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{text}</p>
            </div>
          ))}
          <div style={{ background: "#F0F9F3", border: `1px solid ${s.color}30`, borderRadius: 8, padding: "12px 14px" }}>
            <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", fontWeight: 700, color: "#4A8A5C", textTransform: "uppercase", letterSpacing: 1, marginBottom: 5 }}>✓ Result</div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{s.result}</p>
          </div>
        </div>
      ))}
      <DoneBtn />
    </div>
  );

  if (chapterId === "ch8") return (
    <div className="fade-in">
      <div style={{ fontSize: 10, fontFamily: "'Lato',sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 12 }}>Chapter 8</div>
      <h2>Your 30-Day Holistic PCOS Kickstart Plan</h2>
      <p>Everything you've learned in this guide comes together here. This 30-day plan is your runway to hormonal healing — structured enough to guide you, flexible enough for real life.</p>
      {[
        { week: "Week 1", title: "Foundation Week", color: "#C47D52", focus: "Diet overhaul + supplement protocol launch + begin tracking", tasks: ["Clear your kitchen of refined sugar, seed oils, and processed grains", "Stock your fridge with PCOS Fertility Plate staples", "Order and begin your supplement protocol based on your type", "Download Kindara or Fertility Friend — begin logging daily", "Start BBT charting every morning before getting up", "Choose your one daily stress practice and schedule it", "Take a post-meal 10–15 minute walk after at least 2 meals per day"] },
        { week: "Week 2", title: "Rhythm Week", color: "#8B6BAE", focus: "Build consistency + deepen cycle awareness + add movement", tasks: ["Maintain dietary changes from Week 1 — aim for 80% consistency", "Add your first strength training sessions (2x this week)", "Monitor and log cervical mucus daily alongside BBT", "Begin LH strip testing if approaching your fertile window", "Check in: how is your energy, digestion, and bloating vs Day 1?", "Journal for 10 minutes each morning", "Hydration goal: 2.5–3 liters of water daily"] },
        { week: "Week 3", title: "Depth Week", color: "#4A8A5C", focus: "Address your specific PCOS type + optimize your fertile window", tasks: ["Review your PCOS type chapter and implement remaining recommendations", "Schedule a blood panel: Testosterone, DHEA-S, Insulin, Vitamin D, AMH, FSH, LH", "Study your first 2 weeks of BBT and mucus data — what patterns do you see?", "Incorporate a restorative yoga session this week", "Begin seed cycling if not already", "Plan 2 full rest days this week — honor them", "Revisit your supplement timing — are you taking them consistently?"] },
        { week: "Week 4", title: "Momentum Week", color: "#B06E4A", focus: "Reflect + recalibrate + commit to the long game", tasks: ["Write a 'before and after' reflection: symptoms on Day 1 vs now", "Note any changes: energy, skin, bloating, mood, cravings, cycle signs", "Are you sleeping 7–9 hours? Identify and remove your #1 sleep barrier", "Plan your Month 2 — which adjustments will you make?", "Share your journey with one person who can hold you accountable", "Book a follow-up with a PCOS-aware provider to review your progress", "Celebrate what you've done this month — this is not a small thing"] },
      ].map((w, i) => (
        <div key={i} style={{ marginBottom: 22 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: w.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, fontFamily: "'Lato',sans-serif", flexShrink: 0 }}>{i + 1}</div>
            <div>
              <div style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 16 : 19, color: "#2D2416" }}>{w.week}: {w.title}</div>
              <div style={{ fontSize: 12, fontFamily: "'Lato',sans-serif", color: "#7A6452", fontStyle: "italic" }}>{w.focus}</div>
            </div>
          </div>
          <div style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: isMobile ? "14px" : "18px 22px" }}>
            {w.tasks.map((task, j) => (
              <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", paddingBottom: 9, borderBottom: j < w.tasks.length - 1 ? "1px solid #F0EAE0" : "none", marginBottom: j < w.tasks.length - 1 ? 9 : 0 }}>
                <div style={{ width: 18, height: 18, border: `2px solid ${w.color}`, borderRadius: 4, flexShrink: 0, marginTop: 2 }} />
                <span className="sans" style={{ fontSize: isMobile ? 13 : 14, lineHeight: 1.7, color: "#3D2E1E" }}>{task}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
      <h3>Frequently Asked Questions</h3>
      {[
        { q: "How long does it really take to see results?", a: "Most women notice changes in energy, skin, and digestion within 2–4 weeks. Hormonal markers and cycle regularity typically improve at the 3–6 month mark. The long game is real — but so are the results." },
        { q: "Can I do this alongside fertility treatments like Clomid or IUI?", a: "Yes — the nutritional and lifestyle foundation significantly improves the effectiveness of medical treatments. Always inform your doctor of supplements you're taking. Vitex should not be combined with Clomid." },
        { q: "I don't get periods at all. Where do I start?", a: "Start with nutrition and supplements as your foundation. Track with LH strips and BBT so you'll catch ovulation if and when it occurs. Some women ovulate without visible periods. Also prioritize sleep — it's where the most hormonal repair happens." },
        { q: "I've tried 'eating clean' before and nothing happened.", a: "Eating clean is not the same as eating specifically for PCOS and your unique type. The specificity matters enormously — especially the protein:carb ratio, meal timing, and elimination of specific triggers relevant to your PCOS type." },
      ].map((faq, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: isMobile ? "14px" : "18px 22px", marginBottom: 10 }}>
          <div style={{ fontFamily: "'Playfair Display',serif", fontSize: 15, color: "#2D2416", marginBottom: 8 }}>Q: {faq.q}</div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{faq.a}</p>
        </div>
      ))}
      <DoneBtn />
    </div>
  );

  return (
    <div className="fade-in" style={{ textAlign: "center", padding: isMobile ? "40px 12px" : "56px 20px" }}>
      <div style={{ fontSize: 46, marginBottom: 20 }}>🌿</div>
      <h2 style={{ fontFamily: "'Playfair Display',serif", fontSize: isMobile ? 24 : 30, color: "#2D2416", marginBottom: 14 }}>You Are Ready</h2>
      <p className="sans" style={{ fontSize: isMobile ? 15 : 17, color: "#6B5744", lineHeight: 1.8, maxWidth: 500, margin: "0 auto 28px" }}>
        You now have everything you need to begin your holistic path to natural conception with PCOS. The science is on your side. Your body is capable. And you are equipped.
      </p>
      <div style={{ background: "#FDF3EC", border: "2px solid #C47D52", borderRadius: 12, padding: isMobile ? "20px 16px" : "28px", maxWidth: 500, margin: "0 auto 28px", textAlign: "left" }}>
        <h3 style={{ fontFamily: "'Playfair Display',serif", fontSize: 19, color: "#B06E4A", marginBottom: 12 }}>💛 Your Next Step</h3>
        <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>
          This guide is your foundation. For deeper, personalized support — including 1:1 guidance, custom supplement protocols, and cycle coaching — explore our full PCOS Fertility Program designed to walk you through every step of this journey with expert support.
        </p>
      </div>
      <button className="btn-primary" onClick={() => { if (typeof window !== "undefined") window.scrollTo(0, 0); }} style={{ width: isMobile ? "100%" : "auto" }}>Return to Beginning</button>
    </div>
  );
}

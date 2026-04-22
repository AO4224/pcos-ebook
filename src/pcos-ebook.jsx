import { useState, useEffect } from "react";

const PCOS_TYPES = {
  insulin: {
    id: "insulin",
    name: "Insulin-Resistant PCOS",
    emoji: "🩸",
    color: "#C17F5A",
    bg: "#FDF3EC",
    tagline: "The most common type — your body's sugar regulation is at the root",
    description:
      "Insulin-Resistant PCOS is the most prevalent form, affecting up to 70% of women with PCOS. When your cells stop responding properly to insulin, your pancreas pumps out more of it — and that excess insulin signals your ovaries to produce extra androgens (male hormones) like testosterone. This hormonal imbalance disrupts ovulation, causing irregular or absent periods, and making conception harder.",
    symptoms: [
      "Irregular or absent periods",
      "Weight gain — especially around the belly",
      "Sugar cravings and energy crashes after meals",
      "Skin tags or darkened skin folds (acanthosis nigricans)",
      "Fatigue after eating carbohydrates",
      "Difficulty losing weight despite effort",
    ],
    fertilityImpact:
      "Excess insulin directly suppresses ovulation. Without regular ovulation, there's no egg to fertilize — making cycle regularity the #1 priority for this type.",
    naturalPath: [
      "Low-glycemic, anti-inflammatory diet",
      "Inositol (Myo + D-Chiro ratio 40:1) — clinically shown to restore ovulation",
      "Berberine — natural insulin sensitizer",
      "Strength training + walking (30 min daily)",
      "Reducing refined sugar and processed carbs",
    ],
    hopeStat: "Studies show up to 60% of women with IR-PCOS restore ovulation within 3–6 months of dietary changes alone.",
  },
  adrenal: {
    id: "adrenal",
    name: "Adrenal PCOS",
    emoji: "⚡",
    color: "#8B6BAE",
    bg: "#F3EEF8",
    tagline: "Stress is your trigger — your adrenal glands are running the show",
    description:
      "Adrenal PCOS is driven by an overactive stress response. Your adrenal glands — which sit on top of your kidneys — produce a specific androgen called DHEA-S. In this type of PCOS, those glands are in overdrive, pumping out excess androgens in response to chronic stress, whether physical, emotional, or lifestyle-based. Importantly, insulin levels are often normal in this type.",
    symptoms: [
      "Elevated DHEA-S on blood work (normal testosterone)",
      "Anxiety, burnout, or feeling 'wired but tired'",
      "Acne — especially on the jawline and chin",
      "Hair thinning or loss",
      "Sleep disturbances and waking at 3–4am",
      "Symptoms worsen significantly during stressful periods",
    ],
    fertilityImpact:
      "Elevated cortisol from chronic stress directly suppresses GnRH — the hormone that kickstarts your entire ovulation cascade. No GnRH signal = no ovulation.",
    naturalPath: [
      "Nervous system regulation (breathwork, somatic practices)",
      "Adaptogenic herbs: Ashwagandha, Rhodiola, Holy Basil",
      "Strict sleep hygiene (cortisol resets at night)",
      "Reducing intense cardio — walk, swim, yoga instead",
      "Magnesium glycinate for cortisol + sleep support",
    ],
    hopeStat: "Women with Adrenal PCOS often see the fastest results when stress reduction is prioritized — some restore cycles within 8–12 weeks.",
  },
  inflammatory: {
    id: "inflammatory",
    name: "Inflammatory PCOS",
    emoji: "🔥",
    color: "#C45C5C",
    bg: "#FAEAEA",
    tagline: "Your immune system is inflamed — and it's blocking your hormones",
    description:
      "Inflammatory PCOS occurs when chronic, low-grade inflammation in the body triggers the ovaries to produce excess androgens. This inflammation can come from food sensitivities (especially gluten and dairy), gut dysbiosis, environmental toxins, or underlying autoimmune activity. It's often overlooked because standard PCOS panels don't test for inflammatory markers.",
    symptoms: [
      "Headaches or migraines",
      "Chronic fatigue not explained by sleep",
      "Eczema, skin rashes, or psoriasis",
      "Digestive issues — bloating, IBS-like symptoms",
      "Joint pain or body aches",
      "Elevated CRP or inflammatory markers on bloodwork",
    ],
    fertilityImpact:
      "Inflammation impairs egg quality, disrupts the uterine lining, and interferes with implantation — meaning even if ovulation occurs, conception can still be blocked.",
    naturalPath: [
      "Anti-inflammatory diet: Mediterranean-style, omega-3 rich",
      "Eliminate common triggers: gluten, dairy, seed oils",
      "Heal the gut: probiotics, bone broth, fermented foods",
      "Curcumin (turmeric extract) — powerful anti-inflammatory",
      "Test for food sensitivities and autoimmune markers",
    ],
    hopeStat: "Removing inflammatory food triggers alone has been shown to significantly reduce androgen levels and restore cycle regularity within 3 months.",
  },
  postPill: {
    id: "postPill",
    name: "Post-Pill PCOS",
    emoji: "💊",
    color: "#4A8FA3",
    bg: "#EBF4F7",
    tagline: "Your hormones are recalibrating after stopping birth control",
    description:
      "Post-Pill PCOS develops after stopping hormonal birth control — most often the combined oral contraceptive pill. The pill suppresses your natural hormone production, and when you stop, there can be a temporary surge in androgens and LH as your body tries to reboot its own hormonal system. This is often a temporary condition, but it can persist and mimic other PCOS types if not addressed.",
    symptoms: [
      "Regular periods before the pill, irregular after stopping",
      "Sudden onset acne after going off the pill",
      "Hair shedding or loss post-pill",
      "Mood swings and anxiety",
      "Absence of periods for 3+ months after stopping",
      "Symptoms appeared within 3–6 months of stopping birth control",
    ],
    fertilityImpact:
      "The pill depletes key fertility nutrients (B6, B12, folate, zinc, magnesium) and can disrupt gut microbiome — both essential for a healthy hormonal environment for conception.",
    naturalPath: [
      "Replenish depleted nutrients: methylfolate, B-complex, zinc, magnesium",
      "Support liver detox to clear synthetic hormones",
      "Vitex (Chaste Tree Berry) to re-regulate LH/FSH ratio",
      "Seed cycling to gently reintroduce natural hormone rhythms",
      "Give your body 3–6 months of nutritional support before additional interventions",
    ],
    hopeStat: "Post-Pill PCOS is often the most reversible type. With proper nutritional support, most women restore ovulatory cycles within 3–6 months.",
  },
};

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "How would you describe your weight and metabolism?",
    options: [
      { text: "I gain weight easily, especially in my belly, and struggle to lose it", scores: { insulin: 3, adrenal: 1 } },
      { text: "My weight is fairly stable but I feel puffy or inflamed", scores: { inflammatory: 3 } },
      { text: "I'm at a normal weight — PCOS symptoms seem unrelated to weight", scores: { adrenal: 2, postPill: 1 } },
      { text: "I gained weight after stopping birth control", scores: { postPill: 3 } },
    ],
  },
  {
    id: 2,
    question: "What does your stress and energy level feel like most days?",
    options: [
      { text: "I'm constantly overwhelmed, anxious, or burned out", scores: { adrenal: 3 } },
      { text: "I crash after meals and feel foggy — my energy is unpredictable", scores: { insulin: 3 } },
      { text: "I'm exhausted no matter how much I sleep", scores: { inflammatory: 3 } },
      { text: "My energy was fine until I stopped the pill", scores: { postPill: 3 } },
    ],
  },
  {
    id: 3,
    question: "What does your skin and hair look like?",
    options: [
      { text: "Acne on my jawline, chin — gets worse when I'm stressed", scores: { adrenal: 3 } },
      { text: "Acne + oily skin + dark patches on my neck or underarms", scores: { insulin: 3 } },
      { text: "Eczema, rashes, or skin that reacts easily to food or products", scores: { inflammatory: 3 } },
      { text: "My skin and hair were fine on the pill — problems started after stopping", scores: { postPill: 3 } },
    ],
  },
  {
    id: 4,
    question: "What are your eating patterns like?",
    options: [
      { text: "I crave sugar and carbs constantly — hard to feel satisfied", scores: { insulin: 3 } },
      { text: "I eat pretty well but my body still reacts — bloating, fatigue after meals", scores: { inflammatory: 3 } },
      { text: "I eat when I can — stress makes me forget to eat or overeat", scores: { adrenal: 2 } },
      { text: "My diet is fine — hormones feel 'off' despite eating well", scores: { postPill: 2, adrenal: 1 } },
    ],
  },
  {
    id: 5,
    question: "When did your PCOS symptoms begin or get worse?",
    options: [
      { text: "Gradually over the years — always had irregular cycles", scores: { insulin: 2, inflammatory: 2 } },
      { text: "During an extremely stressful period in my life", scores: { adrenal: 3 } },
      { text: "After a major health event, illness, or dietary change", scores: { inflammatory: 3 } },
      { text: "Shortly after stopping hormonal birth control", scores: { postPill: 3 } },
    ],
  },
  {
    id: 6,
    question: "Do you experience any of these physical symptoms regularly?",
    options: [
      { text: "Joint pain, headaches, or chronic low-grade inflammation", scores: { inflammatory: 3 } },
      { text: "Heart racing, anxiety, poor sleep, waking at night", scores: { adrenal: 3 } },
      { text: "Dark skin patches, skin tags, or strong sugar cravings", scores: { insulin: 3 } },
      { text: "Hair loss, mood swings — all starting after stopping birth control", scores: { postPill: 3 } },
    ],
  },
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
  const [screen, setScreen] = useState("cover"); // cover | quiz | result | chapter
  const [quizStep, setQuizStep] = useState(0);
  const [scores, setScores] = useState({ insulin: 0, adrenal: 0, inflammatory: 0, postPill: 0 });
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [pcosType, setPcosType] = useState(null);
  const [activeChapter, setActiveChapter] = useState("intro");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [completedChapters, setCompletedChapters] = useState(new Set());

  const handleAnswer = (optionScores, questionId) => {
    const newScores = { ...scores };
    Object.entries(optionScores).forEach(([type, pts]) => {
      newScores[type] = (newScores[type] || 0) + pts;
    });
    setScores(newScores);
    setSelectedAnswers({ ...selectedAnswers, [questionId]: true });

    if (quizStep < QUIZ_QUESTIONS.length - 1) {
      setTimeout(() => setQuizStep(quizStep + 1), 300);
    } else {
      const topType = Object.entries(newScores).sort((a, b) => b[1] - a[1])[0][0];
      setPcosType(topType);
      setTimeout(() => setScreen("result"), 400);
    }
  };

  const enterEbook = () => {
    setScreen("chapter");
    setActiveChapter("intro");
  };

  const markComplete = (chId) => {
    setCompletedChapters(new Set([...completedChapters, chId]));
  };

  const type = PCOS_TYPES[pcosType];

  return (
    <div style={{
      fontFamily: "'Georgia', serif",
      minHeight: "100vh",
      background: "#FBF7F2",
      color: "#2D2416",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #FBF7F2; }
        .serif { font-family: 'Playfair Display', Georgia, serif; }
        .sans { font-family: 'Lato', sans-serif; }
        .btn-primary {
          background: #B06E4A;
          color: white;
          border: none;
          padding: 16px 40px;
          font-size: 16px;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .btn-primary:hover { background: #8F5535; transform: translateY(-2px); box-shadow: 0 6px 20px rgba(176,110,74,0.3); }
        .btn-ghost {
          background: transparent;
          color: #B06E4A;
          border: 2px solid #B06E4A;
          padding: 12px 32px;
          font-size: 14px;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s;
        }
        .btn-ghost:hover { background: #B06E4A; color: white; }
        .answer-card {
          background: white;
          border: 2px solid #E8DDD2;
          border-radius: 8px;
          padding: 18px 24px;
          cursor: pointer;
          transition: all 0.2s;
          text-align: left;
          width: 100%;
          font-family: 'Lato', sans-serif;
          font-size: 15px;
          color: #2D2416;
          line-height: 1.5;
          margin-bottom: 12px;
          display: block;
        }
        .answer-card:hover { border-color: #B06E4A; background: #FDF3EC; transform: translateX(4px); }
        .chapter-nav-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 12px 16px;
          cursor: pointer;
          border-radius: 6px;
          transition: all 0.15s;
          font-family: 'Lato', sans-serif;
          font-size: 13px;
          color: #6B5744;
          border: none;
          background: transparent;
          width: 100%;
          text-align: left;
        }
        .chapter-nav-item:hover { background: #EDE0D4; color: #2D2416; }
        .chapter-nav-item.active { background: #B06E4A; color: white; }
        .chapter-nav-item.done { color: #4A8A5C; }
        .type-card {
          border: 3px solid transparent;
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .type-card:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
        .fade-in { animation: fadeIn 0.5s ease forwards; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        .pill-badge {
          display: inline-block;
          background: rgba(255,255,255,0.6);
          border: 1px solid currentColor;
          border-radius: 20px;
          padding: 4px 12px;
          font-size: 12px;
          font-family: 'Lato', sans-serif;
          font-weight: 700;
          letter-spacing: 0.5px;
          margin: 3px;
        }
        .progress-bar-bg { background: #E8DDD2; border-radius: 20px; height: 6px; }
        .progress-bar-fill { background: linear-gradient(to right, #C47D52, #E8A87C); border-radius: 20px; height: 6px; transition: width 0.5s ease; }
        .stat-box {
          background: white;
          border-left: 4px solid #B06E4A;
          padding: 16px 20px;
          border-radius: 0 8px 8px 0;
          margin: 20px 0;
          font-family: 'Lato', sans-serif;
          font-style: italic;
          color: #5A3E2B;
        }
        .chapter-content h2 { font-family: 'Playfair Display', serif; font-size: 32px; margin-bottom: 16px; color: #2D2416; }
        .chapter-content h3 { font-family: 'Playfair Display', serif; font-size: 22px; margin: 28px 0 12px; color: #5A3E2B; }
        .chapter-content p { font-family: 'Lato', sans-serif; font-size: 16px; line-height: 1.85; color: #3D2E1E; margin-bottom: 16px; }
        .chapter-content ul { padding-left: 20px; margin-bottom: 16px; }
        .chapter-content li { font-family: 'Lato', sans-serif; font-size: 15px; line-height: 1.8; color: #3D2E1E; margin-bottom: 6px; }
        .action-box { background: #FDF3EC; border: 2px solid #C47D52; border-radius: 10px; padding: 24px; margin: 28px 0; }
        .action-box h4 { font-family: 'Playfair Display', serif; font-size: 18px; color: #B06E4A; margin-bottom: 12px; }
        .scrollbar::-webkit-scrollbar { width: 5px; }
        .scrollbar::-webkit-scrollbar-track { background: #EDE0D4; }
        .scrollbar::-webkit-scrollbar-thumb { background: #C47D52; border-radius: 10px; }
      `}</style>

      {/* ─── COVER SCREEN ─── */}
      {screen === "cover" && (
        <div className="fade-in" style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          background: "linear-gradient(160deg, #FDF3EC 0%, #FBF7F2 50%, #F0EAE2 100%)",
          position: "relative",
          overflow: "hidden",
        }}>
          {/* decorative circles */}
          <div style={{ position: "absolute", top: -80, right: -80, width: 320, height: 320, borderRadius: "50%", background: "rgba(196,125,82,0.08)", pointerEvents: "none" }} />
          <div style={{ position: "absolute", bottom: -60, left: -60, width: 240, height: 240, borderRadius: "50%", background: "rgba(139,107,174,0.06)", pointerEvents: "none" }} />

          <div style={{ textAlign: "center", maxWidth: 640 }}>
            <div style={{ fontSize: 13, fontFamily: "'Lato', sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "#B06E4A", marginBottom: 28, fontWeight: 700 }}>
              A Complete Holistic Guide
            </div>

            <h1 className="serif" style={{ fontSize: "clamp(32px,5vw,56px)", fontWeight: 700, lineHeight: 1.2, color: "#2D2416", marginBottom: 20 }}>
              The Holistic PCOS Guide<br />
              <em style={{ color: "#B06E4A" }}>to Getting Pregnant Naturally</em>
            </h1>

            <div style={{ width: 60, height: 3, background: "#C47D52", margin: "24px auto", borderRadius: 2 }} />

            <p className="sans" style={{ fontSize: 18, color: "#6B5744", lineHeight: 1.7, marginBottom: 40, fontWeight: 300 }}>
              Simple, Science-Backed Steps to Balance Your Hormones<br />and Reclaim Your Fertility
            </p>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
              {["🧬 Science-Backed", "🌿 100% Natural", "💛 Compassionate"].map(tag => (
                <span key={tag} style={{
                  background: "white",
                  border: "1px solid #E8DDD2",
                  borderRadius: 30,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontFamily: "'Lato', sans-serif",
                  color: "#6B5744",
                  fontWeight: 600,
                }}>
                  {tag}
                </span>
              ))}
            </div>

            <button className="btn-primary" style={{ fontSize: 15, padding: "18px 52px", marginBottom: 20 }} onClick={() => setScreen("quiz")}>
              Start My PCOS Journey →
            </button>

            <p className="sans" style={{ fontSize: 13, color: "#9C8472", marginTop: 12 }}>
              Begin with your free PCOS type assessment — 6 questions, personalized results
            </p>
          </div>
        </div>
      )}

      {/* ─── QUIZ SCREEN ─── */}
      {screen === "quiz" && (
        <div className="fade-in" style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 24px",
          background: "#FBF7F2",
        }}>
          <div style={{ width: "100%", maxWidth: 600 }}>
            {/* Header */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, textTransform: "uppercase", color: "#B06E4A", fontWeight: 700, marginBottom: 12 }}>
                PCOS Type Assessment
              </div>
              <h2 className="serif" style={{ fontSize: 28, color: "#2D2416", marginBottom: 8 }}>
                Discover Your PCOS Type
              </h2>
              <p className="sans" style={{ fontSize: 15, color: "#7A6452" }}>
                Knowing your type is the foundation of effective, targeted healing
              </p>
            </div>

            {/* Progress */}
            <div style={{ marginBottom: 32 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                <span className="sans" style={{ fontSize: 12, color: "#9C8472", fontWeight: 700 }}>
                  Question {quizStep + 1} of {QUIZ_QUESTIONS.length}
                </span>
                <span className="sans" style={{ fontSize: 12, color: "#9C8472" }}>
                  {Math.round(((quizStep) / QUIZ_QUESTIONS.length) * 100)}% complete
                </span>
              </div>
              <div className="progress-bar-bg">
                <div className="progress-bar-fill" style={{ width: `${(quizStep / QUIZ_QUESTIONS.length) * 100}%` }} />
              </div>
            </div>

            {/* Question */}
            <div className="fade-in" key={quizStep}>
              <div style={{ background: "white", borderRadius: 12, padding: "32px", marginBottom: 24, border: "1px solid #E8DDD2", boxShadow: "0 4px 20px rgba(0,0,0,0.05)" }}>
                <h3 className="serif" style={{ fontSize: 22, color: "#2D2416", marginBottom: 28, lineHeight: 1.4 }}>
                  {QUIZ_QUESTIONS[quizStep].question}
                </h3>

                {QUIZ_QUESTIONS[quizStep].options.map((opt, i) => (
                  <button
                    key={i}
                    className="answer-card"
                    onClick={() => handleAnswer(opt.scores, quizStep)}
                  >
                    <span style={{ color: "#B06E4A", fontWeight: 700, marginRight: 10 }}>{String.fromCharCode(65 + i)}.</span>
                    {opt.text}
                  </button>
                ))}
              </div>
            </div>

            <p className="sans" style={{ textAlign: "center", fontSize: 13, color: "#B0A090" }}>
              There are no wrong answers — this is just a starting point for your personalized journey
            </p>
          </div>
        </div>
      )}

      {/* ─── RESULT SCREEN ─── */}
      {screen === "result" && type && (
        <div className="fade-in" style={{ minHeight: "100vh", background: type.bg, padding: "40px 24px" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            {/* Type header */}
            <div style={{ textAlign: "center", marginBottom: 40 }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>{type.emoji}</div>
              <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, textTransform: "uppercase", color: type.color, fontWeight: 700, marginBottom: 12 }}>
                Your PCOS Type
              </div>
              <h1 className="serif" style={{ fontSize: "clamp(28px,4vw,44px)", color: "#2D2416", marginBottom: 12, lineHeight: 1.2 }}>
                {type.name}
              </h1>
              <p className="sans" style={{ fontSize: 17, color: "#5A4433", fontStyle: "italic", marginBottom: 24 }}>
                "{type.tagline}"
              </p>
              <div style={{ width: 50, height: 3, background: type.color, margin: "0 auto 32px" }} />
            </div>

            {/* Description card */}
            <div style={{ background: "white", borderRadius: 12, padding: "32px", marginBottom: 24, border: `1px solid ${type.color}30`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <h3 className="serif" style={{ fontSize: 20, color: "#2D2416", marginBottom: 16 }}>What This Means For You</h3>
              <p className="sans" style={{ fontSize: 15, lineHeight: 1.85, color: "#3D2E1E" }}>{type.description}</p>
            </div>

            {/* Symptoms */}
            <div style={{ background: "white", borderRadius: 12, padding: "32px", marginBottom: 24, border: `1px solid ${type.color}30` }}>
              <h3 className="serif" style={{ fontSize: 20, color: "#2D2416", marginBottom: 16 }}>Common Symptoms of {type.name}</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {type.symptoms.map((s, i) => (
                  <span key={i} className="pill-badge" style={{ color: type.color, borderColor: type.color }}>
                    ✓ {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Fertility impact */}
            <div style={{ background: "white", borderRadius: 12, padding: "32px", marginBottom: 24, border: `1px solid ${type.color}30` }}>
              <h3 className="serif" style={{ fontSize: 20, color: "#2D2416", marginBottom: 12 }}>🤰 How This Affects Your Fertility</h3>
              <p className="sans" style={{ fontSize: 15, lineHeight: 1.8, color: "#3D2E1E" }}>{type.fertilityImpact}</p>
            </div>

            {/* Natural path */}
            <div style={{ background: "white", borderRadius: 12, padding: "32px", marginBottom: 24, border: `1px solid ${type.color}30` }}>
              <h3 className="serif" style={{ fontSize: 20, color: "#2D2416", marginBottom: 16 }}>🌿 Your Natural Path to Conception</h3>
              <p className="sans" style={{ fontSize: 14, color: "#7A6452", marginBottom: 16 }}>Based on your PCOS type, these are your highest-priority interventions:</p>
              {type.naturalPath.map((step, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 26, height: 26, borderRadius: "50%", background: type.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, fontFamily: "'Lato', sans-serif", flexShrink: 0 }}>
                    {i + 1}
                  </div>
                  <span className="sans" style={{ fontSize: 15, color: "#3D2E1E", paddingTop: 3, lineHeight: 1.6 }}>{step}</span>
                </div>
              ))}
            </div>

            {/* Hope stat */}
            <div className="stat-box">
              💛 <strong>Research says:</strong> {type.hopeStat}
            </div>

            {/* Other types note */}
            <div style={{ background: "#FBF7F2", border: "1px solid #E8DDD2", borderRadius: 10, padding: "20px 24px", marginBottom: 32 }}>
              <p className="sans" style={{ fontSize: 13, color: "#7A6452", lineHeight: 1.7 }}>
                <strong>Note:</strong> PCOS types can overlap, and many women have a combination. This guide covers all four types throughout — your personalized type just tells you where to focus first.
              </p>
            </div>

            <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
              <button className="btn-primary" onClick={enterEbook}>
                Enter Your Guide →
              </button>
              <button className="btn-ghost" onClick={() => { setScreen("quiz"); setQuizStep(0); setScores({ insulin: 0, adrenal: 0, inflammatory: 0, postPill: 0 }); }}>
                Retake Quiz
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── CHAPTER VIEW ─── */}
      {screen === "chapter" && (
        <div style={{ display: "flex", minHeight: "100vh" }}>
          {/* Sidebar */}
          <div style={{
            width: sidebarOpen ? 260 : 0,
            minWidth: sidebarOpen ? 260 : 0,
            background: "#2D2416",
            transition: "width 0.3s ease, min-width 0.3s ease",
            overflow: "hidden",
            flexShrink: 0,
          }}>
            <div style={{ padding: "28px 20px", width: 260 }}>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 11, fontFamily: "'Lato', sans-serif", letterSpacing: 2, textTransform: "uppercase", color: "#C47D52", fontWeight: 700, marginBottom: 6 }}>
                  Holistic PCOS Guide
                </div>
                <div className="serif" style={{ color: "white", fontSize: 14, lineHeight: 1.4, fontStyle: "italic" }}>
                  Getting Pregnant Naturally
                </div>
              </div>

              {type && (
                <div style={{ background: "rgba(255,255,255,0.07)", borderRadius: 8, padding: "12px 14px", marginBottom: 24, border: `1px solid ${type.color}40` }}>
                  <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", color: "#C47D52", fontWeight: 700, marginBottom: 4 }}>
                    Your Type
                  </div>
                  <div style={{ fontSize: 13, fontFamily: "'Lato', sans-serif", color: "white" }}>
                    {type.emoji} {type.name}
                  </div>
                </div>
              )}

              {/* Progress */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 11, fontFamily: "'Lato', sans-serif", color: "#9C8472", textTransform: "uppercase", letterSpacing: 1 }}>Progress</span>
                  <span style={{ fontSize: 11, fontFamily: "'Lato', sans-serif", color: "#9C8472" }}>
                    {completedChapters.size}/{CHAPTERS.length}
                  </span>
                </div>
                <div style={{ background: "#4A3828", borderRadius: 10, height: 5 }}>
                  <div style={{ width: `${(completedChapters.size / CHAPTERS.length) * 100}%`, background: "#C47D52", borderRadius: 10, height: 5, transition: "width 0.5s" }} />
                </div>
              </div>

              {/* Chapter nav */}
              <nav>
                {CHAPTERS.map(ch => (
                  <button
                    key={ch.id}
                    className={`chapter-nav-item ${activeChapter === ch.id ? "active" : ""} ${completedChapters.has(ch.id) && activeChapter !== ch.id ? "done" : ""}`}
                    onClick={() => setActiveChapter(ch.id)}
                    style={{ color: activeChapter === ch.id ? "white" : completedChapters.has(ch.id) ? "#7DC48A" : "#A89080" }}
                  >
                    <span>{completedChapters.has(ch.id) ? "✓" : ch.icon}</span>
                    <span style={{ fontSize: 13 }}>{ch.title}</span>
                  </button>
                ))}
              </nav>

              <div style={{ marginTop: 32, padding: "16px", background: "rgba(196,125,82,0.1)", borderRadius: 8, border: "1px solid rgba(196,125,82,0.2)" }}>
                <p style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", color: "#C47D52", lineHeight: 1.6 }}>
                  💛 You are not broken. Your body is asking for support — and you're giving it exactly that.
                </p>
              </div>
            </div>
          </div>

          {/* Main content */}
          <div style={{ flex: 1, overflow: "auto" }} className="scrollbar">
            {/* Top bar */}
            <div style={{ background: "white", borderBottom: "1px solid #E8DDD2", padding: "14px 28px", display: "flex", alignItems: "center", gap: 16, position: "sticky", top: 0, zIndex: 10 }}>
              <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#B06E4A" }}>
                ☰
              </button>
              <span className="sans" style={{ fontSize: 13, color: "#9C8472" }}>
                {CHAPTERS.find(c => c.id === activeChapter)?.title}
              </span>
              {type && (
                <span style={{ marginLeft: "auto", fontSize: 13, fontFamily: "'Lato', sans-serif", color: type.color, background: type.bg, padding: "4px 14px", borderRadius: 20, fontWeight: 700 }}>
                  {type.emoji} {type.name.split(" ")[0]} Type Tips Included
                </span>
              )}
            </div>

            {/* Chapter content */}
            <div style={{ maxWidth: 760, margin: "0 auto", padding: "48px 32px" }} className="chapter-content">
              <ChapterContent chapterId={activeChapter} pcosType={type} onComplete={() => markComplete(activeChapter)} onNext={() => {
                const idx = CHAPTERS.findIndex(c => c.id === activeChapter);
                if (idx < CHAPTERS.length - 1) setActiveChapter(CHAPTERS[idx + 1].id);
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Ch2ActionBox() {
  const [copied1, setCopied1] = useState(false);
  const [copied2, setCopied2] = useState(false);

  const prompt1 = `I'm a woman with PCOS working on improving my diet to support natural conception. I've attached a photo of a meal I just ate. Please analyze it and tell me:
1. How well does this meal align with a PCOS-friendly, fertility-supportive diet?
2. Does it support blood sugar balance, reduce inflammation, and include quality protein?
3. What is working well in this meal?
4. What one or two simple adjustments could make it even more PCOS-supportive?
Please keep your feedback encouraging and practical.`;

  const prompt2 = `I have PCOS and I'm trying to eat in a way that supports natural pregnancy. I've uploaded a photo of a meal I just made. Based on what you see:
1. What nutrients does this meal appear to offer that support hormonal balance and fertility?
2. Is there anything in this meal that might spike blood sugar or cause inflammation?
3. Suggest one easy swap or addition I could make next time to make this meal more fertility-friendly for PCOS.
Keep it simple — I'm building new habits one meal at a time.`;

  const copy = (text, which) => {
    navigator.clipboard.writeText(text).then(() => {
      if (which === 1) { setCopied1(true); setTimeout(() => setCopied1(false), 2500); }
      else { setCopied2(true); setTimeout(() => setCopied2(false), 2500); }
    });
  };

  return (
    <div className="action-box">
      <h4>✏️ Your Action Step for Chapter 2</h4>
      <p className="sans" style={{ fontSize: 15, marginBottom: 0, lineHeight: 1.75 }}>
        For the next 7 days, build every meal around the PCOS Fertility Plate above. Take a photo of each meal. You don't need to be perfect — aim for 80% compliance. By day 7, notice: how is your energy? Your bloating? Your mood after meals?
      </p>

      {/* Divider */}
      <div style={{ borderTop: "1px solid #E0C9B5", margin: "24px 0" }} />

      {/* AI Prompt Section */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
          <span style={{ fontSize: 18 }}>🤖</span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, color: "#2D2416", fontWeight: 700 }}>
            Take It Further with AI
          </span>
        </div>
        <p className="sans" style={{ fontSize: 14, color: "#7A6452", lineHeight: 1.7, marginBottom: 4 }}>
          After you take your meal photo, upload it to ChatGPT or Claude and paste one of these prompts. The AI will break down your meal and give you personalized, PCOS-friendly feedback.
        </p>
        <p className="sans" style={{ fontSize: 13, color: "#9C8472", fontStyle: "italic", marginBottom: 20 }}>
          ✨ Both ChatGPT and Claude offer free accounts — no payment required to get started.
        </p>

        {/* Prompt 1 */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, fontWeight: 700, color: "#B06E4A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            Prompt 1 — Meal Analysis
          </div>
          <div style={{ background: "white", border: "1px solid #D9C5B2", borderRadius: 8, padding: "14px 16px", position: "relative" }}>
            <p className="sans" style={{ fontSize: 13, lineHeight: 1.75, color: "#3D2E1E", margin: "0 0 12px", whiteSpace: "pre-line" }}>
              {prompt1}
            </p>
            <button
              onClick={() => copy(prompt1, 1)}
              style={{
                background: copied1 ? "#4A8A5C" : "#B06E4A",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontSize: 12,
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                letterSpacing: 0.5,
                cursor: "pointer",
                transition: "background 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {copied1 ? "✓ Copied!" : "📋 Copy Prompt"}
            </button>
          </div>
        </div>

        {/* Prompt 2 */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ fontFamily: "'Lato', sans-serif", fontSize: 12, fontWeight: 700, color: "#B06E4A", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
            Prompt 2 — Personalized Feedback
          </div>
          <div style={{ background: "white", border: "1px solid #D9C5B2", borderRadius: 8, padding: "14px 16px" }}>
            <p className="sans" style={{ fontSize: 13, lineHeight: 1.75, color: "#3D2E1E", margin: "0 0 12px", whiteSpace: "pre-line" }}>
              {prompt2}
            </p>
            <button
              onClick={() => copy(prompt2, 2)}
              style={{
                background: copied2 ? "#4A8A5C" : "#B06E4A",
                color: "white",
                border: "none",
                borderRadius: 6,
                padding: "8px 18px",
                fontSize: 12,
                fontFamily: "'Lato', sans-serif",
                fontWeight: 700,
                letterSpacing: 0.5,
                cursor: "pointer",
                transition: "background 0.2s",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {copied2 ? "✓ Copied!" : "📋 Copy Prompt"}
            </button>
          </div>
        </div>

        {/* AI Links */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span className="sans" style={{ fontSize: 13, color: "#7A6452", fontWeight: 700 }}>Open your AI tool:</span>
          <a
            href="https://chatgpt.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#10A37F",
              color: "white",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 13,
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            ↗ ChatGPT
          </a>
          <a
            href="https://claude.ai"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "#C47D52",
              color: "white",
              borderRadius: 20,
              padding: "8px 18px",
              fontSize: 13,
              fontFamily: "'Lato', sans-serif",
              fontWeight: 700,
              textDecoration: "none",
              transition: "opacity 0.2s",
            }}
            onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
            onMouseOut={e => e.currentTarget.style.opacity = "1"}
          >
            ↗ Claude
          </a>
        </div>
      </div>
    </div>
  );
}

function ChapterContent({ chapterId, pcosType, onComplete, onNext }) {
  const type = pcosType;

  const CompleteButton = () => (
    <div style={{ display: "flex", gap: 12, marginTop: 40 }}>
      <button className="btn-primary" onClick={() => { onComplete(); onNext(); }}>
        Mark Complete & Continue →
      </button>
    </div>
  );

  const TypeTip = ({ children }) => type ? (
    <div style={{ background: type.bg, border: `2px solid ${type.color}50`, borderRadius: 10, padding: "20px 24px", margin: "24px 0" }}>
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", color: type.color, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>
        {type.emoji} Specific to {type.name}
      </div>
      <p className="sans" style={{ fontSize: 15, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{children}</p>
    </div>
  ) : null;

  if (chapterId === "intro") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Introduction</div>
      <h2>From Overwhelmed to Empowered</h2>
      <p>If you're reading this, chances are you've been on a journey that feels more like a maze than a path. You've Googled at 2am. You've sat in a doctor's office and walked away with more confusion than clarity. You've watched your cycle come and go — or not come at all — wondering why your body seems to be working against you.</p>
      <p>You are not broken. And PCOS does not mean you cannot get pregnant.</p>
      <p>What it means is that your body is sending you a signal — a loud, persistent one — that it needs a different kind of support than what conventional medicine typically offers. This guide is that support.</p>

      <div className="action-box">
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

      <div className="stat-box">
        💛 Research shows that lifestyle-based interventions for PCOS can restore ovulation in up to 90% of women when the right approach is applied consistently for 3–6 months.
      </div>

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch1") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 1</div>
      <h2>Why Holistic Healing Changes Everything for PCOS</h2>
      <p>Here's what most women with PCOS are told: take Metformin, lose weight, come back when you're ready to try Clomid. And while conventional medicine has its place, this approach misses something fundamental — PCOS is not a disease to be managed. It is a syndrome with a root cause that can be addressed.</p>
      <p>The word "holistic" gets used a lot, but what it really means for PCOS is this: treating the whole hormonal ecosystem — not just suppressing individual symptoms. When you address the root (whether that's insulin resistance, adrenal dysfunction, inflammation, or post-pill hormonal rebound), everything improves: your cycle, your symptoms, your energy, your fertility.</p>

      <h3>The 5-Step Holistic Roadmap</h3>
      <p>This guide is built around five interconnected pillars. Think of them less as steps and more as pillars holding up the same structure — your hormonal health:</p>

      {[
        { icon: "🥗", title: "Nutrition", desc: "Eat to regulate insulin, reduce inflammation, and create a fertile hormonal environment" },
        { icon: "🌿", title: "Supplements", desc: "Use targeted, research-backed nutrients and herbs to fill the gaps and restore balance" },
        { icon: "🧘‍♀️", title: "Stress Regulation", desc: "Heal the nervous system — because cortisol is one of the most underestimated fertility blockers" },
        { icon: "📅", title: "Cycle Awareness", desc: "Learn to read your body's signals and time conception with precision" },
        { icon: "🏃‍♀️", title: "Movement", desc: "Move in ways that work with your hormones, not against them" },
      ].map((p, i) => (
        <div key={i} style={{ display: "flex", gap: 16, padding: "16px 0", borderBottom: "1px solid #E8DDD2" }}>
          <div style={{ fontSize: 28 }}>{p.icon}</div>
          <div>
            <div className="serif" style={{ fontSize: 18, color: "#2D2416", marginBottom: 4 }}>{p.title}</div>
            <p style={{ margin: 0, fontSize: 15 }}>{p.desc}</p>
          </div>
        </div>
      ))}

      <TypeTip>
        {type?.id === "insulin" && "For Insulin-Resistant PCOS, Nutrition and Supplements are your highest-leverage pillars. Getting blood sugar stable is the single most impactful thing you can do for your fertility."}
        {type?.id === "adrenal" && "For Adrenal PCOS, Stress Regulation is your #1 priority pillar. Until you address cortisol, even perfect nutrition and supplements will have limited effect on your cycles."}
        {type?.id === "inflammatory" && "For Inflammatory PCOS, Nutrition (specifically eliminating triggers) and Supplements (specifically anti-inflammatory) are your foundation. Inflammation suppresses everything else."}
        {type?.id === "postPill" && "For Post-Pill PCOS, Supplements (nutrient replenishment) and giving your body time are the keys. Your hormonal system is rebooting — your job is to support that process, not rush it."}
      </TypeTip>

      <div className="action-box">
        <h4>✏️ Your Action Step for Chapter 1</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>
          Write down your top 3 symptoms that are most affecting your quality of life and fertility right now. Keep this list — we'll revisit it in Chapter 8 to show you exactly which pillar addresses each one.
        </p>
      </div>

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch2") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 2</div>
      <h2>Eat to Heal — The PCOS Fertility Diet That Actually Works</h2>
      <p>Food is not just fuel for women with PCOS — it is medicine. Every meal you eat sends a hormonal signal to your body. The goal isn't to eat less or to follow a restrictive diet. The goal is to eat in a way that stabilizes blood sugar, reduces inflammation, lowers androgens, and creates a fertile internal environment.</p>

      <h3>How Food Affects Your Hormones</h3>
      <p>When you eat high-glycemic foods — white bread, sugar, processed carbs — your blood sugar spikes quickly. Your pancreas releases insulin to bring it back down. In women with PCOS (especially Insulin-Resistant type), this process is impaired, leading to chronically elevated insulin. That excess insulin tells your ovaries to make more testosterone — which disrupts ovulation. No ovulation = no pregnancy.</p>
      <p>Even for non-insulin-resistant types, certain foods trigger inflammation (which suppresses egg quality) or burden the liver (which processes your hormones). What you eat matters deeply for all four PCOS types.</p>

      <h3>What to Eat: The PCOS Fertility Plate</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, margin: "24px 0" }}>
        {[
          { label: "50% Non-Starchy Vegetables", color: "#4A8A5C", items: "Leafy greens, broccoli, zucchini, bell peppers, cauliflower, asparagus" },
          { label: "25% Quality Protein", color: "#C47D52", items: "Pasture-raised eggs, wild salmon, organic chicken, lentils, grass-fed beef" },
          { label: "15% Low-Glycemic Carbs", color: "#8B6BAE", items: "Quinoa, sweet potato, brown rice, oats, chickpeas, berries" },
          { label: "10% Healthy Fats", color: "#4A8FA3", items: "Avocado, olive oil, walnuts, flaxseed, chia seeds, coconut oil" },
        ].map(p => (
          <div key={p.label} style={{ background: "white", border: `2px solid ${p.color}30`, borderRadius: 10, padding: 16 }}>
            <div style={{ fontSize: 13, fontFamily: "'Lato', sans-serif", fontWeight: 700, color: p.color, marginBottom: 8 }}>{p.label}</div>
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
        <li><strong>Alcohol</strong> — burdens the liver, which is responsible for clearing excess hormones</li>
        <li><strong>Soy in excess</strong> — can mimic estrogen; limit processed soy (edamame in moderation is fine)</li>
      </ul>

      <h3>Meal Timing for Hormonal Balance</h3>
      <p>When you eat is almost as important as what you eat for PCOS. Try these evidence-backed timing strategies:</p>
      <ul>
        <li><strong>Eat breakfast within 90 minutes of waking</strong> — skipping breakfast raises cortisol and disrupts the HPA axis</li>
        <li><strong>Front-load your calories</strong> — eat a larger breakfast and lunch, lighter dinner</li>
        <li><strong>Avoid eating 2–3 hours before bed</strong> — improves insulin sensitivity overnight</li>
        <li><strong>Eat every 3–4 hours</strong> — prevents blood sugar crashes that spike cortisol and cravings</li>
      </ul>

      <TypeTip>
        {type?.id === "insulin" && "Your dietary priority is strict blood sugar management. Try eating protein and fat before any carbohydrates at each meal — this simple hack significantly blunts the insulin spike. Aim for under 100g of net carbs per day initially."}
        {type?.id === "adrenal" && "For Adrenal PCOS, never skip meals — blood sugar dips trigger cortisol spikes. Prioritize magnesium-rich foods (dark leafy greens, pumpkin seeds, dark chocolate) and reduce caffeine, which directly stimulates your adrenal glands."}
        {type?.id === "inflammatory" && "An elimination diet for 4 weeks is your most powerful starting point. Remove gluten, dairy, seed oils, and refined sugar simultaneously. Then reintroduce one at a time to identify your personal triggers. Many women see dramatic cycle changes just from this step."}
        {type?.id === "postPill" && "Focus on liver-supportive foods to help your body clear the synthetic hormones from the pill: cruciferous vegetables (broccoli, Brussels sprouts, cabbage), beets, and lemon water daily. These support your liver's detoxification pathways."}
      </TypeTip>

      <Ch2ActionBox />

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch3") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 3</div>
      <h2>Nature's Medicine Cabinet — Supplements, Herbs & Adaptogens for PCOS Fertility</h2>
      <p>Supplements are not magic pills — but the right ones, taken consistently, can meaningfully shift your hormonal environment. Women with PCOS are often deficient in key nutrients that are critical for ovulation, egg quality, and hormonal balance. Supplements fill those gaps in ways that diet alone often can't.</p>
      <p>This chapter cuts through the overwhelming supplement industry noise and gives you a clear, prioritized protocol based on the strongest clinical evidence available.</p>

      <h3>The Core PCOS Fertility Stack</h3>

      {[
        {
          name: "Myo-Inositol + D-Chiro Inositol (40:1 ratio)",
          icon: "⭐",
          priority: "Highest Priority",
          what: "The most extensively researched supplement for PCOS fertility. Inositol is an insulin sensitizer that directly improves ovarian function, egg quality, and menstrual regularity.",
          dose: "4g Myo-Inositol + 100mg D-Chiro Inositol daily, in two divided doses",
          evidence: "Multiple RCTs show restoration of ovulation in 60–70% of women with PCOS within 3–6 months",
        },
        {
          name: "Folate (Methylfolate, not Folic Acid)",
          icon: "🧬",
          priority: "Essential for Conception",
          what: "Critical for preventing neural tube defects and supporting cell division from the moment of conception. Women with PCOS often have MTHFR gene variants that impair folic acid conversion — methylfolate bypasses this.",
          dose: "400–800mcg methylfolate daily",
          evidence: "Standard pre-conception recommendation; methylfolate form is superior for absorption in women with MTHFR variants",
        },
        {
          name: "Vitamin D3 + K2",
          icon: "☀️",
          priority: "Critical — Most Are Deficient",
          what: "Over 85% of women with PCOS are Vitamin D deficient. Vitamin D acts more like a hormone than a vitamin — it directly regulates ovarian function, AMH levels, and insulin signaling. K2 ensures calcium goes to bones, not arteries.",
          dose: "2,000–5,000 IU Vitamin D3 + 100mcg K2 daily. Test your levels first — optimal is 60–80 ng/mL",
          evidence: "Vitamin D supplementation shown to improve menstrual regularity and ovulation rates in deficient women with PCOS",
        },
        {
          name: "Magnesium Glycinate",
          icon: "🌙",
          priority: "High Priority",
          what: "Involved in over 300 enzymatic processes. For PCOS: improves insulin sensitivity, reduces cortisol, supports sleep, and reduces inflammation. The glycinate form is the most bioavailable and gentlest on digestion.",
          dose: "300–400mg magnesium glycinate, taken at night",
          evidence: "Magnesium deficiency is common in insulin resistance; supplementation improves fasting glucose and reduces inflammatory markers",
        },
        {
          name: "N-Acetyl Cysteine (NAC)",
          icon: "🔬",
          priority: "High Priority — especially Insulin-Resistant & Inflammatory",
          what: "A powerful antioxidant precursor that improves insulin sensitivity, reduces ovarian cyst formation, lowers androgens, and improves egg quality. Also shown to improve ovulation rates comparable to Clomid in some studies.",
          dose: "600mg, 2–3x daily with meals",
          evidence: "Multiple studies demonstrate NAC reduces testosterone, improves insulin resistance, and restores ovulation in PCOS",
        },
        {
          name: "Omega-3 Fatty Acids (EPA + DHA)",
          icon: "🐟",
          priority: "High Priority",
          what: "Reduce systemic inflammation, lower triglycerides (often elevated in PCOS), improve egg quality, and support hormonal balance. Critically important for fetal brain development once pregnant.",
          dose: "2–3g combined EPA + DHA daily from a high-quality, third-party tested fish oil",
          evidence: "Omega-3s shown to reduce testosterone, fasting insulin, and inflammatory markers in women with PCOS",
        },
      ].map((s, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 12, padding: "24px", marginBottom: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12, flexWrap: "wrap", gap: 8 }}>
            <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontSize: 22 }}>{s.icon}</span>
              <span className="serif" style={{ fontSize: 18, color: "#2D2416" }}>{s.name}</span>
            </div>
            <span style={{ fontSize: 11, fontFamily: "'Lato', sans-serif", background: "#FDF3EC", color: "#B06E4A", border: "1px solid #C47D5240", borderRadius: 20, padding: "4px 12px", fontWeight: 700, whiteSpace: "nowrap" }}>
              {s.priority}
            </span>
          </div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", marginBottom: 12 }}>{s.what}</p>
          <div style={{ background: "#F5F0EA", borderRadius: 8, padding: "10px 14px", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#B06E4A" }}>Dose: </span>
            <span style={{ fontSize: 13, fontFamily: "'Lato', sans-serif", color: "#5A4433" }}>{s.dose}</span>
          </div>
          <p style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", color: "#9C8472", fontStyle: "italic", margin: 0 }}>Research: {s.evidence}</p>
        </div>
      ))}

      <TypeTip>
        {type?.id === "insulin" && "Your non-negotiables: Myo-Inositol (start here), NAC, Magnesium, and Vitamin D. These four together significantly improve insulin sensitivity and can restore ovulation within 3 months. Add Berberine (500mg 2-3x daily with meals) as a powerful natural Metformin alternative."}
        {type?.id === "adrenal" && "For Adrenal PCOS, add: Ashwagandha KSM-66 (600mg daily) for cortisol regulation, Phosphatidylserine (400mg daily) to blunt the cortisol spike, and Rhodiola Rosea (200–400mg) for HPA axis support. Avoid stimulant supplements."}
        {type?.id === "inflammatory" && "Prioritize: Omega-3s (highest dose — 3g EPA+DHA), Curcumin with Bioperine (500–1000mg, shown to reduce CRP and androgen levels), and a high-quality probiotic to support gut health and reduce systemic inflammation."}
        {type?.id === "postPill" && "Your priority protocol: Methylfolate + B-complex (replenish pill-depleted B vitamins), Zinc (30mg — often severely depleted by the pill), Magnesium, and Vitex/Chaste Tree Berry (400mg daily, taken in the morning) to re-regulate the LH/FSH ratio."}
      </TypeTip>

      <div style={{ background: "#FDF3EC", border: "1px solid #E8DDD2", borderRadius: 10, padding: "20px 24px", margin: "24px 0" }}>
        <p className="sans" style={{ fontSize: 14, color: "#7A6452", lineHeight: 1.7, margin: 0 }}>
          <strong>⚠️ Important:</strong> Always consult with your healthcare provider before starting a supplement protocol, especially if you are taking medications or have other health conditions. Not all supplements are appropriate for everyone, and dosing should be personalized.
        </p>
      </div>

      <div className="action-box">
        <h4>✏️ Your Action Step for Chapter 3</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>
          Based on your PCOS type, identify your top 3 supplements from this chapter. Order them this week and commit to 90 days of consistent use — this is the minimum timeframe to evaluate hormonal response. Set a phone reminder to take them daily.
        </p>
      </div>

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch4") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 4</div>
      <h2>Calm the Storm — Stress Management for Hormonal Balance</h2>
      <p>Of all the pillars in this guide, stress management is the one most often underestimated — and yet, for many women with PCOS, it is the missing piece that makes everything else work.</p>
      <p>Here's why: your body cannot distinguish between a physical threat and an emotional one. When you're chronically stressed — deadline pressure, relationship tension, financial worry, even intense exercise — your adrenal glands pump out cortisol. And cortisol is directly antagonistic to your reproductive hormones.</p>

      <h3>The Cortisol-Fertility Connection</h3>
      <p>Cortisol suppresses GnRH (Gonadotropin-Releasing Hormone) — the master hormone that triggers the entire ovulation cascade. When GnRH is suppressed, LH and FSH don't get the signal to rise, follicles don't mature, and ovulation doesn't occur. Your body is literally choosing survival over reproduction.</p>
      <p>For women with Adrenal PCOS, this is the primary mechanism behind their irregular cycles. But even for other types, chronic stress amplifies every other PCOS driver: it worsens insulin resistance, increases inflammation, and disrupts sleep — which is when most hormonal repair occurs.</p>

      <h3>Evidence-Based Practices to Regulate Your Stress Response</h3>

      {[
        { title: "4-7-8 Breathing", time: "5 min", when: "Morning + before bed", desc: "Inhale for 4 counts, hold for 7, exhale for 8. This activates the parasympathetic (rest-and-digest) nervous system and directly lowers cortisol within minutes. Clinical studies show HRV improvement after just 4 weeks of consistent practice." },
        { title: "Yoga Nidra (Yogic Sleep)", time: "20–30 min", when: "Afternoon slump or before bed", desc: "A guided meditative practice shown to be as restorative as 4 hours of sleep. Specifically studied in PCOS — one study showed significant reductions in testosterone, AMH, and anxiety after 12 weeks of practice." },
        { title: "Journaling: The Brain Dump Method", time: "10 min", when: "Morning", desc: "Write 3 pages of uncensored stream of consciousness every morning. This empties the mental 'buffer' that keeps your stress response activated. Studies show expressive writing reduces cortisol and improves immune function." },
        { title: "Restorative Yoga", time: "30 min", when: "Evening", desc: "Passive, supported poses held for 3–5 minutes each. Unlike active yoga, restorative yoga doesn't raise cortisol — it actively brings it down. Especially important if you currently do intense exercise classes." },
        { title: "Nature Exposure (Green Therapy)", time: "20 min", when: "Daytime", desc: "Walking in a natural environment (park, trees, near water) reduces cortisol, blood pressure, and sympathetic nervous system activation. Even 20 minutes creates measurable hormonal shifts." },
      ].map((p, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: "20px 24px", marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
            <span className="serif" style={{ fontSize: 18, color: "#2D2416" }}>{p.title}</span>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", background: "#EDE0D4", color: "#7A5C40", borderRadius: 20, padding: "3px 10px", fontWeight: 700 }}>⏱ {p.time}</span>
              <span style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", background: "#EDE0D4", color: "#7A5C40", borderRadius: 20, padding: "3px 10px" }}>{p.when}</span>
            </div>
          </div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{p.desc}</p>
        </div>
      ))}

      <TypeTip>
        {type?.id === "adrenal" && "Stress management is your #1 fertility intervention — not diet, not supplements. Until you regulate your nervous system and lower cortisol, your ovaries cannot function optimally. Start with Yoga Nidra daily (20 min) and 4-7-8 breathing twice daily. This is non-negotiable for your type."}
        {type?.id === "insulin" && "While stress isn't your primary PCOS driver, cortisol significantly worsens insulin resistance. Prioritize 7–9 hours of sleep (the most potent insulin sensitizer that exists) and add a 10-minute walk after meals to blunt blood sugar spikes."}
        {type?.id === "inflammatory" && "Chronic stress directly triggers and amplifies inflammatory pathways. The gut-brain-inflammation connection means that calming your nervous system also calms gut-driven inflammation. Prioritize sleep and nature exposure in addition to your anti-inflammatory diet."}
        {type?.id === "postPill" && "The pill can blunt your cortisol response, meaning your adrenals may be more reactive post-pill. Be gentle with yourself — this is a time for building up, not pushing hard. Restorative yoga and Ashwagandha are particularly supportive during this recalibration phase."}
      </TypeTip>

      <div className="action-box">
        <h4>✏️ Your Action Step for Chapter 4</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>
          Choose ONE stress practice from this chapter and commit to it daily for 21 days. Just one — consistency beats variety. Set a non-negotiable 10-minute window in your day. Track how you feel in a simple notes app at the end of each week.
        </p>
      </div>

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch5") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 5</div>
      <h2>Know Your Cycle — Fertility Awareness for Women with PCOS</h2>
      <p>One of the most disempowering experiences of PCOS is feeling like your cycle is something that happens to you, not something you can understand or influence. This chapter changes that completely.</p>
      <p>Even with irregular cycles, your body is still producing hormonal signals — and learning to read them gives you a powerful advantage. You don't need a 28-day cycle to get pregnant. You need to identify your fertile window, however it appears in your cycle. And that's entirely possible with PCOS.</p>

      <h3>The 4 Phases of Your Cycle (Even with PCOS)</h3>
      {[
        { phase: "Menstruation", days: "Days 1–5 (approx)", desc: "Your period. Estrogen and progesterone are at their lowest. Rest, nourish, and don't push. This is a time for restoration — honor it." },
        { phase: "Follicular Phase", days: "Days 6–13 (varies widely with PCOS)", desc: "Estrogen rises as follicles develop. Energy increases. This is when you build — physically and mentally. With PCOS, this phase may last much longer than average as your body tries repeatedly to ovulate." },
        { phase: "Ovulation", days: "Day 14+ (unpredictable with PCOS)", desc: "An LH surge triggers the release of a mature egg. This is your 12–24 hour conception window, preceded by a 3–5 day fertile window. Identifying this is the focus of this chapter." },
        { phase: "Luteal Phase", days: "Days after ovulation to next period (10–16 days)", desc: "Progesterone rises to support a potential pregnancy. With PCOS, low progesterone in the luteal phase can prevent implantation even when conception occurs. Supporting this phase matters." },
      ].map((p, i) => (
        <div key={i} style={{ borderLeft: "4px solid #C47D52", paddingLeft: 20, marginBottom: 20 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 6 }}>
            <span className="serif" style={{ fontSize: 18, color: "#2D2416" }}>{p.phase}</span>
            <span style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", color: "#9C8472" }}>— {p.days}</span>
          </div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{p.desc}</p>
        </div>
      ))}

      <h3>The 4 Methods to Identify Ovulation with PCOS</h3>

      {[
        { method: "Basal Body Temperature (BBT)", icon: "🌡️", howTo: "Take your temperature with a basal thermometer every morning before getting out of bed, at the same time. Log it in an app (Kindara, Fertility Friend). After ovulation, BBT rises 0.2°C and stays elevated.", pros: "Confirms ovulation has occurred", cons: "Tells you after the fact — good for pattern recognition over multiple cycles" },
        { method: "Cervical Mucus Monitoring", icon: "💧", howTo: "Check your cervical mucus daily. As you approach ovulation, it changes from dry/sticky → creamy → egg-white consistency (EWCM). EWCM is your most fertile signal.", pros: "Real-time fertile window indicator", cons: "Requires practice to interpret correctly; some PCOS medications can affect mucus" },
        { method: "LH Strips (Ovulation Predictor Kits)", icon: "📊", howTo: "Begin testing from Day 10 (or earlier if cycles are very long). Test twice daily around your expected fertile window. A solid second line (darker than the control) indicates an LH surge — ovulation typically occurs 12–36 hours later.", pros: "Detects the surge before ovulation", cons: "Women with PCOS can have multiple LH surges without ovulating — confirm with BBT or ultrasound" },
        { method: "Cycle Tracking Apps", icon: "📱", howTo: "Use apps like Natural Cycles, Kindara, or Premom (which reads LH strips). These help you spot patterns in your unique cycle and get smarter predictions over time.", pros: "Organizes all data in one place", cons: "Standard algorithms aren't built for irregular PCOS cycles — use apps that allow manual data entry" },
      ].map((m, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: "22px 24px", marginBottom: 14 }}>
          <div style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>{m.icon}</span>
            <span className="serif" style={{ fontSize: 19, color: "#2D2416" }}>{m.method}</span>
          </div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", marginBottom: 12 }}>{m.howTo}</p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <span className="sans" style={{ fontSize: 13, color: "#4A8A5C" }}>✓ {m.pros}</span>
            <span className="sans" style={{ fontSize: 13, color: "#C45C5C" }}>⚠ {m.cons}</span>
          </div>
        </div>
      ))}

      <div className="stat-box">
        💡 For best results with PCOS, combine at least 2 methods — BBT + LH strips is the gold standard combination, as they confirm each other and account for the false LH surges common in PCOS.
      </div>

      <div className="action-box">
        <h4>✏️ Your Action Step for Chapter 5</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>
          This cycle, start charting your BBT and cervical mucus. Download Kindara or Fertility Friend and begin logging today — even if you're mid-cycle. The goal this month isn't to time conception perfectly. It's to start gathering data about your body so next cycle you're fully informed.
        </p>
      </div>

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch6") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 6</div>
      <h2>Move to Conceive — The Right Exercise Approach for PCOS Fertility</h2>
      <p>Exercise is one of the most powerful interventions for PCOS — but only when done correctly. The wrong kind of exercise can spike cortisol, worsen adrenal dysfunction, increase inflammation, and suppress ovulation. The right kind dramatically improves insulin sensitivity, lowers androgens, reduces inflammation, and supports a healthy weight for fertility.</p>

      <h3>What NOT to Do (Even if You Think It's Helping)</h3>
      <ul>
        <li><strong>Chronic cardio</strong> (daily long runs, daily intense spin classes) — chronically elevates cortisol and can worsen adrenal PCOS and suppress ovulation</li>
        <li><strong>Intense HIIT every day</strong> — without adequate recovery, this becomes a cortisol stressor</li>
        <li><strong>Exercising for weight loss only</strong> — this creates a stress relationship with movement that undermines the parasympathetic state needed for hormonal balance</li>
        <li><strong>Training through fatigue and illness</strong> — rest is hormonal medicine for PCOS</li>
      </ul>

      <h3>The PCOS-Supportive Movement Protocol</h3>

      {[
        { type: "Strength Training", freq: "2–3x per week", icon: "💪", detail: "The single most effective exercise for insulin resistance and PCOS. Builds muscle (your primary glucose disposal tissue), lowers testosterone naturally, and improves metabolic health. Focus on compound movements: squats, deadlifts, rows, presses. Start with bodyweight or light weights and progress slowly." },
        { type: "Walking", freq: "Daily — 20–30 min", icon: "🚶‍♀️", detail: "Underrated and profoundly effective for PCOS. A post-meal 10–15 minute walk reduces blood sugar spikes by up to 30%. Morning walks in sunlight also regulate cortisol rhythms and support Vitamin D. Low-stress and sustainable — crucial for long-term hormonal health." },
        { type: "Low-Impact Cardio", freq: "1–2x per week", icon: "🏊‍♀️", detail: "Swimming, cycling at a gentle pace, elliptical, or barre. Improves cardiovascular health and supports weight management without the cortisol burden of intense cardio. Keep heart rate in Zone 2 (can hold a conversation comfortably)." },
        { type: "Yoga (Restorative or Hatha)", freq: "2–3x per week", icon: "🧘‍♀️", detail: "Lowers cortisol, improves HRV, and has been specifically studied in PCOS. One study showed 12 weeks of yoga practice reduced testosterone levels and anxiety scores significantly. Restorative and Hatha styles are more beneficial than hot yoga or intense vinyasa." },
        { type: "Rest and Recovery", freq: "2 days per week minimum", icon: "🌙", detail: "Rest is not a gap in your routine — it is part of the protocol. This is when cortisol resets, muscle repairs, and hormonal balance is restored. Honor your rest days, especially in the luteal phase of your cycle when progesterone is trying to rise." },
      ].map((e, i) => (
        <div key={i} style={{ display: "flex", gap: 16, background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: "20px", marginBottom: 12 }}>
          <div style={{ fontSize: 28, flexShrink: 0 }}>{e.icon}</div>
          <div>
            <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8, flexWrap: "wrap" }}>
              <span className="serif" style={{ fontSize: 18, color: "#2D2416" }}>{e.type}</span>
              <span style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", background: "#EDE0D4", color: "#7A5C40", borderRadius: 20, padding: "3px 12px", fontWeight: 700 }}>{e.freq}</span>
            </div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.75, color: "#3D2E1E", margin: 0 }}>{e.detail}</p>
          </div>
        </div>
      ))}

      <TypeTip>
        {type?.id === "insulin" && "Strength training is your #1 priority. Muscle is insulin's best friend — more muscle mass = better glucose disposal. Aim for 3x/week strength + daily walks. This combination is as effective as Metformin for improving insulin sensitivity in multiple studies."}
        {type?.id === "adrenal" && "Step away from intense cardio entirely for 8–12 weeks. Your adrenals are depleted. Walking, gentle yoga, and restorative movement are your medicines right now. This can feel counterintuitive, but it's the fastest path to restored cycles for your type."}
        {type?.id === "inflammatory" && "Avoid high-impact exercise during flare-up periods — it increases inflammatory markers. Focus on swimming, walking, and gentle yoga. As inflammation reduces (through diet + supplements), you can slowly add strength training."}
        {type?.id === "postPill" && "Your body is recalibrating. Moderate, joyful movement is the goal — not intense training. Walking, yoga, and light strength training 2x/week support your hormonal reboot without stressing a system that's already in a rebuilding phase."}
      </TypeTip>

      <div className="action-box">
        <h4>✏️ Your Action Step for Chapter 6</h4>
        <p className="sans" style={{ fontSize: 15, margin: 0, lineHeight: 1.75 }}>
          Build your weekly movement plan for the next 4 weeks using the protocol above. Write it into your calendar like an appointment. Start at 70% of what feels comfortable — you can always add more. Commit to the minimum: walks daily + 2 strength sessions per week.
        </p>
      </div>

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch7") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 7</div>
      <h2>Real Women, Real Results — PCOS Fertility Success Stories</h2>
      <p>Every piece of science in this guide is meaningful. But sometimes what you need most is proof that a real woman, with a body like yours, did this and it worked. These stories are that proof.</p>

      {[
        {
          name: "Mariana, 31",
          type: "Insulin-Resistant PCOS",
          color: "#C17F5A",
          before: "Mariana had been off birth control for 2 years and had only gotten her period three times. Her doctor had told her she'd likely need Clomid. She was 40 pounds above her comfortable weight, exhausted after every meal, and had dark patches on the back of her neck. She was terrified she'd never get pregnant.",
          journey: "Mariana started with the dietary changes in Chapter 2 — removing refined sugar and building her meals around protein and vegetables. She added Myo-Inositol, Vitamin D, and NAC. Within 6 weeks, her energy improved dramatically. By week 10, she got her first natural period in 8 months. She began tracking with LH strips and BBT. At month 4, she identified her fertile window clearly for the first time.",
          result: "Mariana conceived naturally in month 5 of her holistic protocol. She is now 27 weeks pregnant. Her testosterone levels normalized without medication.",
        },
        {
          name: "Jasmine, 28",
          type: "Adrenal PCOS",
          color: "#8B6BAE",
          before: "Jasmine was a high-achieving executive who hadn't had a period in 6 months. Her bloodwork showed elevated DHEA-S but normal insulin. She was exercising intensely 6 days a week and eating 'perfectly' — and nothing was working. Her acne was severe and her anxiety was at an all-time high.",
          journey: "The turning point for Jasmine was stopping her intense cardio and replacing it with walking and Yoga Nidra. She felt guilty at first — like she was 'doing less.' She started Ashwagandha and Magnesium. She implemented a non-negotiable 9pm phone-off rule and began journaling every morning. Within 3 weeks, her anxiety dropped noticeably. At week 8, she got her period.",
          result: "Jasmine conceived naturally at month 6. She credits the permission to do less as the most important shift in her journey. Her cortisol levels, retested at month 3, had normalized completely.",
        },
        {
          name: "Priya, 34",
          type: "Post-Pill PCOS",
          color: "#4A8FA3",
          before: "Priya had been on the pill since age 16 and stopped at 33 to try to conceive. Eighteen months later, she had irregular, painful periods, severe hair loss, and debilitating acne. She had never experienced PCOS symptoms before the pill — and didn't understand what was happening.",
          journey: "Once Priya understood she had Post-Pill PCOS, the confusion lifted. She began a targeted supplement protocol: methylfolate, B-complex, Zinc, and Vitex. She added seed cycling and focused on liver-supportive nutrition. Her hair loss slowed at month 2. By month 4, her cycles became regular — something she had never experienced in her teenage years either.",
          result: "Priya conceived naturally at month 7 post-protocol. She credits understanding her PCOS type as the most empowering moment — it changed her entire approach.",
        },
      ].map((s, i) => (
        <div key={i} style={{ background: "white", border: `2px solid ${s.color}30`, borderRadius: 12, padding: "28px", marginBottom: 24 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 20 }}>
            <div style={{ width: 48, height: 48, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontSize: 18, fontFamily: "'Playfair Display', serif", fontWeight: 700 }}>
              {s.name[0]}
            </div>
            <div>
              <div className="serif" style={{ fontSize: 20, color: "#2D2416" }}>{s.name}</div>
              <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", color: s.color, fontWeight: 700 }}>{s.type}</div>
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#9C8472", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Before</div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{s.before}</p>
          </div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#9C8472", textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>The Journey</div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{s.journey}</p>
          </div>
          <div style={{ background: "#F0F9F3", border: `1px solid ${s.color}30`, borderRadius: 8, padding: "14px 18px" }}>
            <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", fontWeight: 700, color: "#4A8A5C", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>✓ Result</div>
            <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{s.result}</p>
          </div>
        </div>
      ))}

      <CompleteButton />
    </div>
  );

  if (chapterId === "ch8") return (
    <div className="fade-in">
      <div style={{ fontSize: 12, fontFamily: "'Lato', sans-serif", letterSpacing: 3, color: "#B06E4A", textTransform: "uppercase", fontWeight: 700, marginBottom: 16 }}>Chapter 8</div>
      <h2>Your 30-Day Holistic PCOS Kickstart Plan</h2>
      <p>Everything you've learned in this guide comes together here. This 30-day plan is your runway to hormonal healing — structured enough to guide you, flexible enough for real life. Think of it as your launch pad, not a rigid prescription.</p>

      {[
        {
          week: "Week 1", title: "Foundation Week", color: "#C47D52",
          focus: "Diet overhaul + supplement protocol launch + begin tracking",
          tasks: [
            "Clear your kitchen of refined sugar, seed oils, and processed grains",
            "Stock your fridge with PCOS Fertility Plate staples",
            "Order and begin your supplement protocol based on your type",
            "Download Kindara or Fertility Friend — begin logging daily",
            "Start BBT charting (take temperature every morning before getting up)",
            "Choose your one daily stress practice and schedule it",
            "Take a post-meal 10–15 minute walk after at least 2 meals per day",
          ],
        },
        {
          week: "Week 2", title: "Rhythm Week", color: "#8B6BAE",
          focus: "Build consistency + deepen cycle awareness + add movement",
          tasks: [
            "Maintain the dietary changes from Week 1 — aim for 80% consistency",
            "Add your first strength training sessions (2x this week)",
            "Monitor and log cervical mucus daily alongside BBT",
            "Begin LH strip testing if approaching your fertile window",
            "Check in: how is your energy, digestion, and bloating vs Day 1?",
            "Journal for 10 minutes each morning — what are you noticing in your body?",
            "Hydration goal: 2.5–3 liters of water daily",
          ],
        },
        {
          week: "Week 3", title: "Depth Week", color: "#4A8A5C",
          focus: "Address your specific PCOS type + optimize your fertile window",
          tasks: [
            "Review your PCOS type chapter and implement any remaining recommendations",
            "Schedule a blood panel if you haven't recently: Testosterone, DHEA-S, Insulin, Vitamin D, AMH, FSH, LH",
            "Study your first 2 weeks of BBT and mucus data — what patterns do you see?",
            "Incorporate a restorative yoga session this week",
            "Begin seed cycling if not already: flax + pumpkin seeds in the first half, sunflower + sesame in the second half",
            "Plan 2 full rest days this week — honor them",
            "Revisit your supplement timing — are you taking them consistently?",
          ],
        },
        {
          week: "Week 4", title: "Momentum Week", color: "#B06E4A",
          focus: "Reflect + recalibrate + commit to the long game",
          tasks: [
            "Write a 'before and after' reflection: symptoms on Day 1 vs now",
            "Note any changes: energy, skin, bloating, mood, cravings, cycle signs",
            "Are you sleeping 7–9 hours? Identify and remove your #1 sleep barrier this week",
            "Plan your Month 2 — which adjustments will you make based on what you've learned?",
            "Share your journey with one person who can support and hold you accountable",
            "Book a follow-up appointment with a PCOS-aware provider to review your progress",
            "Celebrate what you've done this month — this is not a small thing",
          ],
        },
      ].map((w, i) => (
        <div key={i} style={{ marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 40, borderRadius: "50%", background: w.color, color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700, fontFamily: "'Lato', sans-serif", flexShrink: 0 }}>
              {i + 1}
            </div>
            <div>
              <div className="serif" style={{ fontSize: 20, color: "#2D2416" }}>{w.week}: {w.title}</div>
              <div style={{ fontSize: 13, fontFamily: "'Lato', sans-serif", color: "#7A6452", fontStyle: "italic" }}>{w.focus}</div>
            </div>
          </div>
          <div style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: "20px 24px" }}>
            {w.tasks.map((task, j) => (
              <div key={j} style={{ display: "flex", gap: 12, alignItems: "flex-start", paddingBottom: 10, borderBottom: j < w.tasks.length - 1 ? "1px solid #F0EAE0" : "none", marginBottom: j < w.tasks.length - 1 ? 10 : 0 }}>
                <div style={{ width: 22, height: 22, border: `2px solid ${w.color}`, borderRadius: 4, flexShrink: 0, marginTop: 1 }} />
                <span className="sans" style={{ fontSize: 14, lineHeight: 1.7, color: "#3D2E1E" }}>{task}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      <h3>Frequently Asked Questions</h3>
      {[
        { q: "How long does it really take to see results?", a: "Most women begin noticing changes in energy, skin, and digestion within 2–4 weeks. Hormonal markers and cycle regularity typically improve at the 3–6 month mark. Ovulation restoration often occurs between 6–12 weeks for Post-Pill PCOS and 3–6 months for other types. The long game is real — but so are the results." },
        { q: "Can I do this alongside fertility treatments like Clomid or IUI?", a: "Yes — in fact, the nutritional and lifestyle foundation in this guide significantly improves the effectiveness of medical treatments. Always inform your doctor of supplements you're taking, especially if combining with fertility medications. Vitex, for example, should not be combined with Clomid." },
        { q: "I don't get periods at all. Where do I start?", a: "Start with nutrition and supplements as your foundation — the goal is to create the internal environment for your cycle to return. Then add cycle tracking using LH strips and BBT so you'll catch ovulation if and when it occurs. Some women ovulate without visible periods. Also prioritize sleep — it's where the most hormonal repair happens." },
        { q: "I've tried 'eating clean' before and nothing happened.", a: "Eating clean is not the same as eating specifically for PCOS and your unique type. The specificity matters enormously — especially the protein:carb ratio, meal timing, and elimination of specific triggers relevant to your PCOS type. If past attempts haven't worked, that's information, not failure." },
      ].map((faq, i) => (
        <div key={i} style={{ background: "white", border: "1px solid #E8DDD2", borderRadius: 10, padding: "20px 24px", marginBottom: 12 }}>
          <div className="serif" style={{ fontSize: 17, color: "#2D2416", marginBottom: 10 }}>Q: {faq.q}</div>
          <p className="sans" style={{ fontSize: 14, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>{faq.a}</p>
        </div>
      ))}

      <CompleteButton />
    </div>
  );

  return (
    <div className="fade-in">
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>🌿</div>
        <h2 className="serif" style={{ fontSize: 32, color: "#2D2416", marginBottom: 16 }}>You Are Ready</h2>
        <p className="sans" style={{ fontSize: 17, color: "#6B5744", lineHeight: 1.8, maxWidth: 520, margin: "0 auto 32px" }}>
          You now have everything you need to begin your holistic path to natural conception with PCOS. The science is on your side. Your body is capable. And you are equipped.
        </p>
        <div style={{ background: "#FDF3EC", border: "2px solid #C47D52", borderRadius: 12, padding: "32px", maxWidth: 520, margin: "0 auto 32px", textAlign: "left" }}>
          <h3 className="serif" style={{ fontSize: 22, color: "#B06E4A", marginBottom: 16 }}>💛 Your Next Step</h3>
          <p className="sans" style={{ fontSize: 15, lineHeight: 1.8, color: "#3D2E1E", margin: 0 }}>
            This guide is your foundation. For deeper, personalized support — including 1:1 guidance, custom supplement protocols, and cycle coaching — explore our full PCOS Fertility Program designed to walk you through every step of this journey with expert support.
          </p>
        </div>
        <button className="btn-primary" onClick={() => setActiveChapter("intro")}>
          Return to Beginning
        </button>
      </div>
    </div>
  );
}

export default function About({ onNavigate, onOpenUpload }) {
  const teamPairs = [
    {
      pair: 'Pair 1',
      title: 'Look & Navigation',
      members: [
        { roleNo: '01', name: 'Role 1', title: 'UI/UX Designer', builds: 'Colours, fonts, logo, wireframes, global CSS', tasks: 'Paper wireframes for all 4 pages; palette & font pairing; global CSS variables; consistency check across all pages.' },
        { roleNo: '02', name: 'Role 2', title: 'Navbar & Footer Dev', builds: 'Sticky navbar, page switching, 4-column footer', tasks: 'Bootstrap collapsible navbar; useState in App for page switching; responsive 4-column footer with quick links.' }
      ]
    },
    {
      pair: 'Pair 2',
      title: 'Home & About',
      members: [
        { roleNo: '03', name: 'Role 3', title: 'Home Page Dev', builds: 'Banner, latest events, upload button', tasks: 'Dynamic hero banner with particles; Latest Events (3 newest from JSON); responsive upload CTA; mobile layout.' },
        { roleNo: '04', name: 'Role 4', title: 'About Us Dev', builds: 'About text, how it works, team cards', tasks: 'Campus Connect backstory; 5-step photo lifecycle; 10 team cards & tech stack; 6-week roadmap section.' }
      ]
    },
    {
      pair: 'Pair 3',
      title: 'Events & Details',
      members: [
        { roleNo: '05', name: 'Role 5', title: 'Events Page Dev', builds: 'Event cards grid, category pills', tasks: 'EventCard component with date & category pill; Bootstrap responsive grid; search & category filtering logic.' },
        { roleNo: '06', name: 'Role 6', title: 'Event Detail Dev', builds: 'Detail view, photo lightbox, YouTube embed', tasks: 'Full event details view; interactive multi-photo lightbox; responsive YouTube video embed; navigation back button.' }
      ]
    },
    {
      pair: 'Pair 4',
      title: 'Gallery & Comments',
      members: [
        { roleNo: '07', name: 'Role 7', title: 'Gallery Dev', builds: 'Photo grid, category, year and sort filters', tasks: 'Aggregated photo grid from all events; 3-way combined filter bar (Category, Year, Sort); full-screen lightbox trigger.' },
        { roleNo: '08', name: 'Role 8', title: 'Comments Dev', builds: 'Comment box, validation, React state', tasks: 'CommentBox component with name/comment fields; input validation; LocalStorage browser persistence.' }
      ]
    },
    {
      pair: 'Pair 5',
      title: 'Data, Git & Launch',
      members: [
        { roleNo: '09', name: 'Role 9', title: 'Data & Content Manager', builds: 'events.json, photo folders, Google Form', tasks: 'Design events.json structure; organize and rename asset directories; manage Google Form submissions.' },
        { roleNo: '10', name: 'Role 10', title: 'Git Manager & Deployer', builds: 'Repo, merging, bug testing, going live', tasks: 'GitHub repository setup; branch management and PR reviews; multi-device responsiveness testing; production deployment.' }
      ]
    }
  ]

  const roadmapSteps = [
    { week: 'Week 1', title: 'Learn & Plan', desc: 'Master HTML, CSS, JS and React fundamentals. Create GitHub repo, paper wireframes, and design the events.json schema.' },
    { week: 'Week 2', title: 'Setup Project', desc: 'Bootstrap React + Vite project. Establish branch workflow, configure global CSS color palette, navbar, and footer.' },
    { week: 'Week 3', title: 'Build Your Parts', desc: 'Each pair develops their designated components independently on isolated git feature branches.' },
    { week: 'Week 4', title: 'Join & Polish', desc: 'Merge feature branches into main. Resolve conflicts, test responsiveness on mobile and tablet, integrate real event photos.' },
    { week: 'Week 5 & 6', title: 'Launch & Presentation', desc: 'Deploy production build to Vercel/Netlify. Prepare documentation, README, and project presentation defense.' }
  ]

  const whyReactPoints = [
    { aspect: 'Repeated Code', plain: '20 events means copying the same HTML card code 20 times', react: 'Write <EventCard /> once and reuse it for every event via props' },
    { aspect: 'Page Changes', plain: 'Home, Events, Gallery & About require 4 separate HTML files', react: 'Single Page Application: useState swaps views instantly with zero flicker' },
    { aspect: 'Filter Updates', plain: 'Clicking any filter forces a full browser page reload', react: 'Photos update in real-time instantly without any reload' },
    { aspect: 'Teamwork', plain: '10 people edit one monolithic index.html, causing merge conflicts', react: 'Each pair works on separate component files cleanly and independently' }
  ]

  return (
    <>
      {/* Hero */}
      <section className="about-hero">
        <div className="container">
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '2rem' }}>
            <p className="section-label">About Us</p>
            <h2 className="section-title">One Home For Our College Memories</h2>
          </div>
          <div className="about-content">
            <p style={{ marginBottom: '1.5rem', fontSize: '1.15rem', color: 'var(--text-primary)' }}>
              <strong>Campus Connect</strong> is a student-made photo album website created for <strong>IIIT Lucknow</strong>.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              College life moves fast — cultural festivals, 24-hour hackathons, sports days, and tech summits come and go.
              Too often, photos end up lost in ephemeral WhatsApp chats, Drive links that expire, or scattered social media stories.
              Campus Connect gives our institution one official-looking, organized hub where memories live on.
            </p>
            <p>
              Built using <strong>React.js</strong>, <strong>Bootstrap 5</strong>, and modern JavaScript with <strong>0 backends</strong> needed.
              Everything runs efficiently client-side: comments and favorites persist via browser <strong>LocalStorage</strong>,
              and new memories are submitted by students and curated by admins.
            </p>
          </div>
        </div>
      </section>

      {/* Why React? Section (Directly from Slide 5) */}
      <section className="section-wrapper" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Architecture Choice</p>
            <h2 className="section-title">Why React?</h2>
            <p className="section-subtitle">
              How modern component-based architecture elevated this project
            </p>
          </div>

          <div className="table-responsive" style={{ maxWidth: '960px', margin: '0 auto' }}>
            <table className="table table-dark table-bordered" style={{ borderRadius: '12px', overflow: 'hidden', borderColor: 'rgba(66, 165, 245, 0.2)' }}>
              <thead>
                <tr style={{ background: 'rgba(21, 101, 192, 0.25)' }}>
                  <th style={{ padding: '16px', color: 'var(--accent-light)', width: '22%' }}>Challenge</th>
                  <th style={{ padding: '16px', color: '#f87171', width: '39%' }}>Plain HTML / CSS</th>
                  <th style={{ padding: '16px', color: '#4ade80', width: '39%' }}>With React (Campus Connect)</th>
                </tr>
              </thead>
              <tbody>
                {whyReactPoints.map((pt, idx) => (
                  <tr key={idx} style={{ background: idx % 2 === 0 ? 'var(--bg-card)' : 'rgba(255,255,255,0.02)' }}>
                    <td style={{ padding: '16px', fontWeight: 600, color: 'var(--text-primary)' }}>{pt.aspect}</td>
                    <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>❌ {pt.plain}</td>
                    <td style={{ padding: '16px', color: 'var(--text-primary)' }}>✅ {pt.react}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-center mt-3" style={{ color: 'var(--accent-light)', fontSize: '0.9rem', fontStyle: 'italic' }}>
            🎓 Bonus: React is also part of our syllabus and course curriculum!
          </p>
        </div>
      </section>

      {/* 5-Step Photo Lifecycle (Slide 7) */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Submission Workflow</p>
            <h2 className="section-title">How a Student Photo Goes Live</h2>
            <p className="section-subtitle">
              Nothing goes live without an admin saying yes
            </p>
          </div>
          <div className="row g-4">
            {[
              { num: '1', title: 'Share', desc: 'A student fills in the "Upload Your Memory" form or Google Form with event photos.' },
              { num: '2', title: 'Review', desc: 'Admin team verifies submission quality, category alignment, and appropriateness.' },
              { num: '3', title: 'Add', desc: 'Approved photos are placed into the image folders and registered in events.json.' },
              { num: '4', title: 'Push', desc: 'The Git Manager reviews the pull request and merges the update into main.' },
              { num: '5', title: 'Live', desc: 'Hosting (Vercel / Netlify / GitHub Pages) deploys the new memory automatically.' }
            ].map((step) => (
              <div className="col-lg col-md-4 col-sm-6" key={step.num}>
                <div className="step-card">
                  <div className="step-number">{step.num}</div>
                  <h5>{step.title}</h5>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Pairs Breakdown (Slides 8-12) */}
      <section className="section-wrapper" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="section-header">
            <p className="section-label">Collaboration Model</p>
            <h2 className="section-title">10 Team Members · 5 Pairs</h2>
            <p className="section-subtitle">
              Structured pair programming where every student owns and defends their module
            </p>
          </div>

          <div className="row g-4">
            {teamPairs.map((pair, pIdx) => (
              <div className="col-12" key={pIdx}>
                <div className="card p-4" style={{ background: 'var(--bg-card)', border: '1px solid rgba(66, 165, 245, 0.2)', borderRadius: '16px' }}>
                  <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap gap-2">
                    <h4 style={{ color: 'var(--primary-light)', margin: 0, fontWeight: 700 }}>
                      {pair.pair}: {pair.title}
                    </h4>
                    <span className="badge" style={{ background: 'rgba(21, 101, 192, 0.3)', color: 'var(--accent-light)', padding: '6px 12px', fontSize: '0.85rem' }}>
                      2 Developers
                    </span>
                  </div>
                  <div className="row g-3">
                    {pair.members.map((member, mIdx) => (
                      <div className="col-md-6" key={mIdx}>
                        <div className="p-3" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', height: '100%' }}>
                          <div className="d-flex align-items-center gap-3 mb-2">
                            <div className="team-avatar" style={{ width: '48px', height: '48px', fontSize: '1rem', margin: 0 }}>
                              {member.roleNo}
                            </div>
                            <div>
                              <h6 style={{ margin: 0, fontWeight: 700, color: 'var(--text-primary)' }}>{member.title}</h6>
                              <small style={{ color: 'var(--primary-light)' }}>{member.name}</small>
                            </div>
                          </div>
                          <p style={{ fontSize: '0.85rem', color: 'var(--accent-light)', marginBottom: '0.4rem', fontWeight: 600 }}>
                            🛠️ Builds: {member.builds}
                          </p>
                          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', margin: 0 }}>
                            {member.tasks}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6-Week Roadmap (Slide 13) */}
      <section className="section-wrapper">
        <div className="container">
          <div className="section-header">
            <p className="section-label">Timeline</p>
            <h2 className="section-title">6-Week Development Roadmap</h2>
            <p className="section-subtitle">
              From initial syllabus learning to production release
            </p>
          </div>

          <div className="row g-3 justify-content-center">
            {roadmapSteps.map((step, idx) => (
              <div className="col-lg-10" key={idx}>
                <div className="d-flex align-items-start gap-4 p-3" style={{ background: 'var(--bg-card)', borderRadius: '12px', border: '1px solid rgba(66, 165, 245, 0.15)' }}>
                  <div style={{ minWidth: '90px', background: 'linear-gradient(135deg, var(--primary), var(--primary-light))', color: 'white', borderRadius: '8px', padding: '8px 12px', textAlign: 'center', fontWeight: 700, fontSize: '0.9rem' }}>
                    {step.week}
                  </div>
                  <div>
                    <h5 style={{ margin: '0 0 6px 0', fontWeight: 600, color: 'var(--text-primary)' }}>{step.title}</h5>
                    <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{step.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload CTA */}
      <section className="section-wrapper" style={{ background: 'var(--bg-section)' }}>
        <div className="container">
          <div className="upload-section">
            <h3>📸 Want to Contribute?</h3>
            <p>
              Share your campus photos and help build the memory bank of IIIT Lucknow!
            </p>
            <button
              type="button"
              className="upload-btn"
              onClick={onOpenUpload}
            >
              ⬆️ Upload Your Memory
            </button>
          </div>
        </div>
      </section>
    </>
  )
}

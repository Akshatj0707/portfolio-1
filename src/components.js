import { milestones, perspectives, profile, projects, recognitions, skills } from './data.js';

const icon = (name) => {
  const paths = {
    arrow: '<path d="M5 12h13M12 5l7 7-7 7"/>',
    down: '<path d="M12 4v15m-6-6 6 6 6-6"/>',
    up: '<path d="M12 20V5m-6 6 6-6 6 6"/>',
    external: '<path d="M14 5h5v5M19 5l-8 8M19 14v4a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h4"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/>',
    phone: '<path d="M6.6 3.5 9 3l2 4.5-2 1.8a14 14 0 0 0 5.7 5.7l1.8-2L21 15l-.5 2.4a2.2 2.2 0 0 1-2.4 1.7A16.8 16.8 0 0 1 5 6a2.2 2.2 0 0 1 1.6-2.5Z"/>',
    pin: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
    close: '<path d="m6 6 12 12M18 6 6 18"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  };
  return `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${paths[name]}</svg>`;
};

const button = (label, href, kind = 'primary', iconName = 'arrow', attrs = '') => `
  <a class="button button--${kind}" href="${href}" ${attrs}><span>${label}</span>${icon(iconName)}</a>`;

export const header = () => `
  <nav class="nav-shell" aria-label="Primary navigation">
    <a class="nav-brand" href="#top" aria-label="${profile.name}, back to top">${profile.name}</a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="nav-links" aria-label="Open menu">Menu <span>${icon('menu')}</span></button>
    <div class="nav-links" id="nav-links">
      <a class="nav-link is-active" href="#about">About</a>
      <a class="nav-link" href="#skills">Skills</a>
      <a class="nav-link" href="#projects">Projects</a>
      <a class="nav-link nav-link--cta" href="#contact">Contact ${icon('arrow')}</a>
      <button class="motion-toggle" type="button" aria-pressed="true" aria-label="Turn motion off"><span class="motion-state-dot"></span><span class="motion-label">MOTION ON</span></button>
    </div>
  </nav>
  <div class="scroll-progress" aria-hidden="true"><span></span></div>`;

const hero = () => `
  <section class="hero" id="top" aria-labelledby="hero-title">
    <div class="hero-grid" aria-hidden="true"></div>
    <div class="container hero-inner">
      <div class="hero-topline reveal">
        <p><span class="signal-dot"></span> DEVELOPER. ANALYST. BUILDER.</p>
        <p>BASED IN INDORE <span class="topline-separator">·</span> THINKING BEYOND</p>
      </div>
      <div class="hero-index reveal" aria-hidden="true">
        <span>+ &nbsp;01 / PRESENCE</span>
        <p>ENGINEERING<br />DATA<br />HUMAN CONNECTION</p>
      </div>
      <div class="hero-portrait">
        <div class="portrait-halo" aria-hidden="true"></div>
        <div class="portrait-dots" style="--portrait-mask:url('${profile.portrait}')" aria-hidden="true"></div>
        <img class="portrait-image reveal-scale" src="${profile.portrait}" width="450" height="600" alt="Portrait of ${profile.name}" fetchpriority="high" />
      </div>
      <div class="hero-heading">
        <p class="eyebrow reveal">Web development · Data analytics <span></span> Open to roles</p>
        <h1 class="hero-title" id="hero-title"><span class="title-word reveal">Akshat</span> <em class="title-word reveal">Jain</em></h1>
        <p class="hero-summary reveal">I build full-stack products, turn data into insight, and explore practical applications of generative AI.</p>
        <div class="hero-actions reveal">
          ${button('Explore my work', '#projects', 'pill', 'down')}
          ${button('Start a conversation', '#contact', 'text', 'arrow')}
        </div>
      </div>
      <div class="hero-bottomline reveal">
        <a href="#about">SCROLL TO DISCOVER ${icon('down')}</a>
        <p>BUILDING &amp; LEARNING <span>·</span> SINCE 2023</p>
      </div>
    </div>
  </section>`;

const metricStrip = () => `
  <section class="metric-strip" aria-label="At a glance">
    <div class="container metric-grid">
      <article class="metric reveal"><p>01</p><strong>2023—27</strong><span>B.Tech in Information Technology</span></article>
      <article class="metric reveal"><p>02</p><strong>${String(projects.length).padStart(2, '0')}</strong><span>Selected projects</span></article>
      <article class="metric reveal"><p>03</p><strong>04</strong><span>Internships across software, data &amp; marketing</span></article>
      <article class="metric-note reveal"><span>THE THREAD</span><p>Build something useful.<br />Help people use it.</p></article>
    </div>
  </section>`;

const aboutSection = () => `
  <section class="about section" id="about" aria-labelledby="about-title">
    <div class="container">
      <div class="section-kicker reveal"><span>01 / THE PERSON BEHIND THE WORK</span><span>A CONNECTED PERSPECTIVE</span></div>
      <div class="about-heading">
        <h2 class="display-heading reveal" id="about-title">Technology is the starting point.<br /><em>People are the point.</em></h2>
        <p class="about-intro reveal">I connect <strong>software, data, and emerging AI</strong>—and I’m learning how to make each project clear, capable, and useful.</p>
      </div>
      <div class="about-grid">
        <div class="about-art reveal" aria-hidden="true">
          <div class="about-art-grid"></div>
          <img src="${profile.portrait}" alt="" loading="lazy" />
          <span class="about-art-caption">ENGINEERING MIND<br />BUILDER’S INSTINCT</span>
          <span class="about-art-number">AJ / 01</span>
        </div>
        <div class="about-copy reveal">
          <span class="micro-label">ENGINEERING. ANALYTICS. APPLIED AI.</span>
          <p class="about-lede">I like turning technical complexity into something people can use.</p>
          <p>I’m studying B.Tech Information Technology (Data Engineering) at Medicaps University. My internship experience spans a live civic-services portal, AI-driven software development, Alteryx-based analytics, and social media marketing.</p>
          <a class="text-link" href="${profile.resume}" target="_blank" rel="noreferrer">View my résumé ${icon('external')}</a>
          <div class="about-facts">
            <div><span>EDUCATION</span><strong>B.Tech · IT (Data Engineering)</strong></div>
            <div><span>UNIVERSITY</span><strong>Medicaps University · Indore</strong></div>
            <div><span>FOCUS</span><strong>Web development · Data analytics · Generative AI</strong></div>
          </div>
        </div>
      </div>
      <div class="perspective-panel reveal">
        <div class="perspective-topline"><span>HOW I LIKE TO WORK</span><span>CHOOSE A PERSPECTIVE</span></div>
        <div class="perspective-layout">
          <div class="perspective-tabs" role="tablist" aria-label="Areas of focus">
            ${perspectives.map((item, index) => `<button class="perspective-tab ${index === 0 ? 'is-active' : ''}" type="button" role="tab" id="tab-${item.id}" aria-selected="${index === 0}" aria-controls="perspective-content" tabindex="${index === 0 ? '0' : '-1'}" data-perspective="${item.id}"><span>${String(index + 1).padStart(2, '0')}</span>${item.label}${icon('arrow')}</button>`).join('')}
          </div>
          <div class="perspective-content" id="perspective-content" role="tabpanel" aria-labelledby="tab-${perspectives[0].id}" tabindex="0">
            <p class="micro-label">${perspectives[0].label.toUpperCase()}</p>
            <h3>${perspectives[0].title}</h3>
            <p class="perspective-detail">${perspectives[0].detail}</p>
            <p class="perspective-stack">${perspectives[0].skills}</p>
          </div>
        </div>
      </div>
    </div>
  </section>`;

const skillsSection = () => `
  <section class="skills-section section" id="skills" aria-labelledby="skills-title">
    <div class="container">
      <div class="section-kicker reveal"><span>02 / WHAT I WORK WITH</span><span>DEPTH MEETS CURIOSITY</span></div>
      <div class="skills-heading">
        <h2 class="display-heading reveal" id="skills-title">How I work.<br /><em>What I reach for.</em></h2>
        <p class="section-aside reveal">A growing toolkit across product engineering, data analytics, business intelligence, and applied AI.</p>
      </div>
      <div class="skills-list">
        ${skills.map((skill) => `<article class="skill-row reveal"><span class="skill-number">${skill.code}</span><h3>${skill.label}</h3><p>${skill.detail}</p><span class="skill-indicator">${icon('arrow')}</span></article>`).join('')}
      </div>
      <div class="credential-row reveal"><span class="micro-label">ALWAYS LEARNING</span><p>${recognitions.slice(0, 3).join(' <b>·</b> ')}</p></div>
    </div>
  </section>`;

const projectVisual = (visual) => {
  const views = {
    municipal: '<div class="visual-nav"><i></i><span>MY INDORE / SERVICES</span><i></i></div><div class="visual-lines"><b></b><b></b><b></b></div><div class="visual-panel"><span>PUBLIC SERVICE PORTAL</span><strong>Access the services<br />you need.</strong><i>SECURE CITIZEN ACCESS ↗</i></div><div class="visual-badge">INDORE<br />MUNICIPAL<br />CORPORATION</div>',
    rideshare: '<div class="visual-nav"><i></i><span>RIDER / LIVE TRIPS</span><i></i></div><div class="ride-map"><span class="ride-road ride-road--one"></span><span class="ride-road ride-road--two"></span><span class="ride-road ride-road--three"></span><i class="ride-route"></i><b class="ride-pin ride-pin--pickup"></b><b class="ride-pin ride-pin--dropoff"></b><span class="ride-map-label">INDORE / CENTRAL</span></div><div class="ride-status"><strong>Driver matched</strong><span>Live route · estimated arrival 4 min</span></div>',
    productivity: '<div class="visual-nav"><i></i><span>PRODUCTIVITY / KPI OVERVIEW</span><i></i></div><div class="dash-chart"><span>WEEKLY FOCUS</span><strong>Performance overview</strong><div><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div><div class="dash-tasks"><b>↗ &nbsp; Key performance indicators</b><b>○ &nbsp; Team activity</b><b>○ &nbsp; Reporting period</b></div>',
    crave: '<div class="visual-nav"><i></i><span>CRAVE / OPERATIONS</span><i></i></div><div class="crave-summary"><span>ORDERS / TODAY</span><strong>128</strong><div><b>NEW <i>24</i></b><b>PREPARING <i>38</i></b><b>ON THE WAY <i>66</i></b></div></div><div class="crave-order"><span>RECENT ORDER / #2048</span><strong>Kitchen is preparing</strong></div>',
    churn: '<div class="visual-nav"><i></i><span>TELCO / CUSTOMER ANALYSIS</span><i></i></div><div class="analytics-heading"><span>CHURN MODEL / DATASET</span><strong>7,000+ <i>customers</i></strong></div><div class="analytics-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="analytics-legend"><span>RETENTION PATTERNS</span><b>EDA · CLASSIFICATION</b></div>',
    retail: '<div class="visual-nav"><i></i><span>WALMART / WEEKLY SALES</span><i></i></div><div class="analytics-heading"><span>STORE PERFORMANCE / EXPLORATION</span><strong>Weekly <i>trends</i></strong></div><div class="sales-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div><div class="analytics-legend"><span>HOLIDAY &amp; SEASONALITY</span><b>MULTI-STORE VIEW</b></div>',
    forecast: '<div class="visual-nav"><i></i><span>WALMART / SALES MODEL</span><i></i></div><div class="analytics-heading"><span>WEEKLY SALES / FORECAST</span><strong>Model <i>comparison</i></strong></div><div class="forecast-chart"><svg viewBox="0 0 320 90" role="presentation"><path d="M0 72 32 61 64 67 96 44 128 52 160 28 192 39 224 20 256 34 288 12 320 19"/><path class="forecast-line" d="M0 72 32 61 64 67 96 44 128 52 160 28 192 39 224 20 256 34 288 12 320 19"/></svg></div><div class="analytics-legend"><span>ACTUAL VS PREDICTED</span><b>RMSE · MAE</b></div>',
  };
  return `<div class="project-visual project-visual--${visual}" aria-hidden="true"><div class="visual-window">${views[visual]}</div><span class="visual-orbit visual-orbit--one"></span><span class="visual-orbit visual-orbit--two"></span></div>`;
};

const projectCard = (project, index) => {
  const destination = project.github || profile.github;
  const label = project.github ? `Open ${project.title} repository on GitHub` : `Browse Akshat’s GitHub profile`;
  return `
  <a class="project-card project-card--${project.tone} reveal" href="${destination}" target="_blank" rel="noopener noreferrer" aria-label="${label}" style="--card-index:${index}">
    <div class="project-card-top"><span>${project.number} &nbsp; / &nbsp; ${project.category}</span><span class="project-card-link">VIEW ON GITHUB ${icon('external')}</span></div>
    ${projectVisual(project.visual)}
    <div class="project-card-copy"><h3>${project.title}</h3><p>${project.description}</p><p class="project-outcome">${project.outcome}</p><ul class="tag-list">${project.stack.map((tag) => `<li>${tag}</li>`).join('')}</ul></div>
  </a>`;
};

const projectSection = () => `
  <section class="projects-section section" id="projects" aria-labelledby="projects-title">
    <div class="container">
      <div class="section-kicker reveal"><span>03 / SELECTED PROJECTS</span><span>PRODUCTS, DATA &amp; PREDICTION</span></div>
      <div class="projects-heading">
        <h2 class="display-heading reveal" id="projects-title">Ideas are a start.<br /><em>This is the work.</em></h2>
        <p class="section-aside reveal">From a live civic-services portal and full-stack platforms to customer analytics and retail forecasting.</p>
      </div>
      <div class="project-grid">${projects.map(projectCard).join('')}</div>
      <div class="more-work reveal"><span>MORE WAYS I BUILD</span><a class="text-link" href="${profile.github}" target="_blank" rel="noreferrer">Explore my GitHub ${icon('external')}</a></div>
      <div class="milestone-heading reveal"><span class="section-kicker">EXPERIENCE &amp; EDUCATION</span><h3>Applied learning.<br /><em>Growing in practice.</em></h3></div>
      <div class="milestone-list">${milestones.map((item) => `<article class="milestone reveal"><span class="milestone-date">${item.date}</span><div><p>${item.tag}</p><h4>${item.title}</h4><span>${item.detail}</span></div><i>${icon('arrow')}</i></article>`).join('')}</div>
    </div>
  </section>`;

const contactSection = () => `
  <section class="contact-section section" id="contact" aria-labelledby="contact-title">
    <div class="container contact-container">
      <div class="section-kicker reveal"><span>04 / THE NEXT CHAPTER</span><span>LET’S MAKE IT MATTER</span></div>
      <div class="contact-grid">
        <div class="contact-copy">
          <span class="micro-label reveal">OPEN TO MEANINGFUL CONVERSATIONS</span>
          <h2 class="display-heading reveal" id="contact-title">Something great<br />starts with <em>a hello.</em></h2>
          <p class="contact-note reveal">For internships, collaborations, project ideas, or a good conversation about technology, get in touch.</p>
          <div class="contact-details reveal">
            <a href="mailto:${profile.email}">${icon('mail')} ${profile.email}</a>
            <a href="tel:${profile.phoneHref}">${icon('phone')} ${profile.phone}</a>
            <span>${icon('pin')} ${profile.location}</span>
          </div>
          <div class="social-links reveal"><a href="${profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn ${icon('external')}</a><a href="${profile.github}" target="_blank" rel="noreferrer">GitHub ${icon('external')}</a></div>
        </div>
        <form class="contact-form reveal" id="contact-form">
          <div class="form-field form-field--honeypot" aria-hidden="true"><label for="company">Company</label><input id="company" name="company" autocomplete="off" tabindex="-1" /></div>
          <div class="form-row"><label class="form-field"><span>Name</span><input name="name" autocomplete="name" required /></label><label class="form-field"><span>Email</span><input name="email" type="email" autocomplete="email" required /></label></div>
          <label class="form-field"><span>What would you like to discuss?</span><textarea name="message" rows="4" required></textarea></label>
          <button class="button button--submit" type="submit"><span>Prepare an email</span>${icon('arrow')}</button>
          <p class="form-footnote">Your email app will open with your message ready.</p>
        </form>
      </div>
      <div class="contact-footline reveal"><span>AKSHAT JAIN / INDORE, INDIA</span><a href="#top">BACK TO THE BEGINNING ${icon('up')}</a></div>
    </div>
  </section>`;

export const app = () => `${hero()}${metricStrip()}${aboutSection()}${skillsSection()}${projectSection()}${contactSection()}`;

export const footer = () => `
  <div class="footer container"><a class="footer-brand" href="#top">Akshat Jain<span>.</span></a><p>© <span id="year"></span> ${profile.name} · Built with intention.</p><div class="footer-links"><a href="${profile.linkedin}" target="_blank" rel="noreferrer">LinkedIn</a><a href="${profile.github}" target="_blank" rel="noreferrer">GitHub</a></div></div>
  <div class="toast" id="toast" role="status" aria-live="polite"></div>`;

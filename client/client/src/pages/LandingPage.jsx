import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

export default function LandingPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthStore();

  // If logged in, redirect to dashboard
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Load external resources (CSS files and icons)
  useEffect(() => {
    // Enable smooth scrolling for hash links
    document.documentElement.style.scrollBehavior = 'smooth';

    // Load Phosphor Icons script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@phosphor-icons/web';
    script.async = true;
    document.head.appendChild(script);

    // Load Inter font from Google Fonts
    const fontLink1 = document.createElement('link');
    fontLink1.rel = 'preconnect';
    fontLink1.href = 'https://fonts.googleapis.com';
    document.head.appendChild(fontLink1);

    const fontLink2 = document.createElement('link');
    fontLink2.rel = 'preconnect';
    fontLink2.href = 'https://fonts.gstatic.com';
    fontLink2.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink2);

    const fontLink3 = document.createElement('link');
    fontLink3.rel = 'stylesheet';
    fontLink3.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap';
    document.head.appendChild(fontLink3);

    // Load CSS files from byteforge
    const cssFiles = ['/css/navbar.css', '/main.css', '/index.css'];
    const linkElements = cssFiles.map(href => {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = href;
      document.head.appendChild(link);
      return link;
    });

    // Cleanup function to remove all added elements when component unmounts
    return () => {
      document.documentElement.style.scrollBehavior = '';
      if (script.parentNode) script.parentNode.removeChild(script);
      if (fontLink1.parentNode) fontLink1.parentNode.removeChild(fontLink1);
      if (fontLink2.parentNode) fontLink2.parentNode.removeChild(fontLink2);
      if (fontLink3.parentNode) fontLink3.parentNode.removeChild(fontLink3);
      linkElements.forEach(link => {
        if (link.parentNode) link.parentNode.removeChild(link);
      });
    };
  }, []);

  // If logged in, show loading
  if (isAuthenticated) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#00041b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fcff66',
        fontSize: '18px',
      }}>
        Redirecting to dashboard...
      </div>
    );
  }

  // Render the byteforge landing page
  return (
    <>
      <nav className="navbar">
        <div className="container">
          <div className="navbar-logo">
            <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
              <i className="ph-fill ph-brain"></i>
            </a>
          </div>
          <div className="navbar-items">
            <input type="checkbox" id="hamburger-toggle" />
            <label htmlFor="hamburger-toggle" className="hamburger-icon">
              <i className="ph-light ph-list"></i>
            </label>
            <ul className="navbar-links">
              <li className="navbar-item">
                <a href="#about">About CRCEQuiz</a>
              </li>
              <li className="navbar-item">
                <a href="#pricing">Plans</a>
              </li>
              <li className="navbar-item"><a href="#stories">Stories</a></li>
              <li className="navbar-item">
                <a href="#institutes">Institutes</a>
              </li>
              <li>
                <div className="btn">
                  <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                    Login / Sign in
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-copy">
            <h1>Run Live Classroom <br />Quizzes. Faster.</h1>
            <p>
              CRCEQuiz helps educators host real-time quiz sessions, track
              performance instantly, and keep every student engaged from the
              first question to the final leaderboard.
            </p>
            <button>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                Start a Live Quiz
              </a>
            </button>
          </div>
          <div className="hero-img">
            <img src="/assets/hero-img.png" alt="CRCEQuiz Platform" />
          </div>
        </div>
      </section>

      <section className="clients" id="institutes">
        <div className="container">
          <p>
            Schools, coaching centers, and campus clubs trust CRCEQuiz to run
            smooth quiz sessions with dependable scoring and real-time updates.
          </p>
          <div className="client-logos">
            <img
              src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9b7e261f238326c629447_braintech.svg"
              alt="Client Logo"
            />
            <img
              src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9b81bcb329e5162eb7e55_IDNN.svg"
              alt="Client Logo"
            />
            <img
              src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9b826aec053d895d6412d_onebit.svg"
              alt="Client Logo"
            />
            <img
              src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9b83083368fc53b21eec8_BeSound.svg"
              alt="Client Logo"
            />
            <img
              src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9b83b0d8e975855361f5d_MAKEO.svg"
              alt="Client Logo"
            />
            <img
              src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9b846553ad5cddda2c10c_Doobank.svg"
              alt="Client Logo"
            />
          </div>
        </div>
      </section>

      <section className="cta-1" id="about">
        <div className="container">
          <div className="col">
            <p id="callout">Live Session Control</p>
            <h2>Create and <br />host in minutes.</h2>
            <p className="copy">
              Build quizzes collaboratively, set timers and scoring rules, and
              launch a session code your students can join instantly from any
              device in the classroom.
            </p>
            <button>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                Book a Walkthrough
              </a>
            </button>
          </div>
          <div className="col">
            <img src="/assets/cta-1.png" alt="Create and host" />
          </div>
        </div>
      </section>

      <section className="why-pro" id="pricing">
        <div className="container">
          <h2>Why CRCEQuiz</h2>
          <p className="copy">
            From question creation to post-quiz analytics, CRCEQuiz is crafted
            for fast classroom execution so teachers focus on learning outcomes,
            not operational overhead.
          </p>

          <div className="divider"></div>

          <div className="benefits">
            <div className="col">
              <div className="benefit">
                <h3><i className="ph-fill ph-atom"></i> Effortless Onboarding</h3>
                <p>
                  Teachers can create classes, import students, and start the
                  first quiz session in just a few clicks with zero setup burden.
                </p>
              </div>

              <div className="benefit">
                <h3>
                  <i className="ph-fill ph-bug-droid"></i> Live Session Reliability
                </h3>
                <p>
                  Stable session handling keeps hosts, participants, and question
                  flow synchronized even when many students join at once.
                </p>
              </div>

              <div className="benefit">
                <h3><i className="ph-fill ph-database"></i> Student Identity Ready</h3>
                <p>
                  Support for roll numbers and profiles makes attendance-linked
                  scoring and student-level history simple to manage.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="benefit">
                <h3>
                  <i className="ph-fill ph-codesandbox-logo"></i> Real-Time Speed
                </h3>
                <p>
                  Responses, rankings, and scoreboards update instantly, keeping
                  momentum high during high-energy live quiz rounds.
                </p>
              </div>

              <div className="benefit">
                <h3><i className="ph-fill ph-disc"></i> Smart Answer Validation</h3>
                <p>
                  Built-in validation logic ensures accurate marking for objective
                  questions while reducing manual review effort.
                </p>
              </div>

              <div className="benefit">
                <h3><i className="ph-fill ph-git-diff"></i> Instant Leaderboards</h3>
                <p>
                  Dynamic rankings motivate participation and make each session
                  competitive, transparent, and exciting for students.
                </p>
              </div>
            </div>

            <div className="col">
              <div className="benefit">
                <h3>
                  <i className="ph-fill ph-github-logo"></i> Dependable Infrastructure
                </h3>
                <p>
                  Reliable hosting and session APIs help institutions run regular
                  assessments without disruption during critical class hours.
                </p>
              </div>

              <div className="benefit">
                <h3>
                  <i className="ph-fill ph-puzzle-piece"></i> Modular Quiz Flows
                </h3>
                <p>
                  Mix warmups, timed rounds, and rapid-fire questions to tailor
                  each quiz experience to your teaching style.
                </p>
              </div>

              <div className="benefit">
                <h3>
                  <i className="ph-fill ph-tree-structure"></i> Seamless Integration
                </h3>
                <p>
                  Connect classroom workflows with your existing processes for
                  assessment reviews, student mentoring, and progress tracking.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="first-workflow">
        <div className="container">
          <div className="center">
            <h2>
              Teacher-centric <br />
              workflow
            </h2>
            <p className="copy">
              Build quizzes before class, launch sessions with a join code, and
              review outcomes right after the final question.
            </p>
          </div>

          <div className="flows">
            <div className="flow">
              <div className="flow-copy">
                <h3>Create & Validate</h3>
                <p>
                  Compose question sets, define scoring logic, and preview the
                  full quiz journey so students get a smooth and fair experience.
                </p>
              </div>
              <div className="flow-img">
                <img
                  src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9d2f8ea0a30cccb029ecf_code-cages.png"
                  alt="Create & Validate"
                />
              </div>
            </div>
            <div className="flow">
              <div className="flow-copy">
                <h3>Launch & Monitor</h3>
                <p>
                  Host live sessions, monitor active participation, and keep
                  pacing in control with real-time response visibility.
                </p>
              </div>
              <div className="flow-img">
                <img
                  src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64b9d05542f7724f06dd1572_code-functions.png"
                  alt="Launch & Monitor"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="first-workflow">
        <div className="container">
          <div className="center">
            <h2>Streamlined Session Operations</h2>
            <p className="copy">
              Configure once, run repeatedly, and keep every quiz organized
              across classes, batches, and assessment cycles.
            </p>
          </div>

          <div className="flow flow-lg">
            <div className="flow-copy">
              <h3>Before, During, and After Class</h3>
              <p>
                Manage session readiness, control live rounds, and access
                post-session analytics from one unified dashboard.
              </p>
              <button>
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                  Read Setup Guide
                </a>
              </button>
            </div>
          </div>

          <div className="flows">
            <div className="flow flow-sm-img">
              <div className="flow-copy">
                <h3>Join & Verify</h3>
                <p>
                  Students join quickly using session identifiers, while teachers
                  verify participation and prevent duplicate submissions.
                </p>
              </div>
              <div className="flow-img">
                <img
                  src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64baf294c81b94329c92fcb0_inboud-outbound.png"
                  alt="Join & Verify"
                />
              </div>
            </div>
            <div className="flow flow-sm-rev">
              <div className="flow-copy">
                <h3>Publish & Review</h3>
                <p>
                  Publish results instantly and analyze class-level and
                  student-level performance trends for better next steps.
                </p>
              </div>
              <div className="flow-img">
                <img
                  src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64baf5c1df5796b0a349d5d8_SDKs-icons.png"
                  alt="Publish & Review"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="onebit" id="stories">
        <div className="container">
          <div className="ob-logo">
            <img
              src="https://assets.website-files.com/64b936c88eb5ddace1f89459/64baf8e4ce670fe74ce66a16_onebit-color.svg"
              alt="Testimonial Logo"
            />
          </div>
          <div className="ob-copy">
            <p>
              "CRCEQuiz transformed our classroom assessments. We moved from slow,
              manual quiz checks to live sessions with instant leaderboards and
              clear progress insights for every learner."
            </p>
            <button>Aditi Rao | Faculty Coordinator</button>
          </div>
        </div>
      </section>

      <section className="cta-callout">
        <div className="container">
          <div className="callout-copy">
            <h2>Turn every class into a live challenge</h2>
            <p>
              Launch faster quizzes, boost participation, and make performance
              reviews actionable with CRCEQuiz.
            </p>
            <button>
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                Start Free
              </a>
            </button>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <div className="f-row footer-links">
            <div className="f-logo">
              <a href="#" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
                <i className="ph-fill ph-brain"></i> CRCEQuiz
              </a>
            </div>
            <div className="f-links">
              <div className="f-links-col">
                <p>Company</p>
                <a href="#about">About</a><br />
                <a href="#pricing">Plans</a><br />
                <a href="#institutes">Institutions</a><br />
                <a href="#">Privacy Policy</a><br />
              </div>
              <div className="f-links-col">
                <p>Resources</p>
                <a href="#stories">Blog</a><br />
                <a href="#">Docs</a><br />
                <a href="#">Release Notes</a><br />
              </div>
              <div className="f-links-col">
                <p>Support</p>
                <a href="#pricing">FAQ</a><br />
                <a href="#">Contact</a><br />
                <a href="#" onClick={(e) => { e.preventDefault(); navigate('/login'); }}>
                  Sign In
                </a><br />
              </div>
              <div className="f-links-col">
                <p>Product</p>
                <a href="#">Live Sessions</a><br />
                <a href="#">Question Bank</a><br />
                <a href="#">Analytics Dashboard</a><br />
              </div>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="container">
          <div className="f-row f-subscribe">
            <div className="sub-copy">
              <h3>Get product updates</h3>
              <p>Tips, release notes, and classroom quiz best practices.</p>
            </div>
            <div className="sub-form">
              <input type="text" placeholder="Enter work email" />
              <button>Join</button>
            </div>
          </div>
        </div>
        <div className="divider"></div>
        <div className="container">
          <div className="f-row f-ctext">
            <div className="copy-text">
              <p>© 2026 CRCEQuiz. All rights reserved.</p>
            </div>
            <div className="socials">
              <a href="#"><i className="ph-fill ph-instagram-logo"></i></a>
              <a href="#"><i className="ph-fill ph-twitter-logo"></i></a>
              <a href="#"><i className="ph-fill ph-linkedin-logo"></i></a>
              <a href="#"><i className="ph-fill ph-youtube-logo"></i></a>
              <a href="#"><i className="ph-fill ph-tiktok-logo"></i></a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

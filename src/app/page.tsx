import Link from "next/link";

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <span className="phase-tag">Local priorities board</span>
        <h1 id="page-title">Village Square</h1>
        <p className="lead">
          A simple civic space for residents to raise local issues and help
          representatives see what matters most.
        </p>
        <div className="action-row">
          <Link className="button button--primary" href="/issues">
            View local priorities
          </Link>
          <Link className="button button--secondary" href="/sign-in">
            Prototype sign in
          </Link>
        </div>
      </section>

      <section className="content-section" aria-labelledby="experience-title">
        <h2 id="experience-title">What the first prototype covers</h2>
        <div className="summary-grid">
          <div>
            <h3>Raise local issues</h3>
            <p>
              Residents can describe a local priority with a short title and
              brief details.
            </p>
          </div>
          <div>
            <h3>Show support</h3>
            <p>
              Issues use simple up and down arrows to show whether something is
              a priority.
            </p>
          </div>
          <div>
            <h3>Track outcomes</h3>
            <p>
              Issues can be Open or Addressed. Addressed means a real outcome
              happened.
            </p>
          </div>
        </div>
      </section>

      <section className="content-section" aria-labelledby="scope-title">
        <h2 id="scope-title">Prototype boundaries</h2>
        <p>
          This UI shell uses mock-only flows. It does not include real accounts,
          verification, moderation, database writes, payments, AI, or council
          integrations.
        </p>
      </section>
    </main>
  );
}

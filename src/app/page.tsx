import Link from "next/link";

const priorityPreview = [
  {
    title: "Potholes on Station Road",
    status: "Open",
    score: 42,
  },
  {
    title: "Fly-tipping near the park",
    status: "Open",
    score: 31,
  },
  {
    title: "Street lighting repaired",
    status: "Addressed",
    score: 18,
  },
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <span className="phase-tag">Example local area</span>
        <h1 id="page-title">Welcome to Village Square</h1>
        <p className="lead">
          Village Square helps local residents raise priorities, show what needs
          attention, and see when real outcomes have happened.
        </p>
        <div className="action-row">
          <Link className="button button--primary" href="/issues">
            View local priorities
          </Link>
          <Link className="button button--secondary" href="/issues">
            Raise an issue
          </Link>
        </div>
      </section>

      <section className="content-section" aria-labelledby="how-it-works-title">
        <h2 id="how-it-works-title">How it works</h2>
        <ol className="steps-list">
          <li>
            <h3>Raise an issue</h3>
            <p>Share a short title and brief details about a local priority.</p>
          </li>
          <li>
            <h3>Vote and discuss</h3>
            <p>Use support or not-a-priority votes to show what matters.</p>
          </li>
          <li>
            <h3>See what gets addressed</h3>
            <p>
              Track issues marked Addressed when a real outcome has happened.
            </p>
          </li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="preview-title">
        <h2 id="preview-title">Local priorities preview</h2>
        <p>
          These examples show the kind of local priorities residents will see on
          the board.
        </p>
        <div className="priority-preview-list">
          {priorityPreview.map((priority) => (
            <article className="priority-preview" key={priority.title}>
              <div>
                <h3>{priority.title}</h3>
                <span
                  className={
                    priority.status === "Addressed"
                      ? "status-pill status-pill--addressed"
                      : "status-pill"
                  }
                >
                  {priority.status}
                </span>
              </div>
              <strong className="priority-score">Score {priority.score}</strong>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

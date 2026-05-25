const mockIssues = [
  {
    title: "Improve lighting near Market Lane",
    details:
      "Several residents have raised that the footpath feels unsafe after dark, especially near the bus stops.",
    score: 42,
    comments: 8,
    status: "Open",
  },
  {
    title: "Repair damaged pavement by the library",
    details:
      "Uneven paving outside the library entrance is making access harder for wheelchair users and parents with buggies.",
    score: 29,
    comments: 5,
    status: "Open",
  },
  {
    title: "Add a safe crossing near Elm Primary",
    details:
      "Families have asked for a clearer crossing point on the school route during morning drop-off.",
    score: 64,
    comments: 14,
    status: "Addressed",
    outcome:
      "A temporary crossing patrol has been agreed while a permanent crossing assessment is completed.",
  },
];

export default function IssuesPage() {
  return (
    <main className="page-shell">
      <section className="page-intro" aria-labelledby="issues-title">
        <span className="phase-tag">Single-area demo</span>
        <h1 id="issues-title">Local priorities</h1>
        <p className="lead">
          See what local residents are raising and which issues have the most
          support.
        </p>
      </section>

      <section className="content-section" aria-labelledby="composer-title">
        <details className="composer">
          <summary id="composer-title">Raise an issue</summary>
          <form className="composer__form">
            <label htmlFor="issue-title">Short title</label>
            <input
              id="issue-title"
              name="issue-title"
              type="text"
              placeholder="Example: Improve lighting near Market Lane"
            />

            <label htmlFor="issue-details">Brief details</label>
            <textarea
              id="issue-details"
              name="issue-details"
              rows={4}
              placeholder="Describe what is happening and who it affects."
            />

            <button className="button button--primary" type="button" disabled>
              Post issue
            </button>
            <p className="form-note">
              Mock-only composer. Posting is not connected yet.
            </p>
          </form>
        </details>
      </section>

      <section className="issue-list" aria-label="Local issue list">
        {mockIssues.map((issue) => (
          <article className="issue-card" key={issue.title}>
            <div className="vote-stack" aria-label="Voting preview">
              <button type="button" disabled aria-label="Support issue">
                ▲
              </button>
              <strong>{issue.score}</strong>
              <button type="button" disabled aria-label="Not a priority">
                ▼
              </button>
            </div>
            <div className="issue-card__content">
              <div className="issue-card__meta">
                <span
                  className={
                    issue.status === "Addressed"
                      ? "status-pill status-pill--addressed"
                      : "status-pill"
                  }
                >
                  {issue.status}
                </span>
                <span>{issue.comments} comments</span>
              </div>
              <h2>{issue.title}</h2>
              <p>{issue.details}</p>
              {issue.outcome ? (
                <div className="outcome-note">
                  <strong>Outcome note</strong>
                  <p>{issue.outcome}</p>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

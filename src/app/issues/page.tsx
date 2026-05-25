type IssueStatus = "Open" | "Addressed";

type MockIssue = {
  id: string;
  title: string;
  details: string;
  status: IssueStatus;
  score: number;
  supportCount: number;
  notPriorityCount: number;
  commentCount: number;
  officialUpdate?: string;
};

const mockIssues: MockIssue[] = [
  {
    id: "station-road-potholes",
    title: "Potholes on Station Road",
    details:
      "Several deep potholes near the station entrance are forcing cyclists into traffic and making the bus stop harder to reach.",
    status: "Open",
    score: 42,
    supportCount: 58,
    notPriorityCount: 16,
    commentCount: 12,
  },
  {
    id: "park-fly-tipping",
    title: "Fly-tipping near the park",
    details:
      "Rubbish bags and broken furniture have been left beside the north gate for more than a week.",
    status: "Open",
    score: 31,
    supportCount: 39,
    notPriorityCount: 8,
    commentCount: 7,
  },
  {
    id: "market-lane-lighting",
    title: "Improve lighting near Market Lane",
    details:
      "The footpath between the shops and bus stops feels unsafe after dark because two lamps are not working.",
    status: "Open",
    score: 24,
    supportCount: 32,
    notPriorityCount: 8,
    commentCount: 5,
    officialUpdate:
      "Representative reply requested from the local highways team.",
  },
  {
    id: "street-lighting-repaired",
    title: "Street lighting repaired",
    details:
      "Residents reported broken lights around the footpath behind the community centre.",
    status: "Addressed",
    score: 18,
    supportCount: 23,
    notPriorityCount: 5,
    commentCount: 4,
    officialUpdate:
      "Outcome: the broken lamps were repaired by the maintenance contractor on Friday.",
  },
];

export default function IssuesPage() {
  return (
    <main className="page-shell">
      <section className="page-intro" aria-labelledby="issues-title">
        <span className="phase-tag">Single-area demo</span>
        <h1 id="issues-title">Local priorities in Example local area</h1>
        <p className="lead">
          See what local residents are raising, what has support, and which
          issues have been addressed.
        </p>
        <div className="action-row">
          <a className="button button--primary" href="#raise-issue">
            Raise an issue
          </a>
        </div>
      </section>

      <section
        className="board-controls"
        aria-label="Issue filters and sorting"
      >
        <div className="control-group" aria-label="Filter by status">
          <span className="control-group__label">Filter</span>
          <button className="filter-button filter-button--active" type="button">
            Open
          </button>
          <button className="filter-button" type="button">
            Addressed
          </button>
        </div>

        <div className="control-group" aria-label="Sort issues">
          <span className="control-group__label">Sort</span>
          <button className="filter-button filter-button--active" type="button">
            Most supported
          </button>
          <button className="filter-button" type="button">
            Newest
          </button>
        </div>
      </section>

      <section
        className="content-section"
        id="raise-issue"
        aria-labelledby="composer-title"
      >
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
          <article className="issue-card" key={issue.id}>
            <div className="vote-stack" aria-label="Voting preview">
              <button type="button" aria-label="Support issue">
                ▲
              </button>
              <strong>{issue.score}</strong>
              <span>score</span>
              <button type="button" aria-label="Not a priority">
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
                <span>{issue.commentCount} comments</span>
              </div>
              <h2>{issue.title}</h2>
              <p>{issue.details}</p>

              <dl className="issue-stats" aria-label="Issue activity">
                <div>
                  <dt>Support</dt>
                  <dd>{issue.supportCount}</dd>
                </div>
                <div>
                  <dt>Not a priority</dt>
                  <dd>{issue.notPriorityCount}</dd>
                </div>
                <div>
                  <dt>Comments</dt>
                  <dd>{issue.commentCount}</dd>
                </div>
              </dl>

              {issue.officialUpdate ? (
                <div className="outcome-note">
                  <strong>
                    {issue.status === "Addressed"
                      ? "Official outcome"
                      : "Official update"}
                  </strong>
                  <p>{issue.officialUpdate}</p>
                </div>
              ) : null}

              <div className="issue-card__actions">
                <button className="button button--secondary" type="button">
                  View discussion
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}

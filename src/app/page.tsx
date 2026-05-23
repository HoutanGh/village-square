const milestones = [
  "UI shell",
  "Mock issue feed",
  "Expandable issues",
  "Create issue flow",
  "Representative dashboard",
  "Admin moderation dashboard",
];

export default function Home() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="page-title">
        <span className="phase-tag">UI-first prototype</span>
        <h1 id="page-title">Village Square</h1>
        <p className="lead">
          A civic engagement platform for residents and local representatives to
          raise, discuss, and respond to local issues.
        </p>
      </section>

      <section className="content-section" aria-labelledby="mvp-title">
        <h2 id="mvp-title">MVP product loop</h2>
        <ol className="numbered-list">
          <li>A resident views local issues.</li>
          <li>A resident creates a new issue.</li>
          <li>Other residents vote and comment.</li>
          <li>A representative replies officially.</li>
          <li>An admin reviews moderation tools.</li>
          <li>Issues are marked as Open or Done.</li>
        </ol>
      </section>

      <section className="content-section" aria-labelledby="milestones-title">
        <h2 id="milestones-title">First milestones</h2>
        <ul className="milestone-list">
          {milestones.map((milestone) => (
            <li key={milestone}>{milestone}</li>
          ))}
        </ul>
      </section>
    </main>
  );
}

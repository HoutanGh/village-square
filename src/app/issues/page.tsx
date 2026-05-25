"use client";

import { type FormEvent, useState } from "react";

type IssueStatus = "Open" | "Addressed";

type ResidentComment = {
  id: string;
  body: string;
  postedBy: "Anonymous local resident";
};

type MockIssue = {
  id: string;
  title: string;
  details: string;
  fullDetails: string;
  status: IssueStatus;
  score: number;
  supportCount: number;
  notPriorityCount: number;
  commentCount: number;
  comments: ResidentComment[];
  officialUpdate?: string;
  outcomeNote?: string;
};

type ComposerErrors = {
  title?: string;
  details?: string;
};

const mockIssues: MockIssue[] = [
  {
    id: "station-road-potholes",
    title: "Potholes on Station Road",
    details:
      "Several deep potholes near the station entrance are forcing cyclists into traffic and making the bus stop harder to reach.",
    fullDetails:
      "Residents have reported several potholes on Station Road between the station entrance and the bus stop. The concern is that cyclists are swerving around the damaged road surface during busy periods, while pedestrians using the crossing point are also affected by pooled water after rain.",
    status: "Open",
    score: 42,
    supportCount: 58,
    notPriorityCount: 16,
    commentCount: 12,
    comments: [
      {
        id: "station-road-comment-1",
        postedBy: "Anonymous local resident",
        body: "This is worse after rain because the holes fill with water and become difficult to see.",
      },
      {
        id: "station-road-comment-2",
        postedBy: "Anonymous local resident",
        body: "The section closest to the station entrance is the main problem during the morning commute.",
      },
    ],
  },
  {
    id: "park-fly-tipping",
    title: "Fly-tipping near the park",
    details:
      "Rubbish bags and broken furniture have been left beside the north gate for more than a week.",
    fullDetails:
      "The dumped items are near the north gate path into the park. Residents are concerned that the rubbish is attracting more dumping and blocking part of the path used by families and dog walkers.",
    status: "Open",
    score: 31,
    supportCount: 39,
    notPriorityCount: 8,
    commentCount: 7,
    comments: [
      {
        id: "park-fly-tipping-comment-1",
        postedBy: "Anonymous local resident",
        body: "There are now loose bags as well as the furniture. It is starting to spread across the path.",
      },
      {
        id: "park-fly-tipping-comment-2",
        postedBy: "Anonymous local resident",
        body: "This spot needs checking regularly because the same thing happened last month.",
      },
    ],
  },
  {
    id: "market-lane-lighting",
    title: "Improve lighting near Market Lane",
    details:
      "The footpath between the shops and bus stops feels unsafe after dark because two lamps are not working.",
    fullDetails:
      "The affected section is the path between the Market Lane shops and the bus stops. Two lights appear to be out, leaving a dark stretch that residents use after work and school activities.",
    status: "Open",
    score: 24,
    supportCount: 32,
    notPriorityCount: 8,
    commentCount: 5,
    comments: [
      {
        id: "market-lane-comment-1",
        postedBy: "Anonymous local resident",
        body: "This is the route many people use from the bus stop. It feels avoidable if the lights are repaired.",
      },
    ],
    officialUpdate:
      "Representative reply requested from the local highways team.",
  },
  {
    id: "street-lighting-repaired",
    title: "Street lighting repaired",
    details:
      "Residents reported broken lights around the footpath behind the community centre.",
    fullDetails:
      "The issue covered broken lights along the footpath behind the community centre. Residents said the route was difficult to use safely during the evening, especially after community events.",
    status: "Addressed",
    score: 18,
    supportCount: 23,
    notPriorityCount: 5,
    commentCount: 4,
    comments: [
      {
        id: "street-lighting-comment-1",
        postedBy: "Anonymous local resident",
        body: "The lights are working again now. This has made the route much easier to use in the evening.",
      },
      {
        id: "street-lighting-comment-2",
        postedBy: "Anonymous local resident",
        body: "Thanks for following this up. It was a small fix but made a noticeable difference.",
      },
    ],
    officialUpdate:
      "The repair was confirmed by the maintenance contractor on Friday.",
    outcomeNote:
      "The broken lamps were repaired and the footpath is lit again.",
  },
];

export default function IssuesPage() {
  const [expandedIssueId, setExpandedIssueId] = useState<string | null>(null);
  const [isComposerOpen, setIsComposerOpen] = useState(false);
  const [composerTitle, setComposerTitle] = useState("");
  const [composerDetails, setComposerDetails] = useState("");
  const [composerErrors, setComposerErrors] = useState<ComposerErrors>({});
  const [composerSuccess, setComposerSuccess] = useState<string | null>(null);

  function handleComposerSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors: ComposerErrors = {};

    if (!composerTitle.trim()) {
      nextErrors.title = "Enter a short title.";
    }

    if (!composerDetails.trim()) {
      nextErrors.details = "Enter brief details.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setComposerSuccess(null);
      setComposerErrors(nextErrors);
      return;
    }

    setComposerErrors({});
    setComposerSuccess(
      "Mock issue posted. It is not saved or added to the board yet.",
    );
    setComposerTitle("");
    setComposerDetails("");
  }

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
          <button
            className="button button--primary"
            type="button"
            aria-controls="raise-issue"
            aria-expanded={isComposerOpen}
            onClick={() => setIsComposerOpen((current) => !current)}
          >
            {isComposerOpen ? "Hide issue composer" : "Raise an issue"}
          </button>
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
        className="composer-section"
        id="raise-issue"
        aria-label="Issue composer"
      >
        {isComposerOpen ? (
          <div
            className="composer"
            role="region"
            aria-labelledby="composer-title"
          >
            <div className="composer__header">
              <h2 id="composer-title">Raise an issue</h2>
              <p>
                Keep it short. Add enough detail for neighbours and
                representatives to understand the local priority.
              </p>
            </div>

            {composerSuccess ? (
              <p className="success-message" role="status">
                {composerSuccess}
              </p>
            ) : null}

            <form className="composer__form" onSubmit={handleComposerSubmit}>
              <div className="field-group">
                <label htmlFor="issue-title">Short title</label>
                <input
                  id="issue-title"
                  name="issue-title"
                  type="text"
                  value={composerTitle}
                  aria-describedby={
                    composerErrors.title ? "issue-title-error" : undefined
                  }
                  aria-invalid={composerErrors.title ? "true" : undefined}
                  onChange={(event) => {
                    setComposerTitle(event.target.value);
                    setComposerSuccess(null);
                  }}
                  placeholder="Example: Improve lighting near Market Lane"
                />
                {composerErrors.title ? (
                  <p className="field-error" id="issue-title-error">
                    {composerErrors.title}
                  </p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="issue-details">Brief details</label>
                <textarea
                  id="issue-details"
                  name="issue-details"
                  rows={4}
                  value={composerDetails}
                  aria-describedby={
                    composerErrors.details ? "issue-details-error" : undefined
                  }
                  aria-invalid={composerErrors.details ? "true" : undefined}
                  onChange={(event) => {
                    setComposerDetails(event.target.value);
                    setComposerSuccess(null);
                  }}
                  placeholder="Describe what is happening and who it affects."
                />
                {composerErrors.details ? (
                  <p className="field-error" id="issue-details-error">
                    {composerErrors.details}
                  </p>
                ) : null}
              </div>

              <button className="button button--primary" type="submit">
                Post issue
              </button>
              <p className="form-note">
                Mock-only composer. This does not create or save a real issue.
              </p>
            </form>
          </div>
        ) : null}
      </section>

      <section className="issue-list" aria-label="Local issue list">
        {mockIssues.map((issue) => {
          const isExpanded = expandedIssueId === issue.id;
          const discussionId = `${issue.id}-discussion`;

          return (
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
                    <strong>Official update</strong>
                    <p>{issue.officialUpdate}</p>
                  </div>
                ) : null}

                <div className="issue-card__actions">
                  <button
                    className="button button--secondary"
                    type="button"
                    aria-controls={discussionId}
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpandedIssueId(isExpanded ? null : issue.id)
                    }
                  >
                    {isExpanded ? "Hide discussion" : "View discussion"}
                  </button>
                </div>

                {isExpanded ? (
                  <div className="discussion-panel" id={discussionId}>
                    <section
                      className="discussion-section"
                      aria-labelledby={`${issue.id}-details-title`}
                    >
                      <h3 id={`${issue.id}-details-title`}>Full details</h3>
                      <p>{issue.fullDetails}</p>
                    </section>

                    {issue.officialUpdate ? (
                      <section
                        className="discussion-section"
                        aria-labelledby={`${issue.id}-update-title`}
                      >
                        <h3 id={`${issue.id}-update-title`}>Official update</h3>
                        <p>{issue.officialUpdate}</p>
                      </section>
                    ) : null}

                    {issue.status === "Addressed" && issue.outcomeNote ? (
                      <section
                        className="discussion-section discussion-section--outcome"
                        aria-labelledby={`${issue.id}-outcome-title`}
                      >
                        <h3 id={`${issue.id}-outcome-title`}>Outcome note</h3>
                        <p>{issue.outcomeNote}</p>
                      </section>
                    ) : null}

                    <section
                      className="discussion-section"
                      aria-labelledby={`${issue.id}-comments-title`}
                    >
                      <h3 id={`${issue.id}-comments-title`}>
                        Anonymous local resident comments
                      </h3>
                      <div className="comment-list">
                        {issue.comments.map((comment) => (
                          <article
                            className="resident-comment"
                            key={comment.id}
                          >
                            <strong>{comment.postedBy}</strong>
                            <p>{comment.body}</p>
                          </article>
                        ))}
                      </div>
                    </section>

                    <form className="mock-comment-form">
                      <label htmlFor={`${issue.id}-comment`}>
                        Add a comment
                      </label>
                      <textarea
                        id={`${issue.id}-comment`}
                        name={`${issue.id}-comment`}
                        rows={3}
                        placeholder="Write a short comment as an anonymous local resident."
                      />
                      <button
                        className="button button--primary"
                        type="button"
                        disabled
                      >
                        Post comment
                      </button>
                      <p className="form-note">
                        Mock-only comment box. Comments are not saved yet.
                      </p>
                    </form>
                  </div>
                ) : null}
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
}

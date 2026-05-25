"use client";

import { type FormEvent, useState } from "react";

type IssueStatus = "Open" | "Addressed";

type ResidentComment = {
  id: string;
  body: string;
  postedBy: "Anonymous local resident";
  score: number;
  replies?: ResidentComment[];
};

type MockIssue = {
  id: string;
  title: string;
  details: string;
  status: IssueStatus;
  score: number;
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
    status: "Open",
    score: 42,
    commentCount: 12,
    comments: [
      {
        id: "station-road-comment-1",
        postedBy: "Anonymous local resident",
        body: "This is worse after rain because the holes fill with water and become difficult to see.",
        score: 11,
        replies: [
          {
            id: "station-road-comment-1-reply-1",
            postedBy: "Anonymous local resident",
            body: "Agree. It is hard to judge the depth until you are already close to it.",
            score: 4,
          },
        ],
      },
      {
        id: "station-road-comment-2",
        postedBy: "Anonymous local resident",
        body: "The section closest to the station entrance is the main problem during the morning commute.",
        score: 8,
      },
    ],
  },
  {
    id: "park-fly-tipping",
    title: "Fly-tipping near the park",
    details:
      "Rubbish bags and broken furniture have been left beside the north gate for more than a week.",
    status: "Open",
    score: 31,
    commentCount: 7,
    comments: [
      {
        id: "park-fly-tipping-comment-1",
        postedBy: "Anonymous local resident",
        body: "There are now loose bags as well as the furniture. It is starting to spread across the path.",
        score: 9,
        replies: [
          {
            id: "park-fly-tipping-comment-1-reply-1",
            postedBy: "Anonymous local resident",
            body: "I saw this too. It is close to the entrance rather than deeper inside the park.",
            score: 2,
          },
        ],
      },
      {
        id: "park-fly-tipping-comment-2",
        postedBy: "Anonymous local resident",
        body: "This spot needs checking regularly because the same thing happened last month.",
        score: 6,
      },
    ],
  },
  {
    id: "market-lane-lighting",
    title: "Improve lighting near Market Lane",
    details:
      "The footpath between the shops and bus stops feels unsafe after dark because two lamps are not working.",
    status: "Open",
    score: 24,
    commentCount: 5,
    comments: [
      {
        id: "market-lane-comment-1",
        postedBy: "Anonymous local resident",
        body: "This is the route many people use from the bus stop. It feels avoidable if the lights are repaired.",
        score: 7,
        replies: [
          {
            id: "market-lane-comment-1-reply-1",
            postedBy: "Anonymous local resident",
            body: "It is especially noticeable after the shops close because there is less light from the storefronts.",
            score: 3,
          },
        ],
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
    status: "Addressed",
    score: 18,
    commentCount: 4,
    comments: [
      {
        id: "street-lighting-comment-1",
        postedBy: "Anonymous local resident",
        body: "The lights are working again now. This has made the route much easier to use in the evening.",
        score: 10,
        replies: [
          {
            id: "street-lighting-comment-1-reply-1",
            postedBy: "Anonymous local resident",
            body: "Same here. It feels like a small fix but it changed the route for the better.",
            score: 5,
          },
        ],
      },
      {
        id: "street-lighting-comment-2",
        postedBy: "Anonymous local resident",
        body: "Thanks for following this up. It was a small fix but made a noticeable difference.",
        score: 7,
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
  const [expandedCommentIds, setExpandedCommentIds] = useState<string[]>([]);
  const [replyingToCommentId, setReplyingToCommentId] = useState<string | null>(
    null,
  );
  const [replyDraft, setReplyDraft] = useState("");
  const [replyNotice, setReplyNotice] = useState<string | null>(null);
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

  function toggleCommentReplies(commentId: string) {
    setExpandedCommentIds((current) =>
      current.includes(commentId)
        ? current.filter((id) => id !== commentId)
        : [...current, commentId],
    );
  }

  function handleMockReplySubmit() {
    if (!replyDraft.trim()) {
      setReplyNotice("Write a short reply before posting.");
      return;
    }

    setReplyNotice("Mock reply posted. It is not saved yet.");
    setReplyingToCommentId(null);
    setReplyDraft("");
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

                {issue.officialUpdate ? (
                  <div className="outcome-note">
                    <strong>Official update</strong>
                    <p>{issue.officialUpdate}</p>
                  </div>
                ) : null}

                <div className="issue-card__actions">
                  <button
                    className="issue-action"
                    type="button"
                    aria-controls={discussionId}
                    aria-expanded={isExpanded}
                    onClick={() =>
                      setExpandedIssueId(isExpanded ? null : issue.id)
                    }
                  >
                    <span aria-hidden="true">{isExpanded ? "−" : "+"}</span>
                    {isExpanded ? "Hide discussion" : "View discussion"}
                  </button>
                </div>

                {isExpanded ? (
                  <div className="discussion-panel" id={discussionId}>
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
                      <h3 id={`${issue.id}-comments-title`}>Comments</h3>
                      <CommentThread
                        comments={issue.comments}
                        expandedCommentIds={expandedCommentIds}
                        replyingToCommentId={replyingToCommentId}
                        replyDraft={replyDraft}
                        replyNotice={replyNotice}
                        onReplyDraftChange={setReplyDraft}
                        onReplyStart={(commentId) => {
                          setReplyNotice(null);
                          setReplyDraft("");
                          setReplyingToCommentId(commentId);
                        }}
                        onReplyCancel={() => {
                          setReplyingToCommentId(null);
                          setReplyDraft("");
                          setReplyNotice(null);
                        }}
                        onReplySubmit={handleMockReplySubmit}
                        onToggleReplies={toggleCommentReplies}
                      />
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
                        className="comment-action comment-action--strong"
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

type CommentThreadProps = {
  comments: ResidentComment[];
  expandedCommentIds: string[];
  replyingToCommentId: string | null;
  replyDraft: string;
  replyNotice: string | null;
  onReplyDraftChange: (value: string) => void;
  onReplyStart: (commentId: string) => void;
  onReplyCancel: () => void;
  onReplySubmit: () => void;
  onToggleReplies: (commentId: string) => void;
};

function CommentThread({
  comments,
  expandedCommentIds,
  replyingToCommentId,
  replyDraft,
  replyNotice,
  onReplyDraftChange,
  onReplyStart,
  onReplyCancel,
  onReplySubmit,
  onToggleReplies,
}: CommentThreadProps) {
  return (
    <div className="comment-list">
      {comments.map((comment) => {
        const hasReplies = Boolean(comment.replies?.length);
        const repliesAreExpanded = expandedCommentIds.includes(comment.id);

        return (
          <article className="resident-comment" key={comment.id}>
            <div className="resident-comment__body">
              <strong>{comment.postedBy}</strong>
              <p>{comment.body}</p>

              <div className="comment-actions">
                <div className="comment-votes" aria-label="Comment voting">
                  <button type="button" aria-label="Support comment">
                    ▲
                  </button>
                  <span>{comment.score}</span>
                  <button type="button" aria-label="Not a priority">
                    ▼
                  </button>
                </div>

                {hasReplies ? (
                  <button
                    className="comment-action"
                    type="button"
                    aria-expanded={repliesAreExpanded}
                    onClick={() => onToggleReplies(comment.id)}
                  >
                    <span aria-hidden="true">
                      {repliesAreExpanded ? "-" : "+"}
                    </span>
                    {repliesAreExpanded
                      ? "Hide replies"
                      : `${comment.replies?.length ?? 0} replies`}
                  </button>
                ) : null}

                <button
                  className="comment-action"
                  type="button"
                  onClick={() => onReplyStart(comment.id)}
                >
                  <span aria-hidden="true">↩</span>
                  Reply
                </button>
              </div>

              {replyingToCommentId === comment.id ? (
                <form className="reply-composer">
                  <label htmlFor={`${comment.id}-reply`}>
                    Reply to this comment
                  </label>
                  <textarea
                    id={`${comment.id}-reply`}
                    rows={2}
                    value={replyDraft}
                    onChange={(event) => onReplyDraftChange(event.target.value)}
                    placeholder="Write a short reply."
                  />
                  <div className="reply-actions">
                    <button
                      className="comment-action comment-action--strong"
                      type="button"
                      onClick={onReplySubmit}
                    >
                      Post reply
                    </button>
                    <button
                      className="comment-action"
                      type="button"
                      onClick={onReplyCancel}
                    >
                      Cancel
                    </button>
                  </div>
                  {replyNotice ? (
                    <p className="form-note" role="status">
                      {replyNotice}
                    </p>
                  ) : null}
                </form>
              ) : null}
            </div>

            {hasReplies && repliesAreExpanded ? (
              <CommentThread
                comments={comment.replies ?? []}
                expandedCommentIds={expandedCommentIds}
                replyingToCommentId={replyingToCommentId}
                replyDraft={replyDraft}
                replyNotice={replyNotice}
                onReplyDraftChange={onReplyDraftChange}
                onReplyStart={onReplyStart}
                onReplyCancel={onReplyCancel}
                onReplySubmit={onReplySubmit}
                onToggleReplies={onToggleReplies}
              />
            ) : null}
          </article>
        );
      })}
    </div>
  );
}

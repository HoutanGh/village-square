# Village Square

Village Square is a civic engagement platform for local councils, councillors, MPs, constituency representatives, local representatives, and residents.

The aim is to help local representatives understand what issues matter most to local people.

Residents can raise local issues, vote on issues, comment, and see official replies from representatives.

## MVP

The MVP is a single-area demo.

It should prove the core product loop:

1. A resident views local issues.
2. A resident creates a new issue.
3. Other residents can upvote, downvote, and comment.
4. A representative can reply officially.
5. An admin can view moderation tools.
6. Issues can be marked as `Open` or `Done`.

The MVP is not intended to be a full production council system yet.

## Current build approach

The project will be built UI-first.

The first version should be a believable, clickable website using typed mock data.

This lets us work out the user experience before adding real authentication, database storage, council integrations, or verification systems.

## Intended technology

The intended stack is:

- React
- Next.js
- TypeScript
- GOV.UK-inspired UI styling

Backend, database, authentication, and verification choices will be decided later.

## Core MVP screens

The first version should include:

- Home page
- Sign-in page mock
- Resident issue feed
- Create issue page
- Expandable issue cards
- Comments UI
- Upvote/downvote UI
- Official representative replies
- Representative dashboard
- Admin moderation dashboard

## Core MVP concepts

### Residents

Residents can:

- view local issues
- create an issue
- vote on issues
- comment on issues
- see official replies

### Representatives

Representatives can:

- view local issues
- see popular or recent issues
- reply officially to issues
- see whether issues are open or done

### Admins

Admins can:

- view issues and comments
- access moderation tools
- remove inappropriate content in the future

For the first UI prototype, admin actions may be mock-only.

## Issue status

For the MVP, issues only need two statuses:

- `Open`
- `Done`

More complex status workflows are intentionally out of scope for now.

## Verification

Long term, the platform should ideally verify that residents belong to the relevant local area.

This may eventually involve council systems or voter-registration-style verification.

For the MVP, this is out of scope.

The first version should use mock users and mock verification states only.

Possible verification states:

- `unverified`
- `self_declared_local`
- `council_verified`
- `voter_register_verified`

## Out of scope for now

The MVP should not include:

- real voter-register verification
- real council or government data integration
- production authentication
- production database writes
- payments or subscriptions
- AI issue grouping
- custom trained AI models
- automated moderation
- multiple council onboarding
- advanced analytics
- complex workflow statuses
- council-specific branding
- notifications

These may be considered after the core product loop works.

## Design direction

The design should be clean, simple, and GOV.UK-inspired.

The product should feel like a serious civic/public-sector tool, not a social media app.

It should not falsely imply that it is an official GOV.UK service or that it is endorsed by government.

## First milestones

### Milestone 1: UI shell

Create the basic app layout and placeholder pages.

Pages:

- Home
- Sign in
- Issue feed
- Create issue
- Representative dashboard
- Admin dashboard

### Milestone 2: Mock issue feed

Create typed mock data and display local issues in a clean feed.

Each issue should show:

- title
- description
- score
- upvotes
- downvotes
- comment count
- status
- created date

### Milestone 3: Expandable issues

Allow issue cards to expand inline.

Expanded issues should show:

- full description
- comments
- official representative replies
- comment form UI

### Milestone 4: Create issue flow

Create a form for residents to submit an issue.

For the first version, submitting can be mock-only.

### Milestone 5: Representative dashboard

Create a dashboard where representatives can view issues and official reply UI.

### Milestone 6: Admin moderation dashboard

Create a dashboard showing mock moderation tools for issues and comments.

## Development principles

- Keep changes small.
- Avoid unnecessary abstractions.
- Do not build future features early.
- Keep mock data separate from components.
- Keep product types explicit.
- Prefer readable code over clever code.
- Clearly mark mock-only behaviour.
- Do not add backend functionality until it is intentionally scoped.

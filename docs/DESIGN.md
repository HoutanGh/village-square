# Village Square MVP Design

## Product Direction

Village Square is a UI-first civic engagement prototype. The MVP experience is a local priorities board where residents can raise issues, vote on what matters, and see when an official outcome has happened.

For now, the product uses typed mock data only. It must not include real authentication, verification, database writes, council integrations, backend logic, payments, AI grouping, or production moderation automation.

## MVP Scope

### Main Experience

The main experience is the local priorities board at `/issues`.

Residents use it to:

- view local issues
- raise lightweight issues
- support issues with an up arrow
- mark issues as not a priority with a down arrow
- comment on issues
- see whether an issue is `Open` or `Addressed`

Public resident identity is anonymous local resident. Private account verification may exist later, but no real verification is designed or built for this MVP.

### Issue Statuses

The MVP uses two statuses:

- `Open`
- `Addressed`

`Addressed` means a real outcome happened. It must not mean only that an issue was passed to a team.

Marking an issue `Addressed` requires an outcome note. Only official representatives and platform admins can mark issues `Addressed`.

Moderators can hide, remove, or organise content, but cannot add official outcomes unless they also have official permissions. Moderation actions should require a reason.

### Deliberately Not Designed Yet

Do not design separate pages yet for:

- admin
- representative
- outcomes
- my activity
- issue detail

Issues are standalone for the MVP. Future features may include related issues, parent issues, linked issues, duplicate grouping, and creating issues from comments, but those are intentionally not detailed here.

## Pages

### `/` Home Page

**Purpose**

Introduce Village Square and route people into the prototype.

**Main Sections**

- product title and short explanation
- short description of the local priorities board
- simple explanation of what residents can do
- clear entry point to view local issues

**Rough Layout**

Single-column GOV.UK-inspired page with a strong heading, short body copy, and one primary action. Keep it serious and civic, not social-media-like.

**Buttons/Actions**

- `View local priorities` links to `/issues`
- `Prototype sign in` links to `/sign-in`

**Mock-Only**

- no real location detection
- no real account state
- no real verification state

### `/issues` Local Priorities Board

**Purpose**

This is the core MVP screen. Residents view local issues, create a new issue, vote, comment, and see official outcomes.

**Main Sections**

- page heading and short local-area context
- lightweight expandable issue composer
- issue list in a single column
- issue cards with voting, status, comment count, and official outcome/reply areas

**Rough Layout**

Single-column issue feed. Each issue is a card with Reddit-style vertical voting on the left and issue content on the right. Cards should be easy to scan and should not feel like social posts.

The composer sits near the top of the board and expands inline. It should feel lightweight, not like a formal government form.

**Composer Fields**

- short title
- brief details

**Buttons/Actions**

- `Raise an issue` expands the composer
- `Post issue` submits mock-only issue data
- up arrow means `support`
- down arrow means `not a priority`
- `Comment` opens or focuses the comment UI
- `Mark Addressed` is visible only in mock official/admin states and requires an outcome note
- moderation actions such as hide/remove/organise require a reason

**Mock-Only**

- issue creation updates mock UI state only
- voting is mock-only
- comments are mock-only
- role-specific official/admin controls are mock-only
- moderation actions are mock-only
- no real persistence, authentication, verification, or backend calls

### `/sign-in` Prototype Sign-In / Role Switcher

**Purpose**

Let testers switch between prototype roles without implementing real authentication.

**Main Sections**

- short explanation that this is a prototype role switcher
- role choices
- current mock role/verification state
- link back to the issues board

**Rough Layout**

Simple single-column page with radio-style role choices or clear role buttons. It should be explicit that this is not production sign-in.

**Buttons/Actions**

- `Continue as resident`
- `Continue as official representative`
- `Continue as platform admin`
- `Back to local priorities`

**Mock-Only**

- no passwords
- no sessions
- no real identity checks
- no real local-area verification
- role changes affect prototype UI only

## Implementation Notes

- Build UI-first with typed mock data.
- Keep mock data separate from components.
- Keep product types explicit, including issue status, role, vote state, and verification state.
- Keep actions honest: mock actions should not imply production success.
- Do not add backend or database functionality until explicitly scoped.
- Keep the first implementation focused on `/`, `/issues`, and `/sign-in`.

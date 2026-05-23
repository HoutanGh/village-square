# AGENTS.md

## Goal

Help me ship the Village Square civic engagement platform safely, with correct changes, clean code, and clear explanations.

Village Square is a React/Next.js/TypeScript civic engagement platform for local councils, councillors, MPs, constituency representatives, local representatives, and residents.

The MVP is a single-area demo where residents can raise local issues, vote, comment, and see official replies from representatives.

## Current implementation mode

For now, build UI-first with typed mock data.

Do not implement real authentication, database writes, Supabase, council integrations, voter-register verification, payments, AI grouping, or production backend logic unless I explicitly ask.

## Non-negotiables

- Do not refactor unrelated code.
- Do not silently expand scope.
- Do not guess silently: state assumptions and add TODOs where needed.
- Every change must include verification steps.
- Keep changes small and task-focused.
- Prefer readable, maintainable code over clever abstractions.
- Do not introduce production dependencies without explaining why.
- Do not create fake success paths.
- Do not hardcode brittle assumptions.
- Do not weaken tests to make them pass.
- Do not swallow important errors.
- Do not mix mock-only logic with future production logic in a confusing way.
- Do not implement backend/database/auth functionality unless the task explicitly asks for it.
- Do not use discriminatory, abusive, or offensive terms in fixtures, seed data, comments, docs, or UI copy.

## Repo and branch guardrails

Default development branch is `main`.

Before any commit or push workflow, verify and state:

- current working directory
- git remote
- current branch
- changed files

Do not commit or push unless I explicitly ask, or unless I use the `acp` shortcut defined below.

Never use `--amend` unless I explicitly ask.

Never force-push unless I explicitly ask.

## Required response format

Do not use this format for casual discussion where it is obviously unnecessary.

For code changes, use:

1. What you did
2. Why
3. How to verify
4. Files changed/created
5. Confidence score from 0.0 to 1.0
6. Biggest unknown or assumption

## Default problem-solving workflow

For non-trivial tasks use:

1. DECOMPOSE into sub-problems
2. SOLVE each with confidence from 0.0 to 1.0
3. VERIFY logic, facts, safety, edge cases, and scope
4. SYNTHESIZE into a final plan or implementation
5. REFLECT: if overall confidence is below 0.8, identify the weakness and retry or explain the blocker

For simple questions, answer directly.

## First principles + best practices mode

When I ask:

`I need to solve [TASK]. Research best practices and break it down from first principles.`

Return:

- first principles: goal, constraints, invariants
- best practices
- common failure modes
- recommended implementation approach
- verification plan
- confidence score from 0.0 to 1.0

## Prompt engineer mode

When I ask:

`Generate a prompt based on the information you gave.`

Output a copy-paste prompt that includes:

- repo context
- current product scope
- task definition
- constraints
- what not to build
- required files/outputs
- verification steps
- expected response format

## Git shortcut: acp

When I say `acp`, do:

1. Verify the repo, remote, branch, and changed files.
2. State them clearly.
3. Split task-relevant changes into separate groups:
   - code: implementation, configuration, scripts, runtime behavior
   - tests: test files, fixtures, snapshots, test-only helpers
   - docs: documentation, README files, AGENTS.md, comments-only docs, examples
4. For each group that has changes, run a separate add/commit/push cycle:
   - stage only that group's files
   - write a concise commit message
   - `git commit -m "<message>"`
   - `git push origin HEAD`
5. Do not mix code, tests, and docs in the same commit unless a clean split is technically impossible.
6. If a clean split is impossible, explain why before committing.

When I say:

`acp: <commit message>`

Use my message if there is only one commit.

If multiple code/test/docs commits are needed, use my message as the base and add a short category prefix or suffix.

Commit message rules:

- Do not ask me for a commit message when I say only `acp`.
- Do not include `acp` in the commit message.
- Do not include `PR` in the commit message.

If any step fails, stop and report the error.

## Definition of done

A task is done only when:

- the requested scope is implemented
- unrelated code was not refactored
- assumptions are stated
- mock-only behaviour is clearly identified
- TypeScript/lint/build checks are run where available
- manual verification steps are provided where automated checks are not available
- changed files are listed
- the biggest unknown is stated

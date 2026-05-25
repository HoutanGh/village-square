const roles = [
  {
    name: "Resident",
    description: "View local priorities, raise issues, vote, and comment.",
  },
  {
    name: "Official representative",
    description:
      "Preview future official outcome controls without real permissions.",
  },
  {
    name: "Platform admin",
    description: "Preview future moderation controls without real enforcement.",
  },
];

export default function SignInPage() {
  return (
    <main className="page-shell">
      <section className="page-intro" aria-labelledby="sign-in-title">
        <span className="phase-tag">Prototype only</span>
        <h1 id="sign-in-title">Prototype sign in</h1>
        <p className="lead">
          This page will let testers switch between mock roles. It is not real
          authentication.
        </p>
      </section>

      <section className="content-section" aria-labelledby="roles-title">
        <h2 id="roles-title">Mock roles</h2>
        <div className="role-list">
          {roles.map((role) => (
            <div className="role-option" key={role.name}>
              <h3>{role.name}</h3>
              <p>{role.description}</p>
              <button
                className="button button--secondary"
                type="button"
                disabled
              >
                Continue as {role.name.toLowerCase()}
              </button>
            </div>
          ))}
        </div>
        <p className="form-note">
          Role switching is not wired yet. No passwords, sessions, or local-area
          verification are used in this prototype shell.
        </p>
      </section>
    </main>
  );
}

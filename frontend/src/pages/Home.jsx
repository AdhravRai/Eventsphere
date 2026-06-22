function Home() {
  return (
    <div style={{ padding: "20px" }}>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "50px",
        }}
      >
        <h2>EventSphere</h2>

        <div style={{ display: "flex", gap: "20px" }}>
        <a href="/">Home</a>
    <a href="/login">Login</a>
    <a href="/register">Register</a>
    </div>
      </nav>

      <section
        style={{
          textAlign: "center",
          marginBottom: "60px",
        }}
      >
        <h1 style={{ fontSize: "3rem" }}>
          Manage College Events Easily
        </h1>

        <p>
          One platform for students, organizers and admins.
        </p>

        <button>
          Get Started
        </button>
      </section>

      <section>
        <h2>Features</h2>

        <div
          style={{
            display: "flex",
            gap: "20px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h3>Create Events</h3>
            <p>Create and manage college events.</p>
          </div>

          <div>
            <h3>Register Events</h3>
            <p>Students can register easily.</p>
          </div>

          <div>
            <h3>Attendance</h3>
            <p>Track attendance digitally.</p>
          </div>

          <div>
            <h3>Certificates</h3>
            <p>Generate participation certificates.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
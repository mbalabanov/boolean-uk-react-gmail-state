import { useState } from "react";

import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  // Use initialEmails for state
  console.log(initialEmails);

  const [emailsState, setEmailsState] = useState(initialEmails);

  const toggleStar = (emailId) => {
    console.log("toggleStar");
    const updatedEmail = emailsState.map(function (emailInState) {
      if (emailInState.id === emailId) {
        return { ...emailInState, starred: !emailInState.starred };
      }
      return emailInState;
    });
    setEmailsState(updatedEmail);
  };

  const toggleRead = (emailId) => {
    console.log("toggleRead");
    const updatedEmail = emailsState.map(function (emailInState) {
      if (emailInState.id === emailId) {
        return { ...emailInState, read: !emailInState.read };
      }
      return emailInState;
    });
    setEmailsState(updatedEmail);
  };

  const hideRead = (clickedEmail) => console.log("hideRead");
  const menuItemSelection = (event) => console.log("menuItemSelection");

  return (
    <div className="app">
      <Header />
      <nav className="left-menu">
        <ul className="inbox-list">
          <li
            className="item active"
            onClick={() => {
              menuItemSelection();
            }}
          >
            <span className="label">Inbox</span>
            <span className="count">{emailsState.length}</span>
          </li>
          <li
            className="item"
            onClick={() => {
              menuItemSelection();
            }}
          >
            <span className="label">Starred</span>
            <span className="count">?</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={false}
              onChange={() => {
                hideRead();
              }}
            />
          </li>
        </ul>
      </nav>
      <main className="emails">
        {emailsState.map((thisEmail, index) => (
          <li className="email" key={index}>
            <div className="select">
              <input
                className="select-checkbox"
                type="checkbox"
                checked={thisEmail.read}
                onChange={() => {
                  toggleRead();
                }}
              />
            </div>
            <div className="star">
              <input
                className="star-checkbox"
                type="checkbox"
                checked={thisEmail.starred}
                onChange={() => {
                  toggleStar(thisEmail.id);
                }}
              />
            </div>
            <div className="sender">{thisEmail.sender}</div>
            <div className="title">{thisEmail.title}</div>
          </li>
        ))}
      </main>
    </div>
  );
}

export default App;

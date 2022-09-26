import { useState } from "react";

import Header from "./components/header";

import initialEmails from "./data/emails";

import "./styles/app.css";

function App() {
  // Use initialEmails for state

  const [emailsState, setEmailsState] = useState(initialEmails);
  const [tempState, setTempState] = useState(emailsState);
  const [showUnread, setShowUnread] = useState(false);

  const unreadEmails = emailsState.filter(function (email) {
    return email.read === false;
  });
  const [unreadEmailsState, setUnreadEmailsState] = useState(unreadEmails);

  const countStarred = () => {
    console.log("countStarred");
    let currentStarred = 0;
    emailsState.map((email) => {
      if (email.starred) {
        currentStarred++;
      }
    });
    return currentStarred;
  };

  const [starredState, setStarred] = useState(countStarred());

  const toggleStar = (emailId) => {
    console.log("toggleStar");
    const updatedStarredEmail = emailsState.map(function (emailInState) {
      if (emailInState.id === emailId) {
        return { ...emailInState, starred: !emailInState.starred };
      }
      return emailInState;
    });
    setStarred(countStarred());
    setEmailsState(updatedStarredEmail);
  };

  const toggleReadCheckmark = (emailId, emailReadStatus) => {
    console.log("toggleReadCheckmark");

    const updatedReadEmail = emailsState.map(function (emailInState) {
      if (emailInState.id === emailId) {
        return { ...emailInState, read: !emailReadStatus };
      }
      return emailInState;
    });

    setEmailsState(updatedReadEmail);

    const updatedUnreadEmails = emailsState.filter(function (email) {
      return email.read === false;
    });

    setUnreadEmailsState(updatedUnreadEmails);
  };

  const toggleUnreadEmails = () => {
    if (showUnread === false) {
      setTempState(emailsState);
      setEmailsState(unreadEmailsState);
    }
    if (showUnread === true) {
      setEmailsState(tempState);
    }
  };

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
            <span className="count">{unreadEmailsState.length}</span>
          </li>
          <li
            className="item"
            onClick={() => {
              menuItemSelection();
            }}
          >
            <span className="label">Starred</span>
            <span className="count">{starredState}</span>
          </li>

          <li className="item toggle">
            <label for="hide-read">Hide read</label>
            <input
              id="hide-read"
              type="checkbox"
              checked={showUnread}
              onChange={() => {
                setShowUnread(!showUnread);
                toggleUnreadEmails();
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
                  toggleReadCheckmark(thisEmail.id, thisEmail.read);
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

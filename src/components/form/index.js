import { useState } from "react";

import "./form.scss";

function Form({ updateRequestParams }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [isActive, setIsActive] = useState("GET");
  const [text, setText] = useState("");

  const apiURL = url;
  const apiMethod = method;

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      url: apiURL,
      method: apiMethod,
      text,
    };
    updateRequestParams(formData);
  };

  const handleMethod = (e, type) => {
    e.preventDefault();
    setMethod(type);
    setIsActive(type);
  };

  const buttons = ["GET", "POST", "PUT", "DELETE"];

  return (
    <>
      <form data-testid="test-form" onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input
            onChange={(e) => setUrl(e.target.value)}
            name="url"
            type="text"
            data-testid="test-input"
          />
          {method === "POST" || method === "PUT" ? (
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          ) : null}
          <button data-testid="test-button" type="submit">
            GO!
          </button>
        </label>
        <label className="methods">
          {buttons.map((button) => (
            <button
              className={isActive === button ? "active-button" : undefined}
              onClick={(e) => handleMethod(e, button)}
              key={button}
              id={button}
            >
              {button}
            </button>
          ))}
        </label>
      </form>
    </>
  );
}

export default Form;

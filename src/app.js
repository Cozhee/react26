import "./app.scss";
import { useState, useEffect } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import axios from "axios";

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState("");
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (requestParams) {
      callApi();
    }
  }, [requestParams]);

  const callApi = async () => {
    const apiUrl = requestParams.url;
    const response = await axios.get(apiUrl);
    const { data } = response;

    setData(data);
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  const updateRequestParams = (arg) => {
    setRequestParams(arg);
  };

  return (
    <>
      <Header />
      <div id="request-info">
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
        <div>Update text: {requestParams.text}</div>
      </div>
      <Form
        updateRequestParams={updateRequestParams}
        handleCount={handleCount}
      />
      <Results data={data} count={count} />
      <Footer />
    </>
  );
}

export default App;

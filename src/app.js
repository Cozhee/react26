import "./app.scss";
import { useState } from "react";
// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";

function App() {
  const [data, setData] = useState(null);
  const [requestParams, setRequestParams] = useState({});
  const [count, setCount] = useState(0);

  const callApi = (requestParams) => {
    // mock output
    const data = {
      count: 2,
      results: [
        { name: "fake thing 1", url: "http://fakethings.com/1" },
        { name: "fake thing 2", url: "http://fakethings.com/2" },
      ],
    };
    setData(data);
    setRequestParams(requestParams);
  };

  const handleCount = () => {
    setCount(count + 1);
  };

  return (
    <>
      <Header />
      <div id="request-info">
        <div>Request Method: {requestParams.method}</div>
        <div>URL: {requestParams.url}</div>
        <div>Update text: {requestParams.text}</div>
      </div>
      <Form handleApiCall={callApi} handleCount={handleCount} />
      <Results data={data} count={count} />
      <Footer />
    </>
  );
}

export default App;

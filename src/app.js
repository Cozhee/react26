import "./app.scss";
import { useEffect, useReducer } from "react";
import Header from "./components/header";
import Footer from "./components/footer";
import Form from "./components/form";
import Results from "./components/results";
import History from "./components/history";
import axios from "axios";

export const initialState = {
  data: null,
  requestParams: "",
  count: 0,
  searches: [],
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case "REQ PARAMS":
      return {
        ...state,
        searches: [...state.searches, action.payload.url],
        count: state.count + 1,
        requestParams: action.payload,
      };
    case "DATA":
      return { ...state, data: action.payload };
  }
};

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (state.requestParams) {
      callApi(state.requestParams.url);
    }
  }, [state.requestParams]);

  const callApi = async (url) => {
    const response = await axios.get(url);
    const { data } = response;
    dispatch({ type: "DATA", payload: data });
  };

  const updateRequestParams = (arg) => {
    dispatch({ type: "REQ PARAMS", payload: arg });
  };

  return (
    <>
      <Header />
      {state.searches.length > 0 && <h4>Recent Searches</h4>}
      {state.searches.length > 0 &&
        state.searches.map((url) => {
          return (
            <History url={url} updateRequestParams={updateRequestParams} />
          );
        })}
      {state.requestParams && (
        <div id="request-info">
          <div>Request Method: {state.requestParams.method}</div>
          <div>URL: {state.requestParams.url}</div>
          <div>Update text: {state.requestParams.text}</div>
        </div>
      )}
      <Form updateRequestParams={updateRequestParams} />
      <Results data={state.data} count={state.count} />
      <Footer />
    </>
  );
}

export default App;

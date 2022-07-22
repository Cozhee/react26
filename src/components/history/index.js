function History({ url, updateRequestParams }) {
  const previousSearch = {
    url: url,
    method: "GET",
    text: "",
  };

  return (
    <>
      <button onClick={() => updateRequestParams(previousSearch)}>
        <a>{url}</a>
      </button>
    </>
  );
}

export default History;

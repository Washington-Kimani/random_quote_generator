import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import axios from "axios";

function App() {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);

  const getQuote = async () => {
    setLoading(true); // Set loading to true before making the request
    try {
      const response = await axios.get(
        `https://node-quotes-api.onrender.com/api/quote`
      );
      setAuthor(response.data.author);
      setQuote(response.data.text);
      setCopied(false);
    } catch (error) {
      console.error(error.message);
    } finally {
      setLoading(false); // Set loading to false regardless of success or failure
    }
  };

  return (
    <>
      <h1 className="text-center text-lg font-bold">Random Quotes Generator</h1>
      <div className="card">
        {loading ? (
          <span class="loading loading-spinner text-secondary">Loading....</span>
        ) : (
          <>
            <div className="quotes">
              <p>
                <small>Quote:</small>
                <br /> {quote}
              </p>
              <p>
                <small>Author:</small>
                <br /> {author}
              </p>
            </div>
            <div className="buttons">
              <button className="glowing-btn" onClick={getQuote}>
                <span className="glowing-txt">GET QUOTE</span>
              </button>
              <CopyToClipboard
                text={`${quote} \nby: ${author}`}
                onCopy={() => setCopied(true)}
              >
                <button className="glowing-btn">
                  <span className="glowing-txt">COPY QUOTE</span>
                </button>
              </CopyToClipboard>
            </div>
            {copied ? <span className="copied">Copied!</span> : null}
          </>
        )}
      </div>
    </>
  );
}

export default App;

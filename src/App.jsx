import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import axios from 'axios';
import './App.css';

function App() {
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');
  const [copied, setCopied] = useState(false);

  const getQuote = async () =>{
    await axios
      .get(`https://node-quotes-api.onrender.com/api/quote`)
      .then((res) => {
        setAuthor(res.data.author);
        setQuote(res.data.text);
        setCopied(false);
      })
      .catch((err) => {
        console.error(err.message);
      });
  }


  return (
    <>
    <h1>Random  Quotes Generator</h1>
      <div class="card">
        <div className="quotes">
          <p><small>Quote:</small><br /> {quote}</p>
          <p><small>Author:</small><br /> {author}</p>
        </div>
        <div className="buttons">
          <button class="glowing-btn" onClick={getQuote }><span class="glowing-txt">GET Q<span class="faulty-letter">U</span>OTE</span></button>
          <CopyToClipboard text={`${quote} \nby: ${author}`} onCopy={()=>setCopied(true)}>
            <button class="glowing-btn" ><span class="glowing-txt">C<span class="faulty-letter">O</span>PY QUOTE</span></button>
          </CopyToClipboard>
        </div>
        { copied? <span className="copied">Copied!</span>: null}
      </div>
    </>
  );
}

export default App;

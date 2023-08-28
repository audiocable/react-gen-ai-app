import React from 'react';
import {useState, useEffect} from 'react';
import askAttLogo from './askatt.png';

const App = () => {

  const [ value, setValue ] = useState(null)
  const [ message, setMessage ] = useState(null)

  const getMessages = async () => {
    const options = {
      method: "POST",
      body: JSON.stringify({
        message: value
      }),
      headers: {
        "Content-Type": "application/json"
      }
    }
    try {
      const response = await fetch('http://localhost:8001/completions', options)
      const data = await response.json()
      setMessage(data.choices[0].message)
    } catch(error) {
      console.error(error)
    }
  }

  console.log(value)

  return (
    <div className="app">
      <section className="side-bar">
        <button>+ New Chat</button>
        <ul className="history">
          <li>Conversation 1</li>
          <li>Conversation 2</li>
          <li>Conversation 3</li>
        </ul>
        <nav>
          <p>Created by Sid</p>
        </nav>
      </section>
      <section className="main">
        <h1><img src={askAttLogo} alt="Ask AT&T" style={{ width: '384px', height: '158px' }}/></h1>
        <ul className="feed">

        </ul>
        <div className="bottom-section">
          <div className="input-container">
            <input value={value} onChange={(e) => setValue(e.target.value)}/>
            <div id="submit" onClick={getMessages}>➤</div>
          </div>
          <p className="info">Beta 2023. Your feedback will help us improve.</p>
        </div>
      </section>
    </div>
  );
}

export default App;
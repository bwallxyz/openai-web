import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {

async function handleSubmit(e){
  e.preventDefault();
  let chatLogNew = [...chatLog, { user : "me", message: `${input}`}]
  setChatLog([...chatLog, { user: "me", message: `${input}`}])
  setInput("")

 // const messages = chatLogNew.map((message) => message.message).join("\n")

  const response = await fetch('http://localhost:3001/', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      message: input
    })
  })

  const data = await response.json()
  setChatLog([...chatLogNew, { user: "gpt", message: `${data.message}`}])
  console.log(data)

}

  const [input, setInput] = useState('')
  const [chatLog, setChatLog] = useState([])

  return (
    <div className="App">
     {/* <aside className="sidemenu">
          <div className='side-menu-button'>
            <span>+</span>
            New Chat
          </div>
  </aside>*/}
        <section className="chatbox">
          <h1>OpenAI API</h1>
          <div className='chat-log'>

            {chatLog.map((message, index) => (
              <ChatMessage index={index} message={message} />
              
            ))}
     
        
          </div>
          <div className='chat-input-holder'>
            <form onSubmit={handleSubmit}>
              <input 
                rows="1"
                value={input}
                onChange={(e)=> setInput(e.target.value)} 
                className='chat-input-textarea' 
                placeholder='Type your message here'>
              </input>
            </form>
          </div>
        </section>
        
    </div>
  );
}

const ChatMessage = ({ message }) => {
  return (
      <div className={`chat-message ${message.user == "gpt" && "chatgpt"}`}>
          <div className='chat-message-center'>
            <div className={`avatar ${message.user == "gpt" && "chatgpt"}`}></div>
            <div className='message'>{message.message}</div>
         </div>  
      </div>
  )
}

export default App;

import { useState, useEffect } from 'react';
import './App.css';
import { db } from './firebase';
import { 
  collection, 
  addDoc, 
  onSnapshot, 
  orderBy, 
  query, 
  doc, 
  setDoc, 
  getDoc 
} from 'firebase/firestore';

function App() {
  // State management
  const [user] = useState(() => Math.floor(Math.random() * 10000));
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [question, setQuestion] = useState('');
  const [relationship, setRelationship] = useState(
    localStorage.getItem('relationship') || ''
  );
  const [isRelationshipHovered, setIsRelationshipHovered] = useState(false);
  const [isRelationshipEditMode, setIsRelationshipEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Subscribe to messages
  useEffect(() => {
    if (!db) {
      console.warn('Firebase not initialized. Running in offline mode.');
      return;
    }
    
    const q = query(collection(db, 'messages'), orderBy('timestamp'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newMessages = snapshot.docs.map(doc => ({ 
        ...doc.data(), 
        id: doc.id 
      }));
      setMessages(newMessages);
    });

    return () => unsubscribe();
  }, []);

  // Fetch daily question
  useEffect(() => {
    const fetchDailyQuestion = async () => {
      try {
        if (!db) {
          setQuestion('What&apos;s something new you learned today?');
          return;
        }
        
        const docRef = doc(db, 'dailyQuestion', 'current');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const today = new Date().getDate();

          if (data.date === today) {
            setQuestion(data.question);
          } else {
            await generateQuestion(messages);
          }
        } else {
          await generateQuestion(messages);
        }
      } catch (error) {
        console.error('Error fetching daily question:', error);
        setQuestion('What&apos;s something new you learned today?');
      }
    };

    fetchDailyQuestion();
  }, [messages]);

  const generateQuestion = async (currentMessages) => {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      setQuestion('What\'s one thing you\'re grateful for today?');
      return;
    }

    const apiURL = 'https://api.openai.com/v1/chat/completions';

    try {
      const otherUser = currentMessages.length > 0 
        ? currentMessages[0].sender === user ? 2 : 1 
        : null;
      
      const currentUserRelationship = relationship;
      const otherUserRelationship = currentMessages
        .find(msg => msg.sender === otherUser)?.relationship;

      const prompt = `Given the following chat history between family members who are '${currentUserRelationship}' and '${otherUserRelationship || 'unknown'}', create a thoughtful question that will help them connect on a deeper level. Keep it simple and engaging. Chat history: ${JSON.stringify(currentMessages.slice(-5))}`;

      const response = await fetch(apiURL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4',
          messages: [{ role: 'user', content: prompt }],
          max_tokens: 150,
        }),
      });

      if (!response.ok) {
        throw new Error(`OpenAI API request failed with status ${response.status}`);
      }

      const data = await response.json();
      if (data.choices && data.choices.length > 0) {
        const generatedQuestion = data.choices[0].message.content.trim();
        setQuestion(generatedQuestion);
        
        await setDoc(doc(db, 'dailyQuestion', 'current'), {
          question: generatedQuestion,
          date: new Date().getDate()
        });
      }
    } catch (error) {
      console.error('Error generating question:', error);
      setQuestion('What\'s something that made you smile today?');
    }
  };

  const handleRelationshipChange = (event) => {
    const newRelationship = event.target.value;
    setRelationship(newRelationship);
    localStorage.setItem('relationship', newRelationship);
  };

  const sendMessage = async () => {
    if (message.trim() === '' || isLoading) return;

    if (!db) {
      alert('Database not connected. Please check your configuration.');
      return;
    }

    setIsLoading(true);
    try {
      await addDoc(collection(db, 'messages'), {
        text: message.trim(),
        sender: user,
        timestamp: new Date(),
        relationship: relationship
      });
      setMessage('');
    } catch (error) {
      console.error('Error adding message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="app">
      <div className="left-panel">
        <img src="tree-placeholder.png" alt="Tree Illustration" />
        <div className="name">
          familink.ai 
          <div className="subtitle">uofthacks 12.</div>
        </div>
      </div>

      <div className="right-panel">
        <div className="question-box-container">
          <div className="question-box">
            <div className="question-title">today&apos;s question:</div>
            <div className="question-text">{question}</div>
          </div>
          
          <div
            className="relationship-input"
            onMouseEnter={() => setIsRelationshipHovered(true)}
            onMouseLeave={() => setIsRelationshipHovered(false)}
          >
            {!isRelationshipEditMode ? (
              <div onClick={() => setIsRelationshipEditMode(true)}>
                {isRelationshipHovered ? 'Change?' : relationship || 'Set relationship'}
              </div>
            ) : (
              <input
                type="text"
                placeholder="e.g., daughter, son, parent..."
                value={relationship}
                onChange={handleRelationshipChange}
                onBlur={() => setIsRelationshipEditMode(false)}
                onKeyPress={(e) => e.key === 'Enter' && setIsRelationshipEditMode(false)}
                autoFocus
              />
            )}
          </div>
        </div>

        <div className="chat">
          {messages.map(msg => (
            <div key={msg.id} className={`message ${msg.sender === user ? 'own' : 'other'}`}>
              {msg.text}
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Type your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isLoading}
          />
          <button 
            onClick={sendMessage} 
            disabled={isLoading || message.trim() === ''}
          >
            {isLoading ? '...' : '↑'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

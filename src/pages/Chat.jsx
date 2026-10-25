import { useState } from "react";
import "./Chat.css";

function Chat() {
  // Store chat messages
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: "assistant",
      text: "Hello! 👋 Welcome to MyPatientHUB. I'm your AI Health Assistant. I can help you navigate our healthcare services and answer general questions. How can I help you today?",
    },
  ]);

  // Store input text and typing status
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // Generate a response based on the user's question
  function getResponse(question) {
    const text = question.toLowerCase();

    // Answer appointment-related questions
    if (
      text.includes("appointment") ||
      text.includes("book") ||
      text.includes("schedule")
    ) {
      return "You can manage your appointments through the Appointments section of MyPatientHUB. There, you can check your appointment information and follow the available booking options.";
    }

    // Answer doctor-related questions
    if (text.includes("doctor")) {
      return "You can visit the Find Doctor page to explore doctor information and search for a healthcare professional who meets your needs.";
    }

    // Answer clinic-related questions
    if (text.includes("clinic")) {
      return "Visit the Find Clinic page to explore clinic information and search by city, location, or available services.";
    }

    // Answer pharmacy and medicine questions
    if (text.includes("pharmacy") || text.includes("medicine")) {
      return "You can visit the Find Pharmacy page to explore pharmacy information and available medicine listings. Always ask a qualified pharmacist or doctor about which medicine is appropriate for you.";
    }

    // Provide general health guidance
    if (
      text.includes("health") ||
      text.includes("symptom") ||
      text.includes("pain") ||
      text.includes("sick") ||
      text.includes("medicine")
    ) {
      return "I can share general health information, but I cannot diagnose conditions or recommend a personal treatment. For symptoms or medical concerns, please contact a qualified healthcare professional. If you have severe or life-threatening symptoms, seek emergency medical care.";
    }

    // Respond to greetings
    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("salam")
    ) {
      return "Hello! 😊 How can I help you with MyPatientHUB today? You can ask about appointments, doctors, clinics, or pharmacies.";
    }

    // Respond to thank-you messages
    if (text.includes("thank")) {
      return "You're welcome! 😊 I'm happy to help. Feel free to ask another question.";
    }

    // Provide a default response
    return "Thanks for your question! I can help you navigate MyPatientHUB and provide basic information about appointments, doctors, clinics, and pharmacies. For personal medical advice, please speak with a qualified healthcare professional.";
  }

  // Send a message and receive a response
  function sendMessage(messageText = input) {
    const text = messageText.trim();

    // Ignore empty messages or messages sent while typing
    if (text === "" || isTyping) {
      return;
    }

    // Create the user's message
    const userMessage = {
      id: crypto.randomUUID(),
      sender: "user",
      text: text,
    };

    // Add the user's message to the chat
    setMessages((previousMessages) => [...previousMessages, userMessage]);

    setInput("");
    setIsTyping(true);

    // Simulate the assistant's typing delay
    setTimeout(() => {
      const assistantMessage = {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: getResponse(text),
      };

      // Add the assistant's response
      setMessages((previousMessages) => [
        ...previousMessages,
        assistantMessage,
      ]);

      setIsTyping(false);
    }, 1000);
  }

  // Handle message form submission
  function handleSubmit(event) {
    event.preventDefault();
    sendMessage();
  }

  // Clear the chat and show the welcome message
  function clearChat() {
    setMessages([
      {
        id: crypto.randomUUID(),
        sender: "assistant",
        text: "Hello again! 👋 How can I help you with MyPatientHUB today?",
      },
    ]);

    setInput("");
    setIsTyping(false);
  }

  // Store suggested questions
  const quickQuestions = [
    "How can I book an appointment?",
    "Help me find a doctor",
    "Find a clinic",
    "Find a pharmacy",
  ];

  // Display the chat page
  return (
    <div className="chat-page">
      {/* Page heading and new chat button */}
      <div className="chat-page-header">
        <div>
          <h1>Chat Assistant</h1>
          <p>Get help navigating MyPatientHUB and our healthcare services.</p>
        </div>

        <button className="new-chat-button" type="button" onClick={clearChat}>
          <span>＋</span> New Chat
        </button>
      </div>

      {/* Main chat area and sidebar */}
      <div className="chat-layout">
        <div className="chat-main">
          {/* Assistant name and chat controls */}
          <div className="chat-assistant-header">
            <div className="assistant-avatar">
              <span>✚</span>
            </div>

            <div className="assistant-info">
              <h2>AI Health Assistant</h2>
              <p>
                <span className="online-dot"></span>
                Available to help
              </p>
            </div>

            <button
              className="clear-chat-button"
              type="button"
              onClick={clearChat}
            >
              Clear Chat
            </button>
          </div>

          {/* Display all chat messages */}
          <div className="chat-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`chat-message ${message.sender}`}
              >
                {/* Show an avatar for assistant messages */}
                {message.sender === "assistant" && (
                  <div className="message-avatar">✚</div>
                )}

                <div className="message-content">
                  {/* Display the sender's name */}
                  <span className="message-sender">
                    {message.sender === "assistant"
                      ? "Health Assistant"
                      : "You"}
                  </span>

                  {/* Display the message text */}
                  <div className="message-bubble">{message.text}</div>
                </div>
              </div>
            ))}

            {/* Show typing animation while waiting */}
            {isTyping && (
              <div className="chat-message assistant">
                <div className="message-avatar">✚</div>

                <div className="message-content">
                  <span className="message-sender">Health Assistant</span>

                  <div className="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Display suggested questions */}
          <div className="quick-questions">
            <p>Quick questions</p>

            <div className="quick-question-list">
              {quickQuestions.map((question) => (
                <button
                  key={question}
                  type="button"
                  disabled={isTyping}
                  onClick={() => sendMessage(question)}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {/* Form for sending messages */}
          <form className="chat-input-area" onSubmit={handleSubmit}>
            <input
              type="text"
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question here..."
              aria-label="Type your message"
              disabled={isTyping}
            />

            <button type="submit" disabled={!input.trim() || isTyping}>
              Send <span>➤</span>
            </button>
          </form>

          {/* Display input instructions */}
          <p className="chat-input-hint">
            Press Enter or click Send to message the assistant.
          </p>
        </div>

        {/* Sidebar with help topics and safety notice */}
        <aside className="chat-sidebar">
          {/* Display available help topics */}
          <div className="chat-sidebar-card">
            <div className="sidebar-card-icon">✦</div>
            <h3>How can I help?</h3>
            <p>
              Ask questions about the healthcare services available on
              MyPatientHUB.
            </p>

            <div className="help-topic">
              <span>01</span>
              <div>
                <strong>Appointments</strong>
                <p>Appointment information</p>
              </div>
            </div>

            <div className="help-topic">
              <span>02</span>
              <div>
                <strong>Find a Doctor</strong>
                <p>Explore doctor information</p>
              </div>
            </div>

            <div className="help-topic">
              <span>03</span>
              <div>
                <strong>Find a Clinic</strong>
                <p>Explore clinic locations</p>
              </div>
            </div>

            <div className="help-topic">
              <span>04</span>
              <div>
                <strong>Find a Pharmacy</strong>
                <p>Explore pharmacy listings</p>
              </div>
            </div>
          </div>

          {/* Display the medical safety notice */}
          <div className="medical-safety-card">
            <div className="safety-title">
              <span>ⓘ</span>
              <h3>Medical Safety Notice</h3>
            </div>

            <p>
              This assistant provides general information about MyPatientHUB and
              is not a substitute for professional medical advice, diagnosis, or
              treatment.
            </p>

            <p>
              Do not rely on this chat for emergencies. Seek emergency medical
              care if you experience severe or life-threatening symptoms.
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Chat;

import { useState } from "react";
import bot from "../../assets/bot.webp";
function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  // Function to handle sending a message
  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, from: "user" }]);
      setInput("");
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "Hello, how can I assist you?", from: "bot" },
        ]);
      }, 1000); // Simulating bot reply after 1 second
    }
  };

  // Function to toggle chat window visibility
  const toggleChat = () => {
    setIsChatOpen((prevState) => !prevState); // Toggle the chat window
  };

  return (
    <div className="relative min-h-screen bg-gray-100 flex items-center justify-center p-4">
      {/* Floating Chatbot Icon with Bot Image */}
      <button
        onClick={toggleChat} // Use the toggle function to open/close chat
        className="fixed bottom-6 right-6 p-4 rounded-full shadow-lg hover:opacity-80 transition"
      >
        <img
          src={bot} // Replace with the correct path to your bot image
          alt="Bot"
          className="h-12 w-12"
        />
      </button>

      {/* Chatbot Window */}
      {isChatOpen && (
        <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6 fixed bottom-20 right-6 z-10">
          <div className="h-96 overflow-y-auto space-y-4 mb-4 px-4">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-lg max-w-xs shadow-md ${
                    msg.from === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Typing Indicator (Optional for bot response) */}
          <div className="flex items-center space-x-2 text-gray-600 text-xs">
            {messages.length &&
              messages[messages.length - 1].from === "bot" && (
                <div className="animate-pulse">
                  <span>Typing...</span>
                </div>
              )}
          </div>

          {/* Input Section */}
          <div className="flex items-center mt-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 p-3 border rounded-lg border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
              placeholder="Type your message..."
            />
            <button
              onClick={handleSendMessage}
              className="ml-2 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition transform hover:scale-105 focus:outline-none"
            >send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;

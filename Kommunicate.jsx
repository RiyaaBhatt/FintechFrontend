import React, { useEffect } from "react";

const KommunicateWidget = () => {
  useEffect(() => {
    // Ensure Kommunicate script has been loaded
    if (window.m) {
      window.m.init({
        appId: "3c1228fbaa15710a5423f35a7abb86b15", // Replace with your Kommunicate App ID
        popupWidget: true, // Optional: Popup widget will appear
        automaticChatOpenOnNavigation: true, // Optional: Automatically open the chat
      });

      // Optionally, you can open the chat programmatically
      window.m.chat.open();
    }

    // If the script is not loaded yet, wait until it is available
    else {
      const interval = setInterval(() => {
        if (window.m) {
          clearInterval(interval);
          window.m.init({
            appId: "3c1228fbaa15710a5423f35a7abb86b15", // Replace with your Kommunicate App ID
            popupWidget: true, // Optional: Popup widget will appear
            automaticChatOpenOnNavigation: true, // Optional: Automatically open the chat
          });
        }
      }, 100); // Checks every 100ms for window.m
    }
  }, []); // The effect runs once on component mount

  return null; // No UI to render for this component
};

export default KommunicateWidget;

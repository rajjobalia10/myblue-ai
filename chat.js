// chat.js - Claude-inspired chat functionality for BlueOcean AI

// Global state for chat messages
let messages = [];
let isSendingMessage = false;

// DOM references
const chatWindow = document.getElementById('chatWindow');
const messagesContainer = document.getElementById('messagesContainer');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');
const welcomeMessage = document.getElementById('welcomeMessage');

// Initialize chat when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeChat();
});

function initializeChat() {
    // Load existing messages from localStorage
    loadMessages();
    
    // Set up event listeners
    setupChatEventListeners();
    
    // Focus on input
    chatInput.focus();
}

function setupChatEventListeners() {
    // Send button click
    sendButton.addEventListener('click', sendMessage);
    
    // Enter key to send (Shift+Enter for new line)
    chatInput.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            sendMessage();
        }
    });
    
    // Auto-resize textarea
    chatInput.addEventListener('input', function() {
        autoResizeTextarea(this);
        handleInputChange(event);
    });
}

// Auto-resize textarea based on content
function autoResizeTextarea(textarea) {
    textarea.style.height = 'auto';
    textarea.style.height = Math.min(textarea.scrollHeight, 120) + 'px';
}

// Handle input changes
function handleInputChange(event) {
    const message = event.target.value.trim();
    sendButton.disabled = !message || isSendingMessage;
}

// Send message function
async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (!message || isSendingMessage) {
        return;
    }
    
    // Start sending process
    isSendingMessage = true;
    sendButton.disabled = true;
    
    // Hide welcome message
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }
    
    // Add user message to chat
    addMessage(message, 'user');
    
    // Clear input
    chatInput.value = '';
    chatInput.style.height = 'auto';
    
    // Add typing indicator
    const typingId = addTypingIndicator();
    
    try {
        // Call API
        const response = await callChatAPI(message);
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Add AI response
        addMessage(response, 'ai');
        
        // Show success feedback
        showNotification('Message sent successfully!', 'success');
        
    } catch (error) {
        console.error('Error sending message:', error);
        
        // Remove typing indicator
        removeTypingIndicator(typingId);
        
        // Show error message
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
        showNotification('Failed to send message. Please try again.', 'error');
    } finally {
        isSendingMessage = false;
        sendButton.disabled = false;
        chatInput.focus();
    }
}

// Add message to chat window (Claude-inspired design)
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    // Create avatar
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.textContent = sender === 'user' ? 'U' : 'AI';
    
    // Create content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    contentDiv.textContent = text;
    
    // Assemble message
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    // Add to container
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    // Add to messages array
    messages.push({
        id: Date.now().toString(),
        text: text,
        sender: sender,
        timestamp: new Date()
    });
    
    // Save to localStorage
    saveMessages();
}

// Add typing indicator (Claude-inspired)
function addTypingIndicator() {
    const typingId = 'typing-' + Date.now();
    const messageDiv = document.createElement('div');
    messageDiv.id = typingId;
    messageDiv.className = 'message ai';
    
    // Create avatar
    const avatarDiv = document.createElement('div');
    avatarDiv.className = 'message-avatar';
    avatarDiv.textContent = 'AI';
    
    // Create typing content
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    const typingDiv = document.createElement('div');
    typingDiv.className = 'typing-indicator';
    typingDiv.innerHTML = `
        <span>AI is typing</span>
        <div class="typing-dots">
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        </div>
    `;
    
    contentDiv.appendChild(typingDiv);
    messageDiv.appendChild(avatarDiv);
    messageDiv.appendChild(contentDiv);
    
    messagesContainer.appendChild(messageDiv);
    scrollToBottom();
    
    return typingId;
}

// Remove typing indicator
function removeTypingIndicator(typingId) {
    const typingElement = document.getElementById(typingId);
    if (typingElement) {
        typingElement.remove();
    }
}

// Scroll to bottom of chat
function scrollToBottom() {
    chatWindow.scrollTop = chatWindow.scrollHeight;
}

// Call chat API (placeholder implementation)
async function callChatAPI(message) {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // For now, return a mock response
    // In production, replace this with actual API call
    const mockResponses = [
        "That's an interesting question! Let me help you with that.",
        "I understand what you're looking for. Here's what I think...",
        "Great question! Based on my knowledge, I can suggest...",
        "I'd be happy to help you with that. Let me break it down...",
        "That's a complex topic. Let me provide some insights...",
        "I can definitely assist you with that. Here's my perspective...",
        "Interesting point! Let me share some thoughts on this...",
        "I'm here to help! Let me provide some guidance on that...",
        "That's a great question to explore. Here's what I know...",
        "I can help you work through this. Let me offer some suggestions..."
    ];
    
    // Simulate different response lengths
    const responseLength = Math.random() > 0.5 ? 'short' : 'long';
    
    if (responseLength === 'short') {
        return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    } else {
        const baseResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];
        const additionalInfo = " This is additional information that would typically come from a real AI API. The response would be more detailed and specific to your actual question, providing comprehensive insights and actionable advice.";
        return baseResponse + additionalInfo;
    }
    
    // Uncomment below for actual API integration:
    /*
    const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            messages: messages,
            chatId: currentChatId
        })
    });
    
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.reply;
    */
}

// Load messages from localStorage
function loadMessages() {
    const savedMessages = localStorage.getItem('blueocean-chat-messages');
    if (savedMessages) {
        try {
            messages = JSON.parse(savedMessages);
            renderMessages();
        } catch (error) {
            console.error('Error loading messages:', error);
            messages = [];
        }
    }
}

// Save messages to localStorage
function saveMessages() {
    try {
        localStorage.setItem('blueocean-chat-messages', JSON.stringify(messages));
    } catch (error) {
        console.error('Error saving messages:', error);
    }
}

// Render all messages
function renderMessages() {
    if (messages.length === 0) {
        // Show welcome message if no messages
        if (welcomeMessage) {
            welcomeMessage.style.display = 'block';
        }
        return;
    }
    
    // Hide welcome message
    if (welcomeMessage) {
        welcomeMessage.style.display = 'none';
    }
    
    // Clear container
    messagesContainer.innerHTML = '';
    
    // Render all messages
    messages.forEach(message => {
        addMessage(message.text, message.sender);
    });
    
    scrollToBottom();
}

// Clear chat history
function clearChat() {
    messages = [];
    messagesContainer.innerHTML = '';
    localStorage.removeItem('blueocean-chat-messages');
    
    // Show welcome message
    if (welcomeMessage) {
        welcomeMessage.style.display = 'block';
    }
    
    showNotification('Chat cleared', 'success');
}

// Send AI response (for initial message from landing page)
async function sendAIResponse(initialMessage) {
    const typingId = addTypingIndicator();
    
    try {
        const response = await callChatAPI(initialMessage);
        removeTypingIndicator(typingId);
        addMessage(response, 'ai');
    } catch (error) {
        console.error('Error sending AI response:', error);
        removeTypingIndicator(typingId);
        addMessage('Sorry, I encountered an error. Please try again.', 'ai');
    }
}

// Export functions for use in HTML
window.sendMessage = sendMessage;
window.clearChat = clearChat;
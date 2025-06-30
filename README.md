# 🚀 Slack Messenger App

This project is a Node.js-based web app that integrates with the Slack API to perform various messaging operations inside a Developer Sandbox environment.

---

## 🌟 Features

| Feature           | Description                                                                 |
|-------------------|-----------------------------------------------------------------------------|
| ✅ Send Message    | Post messages to a specific Slack channel                                  |
| ⏰ Schedule Message| Schedule messages to be sent at a future time                              |
| 📥 Retrieve Message| Fetch previously sent messages from the channel                           |
| ✏️ Edit Message     | Modify a previously sent message                                           |
| 🗑️ Delete Message   | Remove a message from the channel                                          |
| 🔐 Auth via Token   | Secure communication using Slack Bot Token (stored in `.env`)             |
| 🧪 Sandbox Safe     | Tested inside Slack Developer Sandbox to avoid impacting real users       |

---

## 🛠 Tech Stack

- Node.js
- Express.js
- EJS Templates
- Tailwind CSS (Dark Theme)
- Axios (for Slack API requests)
- dotenv (to secure tokens)

---

## 📦 Installation

```bash
git clone https://github.com/yourusername/slack-messenger-app.git
cd slack-messenger-app
npm install

Create a .env file:
env
Copy code
SLACK_BOT_TOKEN=your-slack-bot-token-here
SLACK_CHANNEL_ID=your-channel-id

▶️ Run the App
bash
Copy code
node app.js

💻 UI Routes
Route	Description
/	Home page to send message
/schedule page to send scheduled message
/messages	View, edit, and delete messages


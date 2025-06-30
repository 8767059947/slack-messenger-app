require('dotenv').config();
const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.render('index');
});

app.get("/schedule", (req,res) => {
    res.render("schedule");
})

app.post('/send', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      'https://slack.com/api/chat.postMessage',
      {
        channel: process.env.SLACK_CHANNEL_ID,
        text: message,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ok) {
      res.send('✅ Message sent successfully!');
    } else {
      res.send('❌ Error: ' + response.data.error);
    }
  } catch (error) {
    res.send('❌ Failed to send message.');
  }
});

app.post('/schedulemsg', async (req, res) => {
  const { message, scheduleTime } = req.body;

  // Convert datetime-local input to UNIX timestamp (in seconds)
  const postAt = Math.floor(new Date(scheduleTime).getTime() / 1000);

  try {
    const response = await axios.post(
      'https://slack.com/api/chat.scheduleMessage',
      {
        channel: process.env.SLACK_CHANNEL_ID,
        text: message,
        post_at: postAt,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ok) {
      res.send(`✅ Message scheduled successfully for ${scheduleTime}!`);
    } else {
      res.send('❌ Error: ' + response.data.error);
    }
  } catch (error) {
    res.send('❌ Failed to schedule message.');
  }
});

//Read message API Call
app.get('/messages', async (req, res) => {
  try {
    const response = await axios.get('https://slack.com/api/conversations.history', {
      params: {
        channel: process.env.SLACK_CHANNEL_ID,
        limit: 10, // jitne latest messages chahiye
      },
      headers: {
        Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      },
    });

    if (response.data.ok) {
      const messages = response.data.messages;
      res.render('messages', { messages });
    } else {
      res.send('❌ Error: ' + response.data.error);
    }
  } catch (error) {
    res.send('❌ Failed to fetch messages.');
  }
});

// Edit API
app.post('/edit', async (req, res) => {
  const { ts, newMessage } = req.body;

  try {
    const response = await axios.post(
      'https://slack.com/api/chat.update',
      {
        channel: process.env.SLACK_CHANNEL_ID,
        ts: ts,
        text: newMessage,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ok) {
      res.redirect('/messages');
    } else {
      res.send('❌ Edit Error: ' + response.data.error);
    }
  } catch (error) {
    res.send('❌ Failed to edit message.');
  }
});


// Delete API
app.post('/delete', async (req, res) => {
  const { ts } = req.body;

  try {
    const response = await axios.post(
      'https://slack.com/api/chat.delete',
      {
        channel: process.env.SLACK_CHANNEL_ID,
        ts: ts,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data.ok) {
      res.redirect('/messages');
    } else {
      res.send('❌ Delete Error: ' + response.data.error);
    }
  } catch (error) {
    res.send('❌ Failed to delete message.');
  }
});




app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

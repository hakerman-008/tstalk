const express = require('express');
const axios = require('axios');

const app = express();

app.get('/kshitiz', async (req, res) => {
  try {
    const username = req.query.username;
    if (!username) {
      return res.status(400).json({ error: 'Username parameter is required' });
    }

    const options = {
      method: 'POST',
      url: 'https://tiktok-unauthorized-api-scraper-no-watermark-analytics-feed.p.rapidapi.com/api/search_full',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'b38444b5b7mshc6ce6bcd5c9e446p154fa1jsn7bbcfb025b3b',
        'X-RapidAPI-Host': 'tiktok-unauthorized-api-scraper-no-watermark-analytics-feed.p.rapidapi.com'
      },
      data: {
        username: `@${username}`,
        amount_of_posts: 500
      }
    };

    const response = await axios.request(options);
    const userData = response.data.user;
    const posts = response.data.posts.map(post => {
      if (post && post.play_links && post.play_links.length > 0) {
        return post.play_links[0];
      } else {
        return null;
      }
    });

    const responseData = {
      user: userData,
      posts: posts
    };

    res.json(responseData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

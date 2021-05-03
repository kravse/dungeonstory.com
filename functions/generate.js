const axios = require('axios');
const key = process.env.VUE_APP_KEY || process.env.COHERE_API_KEY

const handler = async (event) => {
  const response = await axios({
    method: 'post',
    url: 'https://api.cohere.ai/baseline-shark/generate',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${key}`
    },
    data: event.body
  })
  try {
    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    return { statusCode: response.status || 500, body: error.toString() }
  }
}

module.exports = { handler }

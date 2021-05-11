const axios = require('axios');
const key = process.env.VUE_APP_KEY || process.env.COHERE_API_KEY

const handler = async (event) => {
  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.cohere.ai/baseline-shark/choose-best',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${key}`
      },
      data: event.body
    })

    return {
      statusCode: response.status,
      body: JSON.stringify(response.data),
    }
  } catch (error) {
    let status = error && error.response ? error.response.status : 500
    return {statusCode: status, body: error.message}
  }
}

module.exports = { handler }

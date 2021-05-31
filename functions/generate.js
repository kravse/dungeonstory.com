const key = process.env.VUE_APP_KEY || process.env.COHERE_API_KEY
const cohere = require('cohere-ai')
const handler = async (event) => {
  cohere.init(key);
  const response = await cohere.generate('baseline-shark', event.body)
  return {
    statusCode: response.statusCode,
    body: JSON.stringify(response.body)
  }
}

module.exports = { handler }

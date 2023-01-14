
const { Configuration, OpenAIApi } = require('openai')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const { json } = require('body-parser')

const app = express()

app.use(cors())
app.use(bodyParser.json())
const PORT = 3001

const configuration = new Configuration({
   // organization: "",
    apiKey:"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"
})

const openai = new OpenAIApi(configuration)

app.listen(`${PORT}`, () => {
    console.log(`Server listening on ${PORT}`)
})

app.post('/', async (req, res) => {
    const message = req.body
    console.log(message)

    promptMessage = JSON.stringify(message.message)
    console.log(promptMessage)


  const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptMessage,
        max_tokens: 160,
        temperature: 0.5,
    })

    res.json({
        message: response.data.choices[0].text
    })

    console.log(response.data.choices[0].text)



})

async function callAPI(){
}

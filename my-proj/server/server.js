import express from 'express';
import fetch from 'node-fetch';

import { createClient } from 'redis';

import cors from "cors";
import bodyParser from 'body-parser'

import Configuration from "openai";
import OpenAIApi from "openai";


var app = express();
app.use(bodyParser.urlencoded())
app.use(bodyParser.json());

app.use(cors())
const client = createClient({
    password: '0qM0SUodzmClrDdnLK9ous0zHHg9i6jw',
    socket: {
        host: 'redis-18457.c321.us-east-1-2.ec2.cloud.redislabs.com',
        port: 18457
    }
});


const callChatGPT = async (question) => {

  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [{role: "user", content: question}],
    });
    console.log(completion.data.choices[0].message.content);
    return completion.data.choices[0].message.content;
  } catch(error) {
    // if (error.config.errorCode === 500) {
    //   console.log("Server error. Error 500. Retrying...");
    //   callChatGPT(question);
    // } else if (error.config.errorCode === 503) {
    //   console.log("I encountered this server error. Error 503. Retrying...")
    //   callChatGPT(question);
    // } else {
      console.log(error)
      if (error.config.data.error === undefined) {
        console.log("There's no actual error chatgpt is just being silly")
        console.log(error)

        return "chatgpterror"
        //return error.config.data.messages[0].content;
      } else {
        return "chatgpterror"
      }
    
  }
};

app.post('/whatsapp', function (req, res) {
  res.send("hello world")
  const url = 'https://graph.facebook.com/v17.0/213413625180806/messages';
  const accessToken = 'EAAJ9byzvZBM0BO6Ni57hLMIh0l4VAoQ4ILbuO7Db9vls5DMcPeRxECwgNbcDwpLdBqnzRP5ZB8I8h77zGwUZB5i9jcBBLeIO6NzKVsmTSNLvcto96Wab8a38CMVqMAQS3wlUXyplLTe2BZAZCuAnmQspNVJokoxDZC0agZCzv8uyQiQeHjMwblksTjbN08UBYnsQceCiG89JHLRnyMRTGQZD';

  const data = {
    messaging_product: 'whatsapp',
    to: '12245513886',
    // text: {
    //   body: 'Hello, Ramu. This is a test message from Hitha. Please come to your daughters wedding. Thank you!',
    // }
    "type": "template",
  "template": {
    "name": "hello_world",
    "language": {
      "code": "en_US"
    }
  }
  };
  
  fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
    .then(response => response.json())
    .then(result => console.log(result))
    .catch(error => console.error('Error:', error));

});

app.get('/', async function(req, res) {
  res.send("connecting to redis")
  await client.connect();

  client.on('error', err => console.log('Redis Client Error', err));

  await client.set('hitha', 'the great');
  // callChatGPT("Hello, how are you?");

})

app.post('/data', async function(req, res) {
  const data = req.body?.data;
  var type = req.body?.typeofdata;
  client.on('error', err => console.log('Redis Client Error', err));
  var value = await client.get(type);
  value = JSON.parse(value);

  const mergedObject = { ...value };

  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      mergedObject[key] = data[key];
    }
  }
  console.log('newval ', (mergedObject));
  await client.set(type, JSON.stringify(mergedObject));
  res.send([]);
});


app.post("/retrieve-data", async function(req, res) {
  
  client.on('error', err => console.log('Redis Client Error', err));
  const value = await client.get(req.body?.typeofdata);
  console.log("Retrieved in /retrieve-data \n", JSON.parse(value));
  res.send(JSON.parse(value));
})

app.get("/update-data", async function(req, res) {
  
  client.on('error', err => console.log('Redis Client Error', err));
  await client.set('hitha', 'the best');

})



app.listen(3005, function () {
  console.log('Example app listening on port 3005!');
});
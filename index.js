require('dotenv').config()

const axios = require ('axios')

const FormData = require('form-data')

const fs = require('fs')

async function sendTemplateMessage() {
    const response = await axios({
        url:'https://graph.facebook.com/v22.0/813009285232263/messages',
        method:'post',
        headers:{
            'Authorization':`Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type':'application/json'
        },
        data: JSON.stringify({
            messaging_product:'whatsapp',
            to:'918506806224',
            type:'template',
            template:{
                name:'hello_world',
                language:{
                    code: 'en_US'
                }
            }
        })
    })

    console.log(response.data)
}

//text message 

async function sendTextMessage()
{
    const response = await axios({
        url:'https://graph.facebook.com/v22.0/813009285232263/messages',
        method:'post',
        headers:{
            'Authorization':`Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type':'application/json'
        },
        data: JSON.stringify({
            messaging_product:'whatsapp',
            to:'918506806224',
            type:'text',
            text:{
               body:'Thisis a text message to my friend' 
            }
        })
    })

    console.log(response.data)
}


sendTemplateMessage()
 sendTextMessage()

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
            to:'917387451891',
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
            to:'917387451891',
            type:'text',
            text:{
               body:'Thisis a text message to my friend' 
            }
        })
    })

    console.log(response.data)
}

async function sendPDFMessage() {

    // 1️⃣ Upload the PDF to get media ID
    const form = new FormData();
    form.append('file', fs.createReadStream(process.cwd() + '/sample.pdf'), {
        contentType: 'application/pdf'
    });
    form.append('type', 'application/pdf');
    form.append('messaging_product', 'whatsapp');

    const uploadResponse = await axios.post(
        'https://graph.facebook.com/v22.0/813009285232263/media',
        form,
        {
            headers: {
                'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
                ...form.getHeaders()
            }
        }
    );

    const mediaId = uploadResponse.data.id;

    // 2️⃣ Send the PDF file as a document message
    const response = await axios({
        url: 'https://graph.facebook.com/v22.0/813009285232263/messages',
        method: 'post',
        headers: {
            'Authorization': `Bearer ${process.env.WHATSAPP_TOKEN}`,
            'Content-Type': 'application/json'
        },
        data: JSON.stringify({
            messaging_product: 'whatsapp',
            to: '917387451891',
            type: 'document',
            document: {
                id: mediaId,
                filename: 'sample.pdf'   // This name will appear in WhatsApp
            }
        })
    });

    console.log(response.data);
}





sendTemplateMessage()
sendTextMessage()
// // sendMediaMessage()
sendPDFMessage();


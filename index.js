const { Telegraf } = require('telegraf');
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
require('dotenv').config();

const token = process.env.TOKEN;

const bot = new Telegraf(token,{polling:true});

// async function main() {
//     // Connect the client
//     await prisma.$connect()
//     // ... you will write your Prisma Client queries here
//     const allUsers = await prisma.user.findMany()
//     console.log(allUsers)

// }


let users = [
    {
        "name": "Preeti",
        "username": "preeti",
        "email":"preeti@gmail.com",
    },
    {
        "name": "abc",
        "username": "abc",
        "email":"abc@gmail.com",
    },
    {
        "name": "pjan",
        "username": "pjan",
        "email":"pjan@gmail.com",
    },
    {
        "name": "blah blah",
        "username": "blah",
        "email":"blah@gmail.com",
    },
    {
        "name": "ankit",
        "username": "ankit",
        "email":"ankit@gmail.com",
    },
    {
        "name": "booommm",
        "username": "brake",
        "email":"brake@gmail.com",
    },
]
bot.command('start', message =>{

    let chat_id = message.from.id;

    bot.telegram.sendMessage(chat_id,
            "Here are the command you can use to command me :) \n /start : to start me \n /registration : Here you will find some details about registration \n /resources : Here you will find some resources about hackathon \n /register : If you want to check you are registered or not \n /registerMe : You can register yourself from here."    
        )

    

    bot.telegram.sendMessage(chat_id, "What would you like to do??",{
        reply_markup: {
            inline_keyboard:[
                [{text:"About", url:"https://castor23.netlify.app/"},
                 {text: "Prizes", url:"https://castor23.netlify.app/#prizes"}],
                [{text:"Judges", url: "https://castor23.netlify.app/#judges"},
                 {text:"Location", url:"www.google.com"}],
                
                [{text:"Register", url:"https://ethforall.devfolio.co/"}]


            ]
        }
    })
})

bot.command('registration', message =>{
    let  chat_id = message.from.id;

    bot.telegram.sendMessage(chat_id, "Here are some details about registration \n Deadline: xx jan 2023 \n Requirements : ABCLSDNAFMLEFMCLDC",{
        reply_markup:{
            inline_keyboard:[
                [{text: "Registration link", callback_data:'Link'}]
            ]
        }
    })
})

bot.command('resources', message => {
    let chat_id = message.from.id;

    bot.telegram.sendMessage(chat_id, "We have these resources for you:", {
        reply_markup:{
            inline_keyboard:[
                [{text: "Tutorial", url: "www.google.com"}],
                [{text: "Sample projects", url: "www.google.com"}]
            ]
        }
    })

    bot.telegram.sendMessage(chat_id,"See you soon in event,\n (whispher): You can win, as you are here early🤫🤫")
})

bot.command('register', message =>{
    let chat_id = message.from.id;

    bot.telegram.sendMessage(chat_id, " Please enter your email:");
    let msz ,user_name;
    bot.on("text", async (ctx) =>{
        msz = ctx.message.text;
        console.log(msz)
        let obj = users.find(o => o.email === msz);
        console.log(obj);
        //await bot.telegram.sendMessage(chat_id, `Please enter you ${msz}`);

        if(obj == undefined)
        {
            bot.telegram.sendMessage(chat_id, "You are not registered😐, \n No worries 😎,\n Please fill the form hereto get registered");
        }
        else{
            bot.telegram.sendMessage(chat_id, "You are registered😁😁 \n Will see you on XYZ date");
        }
    })  
})

bot.command('registerMe', message => {
    let chat_id = message.from.id;

    bot.telegram.sendMessage(chat_id, "Thank you for showing interest 😁😁\n But I need 🤏 details from you:");
    bot.telegram.sendMessage(chat_id, "Please tell me your \nUser Name \nName🐼\n Email📧");

    let details;

    bot.on("text", async(ctx) =>{
        details = ctx.message.text;
        console.log(details)
        var strA = details.split(/(\s+)/);
        console.log(strA)
    
        let ema = strA[4]

        let obj1 = users.find(o => o.email === ema);
        console.log(obj1);

        if(obj1 == undefined)
        {
            let entity = {
                "name" : strA[0],
                "username": strA[2],
                "email": strA[4]
            }

            users.push(entity);
            bot.telegram.sendMessage(chat_id, "registered");
        }
        else{
            bot.telegram.sendMessage(chat_id, "you are already registered");
        }
        //await bot.telegram.sendMessage(chat_id, `Regis${details}`);
    })
    
})

// main()
//   .then(async () => {
//     await prisma.$disconnect()
//   })
//   .catch(async (e) => {
//     console.error(e)
//     await prisma.$disconnect()
//     process.exit(1)
//   })

bot.launch()
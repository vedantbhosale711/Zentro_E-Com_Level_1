import arcjet, {tokenBucket,shield,detectBot, slidingWindow} from "@arcjet/node";

// we can use dotenv.confing in 2 ways
import "dotenv/config";

export const aj = arcjet({
    key: process.env.ARKJET_KEY,
    characteristics:["ip.src"],
    rules:[
        //shied is an arcjet rule/servise which protects from common attacks like SQL injections, XSS, CSFR attacks
        shield({mode:"LIVE"}),
        detectBot({
            mode:"LIVE",
            // allow blocks all bots except search engine
            allow:[
                "CATEGORY:SEARCH_ENGINE",
                // can checkout the full list at this url -> https://arcjet.com/bot-list
            ]
        }),

        //rate limiting
        tokenBucket({
            mode:"LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10
        })

    ]
});
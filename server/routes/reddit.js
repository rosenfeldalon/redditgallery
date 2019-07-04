const express = require('express');
const snoowrap = require('snoowrap');
const router = express.Router();

// todo: delete me
router.get('/cats', (req, res, next) => {
    res.send({
        cats: [{name: 'lilly'}, {name: 'lucy'}],
    })
});

// Create a new snoowrap requester with OAuth credentials.
const r = new snoowrap({
    userAgent: 'Web excercise for reddit :v1.0.0 (by /u/MrHaflo)',
    clientId: 'DQvAYspf1B6NkA',
    clientSecret: 'Tr2Ix2bkYjy7NXgTX69x4CYI6L8',
    username: 'MrHaflo',
    password: 'MrHaflo'
});


router.get('/getSubRedditByName', function (req, res, next) {
    console.warn("PARAMS", req.query); // todo: delete me
    const searchParam = req.query.searchParam;
    if (!searchParam) {
        // return error 400 bad request
        res.status(400).send("search param required! ");
    }
    console.warn("PARAMS FROM CLIENT", searchParam);
    r.getSubreddit(searchParam).getTop({time: 'all'}).then((response) => {
        response.fetchMore({amount: 10}).then(extendedResponse => {
            let finalResponse = [];
            let tempItem = {};
            // loop over result and return to client only the wanted params
            extendedResponse.forEach((item) => {
                if (item && !item.is_video && (item.url.includes('.jpg') || item.url.includes('.png'))) {
                    tempItem = {
                        url: item.url,
                        title: item.title,
                        permalink: item.permalink,
                        ups: item.ups
                    };

                    finalResponse.push(tempItem);
                }
            });
            res.send(finalResponse);
        });

    }).catch((error) => {
        res.status(500).send("REDDIT ERROR " + error);
    });

});

r.getHot({limit: 25}).then(myListing => {
    console.log(myListing.length); // => 25
    myListing.fetchMore({amount: 10}).then(extendedListing => {
        console.log(extendedListing.length); // => 35
    })
});


module.exports = router;

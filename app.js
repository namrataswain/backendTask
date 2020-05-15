const yargs = require('yargs')
const request = require('request')
const fs = require('fs')
const info = require('./info')



const url = 'https://o136z8hk40.execute-api.us-east-1.amazonaws.com/dev/get-list-of-conferences'

request({ url: url }, (error, response) => {
   const data = JSON.parse(response.body)
    const eventJSON = JSON.stringify(data, /*replacer */null,/* spacer */ 4);
  fs.writeFileSync('info.json', eventJSON);
   printEvents(data.paid, "info")
 
})

const printEvents = (eventArray, fileName) => {
    var eventsInfo = ""
    eventArray.forEach(event => {
        var eventInfo = "\"" + event.confName + "\", " +  event.confStartDate + "," + event.confStartDate + "," + event.city + "," + event.country + "," + event.entryType;
        eventsInfo += eventInfo + "\n" 
    });
   
     fs.writeFileSync(fileName + '.txt', eventsInfo)
}

yargs.command({
    command: 'findDup',
    describe :'finding duplicates',
    handler: function (argv) {
       info.findDuplicates()
    }
})

yargs.command({
    command : 'findSemanticDup',
    describe : 'finding semantic duplicates',
    builder:{
        startDate : {
            describe: 'start day of an event',
            demandOption : true,
            type: 'string'
        
        },
        endDate :{
            describe : 'end date of an event',
            demandOption : true,
            type :'string'
        },
        venue :{
            describe :'venue of an event',
            demandOption : true,
            type:'string'
        }
    },
    handler : function(argv) {
        info.findSemanticDup(argv.startDate, argv.endDate, argv.venue)
    }
})
yargs.parse()
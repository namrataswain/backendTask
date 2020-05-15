const fs = require('fs');


//load the existing data
const loadEvents = () => {

    try {
        const dataBuffer = fs.readFileSync('info.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON).paid
    } catch (e) {
        return []
    }
}

const printEvents = (eventArray, fileName) => {
    var eventsInfo = ""
    eventArray.forEach(event => {
        var eventInfo = "\"" + event.confName + "\", " +  event.confStartDate + "," + event.confStartDate + "," + event.city + "," + event.country + "," + event.entryType;
        eventsInfo += eventInfo + "\n" 
    });
   
     fs.writeFileSync(fileName + '.txt', eventsInfo)
}

 //function to identify the duplicates 
const findDuplicates =  () => {
    const result = []
    const events = loadEvents();

    var set = new Set();
    events.forEach(element => {
        var eventAsAString = JSON.stringify(element)
        if (!set.has(eventAsAString)){
            set.add(eventAsAString)
        } else {
            result.push(element)
        }
    });
    
    if (result.length !== 0){
        printEvents(result, "duplicates")
        console.log('Duplicates were found')
    } else{
        console.log('No duplicates were found ')
    }
} 

//find the semantic duplicates
const findSemanticDup = (startDate, endDate, venue) =>{
   const events = loadEvents();
   const semanticDuplicates = events.filter((event) => {
      return event.confStartDate === startDate && event.confEndDate === endDate && event.venue == venue ? true : false;
  })
  if (semanticDuplicates.length === 0) {
      console.log('found no semanticaly duplicate entry')
  }
  else{
      console.log('Similar/same event detected')
      printEvents(semanticDuplicates, "semantic_duplicates")
  }
}


module.exports = {
    findDuplicates: findDuplicates,
    findSemanticDup : findSemanticDup,
    printEvents : printEvents
}

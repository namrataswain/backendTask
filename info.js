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

const saveEvents = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('duplicate.json', dataJSON)
}

//function to identify the duplicates 
const findDuplicates =  () => {

    const result = []
    const events = loadEvents();
    // console.log(events);

    var set = new Set();
    events.forEach(element => {
        if (!set.has(element)) {
            set.add(element)
        }
        else {
            result.push(element)
        }
    });
    if (result.length !== 0){
        saveEvents(result)
        console.log('Duplicates were found')
    }
    else{
        console.log('No duplicates were found ')
    }
   
}

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
      saveEvents(semanticDuplicates)
  }
}


module.exports = {
    findDuplicates: findDuplicates,
    findSemanticDup : findSemanticDup
}
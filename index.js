// Your code here
function createEmployeeRecord (array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords (array) {
    let arrayofObjs = []
    for (let i = 0; i < array.length; i++) {
        arrayofObjs.push(createEmployeeRecord(array[i]))
    } 
    return arrayofObjs
}

function createTimeInEvent (object, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return object
}

function createTimeOutEvent (object, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return object
}

function hoursWorkedOnDate (object, wDate) {
    let start = object.timeInEvents.find(function(e){
        return e.date === wDate
    }) 
    let end = object.timeOutEvents.find(function(e){
        return e.date === wDate
    })

    return (end.hour - start.hour) / 100
}

function wagesEarnedOnDate (object, wDate) {
    let wage = hoursWorkedOnDate(object, wDate)
    let money = wage * object.payPerHour
    return money
}

let allWagesFor = function(object) {
    let workedDates = object.timeInEvents.map(function(e){
        return e.date
    }) 

    let payable = workedDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(object, d)
    }, 0)

    return payable
}

function findEmployeeByFirstName (srcArray, firstName) {
    return srcArray.find(function(name){
        return name.firstName === firstName
    })
}

function calculatePayroll (array) {
    return array.reduce(function(memo, d){
        return memo + allWagesFor(d)
    }, 0)
}
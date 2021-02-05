function createEmployeeRecord(array) {
    let employee = {
    firstName: array[0], 
    familyName: array[1],
    title: array[2],
    payPerHour: array[3],
    timeInEvents: [],
    timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(arrays) {
    return arrays.map(createEmployeeRecord)
}

function createTimeInEvent(Object, dateStamp="YYYY-MM-DD HHMM") {
    Object.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })
    return Object
}

function createTimeOutEvent(Object, dateStamp="YYYY-MM-DD HHMM") {
    Object.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    })
    return Object
}


function hoursWorkedOnDate(Object, dateForm="YYYY-MM-DD") {
    let timeIn = Object.timeInEvents.find(function(e) {
        return e.date === dateForm
    }) 
    let timeOut = Object.timeOutEvents.find(function(e) {
        return e.date === dateForm
    })
    return (timeOut.hour-timeIn.hour) / 100 
}

function wagesEarnedOnDate(Object, dateForm="YYYY-MM-DD") {
    let payRate = Object.payPerHour
    let hoursWorked = hoursWorkedOnDate(Object, dateForm) 
    
    return hoursWorked * payRate
}

function allWagesFor(Object) {
    let totalWages = Object.timeInEvents.map(function(e) {
        return wagesEarnedOnDate(Object, e.date)
    })
    return totalWages.reduce(function(accumulator, currentValue) {
        return accumulator + currentValue
    })
}

function findEmployeeByFirstName(srcArray, first_name) {
    return srcArray.find(function(record) {
    return record.firstName === first_name
    })
}

function calculatePayroll(Array) {
    return Array.reduce(function(accumulator, currentValue) {
        return accumulator + allWagesFor(currentValue)}, 0)
}




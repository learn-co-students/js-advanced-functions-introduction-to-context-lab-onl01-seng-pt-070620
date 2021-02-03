function createEmployeeRecord(element) {
    return {
        firstName: element[0],
        familyName: element[1],
        title: element[2],
        payPerHour: element[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeData){
    return employeeData.map(function(element){
        return createEmployeeRecord(element)
    })
}

function createTimeInEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(hour)})
    return employeeRecord
}

function createTimeOutEvent(employeeRecord, dateStamp) {
    let [date, hour] = dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({type: "TimeOut", date: date, hour: parseInt(hour)})
    return employeeRecord
}

function hoursWorkedOnDate(employeeRecord, payDate){
    let inEvent = employeeRecord.timeInEvents.find(function(e){
        return e.date === payDate
    })
    let outEvent = employeeRecord.timeOutEvents.find(function(e){
        return e.date === payDate
    })
    return (outEvent.hour - inEvent.hour) / 100
}

function wagesEarnedOnDate(employeeRecord, daysSought){
    return hoursWorkedOnDate(employeeRecord, daysSought) * employeeRecord.payPerHour 
}

function allWagesFor(employeeRecord) {
    let wantedDates = employeeRecord.timeInEvents.map(function(e){
        return e.date 
    })
    let payableDates = wantedDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0)
    return payableDates
}

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find((e) => {
        return e.firstName === firstName
    })
}

function calculatePayroll(employeeRecordArray){
    return employeeRecordArray.reduce(function(memo, pay){
        return memo + allWagesFor(pay)
    }, 0)
}
// let the challenge begin!!!

function createEmployeeRecord(employee) {
    let record = {};
    for (let i = 0; i < employee.length; i++)
    // record[i] = employee[i]
        record.firstName = employee[0];
        record.familyName = employee[1];
        record.title = employee[2];
        record.payPerHour = employee[3];
        record.timeInEvents = [];
        record.timeOutEvents = [];
    return record
}

function createEmployeeRecords(employees) {
        // let employeeRecords = employees.map(function(employee) {return createEmployeeRecord(employee)});
        let employeeRecords = employees.map(employee => createEmployeeRecord(employee));
        return employeeRecords;
}

function createTimeInEvent(record, dateTimeIn) {
    let splittedDate = dateTimeIn.split(" ");
    let timeInEvnt = {
        type: "TimeIn",
        hour: parseInt(splittedDate[1]),
        date: splittedDate[0]
    };
    record.timeInEvents.push(timeInEvnt)
    return record;
}

function createTimeOutEvent(record, dateTimeOut) {
    let splittedDate = dateTimeOut.split(" ");
    let timeOutEvnt = {
        type: "TimeOut",
        hour: parseInt(splittedDate[1]),
        date: splittedDate[0]
    };
    record.timeOutEvents.push(timeOutEvnt)
    return record
}

function hoursWorkedOnDate(record, dateString) {
    let timeInhour;
    let timeOutHour;
    for (let event of record.timeInEvents) {
        if (event.date === dateString)
            timeInhour = event.hour / 100
    }
    for (let event of record.timeOutEvents) {
        if (event.date === dateString)
            timeOutHour = event.hour / 100
    }
    let totalHours = (timeOutHour - timeInhour);
    return totalHours;
}

function wagesEarnedOnDate(record, dateString) {
    let totalWage = record.payPerHour * hoursWorkedOnDate(record, dateString)
    return totalWage
}

function allWagesFor(record) {
    let allDatesWorked = record.timeInEvents.map(function (e) { return e.date})
    let payable = allDatesWorked.reduce(function (accumulator, currentDate) {
        return accumulator + wagesEarnedOnDate(record, currentDate)
    }, 0)
    return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    for (let record of srcArray) {
        if (record.firstName === firstName) {
            return record
        }
    }
}

function calculatePayroll(records) {
    let payToAll = records.reduce((accu, curr) => accu + allWagesFor(curr), 0)
    return payToAll
}
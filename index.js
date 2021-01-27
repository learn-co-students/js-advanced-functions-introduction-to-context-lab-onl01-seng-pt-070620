function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    };
};

function createEmployeeRecords(nestedArray) {
    return nestedArray.map(array => createEmployeeRecord(array))
};

function createTimeInEvent(employeeRecord, date) {
    // do work on employee record and get the timeinevents property
    const newDate = date.split(" ")
    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(newDate[1], 10),
        date: newDate[0]
    });
    return employeeRecord
};

function createTimeOutEvent(employeeRecord, date) {
    const newDate = date.split(" ")
    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(newDate[1], 10),
        date: newDate[0]
    });
    return employeeRecord
};

function hoursWorkedOnDate(employeeRecord, d) {
    const timeIn = employeeRecord.timeInEvents.find(function(time) {
        return time.date === d
    });

    const timeOut = employeeRecord.timeOutEvents.find(function(time) {
        return time.date === d
    });

    return (timeOut.hour - timeIn.hour) / 100
};

function wagesEarnedOnDate(employeeRecord, d) {
    return (hoursWorkedOnDate(employeeRecord, d) * employeeRecord.payPerHour)
};

function allWagesFor(employeeRecord) {
    let allDates = employeeRecord.timeInEvents.map(function(d) {
        return d.date
    });

    let allWages = allDates.reduce(function(memo, d) {
        return memo + wagesEarnedOnDate(employeeRecord, d)
    }, 0);

    return allWages
};

function findEmployeeByFirstName(array, name) {
    return array.find(obj => {
        return obj.firstName === name
    });
};

function calculatePayroll(array) {
    return array.reduce(function(memo, emp) {
        return memo + allWagesFor(emp)
    }, 0)
}
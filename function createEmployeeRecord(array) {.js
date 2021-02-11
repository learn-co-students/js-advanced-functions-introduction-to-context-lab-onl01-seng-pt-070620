function createEmployeeRecord(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(employeeArrays) {
    return employeeArrays.map(function(employee) {
        return createEmployeeRecord(employee)
    })
}

function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date
    })

    return employee
}

function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(' ')

    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date
    })

    return employee
}

function hoursWorkedOnDate(employee, certainDate) {
    let clockedIn = employee.timeInEvents.find(function(e) {
        return e.date === certainDate
    })

    let clockedOut = employee.timeOutEvents.find(function(e) {
        return e.date === certainDate
    })

    return (clockedOut.hour - clockedIn.hour) / 100
}

function wagesEarnedOnDate(employee, certainDate) {
    let grossPay = hoursWorkedOnDate(employee, certainDate) * employee.payPerHour
    return parseFloat(grossPay)
}

let allWagesFor = function(employee) {
    let workedDays = employee.timeInEvents.map(function(e) {
        return e.date
    })

    let payable = workedDays.reduce(function(accumulator, date) {
        return accumulator + wagesEarnedOnDate(employee, date)}, 0)
        return payable
}

function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(function(e) {
        return e.firstName === firstName
    })
}

let calculatePayroll = function(employeesArray) {
    return employeesArray.reduce(function(accumulator, employee) {
        return accumulator + allWagesFor(employee)
    }, 0)
}
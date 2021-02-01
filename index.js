function createEmployeeRecord(employeeArray) {
    return {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arrays) {
    return arrays.map(element => createEmployeeRecord(element));
}

function createTimeInEvent(employeeRecord, time) {
    // let employee = createEmployeeRecord(employeeRecord)
    let newTimeInEvent = {
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1]),
        type: "TimeIn" 
    }

    employeeRecord.timeInEvents.push(newTimeInEvent); 
    return employeeRecord;   
}

function createTimeOutEvent(employeeRecord, time) {
    let newTimeOutEvent = {
        date: time.split(" ")[0],
        hour: parseInt(time.split(" ")[1]),
        type: "TimeOut" 
    }

    employeeRecord.timeOutEvents.push(newTimeOutEvent); 
    return employeeRecord; 
}

function hoursWorkedOnDate(employee, day) {
    let startTime = employee.timeInEvents.find(function (element) {
        return element.date === day;
    })
    let endTime = employee.timeOutEvents.find(function(element) {
        return element.date === day;
    })

    let hoursWorked = (endTime.hour - startTime.hour) / 100;
    return hoursWorked;
}

function wagesEarnedOnDate(employee, date) {
    let hours = hoursWorkedOnDate(employee, date);

    return hours * employee.payPerHour;
}

function allWagesFor(employee) {
    let daysWorked = employee.timeInEvents.map(element => element.date)

    let earned = daysWorked.reduce(function(start, date) {
        return start + wagesEarnedOnDate(employee, date);
    }, 0)

    return earned;
}

function findEmployeeByFirstName(allEmployees, employeeFirst) {
    return allEmployees.find(element => element.firstName === employeeFirst);
}

function calculatePayroll(allEmployees) {
    let totalWages = allEmployees.reduce(function(accumulator, employee) {
        return accumulator + allWagesFor(employee)
    }, 0)

    return totalWages;
}
// Your code here
function createEmployeeRecord(empArray) {
    const employeeRecord = {
        firstName : empArray[0],
        familyName: empArray[1],
        title: empArray[2],
        payPerHour: empArray[3],
        timeInEvents: [],
        timeOutEvents: [],
    };
    return employeeRecord
}

function createEmployeeRecords(empArray) {
  return empArray.map(createEmployeeRecord);
}

function createTimeInEvent(employeeRecord, eventDate){
    const timeInEvent = {
        type : "TimeIn",
        hour : parseInt(eventDate.substring(11)),
        date : eventDate.substring(0,10)
    };
    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, eventDate){
    const timeOutEvent = {
        type : "TimeOut",
        hour : parseInt(eventDate.substring(11)),
        date : eventDate.substring(0,10)
    };
    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(eRecord, date){
    const timeIn = eRecord.timeInEvents.find(function(timeIn){
        return timeIn.date === date;
    });
    const timeOut = eRecord.timeOutEvents.find(function(timeOut){
        return timeOut.date === date;
    });
    let hourIn = timeIn.hour.toString();
    let hourOut = timeOut.hour.toString();
    hourIn = parseInt(hourIn.substring(0, hourIn.length - 2));
    hourOut = parseInt(hourOut.substring(0, hourOut.length - 2));
    return hourOut - hourIn;
}

function wagesEarnedOnDate(eRecord, date){
    const hoursWork = hoursWorkedOnDate(eRecord, date);
    return hoursWork * eRecord.payPerHour;
}

function allWagesFor(eRecord){
    const employeeWorkDates = eRecord.timeInEvents;
    let allWeges = 0;
    for (const element of employeeWorkDates){
        allWeges += wagesEarnedOnDate(eRecord, element.date);
    }
    return allWeges;
}

function findEmployeeByFirstName(srcArray, firstName){
    const employee = srcArray.find(emp => function(emp){
        emp.firstName === firstName;
    })
    return employee;
}

function calculatePayroll(srcArray){
    const allWeges = srcArray.map((employee) => {return allWagesFor(employee)});
    return allWeges.reduce((result, wage) => result + wage);
}



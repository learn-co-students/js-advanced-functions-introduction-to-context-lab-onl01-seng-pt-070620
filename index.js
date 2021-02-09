// Your code here
function createEmployeeRecord(info){
    return {
        firstName: info[0],
        familyName: info[1],
        title: info[2],
        payPerHour: info[3],
        timeInEvents: [],
        timeOutEvents: []
    }
};

function createEmployeeRecords(employeeInfo){
    return employeeInfo.map(function(info){
       return createEmployeeRecord(info)
    })
};

function createTimeInEvent(employeeInfo, timeStamp){
    const [date, hour] = timeStamp.split(' ')

    employeeInfo.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeInfo
};

function createTimeOutEvent(employeeInfo, timeStamp){
    const [date, hour] = timeStamp.split(' ')

    employeeInfo.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeInfo
};

function hoursWorkedOnDate(employee, dateSearched){
    let timeIn = employee.timeInEvents.find(function(e){
        return e.date === dateSearched
    })

    let timeOut = employee.timeOutEvents.find(function(e){
        return e.date === dateSearched
    })
    return (timeOut.hour - timeIn.hour) / 100
};

function wagesEarnedOnDate(employee, dateOfHoursWorked){
    let wages = hoursWorkedOnDate(employee, dateOfHoursWorked) * employee.payPerHour
    return wages
};

function allWagesFor(employee){
    let dates = employee.timeInEvents.map(function(e){
        return e.date
    })
    let wages = dates.reduce(function(pay, date){
        return pay + wagesEarnedOnDate(employee, date)
    }, 0)
    return wages 
};

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce(function(totalPay, emp){
        return totalPay + allWagesFor(emp)
    }, 0)
};

function findEmployeeByFirstName(srcArray, firstName){
    return srcArray.find(function(src){
        return src.firstName === firstName
    })
};

// Your code here

let createEmployeeRecord = function(column){
    return {
        firstName: column[0],
        familyName: column[1],
        title: column[2],
        payPerHour: column[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employeeInfo){
    return employeeInfo.map(function(column){
        return createEmployeeRecord(column)
    })

}

const createTimeInEvent = function(employeeInfo, dateTime){
    let [date, hour] = dateTime.split(' ')
    employeeInfo.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeInfo
}

const createTimeOutEvent = function(employeeInfo, dateTime){
    let [date, hour] = dateTime.split(' ')
    employeeInfo.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeInfo
}

const hoursWorkedOnDate = function(employeeInfo, day){
    let timeIn = employeeInfo.timeInEvents.find(function(e){
        return e.date === day
    })

    let timeOut = employeeInfo.timeOutEvents.find(function(e){
        return e.date === day
    })
        return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate= function(employeeInfo, day){
    return hoursWorkedOnDate(employeeInfo, day) * employeeInfo.payPerHour
}

const allWagesFor = function(employeeInfo){
    let wages = employeeInfo.timeInEvents.map(e => wagesEarnedOnDate(employeeInfo, e.date))
    let totalEarned = wages.reduce(function (sum, i){
        return sum + i
    })
return totalEarned
}

const calculatePayroll = function(employees){
    let employeeWages = employees.map( e => allWagesFor(e))
    let grandTotalOwed = employeeWages.reduce(function(sum, i){
        return sum + i
    })
    return grandTotalOwed
    }

const findEmployeeByFirstName = function(employees, name){
    let employeeName  = employees.find(function(e){
        return e.firstName === name
    })
    return employeeName
}






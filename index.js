// Your code here
function createEmployeeRecord(data){
    const employee = {
        firstName: data[0],
        familyName: data[1],
        title: data[2],
        payPerHour: data[3],
        timeInEvents: [],
        timeOutEvents: []
    };
    return employee
}

const createEmployeeRecords = function(employees){
  let employeeRecords =  employees.map(employeeRecord => createEmployeeRecord(employeeRecord))
  return employeeRecords
}

 const createTimeInEvent = function(employeeRecord, dateTime){
     let [date, hour] = dateTime.split(' ')

     employeeRecord.timeInEvents.push({
         type: "TimeIn",
         hour: parseInt(hour, 10),
         date,
     })
     return employeeRecord
 }

 const createTimeOutEvent = function(employeeRecord, dateTime){
    let [date, hour] = dateTime.split(' ')

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date,
    })
    return employeeRecord
}



const hoursWorkedOnDate = function(employeeRecord, dateTime){
    let [day, hour] = dateTime.split(' ')

    const timeIn = employeeRecord.timeInEvents.find(function (e){
        return e.date === day
    })

    const timeOut = employeeRecord.timeOutEvents.find(function (e){
        return e.date === day
    })
    
    return (timeOut.hour - timeIn.hour) /100
}

const wagesEarnedOnDate = function(employeeRecord, dateTime){
  return  hoursWorkedOnDate(employeeRecord, dateTime) * employeeRecord.payPerHour
}

const allWagesFor = function(employeeRecord){
    let wages = employeeRecord.timeInEvents.map(e => wagesEarnedOnDate(employeeRecord, e.date))
    let totalEarned = wages.reduce(function (sum, i){
        return sum + i
    })
return totalEarned
}


const calculatePayroll = function(employees){
    let employeeWages = employees.map(e => allWagesFor(e))
    let totalPaid = employeeWages.reduce(function (sum, i){
        return sum + i
    })
    return totalPaid
}

const findEmployeeByFirstName = function(emps, name) {
    let employee = emps.find(e => e.firstName === name)
    return employee;
}




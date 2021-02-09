// take individual record and process it

let createEmployeeRecord = function(employee){
    return {
        firstName: employee[0],
        familyName: employee[1],
        title: employee[2],
        payPerHour: employee[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(employees){
    return employees.map(function(employee){
        return createEmployeeRecord(employee)
    })
}

let createTimeInEvent = function(employee, timeIn){
    // timeIn = "02-8-2021 0659"
    let [date, hour] = timeIn.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

let createTimeOutEvent = function(employee, timeOut){
    let [date, hour] = timeOut.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        date: date,
        hour: parseInt(hour, 10)
    })
    return employee
}

let hoursWorkedOnDate = function(employee, date){
    let timeIn = employee.timeInEvents.find(e => {return e.date === date})
    let timeOut = employee.timeOutEvents.find(e => {return e.date === date})
    return (timeOut.hour - timeIn.hour)/100
}

let wagesEarnedOnDate = function(employee, date){
    let wage = hoursWorkedOnDate(employee, date) * employee.payPerHour
    return parseFloat(wage.toString())
}

let allWagesFor = function(employee){
    let allDaysWorked = employee.timeInEvents.map(e => {return e.date})
    let payable = allDaysWorked.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee,d)
    },0)
    return payable
}

let findEmployeeByFirstName = function(employees, firstName) {
    return employees.find(function(name){
      return name.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
  }
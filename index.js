// Your code here
function createEmployeeRecord(arr){
  return {
    firstName: arr[0],
    familyName: arr[1],
    title: arr[2],
    payPerHour: arr[3],
    timeInEvents: [],
    timeOutEvents: []
  }
}

function createEmployeeRecords(arrs){
  return arrs.map(r => createEmployeeRecord(r))
}

function createTimeInEvent(er, timeIn){
  const newTimeIn = timeIn.split(" ")

  er.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(newTimeIn[1], 10),
    date: newTimeIn[0]
  })
  return er
}

function createTimeOutEvent(er, timeOut){
  const newTimeOut = timeOut.split(" ")

  er.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(newTimeOut[1], 10),
    date: newTimeOut[0]
  })
  return er
}

function hoursWorkedOnDate(er, date){
  const timeIn = er.timeInEvents.find(function(time){
    return time.date === date
  })
  const timeOut = er.timeOutEvents.find(function(time){
    return time.date === date
  })
  return (timeOut.hour - timeIn.hour)/100
}

function wagesEarnedOnDate(er, date){
  return hoursWorkedOnDate(er, date) * er.payPerHour
}

function allWagesFor(er){
  let allDates = er.timeInEvents.map(function(d){
    return d.date
  })
  let allWages = allDates.reduce(function(memo, d){
    return memo + wagesEarnedOnDate(er, d)
  }, 0)
  return allWages
}

function findEmployeeByFirstName(arr, name) {
  return arr.find(e => {
    return e.firstName === name
  })
}

function calculatePayroll(arr){
  return arr.reduce(function(memo, employee){
    return memo + allWagesFor(employee)
  }, 0)
}

// Your code here
const employeeArrays = [
    ["Christine", "Myers Keitt", "Software Engineer", 7000]
    ["Micheal", "Myers Keitt", "Accoutant", 5000],
    ["MJ", "Myers Keitt", "Baby", 8000]
]


function createEmployeeRecord(employeeArray){
    let records = {
        firstName: employeeArray[0],
        familyName: employeeArray[1],
        title: employeeArray[2],
        payPerHour: employeeArray[3],
        timeInEvents: [],
        timeOutEvents: []
    }
  return records
}

function createEmployeeRecords(records){
    let recordsArray = []
    records.forEach(function(record){
        recordsArray.push(createEmployeeRecord(record))
    })
   return recordsArray
}

function createTimeInEvent(recordsArray, dateStamp){
    let timeInEvent = {
        type: "TimeIn",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
  recordsArray.timeInEvents.push(timeInEvent)
    return recordsArray
}

function createTimeOutEvent(recordsArray, dateStamp){
    let timeOutEvent = {
        type: "TimeOut",
        hour: parseInt(dateStamp.split(" ")[1]),
        date: dateStamp.split(" ")[0]
    }
  recordsArray.timeOutEvents.push(timeOutEvent)
    return recordsArray
}

function hoursWorkedOnDate(record, date){
    const timeIn = record.timeInEvents.find((e) => e.date === date).hour
    const timeOut = record.timeOutEvents.find((e) => e.date === date).hour
    return (timeOut - timeIn)/100
  }
  
  function wagesEarnedOnDate(record, date){
      const wage = record.payPerHour
      const hoursWorked = hoursWorkedOnDate(record, date)
      return wage * hoursWorked;
  }
  
  function allWagesFor(record){
      const allWages = record.timeInEvents.map(function(day) {
        return wagesEarnedOnDate(record, day.date)
      })
      return allWages.reduce((acc, cv) => acc + cv)
  }
  
  function calculatePayroll(records){
      const allPay = (records.map(function(empl) {
        return allWagesFor(empl)
      }))
      return allPay.reduce((acc, cv) => acc + cv)
  }
  
  function findEmployeeByFirstName(arr, first_Name){
      return arr.find((record) => record.firstName === first_Name)
  }

// Your code here
function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour : arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  };
  function createEmployeeRecords(records) {
    let recordsArray = [];
    records.forEach(function(record){
      recordsArray.push(createEmployeeRecord(record));
    });
    return recordsArray;
  }
  
  function createTimeInEvent(record, dateTime) {
    let hour = parseInt(dateTime.split(" ")[1]);
    let date = dateTime.split(" ")[0];
    record.timeInEvents.push({
      type: "TimeIn",
      hour: hour,
      date: date
    })
    return record;
  }
  function createTimeOutEvent(record, dateTime) {
    let hour = parseInt(dateTime.split(" ")[1]);
    let date = dateTime.split(" ")[0];
    record.timeOutEvents.push({
      type: "TimeOut",
      hour: hour,
      date: date
    })
    return record;
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
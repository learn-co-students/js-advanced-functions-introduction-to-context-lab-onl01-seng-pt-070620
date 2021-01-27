// Your code here
const createEmployeeRecord = (arr) => {
    let employee = {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

const createEmployeeRecords = (arr) => {
    let employees = arr.map((employee) => {
        let empObj = createEmployeeRecord(employee)
        return empObj
    })
    return employees
}

const createTimeInEvent = (record, dateTime) => {
    const [date,time] = dateTime.split(" ")
    record.timeInEvents.push({type: "TimeIn", date: date, hour: parseInt(time)})
    return record
}

const createTimeOutEvent = (record, dateTime) => {
    const [date,time] = dateTime.split(" ")
    record.timeOutEvents.push({type: "TimeOut", date: date, hour: parseInt(time)})
    return record
}

const hoursWorkedOnDate = (record, date) => {
   const timeIn = record.timeInEvents.find(e => {
       return e.date == date
    })
   const timeOut = record.timeOutEvents.find(e => {
    return e.date == date
    })
    return (timeOut.hour - timeIn.hour) / 100
}

const wagesEarnedOnDate = (record, date) => {
    return hoursWorkedOnDate(record,date) * record.payPerHour
}

const allWagesFor = (record) => {
    const justTheDates = record.timeInEvents.map(e => e.date)
    const all = justTheDates.reduce((accum, element) => {
        return accum + wagesEarnedOnDate(record,element)
    },0)
    return all
}

const calculatePayroll = (record) => {
    return record.reduce((memo, emp) => {
        return memo + allWagesFor(emp)
    }, 0)
} 

const findEmployeeByFirstName = (record, name) => {
    return record.find(obj => {
        return obj.firstName === name
    });
};
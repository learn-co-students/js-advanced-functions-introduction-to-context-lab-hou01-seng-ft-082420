// Your code here
const createEmployeeRecord = (array) => {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

const createEmployeeRecords = (AoA) => {
  return AoA.map( array => createEmployeeRecord(array))
}

const createTimeInEvent = (employeeRecord, time) => {
  
  let {timeInEvents} = employeeRecord
  
  let record = {
      type: 'TimeIn',
      hour: parseInt(time.slice(-4)),
      date: time.slice(0,10)
  }

  console.log(record)

  timeInEvents.push(record) 

  return employeeRecord
}

const createTimeOutEvent = (employeeRecord, time) => {
  
  let {timeOutEvents} = employeeRecord
  
  let record = {
      type: 'TimeOut',
      hour: parseInt(time.slice(-4)),
      date: time.slice(0,10)
  }

//  console.log(record)

  timeOutEvents.push(record) 

  return employeeRecord
}

const hoursWorkedOnDate = (empRecord, date) => {
  let inTimeDay = empRecord.timeInEvents.find( day => day.date = date)
  let outTimeDay = empRecord.timeOutEvents.find( day => day.date = date)

  let inTime = inTimeDay.hour
  let outTime = outTimeDay.hour

  let hoursWorked = outTime - inTime

  return hoursWorked / 100

  // console.log('this is what i want', inTime, outTime, 'hw=', hoursWorked)

}

const wagesEarnedOnDate = (empRecord, date) => {
  let inTimeDay = empRecord.timeInEvents.find( day => day.date == date)
  let outTimeDay = empRecord.timeOutEvents.find( day => day.date == date)

  let inTime = inTimeDay.hour
  let outTime = outTimeDay.hour

  let hoursWorked = (outTime - inTime)/100
  let payRate = empRecord.payPerHour

  let x = hoursWorked*payRate
  return x
}

const allWagesFor = (empRecord) => {
//  need all dates from record
//  run all dates through wages wagesEarned

const days = empRecord.timeInEvents.map(day => day.date)
console.log(days)

let payArray = days.map(date => wagesEarnedOnDate(empRecord, date))
 return payArray.reduce((prev, next)=> prev+next)

}

const calculatePayroll =  (array) => {
  let payroll = array.map(emp => allWagesFor(emp))
 return payroll.reduce((prev, next) => prev + next)

}

const findEmployeeByFirstName = (array, firstName) => {
  return array.find( record => record.firstName === firstName)
}






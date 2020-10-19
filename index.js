let createEmployeeRecord = (array) => {
    let record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return record
}

let createEmployeeRecords = (array) => {
    return array.map(element => createEmployeeRecord(element))
}

let createTimeInEvent = (empRec,date) => {
    const separated = date.split(" ")
    const sepHour = parseInt(separated[1])
    const sepDate = separated[0]
    const timeInObj = {
        type: "TimeIn",
        hour: sepHour,
        date: sepDate
    }
   empRec.timeInEvents.push(timeInObj)
   return empRec
}

let createTimeOutEvent = (empRec,date) => {
    const separated = date.split(" ")
    const sepHour = parseInt(separated[1])
    const sepDate = separated[0]
    const timeOutObj = {
        type: "TimeOut",
        hour: sepHour,
        date: sepDate
    }
   empRec.timeOutEvents.push(timeOutObj)
   return empRec
}

let hoursWorkedOnDate = (empRec,date) => {
    const empInEvent = empRec.timeInEvents.find(event => event.date == date)
    const empOutEvent = empRec.timeOutEvents.find(event => event.date == date)
    const hoursWorked = (empOutEvent.hour - empInEvent.hour) / 100
    return hoursWorked
}

let wagesEarnedOnDate = (empRec,date) => {
    const hours = hoursWorkedOnDate(empRec,date)
    const pay = hours * empRec.payPerHour
    return pay
}

let allWagesFor = (empRec) => {
    const allDates = empRec.timeInEvents
    const allTotals = allDates.map(event => wagesEarnedOnDate(empRec,event.date))
    const reducer = (acc, value) => acc + value;
    const totalPay = allTotals.reduce(reducer)
    return totalPay
}

let findEmployeeByFirstName = (srcArray,firstName) => {
    return srcArray.find(emp => emp.firstName == firstName)
}

let calculatePayroll = (array) => {
    const eachPay = array.map(empRec => allWagesFor(empRec))
    const reducer = (acc,value) => acc + value;
    const totalPayroll = eachPay.reduce(reducer)
    return totalPayroll
}
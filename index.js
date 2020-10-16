// Your code here
const createEmployeeRecord = (employeeArr) => {
    let employeeObj = {
        firstName: employeeArr[0],
        familyName: employeeArr[1],
        title: employeeArr[2],
        payPerHour: employeeArr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    return employeeObj
}

const createEmployeeRecords = (arrOfArrs) => {
    let empObjArr = []
    for(const empArr of arrOfArrs){
        empObjArr.push(createEmployeeRecord(empArr))
    }
    return empObjArr
}

const createTimeInEvent = (empObj, dateString) => {
    let {timeInEvents} = empObj
    let timeInObj = {
        type: "TimeIn",
        hour: parseInt(dateString.split(' ')[1]),
        date: dateString.split(' ')[0]
    }

    timeInEvents.push(timeInObj)
    return empObj
}

const createTimeOutEvent = (empObj, dateString) => {
    let {timeOutEvents} = empObj
    let timeoutObj = {
        type: "TimeOut",
        hour: parseInt(dateString.split(' ')[1]),
        date: dateString.split(' ')[0]
    }

    timeOutEvents.push(timeoutObj)
    return empObj
}

const hoursWorkedOnDate = (empObj, dateString) => {
    let timeIn = empObj.timeInEvents.find(timeObj => timeObj.date == dateString).hour
    let timeOut = empObj.timeOutEvents.find(timeObj => timeObj.date == dateString).hour
    // console.log(timeIn, timeOut)
    let almostHour = String(timeOut - timeIn).split('')
    // console.log(almostHour)
    if (almostHour.length > 3){
        return parseInt(almostHour[0] + almostHour[1])
    }else{
        return parseInt(almostHour[0])
    }
}

//         let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 1000])
//         let timein = createTimeInEvent(cRecord, "0044-03-15 0900")
//         let timeout = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(hoursWorkedOnDate(cRecord, "0044-03-15"))

const wagesEarnedOnDate = (empObj, dateString) => {
    let hrsWorked = hoursWorkedOnDate(empObj,dateString)
    return hrsWorked * empObj.payPerHour
}

const allWagesFor = (empObj) => {
    let pay = 0
    let dates = empObj.timeInEvents
    let dateArr = dates.map(dateObj => dateObj.date)
    for(const date of dateArr){
        pay = pay + wagesEarnedOnDate(empObj,date)
    }
    return pay
}

//         let cRecord = createEmployeeRecord(["Julius", "Caesar", "General", 27])
//         // Earns 324
//         let timeinI = createTimeInEvent(cRecord, "0044-03-14 0900")
//         let timeoutI = createTimeOutEvent(cRecord, "0044-03-14 2100")
//         // Earns 54
//         let timeinII = createTimeInEvent(cRecord, "0044-03-15 0900")
//         let timeoutII = createTimeOutEvent(cRecord, "0044-03-15 1100")
// console.log(allWagesFor(cRecord))

const findEmployeeByFirstName = (srcArr, firstName) => {
    return srcArr.find(obj => obj.firstName == firstName)
}

const calculatePayroll = (empArr) => {
    let payRoll = 0
    for(const employee of empArr){
        payRoll = payRoll + allWagesFor(employee)
    }
    return payRoll
}
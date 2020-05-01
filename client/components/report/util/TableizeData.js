export default class TableizeData {
  constructor(data) {
    const {locals, attendance, services} = data
    this.locals = locals
    this.attendance = attendance
    this.services = services
    this.table = this.headers = []

    //Tableizer Created
    this.pushHeaders()
    this.run()
  }

  // create header
  pushHeaders = () => {
    const headersArr = [
      'Id',
      'Last Name',
      'First Name',
      'Local',
      'Area-Group',
      'CFO',
      'Officer',
      'Gender'
    ]

    this.headers = [...headersArr, ...this.createServicesHeading()]
    this.table = [...this.table, ...this.headers]
  }

  // services need to be in a certain format - this formats datetime
  createServicesHeading = () => {
    const serviceDateTimeArray = this.services.map(s => s.dateTime)

    const formatServiceDateTime = dateTime =>
      new Date(
        new Date(dateTime).getTime() +
          new Date(Date.now()).getTimezoneOffset() * 60000
      ).toLocaleTimeString('en-US', {
        weekday: 'short',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })

    const serviceHeading = serviceDateTimeArray.map(dateTime =>
      formatServiceDateTime(dateTime)
    )

    return serviceHeading
  }

  // PUSH DATAPOINTS

  // create member info

  // create service attendances

  // render

  run = () => {
    console.log('Running =================================')
    console.log(this.table)
    console.info(this.attendance)
    console.log('Run Complete ============================')
  }
}

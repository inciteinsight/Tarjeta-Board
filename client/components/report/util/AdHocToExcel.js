// const XLSX = require('xlsx')
import XLSX from 'xlsx'

export const adhocToExcelDownload = table => {
  let adhocReportExcel = XLSX.utils.book_new()
  const adhocReportSheetName = 'Attendance'

  adhocReportExcel.SheetNames.push(adhocReportSheetName)
  adhocReportExcel.Sheets[adhocReportSheetName] = XLSX.utils.aoa_to_sheet(table)
  XLSX.writeFile(adhocReportExcel, `${adhocReportSheetName}.xlsx`)
}

/**
 * Sample from Project Carmichael
 */

// const OrderRequestToExcel = state => {
//     const {
//       InvoiceNumber,
//       SelectedCustomer,
//       DeliveryTime,
//       Freight,
//       TotalCost,
//       TotalRevenue,
//       Cart
//     } = state
//     let wb = XLSX.utils.book_new()
//     wb.SheetNames.push('InvoiceDetails')

//     let data = [
//       ['Invoice Number: ', InvoiceNumber],
//       ['Customer ID: ', SelectedCustomer],
//       ['Date Ordered: ', Date(Date.now()).slice(0, 15)],
//       [
//         'Date Required: ',
//         String(new Date(Date.now() + DeliveryTime * 24 * 60 * 60 * 1000)).slice(
//           0,
//           15
//         )
//       ],
//       ['Freight:', `$${(Freight / 100).toFixed(2)}`],
//       ['Total Cost: ', `$${(TotalCost / 100).toFixed(2)}`],
//       ['Total Revenue: ', `$${(TotalRevenue / 100).toFixed(2)}`],
//       []
//     ]

//     let cartProps = Object.keys(Cart[0])

//     data.push(cartProps)

//     for (let i = 0; i < Cart.length; i++) {
//       let {
//         ProductID,
//         ProductName,
//         UnitCost,
//         UnitRevenue,
//         Quantity,
//         GrossProfitMargin,
//         ProductCost,
//         ProductRevenue
//       } = Cart[i]

//       data.push([
//         ProductID,
//         ProductName,
//         `$${(UnitCost / 100).toFixed(2)}`,
//         `$${(UnitRevenue / 100).toFixed(2)}`,
//         Quantity,
//         GrossProfitMargin,
//         `$${(ProductCost / 100).toFixed(2)}`,
//         `$${(ProductRevenue / 100).toFixed(2)}`
//       ])
//     }

//     let ws = XLSX.utils.aoa_to_sheet(data)
//     wb.Sheets['InvoiceDetails'] = ws

//     XLSX.writeFile(wb, OrderRequestPath)
//   }

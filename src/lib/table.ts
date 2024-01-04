// Example
// ┌──────┬───────┐
// │ data │ data2 │
// ├──────┼───────┤
// │ data │ data2 │
// ├──────┼───────┤
// │ data │ data2 │
// └──────┴───────┘

interface ColumnData {
  headerName: string
  field: string
}

type ColumnDef = Record<string, string | number>

type ColumnsMaxLenght = Record<string, number>

interface TableProps {
  columnsData: ColumnData[]
  columnsDef: ColumnDef[]
}

const columnsData: ColumnData[] = [
  { headerName: 'Id header', field: 'id' },
  { headerName: 'Text header', field: 'text' },
  { headerName: 'mambo header', field: 'mambo' },
  { headerName: 'Test', field: 'test' },
  { headerName: 'Paco', field: 'paco' },
]

const columnsDef: ColumnDef[] = [
  { id: 1, text: 'Hola mundo', mambo: 'asdasdasdasdasdasd', test: 'hola' },
  { id: 2, text: 'Hola texto', mambo: 'asdasd3', paco: 'prueba' },
  { id: 3, text: 'Hola texto', mambo: 'asdasd3', paco: 'prueba' },
]

const topLeft = '┌'
const topRight = '┐'
const verticalTopLine = '┬'
const middleRightLine = '┤'
const middleLeftLine = '├'
const horizontalTLine = '┼'
const horizontalLine = '─'
const bottomLeft = '└'
const bottomRight = '┘'
const bottomLine = '┴'
const verticalLine = '│'
const space = ' '

export function renderTable({ columnsData, columnsDef }: TableProps) {
  const maxLengths = getMaxColumnLengths({ columnsData, columnsDef })
  const header = renderHeader({ columnsData, maxLengths })
  const cells = renderRows({ columnsData, columnsDef, maxLengths })
  console.log(header)
  console.log(cells)
}

function renderRows({
  columnsData,
  columnsDef,
  maxLengths,
}: {
  columnsData: ColumnData[]
  columnsDef: ColumnDef[]
  maxLengths: ColumnsMaxLenght
}): string {
  const columnsToRender = columnsData.map(d => d.field)
  const tableData = columnsDef.map(data => {
    const columnsFiltered: any = {}
    columnsToRender.map(column => {
      columnsFiltered[column] = data[column] ?? ''
      return undefined
    })
    return columnsFiltered
  })

  let render = ''
  let cellBottomEnd = bottomLeft

  tableData.forEach((row: Record<string, number | string>, rowIndex) => {
    let cell = verticalLine
    let cellBottom = middleLeftLine

    Object.entries(row).forEach(
      ([data, value]: [string, any], index, array) => {
        const restOfText = maxLengths[data] - String(value).length
        cell += `${space}${value}${space.repeat(
          restOfText,
        )}${space}${verticalLine}`
        cellBottom += `${horizontalLine.repeat(maxLengths[data] + 2)}${
          index === array.length - 1 ? middleRightLine : horizontalTLine
        }`

        if (rowIndex === 0) {
          cellBottomEnd += `${horizontalLine.repeat(maxLengths[data] + 2)}${
            index === array.length - 1 ? bottomRight : bottomLine
          }`
        }
      },
    )

    render += `${cell}\n${
      rowIndex === tableData.length - 1 ? cellBottomEnd : cellBottom
    }\n`
  })

  return render
}

function renderHeader({
  columnsData,
  maxLengths,
}: {
  columnsData: ColumnData[]
  maxLengths: ColumnsMaxLenght
}): string {
  let headerTop = topLeft
  let headerText = verticalLine
  let headerBottom = middleLeftLine
  for (const data of columnsData) {
    const index = columnsData.indexOf(data)
    const restOfText = maxLengths[data.field] - data.headerName.length
    headerText += `${space}${data.headerName}${space.repeat(
      restOfText,
    )}${space}${verticalLine}`
    headerTop += `${horizontalLine}${horizontalLine.repeat(
      maxLengths[data.field],
    )}${horizontalLine}${
      index === columnsData.length - 1 ? topRight : verticalTopLine
    }`
    headerBottom += `${horizontalLine}${horizontalLine.repeat(
      maxLengths[data.field],
    )}${horizontalLine}${
      index === columnsData.length - 1 ? middleRightLine : horizontalTLine
    }`
  }

  const render = `${headerTop}\n${headerText}\n${headerBottom}`
  return render
}

function getMaxColumnLengths({
  columnsData,
  columnsDef,
}: TableProps): ColumnsMaxLenght {
  const columnsLengths: Record<string, number[]> = {}

  columnsData.forEach((column: ColumnData) => {
    columnsLengths[column.field] = [column.headerName.length]
  })

  columnsDef.forEach((column: Record<string, any>) => {
    Object.entries(column).forEach(([key, value]: [string, any]) => {
      if (columnsLengths[key]) {
        columnsLengths[key].push(value.toString().length as number)
      }
    })
  })

  const columnsMaxLenghts: ColumnsMaxLenght = {}

  Object.entries(columnsLengths).forEach(([key, values]) => {
    columnsMaxLenghts[key] = Math.max(...values)
  })

  return columnsMaxLenghts
}

renderTable({ columnsData, columnsDef })

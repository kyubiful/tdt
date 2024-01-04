// Example
// ┌──────┬───────┐
// │ data │ data2 │
// ├──────┼───────┤
// │ data │ data2 │
// ├──────┼───────┤
// │ data │ data2 │
// └──────┴───────┘

interface columnData {
  headerName: string
  field: string
}

interface TableProps {
  columnsData: columnData[]
  columnsDef: any[]
}

const columnsData: columnData[] = [
  { headerName: 'Id header', field: 'id' },
  { headerName: 'Text header', field: 'text' },
  { headerName: 'mambo header', field: 'mambo' },
  { headerName: 'Test', field: 'test' },
  { headerName: 'Paco', field: 'paco' },
]

const columnsDef: any = [
  { id: 1, text: 'Hola mundo', mambo: 'asdasdasdasdasdasd', test: 'hola' },
  { id: 2, text: 'Hola texto', mambo: 'asdasd3', paco: 'prueba' },
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

function renderTable({ columnsData, columnsDef }: TableProps) {
  const maxLengths = getMaxColumnLengths({ columnsData, columnsDef })
  const header = renderHeader({ columnsData, maxLengths })
  const cells = renderCells({ columnsData, columnsDef, maxLengths })
  console.log(header)
  console.log(cells)
}

function renderCells({
  columnsData,
  columnsDef,
  maxLengths,
}: {
  columnsData: columnData[]
  columnsDef: any[]
  maxLengths: any
}) {
  const t = columnsData.map(d => d.field)
  const test = columnsDef.map(data => {
    const r: any = {}
    t.map(d => {
      r[d] = data[d] === undefined ? '' : data[d]
      return undefined
    })
    return r
  })

  let render = ''
  let cellBottomEnd = bottomLeft
  let rowIndex = 0
  for (const row of test) {
    let cell = verticalLine
    let cellBottom = middleLeftLine
    let index = 0
    for (const data in row) {
      const restOfText = maxLengths[data] - row[data].toString().length
      cell += `${space}${row[data]}${space.repeat(
        restOfText,
      )}${space}${verticalLine}`
      cellBottom += `${horizontalLine}${horizontalLine.repeat(
        maxLengths[data] as number,
      )}${horizontalLine}${
        index === Object.keys(row as object).length - 1
          ? middleRightLine
          : horizontalTLine
      }`
      if (rowIndex === 0) {
        cellBottomEnd += `${horizontalLine}${horizontalLine.repeat(
          maxLengths[data] as number,
        )}${horizontalLine}${
          index === Object.keys(row as object).length - 1
            ? bottomRight
            : bottomLine
        }`
      }

      index++
    }
    rowIndex++
    render +=
      cell +
      '\n' +
      (rowIndex === Object.keys(columnsDef).length - 1
        ? cellBottom
        : cellBottomEnd) +
      '\n'
  }
  return render
}

function renderHeader({
  columnsData,
  maxLengths,
}: {
  columnsData: columnData[]
  maxLengths: any
}) {
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
      maxLengths[data.field] as number,
    )}${horizontalLine}${
      index === columnsData.length - 1 ? topRight : verticalTopLine
    }`
    headerBottom += `${horizontalLine}${horizontalLine.repeat(
      maxLengths[data.field] as number,
    )}${horizontalLine}${
      index === columnsData.length - 1 ? middleRightLine : horizontalTLine
    }`
  }

  const render = `${headerTop}\n${headerText}\n${headerBottom}`
  return render
}

function getMaxColumnLengths({ columnsData, columnsDef }: TableProps) {
  const columnsLengths: Record<string, number[]> = {}

  columnsData.forEach((column: columnData) => {
    columnsLengths[column.field] = [column.headerName.length]
  })

  columnsDef.forEach((column: Record<string, any>) => {
    Object.entries(column).forEach(([key, value]: [string, any]) => {
      if (columnsLengths[key]) {
        columnsLengths[key].push(value.toString().length as number)
      }
    })
  })

  const columnsMaxLenghts: Record<string, number> = {}

  Object.entries(columnsLengths).forEach(([key, values]) => {
    columnsMaxLenghts[key] = Math.max(...values)
  })

  return columnsMaxLenghts
}

renderTable({ columnsData, columnsDef })

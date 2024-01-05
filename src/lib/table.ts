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

const BOX_DRAWING_CHARACTERS = Object.freeze({
  TOP_LEFT: '┌',
  TOP_RIGHT: '┐',
  TOP_SEPARATOR: '┬',
  MIDDLE_LEFT: '├',
  MIDDLE_RIGHT: '┤',
  MIDDLE_SEPARATOR: '┼',
  HORIZONTAL_LINE: '─',
  BOTTOM_LEFT: '└',
  BOTTOM_RIGHT: '┘',
  BOTTOM_CENTER: '┴',
  VERTICAL_LINE: '│',
  SPACE: ' ',
})

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
  let cellBottomEnd = BOX_DRAWING_CHARACTERS.BOTTOM_LEFT

  tableData.forEach((row: Record<string, number | string>, rowIndex) => {
    let cell = BOX_DRAWING_CHARACTERS.VERTICAL_LINE
    let cellBottom = BOX_DRAWING_CHARACTERS.MIDDLE_LEFT

    Object.entries(row).forEach(
      ([data, value]: [string, any], index, array) => {
        const restOfText = maxLengths[data] - String(value).length
        cell += `${
          BOX_DRAWING_CHARACTERS.SPACE
        }${value}${BOX_DRAWING_CHARACTERS.SPACE.repeat(restOfText)}${
          BOX_DRAWING_CHARACTERS.SPACE
        }${BOX_DRAWING_CHARACTERS.VERTICAL_LINE}`
        cellBottom += `${BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE.repeat(
          maxLengths[data] + 2,
        )}${
          index === array.length - 1
            ? BOX_DRAWING_CHARACTERS.MIDDLE_RIGHT
            : BOX_DRAWING_CHARACTERS.MIDDLE_SEPARATOR
        }`

        if (rowIndex === 0) {
          cellBottomEnd += `${BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE.repeat(
            maxLengths[data] + 2,
          )}${
            index === array.length - 1
              ? BOX_DRAWING_CHARACTERS.BOTTOM_RIGHT
              : BOX_DRAWING_CHARACTERS.BOTTOM_CENTER
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
  let headerTop = BOX_DRAWING_CHARACTERS.TOP_LEFT
  let headerText = BOX_DRAWING_CHARACTERS.VERTICAL_LINE
  let headerBottom = BOX_DRAWING_CHARACTERS.MIDDLE_LEFT
  for (const data of columnsData) {
    const index = columnsData.indexOf(data)
    const restOfText = maxLengths[data.field] - data.headerName.length
    headerText += `${BOX_DRAWING_CHARACTERS.SPACE}${
      data.headerName
    }${BOX_DRAWING_CHARACTERS.SPACE.repeat(restOfText)}${
      BOX_DRAWING_CHARACTERS.SPACE
    }${BOX_DRAWING_CHARACTERS.VERTICAL_LINE}`
    headerTop += `${
      BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE
    }${BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE.repeat(maxLengths[data.field])}${
      BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE
    }${
      index === columnsData.length - 1
        ? BOX_DRAWING_CHARACTERS.TOP_RIGHT
        : BOX_DRAWING_CHARACTERS.TOP_SEPARATOR
    }`
    headerBottom += `${
      BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE
    }${BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE.repeat(maxLengths[data.field])}${
      BOX_DRAWING_CHARACTERS.HORIZONTAL_LINE
    }${
      index === columnsData.length - 1
        ? BOX_DRAWING_CHARACTERS.MIDDLE_RIGHT
        : BOX_DRAWING_CHARACTERS.MIDDLE_SEPARATOR
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

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const holdings = [
  {
    instrument: "Bitcoin",
    actual: "46%",
    target: "45%",
    value: "€250.00",
    return: "+54",
  },
  {
    instrument: "Bitcoin",
    actual: "46%",
    target: "45%",
    value: "€250.00",
    return: "+54",
  },
  {
    instrument: "Bitcoin",
    actual: "46%",
    target: "45%",
    value: "€250.00",
    return: "+54",
  },
  {
    instrument: "Bitcoin",
    actual: "46%",
    target: "45%",
    value: "€250.00",
    return: "+54",
  },
  {
    instrument: "Bitcoin",
    actual: "46%",
    target: "45%",
    value: "€250.00",
    return: "+54",
  },
  {
    instrument: "Bitcoin",
    actual: "46%",
    target: "45%",
    value: "€250.00",
    return: "+54",
  },
  {
    instrument: "Bitcoin",
    actual: "46%",
    target: "45%",
    value: "€250.00",
    return: "+€54",
  },
]

export function HoldingsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className="uppercase">
          <TableHead className="w-2/5">Instrument</TableHead>
          <TableHead>Actual/Target</TableHead>
          <TableHead>Value</TableHead>
          <TableHead className="text-right">Return</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {holdings.map((item, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{item.instrument}</TableCell>
            <TableCell>
              {item.actual}/{item.target}
            </TableCell>
            <TableCell>{item.value}</TableCell>
            <TableCell className="text-right">{item.return}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

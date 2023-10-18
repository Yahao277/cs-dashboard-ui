import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import * as React from "react";
import {addDays} from "date-fns";

function getMonday(date: Date): Date {
  const day = date.getDay(); // 0 for Sunday, 1 for Monday, etc.
  let daysToSubtract = day - 1;
  if (day === 0) { // If the current day is Sunday
    daysToSubtract = 6; // Subtract 6 days to get to the previous Monday
  }
  return addDays(date, -daysToSubtract);
}

function getMonthFirstDay(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

const DateValues= {
    TODAY: {
      value: "today",
      range: {
        from: new Date(),
        to: addDays(new Date(), 0),
      }
    },
    YESTERDAY: {
      value: "yesterday",
      range: {
        from: addDays(new Date(), -1),
        to: new Date(),
      }
    },
    LAST_3_DAYS: {
      value: "last3days",
      range: {
        from: addDays(new Date(), -3),
        to: new Date(),
      }
    },
    LAST_WEEK: {
      value: "lastweek",
      range: {
        from: getMonday(new Date()),
        to: new Date(),
      }
    },
  LAST_MONTH: {
    value: "lastmonth",
    range: {
      from: getMonthFirstDay(new Date()),
      to: new Date(),
    }
  }
  }


export const DateRangeSelect = ({ onSelect }: any) => {

  const dateRange = {
    from: new Date(),
    to: addDays(new Date(), 0),
  }
  const handleValue = (value: string) => {
    console.log(value);
    const val = Object.entries(DateValues).find(([key, val]) => val.value === value);
    const range = val ? val[1].range : DateValues.TODAY.range; // default value is today
    onSelect(range);
  }
  return (
    <Select defaultValue="today" onValueChange={handleValue}>
      <SelectTrigger className="w-[180px] mx-auto mt-1">
        <SelectValue placeholder="Hoy" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="today">Hoy</SelectItem>
        <SelectItem value="yesterday">Ayer</SelectItem>
        <SelectItem value="last3days">Últimos 3 días</SelectItem>
        <SelectItem value="lastweek">Última semana</SelectItem>
        <SelectItem value="lastmonth">Último mes</SelectItem>
        <SelectItem value="custom">Rango</SelectItem>
      </SelectContent>
    </Select>
  );
}

export default DateRangeSelect;
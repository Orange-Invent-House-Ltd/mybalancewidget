import { format, parseISO, isValid } from 'date-fns';

export const DateTime = ({ dateString }: { dateString: string | undefined }) => {
  if (!dateString) {
    return <span>Loading...</span>;
  }

  const date = parseISO(dateString);

  if (!isValid(date)) {
    return <span>Invalid date</span>;
  }

  return <span>{format(date, "MMM dd, yyyy | hh:mma")}</span>;
};
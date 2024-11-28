export function convertDate(inputDate: string) {
  // Month names array
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June', 
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Function to get the ordinal suffix
  function getOrdinalSuffix(day: number): string {
    if (day > 3 && day < 21) return 'th'; // covers 4th to 20th
    switch (day % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  }
  if(inputDate){
  // Split the input date
  const [year, month, day] = inputDate?.split('-')?.map(Number);

  // Get the month name
  const monthName = months[month - 1];

  // Get the ordinal day
  const dayWithSuffix = `${day}${getOrdinalSuffix(day)}`;

  // Return the formatted date
  return `${dayWithSuffix} ${monthName}, ${year}`;
  }
}
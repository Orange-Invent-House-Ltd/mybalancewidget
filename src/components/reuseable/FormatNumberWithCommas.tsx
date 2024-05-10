
const FormatNumberWithCommas = ({number}:any) => {
  // Convert the number to a string with fixed two decimal places
  const formattedNumber = Number(number).toFixed(2);

  // Split the string into two parts: integer part and decimal part
  const parts = formattedNumber.split(".");

  // Add comma separators for thousands in the integer part
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  // Join the integer part and decimal part back together
  return parts.join(".");
 
}

export default FormatNumberWithCommas
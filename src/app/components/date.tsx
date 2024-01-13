export default function DateTime() {
  const currentDate = new Date();
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    weekday: "long",
  };
  const foramtedDate = currentDate.toLocaleDateString("en-us", options);
  return <h2 className="text-2xl text-yellow-hy mt-2">{foramtedDate}</h2>;
}

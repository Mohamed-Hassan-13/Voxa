const HandleCreatedAt = (timestamp) => {
  const milliseconds =
    timestamp.seconds * 1000 + timestamp.nanoseconds / 1_000_000;
  const date = new Date(milliseconds);

  // تحويل الوقت لـ 12 ساعة
  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // تحويل 0 إلى 12

  const time = `${hours}:${minutes} ${ampm}`;
  return time;
};

export default HandleCreatedAt;

// Darksky automatically converts to seconds for us -
// this just converts the timestamp back to ms and 
// calls new date on it
function formatDate(timestamp){
  return new Date(timestamp * 1000);
}

function formatTime(timestamp){
  const d = formatDate(timestamp);
  const hr = d.getHours();
  const min = d.getMinutes();
  return `${hr}:${('0' + min).slice(-2)}`;
}

function formatDay(timestamp){
  const d = formatDate(timestamp);
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const mons = ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May','Jun.', 'Jul.', 'Aug.', 'Sep.', 'Oct.', 'Nov.', 'Dec.' ];
  const day = days[d.getDay()]; // day of week
  const date = d.getDate(); // day of month
  const mon = mons[d.getMonth()];
  const yr = d.getFullYear();

  return `${day}, ${mon} ${date}, ${yr}`;
}

module.exports = {
  formatDate: formatDate,
  formatTime: formatTime,
  formatDay: formatDay
}
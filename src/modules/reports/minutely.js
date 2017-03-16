module.exports = function minutelyReport(data){
  const minutes = data.minutely;
  const summary = minutes.summary;
  return summary;
};

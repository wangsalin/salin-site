function getNextVisitDate(lastDateStr) {
  const lastDate = new Date(lastDateStr);
  const nextVisit = new Date(lastDate.getTime() + 21 * 24 * 60 * 60 * 1000);
  return nextVisit.toISOString().split('T')[0];
}
module.exports = { getNextVisitDate };
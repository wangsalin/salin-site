function scanCompliance(text, forbiddenList) {
  return forbiddenList.filter(w => text.includes(w));
}
module.exports = { scanCompliance };
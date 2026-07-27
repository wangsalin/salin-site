function formatReply(text) {
  let cleaned = text.replace(/非常抱歉给您带来不便/g, '实在对不住客官');
  if (cleaned.length > 180) {
    cleaned = cleaned.substring(0, 175) + '...欢迎私信大叔！';
  }
  return cleaned;
}
module.exports = { formatReply };
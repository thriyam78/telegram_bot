const startedChats = new Set();

function handleStart(bot, msg) {
  const chatId = msg.chat.id;

  if (!startedChats.has(chatId)) {
    bot.sendMessage(chatId, "Welcome! What is your name?");
    startedChats.add(chatId);
  }
}

module.exports = { handleStart };

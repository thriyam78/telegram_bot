const User = require("../models/userModel");

const state = {};

async function userMessageController(bot, msg) {
  const chatId = msg.chat.id;
  const text = msg.text;

  const user = await User.findOne({ chatId: chatId });

  if (!user) {
    if (state[chatId]) {
      const currentState = state[chatId];

      if (!currentState.name) {
        currentState.name = text;
        bot.sendMessage(chatId, "Great! Now, what city are you from?");
      } else if (!currentState.city) {
        currentState.city = text;
        bot.sendMessage(chatId, "Awesome! Finally, what country are you from?");
      } else if (!currentState.country) {
        currentState.country = text;

        const newUser = await User.create({
          chatId: chatId,
          name: currentState.name,
          city: currentState.city,
          country: currentState.country,
          role: "USER",
        });

        delete state[chatId];

        bot.sendMessage(chatId, "Thank you for providing your information.");
      }
    } else if (text === "/start") {
      state[chatId] = {};
      // bot.sendMessage(chatId, "Welcome! What is your name?");
    }
  } else {
    bot.sendMessage(chatId, `Hello ${user.name}`);
  }
}

module.exports = { userMessageController };

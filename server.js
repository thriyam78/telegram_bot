const TelegramBot = require("node-telegram-bot-api");
const dotenv = require("dotenv");
const User = require("./models/userModel");
dotenv.config({ path: "./.env" });
const { dbConnect } = require("./database/dbConfig");
const { handleStart } = require("./handlers/userMessageHandler");
const { userMessageController } = require("./controller/userMessageController");
const { weatherUpdate } = require("./controller/weatherController");

dbConnect();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

bot.onText(/\/start/, (msg) => {
  handleStart(bot, msg);
});
bot.on("message", (msg) => {
  userMessageController(bot, msg);
});

bot.onText(/\/weather/, async (msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ chatId: chatId });

  try {
    if (user) {
      const city = user.city;

      const weather = await weatherUpdate(city);
      const resultCity = weather.city;
      const cityName = resultCity.toUpperCase();
      bot.sendMessage(
        chatId,
        `TODAY'S WEATHER IN ${cityName}
    1) Temprature: ${weather.weather.temp}°C
    2) Humidity: ${weather.weather.humidity}°C`
      );
    } else {
      bot.sendMessage("Please type /start to register in these bot");
    }
  } catch (error) {
    console.error("Error fetching weather:", error);
    bot.sendMessage(chatId, "Error fetching weather data.");
  }
});

bot.onText(/\/admin/, async (msg) => {
  const chatId = msg.chat.id;
  const user = await User.findOne({ chatId: chatId });
  try {
    if (user) {
      const role = user.role;

      if (role === "ADMIN") {
        bot.sendMessage(
          chatId,
          `
        Here is your ChatID:${chatId}
        Please use this chat ID for API calls in the admin panel
        `
        );
      } else {
        bot.sendMessage(
          chatId,
          "Please type /start to register your details,You're not an ADMIN"
        );
      }
    } else {
      bot.sendMessage(
        chatId,
        "Please type /start to register your details.You're not an ADMIN"
      );
    }
  } catch (error) {
    bot.sendMessage(
      chatId,
      "Something went wrong..Please try again later",
      error
    );
  }
});

console.log("Bot is running...");

telegram_bot

This is a telegram where user can register their details and get a weather update from the bot. Additional feature Admin Panel for handling Users

Setting up the project:

.env file:
DATABASE_URI=your_db_connection_string
BOT_TOKEN=your_telegram_bot_token
WEATHER_API_KEY=your_weather_api_key 

Run the command for starting the bot:
npm run dev - This will lauch the telegram bot.Open your telegram and iteract with this bot

Run the command for starting the admin Panel:
npm run start/npm start- This will start the admin Panel 

Once the admin Panel follow the instructions:

For accessing admin Panel you should be a admin. For that you have create the details through telegram bot and change the role into ADMIN

API request example in Postman:

http://127.0.0.1:8001/user/blockUser/"Your_Chat_ID"

You can create a command in your telegram_bot by using BotFather settings to set up the command. This will help you minimize the typing time

import TelegramBot from "node-telegram-bot-api";
import { ChatbotCore } from "../../chatbots/chatbot.core";


export class TelegramAdapter {
    static async connect(channelAuth, channelContext) {
        const bot = new TelegramBot(
            channelAuth.token, {polling: true}
        )

        bot.on('message', TelegramAdapter.handleEvent(channelContext, bot));
        return bot;
    }

    static async disconnect(bot) {
        await bot.stopPolling();
    }

    static handleEvent(channelContext, bot) {
        return async function(context) {
            if (context.chat.type !== 'private') {
                return;
            }

            const messageContext = {
                ...channelContext,
                chatId: context.chat.id,
                userId: context.from.id,
                text: context.text,
            }

            const responseContext = await ChatbotCore.resolveResponse(messageContext)
            TelegramAdapter.performResponse({bot, chatId: messageContext.chatId}, responseContext);
        }
    }

    static async performResponse({bot, chatId}, responseContext) {
        await bot.sendMessage(chatId, responseContext);
    }
}

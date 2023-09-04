import { VK } from "vk-io";
import { ChatbotCore } from "../../chatbots/chatbot.core";


export class VkAdapter {
    static async connect(channelAuth, channelContext) {
        const vk = new VK({
            token: channelAuth.token,
            pollingGroupId: channelAuth.groupId
        });

        vk.updates.on('message_new', VkAdapter.handleEvent(channelContext));
        await vk.updates.startPolling();

        return vk;
    }

    static async disconnect(connection) {
        await connection.updates.stop();
    }

    static handleEvent(channelContext) {
        return async function(context) {
            if (context.senderType === 'group' ||
                context.isOutbox) {
                return;
            }

            const messageContext = {
                ...channelContext,
                userId: context.senderId,
                channelUserId: context.senderId,
                text: context.text,
                message: context.text,
                createdAt: context.createdAt
            }

            // console.log(context);
            const response = await ChatbotCore.resolveResponse(messageContext)
            VkAdapter.performResponse(context, response);
        }
    }

    static async performResponse(context, response) {
        await context.send(response);
    }
}

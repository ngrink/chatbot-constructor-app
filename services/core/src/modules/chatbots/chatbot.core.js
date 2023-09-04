import { $axios } from "../../utils/axios/axios.js";
import { ConfigStore } from "../configs/config.store.js";
import { StateStore } from "../state/state.store.js";
import { ConfigResolver } from "../configs/config.resolver.js";


export class ChatbotCore {
  static users = []

  static async resolveResponse(context) {
      const config = await ConfigStore.getConfig(context.projectId)
      const state = await StateStore.getUserState(context.userId);

      const response = ConfigResolver.resolveResponse(context, config, state)
      ChatbotCore.logMessage({...context, answer: response})

      return response
  }

  static async logMessage(context) {
    $axios.post(`/newMessage`, context)
      .catch(e => {
        console.log(e);
        setTimeout(() => ChatbotCore.logMessage(context), 10000)
      })

    console.log(context.projectId, context.userId, context.text)
  }
}

interface IChatbot {
    id: string,
    accountId: string,
    configId: string,
    name: string,
    tags: string[],
    status: "active" | "error" | "warning" | "disabled",
    usersCount: number,
    messagesCount: number,
    connectedChannels: string[]
    createdAt: string,
    __v: number,
}

export type { IChatbot };

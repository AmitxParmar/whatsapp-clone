type IUserProfile = {
    id?: number
    name: string | null
    email: string | null | undefined
    profilePicture: string | null
    about?: string | null
}

type IMessage = {
    id: string
    type: "text" | "file"
    message: string
    recieverId: number
    senderId: number
    messageStatus: "sent" | "delivered" | "read"
    sender: number
    createdAt: number
}

interface ChatState {
    currentChatUser: IUserProfile | null | undefined
    messages: IMessage[] | null | []
    addMessage: string
    socket: unknown | null
}

interface UserState {
    userInfo: IUserProfile | null
    newUser: boolean | undefined | null
    contactsPage: boolean | undefined | null
}


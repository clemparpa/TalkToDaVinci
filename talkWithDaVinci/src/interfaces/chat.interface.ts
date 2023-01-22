import { v4 as uuid } from "uuid";
import { ChatProps } from "../features/chat/chat-component";

export type Chat = {
  content: string;
  isResponse: boolean;
  id: string;
};

export const createChat = (chatProps: ChatProps): Chat => {
  return {
    content: chatProps.content,
    isResponse: chatProps.isResponse,
    id: uuid(),
  };
};

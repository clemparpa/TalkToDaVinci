import { useEffect, useState } from "react";
import { BehaviorSubject } from "rxjs";
import { ChatProps } from "../features/chat/chat-component";
import { Chat, createChat } from "../interfaces/chat.interface";
import { TextCompletionService } from "./text-completions.service";

export interface ChatServiceState {
  chat: Array<Chat>;
  loading: boolean;
  answering: boolean;
}

const initialState: ChatServiceState = {
  chat: [],
  loading: false,
  answering: false,
};

export class ChatService {
  private static instance: ChatService | null = null;

  private constructor() {}

  public static service() {
    if (!this.instance) this.instance = new ChatService();
    return this.instance;
  }

  private chatSubject = new BehaviorSubject<ChatServiceState>(initialState);
  public chat$ = this.chatSubject.asObservable();

  public askQuestion(question: string, creative: boolean = false) {
    const newChat = createChat({ content: question, isResponse: false });
    this.chatSubject.next({
      chat: [...this.chatSubject.value.chat, newChat],
      loading: true,
      answering: true,
    });
    this.answerQuestion(question, creative);
  }

  public setAnsweringFalse() {
    this.chatSubject.next({
      ...this.chatSubject.value,
      answering: false,
    });
  }

  private async answerQuestion(question: string, creative: boolean = false) {
    const service = TextCompletionService.service();
    const resp = await (!creative
      ? service.complete(question)
      : service.completeCreative(question));
    const newChat = createChat({ content: resp, isResponse: true });
    this.chatSubject.next({
      chat: [...this.chatSubject.value.chat, newChat],
      loading: false,
      answering: true,
    });
  }
}

export const useChat = (): [Chat[], boolean, boolean] => {
  const [chatState, setChatState] = useState<ChatServiceState>(initialState);

  useEffect(() => {
    const chatSub = ChatService.service().chat$.subscribe((chats) =>
      setChatState(chats)
    );
    return () => chatSub.unsubscribe();
  }, []);

  return [chatState.chat, chatState.loading, chatState.answering];
};

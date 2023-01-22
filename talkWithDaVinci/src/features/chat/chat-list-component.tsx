import { Chat } from "../../interfaces/chat.interface";
import { useChat } from "../../services/chat-service.service";
import { ChatComponent, ChatLoadingComponent } from "./chat-component";

export const ChatListComponent = () => {
  const [chat, loading, _answering] = useChat();

  return (
    <>
      {chat.map((props) => (
        <ChatComponent
          key={props.id}
          content={props.content}
          isResponse={props.isResponse}
        ></ChatComponent>
      ))}
      {loading ? <ChatLoadingComponent></ChatLoadingComponent> : null}
    </>
  );
};

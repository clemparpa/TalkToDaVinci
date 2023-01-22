import "./App.css";
import { ChatListComponent } from "./features/chat/chat-list-component";
import { ChatInputComponent } from "./features/chat/input-component";
import { Chat } from "./interfaces/chat.interface";
import { useChat } from "./services/chat-service.service";
import { TextCompletionService } from "./services/text-completions.service";

function App() {
  // useEffect( () => {
  //   TextCompletionService.service().helloWorld().then(
  //     (value) => setResp(value)
  //   )
  // },[])

  return (
    <div className="w-full h-screen bg-gray-60 relative">
      <div className="w-full h-5/6 overflow-auto">
        <ChatListComponent></ChatListComponent>
      </div>
      <div className="w-full h-1/6 min-h-fit pt-4">
        <ChatInputComponent></ChatInputComponent>
      </div>
    </div>
  );
}

export default App;

import TypeIt from "typeit-react";
import cx from "classnames";

import likeImg from "/like.svg";
import DislikeImg from "/dislike.svg";
import AvatarAIImg from "/avatar_chatgpt.svg";
import AvatarUserImg from "/avatar_user.svg";
import { ChatService } from "../../services/chat-service.service";

export type ChatProps = {
  content: string;
  isResponse: boolean;
};

export const ChatLikeButtonsComponent = ({
  isResponse,
}: {
  isResponse: boolean;
}) =>
  isResponse ? (
    <>
      <img src={likeImg} alt="like button" className="mr-3 w-4 h-4" />
      <img src={DislikeImg} alt="like button" className="w-4 h-4" />
    </>
  ) : null;

export const ChatAvatarComponent = ({
  isResponse,
}: {
  isResponse: boolean;
}) => <img src={isResponse ? AvatarAIImg : AvatarUserImg} alt="avatar IA" />;

const TypeAnimationOptions = (content: string) => ({
  strings: [content],
  speed: 50,
  waitUntilVisible: true,
  afterComplete: function (instance: any) {
    instance.destroy();
    ChatService.service().setAnsweringFalse();
  },
});

const TypeAnimationLoadingOptions = {
  strings: [""],
  speed: 50,
  waitUntilVisible: true,
};

export const ChatContentComponent = ({ content, isResponse }: ChatProps) =>
  isResponse ? (
    <p className="px-4 font-mono text-gray-10 font-medium text-base">
      <TypeIt options={TypeAnimationOptions(content)}></TypeIt>
    </p>
  ) : (
    <p className="px-4 font-mono text-gray-10 font-medium text-base">
      {content}
    </p>
  );

export const ChatContentLoadingComponent = () => (
  <p className="px-4 font-mono text-gray-10 font-medium text-base">
    <TypeIt options={TypeAnimationLoadingOptions}></TypeIt>
  </p>
);

export const ChatComponent = ({ isResponse, content }: ChatProps) => (
  <div
    className={cx("w-full py-7 flex items-center justify-center", {
      "bg-gray-50": isResponse,
      "bg-gray-60": !isResponse,
    })}
  >
    <div className="flex items-start justify-start w-3/4">
      <ChatAvatarComponent isResponse={isResponse}></ChatAvatarComponent>
      <ChatContentComponent
        content={content}
        isResponse={isResponse}
      ></ChatContentComponent>
      <ChatLikeButtonsComponent
        isResponse={isResponse}
      ></ChatLikeButtonsComponent>
    </div>
  </div>
);

export const ChatLoadingComponent = () => (
  <div className="w-full py-7 flex items-center justify-center bg-gray-50">
    <div className="flex items-start justify-start w-3/4">
      <ChatAvatarComponent isResponse={true}></ChatAvatarComponent>
      <ChatContentLoadingComponent></ChatContentLoadingComponent>
      <ChatLikeButtonsComponent isResponse={true}></ChatLikeButtonsComponent>
    </div>
  </div>
);

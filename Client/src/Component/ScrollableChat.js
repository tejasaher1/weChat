import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import { isLastMessage, isSameSender, isSameSenderMargin,isSameUser,} from "../Config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import ProfileModal from "../Component/ProfileModal"

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();
  console.log("Did we reached final - ",messages[0]);
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (

          <div style={{ display: "flex" }} key={m._id}>

            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <ProfileModal user={m.sender}>
                <Tooltip label={m.sender.Firstname} placement="bottom-start" hasArrow>
                  <Avatar  mt="7px" mr={1} size="sm" cursor="pointer" name={m.sender.Firstname + " " + m.sender.Lastname} />
                </Tooltip>
              </ProfileModal>
              
            )}

            <span
              style={{ backgroundColor: `${ m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0" }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
                  {m.content}
             
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;
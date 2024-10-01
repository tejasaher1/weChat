import { CloseIcon } from "@chakra-ui/icons";
import { Badge } from "@chakra-ui/layout";

import { ChatState } from "../Context/ChatProvider";


const UserBadgeItem = ({ user, admin, handleFunction }) => {

  return (
    <Badge px={2} py={1} borderRadius="lg" m={1} mb={2} variant="solid" fontSize={12} colorScheme="purple"
           cursor="pointer" onClick={handleFunction} >
      
      {user.Firstname + " " + user.Lastname}
      {admin?._id === user._id && <span> (Admin)</span>}

      <CloseIcon pl={1} />

    </Badge>
  );
};

export default UserBadgeItem;
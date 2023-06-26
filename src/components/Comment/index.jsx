import { useState } from "react";
import { Box, Avatar, InputBase, IconButton } from "@mui/material";
import Item from "./Item";
import Icon from "../Icons";
import PropTypes from "prop-types";
import avatar1 from "../../assets/img/avatar/1.png";

const Comment = ({ list }) => {
  const [comments, setComments] = useState(list);
  const [input, setInput] = useState();

  const handleSubmit = () => {
    setComments([...comments, { title: input, time: "Just now" }]);
    setInput("");
  };
  const handleKeyPress = (e) => {
    if (e.keyCode == 13) {
      handleSubmit();
    }
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      sx={{ height: "100%", px: "2rem", pb: "2rem" }}
    >
      <Box>
        {comments.map((comment, index) => (
          <Item key={index} comment={comment} />
        ))}
      </Box>
      <Box
        display="flex"
        gap="4rem"
        sx={{
          p: "0.2rem 0.6rem",
          borderRadius: "30rem",
          bgcolor: "#fff",
          boxShadow: "2px 4px 4px  rgba(0,0,0,0.1)",
        }}
      >
        <Box display="flex" alignItems="center" gap="2rem" flexGrow="1">
          <Avatar
            sx={{
              width: "3rem",
              height: "3rem",
            }}
            src={avatar1}
          />

          <InputBase
            fullWidth
            placeholder="Add a comment"
            sx={{ input: { color: "rgba(0,0,0,0.6)" } }}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyUp={(e) => handleKeyPress(e)}
          />
        </Box>
        <IconButton onClick={handleSubmit}>
          <Icon name="send" size={24} />
        </IconButton>
      </Box>
    </Box>
  );
};

Comment.propTypes = {
  list: PropTypes.array,
};
export default Comment;

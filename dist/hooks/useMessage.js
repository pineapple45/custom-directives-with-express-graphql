import {useState} from "../../_snowpack/pkg/react.js";
export const useMessage = ({
  messageText,
  variant,
  toShow
}) => {
  const [message, setMessage] = useState({
    toShow,
    variant,
    messageText
  });
  return [message, setMessage];
};

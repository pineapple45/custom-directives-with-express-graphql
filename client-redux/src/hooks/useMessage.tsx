import { useState } from 'react';

interface MessageType {
  messageText: string | null;
  variant: 'success' | 'error' | 'warning';
  toShow: boolean;
}

export const useMessage = ({
  messageText,
  variant,
  toShow,
}: MessageType): [
  message: MessageType,
  setMessage: ({ messageText, variant, toShow }: MessageType) => void
] => {
  const [message, setMessage] = useState<MessageType>({
    toShow,
    variant,
    messageText,
  });

  return [message, setMessage];
};

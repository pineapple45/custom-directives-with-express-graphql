import { useState } from 'react';

export interface MessageProps {
  messageText: string | null;
  variant: 'success' | 'error' | 'warning';
  toShow: boolean;
}

export const useMessage = ({
  messageText,
  variant,
  toShow,
}: MessageProps): [
  message: MessageProps,
  setMessage: ({ messageText, variant, toShow }: MessageProps) => void
] => {
  const [message, setMessage] = useState<MessageProps>({
    toShow,
    variant,
    messageText,
  });

  return [message, setMessage];
};

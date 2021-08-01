import { makeStyles } from '@material-ui/core';
import { MessageProps } from '../hooks/useMessage';

export const checkIfUserIsNotAuthenticated = (
  isLoggedIn: () => boolean,
  setMessage: ({ messageText, variant, toShow }: MessageProps) => void
) => {
  if (!isLoggedIn()) {
    setMessage({
      toShow: true,
      variant: 'error',
      messageText: 'Unauthenticated access',
    });
    return true;
  }

  return false;
};

export const commonStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
  },
  cardMedia: {
    paddingTop: '56.25%', // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(6),
  },
}));

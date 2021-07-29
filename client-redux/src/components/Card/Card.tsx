import React from 'react';
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button,
  makeStyles,
  Box,
} from '@material-ui/core';

interface CardType {
  media?: {
    image: string;
    alt: string;
  };
  cardHeading: string;
  cardBody?: string;
}

const useStyles = makeStyles((theme) => ({
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
}));

const Card: React.FC<CardType> = ({
  cardHeading,
  cardBody,
  media,
  children,
}) => {
  const classes = useStyles();
  return (
    <MuiCard className={classes.card}>
      {media && (
        <CardMedia
          className={classes.cardMedia}
          image={media?.image}
          title={media?.alt}
        />
      )}
      <CardContent className={classes.cardContent}>
        <Typography gutterBottom variant="h5" component="h2">
          {cardHeading}
        </Typography>
        <Typography>{cardBody}</Typography>
      </CardContent>
      {children}
    </MuiCard>
  );
};

export default Card;

import React from "../../pkg/react.js";
import {
  Card as MuiCard,
  CardMedia,
  CardContent,
  Typography,
  makeStyles
} from "../../pkg/@material-ui/core.js";
const useStyles = makeStyles((theme) => ({
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column"
  },
  cardMedia: {
    paddingTop: "56.25%"
  },
  cardContent: {
    flexGrow: 1
  }
}));
const Card = ({
  cardHeading,
  cardBody,
  media,
  children
}) => {
  const classes = useStyles();
  return /* @__PURE__ */ React.createElement(MuiCard, {
    className: classes.card
  }, media && /* @__PURE__ */ React.createElement(CardMedia, {
    className: classes.cardMedia,
    image: media?.image,
    title: media?.alt
  }), /* @__PURE__ */ React.createElement(CardContent, {
    className: classes.cardContent
  }, /* @__PURE__ */ React.createElement(Typography, {
    gutterBottom: true,
    variant: "h5",
    component: "h2"
  }, cardHeading), /* @__PURE__ */ React.createElement(Typography, null, cardBody)), children);
};
export default Card;

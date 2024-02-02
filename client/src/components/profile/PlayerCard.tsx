import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { UserDetails } from "../../interfaces";

import "./PlayerCard.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  user: UserDetails;
}

export default function PlayerCard(props: IProps) {
  const user = useContext(UserContext);

  return (
    <React.Fragment>
      <Card className="card">
        <div className="avatar">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt="avatar"
          />
        </div>
        <CardHeader
          title={props.user.name}
          subheader={
            user.user?.instruments.get(props.user.instrument)?.name !== "singer"
              ? `Plays the ${
                  user.user?.instruments.get(props.user.instrument)?.name
                }. From ${props.user.location}`
              : `Singer. From ${props.user.location}`
          }
          className="header"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.user.bio}
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  );
}

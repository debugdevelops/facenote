import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { UserDetails } from "../../interfaces";

import "./PlayerCard.css";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import Axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface IProps {
  user: UserDetails;
}

export default function PlayerCard(props: IProps) {
  const user = useContext(UserContext);

  const notifySuccess = (toastMessage: string) =>
    toast.success(toastMessage, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      progress: undefined,
    });

  const sendInvite = (id: number) => {
    toast("Please wait...");
    Axios.post(
      process.env.REACT_APP_BACKEND + "send-email/",
      {
        reciever: id,
      },
      {
        headers: {
          Authorization: user.user?.token,
          "Content-Type": "application/json",
        },
      }
    ).then((res) => {
      notifySuccess("Invite sent!");
    });
  };

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
        <CardActions disableSpacing>
          <Button
            variant="contained"
            className="button"
            onClick={() => sendInvite(props.user.id)}
          >
            Send Invite
          </Button>
        </CardActions>
      </Card>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        pauseOnHover
      />
    </React.Fragment>
  );
}

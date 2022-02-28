import React from "react";
import { Grid, List, ListItem, Button, Typography, ListItemText } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";
import Cookies from "js-cookie";

function FormConfirm(props) {

  const nextPage = event => {
    event.preventDefault();

    const csrftoken = Cookies.get('csrftoken');
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFTOKEN": csrftoken
      },
      body: JSON.stringify({
          first_name: props.values.firstName,
          last_name: props.values.lastName,
          email: props.values.email,
          source_control: props.values.sourceControl,
          team_size: props.values.teamSize
      })
    };
    fetch("/api/submit/", requestOptions)
        .then((response) => response.json())
        .then((data) => console.log(data));

    props.nextStep();
    };

  const previousPage = event => {
    event.preventDefault();
    props.previousStep();
  }

  return (
    <form onSubmit={nextPage}>
      <Grid item xs={12}>
        <Typography variant="h2">
          Confirm Your Data
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <List>
          <ListItem>
            <ListItemText primary="First Name" secondary={props.values.firstName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Last Name" secondary={props.values.lastName} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Email" secondary={props.values.email} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Source Control" secondary={props.values.sourceControl} />
          </ListItem>
          <ListItem>
            <ListItemText primary="Team Size" secondary={props.values.teamSize} />
          </ListItem>
        </List>
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button
          color="default"
          variant="contained"
          startIcon={<NavigateBeforeIcon />}
          onClick={previousPage}
        >
          Previous
        </Button>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
        >
          Submit
        </Button>
      </Grid>
    </form>
  )
}

export default FormConfirm;
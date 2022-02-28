import React from "react";
import { Grid, List, ListItem, Button, Typography, ListItemText } from "@material-ui/core";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function FormConfirm(props) {

  const nextPage = event => {
    event.preventDefault();
    console.log(props.values);
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
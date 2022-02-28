import React from "react";
import { Grid, TextField, FormHelperText, Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";

function FormFirstName(props) {
  const maxTextInputLength = 255;

  const nextPage = event => {
    event.preventDefault();
    props.nextStep();
  };

  return (
    <form onSubmit={nextPage}>
      <Grid item xs={12}>
        <FormHelperText
            required={true}
            style={{fontSize: '1.2rem'}}
        >
          Let's start with your first name? *
        </FormHelperText>
        <TextField
            required={true}
            fullWidth={true}
            type="text"
            id="firstName"
            onChange={props.onChange("firstName")}
            value={props.value}
            inputProps={{maxLength: maxTextInputLength}}
        />
      </Grid>
      <br />
      <Grid item xs={12}>
        <Button
          color="secondary"
          variant="contained"
          type="submit"
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Grid>
    </form>
  )
}

export default FormFirstName;
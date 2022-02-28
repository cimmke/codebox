import React from "react";
import { Grid, TextField, FormHelperText, Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function FormEmail(props) {
  const maxEmailInputLength = 254;

  const nextPage = event => {
    event.preventDefault();
    props.nextStep();
  };

  const previousPage = event => {
    event.preventDefault();
    props.previousStep();
  }

  return (
    <form onSubmit={nextPage}>
      <Grid item xs={12}>
        <FormHelperText
            required={true}
            style={{fontSize: '1.2rem'}}
        >
          What email address can we reach you at? *
        </FormHelperText>
        <TextField
            required={true}
            fullWidth={true}
            type="email"
            id="email"
            onChange={props.onChange("email")}
            value={props.value}
            inputProps={{maxLength: maxEmailInputLength}}
            placeholder="text@example.com"
        />
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
          endIcon={<NavigateNextIcon />}
        >
          Next
        </Button>
      </Grid>
    </form>
  )
}

export default FormEmail;
import React from "react";
import { Grid, TextField, FormHelperText, Button } from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function FormLastName(props) {
  const maxTextInputLength = 255;

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
          And your last name? *
        </FormHelperText>
        <TextField
            required={true}
            fullWidth={true}
            type="text"
            id="lastName"
            onChange={props.onChange("lastName")}
            value={props.value}
            inputProps={{maxLength: maxTextInputLength}}
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

export default FormLastName;
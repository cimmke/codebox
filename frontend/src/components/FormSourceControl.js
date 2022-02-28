import React from "react";
import {
  Grid,
  FormHelperText,
  FormControl,
  FormControlLabel,
  Button,
  Radio,
  RadioGroup
} from "@material-ui/core";
import NavigateNextIcon from "@material-ui/icons/NavigateNext";
import NavigateBeforeIcon from "@material-ui/icons/NavigateBefore";

function FormSourceControl(props) {
  const sourceControlChoices = [
    {
      value: "github",
      label: "GitHub",
    },
    {
      value: "gitlab",
      label: "GitLab",
    },
    {
      value: "bitbucket",
      label: "BitBucket",
    },
    {
      value: "tfs",
      label: "TFS",
    },
    {
      value: "other",
      label: "Other",
    }
  ];

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
        <FormControl required={true}>
          <FormHelperText
            required={true}
            style={{fontSize: '1.2rem'}}
          >
            What is your favorite source control? *
          </FormHelperText>
          <RadioGroup
            name="source-control-buttons-group"
            value={props.value}
            onChange={props.onChange("sourceControl")}
            id="sourceControl"
          >
            {sourceControlChoices.map(choice => 
              <FormControlLabel
                value={choice.value}
                control={<Radio />}
                label={choice.label}
                key={choice.value}
              />
            )}
          </RadioGroup>
        </FormControl>
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

export default FormSourceControl;
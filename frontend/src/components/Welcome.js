import React from "react";
import { Typography, Button, Grid } from "@material-ui/core";

function Welcome(props) {
  const nextPage = event => {
      event.preventDefault();
      props.nextStep();
  };

  return (
      <div>
          <Grid item xs={12}>
              <Typography variant="h3">
                  We'd love to hear from you!  
              </Typography> 
          </Grid>
          <br />
          <Grid item xs={12}>
              <Button
                  color="secondary"
                  variant="contained"
                  onClick={nextPage}
              >
                  For Sure!
              </Button>
          </Grid>
      </div>
  ); 
};

export default Welcome;
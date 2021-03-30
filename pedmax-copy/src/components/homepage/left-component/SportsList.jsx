import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { fetchListOfCountries } from "../../../redux/actions/listOfCountriesAction";
import { useDispatch, useSelector } from "react-redux";
import CountriesList from "./CountriesList";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "90%",
    paddingLeft: "20px",
  },
  heading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },

  expanded: {
    "&$expanded": {
      margin: "4px 4px",
    },
  },

  details: {
    flexDirection: "column",
  },
}));

const SportsList = (props) => {
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(true);
  const countriesLoading = useSelector(
    (state) => state.list_of_countries.loading
  );
  const countriesData = useSelector((state) => state.list_of_countries.data);

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid item>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
            onClick={() => {
              setOpen(!isOpen);
              if (isOpen) dispatch(fetchListOfCountries(props.sport_id));
              console.log(props.sport_id);
              
            }}
          >
            <Typography className={classes.heading}>
              <img className={"sport-icons"} alt="" src={props.imageUrl} />
              &nbsp; &nbsp; &nbsp; &nbsp; {props.sportName}
            </Typography>
          </AccordionSummary>

          <AccordionDetails className={classes.details}>
            {countriesLoading ? (
              <p>Loading... Please Wait</p>
            ) : (props.sport_id) ? (
              <>
                {countriesData.map((t) => {
                  return (
                    <div key={t.id}>
                      <CountriesList
                        name={t.name}
                        sport_id={props.sport_id}
                        country_id={t.id}
                      ></CountriesList>
                      {console.log("hi")}
                    </div>
                  );
                })}
              </>
            ) : <> </>}
          </AccordionDetails>
        </Accordion>
      </Grid>
    </div>
  );
};

export default SportsList;

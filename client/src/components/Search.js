import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import SearchIcon from "@material-ui/icons/Search";
import axios from "axios";
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
  listItem: {
    margin: "10px",
  },
}));

const MoviesList = React.memo((props) => {
  const classes = useStyles();

  return (
    <List>
      {props.movies.map((ele, index) => {
        return (
          <Paper key={index}>
            <ListItem key={index} className={classes.listItem}>
              <ListItemText
                primary={ele._source.title}
                secondary={ele._source.content}
              />
            </ListItem>
          </Paper>
        );
      })}
    </List>
  );
});

export default function Search() {
  const classes = useStyles();
  const [searchText, setSearchText] = useState();
  const [movies, setMovies] = useState();

  function onSubmit(e) {
    e.preventDefault();
    loadData(searchText);
  }

  async function loadData(searchText) {
    try {
      var result = await axios.get(
        "http://127.0.0.1:5000/movies?searchText=" + searchText
      );
      console.log(result);
      setMovies(result.data);
    } catch (error) {
      console.log("error", error);
    }
  }

  return (
    <div>
      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item xs={12} sm={6}>
          <TextField
            className={classes.searchBox}
            id="search-box"
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={onSubmit}
          >
            search
          </Button>
        </Grid>
      </Grid>
      <Grid container direction="row" spacing={2}>
        <Grid item xs={12} sm={12}>
          {movies && <MoviesList movies={movies} />}
        </Grid>
      </Grid>
    </div>
  );
}

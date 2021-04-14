import React from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { TextField, Snackbar, Button, Typography, Grid, IconButton } from "@material-ui/core";
import CancelIcon from "@material-ui/icons/Cancel";
import AddIcon from "@material-ui/icons/AddCircleOutline";
import axios from "axios";
import CheckIcon from "@material-ui/icons/CheckCircle";
import MuiAlert from "@material-ui/lab/Alert";
import {addSlider,getSlider,deleteSlider} from "../../services/api"

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function UberMich() {
  const classes = useStyles();
  const [slide, setSlide] = React.useState(0);
  const [title, setTitle] = React.useState("test123");
  const [imag, setImag] = React.useState(0);
  const [loading, setLoading] = React.useState(0);
  const [imgarr, setImgarr] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    getImages();
  }, []);
  const addImage = () => {
    addSlider(title,imag)
      .then(function (res) {
        console.log(res.data)
        getImages();
        
      })
      .catch(function (error) {});
  };
  const getImages = () => {
      getSlider()
      .then(function (res) {
        console.log(res.data);
        setSlide(0)
        setImgarr(res.data.image);
      })
      .catch(function (error) {});
  };

  const deleteImage = (id) => {
    deleteSlider(id)
      .then(function (res) {
          getImages();
      })
      .catch(function (error) {});
  };

  const showPreview = (e) => {
    if (e.target.files[0]) {
      setSlide(URL.createObjectURL(e.target.files[0]));
      setImag(e.target.files[0]);
    }
  };



  return (
    <div className={classes.root}>
      <h2>Home</h2>
      <h4>Sliders</h4>
      <Grid container>
        
        {imgarr.map((item, i) => {
          return (
            <Grid item className={classes.griditem} sm={4} md={3} key={i}>
              <div className={classes.imgcont}>
                <img className={classes.image} src={item.url} alt={i} />
                <IconButton
                  className={classes.cross}
                  onClick={() => {
                    deleteImage(item._id);
                  }}
                >
                  <CancelIcon />
                </IconButton>
              </div>
            </Grid>
          );
        })}
        <Grid item className={classes.griditem} sm={3} md={3}>
          {slide ? (
            <div className={classes.imgcont}>
              {loading ? (
                <div style={{ backgroundColor: "#F1F2F3" }}>
                </div>
              ) : (
                <div className={classes.imgcont}>
                  <img
                    className={classes.image}
                    style={{ opacity: "0.4" }}
                    src={slide}
                    alt="1"
                  />
                  <IconButton
                    className={classes.cancel}
                    onClick={() => {
                      setSlide(0);
                    }}
                  >
                    <CancelIcon fontSize="large" />
                  </IconButton>
                  <IconButton className={classes.okay} onClick={addImage}>
                    <CheckIcon fontSize="large" />
                  </IconButton>
                </div>
              )}
            </div>
          ) : (
            <span>
              <input
                accept="image/*"
                style={{ display: "none" }}
                id="raised-button-file"
                type="file"
                onChange={showPreview}
              />
              <label htmlFor="raised-button-file">
                <div className={classes.Addimg}>
                  Add New
                  <AddIcon fontSize="large" />
                </div>
              </label>
            </span>
          )}
        </Grid>
      </Grid>

      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={() => setOpen(false)}
      >
        <Alert onClose={() => setOpen(false)} severity="success">
          {"Updated Successfully"}
        </Alert>
      </Snackbar>
    </div>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    flex: 1,
    padding:20,
    flexDirection: 'column'
  },
  griditem: {
    padding: 10,
    marginTop: 10,
  },
  imgcont: {
    position: "relative",
    height: 130,
  },
  image: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
  cross: {
    position: "absolute",
    right: 0,
    top: 0,
    padding: 0,
  },
  Addimg: {
    height: 130,
    width: "100%",
    backgroundColor: "grey",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
  },
  cancel: {
    position: "absolute",
    right: "30%",
    top: "40%",
    padding: 0,
  },
  okay: {
    position: "absolute",
    left: "30%",
    top: "40%",
    padding: 0,
  },
}));

import React from "react";
import {
  Checkbox,
  FormControl,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

function MultipleSelect({ places }) {
  const ITEM_HEIGHT = 50;
  const ITEM_PADDING_TOP = 8;
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 500,
      },
    },
  };
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      maxWidth: 300,
    },
    chips: {
      display: "flex",
      flexWrap: "wrap",
    },
    chip: {
      margin: 2,
    },
    noLabel: {
      marginTop: theme.spacing(3),
    },
  }));
  const classes = useStyles();
  const [personName, setPersonName] = React.useState([]);
  const handleChange1 = (event) => {
    setPersonName(event.target.value);
  };
  const lugares = places.map((item) => item.place.lugar);

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel>Seleccionar lugares de la ruta</InputLabel>
        <Select
          multiple
          value={personName}
          onChange={handleChange1}
          renderValue={(selected) => selected.join(", ")}
          MenuProps={MenuProps}
          style={{ width: 400, marginLeft: "-10px" }}
        >
          {lugares.map((item) => (
            <MenuItem key={item} value={item}>
              <Checkbox checked={personName.indexOf(item) > -1} />
              <ListItemText primary={item} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default MultipleSelect;

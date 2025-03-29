import { Button, Stack } from "@mui/material";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";

export const Filtering = ({ setSortBy }) => {
  return (
    <FormControl sx={{ flexDirection: "row", mx: "-4px" }}>
      <RadioGroup
        onChange={(e) => setSortBy(e.target.value)}
        sx={{ display: "flex", flexDirection: "row" }}
      >
        <FormControlLabel
          value="date"
          control={
            <Radio
              sx={{
                bgcolor: "white",
                transform: "scale(0.4)",
              }}
            />
          }
          label="Date"
        />
        <FormControlLabel
          value="priority"
          control={
            <Radio
              sx={{
                bgcolor: "white",
                transform: "scale(0.4)",
              }}
            />
          }
          label="Priority"
        />
        <FormControlLabel
          value="status"
          control={
            <Radio
              sx={{
                bgcolor: "white",
                transform: "scale(0.4)",
              }}
            />
          }
          label="Status"
        />
      </RadioGroup>
    </FormControl>
  );
};

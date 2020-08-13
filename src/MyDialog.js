import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField
} from "@material-ui/core";

import { Controller } from "react-hook-form";

function validateName(name) {
  const invalid = name === null || name === undefined || name.length === 0;
  console.log("ValidateName is called: ", { name, invalid });
  return invalid;
}

function validateAge(age) {
  const invalid = age === null || age === undefined || age.length === 0;
  console.log("ValidateAge is called: ", { age, invalid });
  return invalid;
}

export default function MyDialog({ open, onClose, form }) {
  const { control, trigger } = form;
  const [counter, setCounter] = useState(0);

  const triggerValidation = () => {
    trigger();
  };

  useEffect(() => {
    if (open && counter < 2) {
      console.log("call trigger, counter= ", counter);
      trigger();
      setCounter((prev) => prev + 1);
    }
  }, [open, trigger, counter]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>MyDialog</DialogTitle>
      <DialogContent>
        <form>
          <Controller
            as={TextField}
            control={control}
            name="name"
            rules={{
              validate: validateName
            }}
            defaultValue={""}
          ></Controller>

          <Controller
            as={TextField}
            control={control}
            name="age"
            rules={{
              validate: validateAge
            }}
            defaultValue={""}
          ></Controller>
        </form>
      </DialogContent>

      <DialogActions>
        <button onClick={onClose} color="primary">
          Cancel
        </button>
        <button onClick={triggerValidation} color="primary">
          Validate
        </button>
      </DialogActions>
    </Dialog>
  );
}

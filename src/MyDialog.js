import React, {useEffect} from "react";

import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";

import {has} from 'lodash';
import {Controller} from "react-hook-form";

function validateName(name) {
  const invalid = name === null || name === undefined || name.length === 0;
  console.log("ValidateName is called: ", {name, invalid});
  return !invalid;
}

function validateAge(age) {
  const invalid = age === null || age === undefined || age.length === 0;
  console.log("ValidateAge is called: ", {age, invalid});
  return !invalid;
}

function TriggerFormInitially({form}) {
  const {trigger} = form;

  useEffect(() => {
    console.log("call trigger");
    trigger();
  }, [trigger]);

  return null;
}

let myDialogRenderCounter = 0;
const MyDialog = React.memo(({open, onClose, form}) => {
  const {control, trigger, errors} = form;
  const triggerValidation = () => {
    trigger();
  };

  console.log("Errors. ", errors);
  myDialogRenderCounter++;

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>MyDialog</DialogTitle>
      <DialogContent>
        <div>
          RenderCounter: {myDialogRenderCounter}
        </div>
        <form>

          <div>
            <Controller
              as={<TextField placeholder={"name"} error={has(errors, "name")}/> }
              control={control}
              name="name"
              rules={{
                validate: validateName
              }}
              defaultValue={""}
            />
          </div>

          <div>
            <Controller
              as={<TextField placeholder={"age"} error={has(errors, "age")}/>}
              control={control}
              name="age"
              rules={{
                validate: validateAge
              }}
              defaultValue={""}
            />
          </div>

          <TriggerFormInitially form={form}/>

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
})

export default MyDialog;

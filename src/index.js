import React, {useCallback} from "react";
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";
import { createMuiTheme, ThemeProvider, Button } from "@material-ui/core";
import MyDialog from "./MyDialog";
import "./styles.css";

let renderCount = 0;

function App() {
  const form = useForm({
    defaultValues: {
      name: "Alex"
    }
  });
  const [open, setOpen] = React.useState(false);
  const onClose = () => setOpen(false);
  const onClick = useCallback(()=>{
    setOpen(true);
  }, []);

  renderCount++;

  const theme = createMuiTheme({
    palette: {
      type: "dark"
    }
  });

  return (
    <ThemeProvider theme={theme}>
      Render Count: {renderCount}
      <Button onClick={onClick}>Open dialog</Button>
      <MyDialog open={open} onClose={onClose} form={form} />
    </ThemeProvider>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

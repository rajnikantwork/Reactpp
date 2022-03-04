import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import CloseModalButton from "../../../components/button/closeModalButton";
import Typography from "@material-ui/core/Typography";
import SelectDropdownOne from "../../../components/dropdown/selectDropdownOne";
import { useSelector, useDispatch } from "react-redux";
import { templateData } from "../../myTemplates/action";
import { ReducersModal } from "../../../modal/index";
import ActionButton from "../../../components/button/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      width: "100%",
      margin: "10px auto 0 auto",
      position: "absolute",
      top: "-20px",
      opacity: 0,
      transition: "all 0.4s ease-in-out",
      zIndex: 999,
      "& div": {
        borderRadius: "5px",
        padding: "10px 0",
        backgroundColor: "rgb(254, 105, 105) !important",
        justifyContent: "center",
        textAlign: "center",
        color: "#fff",
      },
    },
    errorAnim: {
      opacity: 1,
      top: "-15px",
    },
    container: {
      position: "relative",
    },
    title: {
      marginTop: 20,
      "& h4": {
        color: "#3f434a",
        fontSize: "24px",
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    templates: {
      marginTop: 10,
      "& p": {
        fontSize: 20,
      },
    },
    select: {
      marginTop: 10,
    },
    actionButton: {
      width: "30%",
      margin: "10px auto",
    },
  })
);
interface Props {
  setOpen: Function;
  setUseSelectedTemplate: Function;
}
function UseTemplateModal({ setOpen, setUseSelectedTemplate }: Props) {
  const classes = styles();
  const dispatch = useDispatch();
  const { selectedTemplate } = useSelector(
    (state: ReducersModal) => state.createTemplateSelectionReducer
  );
  const { templatesData } = useSelector(
    (state: ReducersModal) => state.templatesDateReducer
  );
  const [display, setDisplay] = React.useState(false);
  const [error, setError] = React.useState<string>("");
  const closeModal = () => {
    setOpen(false);
  };
  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDisplay(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, [display]);
  React.useEffect(() => {
    dispatch(templateData());
  }, [dispatch]);

  const getData = (type: string, val: string) => {};
  const useTemplate = () => {
    setDisplay(true);
    if (selectedTemplate === "") {
      setError("Select a template ");
    } else {
      setError("");
      let selectedTemplateDetails = templatesData.data.find(
        (value: any) => value.title === selectedTemplate
      );
      setUseSelectedTemplate(selectedTemplateDetails);
      setOpen(false);
    }
  };
  return (
    <div className={classes.container}>
      <CloseModalButton onClick={closeModal} />
      <div
        className={
          !display ? classes.error : `${classes.error} ${classes.errorAnim}`
        }
      >
        {error ? (
          <div>
            <Typography variant="body2"> {error}</Typography>
          </div>
        ) : null}
      </div>
      <div className={classes.title}>
        <Typography variant="h4">Choose template</Typography>
      </div>
      <div className={classes.templates}>
        <Typography variant="body2">Templates</Typography>
        <div className={classes.select}>
          <SelectDropdownOne
            initialSelect={selectedTemplate}
            initialData={"Choose template"}
            selectionValue={"title"}
            storageValue={"selectedTemplate"}
            dropDownData={templatesData.data}
            helperText={""}
            getData={getData}
          />
        </div>
      </div>
      <div className={classes.actionButton}>
        <ActionButton name="Use template" onPress={useTemplate} />
      </div>
    </div>
  );
}

export default UseTemplateModal;

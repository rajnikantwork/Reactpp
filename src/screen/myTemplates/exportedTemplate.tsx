import React from "react";
import { makeStyles, createStyles, Theme, withStyles } from "@material-ui/core";
import CloseModalButton from "../../components/button/closeModalButton";
import Typography from "@material-ui/core/Typography";
import ActionButton from "../../components/button/index";
import { exportTemplateData } from "./action";
import { useDispatch } from "react-redux";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import InputBase from "@material-ui/core/InputBase";
const BootstrapInput = withStyles((theme:Theme) => ({
  root: {
    "label + &": {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: "relative",
    backgroundColor: '#fff',
    border: "1px solid #ced4da",
    fontSize: 16,
    padding: "7px 26px 7px 12px",
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      "Roboto",
      "sans-serif",
    ].join(","),
    "&:focus": {
      borderRadius: 4,
    },
  },
}))(InputBase);
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      position: "relative",
    },
    title: {
      "& h3": {
        fontSize: 26,
        fontWeight: theme.typography.fontWeightBold,
      },
    },
    templates: {
      marginTop: 20,
      maxHeight: "400px",
      overflowY: "auto",
      paddingRight: 10,
      "&::-webkit-scrollbar": {
        width: "10px",
        borderRadius: "30px",
        cursor: "grab",
        // [theme.breakpoints.down("sm")]: {
        //   width: "0",
        // },
      },
      "&::-webkit-scrollbar-track": {
        background: " #efefef !important",
        borderRadius: "20px !important",
      },
      "&::-webkit-scrollbar-thumb": {
        width: "10px",
        background: `${theme.palette.primary.main} !important`,
        border: "1.7px solid #e9f5fb",
        borderRadius: "15px !important",
      },
    },
    template: {
      margin: "10px 0 30px 0",
      paddingBottom: 15,
      borderBottom: "2px dashed #ccc",
    },
    extraDetailContainer: {
      display: "flex",
      alignItems: "center",
    },
    box: {
      padding: "8px 10px",
      backgroundColor: "#f5f6fa",
      borderRadius: "4px",
    },
    temptitle: {
      margin: "10px 0",
      "& p": {
        fontWeight: theme.typography.fontWeightMedium,
        fontSize: 17,
      },
    },
    description: {
      marginTop: 10,
    },
    actionButton: {
      marginTop: 20,
      display: "flex",
      justifyContent: "flex-end",
      "& button": {
        width: "25%",
      },
    },
    selectExportAs: {
      margin:'10px 0',
      display: "flex",
      alignItems: "center",
      '& p':{
        fontSize:18,
        fontWeight: theme.typography.fontWeightBold,
      }
      
    },
    margin: {
      margin: theme.spacing(1),
    },
  })
);
interface Props {
  setOpen: Function;
  selectedTemplate: Array<any>;
}
function ExportedTemplate({ setOpen, selectedTemplate }: Props) {
  const classes = styles();
  const closeModal = () => {
    setOpen(false);
  };
  const [exportAs, setExportAs] = React.useState("CSV");
  const dispatch = useDispatch();
  const exportTemplate = () => {
    let selectedTemplateIds: Array<string> = [];
    if (selectedTemplate.length === 1) {
      selectedTemplateIds.push(selectedTemplate[0]._id);
      selectedTemplateIds.push(selectedTemplate[0]._id);
    } else {
      selectedTemplate.forEach((value: any) => {
        selectedTemplateIds.push(value._id);
      });
    }
    dispatch(exportTemplateData(selectedTemplateIds, exportAs));
    setOpen(false);
  };
  const handleChange = (event:any) => {
    setExportAs(event.target.value)
  };
  return (
    <div className={classes.container}>
      <CloseModalButton onClick={closeModal} />
      <div className={classes.title}>
        <Typography variant="h3">My templates</Typography>
      </div>
      <div className={classes.selectExportAs}>
        <Typography variant="body2">Export As</Typography>
        <FormControl className={classes.margin}>
          <NativeSelect
            id="demo-customized-select-native"
            value={exportAs}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <option value={"CSV"}>CSV</option>
            <option value={"PDF"}>PDF</option>
            <option value={"Excel"}>Excel</option>
          </NativeSelect>
        </FormControl>
      </div>
      <div className={classes.templates} id="pdf">
        {selectedTemplate.map((value: any) => {
          return (
            <div className={classes.template}>
              <div className={classes.extraDetailContainer}>
                <div className={classes.box}>
                  <Typography variant="body2">
                    Week {value.weekDetails.week}
                  </Typography>
                </div>
              </div>
              <div className={classes.temptitle}>
                <Typography variant="body2">{value.title}</Typography>
              </div>
              <div className={classes.description}>
                <Typography variant="body2">{value.description}</Typography>
              </div>
            </div>
          );
        })}
      </div>
      <div className={classes.actionButton}>
        <ActionButton name="Export" type="button" onPress={exportTemplate} />
      </div>
    </div>
  );
}

export default ExportedTemplate;

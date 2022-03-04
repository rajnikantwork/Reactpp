import React from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { makeStyles, createStyles, Theme } from "@material-ui/core";
import ScreenTitle from "../../components/screenTitle/index";
import SearchComponent from "../../components/searchComponent/index";
import Filter from "./filter";
import { useSelector, useDispatch } from "react-redux";
import { ReducersModal } from "../../modal/index";
import LocalImages from "../../Utils/images";
import ImageContainer from "../../components/imageContainer/index";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ActionButtonWithImg from "../../components/button/buttonWithImg";
import TableStructure1 from "./tableStructure";
import TransitionsModal from "../../components/popupModal/index";
import CeateTemplate from "./ceateTemplate";
import EditTemplate from "./editTemplate";
import Utils from "../../Utils";
import { getWeeks, getSubjects, getCategories } from "../studyPlanner/action";
import { templateData } from "./action";
import PaginationControlled from "../../components/pagination/index";
import TemplateSkl from "./templateSkl";
import SelectExportType from "./selectExportType";
import ExportedTemplate from "./exportedTemplate";
import DeleteConfirmationDialogue from "./deleteConfirmationDialogue";
import SuccessMessage from "../../components/successMessage/index";
const styles = makeStyles((theme: Theme) =>
  createStyles({
    container: {},
    titleAndSearchContainer: {
      display: "flex",
      alignItems: "center",
      [theme.breakpoints.down("xs")]: {
        justifyContent: "space-between",
      },
    },
    title: {
      width: "20%",
      '& h4':{
        fontSize:27
      }
    },
    search: {
      width: "79%",
      "& >div": {
        width: "100%",
      },
    },
    filterAndddTemplateContainer: {
      marginTop: 50,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
    },
    filterContainer: {
      width: "55%",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      "& div": {
        width: "90%",
      },
    },
    addTemplateContainer: {
      display: "flex",
      alignItems: "center",

      // justifyContent: "space-between",
      width: "20%",
      [theme.breakpoints.between(1100, 1300)]: {
        width: "29%",
      },
      [theme.breakpoints.between(1400, 1500)]: {
        width: "25%",
      },
      [theme.breakpoints.between(1600, 1700)]: {
        width: "22%",
      },
      "& svg": {
        color: "#8a9099",
      },
      "& div": {
        display: "flex",
        alignItems: "center",
      },
    },
    export: {
      "& figure": {
        width: 20,
        height: 20,
        margin: 0,
      },
    },
    exportTxt: {
      margin: "0 10px",
    },
    templateTable: {
      marginTop: 50,
    },
    exportandadd: {
      marginRight: 33,
      "&:hover": {
        cursor: "pointer",
      },
    },
    modalStyle: {
      minWidth: 800,
    },
  })
);
function MyTemplates() {
  const classes = styles();
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [open1, setOpen1] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  const [open3, setOpen3] = React.useState(false);
  const [open4, setOpen4] = React.useState(false);
  const [open5, setOpen5] = React.useState(false);
  const openModal = () => {
    setOpen(true);
  };
  const { allSubjects, allTopics, allWeeks } = useSelector(
    (state: ReducersModal) => state.customRangeFilterReducer
  );
  const { subjectData } = useSelector(
    (state: ReducersModal) => state.addTodoSubjectReducer
  );
  const { categoryData } = useSelector(
    (state: ReducersModal) => state.addTodoCategoryReducer
  );
  const { weekData } = useSelector(
    (state: ReducersModal) => state.addTodoWeekReducer
  );
  const { templatesData, page } = useSelector(
    (state: ReducersModal) => state.templatesDateReducer
  );
  const { totalCount } = useSelector(
    (state: ReducersModal) => state.totalDataCountReducer
  );
  const [selectedTemplate, setSelectedTemplate] = React.useState<any>([]);
  const [selectedDeleteId, setSelectedDeleteId] = React.useState("");
  React.useEffect(() => {
    dispatch(getWeeks());
    dispatch(getSubjects());
    dispatch(templateData());
  }, [dispatch]);

  const handleOpen1 = () => {
    if (selectedTemplate.length === 0) {
      Utils.showAlert(2, "Select a template before exporting");
    } else setOpen2(true);
  };
  //Code to select single template //
  const selectSingleTemplate = (id: string) => {
    let selectedTemp = selectedTemplate.some((value: any) => value._id === id);
    if (selectedTemp) {
      setSelectedTemplate(
        selectedTemplate.filter((value: any) => value._id !== id)
      );
    } else {
      let selectedTempData = templatesData.data.find(
        (value: any) => value._id === id
      );
      setSelectedTemplate([...selectedTemplate, selectedTempData]);
    }
  };
  //code to select all templates //
  const selectAllTemplate = () => {
    if (selectedTemplate.length !== templatesData.data.length) {
      setSelectedTemplate(templatesData.data);
    } else setSelectedTemplate([]);
  };
  //code to change page no //
  const updatePage = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch({
      type: Utils.ActionName.GET_TEMPLATES,
      payload: {
        page: value,
      },
    });
    dispatch(templateData());
  };
  const deleteTemplatee = (id: string) => {
    setSelectedDeleteId(id);
  };
  //code to handle all filter dropdowns //
  const getFilterData = (type: string, val: string) => {
    if (type === "allWeeks") {
      if (val === "All Weeks") dispatch(templateData());
      else dispatch(templateData());
    }
    if (val !== "All Subjects") {
      if (type === "allSubjects") {
        const getSubject = subjectData.find(
          (value: any) => value.subject === val
        );
        dispatch(getCategories(getSubject._id));
        dispatch({
          type: Utils.ActionName.CUSTOM_RANGE,
          payload: {
            allTopics: "All Topics",
          },
        });
        dispatch(templateData());
      } else if (type === "allTopics") dispatch(templateData());
    } else {
      dispatch({
        type: Utils.ActionName.CUSTOM_RANGE,
        payload: {
          allSubjects: "All Subjects",
          allTopics: "All Topics",
        },
      });
      dispatch({
        type: Utils.ActionName.GET_CATEGORY,
        payload: {
          categoryData: [],
        },
      });
      dispatch(templateData());
    }
  };

  const renderTitleAndSearch = () => {
    return (
      <div className={classes.titleAndSearchContainer}>
        <div className={classes.title}>
          <ScreenTitle title="My Templates" />
        </div>
        <div className={classes.search}>
          <SearchComponent type={"template"} />
        </div>
      </div>
    );
  };
  const renderFiltersAndAddTemplates = () => {
    return (
      <div className={classes.filterAndddTemplateContainer}>
        <div className={classes.filterContainer}>
          <Filter
            allWeeks={allWeeks}
            allSubjects={allSubjects}
            allTopics={allTopics}
            weekData={weekData.data}
            subjectData={subjectData}
            getFilterData={getFilterData}
            categoryData={categoryData}
          />
        </div>
        <div className={classes.addTemplateContainer}>
          <div className={classes.exportandadd} onClick={handleOpen1}>
            <ImageContainer
              imgUrl={LocalImages.EXPORT}
              style={classes.export}
            />
            <Typography variant="body2" className={classes.exportTxt}>
              Export
            </Typography>
            <ExpandMoreIcon style={{ fontSize: 20 }} />
          </div>

          <ActionButtonWithImg
            name={"Add template"}
            type={"button"}
            onPress={openModal}
            imgUrl={LocalImages.ADD_TEMPLATE}
          />
        </div>
      </div>
    );
  };
  const renderTable = () => {
    return (
      <TableStructure1
        templatesData={templatesData.data}
        setOpen={setOpen1}
        setOpen4={setOpen4}
        selectedTemplate={selectedTemplate}
        selectSingleTemplate={selectSingleTemplate}
        selectAllTemplate={selectAllTemplate}
        deleteTemplatee={deleteTemplatee}
      />
    );
  };
  return (
    <HelmetProvider>
      <div className={classes.container}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>My Templates</title>
        </Helmet>
        {templatesData.data ? (
          <React.Fragment>
            {renderTitleAndSearch()}
            {renderFiltersAndAddTemplates()}
            {renderTable()}
          </React.Fragment>
        ) : (
          <TemplateSkl />
        )}
        <TransitionsModal
          open={open5}
          setOpen={setOpen5}
          children={
            <SuccessMessage
              setOpen={setOpen5}
              message1="Template Created"
              message2=""
            />
          }
        />
        <TransitionsModal
          open={open}
          setOpen={setOpen}
          children={<CeateTemplate setOpen={setOpen} setOpen5={setOpen5} />}
          modstyle={classes.modalStyle}
        />
        <TransitionsModal
          open={open1}
          setOpen={setOpen1}
          children={<EditTemplate setOpen={setOpen1} />}
          modstyle={classes.modalStyle}
        />
        <TransitionsModal
          open={open2}
          setOpen={setOpen2}
          children={
            <SelectExportType
              setOpen={setOpen2}
              setOpen1={setOpen3}
              selectedTemplate={selectedTemplate}
            />
          }
        />
        <TransitionsModal
          open={open3}
          setOpen={setOpen3}
          children={
            <ExportedTemplate
              setOpen={setOpen3}
              selectedTemplate={selectedTemplate}
            />
          }
        />
        <TransitionsModal
          open={open4}
          setOpen={setOpen4}
          children={
            <DeleteConfirmationDialogue
              setOpen={setOpen4}
              selectedDeleteId={selectedDeleteId}
            />
          }
        />
      </div>
      {templatesData.data ? (
        <PaginationControlled
          limit={Math.ceil(totalCount / 20)}
          page={page}
          updatePage={updatePage}
        />
      ) : (
        <React.Fragment></React.Fragment>
      )}
    </HelmetProvider>
  );
}

export default MyTemplates;

import { ConstData } from "../../Utils/constData";
import React from "react";
import FilterDropdown from "../../components/dropdown/filterDropdown";
interface Props {
  allSubjects: string;
  allTopics: string;
  allCategory: string;
  allSeries: string;
  answered: string;
  subjectData: any;
  categoryData: any;
  allSeriesData: any;
  getFilterData: Function;
}
const renderFilterDropdown = (
  initialValue: string,
  filterData: string,
  type: string,
  value: string,
  dropdownData: any,
  helperText: string,
  getData: Function
) => {
  return (
    <FilterDropdown
      initialValue={initialValue}
      filterData={filterData}
      type={type}
      value={value}
      dropDownData={dropdownData}
      helperText={helperText}
      getData={getData}
    />
  );
};
function Filter({
  allSubjects,
  allTopics,
  allCategory,
  allSeries,
  answered,
  subjectData,
  categoryData,
  getFilterData,
  allSeriesData,
}: Props) {
  return (
    <React.Fragment>
      {renderFilterDropdown(
        "All Subjects",
        "subject",
        "allSubjects",
        allSubjects,
        subjectData,
        "",
        getFilterData
      )}
      {renderFilterDropdown(
        "All Topics",
        "category",
        "allTopics",
        allTopics,
        categoryData,
        "",
        getFilterData
      )}
      {renderFilterDropdown(
        "All Category",
        "topics",
        "allCategory",
        allCategory,
        ConstData.categoryDropdown,
        "",
        getFilterData
      )}
      {renderFilterDropdown(
        "All Series",
        "title",
        "allSeries",
        allSeries,
        allSeriesData,
        "",
        getFilterData
      )}
      {renderFilterDropdown(
        "Answer Type",
        "answered",
        "answered",
        answered,
        ConstData.answeredDropdown,
        "",
        getFilterData
      )}
    </React.Fragment>
  );
}

export default Filter;

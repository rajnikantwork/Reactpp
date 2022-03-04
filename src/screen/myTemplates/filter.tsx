import React from "react";
import FilterDropdown from "../../components/dropdown/filterDropdown";
interface Props {
  allWeeks:string;
  allSubjects: string;
  allTopics: string;
  weekData: any;
  subjectData: any;
  getFilterData: Function;
  categoryData: any;
}
function Filter({
  allWeeks,
  allSubjects,
  allTopics,
  weekData,
  subjectData,
  getFilterData,
  categoryData,
}: Props) {
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
  return (
    <React.Fragment>
         {renderFilterDropdown(
        "All Weeks",
        "week",
        "allWeeks",
        allWeeks,
        weekData,
        "Week",
        getFilterData
      )}
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
    </React.Fragment>
  );
}

export default Filter;

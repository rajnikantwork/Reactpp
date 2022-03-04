import React from "react";
import SelectDropdownOne from "../../components/dropdown/selectDropdownOne";
interface Props {
  selectedWeek: string;
  selectedSubject: string;
  selectedTopic: string;
  subjectData: any;
  weekData: any;
  categoryData: any;
  getSelectedData: Function;
}

const renderSelectDropdown = (
  initialSelect: string,
  initialData: string,
  selectionValue: string,
  storageValue: string,
  dropdownData: any,
  helperText: string,
  getData: Function
) => {
  return (
    <SelectDropdownOne
      initialSelect={initialSelect}
      initialData={initialData}
      selectionValue={selectionValue}
      storageValue={storageValue}
      dropDownData={dropdownData}
      helperText={helperText}
      getData={getData}
    />
  );
};
function Select({
  selectedWeek,
  selectedSubject,
  selectedTopic,
  subjectData,
  weekData,
  categoryData,
  getSelectedData,
}: Props) {
  const getselectValue = (type: string, value: any) => {
    getSelectedData(type, value);
  };
  return (
    <React.Fragment>
      {renderSelectDropdown(
        selectedWeek,
        "Select Week",
        "week",
        "selectedWeek",
        weekData,
        "Week",
        getselectValue
      )}
      {renderSelectDropdown(
        selectedSubject,
        "Select Subject",
        "subject",
        "selectedSubject",
        subjectData,
        "",
        getselectValue
      )}
      {renderSelectDropdown(
        selectedTopic,
        "Select Topic",
        "category",
        "selectedTopic",
        categoryData,
        "",
        getselectValue
      )}
    </React.Fragment>
  );
}

export default Select;

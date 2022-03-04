import Utils from "./index"
const getMonth = (month: string) => {
  switch (month) {
    case '01': return 'Jan';
    case '02': return 'Feb';
    case '03': return 'Mar';
    case '04': return 'April';
    case '05': return 'May';
    case '06': return 'June';
    case '07': return 'July';
    case '08': return 'Aug';
    case '09': return 'Sep';
    case '10': return 'Oct';
    case '11': return 'Nov';
    case '12': return 'Dec';

  }
}
const getDate = (date: string) => {
  if (date === '') return ''
  let date1 = date.split("-");
  let year = date1[0];
  let month = getMonth(date1[1]);
  let day = date1[2].split('T')[0];
  let newDate = `${day} ${month}, ${year}`
  return newDate;
}
const setFilterData = () => {
  if (localStorage.getItem('rememberMe') === 'yes') {
    let initialFilterData: any = localStorage.getItem("filter")
    let iniFilterData = JSON.parse(initialFilterData);
    return iniFilterData;
  } else if (localStorage.getItem('rememberMe') === "no") {
    let initialFilterData1: any = sessionStorage.getItem("filter");
    let iniFilterData1 = JSON.parse(initialFilterData1);

    return iniFilterData1;
  }

};
const getTimeStamp = (hours: any, minutes: any, seconds: any) => {
  const currentDate: any = new Date()
  const timeStamp = Date.parse(currentDate)
  return timeStamp
}


const getSubjectId = (subject: string, subjectData: any) => {
  const subjectInfo = subjectData.find(
    (value: any) => value.subject === subject
  );
  return subjectInfo._id;
};
const getCategoryId = (topic: string, categoryData: any) => {
  const categoryInfo = categoryData.find(
    (value: any) => value.category === topic
  );
  return categoryInfo._id;
};
const getSeriesId = (series: string, seriesData: any) => {
  const seriesInfo = seriesData.find((value: any) => value.title === series);
  return seriesInfo._id;
};
const getUrl = (
  allSubjects: string,
  allTopics: string,
  allCategory: string,
  allSeries: string,
  answered: string,
  subjectData: any,
  categoryData: any,
  allSeriesData: any,
  week: number,
  page: number
) => {
  if (week === 0) {
    if (
      // No Filter //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      return `${Utils.endPoints.questions}?pageNo=${page}&limit=20`;
    } else if (
      // 1 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&pageNo=${page}&limit=20`;
    } else if (
      // 3 //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let priority = allCategory
      return `${Utils.endPoints.questions}?priority=${priority}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&pageNo=${page}&limit=20`;
    } else if ( // 1 3 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let priority = allCategory
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&priority=${priority}&pageNo=${page}&limit=20`;
    } else if (
      // 1 4 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&seriesId=${seriesId}&pageNo=${page}&limit=20`;
    } else if (
      // 1 5 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&isAnswered=${answer}&pageNo=${page}&limit=20`;
    } else if (
      // 3 5 //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?piority=${priority}&isAnswered=${answer}&pageNo=${page}&limit=20`;
    }
    else if ( // 1 2 3 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let priority = allCategory
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 4 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory === "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&seriesId=${seriesId}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 5 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&isAnswered=${answer}&pageNo=${page}&limit=20`;
    } else if (
      // 1 3 4 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let priority = allCategory
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&priority=${priority}&seriesId=${seriesId}&pageNo=${page}&limit=20`;
    }
    else if (
      // 1 3 5 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&priority=${priority}&isAnswered=${answer}&pageNo=${page}&limit=20`;
    } else if (
      // 1 4 5 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries !== "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&seriesId=${seriesId}&isAnswered=${answer}&pageNo=${page}&limit=20`;
    }
    else if ( // 1 2 3 4//
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let priority = allCategory
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&seriesId=${seriesId}&pageNo=${page}&limit=20`;
    } else if ( // 1 2 3 5//
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&isAnswered=${answer}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 3 4 5 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries !== "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&seriesId=${seriesId}&isAnswered=${answer}&pageNo=${page}&limit=20`;
    } else if (
      // 5 //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?isAnswered=${answer}&pageNo=${page}&limit=20`;
    }
  } else {
    if (
      // No Filter //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      return `${Utils.endPoints.questions}?week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 3 //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let priority = allCategory
      return `${Utils.endPoints.questions}?priority=${priority}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&week=${week}&pageNo=${page}&limit=20`;
    } else if ( // 1 3 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let priority = allCategory
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&priority=${priority}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 4 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&seriesId=${seriesId}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 5 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 3 5 //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?piority=${priority}&isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    }
    else if ( // 1 2 3 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let priority = allCategory
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 4 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory === "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&seriesId=${seriesId}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 5 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 3 4 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let priority = allCategory
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&priority=${priority}&seriesId=${seriesId}&week=${week}&pageNo=${page}&limit=20`;
    }
    else if (
      // 1 3 5 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&priority=${priority}&isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 4 5 //
      allSubjects !== "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries !== "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&seriesId=${seriesId}&isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    }
    else if ( // 1 2 3 4//
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries !== "All Series" &&
      answered === "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let priority = allCategory
      let seriesId = getSeriesId(allSeries, allSeriesData);
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&seriesId=${seriesId}&week=${week}&pageNo=${page}&limit=20`;
    } else if ( // 1 2 3 5//
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 1 2 3 4 5 //
      allSubjects !== "All Subjects" &&
      allTopics !== "All Topics" &&
      allCategory !== "All Category" &&
      allSeries !== "All Series" &&
      answered !== "Answer Type"
    ) {
      let subjectId = getSubjectId(allSubjects, subjectData);
      let categoryId = getCategoryId(allTopics, categoryData);
      let seriesId = getSeriesId(allSeries, allSeriesData);
      let priority = allCategory
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?subjectId=${subjectId}&categoryId=${categoryId}&priority=${priority}&seriesId=${seriesId}&isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    } else if (
      // 5 //
      allSubjects === "All Subjects" &&
      allTopics === "All Topics" &&
      allCategory === "All Category" &&
      allSeries === "All Series" &&
      answered !== "Answer Type"
    ) {
      let answer = answered === "Not answered" ? false : true;
      return `${Utils.endPoints.questions}?isAnswered=${answer}&week=${week}&pageNo=${page}&limit=20`;
    }
  }
};
const getUrlForTemplate = (
  search: string,
  allSubjects: string,
  allTopics: string,
  allWeeks: string,
  subjectData: any,
  categoryData: any,
  page: number) => {
  if (search === '' &&
    allWeeks === "All Weeks" &&
    allSubjects === "All Subjects" &&
    allTopics === "All Topics") {
    // No Filter Applied
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20`
  } else if (search !== '' &&
    allWeeks === "All Weeks" &&
    allSubjects === "All Subjects" &&
    allTopics === "All Topics") {
    // Only Search Applied //
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&searchKey=${search}`
  } else if (search === '' &&
    allWeeks !== "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics !== "All Topics") {
    // 1 2 3     All filters are applied but not search //
    let subjectId = getSubjectId(allSubjects, subjectData);
    let categoryId = getCategoryId(allTopics, categoryData);
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&week=${allWeeks}&subjectId=${subjectId}&categoryId=${categoryId}`
  } else if (search === '' &&
    allWeeks !== "All Weeks" &&
    allSubjects === "All Subjects" &&
    allTopics === "All Topics") {
    // 1    Only Weeks Applied //
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&week=${allWeeks}`
  } else if (search === '' &&
    allWeeks === "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics === "All Topics") {
    // 2      Only Subjects Applied //
    let subjectId = getSubjectId(allSubjects, subjectData);
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&subjectId=${subjectId}`
  } else if (search === '' &&
    allWeeks === "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics !== "All Topics") {
    // 2 3      Subjects and Topics applied //
    let subjectId = getSubjectId(allSubjects, subjectData);
    let categoryId = getCategoryId(allTopics, categoryData);

    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&subjectId=${subjectId}&categoryId=${categoryId}`
  } else if (search === '' &&
    allWeeks !== "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics === "All Topics") {
    // 1 2      weeks and subjects applied //
    let subjectId = getSubjectId(allSubjects, subjectData);
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&week=${allWeeks}&subjectId=${subjectId}`
  } else if (search !== '' &&
    allWeeks !== "All Weeks" &&
    allSubjects === "All Subjects" &&
    allTopics === "All Topics") {
    // S 1    Search and week applied //
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&week=${allWeeks}&searchKey=${search}`
  } else if (search !== '' &&
    allWeeks === "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics === "All Topics") {
    // S 2     Search with subject //
    let subjectId = getSubjectId(allSubjects, subjectData);
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&subjectId=${subjectId}&searchKey=${search}`
  } else if (search !== '' &&
    allWeeks === "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics !== "All Topics") {
    //S 2 3    Search with subject and filter applied //
    let subjectId = getSubjectId(allSubjects, subjectData);
    let categoryId = getCategoryId(allTopics, categoryData);
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&subjectId=${subjectId}&categoryId=${categoryId}&searchKey=${search}`
  } else if (search !== '' &&
    allWeeks !== "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics === "All Topics") {
    // S 1 2  Search with weeks and subject applied //
    let subjectId = getSubjectId(allSubjects, subjectData);
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&week=${allWeeks}&subjectId=${subjectId}&searchKey=${search}`
  } else if (search !== '' &&
    allWeeks !== "All Weeks" &&
    allSubjects !== "All Subjects" &&
    allTopics !== "All Topics") {
    // S 1 2 3    Search with week subject and topic applied // 
    let subjectId = getSubjectId(allSubjects, subjectData);
    let categoryId = getCategoryId(allTopics, categoryData);
    return `${Utils.endPoints.getTemplates}?pageNo=${page}&limit=20&week=${allWeeks}&subjectId=${subjectId}&categoryId=${categoryId}&searchKey=${search}`
  }
}
export const ConstFunction = {
  getMonth,
  getDate,
  setFilterData,
  getTimeStamp,
  getUrl,
  getUrlForTemplate
}
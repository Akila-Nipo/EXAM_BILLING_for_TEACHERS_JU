import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './input.css';

function InputForm(props) {
  const navigate = useNavigate();
  const [numPanels, setNumPanels] = useState();
  const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
  const [currentSemester, setCurrentSemester] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
  const [selectedType, setSelectedType] = useState("Hons");
  const [selectName,setSelectedName]=useState(props.name);
  const [inputData, setInputData] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState([]); 
  const [selectedCoursesBySemester, setSelectedCoursesBySemester] = useState({});
  const [selectedPanelTypes, setSelectedPanelTypes] = useState([]);

  
  const addCoursePanel = (courseName) => {
    const courseCode = courseToCodeMapping[courseName];
    const newPanel = {
      panelType:"",
      type: "Hons",
      courseName,
      courseCode,
      numStudents: 0,
      numHours: 0,
      tabulationType: "Yearly",
      tabulationSemester: "Final Year",
      daysOfExam: "",
    };
    setInputData((prevData) => [...prevData, newPanel]);
  };

  const removeCoursePanel = (courseName) => {
    setInputData((prevData) => prevData.filter((panel) => panel.courseName !== courseName));
  };

  const handleCourseChange = (e) => {
    const selectedCourse = e.target.value;
    const isChecked = e.target.checked;

    setSelectedCoursesBySemester((prevSelectedCourses) => ({
      ...prevSelectedCourses,
      [currentSemester]: isChecked
        ? [...(prevSelectedCourses[currentSemester] || []), selectedCourse]
        : (prevSelectedCourses[currentSemester] || []).filter((course) => course !== selectedCourse),
    }));

    if (isChecked) {
      setSelectedCourses([...selectedCourses, selectedCourse]);
      addCoursePanel(selectedCourse);
    } else {
      setSelectedCourses(selectedCourses.filter((course) => course !== selectedCourse));
      removeCoursePanel(selectedCourse);
    }
  };

  const handleSemesterChange = (newSemester) => {
    setSelectedSemester(newSemester);
    setCurrentSemester(newSemester);
    setInputData([]);
    setSelectedCourses([]); // Clear the selected courses when the semester changes
  }; 
  
  const handlePanelTypeChange = (e, panelType,index) => {
    const { checked } = e.target;
    const newInputData = [...inputData];
  
    // If the checkbox is checked, add the panelType to the array
    if (checked) {
      newInputData[index] = {
        ...newInputData[index],
        panelType: [...newInputData[index].panelType, panelType],
      };
    } else {
      // If the checkbox is unchecked, remove the panelType from the array
      newInputData[index] = {
        ...newInputData[index],
        panelType: newInputData[index].panelType.filter((type) => type !== panelType),
      };
    }
  
    setInputData(newInputData);
  };
  



  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const newInputData = [...inputData];
   

    if (name === "numStudents"|| name === "numHours") {
      // Remove the old values for numStudents or numHours
      delete newInputData[index][name];
      setInputData(newInputData);
    }
    if (name === "stencilPages") {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
      } else {
        console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
      }
    }

    if (name === "daysOfExam" ) {
        const newValue = parseInt(value,10);
        if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
        }
        else {
          console.error("Selecting Days Of Exam is manadatory.");
        }
    }
    
    if (name === "numHours" || name === "daysOfExam") {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
      } else {
        console.error("Invalid input. Enter a number between 1 and 4.");
      }
    }

    if (name === "numHours") {
      const newValue = parseInt(value, 10);
      if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
        newInputData[index] = { ...newInputData[index], [name]: newValue };
        setInputData(newInputData);
      } else {
        console.error("Invalid number of hours. Enter a number between 1 and 4.");
      }
    } else if (name === "numStudents") {
      if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
        newInputData[index] = { ...newInputData[index], [name]: value };
        setInputData(newInputData);
        alert("Number of Students is mandatory for Evaluating Answer Scripts.");
      } else {
        newInputData[index] = { ...newInputData[index], [name]: value };
        setInputData(newInputData);
      }
    } else if (name === "tabulationType" || name === "tabulationSemester") {
      newInputData[index] = { ...newInputData[index], [name]: value };
      setInputData(newInputData);
    } else {
      newInputData[index] = { ...newInputData[index], [name]: value };
      setInputData(newInputData);
    }
  };
   
 
  
 

  const handleCalculate = () => {
    if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
     alert("Number of Students is mandatory for Evaluating Answer Scripts.");
      return;
    }
    
    if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
      return;
    }

    if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
      alert("Number of Students is mandatory for Viva Exam.");
      return;
    }
 

    if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Lab Exam.");
      return;
    }

    if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
      alert("Number of Days is mandatory for Lab Exam.");
      return;
    }

    if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
      alert("Number of Pages is mandatory for Stencil.");
      return;
    }

    if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
      alert("Number of Hours is mandatory for Making Question Paper.");
      return;
    }

    const results = inputData.map((data) => {
      let result = 0;
     
      if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
        if (data.numStudents === 0) {
          alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
        } 
      } 
   
      return { ...data, result };
    });

    console.log("Results after calculation:", results);
    const panelType = inputData[0].panelType;
    const department = encodeURIComponent(selectedDepartment);
    const semester = encodeURIComponent(selectedSemester);
    const name=encodeURIComponent(selectName);
    const type=encodeURIComponent(selectedType);
    console.log("Panel Type:", panelType);

    navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}&type=${type}`);
  };

  const courseOptions = {
    "Computer Science and Engineering": [
      "Algorithms-I",
      "Algorithms-I-Lab",
      "Electronic Circuits",
      "Numerical Methods",
      "Web Design and Programming Laboratory-I",
      "Technical Writing and Presentations",
      "Database Systems",
      "Computational Geometry",
      "Structured Programming Language",
      "Java",
    ],
  };

  const courseToCodeMapping = {
    "Structured Programming Language":"CSE-105",
    "Structured Programming Language-Lab": "CSE-106",
    "Data Structures":"CSE 153",
    "Data Structures Lab":"CSE 154",
    "Discrete Mathematics":"CSE-155",
    "Algorithms-I": "CSE-209",
    "Algorithms-I-Lab": "CSE-210",
    "Electronic Circuits": "CSE-107",
    "Numerical Methods": "CSE-205",
    "Web Design and Programming Laboratory-I":"CSE-312",
    "Technical Writing and Presentations":"CSE-112",
    "Database Systems":"CSE-255",
    "Computational Geometry":"CSE-305",
    "Java":"CSE-212",
    "Operating Systems":"CSE-309",
    "Operating Systems Lab":"CSE-310",
   
  };

  const semesterToCoursesMapping = {
    "1st Year 1st Semester": [
      "Structured Programming Language",
      "Structured Programming Language-Lab",
      "Electronic Circuits",
  
    ],
    "1st Year 2nd Semester": [
      "Data Structures",
      "Data Structures Lab",
      "Discrete Mathematics",
      "Technical Writing and Presentations"
    ],

    "2nd Year 1st Semester": [
      "Algorithms-I",
      "Algorithms-I-Lab",
      "Numerical Methods",
      "Java",
    ],

    "3rd Year 1st Semester": [
      "Web Design and Programming Laboratory-I",
      "Computational Geometry",
      "Operating Systems",
      "Operating Systems Lab",
    ],
   
  };
  const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
  const courseOptionsForSelectedSemester = semesterToCoursesMapping[selectedSemester] || [];
  
  
  return (
    <div className="container mt-4 ">
    
      <div className="form-group select-container">
        <label htmlFor="selectedDepartment">Select Department:</label>
        <select
          className="form-control"
          aria-label="Disabled select example" disabled
          style={{height:'50px',fontSize:'20px'}}
          id="selectedDepartment"
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option value="Computer Science and Engineering">Computer Science and Engineering</option>
        </select>
      </div>

      <div className="form-group select-container">
        <label htmlFor="selectName">Name:</label>
        <select
          className="form-control"
          aria-label="Disabled select example" disabled
          style={{height:'50px',fontSize:'20px'}}
          id="selectedDepartment"
          value={selectName}
          onChange={(e) => setSelectedName(e.target.value)}
        >
          <option value={props.name}>{props.name}</option>
        </select>
      </div>
       
      <div className="form-group select-container">
        <label htmlFor="selectedCourseType">Select Type:</label>
        <select
          className="form-select form-select-lg mb-3"
          style={{height:'50px',fontSize:'20px'}}
          id="selectedType"
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
        >
          <option value="Hons">Hons</option>
          <option value="Msc">Msc</option>
  
        </select>
      </div>
    
     
      <div className="form-group select-container">
         <label htmlFor="selectedSemester" >Select Semester:</label>
         <select
          className="form-select form-select-lg mb-3"
          style={{height:'50px',fontSize:'20px'}}
          id="selectedSemester"
          value={selectedSemester}
          onChange={(e) => {
            setSelectedSemester(e.target.value);
            setCurrentSemester(e.target.value); // Update current semester when selected
            setInputData([]); // Clear panels when the semester changes
          }}
        >
          <option value="1st Year 1st Semester">1st Year 1st Semester</option>
           <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
           <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
           <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
           <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
           <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
           <option value="4th Year 1st Semester">4th Year 1st Semester</option>
           <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
         </select>
         </div>
         

         <div className="form-group select-container" style={{marginTop:'30px'}}>
  <label htmlFor="courseSelect">Select Courses:</label>
  <div className="course-checkboxes">
    {courseOptionsForSelectedSemester.map((course, optionIndex) => (
      <label key={optionIndex} className="checkbox-label" style={{backgroundColor:'#dfedea',borderWidth:'2px',borderColor:'rgb(126, 123, 123)', margin: '17px', padding: '14px', width: '290px',height:'120px', display: 'inline-block' , textAlign:'start'}}>
       <div style={{display:'flex',flex:'wrap',alignContent:'center'}}>
       <div> 
        <input
          type="checkbox"
          name="selectedCourse"
          value={course}
          onChange={handleCourseChange}
          checked={selectedCourses.includes(course)}
          className="checkbox-input" style={{ margin: '7px',width:'25px',height:'20px'}}
        />
        </div>
        <div style={{marginTop:'2px',fontSize:'20px',textDecoration:'none'}}>
        {course}
        </div>
        </div>
      </label>
      
     
    ))}
  </div>
</div>
       

      {selectedCourses.length > 0 && (
      <div className="panel-border" >
      <div className="row d-flex justify-content-center" style={{backgroundColor:'white'}}>
        {inputData.map((data, index) => (
          <div key={index} className="col-md-12 mb-2" style={{backgroundColor:'#b3b3b3',borderRadius:'10px',padding:'10px',margin:'50px'}}>
            <div className="p-3 my-2" style={{backgroundColor:'#f0ebeb',borderRadius:'9px',margin:'10px'}}>
              <h3 id="PanelNo" style={{margin:'20px',fontSize:'26px'}}># {data.courseName}</h3>
              
            
   <div className="form-group select-container">
  <label htmlFor={`courseName${index}`}>Course Name:</label>
  <input
    type="text"
    className="form-control"
    style={{height:'50px',fontSize:'20px'}}
    aria-label="Disabled select example" disabled
    id={`courseName${index}`}
    name="courseName"
    value={data.courseName}
    readOnly
  />
  </div>

<div className="form-group select-container">
  <label htmlFor={`courseCode${index}`}>Course Code:</label>
  <input
    type="text"  
    className="form-control"
    style={{height:'50px',fontSize:'20px'}}
    aria-label="Disabled select example" disabled
    id={`courseCode${index}`}
    name="courseCode"
    value={data.courseCode}
    readOnly
  />
</div>
<div className="form-group checkbox-container criteriaSelectHeading">
  <label>Criteria Of Work :</label>
  <div className="criteriaSelect">
  <div className="column-container">
  {["Making Question Paper", "Evaluating Answer Scripts", "Question Moderation", "Lab Exam", "Viva Exam", "Stencil"].map((panelType, idx) => (
    <div key={idx} className="column-item">
      <div className="criteriaSelectCheckbox"style={{display:'flex',flex:'wrap'}}>
        <div classname="criteriaCheckbox">
      <input
        type="checkbox"
        id={`panelType${idx}`}
        name="panelType"
        value={panelType}
        checked={data.panelType.includes(panelType)}
        onChange={(e) => handlePanelTypeChange(e, panelType,index)}
        className="checkbox-input" 
         style={{ margin: '15px',width:'30px',height:'30px',}}
      />
      </div>
      <div classname="criteriaCheckbox" style={{ margin: '9px'}}>
      <label htmlFor={`panelType${idx}`} style={{fontSize:'22px',cursor:'pointer'}}>{panelType}</label>
      </div>
      </div>
    </div>
  ))}
  </div>
</div>
</div>


{data.panelType.includes("Stencil") ? (
  <div className="form-group select-container">
    <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
    <select
      type="number"
      className="form-select form-select-lg mb-3"
      id={`stencilPages${index}`}
      name="stencilPages"
      value={data.stencilPages}
      required
      onChange={(e) => handleInputChange(e, index)}
      
    >
      <option value="0">--</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
    </select>
  </div>
) : null}

{data.panelType.includes("Evaluating Answer Scripts") || data.panelType.includes("Viva Exam") ? (
  // Render "Number of Students" field for other criteria, if needed
  <div className="form-group select-container">
    <label htmlFor={`numStudents${index}`}>Number of Students:</label>
    <select
      type="number"
      className={`form-select form-select-lg mb-3${data.panelType.includes("Evaluating Answer Scripts") || data.panelType.includes("Viva Exam") ? " mandatory" : ""}`}
      id={`numStudents${index}`}
      name="numStudents"
      value={data.numStudents}
      onChange={(e) => handleInputChange(e, index)}
    >
      <option value="0">0</option>
      <option value="10">10</option>
      <option value="20">20</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
    </select>
  </div>
) : null}

<div className="form-group select-container">
                <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
                 <select
                  type="number"
                  className="form-select form-select-lg mb-3"
                  id={`numHours${index}`}
                  name="numHours"
                  value={data.numHours}
                  onChange={(e) => handleInputChange(e, index)}
                > 
                  <option value="0">--</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                  <option value="6">6</option>

                </select>
                
              </div>

{data.panelType.includes("Lab Exam") ? (
  <div className="form-group select-container">
    <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
    <select
      type="number"
      className="form-select form-select-lg mb-3"
      id={`daysOfExam${index}`}
      name="daysOfExam"
      value={data.daysOfExam}
      onChange={(e) => handleInputChange(e, index)}
      required
    >
      <option value="0">--</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select>
  </div>
) : null}

            </div>
          </div>
        ))}
      </div>
      </div>
       )}
      <div className="text-center"> {/* Center-align the button */}
        <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
          Prepare My Bill
        </button>
      </div>
    </div>
  );
}

export default InputForm;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './input.css';

// function InputForm(props) {
//   const navigate = useNavigate();
//   const [numPanels, setNumPanels] = useState(1);
//   const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
//   const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
//   const [selectName,setSelectedName]=useState(props.name);
//   const [inputData, setInputData] = useState([]);
//   console.log(selectName);
  
  

//   const addCoursePanel = (courseName) => {
//     const courseCode = courseToCodeMapping[courseName];
//     const newPanel = {
//       panelType: "Making Question Paper",
//       type: "Hons",
//       courseName,
//       courseCode,
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//       daysOfExam: "--",
//     };
//     setInputData((prevData) => [...prevData, newPanel]);
//   };

//   const removeCoursePanel = (courseName) => {
//     setInputData((prevData) => prevData.filter(panel => panel.courseName !== courseName));
//   };

//   const handleCourseChange = (e) => {
//     const selectedCourse = e.target.value;
//     const isChecked = e.target.checked;

//     if (isChecked) {
//       addCoursePanel(selectedCourse);
//     } else {
//       removeCoursePanel(selectedCourse);
//     }
//   };

 
//  const handleNumPanelsChange = (e) => {
//     const numPanels = parseInt(e.target.value);
//      setInputData((prevData) => {
//       const newInputData = prevData.slice(0, numPanels); // Keep only the first `numPanels` panels
//       return newInputData;
//     });
//     setNumPanels(numPanels);
//     setInputData((prevData) => {
//       const newPanels = new Array(numPanels - prevData.length).fill({
//         panelType: "Making Question Paper",
//         type: "Hons",
//         courseName: "Algorithms-I",
//         courseCode: "CSE-209",
//         numStudents: 0,
//         numHours: 0,
//         tabulationType: "Yearly",
//         tabulationSemester: "Final Year",
//         daysOfExam:"--",
//       });
//       return prevData.concat(newPanels);
//     });
//   };

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
   
//     const newInputData = [...inputData];
    
//     if (name === "courseName") {
//       // If the courseName is changed, set the corresponding course code
//       const courseCode = courseToCodeMapping[value];
//       newInputData[index] = { ...newInputData[index], courseName: value, courseCode };
//       setInputData(newInputData);
//     } 

//     if (name === "numStudents"||name === "numStudents" || name === "numHours") {
//       // Remove the old values for numStudents or numHours
//       delete newInputData[index][name];
//       setInputData(newInputData);
//     }
//     if (name === "stencilPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
//       }
//     }

//     if (name === "daysOfExam" ) {
//         const newValue = parseInt(value,10);
//         if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//         }
//         else {
//           console.error("Selecting Days Of Exam is manadatory.");
//         }
//     }
    
//     if (name === "numHours" || name === "daysOfExam") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid input. Enter a number between 1 and 4.");
//       }
//     }

//     if (name === "numHours") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of hours. Enter a number between 1 and 4.");
//       }
//     } else if (name === "numStudents") {
//       if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//         alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       } else {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//       }
//     } else if (name === "tabulationType" || name === "tabulationSemester") {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     } else {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     }
//   };
   
 
  
//   const handlePanelTypeChange = (e, index) => {
//     const { value } = e.target;
//     const newInputData = [...inputData];
//     newInputData[index] = { ...newInputData[index], panelType: value };
//     setInputData(newInputData);
//   };

//   const handleCalculate = () => {
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       return;
//     }
    
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Viva Exam.");
//       return;
//     }
 

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
//       alert("Number of Days is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
//       alert("Number of Pages is mandatory for Stencil.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Making Question Paper.");
//       return;
//     }

//     const results = inputData.map((data) => {
//       let result = 0;
     
//       if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
//         if (data.numStudents === 0) {
//           alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
//         } 
//       } 
   
//       return { ...data, result };
//     });

//     console.log("Results after calculation:", results);

//     const panelType = inputData[0].panelType;
//     const department = encodeURIComponent(selectedDepartment);
//     const semester = encodeURIComponent(selectedSemester);
//     const name=encodeURIComponent(selectName);
//     console.log("Panel Type:", panelType);

//     navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}`);
//   };
//   const courseOptions = {
//     "Computer Science and Engineering": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Electronic Circuits",
//       "Numerical Methods",
//       "Web Design and Programming Laboratory-I",
//       "Technical Writing and Presentations",
//       "Database Systems",
//       "Computational Geometry",
//       "Structured Programming Language",
//       "Java",
//     ],
//   };
//   const courseCodeOptions = {
//     "Computer Science and Engineering": [
//       "CSE-209",
//       "CSE-203",
//       "CSE-205",
//       "CSE-312",
//       "CSE-212",
//       "CSE-255",
//       "CSE-305",
//       "CSE-212",
//       "CSE-107",
//       "CSE-105",
//     ],
//   };

//   const courseToCodeMapping = {
//     "Algorithms-I": "CSE-209",
//     "Algorithms-I-Lab": "CSE-210",
//     "Electronic Circuits": "CSE-203",
//     "Numerical Methods": "CSE-205",
//     "Web Design and Programming Laboratory-I":"CSE-312",
//     "Technical Writing and Presentations":"CSE-112",
//     "Database Systems":"CSE-255",
//     "Computational Geometry":"CSE-305",
//     "Structured Programming Language":"CSE-105",
//     "Java":"CSE-212",
   
//   };
//   const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
  
  
//   return (
//     <div className="container mt-4 ">
    
//       <div className="form-group select-container">
//         <label htmlFor="selectedDepartment">Select Department:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectedDepartment}
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           <option value="Computer Science and Engineering">Computer Science and Engineering</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//         <label htmlFor="selectName">Name:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectName}
//           onChange={(e) => setSelectedName(e.target.value)}
//         >
//           <option value={props.name}>{props.name}</option>
//         </select>
//       </div>
       
    
     
//       <div className="form-group select-container">
//          <label htmlFor="selectedSemester" >Select Semester:</label>
//          <select
//           className="form-control"
//           id="selectedSemester"
//           value={selectedSemester}
//           onChange={(e) => setSelectedSemester(e.target.value)}
//         >
//           <option value="1st Year 1st Semester">1st Year 1st Semester</option>
//            <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
//            <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
//            <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
//            <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
//            <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
//            <option value="4th Year 1st Semester">4th Year 1st Semester</option>
//            <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
//          </select>
//          </div>
//          <div className="form-group select-container">
//         <label htmlFor="courseSelect">Select Courses:</label>
//         <select className="form-control" id="courseSelect">
//           {courseOptionsForSelectedDepartment.map((course, optionIndex) => (
//             <option key={optionIndex} value={course}>
//               {course}
//             </option>
//           ))}
//         </select>
//         <div className="course-radio-buttons">
//           {courseOptionsForSelectedDepartment.map((course, optionIndex) => (
//             <label key={optionIndex}>
//               <input
//                 type="radio"
//                 name="selectedCourse"
//                 value={course}
//                 onChange={handleCourseChange}
//               />
//               {course}
//             </label>
//           ))}
//         </div>
//       </div>
   
       
//       <div className="panel-border">
//       <div className="row d-flex justify-content-center ">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {index + 1}</h3>
//               <div className="form-group select-container">
//                 <label htmlFor={`panelType${index}`}>Criteria Of Work:</label>
//                 <select className="form-control"
//                   id={`panelType${index}`}
//                   name="panelType"
//                   value={data.panelType}
//                   onChange={(e) => handlePanelTypeChange(e, index)}
//                 >
//                   <option value="Making Question Paper">Making Question Paper</option>
//                   <option value="Evaluating Answer Scripts">Evaluating Answer Scripts</option>
//                   <option value="Question Moderation">Question Moderation</option>
//                   <option value="Lab Exam">Lab Exam</option>
//                   <option value="Viva Exam">Viva Exam</option>
//                   <option value="Stencil">Stencil</option>
//                 </select>
//               </div>
//               <div className="form-group select-container">
//                 <label htmlFor={`type${index}`}>Type (Hons/Masters/MPhil/PhD):</label>
//                 <select
//                   className="form-control"
//                   id={`type${index}`}
//                   name="type"
//                   value={data.type}
//                   onChange={(e) => handleInputChange(e, index)}
//                 >
//                   <option value="Hons">Hons</option>
//                   <option value="Masters">Masters</option>
//                   <option value="MPhil">MPhil</option>
//                   <option value="PhD">PhD</option>
//                 </select>
//               </div>
//               <div className="form-group select-container">
//               <label htmlFor={`courseName${index}`}>Course Name:</label>
//               <select
//                 className="form-control"
//                 id={`courseName${index}`}
//                 name="courseName"
//                 value={data.courseName}
//                 onChange={(e) => handleInputChange(e, index)}
//               >
//                 {courseOptionsForSelectedDepartment.map((course, optionIndex) => (
//                   <option key={optionIndex} value={course}>
//                     {course}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group select-container">
//                 <label htmlFor={`courseCode${index}`}>Course Code:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id={`courseCode${index}`}
//                   name="courseCode"
//                   value={data.courseCode}
//                   readOnly
//                 />
//               </div>
//               {data.panelType === "Stencil" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`stencilPages${index}`}
//                     name="stencilPages"
//                     value={data.stencilPages}
//                     onChange={(e) => handleInputChange(e, index)}
//                   >     
//                         <option value="0">--</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select>
//                 </div>
//               ) : null}
//               {data.panelType === "Evaluating Answer Scripts" ||
//                 data.panelType === "Thesis/Project Report Evaluation" ||
//                 data.panelType === "Viva Exam" ? (
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" ? " mandatory" : ""}`}
//                       id={`numStudents${index}`}
//                       name="numStudents"
//                       value={data.numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 ) : null}

            
//               <div className="form-group select-conatiner">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                 <select
//                   type="number"
//                   className="form-control"
//                   id={`numHours${index}`}
//                   name="numHours"
//                   value={data.numHours}
//                   onChange={(e) => handleInputChange(e, index)}
//                 > 
//                   <option value="0">--</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5</option>
//                   <option value="6">6</option>

//                 </select>
                
//               </div>

//               {data.panelType === "Lab Exam" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`daysOfExam${index}`}
//                     name="daysOfExam"
//                     value={data.daysOfExam}
//                     onChange={(e) => handleInputChange(e, index)}required
//                   > 
//                     <option value="0">--</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     </select>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>
//       <div className="text-center"> {/* Center-align the button */}
//         <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
//           Prepare My Bill
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InputForm;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './input.css';

// function InputForm(props) {
//   const navigate = useNavigate();
//   const [numPanels, setNumPanels] = useState(1);
//   const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
//   const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
//   const [selectName,setSelectedName]=useState(props.name);
//   console.log(selectName);
//   const [inputData, setInputData] = useState([
//     {
//       panelType: "Making Question Paper",
//       type: "Hons",
//       courseName: "Algorithms-I",
//       courseCode: "CSE-209",
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//     },
  
   
//   ]);
//  const handleNumPanelsChange = (e) => {
//     const numPanels = parseInt(e.target.value);
//      setInputData((prevData) => {
//       const newInputData = prevData.slice(0, numPanels); // Keep only the first `numPanels` panels
//       return newInputData;
//     });
//     setNumPanels(numPanels);
//     setInputData((prevData) => {
//       const newPanels = new Array(numPanels - prevData.length).fill({
//         panelType: "Making Question Paper",
//         type: "Hons",
//         courseName: "Algorithms-I",
//         courseCode: "CSE-209",
//         numStudents: 0,
//         numHours: 0,
//         tabulationType: "Yearly",
//         tabulationSemester: "Final Year",
//       });
//       return prevData.concat(newPanels);
//     });
//   };

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const newInputData = [...inputData];
    
//     if (name === "courseName") {
//       // If the courseName is changed, set the corresponding course code
//       const courseCode = courseToCodeMapping[value];
//       newInputData[index] = { ...newInputData[index], courseName: value, courseCode };
//       setInputData(newInputData);
//     } 

//     if (name === "numPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 100) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of pages. Enter a number between 1 and 100.");
//       }
//     }

//     if (name === "numStudents"||name === "numStudents" || name === "numHours") {
//       // Remove the old values for numStudents or numHours
//       delete newInputData[index][name];
//       setInputData(newInputData);
//     }
//     if (name === "stencilPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
//       }
//     }

//     if (name === "daysOfExam") {
//       // Remove the old value for daysOfExam
//       delete newInputData[index].daysOfExam;
//       setInputData(newInputData);
//     }
    
//     if (name === "numHours" || name === "daysOfExam") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid input. Enter a number between 1 and 4.");
//       }
//     }

//     if (name === "numHours") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of hours. Enter a number between 1 and 4.");
//       }
//     } else if (name === "numStudents") {
//       if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//         alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       } else {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//       }
//     } else if (name === "tabulationType" || name === "tabulationSemester") {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     } else {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     }
//   };
   
 
  
//   const handlePanelTypeChange = (e, index) => {
//     const { value } = e.target;
//     const newInputData = [...inputData];
//     newInputData[index] = { ...newInputData[index], panelType: value };
//     setInputData(newInputData);
//   };

//   const handleCalculate = () => {
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       return;
//     }
    
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Viva Exam.");
//       return;
//     }
//     if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages>3)) {
//       alert("Number of Pages should be <=3.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Making Question Paper.");
//       return;
//     }

//     const results = inputData.map((data) => {
//       let result = 0;
     
//       if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
//         if (data.numStudents === 0) {
//           alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
//         } 
//       } 
   
//       return { ...data, result };
//     });

//     console.log("Results after calculation:", results);

//     const panelType = inputData[0].panelType;
//     const department = encodeURIComponent(selectedDepartment);
//     const semester = encodeURIComponent(selectedSemester);
//     const name=encodeURIComponent(selectName);
//     console.log("Panel Type:", panelType);

//     navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}`);
//   };
//   const courseOptions = {
//     "Computer Science and Engineering": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Electronic Circuits",
//       "Numerical Methods",
//       "Web Design and Programming Laboratory-I",
//       "Technical Writing and Presentations",
//       "Database Systems",
//       "Computational Geometry",
//       "Structured Programming Language",
//       "Java",
//     ],
//   };
//   const courseCodeOptions = {
//     "Computer Science and Engineering": [
//       "CSE-209",
//       "CSE-203",
//       "CSE-205",
//       "CSE-312",
//       "CSE-212",
//       "CSE-255",
//       "CSE-305",
//       "CSE-212",
//       "CSE-107",
//       "CSE-105",
//     ],
//   };

//   const courseToCodeMapping = {
//     "Algorithms-I": "CSE-209",
//     "Algorithms-I-Lab": "CSE-210",
//     "Electronic Circuits": "CSE-203",
//     "Numerical Methods": "CSE-205",
//     "Web Design and Programming Laboratory-I":"CSE-312",
//     "Technical Writing and Presentations":"CSE-112",
//     "Database Systems":"CSE-255",
//     "Computational Geometry":"CSE-305",
//     "Structured Programming Language":"CSE-105",
//     "Java":"CSE-212",
   
//   };
//   const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
//   const courseCodeOptionsForSelectedDepartment = courseCodeOptions[selectedDepartment] || [];
  
  
//   return (
//     <div className="container mt-4 ">
    
//       <div className="form-group select-container">
//         <label htmlFor="selectedDepartment">Select Department:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectedDepartment}
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           <option value="Computer Science and Engineering">Computer Science and Engineering</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//         <label htmlFor="selectName">Name:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectName}
//           onChange={(e) => setSelectedName(e.target.value)}
//         >
//           <option value={props.name}>{props.name}</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//          <label htmlFor="selectedSemester">Select Semester:</label>
//          <select
//           className="form-control"
//           id="selectedSemester"
//           value={selectedSemester}
//           onChange={(e) => setSelectedSemester(e.target.value)}
//         >
//           <option value="1st Year 1st Semester">1st Year 1st Semester</option>
//            <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
//            <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
//           <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
//            <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
//            <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
//            <option value="4th Year 1st Semester">4th Year 1st Semester</option>
//          <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
//          </select>
//        </div>
       
//       <div className="form-group ">
//         <label htmlFor="numPanels">Select Number of Panel(s):</label>
//         <input
//           type="number"
//           className="form-control"
//           id="numPanels"
//           value={numPanels}
//           onChange={handleNumPanelsChange}
//         />
//       </div>
       

//       <div className="row d-flex justify-content-center ">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {index + 1}</h3>
//               <div className="form-group select-container">
//                 <label htmlFor={`panelType${index}`}>Criteria Of Work:</label>
//                 <select className="form-control"
//                   id={`panelType${index}`}
//                   name="panelType"
//                   value={data.panelType}
//                   onChange={(e) => handlePanelTypeChange(e, index)}
//                 >
//                   <option value="Making Question Paper">Making Question Paper</option>
//                   <option value="Evaluating Answer Scripts">Evaluating Answer Scripts</option>
//                   <option value="Question Moderation">Question Moderation</option>
//                   <option value="Lab Exam">Lab Exam</option>
//                   <option value="Viva Exam">Viva Exam</option>
//                   <option value="Stencil">Stencil</option>
//                 </select>
//               </div>
//               <div className="form-group select-container">
//                 <label htmlFor={`type${index}`}>Type (Hons/Masters/MPhil/PhD):</label>
//                 <select
//                   className="form-control"
//                   id={`type${index}`}
//                   name="type"
//                   value={data.type}
//                   onChange={(e) => handleInputChange(e, index)}
//                 >
//                   <option value="Hons">Hons</option>
//                   <option value="Masters">Masters</option>
//                   <option value="MPhil">MPhil</option>
//                   <option value="PhD">PhD</option>
//                 </select>
//               </div>
//               <div className="form-group select-container">
//               <label htmlFor={`courseName${index}`}>Course Name:</label>
//               <select
//                 className="form-control"
//                 id={`courseName${index}`}
//                 name="courseName"
//                 value={data.courseName}
//                 onChange={(e) => handleInputChange(e, index)}
//               >
//                 {courseOptionsForSelectedDepartment.map((course, optionIndex) => (
//                   <option key={optionIndex} value={course}>
//                     {course}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group select-container">
//                 <label htmlFor={`courseCode${index}`}>Course Code:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id={`courseCode${index}`}
//                   name="courseCode"
//                   value={data.courseCode}
//                   readOnly
//                 />
//               </div>
//               {data.panelType === "Stencil" ? (
//                 <div className="form-group">
//                   <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id={`stencilPages${index}`}
//                     name="stencilPages"
//                     value={data.stencilPages}
//                     onChange={(e) => handleInputChange(e, index)}
//                   />
//                 </div>
//               ) : null}
//               {data.panelType === "Evaluating Answer Scripts" ||
//                 data.panelType === "Thesis/Project Report Evaluation" ||
//                 data.panelType === "Viva Exam" ? (
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" ? " mandatory" : ""}`}
//                       id={`numStudents${index}`}
//                       name="numStudents"
//                       value={data.numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 ) : null}

            
//               <div className="form-group">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                 <input
//                   type="number"
//                   className="form-control"
//                   id={`numHours${index}`}
//                   name="numHours"
//                   value={data.numHours}
//                   onChange={(e) => handleInputChange(e, index)}
//                 />
                
//               </div>

//               {data.panelType === "Lab Exam" ? (
//                 <div className="form-group">
//                   <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//                   <input
//                     type="number"
//                     className="form-control"
//                     id={`daysOfExam${index}`}
//                     name="daysOfExam"
//                     value={data.daysOfExam}
//                     onChange={(e) => handleInputChange(e, index)}
//                   />
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>

//       <div className="text-center"> {/* Center-align the button */}
//         <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
//           Prepare My Bill
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InputForm;


// 29/10/23
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './input.css';

// function InputForm(props) {
//   const navigate = useNavigate();
//   const [numPanels, setNumPanels] = useState(1);
//   const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
//   const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
//   const [selectName,setSelectedName]=useState(props.name);
//   console.log(selectName);
  
//   const [inputData, setInputData] = useState([
//     {
//       panelType: "Making Question Paper",
//       type: "Hons",
//       courseName: "Algorithms-I",
//       courseCode: "CSE-209",
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//       daysOfExam:"--",
//     },
  
   
//   ]);
//  const handleNumPanelsChange = (e) => {
//     const numPanels = parseInt(e.target.value);
//      setInputData((prevData) => {
//       const newInputData = prevData.slice(0, numPanels); 
//       return newInputData;
//     });
//     setNumPanels(numPanels);
//     setInputData((prevData) => {
//       const newPanels = new Array(numPanels - prevData.length).fill({
//         panelType: "Making Question Paper",
//         type: "Hons",
//         courseName: "Algorithms-I",
//         courseCode: "CSE-209",
//         numStudents: 0,
//         numHours: 0,
//         tabulationType: "Yearly",
//         tabulationSemester: "Final Year",
//         daysOfExam:"--",
//       });
//       return prevData.concat(newPanels);
//     });
//   };

//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
   
//     const newInputData = [...inputData];
    
//     if (name === "courseName") {
     
//       const courseCode = courseToCodeMapping[value];
//       newInputData[index] = { ...newInputData[index], courseName: value, courseCode };
//       setInputData(newInputData);
//     } 

//     if (name === "numStudents"||name === "numStudents" || name === "numHours") {
//       // Remove the old values for numStudents or numHours
//       delete newInputData[index][name];
//       setInputData(newInputData);
//     }
//     if (name === "stencilPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
//       }
//     }

//     if (name === "daysOfExam" ) {
//         const newValue = parseInt(value,10);
//         if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//         }
//         else {
//           console.error("Selecting Days Of Exam is manadatory.");
//         }
//     }
    
//     if (name === "numHours" || name === "daysOfExam") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid input. Enter a number between 1 and 4.");
//       }
//     }

//     if (name === "numHours") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of hours. Enter a number between 1 and 4.");
//       }
//     } else if (name === "numStudents") {
//       if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//         alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       } else {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//       }
//     } else if (name === "tabulationType" || name === "tabulationSemester") {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     } else {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     }
//   };
   
 
  
//   const handlePanelTypeChange = (e, index) => {
//     const { value } = e.target;
//     const newInputData = [...inputData];
//     newInputData[index] = { ...newInputData[index], panelType: value };
//     setInputData(newInputData);
//   };

//   const handleCalculate = () => {
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       return;
//     }
    
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Viva Exam.");
//       return;
//     }
 

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
//       alert("Number of Days is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
//       alert("Number of Pages is mandatory for Stencil.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Making Question Paper.");
//       return;
//     }

//     const results = inputData.map((data) => {
//       let result = 0;
     
//       if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
//         if (data.numStudents === 0) {
//           alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
//         } 
//       } 
   
//       return { ...data, result };
//     });

//     console.log("Results after calculation:", results);

//     const panelType = inputData[0].panelType;
//     const department = encodeURIComponent(selectedDepartment);
//     const semester = encodeURIComponent(selectedSemester);
//     const name=encodeURIComponent(selectName);
//     console.log("Panel Type:", panelType);

//     navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}`);
//   };
//   const courseOptions = {
//     "Computer Science and Engineering": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Electronic Circuits",
//       "Numerical Methods",
//       "Web Design and Programming Laboratory-I",
//       "Technical Writing and Presentations",
//       "Database Systems",
//       "Computational Geometry",
//       "Structured Programming Language",
//       "Java",
//     ],
//   };
//   const courseCodeOptions = {
//     "Computer Science and Engineering": [
//       "CSE-209",
//       "CSE-203",
//       "CSE-205",
//       "CSE-312",
//       "CSE-212",
//       "CSE-255",
//       "CSE-305",
//       "CSE-212",
//       "CSE-107",
//       "CSE-105",
//     ],
//   };

//   const courseToCodeMapping = {
//     "Algorithms-I": "CSE-209",
//     "Algorithms-I-Lab": "CSE-210",
//     "Electronic Circuits": "CSE-203",
//     "Numerical Methods": "CSE-205",
//     "Web Design and Programming Laboratory-I":"CSE-312",
//     "Technical Writing and Presentations":"CSE-112",
//     "Database Systems":"CSE-255",
//     "Computational Geometry":"CSE-305",
//     "Structured Programming Language":"CSE-105",
//     "Java":"CSE-212",
   
//   };
//   const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
//   const courseCodeOptionsForSelectedDepartment = courseCodeOptions[selectedDepartment] || [];
  
  
//   return (
//     <div className="container mt-4 ">
    
//       <div className="form-group select-container">
//         <label htmlFor="selectedDepartment">Select Department:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectedDepartment}
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           <option value="Computer Science and Engineering">Computer Science and Engineering</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//         <label htmlFor="selectName">Name:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectName}
//           onChange={(e) => setSelectedName(e.target.value)}
//         >
//           <option value={props.name}>{props.name}</option>
//         </select>
//       </div>
       
    
     
//       <div className="form-group select-container">
//          <label htmlFor="selectedSemester" >Select Semester:</label>
//          <select
//           className="form-control"
//           id="selectedSemester"
//           value={selectedSemester}
//           onChange={(e) => setSelectedSemester(e.target.value)}
//         >
//           <option value="1st Year 1st Semester">1st Year 1st Semester</option>
//            <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
//            <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
//            <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
//            <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
//            <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
//            <option value="4th Year 1st Semester">4th Year 1st Semester</option>
//            <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
//          </select>
//          </div>

//       <div className="form-group ">
//         <label htmlFor="numPanels">Select Number of Panel(s):</label>
//         <input
//           type="number"
//           className="form-control"
//           id="numPanels"
//           value={numPanels}
//           onChange={handleNumPanelsChange}
//         />
//       </div>
       
//       <div className="panel-border">
//       <div className="row d-flex justify-content-center ">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {index + 1}</h3>
//               <div className="form-group select-container">
//                 <label htmlFor={`panelType${index}`}>Criteria Of Work:</label>
//                 <select className="form-control"
//                   id={`panelType${index}`}
//                   name="panelType"
//                   value={data.panelType}
//                   onChange={(e) => handlePanelTypeChange(e, index)}
//                 >
//                   <option value="Making Question Paper">Making Question Paper</option>
//                   <option value="Evaluating Answer Scripts">Evaluating Answer Scripts</option>
//                   <option value="Question Moderation">Question Moderation</option>
//                   <option value="Lab Exam">Lab Exam</option>
//                   <option value="Viva Exam">Viva Exam</option>
//                   <option value="Stencil">Stencil</option>
//                 </select>
//               </div>
//               <div className="form-group select-container">
//                 <label htmlFor={`type${index}`}>Type (Hons/Masters/MPhil/PhD):</label>
//                 <select
//                   className="form-control"
//                   id={`type${index}`}
//                   name="type"
//                   value={data.type}
//                   onChange={(e) => handleInputChange(e, index)}
//                 >
//                   <option value="Hons">Hons</option>
//                   <option value="Masters">Masters</option>
//                   <option value="MPhil">MPhil</option>
//                   <option value="PhD">PhD</option>
//                 </select>
//               </div>
//               <div className="form-group select-container">
//               <label htmlFor={`courseName${index}`}>Course Name:</label>
//               <select
//                 className="form-control"
//                 id={`courseName${index}`}
//                 name="courseName"
//                 value={data.courseName}
//                 onChange={(e) => handleInputChange(e, index)}
//               >
//                 {courseOptionsForSelectedDepartment.map((course, optionIndex) => (
//                   <option key={optionIndex} value={course}>
//                     {course}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group select-container">
//                 <label htmlFor={`courseCode${index}`}>Course Code:</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id={`courseCode${index}`}
//                   name="courseCode"
//                   value={data.courseCode}
//                   readOnly
//                 />
//               </div>
//               {data.panelType === "Stencil" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`stencilPages${index}`}
//                     name="stencilPages"
//                     value={data.stencilPages}
//                     onChange={(e) => handleInputChange(e, index)}
//                   >     
//                         <option value="0">--</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select>
//                 </div>
//               ) : null}
//               {data.panelType === "Evaluating Answer Scripts" ||
//                 data.panelType === "Thesis/Project Report Evaluation" ||
//                 data.panelType === "Viva Exam" ? (
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" ? " mandatory" : ""}`}
//                       id={`numStudents${index}`}
//                       name="numStudents"
//                       value={data.numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 ) : null}

            
//               <div className="form-group select-conatiner">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                 <select
//                   type="number"
//                   className="form-control"
//                   id={`numHours${index}`}
//                   name="numHours"
//                   value={data.numHours}
//                   onChange={(e) => handleInputChange(e, index)}
//                 > 
//                   <option value="0">--</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5</option>
//                   <option value="6">6</option>

//                 </select>
                
//               </div>

//               {data.panelType === "Lab Exam" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`daysOfExam${index}`}
//                     name="daysOfExam"
//                     value={data.daysOfExam}
//                     onChange={(e) => handleInputChange(e, index)}required
//                   > 
//                     <option value="0">--</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     </select>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>
//       <div className="text-center"> {/* Center-align the button */}
//         <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
//           Prepare My Bill
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InputForm;

// Oct 10:40pm
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './input.css';

// function InputForm(props) {
//   const navigate = useNavigate();
//   const [numPanels, setNumPanels] = useState();
//   const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
//   const [currentSemester, setCurrentSemester] = useState();
//   const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
//   const [selectedType, setSelectedType] = useState("Hons");
//   const [selectName,setSelectedName]=useState(props.name);
//   const [inputData, setInputData] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]); 
//   const [selectedCoursesBySemester, setSelectedCoursesBySemester] = useState({});
  
//   const addCoursePanel = (courseName) => {
//     const courseCode = courseToCodeMapping[courseName];
//     const newPanel = {
//       panelType: "Making Question Paper",
//       type: "Hons",
//       courseName,
//       courseCode,
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//       daysOfExam: "--",
//     };
//     setInputData((prevData) => [...prevData, newPanel]);
//   };

//   const removeCoursePanel = (courseName) => {
//     setInputData((prevData) => prevData.filter((panel) => panel.courseName !== courseName));
//   };

//   const handleCourseChange = (e) => {
//     const selectedCourse = e.target.value;
//     const isChecked = e.target.checked;

//     setSelectedCoursesBySemester((prevSelectedCourses) => ({
//       ...prevSelectedCourses,
//       [currentSemester]: isChecked
//         ? [...(prevSelectedCourses[currentSemester] || []), selectedCourse]
//         : (prevSelectedCourses[currentSemester] || []).filter((course) => course !== selectedCourse),
//     }));

//     if (isChecked) {
//       setSelectedCourses([...selectedCourses, selectedCourse]);
//       addCoursePanel(selectedCourse);
//     } else {
//       setSelectedCourses(selectedCourses.filter((course) => course !== selectedCourse));
//       removeCoursePanel(selectedCourse);
//     }
//   };

//   const handleSemesterChange = (newSemester) => {
//     setSelectedSemester(newSemester);
//     setCurrentSemester(newSemester);
//     setInputData([]);
//     setSelectedCourses([]); // Clear the selected courses when the semester changes
//   };
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const newInputData = [...inputData];
   

//     if (name === "numStudents"||name === "numStudents" || name === "numHours") {
//       // Remove the old values for numStudents or numHours
//       delete newInputData[index][name];
//       setInputData(newInputData);
//     }
//     if (name === "stencilPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
//       }
//     }

//     if (name === "daysOfExam" ) {
//         const newValue = parseInt(value,10);
//         if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//         }
//         else {
//           console.error("Selecting Days Of Exam is manadatory.");
//         }
//     }
    
//     if (name === "numHours" || name === "daysOfExam") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid input. Enter a number between 1 and 4.");
//       }
//     }

//     if (name === "numHours") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of hours. Enter a number between 1 and 4.");
//       }
//     } else if (name === "numStudents") {
//       if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//         alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       } else {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//       }
//     } else if (name === "tabulationType" || name === "tabulationSemester") {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     } else {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     }
//   };
   
 
  
//   const handlePanelTypeChange = (e, index) => {
//     const { value } = e.target;
//     const newInputData = [...inputData];
//     newInputData[index] = { ...newInputData[index], panelType: value };
//     setInputData(newInputData);
//   };

//   const handleCalculate = () => {
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       return;
//     }
    
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Viva Exam.");
//       return;
//     }
 

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
//       alert("Number of Days is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
//       alert("Number of Pages is mandatory for Stencil.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Making Question Paper.");
//       return;
//     }

//     const results = inputData.map((data) => {
//       let result = 0;
     
//       if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
//         if (data.numStudents === 0) {
//           alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
//         } 
//       } 
   
//       return { ...data, result };
//     });

//     console.log("Results after calculation:", results);

//     const panelType = inputData[0].panelType;
//     const department = encodeURIComponent(selectedDepartment);
//     const semester = encodeURIComponent(selectedSemester);
//     const name=encodeURIComponent(selectName);
//     const type=encodeURIComponent(selectedType);
//     console.log("Panel Type:", panelType);

//     navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}&type=${type}`);
//   };
//   const courseOptions = {
//     "Computer Science and Engineering": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Electronic Circuits",
//       "Numerical Methods",
//       "Web Design and Programming Laboratory-I",
//       "Technical Writing and Presentations",
//       "Database Systems",
//       "Computational Geometry",
//       "Structured Programming Language",
//       "Java",
//     ],
//   };

//   const courseToCodeMapping = {
//     "Structured Programming Language":"CSE-105",
//     "Structured Programming Language-Lab": "CSE-106",
//     "Data Structures":"CSE 153",
//     "Data Structures Lab":"CSE 154",
//     "Discrete Mathematics":"CSE-155",
//     "Algorithms-I": "CSE-209",
//     "Algorithms-I-Lab": "CSE-210",
//     "Electronic Circuits": "CSE-107",
//     "Numerical Methods": "CSE-205",
//     "Web Design and Programming Laboratory-I":"CSE-312",
//     "Technical Writing and Presentations":"CSE-112",
//     "Database Systems":"CSE-255",
//     "Computational Geometry":"CSE-305",
//     "Java":"CSE-212",
//     "Operating Systems":"CSE-309",
//     "Operating Systems Lab":"CSE-310",
   
//   };

//   const semesterToCoursesMapping = {
//     "1st Year 1st Semester": [
//       "Structured Programming Language",
//       "Structured Programming Language-Lab",
//       "Electronic Circuits",
  
//     ],
//     "1st Year 2nd Semester": [
//       "Data Structures",
//       "Data Structures Lab",
//       "Discrete Mathematics",
//       "Technical Writing and Presentations"
//     ],

//     "2nd Year 1st Semester": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Numerical Methods",
//       "Java",
//     ],

//     "3rd Year 1st Semester": [
//       "Web Design and Programming Laboratory-I",
//       "Computational Geometry",
//       "Operating Systems",
//       "Operating Systems Lab",
//     ],
   
//   };
//   const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
//   const courseOptionsForSelectedSemester = semesterToCoursesMapping[selectedSemester] || [];
  
  
//   return (
//     <div className="container mt-4 ">
    
//       <div className="form-group select-container">
//         <label htmlFor="selectedDepartment">Select Department:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectedDepartment}
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           <option value="Computer Science and Engineering">Computer Science and Engineering</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//         <label htmlFor="selectName">Name:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectName}
//           onChange={(e) => setSelectedName(e.target.value)}
//         >
//           <option value={props.name}>{props.name}</option>
//         </select>
//       </div>
       
//       <div className="form-group select-container">
//         <label htmlFor="selectedCourseType">Select Course Type:</label>
//         <select
//           className="form-control"
//           id="selectedType"
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//         >
//           <option value="Hons">Hons</option>
//           <option value="Msc">Msc</option>
//           {/* Add more course type options as needed */}
//         </select>
//       </div>
    
     
//       <div className="form-group select-container">
//          <label htmlFor="selectedSemester" >Select Semester:</label>
//          <select
//           className="form-control"
//           id="selectedSemester"
//           value={selectedSemester}
//           onChange={(e) => {
//             setSelectedSemester(e.target.value);
//             setCurrentSemester(e.target.value); // Update current semester when selected
//             setInputData([]); // Clear panels when the semester changes
//           }}
//         >
//           <option value="1st Year 1st Semester">1st Year 1st Semester</option>
//            <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
//            <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
//            <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
//            <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
//            <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
//            <option value="4th Year 1st Semester">4th Year 1st Semester</option>
//            <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
//          </select>
//          </div>
         

//          <div className="form-group select-container">
//   <label htmlFor="courseSelect">Select Courses:</label>
//   <div className="course-checkboxes">
//     {courseOptionsForSelectedSemester.map((course, optionIndex) => (
//       <label key={optionIndex} className="checkbox-label">
//         <input
//           type="checkbox"
//           name="selectedCourse"
//           value={course}
//           onChange={handleCourseChange}
//           checked={selectedCourses.includes(course)}
//           className="checkbox-input"
//         />
//         {course}
//       </label>
//     ))}
//   </div>
// </div>
       

//       {selectedCourses.length > 0 && (
//       <div className="panel-border">
//       <div className="row d-flex justify-content-center ">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {data.courseCode}</h3>
              
            
//               <div className="form-group select-container">
//   <label htmlFor={`courseName${index}`}>Course Name:</label>
//   <input
//     type="text"
//     className="form-control "
//     id={`courseName${index}`}
//     name="courseName"
//     value={data.courseName}
//     readOnly
//   />
//   </div>

// <div className="form-group select-container">
//   <label htmlFor={`courseCode${index}`}>Course Code:</label>
//   <input
//     type="text"
//     className="form-control"
//     id={`courseCode${index}`}
//     name="courseCode"
//     value={data.courseCode}
//     readOnly
//   />
// </div>
//               <div className="form-group select-container">
//                 <label htmlFor={`panelType${index}`}>Criteria Of Work:</label>
//                 <select className="form-control"
//                   id={`panelType${index}`}
//                   name="panelType"
//                   value={data.panelType}
//                   onChange={(e) => handlePanelTypeChange(e, index)}
//                 >
//                   <option value="Making Question Paper">Making Question Paper</option>
//                   <option value="Evaluating Answer Scripts">Evaluating Answer Scripts</option>
//                   <option value="Question Moderation">Question Moderation</option>
//                   <option value="Lab Exam">Lab Exam</option>
//                   <option value="Viva Exam">Viva Exam</option>
//                   <option value="Stencil">Stencil</option>
//                 </select>
//               </div>
           
             
//               {data.panelType === "Stencil" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`stencilPages${index}`}
//                     name="stencilPages"
//                     value={data.stencilPages}
//                     onChange={(e) => handleInputChange(e, index)}
//                   >     
//                         <option value="0">--</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select>
//                 </div>
//               ) : null}
//               {data.panelType === "Evaluating Answer Scripts" ||
//                 data.panelType === "Thesis/Project Report Evaluation" ||
//                 data.panelType === "Viva Exam" ? (
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" ? " mandatory" : ""}`}
//                       id={`numStudents${index}`}
//                       name="numStudents"
//                       value={data.numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 ) : null}

            
//               <div className="form-group select-conatiner">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                 <select
//                   type="number"
//                   className="form-control"
//                   id={`numHours${index}`}
//                   name="numHours"
//                   value={data.numHours}
//                   onChange={(e) => handleInputChange(e, index)}
//                 > 
//                   <option value="0">--</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5</option>
//                   <option value="6">6</option>

//                 </select>
                
//               </div>

//               {data.panelType === "Lab Exam" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`daysOfExam${index}`}
//                     name="daysOfExam"
//                     value={data.daysOfExam}
//                     onChange={(e) => handleInputChange(e, index)}required
//                   > 
//                     <option value="0">--</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     </select>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>
//        )}
//       <div className="text-center"> {/* Center-align the button */}
//         <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
//           Prepare My Bill
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InputForm;

// 30/10/23/12AM
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './input.css';

// function InputForm(props) {
//   const navigate = useNavigate();
//   const [numPanels, setNumPanels] = useState();
//   const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
//   const [currentSemester, setCurrentSemester] = useState();
//   const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
//   const [selectedType, setSelectedType] = useState("Hons");
//   const [selectName,setSelectedName]=useState(props.name);
//   const [inputData, setInputData] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]); 
//   const [selectedCoursesBySemester, setSelectedCoursesBySemester] = useState({});
//   const [coursePanelCounts, setCoursePanelCounts] = useState({});


//   const addCoursePanel = (courseName) => {
//     const courseCode = courseToCodeMapping[courseName];
  
//     // Initialize the count to 1 if it doesn't exist or increment it by 1 if it exists
//     setCoursePanelCounts((prevCounts) => ({
//       ...prevCounts,
//       [courseCode]: (prevCounts[courseCode] || 0) +1 ,
//     }));
//     const newPanel = {
//       panelType: "Making Question Paper",
//       type: "Hons",
//       courseName,
//       courseCode,
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//       daysOfExam: "--",
//     };
//     setInputData((prevData) => [...prevData, newPanel]);
//   };
  

//   const removeCoursePanel = (courseName) => {
//     const courseCode = courseToCodeMapping[courseName];
  
//     if (coursePanelCounts[courseCode] > 0) {
//       // Decrement the count by 1 if it exists
//       setCoursePanelCounts((prevCounts) => ({
//         ...prevCounts,
//         [courseCode]: prevCounts[courseCode] - 1,
//       }));
  
//       setInputData((prevData) => prevData.filter((panel) => panel.courseName !== courseName));
//     }
//   };
//   const handleCourseChange = (e) => {
//     const selectedCourse = e.target.value;
//     const isChecked = e.target.checked;

//     setSelectedCoursesBySemester((prevSelectedCourses) => ({
//       ...prevSelectedCourses,
//       [currentSemester]: isChecked
//         ? [...(prevSelectedCourses[currentSemester] || []), selectedCourse]
//         : (prevSelectedCourses[currentSemester] || []).filter((course) => course !== selectedCourse),
//     }));

//     if (isChecked) {
//       setSelectedCourses([...selectedCourses, selectedCourse]);
//       addCoursePanel(selectedCourse);
//     } else {
//       setSelectedCourses(selectedCourses.filter((course) => course !== selectedCourse));
//       removeCoursePanel(selectedCourse);
//     }
//   };

//   const handleSemesterChange = (newSemester) => {
//     setSelectedSemester(newSemester);
//     setCurrentSemester(newSemester);
//     setInputData([]);
//     setSelectedCourses([]); // Clear the selected courses when the semester changes
//   };
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const newInputData = [...inputData];
   

//     if (name === "numStudents"||name === "numStudents" || name === "numHours") {
//       // Remove the old values for numStudents or numHours
//       delete newInputData[index][name];
//       setInputData(newInputData);
//     }
//     if (name === "stencilPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
//       }
//     }

//     if (name === "daysOfExam" ) {
//         const newValue = parseInt(value,10);
//         if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//         }
//         else {
//           console.error("Selecting Days Of Exam is manadatory.");
//         }
//     }
    
//     if (name === "numHours" || name === "daysOfExam") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid input. Enter a number between 1 and 4.");
//       }
//     }

//     if (name === "numHours") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of hours. Enter a number between 1 and 4.");
//       }
//     } else if (name === "numStudents") {
//       if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//         alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       } else {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//       }
//     } else if (name === "tabulationType" || name === "tabulationSemester") {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     } else {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     }
//   };
   
 
  
//   const handlePanelTypeChange = (e, index) => {
//     const { value } = e.target;
//     const newInputData = [...inputData];
//     newInputData[index] = { ...newInputData[index], panelType: value };
  
//     if (value === "Evaluating Answer Scripts" || value === "Viva Exam") {
//       newInputData[index].numStudents = 0; // Set an initial value
//     } else {
//       delete newInputData[index].numStudents; // Remove the value if not applicable
//     }
  
//     setInputData(newInputData);
//   };

//   const handleCalculate = () => {
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       return;
//     }
    
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Viva Exam.");
//       return;
//     }
 

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
//       alert("Number of Days is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
//       alert("Number of Pages is mandatory for Stencil.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Making Question Paper.");
//       return;
//     }

//     const results = inputData.map((data) => {
//       let result = 0;
     
//       if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
//         if (data.numStudents === 0) {
//           alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
//         } 
//       } 
   
//       return { ...data, result };
//     });

//     console.log("Results after calculation:", results);

//     const panelType = inputData[0].panelType;
//     const department = encodeURIComponent(selectedDepartment);
//     const semester = encodeURIComponent(selectedSemester);
//     const name=encodeURIComponent(selectName);
//     const type=encodeURIComponent(selectedType);
//     console.log("Panel Type:", panelType);

//     navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}&type=${type}`);
//   };
//   const courseOptions = {
//     "Computer Science and Engineering": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Electronic Circuits",
//       "Numerical Methods",
//       "Web Design and Programming Laboratory-I",
//       "Technical Writing and Presentations",
//       "Database Systems",
//       "Computational Geometry",
//       "Structured Programming Language",
//       "Java",
//     ],
//   };

//   const courseToCodeMapping = {
//     "Structured Programming Language":"CSE-105",
//     "Structured Programming Language-Lab": "CSE-106",
//     "Data Structures":"CSE 153",
//     "Data Structures Lab":"CSE 154",
//     "Discrete Mathematics":"CSE-155",
//     "Algorithms-I": "CSE-209",
//     "Algorithms-I-Lab": "CSE-210",
//     "Electronic Circuits": "CSE-107",
//     "Numerical Methods": "CSE-205",
//     "Web Design and Programming Laboratory-I":"CSE-312",
//     "Technical Writing and Presentations":"CSE-112",
//     "Database Systems":"CSE-255",
//     "Computational Geometry":"CSE-305",
//     "Java":"CSE-212",
//     "Operating Systems":"CSE-309",
//     "Operating Systems Lab":"CSE-310",
   
//   };

//   const semesterToCoursesMapping = {
//     "1st Year 1st Semester": [
//       "Structured Programming Language",
//       "Structured Programming Language-Lab",
//       "Electronic Circuits",
  
//     ],
//     "1st Year 2nd Semester": [
//       "Data Structures",
//       "Data Structures Lab",
//       "Discrete Mathematics",
//       "Technical Writing and Presentations"
//     ],

//     "2nd Year 1st Semester": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Numerical Methods",
//       "Java",
//     ],

//     "3rd Year 1st Semester": [
//       "Web Design and Programming Laboratory-I",
//       "Computational Geometry",
//       "Operating Systems",
//       "Operating Systems Lab",
//     ],
   
//   };
//   const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
//   const courseOptionsForSelectedSemester = semesterToCoursesMapping[selectedSemester] || [];
  
  
//   return (
//     <div className="container mt-4 ">
    
//       <div className="form-group select-container">
//         <label htmlFor="selectedDepartment">Select Department:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectedDepartment}
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           <option value="Computer Science and Engineering">Computer Science and Engineering</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//         <label htmlFor="selectName">Name:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectName}
//           onChange={(e) => setSelectedName(e.target.value)}
//         >
//           <option value={props.name}>{props.name}</option>
//         </select>
//       </div>
       
//       <div className="form-group select-container">
//         <label htmlFor="selectedCourseType">Select Course Type:</label>
//         <select
//           className="form-control"
//           id="selectedType"
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//         >
//           <option value="Hons">Hons</option>
//           <option value="Msc">Msc</option>
//           {/* Add more course type options as needed */}
//         </select>
//       </div>
    
     
//       <div className="form-group select-container">
//          <label htmlFor="selectedSemester" >Select Semester:</label>
//          <select
//           className="form-control"
//           id="selectedSemester"
//           value={selectedSemester}
//           onChange={(e) => {
//             setSelectedSemester(e.target.value);
//             setCurrentSemester(e.target.value); // Update current semester when selected
//             setInputData([]); // Clear panels when the semester changes
//           }}
//         >
//           <option value="1st Year 1st Semester">1st Year 1st Semester</option>
//            <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
//            <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
//            <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
//            <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
//            <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
//            <option value="4th Year 1st Semester">4th Year 1st Semester</option>
//            <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
//          </select>
//          </div>
         

//          <div className="form-group select-container">
//   <label htmlFor="courseSelect">Select Courses:</label>
//   <div className="course-checkboxes">
//     {courseOptionsForSelectedSemester.map((course, optionIndex) => (
//       <label key={optionIndex} className="checkbox-label">
//         <input
//           type="checkbox"
//           name="selectedCourse"
//           value={course}
//           onChange={handleCourseChange}
//           checked={selectedCourses.includes(course)}
//           className="checkbox-input"
//         />
//         {course}
//           {/* Display the current panel count for this course */}
//     {coursePanelCounts[courseToCodeMapping[course]] || 0}
//     <button onClick={() => addCoursePanel(course)}>+</button>
//     <button onClick={() => removeCoursePanel(course)}>-</button>
//       </label>
//     ))}
//   </div>
// </div>
       

//       {selectedCourses.length > 0 && (
//       <div className="panel-border">
//       <div className="row d-flex justify-content-center ">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {data.courseCode}</h3>
              
            
//               <div className="form-group select-container">
//   <label htmlFor={`courseName${index}`}>Course Name:</label>
//   <input
//     type="text"
//     className="form-control "
//     id={`courseName${index}`}
//     name="courseName"
//     value={data.courseName}
//     readOnly
//   />
//   </div>

// <div className="form-group select-container">
//   <label htmlFor={`courseCode${index}`}>Course Code:</label>
//   <input
//     type="text"
//     className="form-control"
//     id={`courseCode${index}`}
//     name="courseCode"
//     value={data.courseCode}
//     readOnly
//   />
// </div>
//               <div className="form-group select-container">
//                 <label htmlFor={`panelType${index}`}>Criteria Of Work:</label>
//                 <select className="form-control"
//                   id={`panelType${index}`}
//                   name="panelType"
//                   value={data.panelType}
//                   onChange={(e) => handlePanelTypeChange(e, index)}
//                 >
//                   <option value="Making Question Paper">Making Question Paper</option>
//                   <option value="Evaluating Answer Scripts">Evaluating Answer Scripts</option>
//                   <option value="Question Moderation">Question Moderation</option>
//                   <option value="Lab Exam">Lab Exam</option>
//                   <option value="Viva Exam">Viva Exam</option>
//                   <option value="Stencil">Stencil</option>
                 
//                 </select>
//               </div>
           
             
//               {data.panelType === "Stencil" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`stencilPages${index}`}
//                     name="stencilPages"
//                     value={data.stencilPages}
//                     onChange={(e) => handleInputChange(e, index)}
//                   >     
//                         <option value="0">--</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select>
//                 </div>
//               ) : null}
//               {data.panelType === "Evaluating Answer Scripts" ||
//                 data.panelType === "Thesis/Project Report Evaluation" ||
//                 data.panelType === "Viva Exam" ? (
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" || data.panelType === "Making Question + Evaluating Answer Scripts" ? " mandatory" : ""}`}
//                       id={`numStudents${index}`}
//                       name="numStudents"
//                       value={data.numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 ) : null}

            
//               <div className="form-group select-conatiner">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                 <select
//                   type="number"
//                   className="form-control"
//                   id={`numHours${index}`}
//                   name="numHours"
//                   value={data.numHours}
//                   onChange={(e) => handleInputChange(e, index)}
//                 > 
//                   <option value="0">--</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5</option>
//                   <option value="6">6</option>

//                 </select>
                
//               </div>

//               {data.panelType === "Lab Exam" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`daysOfExam${index}`}
//                     name="daysOfExam"
//                     value={data.daysOfExam}
//                     onChange={(e) => handleInputChange(e, index)}required
//                   > 
//                     <option value="0">--</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     </select>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>
//        )}
//       <div className="text-center"> {/* Center-align the button */}
//         <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
//           Prepare My Bill
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InputForm;


// 30thOct,8:22
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './input.css';

// function InputForm(props) {
//   const navigate = useNavigate();
//   const [numPanels, setNumPanels] = useState();
//   const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
//   const [currentSemester, setCurrentSemester] = useState();
//   const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
//   const [selectedType, setSelectedType] = useState("Hons");
//   const [selectName,setSelectedName]=useState(props.name);
//   const [inputData, setInputData] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]); 
//   const [selectedCoursesBySemester, setSelectedCoursesBySemester] = useState({});
  
//   const addCoursePanel = (courseName) => {
//     const courseCode = courseToCodeMapping[courseName];
//     const newPanel = {
//       panelType: "Making Question Paper",
//       type: "Hons",
//       courseName,
//       courseCode,
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//       daysOfExam: "--",
//     };
//     setInputData((prevData) => [...prevData, newPanel]);
//   };

//   const removeCoursePanel = (courseName) => {
//     setInputData((prevData) => prevData.filter((panel) => panel.courseName !== courseName));
//   };

//   const handleCourseChange = (e) => {
//     const selectedCourse = e.target.value;
//     const isChecked = e.target.checked;

//     setSelectedCoursesBySemester((prevSelectedCourses) => ({
//       ...prevSelectedCourses,
//       [currentSemester]: isChecked
//         ? [...(prevSelectedCourses[currentSemester] || []), selectedCourse]
//         : (prevSelectedCourses[currentSemester] || []).filter((course) => course !== selectedCourse),
//     }));

//     if (isChecked) {
//       setSelectedCourses([...selectedCourses, selectedCourse]);
//       addCoursePanel(selectedCourse);
//     } else {
//       setSelectedCourses(selectedCourses.filter((course) => course !== selectedCourse));
//       removeCoursePanel(selectedCourse);
//     }
//   };

//   const handleSemesterChange = (newSemester) => {
//     setSelectedSemester(newSemester);
//     setCurrentSemester(newSemester);
//     setInputData([]);
//     setSelectedCourses([]); // Clear the selected courses when the semester changes
//   };
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const newInputData = [...inputData];
   

//     if (name === "numStudents"|| name === "numHours") {
//       // Remove the old values for numStudents or numHours
//       delete newInputData[index][name];
//       setInputData(newInputData);
//     }
//     if (name === "stencilPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
//       }
//     }

//     if (name === "daysOfExam" ) {
//         const newValue = parseInt(value,10);
//         if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//         }
//         else {
//           console.error("Selecting Days Of Exam is manadatory.");
//         }
//     }
    
//     if (name === "numHours" || name === "daysOfExam") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid input. Enter a number between 1 and 4.");
//       }
//     }

//     if (name === "numHours") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of hours. Enter a number between 1 and 4.");
//       }
//     } else if (name === "numStudents") {
//       if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//         alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       } else {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//       }
//     } else if (name === "tabulationType" || name === "tabulationSemester") {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     } else {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     }
//   };
   
 
  
//   const handlePanelTypeChange = (e, index) => {
//     const { value } = e.target;
//     const newInputData = [...inputData];
//     newInputData[index] = { ...newInputData[index], panelType: value };
//     setInputData(newInputData);
//   };

//   const handleCalculate = () => {
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       return;
//     }
    
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Viva Exam.");
//       return;
//     }
 

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
//       alert("Number of Days is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
//       alert("Number of Pages is mandatory for Stencil.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Making Question Paper.");
//       return;
//     }

//     const results = inputData.map((data) => {
//       let result = 0;
     
//       if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
//         if (data.numStudents === 0) {
//           alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
//         } 
//       } 
   
//       return { ...data, result };
//     });

//     console.log("Results after calculation:", results);
//     const panelType = inputData[0].panelType;
//     const department = encodeURIComponent(selectedDepartment);
//     const semester = encodeURIComponent(selectedSemester);
//     const name=encodeURIComponent(selectName);
//     const type=encodeURIComponent(selectedType);
//     console.log("Panel Type:", panelType);

//     navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}&type=${type}`);
//   };
//   const courseOptions = {
//     "Computer Science and Engineering": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Electronic Circuits",
//       "Numerical Methods",
//       "Web Design and Programming Laboratory-I",
//       "Technical Writing and Presentations",
//       "Database Systems",
//       "Computational Geometry",
//       "Structured Programming Language",
//       "Java",
//     ],
//   };

//   const courseToCodeMapping = {
//     "Structured Programming Language":"CSE-105",
//     "Structured Programming Language-Lab": "CSE-106",
//     "Data Structures":"CSE 153",
//     "Data Structures Lab":"CSE 154",
//     "Discrete Mathematics":"CSE-155",
//     "Algorithms-I": "CSE-209",
//     "Algorithms-I-Lab": "CSE-210",
//     "Electronic Circuits": "CSE-107",
//     "Numerical Methods": "CSE-205",
//     "Web Design and Programming Laboratory-I":"CSE-312",
//     "Technical Writing and Presentations":"CSE-112",
//     "Database Systems":"CSE-255",
//     "Computational Geometry":"CSE-305",
//     "Java":"CSE-212",
//     "Operating Systems":"CSE-309",
//     "Operating Systems Lab":"CSE-310",
   
//   };

//   const semesterToCoursesMapping = {
//     "1st Year 1st Semester": [
//       "Structured Programming Language",
//       "Structured Programming Language-Lab",
//       "Electronic Circuits",
  
//     ],
//     "1st Year 2nd Semester": [
//       "Data Structures",
//       "Data Structures Lab",
//       "Discrete Mathematics",
//       "Technical Writing and Presentations"
//     ],

//     "2nd Year 1st Semester": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Numerical Methods",
//       "Java",
//     ],

//     "3rd Year 1st Semester": [
//       "Web Design and Programming Laboratory-I",
//       "Computational Geometry",
//       "Operating Systems",
//       "Operating Systems Lab",
//     ],
   
//   };
//   const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
//   const courseOptionsForSelectedSemester = semesterToCoursesMapping[selectedSemester] || [];
  
  
//   return (
//     <div className="container mt-4 ">
    
//       <div className="form-group select-container">
//         <label htmlFor="selectedDepartment">Select Department:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectedDepartment}
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           <option value="Computer Science and Engineering">Computer Science and Engineering</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//         <label htmlFor="selectName">Name:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectName}
//           onChange={(e) => setSelectedName(e.target.value)}
//         >
//           <option value={props.name}>{props.name}</option>
//         </select>
//       </div>
       
//       <div className="form-group select-container">
//         <label htmlFor="selectedCourseType">Select Course Type:</label>
//         <select
//           className="form-control"
//           id="selectedType"
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//         >
//           <option value="Hons">Hons</option>
//           <option value="Msc">Msc</option>
//           {/* Add more course type options as needed */}
//         </select>
//       </div>
    
     
//       <div className="form-group select-container">
//          <label htmlFor="selectedSemester" >Select Semester:</label>
//          <select
//           className="form-control"
//           id="selectedSemester"
//           value={selectedSemester}
//           onChange={(e) => {
//             setSelectedSemester(e.target.value);
//             setCurrentSemester(e.target.value); // Update current semester when selected
//             setInputData([]); // Clear panels when the semester changes
//           }}
//         >
//           <option value="1st Year 1st Semester">1st Year 1st Semester</option>
//            <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
//            <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
//            <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
//            <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
//            <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
//            <option value="4th Year 1st Semester">4th Year 1st Semester</option>
//            <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
//          </select>
//          </div>
         

//          <div className="form-group select-container">
//   <label htmlFor="courseSelect">Select Courses:</label>
//   <div className="course-checkboxes">
//     {courseOptionsForSelectedSemester.map((course, optionIndex) => (
//       <label key={optionIndex} className="checkbox-label">
//         <input
//           type="checkbox"
//           name="selectedCourse"
//           value={course}
//           onChange={handleCourseChange}
//           checked={selectedCourses.includes(course)}
//           className="checkbox-input"
//         />
//         {course}
//       </label>
//     ))}
//   </div>
// </div>
       

//       {selectedCourses.length > 0 && (
//       <div className="panel-border">
//       <div className="row d-flex justify-content-center ">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {data.courseName}</h3>
              
            
//               <div className="form-group select-container">
//   <label htmlFor={`courseName${index}`}>Course Name:</label>
//   <input
//     type="text"
//     className="form-control "
//     id={`courseName${index}`}
//     name="courseName"
//     value={data.courseName}
//     readOnly
//   />
//   </div>

// <div className="form-group select-container">
//   <label htmlFor={`courseCode${index}`}>Course Code:</label>
//   <input
//     type="text"
//     className="form-control"
//     id={`courseCode${index}`}
//     name="courseCode"
//     value={data.courseCode}
//     readOnly
//   />
// </div>
//               <div className="form-group select-container">
//                 <label htmlFor={`panelType${index}`}>Criteria Of Work:</label>
//                 <select className="form-control"
//                   id={`panelType${index}`}
//                   name="panelType"
//                   value={data.panelType}
//                   onChange={(e) => handlePanelTypeChange(e, index)}
//                 >
//                   <option value="Making Question Paper">Making Question Paper</option>
//                   <option value="Evaluating Answer Scripts">Evaluating Answer Scripts</option>
//                   <option value="Question Moderation">Question Moderation</option>
//                   <option value="Lab Exam">Lab Exam</option>
//                   <option value="Viva Exam">Viva Exam</option>
//                   <option value="Stencil">Stencil</option>
//                 </select>
//               </div>
           
             
//               {data.panelType === "Stencil" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`stencilPages${index}`}
//                     name="stencilPages"
//                     value={data.stencilPages}
//                     onChange={(e) => handleInputChange(e, index)}
//                   >     
//                         <option value="0">--</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select>
//                 </div>
//               ) : null}
//               {data.panelType === "Evaluating Answer Scripts" ||
//                 data.panelType === "Thesis/Project Report Evaluation" ||
//                 data.panelType === "Viva Exam" ? (
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" ? " mandatory" : ""}`}
//                       id={`numStudents${index}`}
//                       name="numStudents"
//                       value={data.numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 ) : null}

            
//               <div className="form-group select-container">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                 <select
//                   type="number"
//                   className="form-control"
//                   id={`numHours${index}`}
//                   name="numHours"
//                   value={data.numHours}
//                   onChange={(e) => handleInputChange(e, index)}
//                 > 
//                   <option value="0">--</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5</option>
//                   <option value="6">6</option>

//                 </select>
                
//               </div>

//               {data.panelType === "Lab Exam" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`daysOfExam${index}`}
//                     name="daysOfExam"
//                     value={data.daysOfExam}
//                     onChange={(e) => handleInputChange(e, index)}required
//                   > 
//                     <option value="0">--</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     </select>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>
//        )}
//       <div className="text-center"> {/* Center-align the button */}
//         <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
//           Prepare My Bill
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InputForm;

// failed_attempt_to_display_checkboxes


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import './input.css';

// function InputForm(props) {
//   const navigate = useNavigate();
//   const [numPanels, setNumPanels] = useState();
//   const [selectedSemester, setSelectedSemester] = useState("1st Year 1st Semester");
//   const [currentSemester, setCurrentSemester] = useState();
//   const [selectedDepartment, setSelectedDepartment] = useState("Computer Science and Engineering");
//   const [selectedType, setSelectedType] = useState("Hons");
//   const [selectName,setSelectedName]=useState(props.name);
//   const [inputData, setInputData] = useState([]);
//   const [selectedCourses, setSelectedCourses] = useState([]); 
//   const [selectedCoursesBySemester, setSelectedCoursesBySemester] = useState({});
//   const [selectedCriteria, setSelectedCriteria] = useState([]);

//   const addCriteria =(panelType,course,index) => {
//     const courseCode=courseToCodeMapping[course]; 
//   //  { inputData.map((data, index) => (
//     if( panelType === "Evaluating Answer Scripts" ||
//                 panelType === "Thesis/Project Report Evaluation" ||
//                 panelType === "Viva Exam" ){
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${inputData[index]}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${inputData[index].panelType === "Evaluating Answer Scripts" || inputData[index].panelType === "Viva Exam" ? " mandatory" : ""}`}
//                       id={`numStudents${inputData[index]}`}
//                       name="numStudents"
//                       value={inputData[index].numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 }
               
   
     
//   };
//   const handleCheckboxChange = (e, course, panelType,index) => {
//     const ischecked = e.target.checked;
//     const selectedCriteria_s=e.target.value;
//     setSelectedCriteria((prevSelectedCriteria) => ({
//       ...prevSelectedCriteria,
      
//     }));
  
  
//     if (ischecked) {
      
      
//       setSelectedCriteria([...selectedCriteria,selectedCriteria_s]);
//       addCriteria( panelType,course,index);
     
//     } else {
//       setSelectedCriteria(selectedCriteria.filter((panelType) =>panelType !== selectedCriteria_s));
   
//     }

   
//   };

//   const addCoursePanel = (courseName) => {
//     const courseCode = courseToCodeMapping[courseName];
//     const newPanel = {
//       panelType: "Making Question Paper",
//       type: "Hons",
//       courseName,
//       courseCode,
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//       daysOfExam: "--",
//     };
//     setInputData((prevData) => [...prevData, newPanel]);
//   };

//   const removeCoursePanel = (courseName) => {
//     setInputData((prevData) => prevData.filter((panel) => panel.courseName !== courseName));
//   };

//   const handleCourseChange = (e) => {
//     const selectedCourse = e.target.value;
//     const isChecked = e.target.checked;

//     setSelectedCoursesBySemester((prevSelectedCourses) => ({
//       ...prevSelectedCourses,
//       [currentSemester]: isChecked
//         ? [...(prevSelectedCourses[currentSemester] || []), selectedCourse]
//         : (prevSelectedCourses[currentSemester] || []).filter((course) => course !== selectedCourse),
//     }));

//     if (isChecked) {
//       setSelectedCourses([...selectedCourses, selectedCourse]);
//       addCoursePanel(selectedCourse);
//     } else {
//       setSelectedCourses(selectedCourses.filter((course) => course !== selectedCourse));
//       removeCoursePanel(selectedCourse);
//     }
//   };

//   const handleSemesterChange = (newSemester) => {
//     setSelectedSemester(newSemester);
//     setCurrentSemester(newSemester);
//     setInputData([]);
//     setSelectedCourses([]); // Clear the selected courses when the semester changes
//   };
//   const handleInputChange = (e, index) => {
//     const { name, value } = e.target;
//     const newInputData = [...inputData];
   

//     if (name === "numStudents"|| name === "numHours") {
//       // Remove the old values for numStudents or numHours
//       delete newInputData[index][name];
//       setInputData(newInputData);
//     }
//     if (name === "stencilPages") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 3) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of Stencil pages. Enter a number between 1 and 3.");
//       }
//     }

//     if (name === "daysOfExam" ) {
//         const newValue = parseInt(value,10);
//         if( !isNaN(newValue)&& newValue >= 1 && newValue <= 4){
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//         }
//         else {
//           console.error("Selecting Days Of Exam is manadatory.");
//         }
//     }
    
//     if (name === "numHours" || name === "daysOfExam") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid input. Enter a number between 1 and 4.");
//       }
//     }

//     if (name === "numHours") {
//       const newValue = parseInt(value, 10);
//       if (!isNaN(newValue) && newValue >= 1 && newValue <= 4) {
//         newInputData[index] = { ...newInputData[index], [name]: newValue };
//         setInputData(newInputData);
//       } else {
//         console.error("Invalid number of hours. Enter a number between 1 and 4.");
//       }
//     } else if (name === "numStudents") {
//       if (inputData[index].panelType === "Evaluating Answer Scripts" && value === "") {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//         alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       } else {
//         newInputData[index] = { ...newInputData[index], [name]: value };
//         setInputData(newInputData);
//       }
//     } else if (name === "tabulationType" || name === "tabulationSemester") {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     } else {
//       newInputData[index] = { ...newInputData[index], [name]: value };
//       setInputData(newInputData);
//     }
//   };
   
 
  
//   const handlePanelTypeChange = (e, index) => {
//     const { value } = e.target;
//     const newInputData = [...inputData];
//     newInputData[index] = { ...newInputData[index], panelType: value };
//     setInputData(newInputData);
//   };

//   const handleCalculate = () => {
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Evaluating Answer Scripts.");
//       return;
//     }
    
//     if (inputData.some(data => data.panelType === "Evaluating Answer Scripts" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Evaluating Answer Scripts.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Viva Exam" && data.numStudents === 0)) {
//       alert("Number of Students is mandatory for Viva Exam.");
//       return;
//     }
 

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Lab Exam" && data.daysOfExam === "--")) {
//       alert("Number of Days is mandatory for Lab Exam.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Stencil" && data.stencilPages === "--")) {
//       alert("Number of Pages is mandatory for Stencil.");
//       return;
//     }

//     if (inputData.some(data => data.panelType === "Making Question Paper" && data.numHours === 0)) {
//       alert("Number of Hours is mandatory for Making Question Paper.");
//       return;
//     }

//     const results = inputData.map((data) => {
//       let result = 0;
     
//       if (data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam") {
//         if (data.numStudents === 0) {
//           alert("Number of Students is mandatory for Evaluating Answer Scripts/Viva Exam.");
//         } 
//       } 
   
//       return { ...data, result };
//     });

//     console.log("Results after calculation:", results);
//     const panelType = inputData[0].panelType;
//     const department = encodeURIComponent(selectedDepartment);
//     const semester = encodeURIComponent(selectedSemester);
//     const name=encodeURIComponent(selectName);
//     const type=encodeURIComponent(selectedType);
//     console.log("Panel Type:", panelType);

//     navigate(`/result?results=${JSON.stringify(results)}&panelType=${inputData[0].panelType}&department=${department}&semester=${semester}&name=${name}&type=${type}`);
//   };
//   const courseOptions = {
//     "Computer Science and Engineering": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Electronic Circuits",
//       "Numerical Methods",
//       "Web Design and Programming Laboratory-I",
//       "Technical Writing and Presentations",
//       "Database Systems",
//       "Computational Geometry",
//       "Structured Programming Language",
//       "Java",
//     ],
//   };
//   const criteriaOptions=[
//     "Making Question Paper","Evaluating Answer Scripts","Lab Exam","Question Moderation","Stencil",
//   ];

//   const courseToCodeMapping = {
//     "Structured Programming Language":"CSE-105",
//     "Structured Programming Language-Lab": "CSE-106",
//     "Data Structures":"CSE 153",
//     "Data Structures Lab":"CSE 154",
//     "Discrete Mathematics":"CSE-155",
//     "Algorithms-I": "CSE-209",
//     "Algorithms-I-Lab": "CSE-210",
//     "Electronic Circuits": "CSE-107",
//     "Numerical Methods": "CSE-205",
//     "Web Design and Programming Laboratory-I":"CSE-312",
//     "Technical Writing and Presentations":"CSE-112",
//     "Database Systems":"CSE-255",
//     "Computational Geometry":"CSE-305",
//     "Java":"CSE-212",
//     "Operating Systems":"CSE-309",
//     "Operating Systems Lab":"CSE-310",
   
//   };

//   const semesterToCoursesMapping = {
//     "1st Year 1st Semester": [
//       "Structured Programming Language",
//       "Structured Programming Language-Lab",
//       "Electronic Circuits",
  
//     ],
//     "1st Year 2nd Semester": [
//       "Data Structures",
//       "Data Structures Lab",
//       "Discrete Mathematics",
//       "Technical Writing and Presentations"
//     ],

//     "2nd Year 1st Semester": [
//       "Algorithms-I",
//       "Algorithms-I-Lab",
//       "Numerical Methods",
//       "Java",
//     ],

//     "3rd Year 1st Semester": [
//       "Web Design and Programming Laboratory-I",
//       "Computational Geometry",
//       "Operating Systems",
//       "Operating Systems Lab",
//     ],
   
//   };
//   const courseOptionsForSelectedDepartment = courseOptions[selectedDepartment] || [];
//   const courseOptionsForSelectedSemester = semesterToCoursesMapping[selectedSemester] || [];
//   const criteriaOptionsForSelectedCourse=criteriaOptions|| [];
  
  
//   return (
//     <div className="container mt-4 ">
    
//       <div className="form-group select-container">
//         <label htmlFor="selectedDepartment">Select Department:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectedDepartment}
//           onChange={(e) => setSelectedDepartment(e.target.value)}
//         >
//           <option value="Computer Science and Engineering">Computer Science and Engineering</option>
//         </select>
//       </div>

//       <div className="form-group select-container">
//         <label htmlFor="selectName">Name:</label>
//         <select
//           className="form-control"
//           id="selectedDepartment"
//           value={selectName}
//           onChange={(e) => setSelectedName(e.target.value)}
//         >
//           <option value={props.name}>{props.name}</option>
//         </select>
//       </div>
       
//       <div className="form-group select-container">
//         <label htmlFor="selectedCourseType">Select Course Type:</label>
//         <select
//           className="form-control"
//           id="selectedType"
//           value={selectedType}
//           onChange={(e) => setSelectedType(e.target.value)}
//         >
//           <option value="Hons">Hons</option>
//           <option value="Msc">Msc</option>
//           {/* Add more course type options as needed */}
//         </select>
//       </div>
    
     
//       <div className="form-group select-container">
//          <label htmlFor="selectedSemester" >Select Semester:</label>
//          <select
//           className="form-control"
//           id="selectedSemester"
//           value={selectedSemester}
//           onChange={(e) => {
//             setSelectedSemester(e.target.value);
//             setCurrentSemester(e.target.value); // Update current semester when selected
//             setInputData([]); // Clear panels when the semester changes
//           }}
//         >
//           <option value="1st Year 1st Semester">1st Year 1st Semester</option>
//            <option value="1st Year 2nd Semester">1st Year 2nd Semester</option>
//            <option value="2nd Year 1st Semester">2nd Year 1st Semester</option>
//            <option value="2nd Year 2nd Semester">2nd Year 2nd Semester</option>
//            <option value="3rd Year 1st Semester">3rd Year 1st Semester</option>
//            <option value="3rd Year 2nd Semester">3rd Year 2nd Semester</option>
//            <option value="4th Year 1st Semester">4th Year 1st Semester</option>
//            <option value="4th Year 2nd Semester">4th Year 2nd Semester</option>
//          </select>
//          </div>
         

//          <div className="form-group select-container">
//   <label htmlFor="courseSelect">Select Courses:</label>
//   <div className="course-checkboxes">
//     {courseOptionsForSelectedSemester.map((course, optionIndex) => (
//       <label key={optionIndex} className="checkbox-label">
//         <input
//           type="checkbox"
//           name="selectedCourse"
//           value={course}
//           onChange={handleCourseChange}
//           checked={selectedCourses.includes(course)}
//           className="checkbox-input"
//         />
//         {course}
//       </label>
//     ))}
//   </div>
// </div>
       

//       {selectedCourses.length > 0 && (
//       <div className="panel-border">
//       <div className="row d-flex justify-content-center ">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-4 mb-3">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {data.courseName}</h3>
              
            
//               <div className="form-group select-container">
//   <label htmlFor={`courseName${index}`}>Course Name:</label>
//   <input
//     type="text"
//     className="form-control "
//     id={`courseName${index}`}
//     name="courseName"
//     value={data.courseName}
//     readOnly
//   />
//   </div>

// <div className="form-group select-container">
//   <label htmlFor={`courseCode${index}`}>Course Code:</label>
//   <input
//     type="text"
//     className="form-control"
//     id={`courseCode${index}`}
//     name="courseCode"
//     value={data.courseCode}
//     readOnly
//   />
// </div>
         
       
// <div className="form-group select-container">
//   <label htmlFor="criteriaSelect">Select Criteria:</label>
//   <div className="criteriacheckboxes">
// {criteriaOptionsForSelectedCourse.map((criteria,optionIndex) => (
//   <label key={optionIndex} className="checkbox-label">
//   <input
//     type="checkbox"
//     name="selectedCriteria_s"
//     value={criteria}
//     onChange={(e) => handleCheckboxChange(e, data.courseName, data.panelType,index)}
//     checked={selectedCriteria.includes(criteria)}
//     className="checkbox-input"
//   />
//   {criteria}
//   </label>
//   // Render the label and other information for the criteria here
// ))


// }
//    </div>
// </div>       

             
//               {data.panelType === "Stencil" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`stencilPages${index}`}
//                     name="stencilPages"
//                     value={data.stencilPages}
//                     onChange={(e) => handleInputChange(e, index)}
//                   >     
//                         <option value="0">--</option>
//                         <option value="1">1</option>
//                         <option value="2">2</option>
//                         <option value="3">3</option>
//                     </select>
//                 </div>
//               ) : null}
//               {data.panelType === "Evaluating Answer Scripts" ||
//                 data.panelType === "Thesis/Project Report Evaluation" ||
//                 data.panelType === "Viva Exam" ? (
//                   // Render "Number of Students" field for other criteria, if needed
//                   <div className="form-group select-container">
//                     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//                     <select
//                       type="number"
//                       className={`form-control${data.panelType === "Evaluating Answer Scripts" || data.panelType === "Viva Exam" ? " mandatory" : ""}`}
//                       id={`numStudents${index}`}
//                       name="numStudents"
//                       value={data.numStudents}
//                       onChange={(e) => handleInputChange(e, index)}
//                       >
//                         <option value="0">0</option>
//                         <option value="10">10</option>
//                         <option value="20">20</option>
//                         <option value="30">30</option>
//                         <option value="31">31</option>
//                         <option value="32">32</option>
//                         <option value="33">33</option>
//                         <option value="34">34</option>
//                         <option value="35">35</option>
//                         <option value="36">36</option>
//                         <option value="37">37</option>
//                         <option value="38">38</option>
//                     </select>
                   
//                   </div>
//                 ) : null}

            
//               <div className="form-group select-container">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                 <select
//                   type="number"
//                   className="form-control"
//                   id={`numHours${index}`}
//                   name="numHours"
//                   value={data.numHours}
//                   onChange={(e) => handleInputChange(e, index)}
//                 > 
//                   <option value="0">--</option>
//                   <option value="1">1</option>
//                   <option value="2">2</option>
//                   <option value="3">3</option>
//                   <option value="4">4</option>
//                   <option value="5">5</option>
//                   <option value="6">6</option>

//                 </select>
                
//               </div>

//               {data.panelType === "Lab Exam" ? (
//                 <div className="form-group select-container">
//                   <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//                   <select
//                     type="number"
//                     className="form-control"
//                     id={`daysOfExam${index}`}
//                     name="daysOfExam"
//                     value={data.daysOfExam}
//                     onChange={(e) => handleInputChange(e, index)}required
//                   > 
//                     <option value="0">--</option>
//                     <option value="1">1</option>
//                     <option value="2">2</option>
//                     <option value="3">3</option>
//                     <option value="4">4</option>
//                     </select>
//                 </div>
//               ) : null}
//             </div>
//           </div>
//         ))}
//       </div>
//       </div>
//        )}
//       <div className="text-center"> {/* Center-align the button */}
//         <button className="btn btn-primary btn-lg calculate-button" onClick={handleCalculate}>
//           Prepare My Bill
//         </button>
//       </div>
//     </div>
//   );
// }

// export default InputForm;
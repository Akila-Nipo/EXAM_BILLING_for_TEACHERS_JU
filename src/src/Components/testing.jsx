// 11/1/23
// CSS.form-group.select-container{
//     font-size: 20px;
//     font-weight: bold;
//   }
//   .form-group
//   {
//     font-size: 20px;
//     font-weight: bold;
//   }
//   .form-control{
//     font-size: 16px;
//     border-radius: 8px;
//     border-width: 3px;
//     border-color: rgb(126, 123, 123);
//     margin-bottom: 30px;
//   }
  
//   #selectedDepartment{
  
//     font-size: 17px;
//     }
//     #selectedSemester{
    
//       font-size: 17px;
     
//       }
//       #selectedDepartment:hover{
//         background-color: #f0f0f0; 
//         cursor: pointer; 
//       }
  
//       #selectedSemester:hover{
//         background-color: #f0f0f0; 
//         cursor: pointer; 
//       }

//       #selectedType:hover{
//           background-color: #f0f0f0; 
//           cursor: pointer; 
//       }

//       .checkbox-label:hover {
//         transform: scale(1.02); 
//         box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
//         background-color: #f0f0f0; 
//         color: #333; 
//         cursor: pointer;
        
//       }
      
//       .checkbox-input:hover {
       
//         cursor: pointer;
//       }
      
//       .criteriaSelect{
//         margin:14px;
//         cursor:pointer;
//       }
//       .checkbox-label {
//         cursor: pointer;
//       }
     
//       .course-name {
//         border: 1px solid #ccc;
//         padding: 5px;
//         margin: 5px;
//       }    
// .checkbox-label {
//   display: flex; /* Align label and checkbox horizontally */
//   align-items: center; /* Vertically center checkbox within the label */
//   margin-bottom: 100px; /* Add space between checkboxes */
//   border: 1px solid #ccc;
//   padding: 5px;
//   margin: 5px;
//   font-size: 16px;
//   border-radius: 8px;
//   border-width: 3px;
//   border-color: rgb(126, 123, 123);
//   font-weight: bold;

// }


// .checkbox-input {
//   margin-left: 200px; /* Add space between checkbox and text */
// }
//   .panel-border{
//     background-color: rgb(244, 245, 245);
//     padding:60px;
//     justify-content: center;
//     display: flex;
//     flex-direction: column;

//   }
 

//     .panel {
//       border: 3px solid #010810;
//       margin: 30px;
//       width: 540px; 
//       height: 940px; 
//       background-color: #eae7e7ee;
//       border-width: 5px;
//       border-radius: 5px;
      
//     }
    
    
//    #numPanels:hover{
//     background-color:#f0f0f0; 
//     cursor: pointer; 
//    }
  
//   .panel:hover {
//     background-color:rgb(209, 208, 208); 
//     cursor: pointer; 
//   }
//   #PanelNo{
//   font-weight: bold;
//   text-align: center;
//   color:black;
//   font-size: 16px;
//   }
//   .bold-course-name {
//     font-weight: bold;
    
//   }
  
//     .calculate-button {
//     transition: transform 0.2s, box-shadow 0.2s;
//     border-radius: 7px;
//     width:220px;
//     height:50px;
//     margin-top:40px;
//     margin-left: 110px;
//     margin-bottom: 150px;
//     font-size: 19px;
//      background-color:dodgerblue;
//   }
  
//   .calculate-button:hover {
//     transform: scale(1.25); 
//     box-shadow: 0 0 10px rgba(0, 0, 0, 0.2); 
//   }
  
  
  
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
//   const [selectedPanelTypes, setSelectedPanelTypes] = useState([]);

  
//   const addCoursePanel = (courseName) => {
//     const courseCode = courseToCodeMapping[courseName];
//     const newPanel = {
//       panelType:"",
//       type: "Hons",
//       courseName,
//       courseCode,
//       numStudents: 0,
//       numHours: 0,
//       tabulationType: "Yearly",
//       tabulationSemester: "Final Year",
//       daysOfExam: "",
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
  
//   const handlePanelTypeChange = (e, panelType,index) => {
//     const { checked } = e.target;
//     const newInputData = [...inputData];
  
//     // If the checkbox is checked, add the panelType to the array
//     if (checked) {
//       newInputData[index] = {
//         ...newInputData[index],
//         panelType: [...newInputData[index].panelType, panelType],
//       };
//     } else {
//       // If the checkbox is unchecked, remove the panelType from the array
//       newInputData[index] = {
//         ...newInputData[index],
//         panelType: newInputData[index].panelType.filter((type) => type !== panelType),
//       };
//     }
  
//     setInputData(newInputData);
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
//       <div className="row d-flex justify-content-center">
//         {inputData.map((data, index) => (
//           <div key={index} className="col-md-6 mb-4">
//             <div className="panel border-secondary p-3 my-2">
//               <h3 id="PanelNo"># {data.courseName}</h3>
              
            
//    <div className="form-group select-container">
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
// <div className="form-group checkbox-container criteriaSelectHeading">
//   <label className="checkbox-label ">Criteria Of Work:</label>
//   <div className="criteriaSelect">
//   {["Making Question Paper", "Evaluating Answer Scripts", "Question Moderation", "Lab Exam", "Viva Exam", "Stencil"].map((panelType, idx) => (
//     <div key={idx}>
//       <input
//         type="checkbox"
//         id={`panelType${idx}`}
//         name="panelType"
//         value={panelType}
//         checked={data.panelType.includes(panelType)}
//         onChange={(e) => handlePanelTypeChange(e, panelType,index)}
//         className="checkbox-input criteriaSelect"
//       />
//       <label htmlFor={`panelType${idx}`}>{panelType}</label>
//     </div>
//   ))}
//   </div>
// </div>


// {data.panelType.includes("Stencil") ? (
//   <div className="form-group select-container">
//     <label htmlFor={`stencilPages${index}`}>Number of Stencil Pages (1-3):</label>
//     <select
//       type="number"
//       className="form-control"
//       id={`stencilPages${index}`}
//       name="stencilPages"
//       value={data.stencilPages}
//       onChange={(e) => handleInputChange(e, index)}
//     >
//       <option value="0">--</option>
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3">3</option>
//     </select>
//   </div>
// ) : null}

// {data.panelType.includes("Evaluating Answer Scripts") || data.panelType.includes("Viva Exam") ? (
//   // Render "Number of Students" field for other criteria, if needed
//   <div className="form-group select-container">
//     <label htmlFor={`numStudents${index}`}>Number of Students:</label>
//     <select
//       type="number"
//       className={`form-control${data.panelType.includes("Evaluating Answer Scripts") || data.panelType.includes("Viva Exam") ? " mandatory" : ""}`}
//       id={`numStudents${index}`}
//       name="numStudents"
//       value={data.numStudents}
//       onChange={(e) => handleInputChange(e, index)}
//     >
//       <option value="0">0</option>
//       <option value="10">10</option>
//       <option value="20">20</option>
//       <option value="30">30</option>
//       <option value="31">31</option>
//       <option value="32">32</option>
//       <option value="33">33</option>
//       <option value="34">34</option>
//       <option value="35">35</option>
//       <option value="36">36</option>
//       <option value="37">37</option>
//       <option value="38">38</option>
//     </select>
//   </div>
// ) : null}

// <div className="form-group select-container">
//                 <label htmlFor={`numHours${index}`}>Number of Hours of Exam:</label>
//                  <select
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

// {data.panelType.includes("Lab Exam") ? (
//   <div className="form-group select-container">
//     <label htmlFor={`daysOfExam${index}`}>Days of Exam:</label>
//     <select
//       type="number"
//       className="form-control"
//       id={`daysOfExam${index}`}
//       name="daysOfExam"
//       value={data.daysOfExam}
//       onChange={(e) => handleInputChange(e, index)}
//       required
//     >
//       <option value="0">--</option>
//       <option value="1">1</option>
//       <option value="2">2</option>
//       <option value="3">3</option>
//       <option value="4">4</option>
//     </select>
//   </div>
// ) : null}

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



// finalizedALHAMDULILLAH 10/31/23 NIGHT 1:21PM
// import React from "react";
// import { useLocation } from "react-router-dom";
// import './ResultDisplay.css';
// import TitleContent from "./TitleContent";
// import ResultFooter1 from "./ResultFooter1";
// import ResultFooter2 from "./ResultFooter2";
// function ResultDisplay() {
  

//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const department = searchParams.get("department");
//   const semester = searchParams.get("semester");
//   const name=searchParams.get("name");
//   const type=searchParams.get("type");
//   const results = JSON.parse(searchParams.get("results"));
//   var totalResult = 0;

//   const panelNames = {
//     "Making Question Paper": "প্রশ্নপত্র প্রণয়ন",
//     "Evaluating Answer Scripts": "উত্তরপত্র মূল্যায়ন",
//     "Lab Exam": "ব্যবহারিক পরীক্ষা",
//     "Viva Exam": "মৌখিক পরীক্ষা",
//     "Question Moderation": "প্রশ্নপত্র মডারেশন",
//     "Stencil": "স্টেনসিল কাটা",
//     "Translation":"অনুবাদ",
//     "Thesis/Project/Report Evaluation":"থিসিস/প্রজেক্ট/রিপোর্ট মূল্যায়ন",
//     "Exersice":"অনুশীলনী",
//     "Tabulation":"টেবুলেশন",
//     "Exam Committee Chief's Remuneration":"কমিটির সভাপতির পারিতোষিক",
//     "Remuneration of Supervisor(M.Phil/PhD)":"তত্ত্বাবধায়ক সম্মানী(এম. ফিল/ পিএইচ.ডি"
//   };
//   const formatType = {
//     "Hons" : "স্নাতক সম্মান",
//     "Masters" :"স্নাতকোত্তর",
//     "MPhil" :"এম.ফিল",
//     "PhD" : "পি এইচ.ডি",
//   };
//   const dept ={
//     "Computer Science and Engineering" : "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং",
    
//   }

//   const sem = {
//     "1st Year 1st Semester": "১ম পর্ব ১ম সেমিস্টার",
//     "1st Year 2nd Semester": "১ম পর্ব ২য় সেমিস্টার",
//     "2nd Year 1st Semester": "২য় পর্ব ১ম সেমিস্টার",
//     "2nd Year 2nd Semester": "২য় পর্ব ২য় সেমিস্টার",
//     "3rd Year 1st Semester": "৩য় পর্ব ১ম সেমিস্টার",
//     "3rd Year 2nd Semester": "৩য় পর্ব ২য় সেমিস্টার",
//     "4th Year 1st Semester": "৪র্থ  পর্ব ১ম সেমিস্টার",
//     "4th Year 2nd Semester": "৪র্থ  পর্ব ২য় সেমিস্টার",
    
//   };
 
//     const defaultPanelNames = [
//     "Making Question Paper",
//     "Evaluating Answer Scripts",
//     "Question Moderation",
//     "Lab Exam",
//     "Viva Exam",
//     "Stencil",
//   ];
  
//   const panelTypesForRow = ["Making Question Paper","Translation", "Evaluating Answer Scripts","Question Moderation", "Lab Exam", "Viva Exam", "Thesis/Project/Report Evaluation","Tabulation","Exam Committee Chief's Remuneration","Remuneration of Supervisor(M.Phil/PhD)","Stencil"];
   
//   function calculateValue(panelType,results) {
//     if(panelType==="Making Question Paper" || panelType==="Question Moderation"){
//     if (results.numHours === 4) {
//       totalResult += 2150;
//       return "Tk 2,150";
//     } else if (results.numHours === 3) {
//       totalResult += 2000;
//       return "Tk 2,000";
//     } else if (results.numHours === 2) {
//       totalResult += 1500;
//       return "Tk 1,500";
//     } else {
//       totalResult += 1500;
//       return "Tk 1,500";
//     } 
//   }

//   else if(panelType==="Evaluating Answer Scripts"){
//     if (results.numHours === 4) {
//    totalResult += results.numStudents * 140;
//    return `Tk ${(results.numStudents * 140).toLocaleString()}`;
//    } else if (results.numHours === 3) {
//      totalResult += results.numStudents * 115;
//     return `Tk ${(results.numStudents * 115).toLocaleString()}`;
//    } else if (results.numHours === 2) {
//       totalResult += results.numStudents * 95;
//     return `Tk ${(results.numStudents * 95).toLocaleString()}`;
//     }else if (results.numHours === 2.5) {
//     totalResult += results.numStudents * 85;
//     return `Tk ${(results.numStudents * 95).toLocaleString()}`;
//    } 
//  else if (results.numHours === 1) {
//    totalResult += results.numStudents * 85;
//    return `Tk ${(results.numStudents * 85).toLocaleString()}`;
//   } else {
//   return "Tk0"; 
//  }
//   }
//   else if(panelType==="Lab Exam"){
//   if (results.numHours>=1 && results.numHours<=4) {
//     totalResult +=  results.daysOfExam * 2000 ;
//     return `Tk ${(results.daysOfExam * 2000).toLocaleString()}`;
//   } else if (results.numHours>=6) {
//     totalResult += results.daysOfExam * 2750;
//     return `Tk ${(results.daysOfExam * 2750).toLocaleString()}`;
//   }
// }
// else if(panelType==="Viva Exam"){
// if (results.type === "Hons" || results.type === "Masters") {
//   totalResult += results.numStudents * 100;
//   return `Tk ${(results.numStudents * 100).toLocaleString()}`;
// } else if (results.type === "MPhil") {
//   totalResult += results.numStudents * 1125;
//   return `Tk ${(results.numStudents * 1125).toLocaleString()}`;
// } else {
//   totalResult += results.numStudents * 1875;
//   return `Tk ${(results.numStudents * 1875).toLocaleString()}`;
// }
// }
// else if(panelType==="Stencil"){
// totalResult += (results.stencilPages *125);
// return `Tk ${(results.stencilPages *125).toLocaleString()}`;
// }
//  }
 
 

//   return (
//     <div className="container mt-4 light">
//       <TitleContent  />
//       <div className="result-display text-center" >
    
//           <p  style={{ fontSize: '25px', textAlign: 'left' }}>পরীক্ষকের নাম :  <strong style={{ textTransform: 'uppercase' }}>{name}</strong><br/> </p>  
//           <p style={{ fontSize: '25px', textAlign: 'left', }}>২০.......   সনের  <strong >{ sem[semester]}</strong> {formatType[type]}  পরীক্ষা সংক্রান্ত কাজের বিস্তারিত বিবরণ</p>
        
//           <div className="result-table">
//           <table className="table table-bordered table-hover text-black">
//             <thead>
//               <tr classname="custom-header">
              
//               <th>কাজের ধরণ</th>
//               <th>বিভাগ</th>
//               <th>কোর্সের নাম</th>
//               <th>কোর্স নং</th>
//               <th>উত্তরপত্র/থিসিস/প্রজেক্ট/স্টেনসিল সংখ্যা</th>
//               <th>পরীক্ষার্থী সংখ্যা</th>
//               <th>মোট দিন</th>
//               <th>কত ঘণ্টার পরীক্ষা</th>
//               <th>টাকার পরিমাণ</th>
//               </tr>
//             </thead>
            
//             <tbody>
//             {results.map((result, index) => (result.panelType.map((panelType, panelIndex) => 
//             (<tr key={`${index}_${panelIndex}`}>
//               <td>{panelNames[panelType]}</td>
//               <td>{dept[department]}</td>
//               <td>{result.courseName}</td>
//               <td>{result.courseCode}</td>
//               <td>{result.stencilPages === null || result.stencilPages === 0 ? '--' : result.stencilPages}</td>
//               <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
//               <td>{result.daysOfExam === null || result.daysOfExam === 0 ? '--' : result.daysOfExam}</td>
//               <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>
//               <td>{calculateValue(panelType, result)}</td>
//           </tr>
//         ))
//     ))}


// {panelTypesForRow.map((panelTypeForRow, rowIndex) => {
//     const matchingResults = results.filter(result => {
//       if (result.panelType === "Making Question + Evaluating Answer Scripts") {
//         // For "Making Question + Evaluating Answer Scripts" type, filter by both "Making Question Paper" and "Evaluating Answer Scripts"
//         return ["Making Question Paper", "Evaluating Answer Scripts"].includes(panelTypeForRow);
//       } else {
//         // For other panel types, filter by the exact panel type
//         return result.panelType === panelTypeForRow;
//       }
//     });

//     if (matchingResults.length === 0) {
//       // If there's no match for the current panelType, render an empty row
//       return (
//         <tr key={rowIndex}>
//           <td>{panelNames[panelTypeForRow]}</td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       );
//     }
//     {results.map((result, index) => (result.panelType.map((panelType, panelIndex) => 
//       (<tr key={`${index}_${panelIndex}`}>
//         <td>{panelNames[panelType]}</td>
//         <td>{dept[department]}</td>
//         <td>{result.courseName}</td>
//         <td>{result.courseCode}</td>
//         <td>{result.stencilPages === null || result.stencilPages === 0 ? '--' : result.stencilPages}</td>
//         <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
//         <td>{result.daysOfExam === null || result.daysOfExam === 0 ? '--' : result.daysOfExam}</td>
//         <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>
//         <td>{calculateValue(panelType, result)}</td>
//     </tr>
//   ))
// ))}

//   })}
//   <tr></tr>

             
//                <tr >
              
//                <td rowspan="2" >আনুসঙ্গিক খরচ</td>
//                <td class="left-aligned"colSpan="7">রশিদ নং</td>
//                <td rowspan="2"></td>
//                </tr>

//                <tr > 
//                <td class="left-aligned" colspan="7">খরচের রশিদ সংযুক্ত করতে হবে</td>
//                </tr>
              
//                 <tr >
//                 <td class="right-aligned" colSpan="8" >মোট টাকা</td>
//                 <td class="text-center">Tk {totalResult.toLocaleString()}
//                 </td>
//                 </tr>
//                 </tbody>
//                 </table>
//                  </div>
        





//         <div className="result-table">
//           <table className="table table-bordered table-hover text-black">
//             <thead>
//               <tr classname="custom-header">
              
//               <th>কাজের ধরণ</th>
//               <th>বিভাগ</th>
//               <th>কোর্সের নাম</th>
//               <th>কোর্স নং</th>
//               <th>উত্তরপত্র/থিসিস/প্রজেক্ট/স্টেনসিল সংখ্যা</th>
//               <th>পরীক্ষার্থী সংখ্যা</th>
//               <th>মোট দিন</th>
//               <th>কত ঘণ্টার পরীক্ষা</th>
//               <th>টাকার পরিমাণ</th>
//               </tr>
//             </thead>
            
//             <tbody>
//   {panelTypesForRow.map((panelTypeForRow, rowIndex) => {
//     const matchingResults = results.filter(result => {
//       if (result.panelType === "Making Question + Evaluating Answer Scripts") {
//         // For "Making Question + Evaluating Answer Scripts" type, filter by both "Making Question Paper" and "Evaluating Answer Scripts"
//         return ["Making Question Paper", "Evaluating Answer Scripts"].includes(panelTypeForRow);
//       } else {
//         // For other panel types, filter by the exact panel type
//         return result.panelType === panelTypeForRow;
//       }
//     });

//     if (matchingResults.length === 0) {
//       // If there's no match for the current panelType, render an empty row
//       return (
//         <tr key={rowIndex}>
//           <td>{panelNames[panelTypeForRow]}</td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//           <td></td>
//         </tr>
//       );
//     }

//     return matchingResults.map((result, index) => (
//       <tr key={index}>
//         <td>{panelNames[result.panelType]}</td>
//         <td>{dept[department]}</td>
//         <td>{result.courseName}</td>
//         <td>{result.courseCode}</td>
//         <td>{result.stencilPages === null || result.stencilPages === 0 ? '--' : result.stencilPages}</td>
//         <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
//         <td>{result.daysOfExam === null || result.daysOfExam === 0 ? '--' : result.daysOfExam}</td>
//         <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>
//         <td>{calculateValue(result)}</td>
//       </tr>
//     ));
//   })}
//   <tr></tr>

             
//                <tr >
              
//                <td rowspan="2" >আনুসঙ্গিক খরচ</td>
//                <td class="left-aligned"colSpan="7">রশিদ নং</td>
//                <td rowspan="2"></td>
//                </tr>

//                <tr > 
//                <td class="left-aligned" colspan="7">খরচের রশিদ সংযুক্ত করতে হবে</td>
//                </tr>
              
//                 <tr >
//                 <td class="right-aligned" colSpan="8" >মোট টাকা</td>
//                 <td class="text-center">Tk {totalResult.toLocaleString()}
//                 </td>
//                 </tr>
//                 </tbody>
//                 </table>
//                  </div>
        
        
        
//         <p className="text-right" >টাকার পরিমাণ: <strong>  {totalResult.toLocaleString('bn-BD')} </strong>টাকা মাত্র</p>   
//         <hr className="section-divider"/>
//         <ResultFooter1/>
//         <p className="declaration">প্রফেসর/ড./জনাব ................................................<strong> সভাপতি </strong>, পরীক্ষা কমিটি ,<strong>{ sem[semester]} </strong>, বিভাগ <strong>{dept[department]}</strong> ,জাবি।</p>   
//         </div>
      
//         <hr className="section-divider" style={{width:'1500px', marginLeft:'-200px',}}/>
//         <p className="declaration-two" style={{ marginLeft:'-150px' }}>প্রফেসর/ড./জনাব    <strong style={{ textTransform: 'uppercase' }}>{name}</strong>   কে <strong>  {totalResult.toLocaleString('bn-BD')} </strong> টাকা মাত্র প্রদান করা যেতে পারে।<br/>সমুদয় টাকা বুঝে পেলাম।</p> 
//         <ResultFooter2/>
//         </div>
//   );
// }

// export default ResultDisplay;
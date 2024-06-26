
import React from "react";
import { useLocation } from "react-router-dom";
import './ResultDisplay.css';
import TitleContent from "./TitleContent";
import ResultFooter1 from "./ResultFooter1";
import ResultFooter2 from "./ResultFooter2";
function ResultDisplay() {
  

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const department = searchParams.get("department");
  const semester = searchParams.get("semester");
  const name=searchParams.get("name");
  const type=searchParams.get("type");
  const results = JSON.parse(searchParams.get("results"));
  var totalResult = 0;

  const panelNames = {
    "Making Question Paper": "প্রশ্নপত্র প্রণয়ন",
    "Evaluating Answer Scripts": "উত্তরপত্র মূল্যায়ন",
    "Lab Exam": "ব্যবহারিক পরীক্ষা",
    "Viva Exam": "মৌখিক পরীক্ষা",
    "Question Moderation": "প্রশ্নপত্র মডারেশন",
    "Stencil": "স্টেনসিল কাটা",
    "Translation":"অনুবাদ",
    "Thesis/Project/Report Evaluation":"থিসিস/প্রজেক্ট/রিপোর্ট মূল্যায়ন",
    "Exersice":"অনুশীলনী",
    "Tabulation":"টেবুলেশন",
    "Exam Committee Chief's Remuneration":"কমিটির সভাপতির পারিতোষিক",
    "Remuneration of Supervisor(M.Phil/PhD)":"তত্ত্বাবধায়ক সম্মানী(এম. ফিল/ পিএইচ.ডি"
  };
  const formatType = {
    "Hons" : "স্নাতক সম্মান",
    "Masters" :"স্নাতকোত্তর",
    "MPhil" :"এম.ফিল",
    "PhD" : "পি এইচ.ডি",
  };
  const dept ={
    "Computer Science and Engineering" : "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং",
    
  }

  const sem = {
    "1st Year 1st Semester": "১ম পর্ব ১ম সেমিস্টার",
    "1st Year 2nd Semester": "১ম পর্ব ২য় সেমিস্টার",
    "2nd Year 1st Semester": "২য় পর্ব ১ম সেমিস্টার",
    "2nd Year 2nd Semester": "২য় পর্ব ২য় সেমিস্টার",
    "3rd Year 1st Semester": "৩য় পর্ব ১ম সেমিস্টার",
    "3rd Year 2nd Semester": "৩য় পর্ব ২য় সেমিস্টার",
    "4th Year 1st Semester": "৪র্থ  পর্ব ১ম সেমিস্টার",
    "4th Year 2nd Semester": "৪র্থ  পর্ব ২য় সেমিস্টার",
    
  };
 
    const defaultPanelNames = [
    "Making Question Paper",
    "Evaluating Answer Scripts",
    "Question Moderation",
    "Lab Exam",
    "Viva Exam",
    "Stencil",
  ];
  
  const panelTypesForRow = ["Making Question Paper","Translation", "Evaluating Answer Scripts","Question Moderation", "Lab Exam", "Viva Exam", "Thesis/Project/Report Evaluation","Tabulation","Exam Committee Chief's Remuneration","Remuneration of Supervisor(M.Phil/PhD)","Stencil"];


  function calculateValue(panelType,results) {
                if(panelType==="Making Question Paper" || panelType==="Question Moderation"){
                if (results.numHours === 4) {
                  totalResult += 2150;
                  return "Tk 2,150";
                } else if (results.numHours === 3) {
                  totalResult += 2000;
                  return "Tk 2,000";
                } else if (results.numHours === 2) {
                  totalResult += 1500;
                  return "Tk 1,500";
                } else {
                  totalResult += 1500;
                  return "Tk 1,500";
                } 
              }

  else if(panelType==="Evaluating Answer Scripts"){
    if (results.numHours === 4) {
   totalResult += results.numStudents * 140;
   return `Tk ${(results.numStudents * 140).toLocaleString()}`;
   } else if (results.numHours === 3) {
     totalResult += results.numStudents * 115;
    return `Tk ${(results.numStudents * 115).toLocaleString()}`;
   } else if (results.numHours === 2) {
      totalResult += results.numStudents * 95;
    return `Tk ${(results.numStudents * 95).toLocaleString()}`;
    }else if (results.numHours === 2.5) {
    totalResult += results.numStudents * 85;
    return `Tk ${(results.numStudents * 95).toLocaleString()}`;
   } 
 else if (results.numHours === 1) {
   totalResult += results.numStudents * 85;
   return `Tk ${(results.numStudents * 85).toLocaleString()}`;
  } else {
  return "Tk0"; 
 }
  }
  else if(panelType==="Lab Exam"){
  if (results.numHours>=1 && results.numHours<=4) {
    totalResult +=  results.daysOfExam * 2000 ;
    return `Tk ${(results.daysOfExam * 2000).toLocaleString()}`;
  } else if (results.numHours>=6) {
    totalResult += results.daysOfExam * 2750;
    return `Tk ${(results.daysOfExam * 2750).toLocaleString()}`;
  }
}
else if(panelType==="Viva Exam"){
if (results.type === "Hons" || results.type === "Masters") {
  totalResult += results.numStudents * 100;
  return `Tk ${(results.numStudents * 100).toLocaleString()}`;
} else if (results.type === "MPhil") {
  totalResult += results.numStudents * 1125;
  return `Tk ${(results.numStudents * 1125).toLocaleString()}`;
} else {
  totalResult += results.numStudents * 1875;
  return `Tk ${(results.numStudents * 1875).toLocaleString()}`;
}
}
else if(panelType==="Stencil"){
totalResult += (results.stencilPages *125);
return `Tk ${(results.stencilPages *125).toLocaleString()}`;
}
 }
 
 

  return (
    <div className="container mt-4 light">
      <TitleContent  />
      <div className="result-display text-center" >
    
          <p  style={{ fontSize: '25px', textAlign: 'left' }}>পরীক্ষকের নাম :  <strong style={{ textTransform: 'uppercase' }}>{name}</strong><br/> </p>  
          <p style={{ fontSize: '25px', textAlign: 'left', }}>২০.......   সনের  <strong >{ sem[semester]}</strong> {formatType[type]}  পরীক্ষা সংক্রান্ত কাজের বিস্তারিত বিবরণ</p>
        
          <div className="result-table">
          <table className="table table-bordered table-hover text-black">
            <thead>
              <tr classname="custom-header">
              
              <th>কাজের ধরণ</th>
              <th>বিভাগ</th>
              <th>কোর্সের নাম</th>
              <th>কোর্স নং</th>
              <th>উত্তরপত্র/থিসিস/প্রজেক্ট/স্টেনসিল সংখ্যা</th>
              <th>পরীক্ষার্থী সংখ্যা</th>
              <th>মোট দিন</th>
              <th>কত ঘণ্টার পরীক্ষা</th>
              <th>টাকার পরিমাণ</th>
              </tr>
            </thead>
            
            <tbody>
            {results.map((result, index) => (result.panelType.map((panelType, panelIndex) => 
            (<tr key={`${index}_${panelIndex}`}>
              <td>{panelNames[panelType]}</td>
              <td>{dept[department]}</td>
              <td>{result.courseName}</td>
              <td>{result.courseCode}</td>
              <td>{result.stencilPages === null || result.stencilPages === 0 ? '--' : result.stencilPages}</td>
              <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
              <td>{result.daysOfExam === null || result.daysOfExam === 0 ? '--' : result.daysOfExam}</td>
              <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>
              <td>{calculateValue(panelType, result)}</td>
          </tr>
        ))
        
    ))} 
  
               <tr></tr>

             
               <tr > 
               <td rowspan="2" >আনুসঙ্গিক খরচ</td>
               <td class="left-aligned"colSpan="7">রশিদ নং</td>
               <td rowspan="2"></td>
               </tr>

               <tr > 
               <td class="left-aligned" colspan="7">খরচের রশিদ সংযুক্ত করতে হবে</td>
               </tr>
              
                <tr >
                <td class="right-aligned" colSpan="8" >মোট টাকা</td>
                <td class="text-center">Tk {totalResult.toLocaleString()}
                </td>
                </tr>
                </tbody>
                </table>
                 </div>
  
        <p className="text-right" >টাকার পরিমাণ: <strong>  {totalResult.toLocaleString('bn-BD')} </strong>টাকা মাত্র</p>   
        <hr className="section-divider"/>
        <ResultFooter1/>
        <p className="declaration">প্রফেসর/ড./জনাব ................................................<strong> সভাপতি </strong>, পরীক্ষা কমিটি ,<strong>{ sem[semester]} </strong>, বিভাগ <strong>{dept[department]}</strong> ,জাবি।</p>   
        </div>
      
        <hr className="section-divider" style={{width:'1500px', marginLeft:'-200px',}}/>
        <p className="declaration-two" style={{ marginLeft:'-150px' }}>প্রফেসর/ড./জনাব    <strong style={{ textTransform: 'uppercase' }}>{name}</strong>   কে <strong>  {totalResult.toLocaleString('bn-BD')} </strong> টাকা মাত্র প্রদান করা যেতে পারে।<br/>সমুদয় টাকা বুঝে পেলাম।</p> 
        <ResultFooter2/>
        </div>
  );
}

export default ResultDisplay;


  {/* <div className="logo-and-title-container" style={{marginLeft:'100px'}}>
      < ImageComponent id="logo"/>
      <div classname="title-content">
         <h1 id="heading-content-1" style={{marginLeft:'10px'}}>
          <strong>পরীক্ষা নিয়ন্ত্রকের অফিস<br />
          জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</strong></h1>
          <h3 id="heading-content" style={{marginLeft:'60px'}}>সাভার, ঢাকা।</h3>
          <hr className="line"style={{marginLeft:'200px'}}/>
          </div>
          
          <div classname="T" style={{marginLeft:'100px'}}>
            <Seal  /><br/><div style={{marginBottom:'25px'}}></div><p style={{ fontSize: '25px',}}>রেজিঃ নং ........ পৃষ্ঠা নং .......</p>
          </div>  
        </div>
        <div style={{margin:'50px'}}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <h1 style={{ margin: '0',fontSize:'32px' }}>স্মারক সংখ্যা : জাবি পানিআ...................</h1>
          <h1 style={{ marginLeft: '0',marginRight:'160px',fontSize:'32px' }}>তারিখ:.......................</h1>
        </div>
       
         <div ><h2 id="section-title">
          পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম</h2></div>
          <div classname="dept-and-semester-info">
          <h1 >
          (পরীক্ষা কমিটির সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রক অফিসে পাঠাতে হবে)
          </h1>
          <br></br>
          </div> */}

// import React from "react";
// import { useLocation } from "react-router-dom";
// import ImageComponent from "./heading";
// import './ResultDisplay.css';

// function ResultDisplay() {
//   const location = useLocation();
//   const searchParams = new URLSearchParams(location.search);
//   const department = searchParams.get("department");
//   const semester = searchParams.get("semester");
//   const name=searchParams.get("name");
//   const results = JSON.parse(searchParams.get("results"));
//   var totalResult = 0;

//   const panelNames = {
//     "Making Question Paper": "প্রশ্নপত্র প্রণয়ন",
//     "Evaluating Answer Scripts": "উত্তরপত্র মূল্যায়ন",
//     "Lab Exam": "ব্যবহারিক পরীক্ষা",
//     "Viva Exam": "মৌখিক পরীক্ষা",
//     "Question Moderation": "প্রশ্নপত্র মডারেশন",
//     "Stencil": "স্টেনসিল কাটা",
   
//   };
//   const formatType = {
//     "Hons" : "স্নাতক",
//     "Masters" :"স্নাতকোত্তর",
//     "MPhil" :"এম.ফিল",
//     "PhD" : "পি এইচ.ডি",
//   };
//   const dept ={
//     "Computer Science and Engineering" : "কম্পিউটার সাইন্স এন্ড ইঞ্জিনিয়ারিং",
//     "Physics":"পদার্থ বিজ্ঞান",
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
 
//   const defaultPanelNames = [
//     "Making Question Paper",
//     "Evaluating Answer Scripts",
//     "Lab Exam",
//     "Viva Exam",
//     "Question Moderation",
//     "Stencil",
//   ];
  
  
//   return (
//     <div className="container mt-4 light">
//       <div className="result-display text-center" >
//       <div className="logo-and-title-container" >
//       < ImageComponent id="logo"/>
//       <div classname="title-content">
//         <h1 id="heading-content-1" >
//           পরীক্ষা নিয়ন্ত্রকের অফিস<br />
//           জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</h1>
//           <h3 id="heading-content">সাভার, ঢাকা।</h3>
//           </div>
//         </div>
//         <h3 id="section-title">
//           পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম</h3>
//           <div classname="dept-and-semester-info">
//           <h1 >
//           বিভাগ : <strong>{dept[department]}</strong>
//           </h1>
//           <h1>
//           সেমিস্টার : <strong>{ sem[semester]}</strong>
//           </h1>
//           </div>
//           <p className="teachers-name">
//           শিক্ষকের নাম :  <strong>{name}</strong>
//         </p>
//         <div className="result-table">
//           <table className="table table-bordered table-hover text-black">
//           <thead>
//           <tr className="custom-header">
//             <th>#</th>
//             <th>কাজের ধরণ</th> {/* Second column for default panel names */}
//             {defaultPanelNames.map((panelName, index) => (
//               <th key={index}>{panelNames[panelName]}</th>
//             ))}
//             <th>স্নাতক/স্নাতকোত্তর/এম.ফিল/পি এইচ.ডি</th>
//             <th>কোর্সের নাম</th>
//             <th>কোর্স নং</th>
//             <th>পরীক্ষার্থী সংখ্যা</th>
//             <th>কত ঘণ্টার পরীক্ষা</th>
//             <th>টাকার পরিমাণ</th>
//           </tr>
//         </thead>
//             <tbody>
//               {results.map((result, index) => (
//                 <tr key={index}>
//                   <td>{(index+1).toLocaleString('bn-BD')}</td>
//                   <td>{panelNames[result.panelType]}</td>
//                   <td>{formatType[result.type]}</td>
//                   <td>{result.courseName}</td>
//                   <td>{result.courseCode}</td>
//                   <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
//                   <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>

                    
//                   {defaultPanelNames.map((panelName, nameIndex) => (
//                     <td key={nameIndex}>
//                       {result.panelType === panelName ? (
                      
//                         (() => {
//                           if (result.panelType === "Making Question Paper" || result.panelType === "Question Moderation") {
//                             if (result.numHours === 4) {
//                               totalResult += 2150;
//                               return "Tk 2,150";
//                             } else if (result.numHours === 3) {
//                               totalResult += 2000;
//                               return "Tk 2,000";
//                             } else if (result.numHours === 2) {
//                               totalResult += 1500;
//                               return "Tk 1,500";
//                             } else if (result.numHours === 1) {
//                               totalResult += 1500;
//                               return "Tk 1500"; 
//                             }
                          
//                           } else if (result.panelType === "Evaluating Answer Scripts") {
//                             if (result.numHours === 4) {
//                               totalResult += result.numStudents * 140;
//                               return `Tk ${(result.numStudents * 140).toLocaleString()}`;
//                             } else if (result.numHours === 3) {
//                               totalResult += result.numStudents * 115;
//                               return `Tk ${(result.numStudents * 115).toLocaleString()}`;
//                             } else if (result.numHours === 2) {
//                               totalResult += result.numStudents * 95;
//                               return `Tk ${(result.numStudents * 95).toLocaleString()}`;
//                             } else if (result.numHours === 1) {
//                               totalResult += result.numStudents * 85;
//                               return `Tk ${(result.numStudents * 85).toLocaleString()}`;
//                             } else {
//                               return "Tk0"; 
//                             } 
                           
//                           } else if (result.panelType === "Lab Exam") {
//                             if (result.type === "Hons" || result.type === "Masters") {
//                               totalResult += result.numHours * 2000;
//                               return `Tk ${(result.numHours * 2000).toLocaleString()}`;
//                             } else {
//                               totalResult += result.numHours * 2750;
//                               return `Tk ${(result.numHours * 2750).toLocaleString()}`;
//                             }
//                           }
//                           else if (result.panelType === "Viva Exam") {
//                             if (result.type === "Hons" || result.type === "Masters") {
//                               totalResult += result.numStudents * 100;
//                               return `Tk ${(result.numStudents * 100).toLocaleString()}`;
//                             } else if (result.type === "MPhil") {
//                               totalResult += result.numStudents * 1125;
//                               return `Tk ${(result.numStudents * 1125).toLocaleString()}`;
//                             } else {
//                               totalResult += result.numStudents * 1875;
//                               return `Tk ${(result.numStudents * 1875).toLocaleString()}`;
//                             }
//                           }
                    
//                           else if (result.panelType === "Stencil") {
//                             if (result.type === "Hons" || result.type === "Masters") {
//                               totalResult += 375;
//                               return `Tk ${(375).toLocaleString()}`;
//                             }  else {
//                               totalResult += 380;
//                               return `Tk ${(380).toLocaleString()}`;
//                             }
//                           }
//                         })()
//                       ) : null}
//                     </td>
//                   ))}


//                   {/* <td>
//                     {
                    
//                     result.panelType === "Making Question Paper"  || result.panelType === "Question Moderation" ?
                    
//                       (() => {
//                         if (result.numHours === 4) {
//                           totalResult += 2150;
//                           return "Tk 2,150";
//                         } else if (result.numHours === 3) {
//                           totalResult += 2000;
//                           return "Tk 2,000";
//                         } else if (result.numHours === 2) {
//                           totalResult += 1500;
//                           return "Tk 1,500";
//                         } else {
//                           totalResult += 1500;
//                           return "Tk 1500"; 
//                         }
//                       })()
//                       :
//                       result.panelType === "Evaluating Answer Scripts" ?
                      
//                       (() => {
//                         if (result.numHours === 4) {
//                           totalResult += result.numStudents * 140;
//                           return `Tk ${(result.numStudents * 140).toLocaleString()}`;
//                         } else if (result.numHours === 3) {
//                           totalResult += result.numStudents * 115;
//                           return `Tk ${(result.numStudents * 115).toLocaleString()}`;
//                         } else if (result.numHours === 2) {
//                           totalResult += result.numStudents * 95;
//                           return `Tk ${(result.numStudents * 95).toLocaleString()}`;
//                         } else if (result.numHours === 1) {
//                           totalResult += result.numStudents * 85;
//                           return `Tk ${(result.numStudents * 85).toLocaleString()}`;
//                         } else {
//                           return "Tk0"; 
//                         }
//                       })()
//                       :
//                       result.panelType === "Lab Exam" ? 
                     
//                       (() => {
//                         if (result.type === "Hons" || result.type === "Masters") {
//                           totalResult += result.numHours * 2000;
//                           return `Tk ${(result.numHours * 2000).toLocaleString()}`;
//                         } else {
//                           totalResult += result.numHours * 2750;
//                           return `Tk ${(result.numHours * 2750).toLocaleString()}`;
//                         }
//                       })()
//                       :
//                       result.panelType === "Viva Exam" ?
                      
//                       (() => {
//                         if (result.type === "Hons" || result.type === "Masters") {
//                           totalResult += result.numStudents * 100;
//                           return `Tk ${(result.numStudents * 100).toLocaleString()}`;
//                         } else if (result.type === "MPhil") {
//                           totalResult += result.numStudents * 1125;
//                           return `Tk ${(result.numStudents * 1125).toLocaleString()}`;
//                         } else {
//                           totalResult += result.numStudents * 1875;
//                           return `Tk ${(result.numStudents * 1875).toLocaleString()}`;
//                         }
//                       })()
//                       :
//                       result.panelType === "Stencil" ?
                      
//                       (() => {
//                         if (result.type === "Hons" || result.type === "Masters") {
//                           totalResult += 375;
//                           return `Tk ${(375).toLocaleString()}`;
//                         }  else {
//                           totalResult += 380;
//                           return `Tk ${(380).toLocaleString()}`;
//                         }
//                       })()
//                       : 

//                       "Tk0" // Handle other panel types, if needed
//                     }
//                   </td> */}
//                 </tr>
//               ))}
//               <tr>
//                 <td colSpan="7"></td>
//                 <td className="text-center">
//                   Tk {totalResult.toLocaleString()}
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//         <p className="text-right" >
//           টাকার পরিমাণ: <strong>  {totalResult.toLocaleString('bn-BD')} </strong>টাকা মাত্র
//         </p>   
//         <hr className="section-divider"/>
//         <div className="signatures">
//           <div className="signature">
//             সভাপতির প্রতিস্বাক্ষর (তারিখসহ)
//           </div>
//           <div>
//             পরীক্ষকের স্বাক্ষর
//           </div>
//         </div>
//         <p className="declaration">
//         প্রফেসর/ড./জনাব ................................................<strong> সভাপতি </strong>, পরীক্ষা কমিটি ,<strong>{ sem[semester]} </strong>, বিভাগ <strong>{dept[department]}</strong> ,জাবি।
//         </p>   
//       </div>
      
//     </div>
//   );
// }

// export default ResultDisplay;
// if (results[indexToCheck] && results[indexToCheck].panelType === "Panel 1")

{/* <table className="table table-bordered table-hover text-black">
<thead>
  <tr classname="custom-header">
  <th>#</th>
  <th>কাজের ধরণ</th>
  <th>স্নাতক/স্নাতকোত্তর/এম.ফিল/পি এইচ.ডি</th>
  <th>কোর্সের নাম</th>
  <th>কোর্স নং</th>
  <th>পরীক্ষার্থী সংখ্যা</th>
  <th>কত ঘণ্টার পরীক্ষা</th>
  <th>টাকার পরিমাণ</th>
  </tr>
</thead>
<tbody>
 <tr>

  <td>1</td>
  <td>প্রশ্নপত্র প্রণয়ন</td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td></td>
  <td>
  {
  results[0].panelType === "Making Question Paper"?
        
        (() => {
          flag=1;
        })()
        : null
    }
  {
  flag===1?
  (() => {
    if (results[0].numHours === 4) {
      totalResult += 2150;
      return "Tk 2,150";
    } else if (results[0].numHours === 3) {
      totalResult += 2000;
      return "Tk 2,000";
    } else if (results[0].numHours === 2) {
      totalResult += 1500;
      return "Tk 1,500";
    } else {
      totalResult += 1500;
      return "Tk 1500"; 
    }

  })():flag=0
}
</td>

    
 </tr>
</tbody>
</table> */}

         
{/* <table className="table table-bordered table-hover text-black">
<thead>
  <tr classname="custom-header">
  <th>#</th>
  <th>কাজের ধরণ</th>
  <th>স্নাতক/স্নাতকোত্তর/এম.ফিল/পি এইচ.ডি</th>
  <th>কোর্সের নাম</th>
  <th>কোর্স নং</th>
  <th>পরীক্ষার্থী সংখ্যা</th>
  <th>কত ঘণ্টার পরীক্ষা</th>
  <th>টাকার পরিমাণ</th>
  </tr>
</thead>
<tbody>
 <tr >

  <td>1</td>
  <td>প্রশ্নপত্র প্রণয়ন</td>
  <td>{results.length==1 && results[0].panelType === "Making Question Paper"?(()=>{ return formatType[results[0].type];})():" "}</td>
  <td>{(results.length==1) && (results[0].panelType === "Making Question Paper")?(()=>{ return results[0].courseName;})():" "}</td>
  <td>{results.length==1 && results[0].panelType === "Making Question Paper"?(()=>{ return results[0].courseCode;})():" "}</td>
  <td>{results.length==1 && results[0].panelType === "Making Question Paper" && results[0].numStudents === null || results[0].numStudents === 0 ? '--' : results[0].numStudents}</td>
  <td>{results.length==1 && results[0].panelType === "Making Question Paper"?(()=>{ return results[0].numHours;})():""}</td>
  <td>
  {
  results.length==1 && results[0].panelType === "Making Question Paper"?
  (() => {
    if (results[0].numHours === 4) {
      totalResult += 2150;
      return "Tk 2,150";
    } else if (results[0].numHours === 3) {
      totalResult += 2000;
      return "Tk 2,000";
    } else if (results[0].numHours === 2) {
      totalResult += 1500;
      return "Tk 1,500";
    } else {
      totalResult += 1500;
      return "Tk 1500"; 
    }

  })():null
}
</td>   
 </tr>

 <tr>
 <td>2</td>
  <td>উত্তরপত্র মূল্যায়ন</td>
 <td>{results.length===2?(()=>{ return formatType[results[1].type];})():" "}</td>
 <td>{results.length===2?(()=>{ return formatType[results[1].type];})():" "}</td>
  <td>{results.length===2?(()=>{ return results[1].courseName;})():" "}</td>
  <td>{results.length===2?(()=>{ return results[1].courseCode;})():" "}</td>
  <td>{results.length===2?(()=>{ return results[1].courseCode;})():" "}</td>
  <td>{results.length===2?(()=>{ return results[0].numHours;})():" "}</td>
  
 </tr>

</tbody> 
</table>*/}






{/* TABLE-29/10/23

<div className="result-table">
          <table className="table table-bordered table-hover text-black">
            <thead>
              <tr classname="custom-header">
              <th>#</th>
              <th>কাজের ধরণ</th>
              <th>বিভাগ</th>
              <th>কোর্সের নাম</th>
              <th>কোর্স নং</th>
              <th>উত্তরপত্র/থিসিস/প্রজেক্ট/স্টেনসিল সংখ্যা</th>
              <th>পরীক্ষার্থী সংখ্যা</th>
              <th>মোট দিন</th>
              <th>কত ঘণ্টার পরীক্ষা</th>
              <th>টাকার পরিমাণ</th>
              </tr>
            </thead>
            <tbody>
              {
              
              results.map((result, index) => (
                <tr key={index}>
                  <td>{(index+1).toLocaleString('bn-BD')}</td>
                  <td>{panelNames[result.panelType]}</td>
                  <td>{dept[department]}</td>
                  <td>{result.courseName}</td>
                  <td>{result.courseCode}</td>
                  <td>{result.stencilPages === null || result.stencilPages === 0 ? '--' : result.stencilPages}</td>
                  <td>{result.numStudents === null || result.numStudents === 0 ? '--' : result.numStudents}</td>
                  <td>{result.daysOfExam === null || result.daysOfExam === 0 ? '--' : result.daysOfExam}</td>
                  <td>{result.numHours === null || result.numHours === 0 ? '--' : result.numHours}</td>
                  <td>
                    {
                    
                    result.panelType === "Making Question Paper"  || result.panelType === "Question Moderation" ?
                    
                      (() => {
                        if (result.numHours === 4) {
                          totalResult += 2150;
                          return "Tk 2,150";
                        } else if (result.numHours === 3) {
                          totalResult += 2000;
                          return "Tk 2,000";
                        } else if (result.numHours === 2) {
                          totalResult += 1500;
                          return "Tk 1,500";
                        } else {
                          totalResult += 1500;
                          return "Tk 1500"; 
                        }
                      })()
                      :
                      result.panelType === "Evaluating Answer Scripts" ?
                      
                      (() => {
                        if (result.numHours === 4) {
                          totalResult += result.numStudents * 140;
                          return `Tk ${(result.numStudents * 140).toLocaleString()}`;
                        } else if (result.numHours === 3) {
                          totalResult += result.numStudents * 115;
                          return `Tk ${(result.numStudents * 115).toLocaleString()}`;
                        } else if (result.numHours === 2) {
                          totalResult += result.numStudents * 95;
                          return `Tk ${(result.numStudents * 95).toLocaleString()}`;
                        } else if (result.numHours === 1) {
                          totalResult += result.numStudents * 85;
                          return `Tk ${(result.numStudents * 85).toLocaleString()}`;
                        } else {
                          return "Tk0"; 
                        }
                      })()
                      :
                      result.panelType === "Lab Exam" ? 
                     
                      (() => {
                        if (result.numHours>=1 && result.numHours<=4) {
                          totalResult +=  result.daysOfExam * 2000 ;
                          return `Tk ${(result.daysOfExam * 2000).toLocaleString()}`;
                        } else if (result.numHours>=6) {
                          totalResult += result.daysOfExam * 2750;
                          return `Tk ${(result.daysOfExam * 2750).toLocaleString()}`;
                        }
                      })()
                      :
                      result.panelType === "Viva Exam" ?
                      
                      (() => {
                        if (result.type === "Hons" || result.type === "Masters") {
                          totalResult += result.numStudents * 100;
                          return `Tk ${(result.numStudents * 100).toLocaleString()}`;
                        } else if (result.type === "MPhil") {
                          totalResult += result.numStudents * 1125;
                          return `Tk ${(result.numStudents * 1125).toLocaleString()}`;
                        } else {
                          totalResult += result.numStudents * 1875;
                          return `Tk ${(result.numStudents * 1875).toLocaleString()}`;
                        }
                      })()
                      :
                      result.panelType === "Stencil" ?
                      
                      (() => {
                        
                          totalResult += (result.stencilPages *125);
                          return `Tk ${(result.stencilPages *125).toLocaleString()}`;
                        
                      })()
                      : 

                      "Tk0" // Handle other panel types, if needed
                    }
                  </td>
                </tr>
              ))}
               <tr >
               <td rowspan="2">{(results.length+1).toLocaleString('bN-BD')}</td>
               <td rowspan="2" >আনুসঙ্গিক খরচ</td>
               <td class="left-aligned"colSpan="7">রশিদ নং</td>
               <td rowspan="2"></td>
               </tr>

               <tr > 
               <td class="left-aligned" colspan="7">খরচের রশিদ সংযুক্ত করতে হবে</td>
               </tr>
              
                <tr >
                <td class="right-aligned" colSpan="9" >মোট টাকা</td>
                <td class="text-center">Tk {totalResult.toLocaleString()}
                </td>
                </tr>
                </tbody>
                </table> */}


// 31/10/2023 <night-1:28>
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
  
//   const panelTypesForRow = ["Making Question Paper", "Evaluating Answer Scripts","Question Moderation", "Lab Exam", "Viva Exam", "Stencil"];
   
//   function calculateValue(result) {
//     if(result.panelType==="Making Question Paper" || result.panelType==="Question Moderation"){
//     if (result.numHours === 4) {
//       totalResult += 2150;
//       return "Tk 2,150";
//     } else if (result.numHours === 3) {
//       totalResult += 2000;
//       return "Tk 2,000";
//     } else if (result.numHours === 2) {
//       totalResult += 1500;
//       return "Tk 1,500";
//     } else {
//       totalResult += 1500;
//       return "Tk 1,500";
//     } 
//   }

//   else if(result.panelType==="Evaluating Answer Scripts"){
//     if (result.numHours === 4) {
//    totalResult += result.numStudents * 140;
//    return `Tk ${(result.numStudents * 140).toLocaleString()}`;
//    } else if (result.numHours === 3) {
//      totalResult += result.numStudents * 115;
//     return `Tk ${(result.numStudents * 115).toLocaleString()}`;
//    } else if (result.numHours === 2) {
//       totalResult += result.numStudents * 95;
//     return `Tk ${(result.numStudents * 95).toLocaleString()}`;
//     }else if (result.numHours === 2.5) {
//     totalResult += result.numStudents * 85;
//     return `Tk ${(result.numStudents * 95).toLocaleString()}`;
//    } 
//  else if (result.numHours === 1) {
//    totalResult += result.numStudents * 85;
//    return `Tk ${(result.numStudents * 85).toLocaleString()}`;
//   } else {
//   return "Tk0"; 
//  }
//   }
//   else if(result.panelType==="Lab Exam"){
//   if (result.numHours>=1 && result.numHours<=4) {
//     totalResult +=  result.daysOfExam * 2000 ;
//     return `Tk ${(result.daysOfExam * 2000).toLocaleString()}`;
//   } else if (result.numHours>=6) {
//     totalResult += result.daysOfExam * 2750;
//     return `Tk ${(result.daysOfExam * 2750).toLocaleString()}`;
//   }
// }
// else if(result.panelType==="Viva Exam"){
// if (result.type === "Hons" || result.type === "Masters") {
//   totalResult += result.numStudents * 100;
//   return `Tk ${(result.numStudents * 100).toLocaleString()}`;
// } else if (result.type === "MPhil") {
//   totalResult += result.numStudents * 1125;
//   return `Tk ${(result.numStudents * 1125).toLocaleString()}`;
// } else {
//   totalResult += result.numStudents * 1875;
//   return `Tk ${(result.numStudents * 1875).toLocaleString()}`;
// }
// }
// else if(result.panelType==="Stencil"){
// totalResult += (result.stencilPages *125);
// return `Tk ${(result.stencilPages *125).toLocaleString()}`;
// }
//  }
 
 

//   return (
//     <div className="container mt-4 light">
//       <TitleContent  />
//       <div className="result-display text-center" >
    
//           <p  style={{ fontSize: '25px', textAlign: 'left' }}>পরীক্ষকের নাম :  <strong style={{ textTransform: 'uppercase' }}>{name}</strong><br/> </p>  
//           <p style={{ fontSize: '25px', textAlign: 'left', }}>২০.......   সনের  <strong >{ sem[semester]}</strong> {formatType[type]}  পরীক্ষা সংক্রান্ত কাজের বিস্তারিত বিবরণ</p>
        
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

// export default ResultDisplay;</night-1:28>                
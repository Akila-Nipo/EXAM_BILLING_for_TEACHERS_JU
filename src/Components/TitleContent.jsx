import React from "react";
import ImageComponent from "./heading";
import Seal from "./Seal";
import './TitleContent.css';
function TitleContent() {
   
 

    return (
      <div>
      <div className="logo-and-title-container" style={{marginLeft:'80px'}}>
       < ImageComponent id="logo" />
         <div classname="title-content" >
         <h1 id="heading-content-1" style={{marginLeft:'0px'}}><strong style={{marginLeft:'20px'}}>পরীক্ষা নিয়ন্ত্রকের অফিস<br />জাহাঙ্গীরনগর বিশ্ববিদ্যালয়</strong></h1>
          <h3 id="heading-content" style={{marginLeft:'140px'}}>সাভার, ঢাকা।</h3>
          <hr className="line"style={{marginLeft:'140px'}}/>
          </div>
          
          <div  style={{marginLeft:'100px'}}>
            <Seal /><br/><div style={{marginBottom:'25px'}}></div><p style={{ fontSize: '25px',}}>রেজিঃ নং ........ পৃষ্ঠা নং .......</p>
          </div>  
        </div>
        <div style={{marginTop:"50px",marginBottom:"50px", }}></div>
        <div style={{ display: 'flex', justifyContent: 'space-between',marginBottom:"50px" }}>
          <h1 style={{ marginLeft: '-200px',fontSize:'32px',}}>স্মারক সংখ্যা : জাবি পানিআ...................</h1>
          <h1 style={{ marginLeft: '0',marginRight:'115px',fontSize:'32px' }}>তারিখ: .......................</h1>
        </div>
       
         <div style={{marginLeft:'250px'}} ><h2 id="section-title">
          পরীক্ষা সংক্রান্ত কাজের পারিতোষিক বিল ফরম</h2></div>
          <div classname="dept-and-semester-info" style={{marginLeft:'270px'}}>
          <h1 >
          (পরীক্ষা কমিটির সভাপতির মাধ্যমে পরীক্ষা নিয়ন্ত্রক অফিসে পাঠাতে হবে)
          </h1>
          <br></br>
          </div>
        </div>
      
    );
  }
  
  export default TitleContent;
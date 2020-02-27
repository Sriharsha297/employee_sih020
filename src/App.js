import React from 'react';
import './App.css';

class App extends React.Component {

  validTime = () => {
    var startTime = '15:10:10';
    var endTime = '23:30:00';
    var currentDate = new Date()   
    
    var startDate = new Date(currentDate.getTime());
    startDate.setHours(startTime.split(":")[0]);
    startDate.setMinutes(startTime.split(":")[1]);
    startDate.setSeconds(startTime.split(":")[2]);
    
    var endDate = new Date(currentDate.getTime());
    endDate.setHours(endTime.split(":")[0]);
    endDate.setMinutes(endTime.split(":")[1]);
    endDate.setSeconds(endTime.split(":")[2]);
    
    
    var valid = startDate < currentDate && endDate > currentDate
    console.log(valid)
    console.log(this.checkIfHoliday());
    console.log(this.checkSunday());
  }
  
  checkSunday = () => {
     var date = new Date();
     var day = date.getDay();
     if(day === 0){
      console.log(day);
      return true;
     }
     return false;
  }



  checkIfHoliday = () => {
    var holidays = ["1-1","12-2","26-1","21-2","25-3"];
    var date = new Date();
    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var newDate = dd+"-"+mm;
    if(holidays.indexOf(newDate) >= 0){
      return true;
    }
    return false;
  }

  render(){
    return (
      <div >
        <button onClick = {this.validTime}>click me!</button>
      </div>
    );
  }
}

export default App;

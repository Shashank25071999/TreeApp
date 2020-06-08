// import React from 'react';
// // import Icon from 'react-native-vector-icons/FontAwesome';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"


// const Treeobject = (props) => {
//   var renders=null;
//   const inputfield=props.inputstatus?<input type='text' onChange={props.addchild} onKeyPress={props.childadded} ></input>:null;
//   if(props.object.slidearrow){
//      renders=props.object.values.map((object,index)=>{
//       return (<Treeobject object={object} title={object.title } slide={(event)=>this.slidearrowfunction(event,index)} plusclick={(event)=>this.childreninput(event,index) } inputstatus={object.inputitem} addchild={(event)=>this.addchildrentext(event)} childadded={(event)=>this.addchildren(event,index)}></Treeobject>);
//     })    
//   }
//   return (
//     <div>
//       <button className="arrowbutton" onClick={props.slide}> ></button>
//       <input type="checkbox"></input>
//       <labeel>{props.title}</labeel>
//       <button onClick={props.plusclick}>+</button>
//       {inputfield}
//      {renders}
//     </div>

//   );
// }
// export default Treeobject;
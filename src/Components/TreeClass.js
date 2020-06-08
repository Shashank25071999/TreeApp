import React, { Component } from 'react';
// import Treeobject from './TreeObject';

class TreeClass extends Component {


    constructor(props) {
        super(props);
        console.log("count")


        this.state = {
            mainarray: [],
            maintext: "",
            childtext: "",
            parentcount: 1
        }
        
    }
    addobjecttothemainarray(event) {
        const text=event.target.value
        this.setState((prevState,props)=>{
            return{
                maintext :text
            }
        })
        
        // console.log(event.target.value)
        // console.log(this.state.parentcount)
        var code = event.keyCode || event.which;
        if (code === 13) {
            //     this.count=this.count+1;;
            // console.log(this.count);
            console.log(this.state.parentcount);


            // console.log("creating object")
            const temparray = [...this.state.mainarray];
            var object = this.creatingobject(this.state.parentcount,false);
            this.state.parentcount = this.state.parentcount + 1;
            object.title = this.state.maintext;
            // console.log(object.title)
            temparray.push(object);
            // console.log(object.title)
            this.setState((prevState, props) => {
                return {
                    mainarray: temparray,
                    maintext: ""
                }
            })
        }
    }
    inputtexthandler = (event) => {
        var text = event.target.value;
        this.setState((prevState, props) => {
            return {
                maintext: text
            }
        })
    }
    creatingobject(count, allcheck) {
        var object = {

            slidearrow: false,
            allchecked: allcheck,
            checkbox: false,
            title: '',
            plussign: true,
            inputitem: false,
            values: [],
            id: count
        }
        return object;
    }
    
    childreninput(event, index, parentobject) {
        parentobject.inputitem = !(parentobject.inputitem);
        this.setState((prevState, props) => {
            return {
                mainarray: prevState.mainarray
            }
        })
    }
    addchildrentext = (event, index) => {
        var text = event.target.value;
        this.setState((prevState, props) => {
            return {
                childtext: text
            }
        })

    }

    extractarray(parentid, array, idlength) {
        console.log(array)
        // idlength=4;
        // parentid=3487;
        while (idlength !== 0) {
            console.log("objectextract")
            const power = Math.pow(10, idlength - 1);

            // console.log(power);
            var digit = parentid / power;
            digit = Math.floor(digit);

            // console.log("shashanksahai")
            // console.log(`${Math.floor(digit)}`);
            array = array[digit - 1].values;
            idlength = idlength - 1;
            parentid = parentid % power;
        }
        return array;
    }

    //children input is done here yaha pe changes karne hai...................
    addchildren(event, index, parentobject) {

        var text = event.target.value;
        var code = event.keyCode || event.which;
        if (code === 13) {
            const childid = parentobject.id * 10 + parentobject.values.length + 1;
            var temp = parentobject.id;
            var templength = temp.toString().length
            const temparray = [...this.state.mainarray];
            const arrayofobject = this.extractarray(temp, temparray, templength);
            // const object = temparray[index];
            const childobject = this.creatingobject(childid,parentobject.checkbox);
            childobject.title = text;
            arrayofobject.push(childobject);
            // temparray[index] = object;
            console.log(`updatedarray`)
            console.log(temparray)
            this.setState((prevState, props) => {
                return {
                    mainarray: temparray
                }
            })
        }
    }
    checkboxonChangehandler(event, object) {
        // console.log("onchange click")
        
        // this.setState({});
        object.checkbox = !(object.checkbox)
        if (object.checkbox === true) {
            // console.log("good work")
           
            object.slidearrow = true;
            object.allchecked=true;
            
            console.log(object)


        }
        else{
            object.slidearrow = false;
            object.allchecked=false
        }
        this.setState({})

    }

    slidearrowfunction(event, index, object) {
        console.log("see")
        const tempobject = object;
        tempobject.slidearrow = !(tempobject.slidearrow);
        object = tempobject;
        this.setState((prevState, props) => {
            return {
                mainarray: prevState.mainarray
            }
        })
    }
    Treeobject = (props) => {
        //  console.log("edit are done")
        var renders = null;
        const check=props.checked;
        // console.log(check)
        const inputfield = props.inputstatus ? <input className="secinputfield" placeholder="Press Enter To Add Child" type='text' onChange={props.addchild} onKeyPress={props.childadded} ></input> : null;
        if (props.object.slidearrow) {
            // const array = props.object.values;
            // const check=props.object.allcheck
            // console.log(props.object.id)
            renders = props.object.values.map((object, index) => {
                const properties = {
                    checked:check?true:object.checkbox?true:false,
                    object: object,
                    title: object.title,
                    slide: (event) => this.slidearrowfunction(event, index, object),
                    plusclick: (event) => this.childreninput(event, index, object),
                    inputstatus: object.inputitem,
                    addchild: (event) => this.addchildrentext(event),
                    childadded: (event) => this.addchildren(event, index, object)
                }
                return this.Treeobject(properties)
                // return (<Treeobject object={object} title={object.title } slide={(event)=>this.slidearrowfunction(event,index)} plusclick={(event)=>this.childreninput(event,index) } inputstatus={object.inputitem} addchild={(event)=>this.addchildrentext(event)} childadded={(event)=>this.addchildren(event,index)}></Treeobject>);
            })
        }
        return (
            <div key={props.object.id}>
                <button className="button" onClick={props.slide}> ></button>
                <input type="checkbox" checked={check?true:props.object.checkbox} onChange={(event) => this.checkboxonChangehandler(event, props.object)} ></input>
                <label>{props.title}</label>
                <button className="button" onClick={props.plusclick}>+</button>
                {inputfield}
                {renders}
            </div>

        );
    }

    renderobject(array) {
        const rend = array.map((object, index) => {
            // console.log(object.values)
            // if(object.slidearrow){
            //    const re=this.renderobject(object.values)

            //     // return (<Treeobject title={object.title } slide={(event)=>this.slidearrowfunction(event,index)} plusclick={(event)=>this.childreninput(event,index) } inputstatus={object.inputitem} addchild={(event)=>this.addchildrentext(event)} childadded={(event)=>this.addchildren(event,index)}></Treeobject>);

            // }  
            const check=object.allchecked;
            const properties = {
                checked:check?true:object.checkbox?true:false,
                object: object,
                title: object.title,
                slide: (event) => this.slidearrowfunction(event, index, object),
                plusclick: (event) => this.childreninput(event, index, object),
                inputstatus: object.inputitem,
                addchild: (event) => this.addchildrentext(event),
                childadded: (event) => this.addchildren(event, index, object)
            }
            // return (<Treeobject object={object}
            //     title={object.title}

            //     slide={(event) => this.slidearrowfunction(event, index)}
            //     plusclick={(event) => this.childreninput(event, index)}
            //     inputstatus={object.inputitem}
            //     addchild={(event) => this.addchildrentext(event)}
            //     childadded={(event) => this.addchildren(event, index)}
            // ></Treeobject>);

            return this.Treeobject(properties);
        })
        return rend;
    }

    render() {

        const renderobjects = this.renderobject(this.state.mainarray)
        // console.log(`rend:${renderobjects}`)
        return (
            <div>
                
                <input className="inputfield" placeholder="Press Enter To Add The Item In The Tree" type='text' onChange={this.inputtexthandler} onKeyPress={(event) => this.addobjecttothemainarray(event)} value={this.state.maintext}></input>
                {renderobjects}
            </div>

        );


    }
}



export default TreeClass;


// if(object.slidearrow){
//     object.values.map((object,index)=>{
//         return (<Treeobject title={object.title } slide={(event)=>this.slidearrowfunction(event,index)} plusclick={(event)=>this.childreninput(event,index) } inputstatus={object.inputitem} addchild={(event)=>this.addchildrentext(event)} childadded={(event)=>this.addchildren(event,index)}></Treeobject>);
//     })
// }
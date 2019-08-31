import React from 'react'
import {Form, Segment} from 'semantic-ui-react'
import FormReporter from "./FormReporter";
import {ConstantMapperUnique, templateFrontEnd} from "./constants";
import {arr} from './Util';

const fieldGetter = ['employee-name','rent-excluding-maintainence',
    'maintainence-amount','month-year','property-address','residence-month-year',
    'lanlord-details','name','address','pan','contact-details','date','place','signature'];

export function GetArr(elem){
    console.log(elem,arr);
    arr.forEach(function(element) {
        if(element.key==elem){
            const val =element;
            console.log("get me",document.getElementById(elem).value,val);
            document.getElementById(elem).value=val.value;
        }
    });
}

// export function GetLabel(elem){
//     let array1=[{title:"My Title Name", key:"employee-name", value:"My Value Name"},{title:"My Title Rent", key:"rent-excluding-maintainence", value:"My Value Rent"}]
//     array1.forEach(function(element) {
//         if(element.key==elem){
//             const val =element.value;
//             console.log("get me",document.getElementById(elem).value,val);
//             document.getElementById(id).value=val;
//         }
//     });
// }

const FormExampleForm = () => (
    <div className="ui card right floated" style={{color: "black", width: "95%", padding: "2%", margin: "2%"}}>
        <FormReporter />
    </div>

)

function GetField(param){
    const field = ConstantMapperUnique(param);
    return (
        <Form.Field >
            <label>{param}</label>
            {console.log("set me:", param, GetArr(param))}
            <input id={param} placeholder={param} />
        </Form.Field>
    );

}

const DigitalForm = () => (
    <div className="ui card right floated" style={{color: "black", width: "95%", padding: "2%", margin: "2%"}}>
        <Segment inverted>
            <Form inverted>
                <Form.Field floated='right' style={{float: "right"}}>
                    <label>Employee Number</label>
                    <input placeholder="Employee Number" value='774269'/>
                </Form.Field>
                {fieldGetter.map((value) => {
                    return GetField(value);
                })}
            </Form>
        </Segment>
        {/*<FormExampleForm />*/}
    </div>

)

export default DigitalForm

const templateBackEnd ={
    "hra": {
        "employee-no": "",
        "fields": {
            "employee-name": "",
            "rent-excluding-maintainence": "",
            "maintainence-amount": "",
            "month-year": "",
            "property-address": "",
            "residence-month-year": "",
            "lanlord-details": {
                "name": "",
                "address": "",
                "pan": "",
                "contact-details": "",
                "date": "",
                "place": "",
                "signature": ""
            },
            "date": "",
            "place": "",
            "signature":""
        }
    }
}

export const templateFrontEnd ={
    "hra": {
        "employee-no": "",
        "fields": {
            "employee-name": "Recieved from (Employee Name)",
            "rent-excluding-maintainence": "Rent (excluding Maintainence) per month",
            "maintainence-amount": "Maintinance Amount per month",
            "month-year": "Month and year for which rent is paid",
            "property-address": "Address of Property where Employee is Residing (Complete Address)",
            "residence-month-year": "Residing from (Month & Year)",
            "lanlord-details": {
                "name": "Name of the Landlord/Lady",
                "address": "Address (Complete Address)",
                "pan": "PAN of the Owner #(In case Land owner does not have a PAN, please submit a declaration)",
                "contact-details": "Contact Details:",
                "date": "Date :",
                "place": "Place :",
                "signature": "(Owner’s Signature)",
                "note": "# Owner’s Permanent Account Number (PAN) is mandatory if the rent is more than `1,00,000 per annum (`8,333 per month)",
                "declaration-header": "Declaration",
                "header":"RENT RECIEPT",
                "subheader": "(All details are mandatory)",
                "declaration1": "I, do hereby declare that what is",
                "declaration2": "stated above is true to the best of my knowledge and " +
                    "belief.I also agree to inform Infosys if there is any change in the rent paid, location, period of" +
                    " residence or any other information which are relevant in computing my House Rent Exemption."
            },
            "date": "Date:",
            "place": "Place:",
            "signature":"Employee’s signature:"
        }
    }
}

const dataBackEnd ={
    "hra": {
        "employee-no": "",
        "fields": {
            "employee-name": "",
            "rent-excluding-maintainence": "",
            "maintainence-amount": "",
            "month-year": "",
            "property-address": "",
            "residence-month-year": "",
            "lanlord-details": {
                "name": "",
                "address": "",
                "pan": "",
                "contact-details": "",
                "date": "",
                "place": "",
                "signature": ""
            },
            "date": "",
            "place": "",
            "signature":""
        }
    }
}


export function ConstantMapper(){
    const hra = templateFrontEnd["hra"];
    console.log(hra)
    const fields = hra.fields;
    const obj={};
    for (var key in fields){
        obj[key]={type: "string", title: fields[key], default: dataBackEnd[key]}
    }
    const schema = {
        title: "HRA Form",
        type: "object",
        properties: obj
    };
    return schema;
}

export function ConstantMapperUnique(param){
    const hra = templateFrontEnd["hra"];
    console.log(hra)
    const fields = hra.fields;
    const obj=[];
    for (var key in fields){
        if (key===param) {
            obj[key] = {type: "string", title: fields[key], default: dataBackEnd[key]}
            console.log(obj);
        }
    }
    const returnObj = {
        "title":fields[key],
        "key":key,
        "value":dataBackEnd[key]
    }
    return returnObj;
    //return schema;
}

export function GetKeyFromObject(param){
    const hra = templateFrontEnd["hra"];
    const fields = hra["fields"];
    for (var key in fields){
        if (key===param) {
            return fields[key];
        }
    }
}


const axios = require('axios');
const ResponseObject = require('./ResponseObjectFile.json');
const Hrform = require('./hrform.png');
import $ from 'jquery';
import {GetArr} from './DigitalForm';

let responseTextTrapped;

export function TrapResponse(responseText) {
    responseTextTrapped=responseText
}

export const arr=[];

export function pushHighlight(highlight, dataRecieved) {
    const returnHighlight = {
        // label: highlight.comment.text,
        file: highlight.content.image
    }

    var formData = new FormData();
    formData.append("file", highlight.content.image);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", "http://c0dac6ac.ngrok.io/parseImage/v1/handleImageBytes");
    xhr.responseType = 'text';
    let response;
    xhr.onload = function() {
        if (xhr.status == 200) {
            //uploadCard.style.display = 'none';
            //table.style.display = 'block';
            var blob = new Blob([this.response], {type: 'multipart/form-data'});
            var downloadUrl = URL.createObjectURL(blob);
            var a = document.createElement("a");
            a.href = downloadUrl;
            a.download = "FormUploaded.png";
            document.body.appendChild(a);
            a.click();
            response=xhr.responseText;
            TrapResponse(response);
            dataRecieved["value"]=xhr.responseText;
            arr.push(dataRecieved);
            console.log("================================ data Created Using Response: ", dataRecieved, "================")
            console.log("================================ data Array of all Responses: ", arr, "================")
            GetArr(dataRecieved.key);
            return xhr.responseText;

        } else {
            //uploadCard.style.display = 'none';
            alert('Unable to download image.')
            table.style.display = 'block';
            console.log("Error");
            return xhr.responseText;
        }
    }
    xhr.onsuccess= function(e){
        console.log("text", xhr.responseText)
        return xhr.responseText
    };
    xhr.send(formData);

}

export function pullMappedFields() {

    console.log('obtained:', returnHighlight);

    axios.get("https://www.docdroid.net/j2vx84a/responseobjectfile.txt")
        .then(function (response) {
            console.log(response);
            const readResponse = JSON.parse(response);
            return readResponse;
        })
        .catch(function (error) {
            console.log(error);
        });
}

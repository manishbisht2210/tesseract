import React from 'react'
import axios, { post } from 'axios';

class SimpleReactFileUpload extends React.Component {

    constructor(props) {
        super(props);
        this.state ={
            file:null
        }
        this.onFormSubmit = this.onFormSubmit.bind(this)
        this.onChange = this.onChange.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
    }
    onFormSubmit(e){
        e.preventDefault() // Stop form submit
        this.fileUpload(this.state.file).then((response)=>{
            console.log(response.data);
        })
    }
    onChange(e) {
        this.setState({file:e.target.files[0]})
    }
    fileUpload(file){
        // const url = 'http://localhost:8080/tesseract/v1/getJson';
        // const formData = new FormData();
        // formData.append('file',file)
        // const config = {
        //     headers: {
        //         'content-type': 'multipart/form-data'
        //     }
        // }
        // return  post(url, formData,config)

        var formData = new FormData();
        formData.append("file", file);
        console.log("axios",file);
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8080/tesseract/v1/getJson");
        xhr.responseType = 'blob';
        xhr.onload = function() {
            if (xhr.status == 200) {
                uploadCard.style.display = 'none';
                table.style.display = 'block';
                var blob = new Blob([this.response], {type: 'multipart/form-data'});
                var downloadUrl = URL.createObjectURL(blob);
                var a = document.createElement("a");
                a.href = downloadUrl;
                a.download = "FormUploaded.png";
                document.body.appendChild(a);
                a.click();

            } else {
                alert('Unable to download image.')
                table.style.display = 'block';
                console.log("Error");
            }
        }
        xhr.send(formData);
    }

    render() {
        return (
            <form onSubmit={this.onFormSubmit}>
                <h1>File Upload</h1>
                <input type="file" onChange={this.onChange} />
                <button type="submit">Upload</button>
            </form>
        )
    }
}



export default SimpleReactFileUpload

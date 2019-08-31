import Service from './Service.js';

class FileService {
    uploadFileToServer(data){
        //returns Promise object
        return Service.getRestClient().post('http://localhost:8080/tesseract/v1/getJson', data);
    }
}

export default FileService;

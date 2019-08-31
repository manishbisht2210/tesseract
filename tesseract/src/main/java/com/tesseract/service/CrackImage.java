package com.tesseract.service;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Base64;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CrackImage {

  @Value("${tessdata.location}")
  private Resource tessdataFileResource;

  private RestTemplate restTemplate = new RestTemplate();

  public String getFile(MultipartFile document) throws IOException, TesseractException {
    Tesseract tesseract = new Tesseract();

    File convFile = new File(
        System.getProperty("java.io.tmpdir") + "/" + document.getOriginalFilename());
    tesseract.setDatapath(tessdataFileResource.getURI().getPath().substring(1));

    document.transferTo(convFile);
    String text = tesseract.doOCR(convFile);

    return text;
  }

  public String handleImageBytes(String document) throws IOException, TesseractException {
    Tesseract tesseract = new Tesseract();
    byte[] imageByte = Base64.getDecoder().decode(document.split(",")[1]);
    String directory = checkFileExtension(document.split(",")[0]);
    FileOutputStream fileOutputStream = new FileOutputStream(directory);
    fileOutputStream.write(imageByte);
    fileOutputStream.close();
    File file = new File(directory);
    //File enhancedImage = enhanceImage(new File(directory));

    tesseract.setDatapath(tessdataFileResource.getURI().getPath().substring(1));
    String text = tesseract.doOCR(file);

    return text;
  }

  private String checkFileExtension(String fileExten) {
    return fileExten.contains("jpg") || fileExten.contains("jpeg")
        ? "classpath:sample.jpg"
        : "classpath:sample1.png";
  }

  private File enhanceImage(File file) {

    HttpHeaders headers = new HttpHeaders();
    headers.setContentType(MediaType.MULTIPART_FORM_DATA);

    MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
    body.add("file", file);

    HttpEntity<MultiValueMap<String, Object>> requestEntity
        = new HttpEntity<>(body, headers);

    String serverUrl = "http://localhost:8082/spring-rest/fileserver/singlefileupload/";

    RestTemplate restTemplate = new RestTemplate();
    ResponseEntity<File> fileResponseEntity = restTemplate
        .postForEntity(serverUrl, requestEntity, File.class);

    return fileResponseEntity.getBody().getParentFile();
  }

}

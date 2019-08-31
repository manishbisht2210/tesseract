package com.tesseract.controller;

import com.tesseract.service.CrackImage;
import com.tesseract.service.VisionDetectService;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/parseImage/v1")
@RequiredArgsConstructor
@CrossOrigin
public class ImageController {

  private final CrackImage crackImage;
  private final VisionDetectService visionDetectService;

  @PostMapping("/getTesseractJson")
  public ResponseEntity<String> getImageJson(
      @RequestParam(value = "file", required = true) MultipartFile document)
      throws IOException, TesseractException {
    String file = crackImage.getFile(document);
    return ResponseEntity.ok().body(file);
  }

  @PostMapping("/getVisionText")
  public ResponseEntity<String> getImageJsonWithVisionAPI(
      @RequestParam(value = "file", required = true) MultipartFile document)
      throws IOException, TesseractException {
    Optional<String> visionString = visionDetectService.detectDocumentText(document);
    return ResponseEntity.ok().body(visionString.get());
  }

  @PostMapping("/handleTessdataImaeBytes")
  public ResponseEntity<String> handleImageBytes(
      @RequestParam(value = "file", required = true) String document)
      throws IOException, TesseractException {
    System.out.println(document);
    String file = crackImage.handleImageBytes(document);
    return ResponseEntity.ok().body(file);
  }

  @PostMapping("/handleImageBytes")
  public ResponseEntity<String> handleVisionBytes(
      @RequestParam(value = "file", required = true) String document) throws IOException {
    Optional<String> visionString = visionDetectService.detectBytesDocument(document);
    return ResponseEntity.ok().body(visionString.get());
  }

}

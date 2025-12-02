package com.getmoney.controller;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.net.MalformedURLException;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@CrossOrigin("*")
public class WebController {

    @GetMapping("/")
    public String home() {
        return "forward:/index.html";
    }

    @GetMapping("/install")
    public String install() {
        return "forward:/install.html";
    }

    // @GetMapping("/download/app")
    // public ResponseEntity<Resource> downloadApk() throws MalformedURLException {
    //     Path path = Paths.get("/app/apk/app-release.apk");
    //     Resource resource = new UrlResource(path.toUri());

    //     if (!resource.exists()) {
    //         return ResponseEntity.notFound().build();
    //     }

    //     return ResponseEntity.ok()
    //             .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"app-release.apk\"")
    //             .contentType(MediaType.APPLICATION_OCTET_STREAM)
    //             .body(resource);
    // }

//     @GetMapping("/download-apk")
//     public ResponseEntity<Void> downloadApk() {
        
//         String apkUrl = "https://drive.google.com/uc?export=download&id=1U3OYDt74wUBcO6LwSsD-LLCXCBIMw3sK";
        
//         return ResponseEntity.status(HttpStatus.FOUND)
//                 .header(HttpHeaders.LOCATION, apkUrl)
//                 .build();
//     }
//     @GetMapping("/download/app")
//         public ResponseEntity<Resource> downloadApk() throws MalformedURLException {
//          Path path = Paths.get("/app/apk/app-release.apk");
//          Resource resource = new UrlResource(path.toUri());

//          if (!resource.exists()) {
//              return ResponseEntity.notFound().build();
//          }

//          return ResponseEntity.ok()
//                  .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"app-release.apk\"")
//                  .contentType(MediaType.APPLICATION_OCTET_STREAM)
//                  .body(resource);
//      }
}
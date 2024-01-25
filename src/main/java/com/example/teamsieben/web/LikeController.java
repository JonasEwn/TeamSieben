package com.example.teamsieben.web;

import com.example.teamsieben.domain.Likes;
import com.example.teamsieben.service.LikeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Controller
@RequestMapping("/likes")
public class LikeController {

    /* Alle Anfragen zu den Likes werden hier bearbeitet
       URL: Localhost:8080/likes/...
    */

    private final LikeService likeService;

    public LikeController(LikeService likeService) {
        this.likeService = likeService;
    }

    @GetMapping("/{username}")
    public ResponseEntity<Iterable<Likes>> getLike(@PathVariable String username){
        Iterable<Likes> likes = likeService.getLike(username);
        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Void> deleteLike(@RequestBody Map<String, Object> data){
        String wkn = (String) data.get("wkn");
        String username = (String) data.get("username") ;
        likeService.deleteLike(wkn, username);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<Likes> addLike(@RequestBody Map<String, Object> data){
        String wkn = (String) data.get("wkn");
        String username = (String) data.get("username") ;
        Likes likes = likeService.addLike(wkn, username);
        return new ResponseEntity<>(likes, HttpStatus.OK);
    }

    @GetMapping("/likedcompanies/{username}")
    public ResponseEntity<Iterable<Map<String, Object>> > likedComapnies(@PathVariable String username){
        Iterable<Map<String, Object>> likedComapnies = likeService.likedCompanies(username);
        return new ResponseEntity<>(likedComapnies, HttpStatus.OK);
    }

}

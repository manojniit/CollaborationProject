package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import com.getzchat.dao.ForumDao;
import com.getzchat.model.Forum;

@RestController
public class ForumController {
@Autowired
ForumDao forumDao;
@RequestMapping(value="/createForum",headers="Accept=Application/json",method=RequestMethod.POST)
public void saveForum(@RequestBody Forum forum ){

	forumDao.createForum(forum);
}
public List<Forum> listForum(@RequestBody Forum forum){
	List<Forum> list=forumDao.listForum(forum);
	return list;
	
}
}

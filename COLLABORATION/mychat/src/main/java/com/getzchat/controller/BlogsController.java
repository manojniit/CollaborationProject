package com.getzchat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getzchat.dao.BlogsDao;
import com.getzchat.model.Blogs;

@RestController
public class BlogsController {
@Autowired
BlogsDao blogsDao;
@RequestMapping(value="/create",headers="Accept=Application/json",method=RequestMethod.POST)
public void saveBlogs(@RequestBody Blogs blogs)
{
	blogsDao.create(blogs);
}
}

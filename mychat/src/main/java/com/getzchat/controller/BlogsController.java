package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
@RequestMapping(value="/listBlogs",headers="Accept=Application/json",method=RequestMethod.POST)
public List<Blogs>  Blogs(){
	
	return blogsDao.listBlogs();
}
@RequestMapping(value="/updateBlog",headers="Accept=application/json",method=RequestMethod.PUT)
public void updateBlog(@RequestBody Blogs blogs)
{
	System.out.println("Inside update blog");
	blogsDao.updateBlog(blogs);
}
@RequestMapping(value="/deleteBlog/{id}",headers="Accept=application/json",method=RequestMethod.DELETE)
public void deleteJob(@PathVariable int id)
{
	blogsDao.deleteBlog(id);
}
}

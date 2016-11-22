package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Blogs;

public interface BlogsDao {
void create(Blogs blogs);
List<Blogs> listBlogs();
void updateBlog(Blogs blogs);
void deleteBlog(int id);

}

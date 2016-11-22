package com.getzchat.dao;

import java.util.Date;
import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Blogs;
@Transactional
@Repository
public class BlogsDaoImpl implements BlogsDao {

	@Autowired
	SessionFactory sessionFactory;
	public void create(Blogs blogs) {
		sessionFactory.getCurrentSession().save(blogs);
	}
	public List<Blogs> listBlogs() {
		Session session=sessionFactory.getCurrentSession();
		List<Blogs> list=session.createCriteria(Blogs.class).list();
		return list;
	}
	
	public void updateBlog(Blogs blogs) {
		Session session=sessionFactory.getCurrentSession();
		  		session.update(blogs);
		
	}
	public void deleteBlog(int id) {
		// TODO Auto-generated method stub
		Session session=sessionFactory.getCurrentSession();
		Blogs blogs=(Blogs)session.get(Blogs.class,new Integer(id));
		session.delete(blogs);	}
	
}

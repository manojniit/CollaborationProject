package com.getzchat.dao;

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

}

package com.getzchat.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Blogs;
import com.getzchat.model.Forum;

@Repository
@Transactional
public class ForumDaoImpl implements ForumDao {

	@Autowired
	SessionFactory sessionFactory;
	
	public void createForum(Forum forum) {
		sessionFactory.getCurrentSession().save(forum);
		
	}

	public List<Forum> viewForum() {
		Session session=sessionFactory.getCurrentSession();
		List<Forum> list=session.createCriteria(Forum.class).list();
return list;
	}

	public void updateForum(Forum forum) {
		sessionFactory.getCurrentSession().update(forum);
		
	}

	public void deleteForum(int forum_Id) {
		Session session=sessionFactory.getCurrentSession();
		Forum forum=(Forum)session.get(Forum.class,new Integer(forum_Id));
		session.delete(forum);	
	}

}

package com.getzchat.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Forum;

@Repository
@Transactional
public class ForumDaoImpl implements ForumDao {

	@Autowired
	SessionFactory sessionFactory;
	
	public void createForum(Forum forum) {
		sessionFactory.getCurrentSession().save(forum);
		
	}

	public List<Forum> listForum(Forum forum) {
		Session session=sessionFactory.getCurrentSession();
		List<Forum> list=session.createCriteria(Forum.class).list();
return list;
	}

}

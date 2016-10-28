package com.getzchat.dao;

import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Jobs;
@Transactional
@Repository
public class JobsDaoImpl implements JobsDao {
	@Autowired
	SessionFactory sessionFactory;
	public void createJobs(Jobs jobs) {
		sessionFactory.getCurrentSession().save(jobs);
	}

}

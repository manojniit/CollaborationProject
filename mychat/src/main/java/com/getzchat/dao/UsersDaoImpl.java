package com.getzchat.dao;

import java.util.List;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Users;
@Transactional
@Repository
public class UsersDaoImpl implements UsersDao {
	@Autowired
	SessionFactory sessionFactory;
	public void registerUser(Users user) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(user);
		
	}
	public List<Users> listUser() {
		Session session=sessionFactory.getCurrentSession();
		List<Users> list=session.createCriteria(Users.class).list();
 		return list;
	}
	
	
}

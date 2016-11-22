package com.getzchat.dao;

import java.util.List;


import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.getzchat.model.Users;
@Transactional
@Repository
public class UsersDaoImpl implements UsersDao {
	@Autowired
	SessionFactory sessionFactory;
	public void registerUser(Users users) {
		// TODO Auto-generated method stub
		sessionFactory.getCurrentSession().save(users);
		
	}
	public List<Users> listUser() {
		Session session=sessionFactory.getCurrentSession();
		List<Users> list=session.createCriteria(Users.class).list();
 		return list;
	}
	public int validateUsers(String username, String password) {
		int res=0;
		Session session=sessionFactory.getCurrentSession();
		Query result = session.createQuery("from Users  u where u.username='"+username+"'");
		List<Users> users=result.list();
		System.out.println("users:"+users);
		if(users.size()==0)
		{
			res=0;
		}
		else
		{
			for(int i=0;i<users.size();i++)
			{
				System.out.println("inside for loop");
				String dbuserName=users.get(i).getUsername();
				String dbpassword=users.get(i).getPassword();
				String dbrole=users.get(i).getRole();
				if(dbuserName.equals(username)&&dbpassword.equals(password)&&dbrole.equals("ROLE_USER"))
				{
					res=1;
					System.out.println("the result is:"+res);
				}
				else
					if(dbuserName.equals(username)&&dbpassword.equals(password)&&dbrole.equals("ROLE_ADMIN"))
				{
					res=2;
					System.out.println("the result  is:"+res);
				}
				}
		}	
		return res;
		}
	

	
}

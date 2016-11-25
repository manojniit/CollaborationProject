package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getzchat.dao.UsersDao;
import com.getzchat.model.Users;

@RestController
public class UserController {
	@Autowired
	UsersDao usersDao;
	@RequestMapping(value="/registerUser",headers="accept=Application/json",method=RequestMethod.POST)
	public void saveUser(@RequestBody Users users)
	{
		usersDao.registerUser(users);
	}
	@RequestMapping(value="/getUsers",headers="accept=Application/json",method=RequestMethod.GET)
	public List<Users> listUser()
	{
		List<Users> users=usersDao.listUser();
		return users;
	}
	@RequestMapping(value="/authenticateUser",headers="accept=Application/json",method=RequestMethod.POST)
	public int authenticateUser(@RequestBody Users users)
	{
		System.out.println("username:"+users.getUsername());
		System.out.println("password:"+users.getPassword());
		int result=0;
		result=usersDao.validateUsers(users.getUsername(),users.getPassword());
		System.out.println("result "+result);
		return result;
		
	}
	
}

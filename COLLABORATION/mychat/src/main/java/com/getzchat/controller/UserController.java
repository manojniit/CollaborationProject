package com.getzchat.controller;

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
	public void saveUser(@RequestBody Users user)
	{
		usersDao.registerUser(user);
	}
	
	
}

package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Users;

public interface UsersDao {
   void registerUser(Users user);
   List<Users> listUser();
}

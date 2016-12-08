package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Forum;

public interface ForumDao {
void createForum(Forum forum);
List<Forum> viewForum();
void updateForum(Forum forum);
void deleteForum(int forum_Id);
}

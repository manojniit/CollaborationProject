package com.getzchat.dao;

import java.util.List;

import com.getzchat.model.Jobs;

public interface JobsDao {
  void createJobs(Jobs jobs);
  List<Jobs> listJobs();
  Jobs viewJobs(int id);
}

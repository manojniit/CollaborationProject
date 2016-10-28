package com.getzchat.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.getzchat.dao.JobsDao;
import com.getzchat.model.Jobs;

@RestController
public class JobsController {
	@Autowired
	JobsDao jobsDao;
	@RequestMapping(value="/createJobs",headers="Accept=Application/json",method=RequestMethod.POST)
	public void saveJobs(@RequestBody Jobs jobs)
	{
		jobsDao.createJobs(jobs);
	}
		
	}


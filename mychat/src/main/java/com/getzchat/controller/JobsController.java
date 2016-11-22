package com.getzchat.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
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
	@RequestMapping(value="/listJobs",headers="Accept=Application/json",method=RequestMethod.GET)
	public List<Jobs> listJobs()
	{
		
		return jobsDao.listJobs();
	}
	@RequestMapping(value="/viewJobs/{id}",headers="Accept=application/json",method=RequestMethod.GET)
	public Jobs viewJobs(@PathVariable int id)
	{
		return jobsDao.viewJobs(id);	
	}
	}


package com.getzchat.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Forum {
	@Id@GeneratedValue
	private int question_Id;
	private String question_Title;
	private String question_Description;
	public int getQuestion_Id() {
		return question_Id;
	}
	public void setQuestion_Id(int question_Id) {
		this.question_Id = question_Id;
	}
	public String getQuestion_Title() {
		return question_Title;
	}
	public void setQuestion_Title(String question_Title) {
		this.question_Title = question_Title;
	}
	public String getQuestion_Description() {
		return question_Description;
	}
	public void setQuestion_Description(String question_Description) {
		this.question_Description = question_Description;
	}
	
	
}

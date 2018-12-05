package com.capping.bean;

import java.util.Objects;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;
import org.json.JSONObject;

@Entity
@Table(name = "personalinformation")
public class PersonalInformation {

  @Id
  public String username;

  public String jobTitle;
  public String firstName;
  public String lastName;
  public String workPhoneNumber;
  public String city;
  public String country;
  public String biography;

  public PersonalInformation() {
  }

  public PersonalInformation(String username, String jobTitle, String firstName, String lastName, String workPhoneNumber,
      String city, String country, String biography) {
    this.username = username;
    this.jobTitle = jobTitle;
    this.firstName = firstName;
    this.lastName = lastName;
    this.workPhoneNumber = workPhoneNumber;
    this.city = city;
    this.country = country;
    this.biography = biography;
  }

  public boolean containsParameters(String[] parameters) {
    for(String parameter : parameters) {
      if(username.equals(parameter)) {return true;}
      if(jobTitle.contains(parameter)) {return true;}
      if(firstName.equals(parameter)) {return true;}
      if(lastName.equals(parameter)) {return true;}
      if(workPhoneNumber.equals(parameter)) {return true;}
    }
    return false;
  }

  public String profilePicture() { return "C:\\\\\\\\Administrator\\\\Pictures\\\\ProfilePictures\\\\" + username + ".jpeg"; }

  @Override
  public int hashCode() {
    return Objects.hash(username, jobTitle, firstName, lastName, workPhoneNumber, city, country, biography);
  }

  @Override
  public boolean equals(Object o) {
  if(this == o) { return true; }
  if(!(o instanceof PersonalInformation)) { return false; }
  PersonalInformation p = (PersonalInformation) o;
  return Objects.equals(username, p.username) && Objects.equals(jobTitle, p.jobTitle) && Objects.equals(firstName, p.firstName)
      && Objects.equals(lastName, p.lastName) && Objects.equals(workPhoneNumber, p.workPhoneNumber) && Objects.equals(city, p.city)
      && Objects.equals(country, p.country) && Objects.equals(biography, p.biography);
  }

  @Override
  public String toString() {
    return this.json().toString();
  }

  public JSONObject json() {
    return new JSONObject().put("PersonalInformation", new JSONObject()
        .put("username", username)
        .put("jobTitle", jobTitle)
        .put("firstName", firstName)
        .put("lastName", lastName)
        .put("workPhoneNumber", workPhoneNumber)
        .put("city", city)
        .put("country", country)
        .put("biography", biography)
        .put("profilePicture", profilePicture())
		);
  }
}



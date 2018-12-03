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
@Table(name = "employees")
public class Employee {

  @Id
  public String username;

  public String firstName;
  public String lastName;
  public String workPhoneNumber;
  public String biography;
  public String password;

  public Employee() {
  }

  public Employee(String username, String firstName, String lastName, String workPhoneNumber,
      String biography, String password) {
    this.username = username;
    this.firstName = firstName;
    this.lastName = lastName;
    this.workPhoneNumber = workPhoneNumber;
    this.biography = biography;
    this.password = password;
  }

  public boolean isManager() {
    return false;
  }

  @Override
  public int hashCode() {
    return Objects.hash(username, firstName, lastName, workPhoneNumber, biography, password);
  }

  @Override
  public boolean equals(Object o) {
    if(this == o) { return true; }
    if(!(o instanceof Employee)) { return false; }
    Employee e = (Employee) o;
    return Objects.equals(username, e.username) && Objects.equals(firstName, e.firstName) && Objects.equals(lastName, e.lastName)
        && Objects.equals(workPhoneNumber, e.workPhoneNumber) && Objects.equals(biography, e.biography) && Objects.equals(password, e.password);
  }

  public JSONObject json() {
    return new JSONObject()
        .put("username", username)
        .put("firstName", firstName)
        .put("lastName", lastName)
        .put("workPhoneNumber", workPhoneNumber)
        .put("biography", biography)
        .put("password", password);
  }

  @Override
  public String toString() {
    return this.json().toString();
  }

}

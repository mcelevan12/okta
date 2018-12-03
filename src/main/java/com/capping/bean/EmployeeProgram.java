package com.capping.bean;

import java.util.Objects;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.EmbeddedId;
import javax.persistence.Embeddable;
import org.json.JSONObject;

@Entity
@Table(name = "employee_programs")
public class EmployeeProgram {

  @EmbeddedId
  public EmployeeProgramId employeeProgramId;

  public EmployeeProgram() {}
  public EmployeeProgram(EmployeeProgramId employeeProgramId) {
    this.employeeProgramId = employeeProgramId;
  }

  public int programId() { return employeeProgramId.programId; }
  public String programName() { return employeeProgramId.programName; }
  public String accessLevel() { return employeeProgramId.accessLevel; }

  @Override
  public int hashCode() {
    return Objects.hash(employeeProgramId);
  }

  @Override
  public boolean equals(Object o) {
    if(this == o){ return true; }
    if(!(o instanceof EmployeeProgram)) { return false; }
    EmployeeProgram e = (EmployeeProgram) o;
    return Objects.equals(employeeProgramId, e.employeeProgramId);
  }

  @Override
  public String toString() {
    return this.json().toString();
  }

  public JSONObject json() {
    return new JSONObject()
        .put("employeeProgramId", new JSONObject()
            .put("programId", employeeProgramId.programId)
            .put("username", employeeProgramId.username)
            .put("programName", employeeProgramId.programName)
            .put("accessLevel", employeeProgramId.accessLevel));
  }

  @Embeddable
  public static class EmployeeProgramId implements Serializable {
    public int programId;
    public String username;
    public String programName;
    public String accessLevel;

    public EmployeeProgramId() {}
    public EmployeeProgramId(int programId, String username, String programName, String accessLevel) {
      this.programId = programId;
      this.username = username;
      this.programName = programName;
      this.accessLevel = accessLevel;
    }

    @Override
    public int hashCode() {
      return Objects.hash(programId, username, programName, accessLevel);
    }

    @Override
    public boolean equals(Object o) {
      if(this == o) { return true; }
      if(!(o instanceof EmployeeProgramId)) { return false; }
      EmployeeProgramId e = (EmployeeProgramId) o;
      return programId == e.programId && Objects.equals(username, e.username) && Objects.equals(programName, e.programName) && Objects.equals(accessLevel, e.accessLevel);
    }
  }
}

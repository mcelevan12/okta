package com.capping.bean;

import java.util.Objects;
import java.util.List;
import java.io.Serializable;
import java.io.IOException;
import java.io.ObjectStreamException;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.EmbeddedId;
import javax.persistence.Embeddable;
import org.json.JSONObject;

@Entity
@Table(name = "valid_programs")
public class ValidProgram implements Serializable{

  @EmbeddedId
  public ValidProgramId validProgramId;
  public String description;

  public ValidProgram() {
  }

  public ValidProgram(ValidProgramId validProgramId, String description) {
    this.validProgramId = validProgramId;
    this.description = description;
  }

  public boolean isAlreadyAccessedByEmployee(List<EmployeeProgram> employeeProgramList) {
    for(EmployeeProgram program : employeeProgramList) {
      if(validProgramId.programId == program.programId() && validProgramId.accessLevel.equals(program.accessLevel())){ return true;}
    }
    return false;
  }

  public JSONObject json() {
    return new JSONObject()
        .put("validProgramId", new JSONObject()
            .put("programId", validProgramId.programId)
            .put("programName", validProgramId.programName)
            .put("accessLevel", validProgramId.accessLevel))
        .put("description", description);
  }

  @Override
  public int hashCode() {
    return Objects.hash(validProgramId, description);
  }

  @Override
  public boolean equals(Object o) {
    if(this == o) { return true; }
    if(!(o instanceof ValidProgram)) { return false; }
    ValidProgram v = (ValidProgram) o;
    return Objects.equals(validProgramId, v.validProgramId) && Objects.equals(description, v.description);
  }

  @Override
  public String toString() {
    return this.json().toString();
  }

  @Embeddable
  public static class ValidProgramId  implements Serializable {
    public int programId;
    public String programName;
    public String accessLevel;

    public ValidProgramId() {}
    public ValidProgramId(int programId, String programName, String accessLevel) {
      this.programId = programId;
      this.programName = programName;
      this.accessLevel = accessLevel;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ValidProgramId)) return false;
        ValidProgramId v = (ValidProgramId) o;
        return programId == v.programId && Objects.equals(programName, v.programName) && Objects.equals(accessLevel, v.accessLevel);
    }

    @Override
    public int hashCode() {
        return Objects.hash(programId, programName, accessLevel);
    }
  }

}



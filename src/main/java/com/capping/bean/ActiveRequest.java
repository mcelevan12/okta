package com.capping.bean;

import java.util.Objects;
import java.util.List;
import java.io.Serializable;
import java.io.IOException;
import java.io.ObjectStreamException;
import java.util.Date;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.EmbeddedId;
import javax.persistence.Embeddable;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import org.json.JSONObject;

@Entity
@Table(name = "Active_Requests")
public class ActiveRequest implements Serializable {

  @EmbeddedId
  public ActiveRequestId activeRequestId;

  @Temporal(TemporalType.DATE)
  public Date lastUpdated;
  public String comment;

  public ActiveRequest() {
  }

  public ActiveRequest(ActiveRequestId activeRequestId, Date lastUpdated, String comment) {
    this.activeRequestId = activeRequestId;
    this.lastUpdated = lastUpdated;
    this.comment = comment;
  }

  @Override
  public int hashCode() {
    return Objects.hash(activeRequestId, lastUpdated, comment);
  }

  @Override
  public boolean equals(Object o) {
    if(this == o) { return true; }
    if(!(o instanceof ActiveRequest)) { return false; }
    ActiveRequest a = (ActiveRequest) o;
    return Objects.equals(activeRequestId, a.activeRequestId) && Objects.equals(lastUpdated, a.lastUpdated) && Objects.equals(comment, a.comment);
  }

  @Override
  public String toString() {
    return this.json().toString();
  }

  public JSONObject json() {
    return new JSONObject()
        .put("activeRequestId", new JSONObject()
            .put("username", activeRequestId.username)
            .put("programId", activeRequestId.programId)
            .put("accessLevel", activeRequestId.accessLevel)
            .put("status", activeRequestId.status)
            .put("modifiedBy", activeRequestId.modifiedBy))
        .put("lastUpdated", lastUpdated.toString())
        .put("comment", comment);
  }

  @Embeddable
  public static class ActiveRequestId implements Serializable {
    public String username;
    public int programId;
    public String accessLevel;
    public String status;
    public String modifiedBy;

    public ActiveRequestId() {}
    public ActiveRequestId(String username, int programId, String accessLevel, String status, String modifiedBy) {
      this.username = username;
      this.programId = programId;
      this.accessLevel = accessLevel;
      this.modifiedBy = modifiedBy;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ActiveRequestId)) return false;
        ActiveRequestId a = (ActiveRequestId) o;
        return programId == a.programId && Objects.equals(username, a.username) && Objects.equals(accessLevel, a.accessLevel)
            && Objects.equals(modifiedBy, a.modifiedBy);
    }

    @Override
    public int hashCode() {
        return Objects.hash(programId, username, accessLevel, modifiedBy);
    }
  }

}



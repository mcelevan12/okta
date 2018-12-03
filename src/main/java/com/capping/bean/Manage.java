package com.capping.bean;

import java.util.Objects;
import java.util.List;
import java.io.Serializable;
import java.time.LocalDateTime;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Table;
import javax.persistence.EmbeddedId;
import javax.persistence.Embeddable;
import org.json.JSONObject;

@Entity
@Table(name = "Manages")
public class Manage implements Serializable {

  @EmbeddedId
  public ManageId manageId;

  public Manage() { }

  public Manage(ManageId manageId) {
    this.manageId = manageId;
  }

  public String managerUsername() {return manageId.managerUsername;}
  public String managedUsername() {return manageId.managedUsername;}

  public JSONObject json() {
    return new JSONObject()
        .put("manageId", new JSONObject()
            .put("managerUsername", manageId.managerUsername)
            .put("managedUsername", manageId.managedUsername));
  }

  @Override
  public String toString() {
    return this.json().toString();
  }

  @Override
  public int hashCode() {
    return Objects.hash(manageId);
  }

  @Override
  public boolean equals(Object o) {
    if(this == o) { return true; }
    if(!(o instanceof Manage)) { return false; }
    Manage m = (Manage) o;
    return Objects.equals(manageId, m.manageId);
  }

  @Embeddable
  public static class ManageId implements Serializable {
    public String managerUsername;
    public String managedUsername;

    public ManageId() {}
    public ManageId(String managerUsername, String managedUsername) {
      this.managerUsername = managerUsername;
      this.managedUsername = managedUsername;
    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ManageId)) return false;
        ManageId m = (ManageId) o;
        return Objects.equals(managerUsername, m.managerUsername) && Objects.equals(managedUsername, m.managedUsername);
    }

    @Override
    public int hashCode() {
        return Objects.hash(managerUsername, managedUsername);
    }
  }

}



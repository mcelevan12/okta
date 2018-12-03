package com.capping.repository;

import com.capping.bean.EmployeeProgram;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeProgramRepository extends CrudRepository<EmployeeProgram, EmployeeProgram.EmployeeProgramId> {

  public List<EmployeeProgram> findByEmployeeProgramIdUsername(String username);

}

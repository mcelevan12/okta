package com.capping.repository;

import com.capping.bean.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends CrudRepository<Employee, String> {
  public Employee findByUsername(String username);
}

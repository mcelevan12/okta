
package com.capping.service;

import com.capping.bean.Employee;
import com.capping.repository.EmployeeRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeService implements IEmployeeService {

  @Autowired
  private EmployeeRepository repository;

  @Override
  public Employee find(String username) {
    return (Employee) repository.findOne(username);
  }

  @Override
  public Employee save(Employee employee) {
    return (Employee) repository.save(employee);
  }
}


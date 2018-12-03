
package com.capping.service;

import com.capping.bean.EmployeeProgram;
import com.capping.repository.EmployeeProgramRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class EmployeeProgramService implements IEmployeeProgramService {

    @Autowired
    private EmployeeProgramRepository repository;

    @Override
    public List<EmployeeProgram> findAll() {
        return (List<EmployeeProgram>) repository.findAll();
    }

    @Override
    public List<EmployeeProgram> findByUsername(String username) {
        return (List<EmployeeProgram>) repository.findByEmployeeProgramIdUsername(username);
    }
}


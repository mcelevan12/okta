package com.capping.service;

import com.capping.bean.EmployeeProgram;
import java.util.List;

public interface IEmployeeProgramService {

    public List<EmployeeProgram> findAll();
    public List<EmployeeProgram> findByUsername(String username);
}



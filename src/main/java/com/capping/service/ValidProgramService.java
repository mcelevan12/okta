
package com.capping.service;

import com.capping.bean.ValidProgram;
import com.capping.repository.ValidProgramRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ValidProgramService implements IValidProgramService {

    @Autowired
    private ValidProgramRepository repository;

    @Override
    public List<ValidProgram> findAll() {
        return (List<ValidProgram>) repository.findAll();
    }

}



package com.capping.service;

import com.capping.bean.PersonalInformation;
import com.capping.repository.PersonalInformationRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PersonalInformationService implements IPersonalInformationService {

    @Autowired
    private PersonalInformationRepository repository;

    @Override
    public List<PersonalInformation> findAll() {
        return (List<PersonalInformation>) repository.findAll();
    }

    @Override
    public PersonalInformation find(String username) {
        return (PersonalInformation) repository.findOne(username);
        //for(Employee employee : repository.findAll()) {
        //    if(employee.getUsername().equals(username)) {
        //        return employee;
        //    }
        //}
        //return null;
    }
}


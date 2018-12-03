package com.capping.service;

import com.capping.bean.PersonalInformation;
import java.util.List;

public interface IPersonalInformationService {

    public List<PersonalInformation> findAll();
    public PersonalInformation find(String username);
}



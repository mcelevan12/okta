package com.capping.repository;

import com.capping.bean.PersonalInformation;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalInformationRepository extends CrudRepository<PersonalInformation, String> {

}

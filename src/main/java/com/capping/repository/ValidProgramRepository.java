package com.capping.repository;

import com.capping.bean.ValidProgram;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ValidProgramRepository extends CrudRepository<ValidProgram, ValidProgram.ValidProgramId> {

}

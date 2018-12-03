package com.capping.repository;

import com.capping.bean.Manage;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ManageRepository extends CrudRepository<Manage, Manage.ManageId> {
  List<Manage> findByManageIdManagerUsername(String username);
  Manage findByManageIdManagedUsername(String username);
}

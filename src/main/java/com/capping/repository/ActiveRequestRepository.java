package com.capping.repository;

import com.capping.bean.ActiveRequest;
import java.util.List;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActiveRequestRepository extends CrudRepository<ActiveRequest, ActiveRequest.ActiveRequestId> {
  List<ActiveRequest> findAllByActiveRequestIdUsername(String username);
  ActiveRequest save(ActiveRequest activeRequest);
}


package com.capping.service;

import com.capping.bean.ActiveRequest;
import com.capping.repository.ActiveRequestRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ActiveRequestService implements IActiveRequestService {

    @Autowired
    private ActiveRequestRepository repository;


    @Override
    public List<ActiveRequest> findAllByUsername(String username) {
        return (List<ActiveRequest>) repository.findAllByActiveRequestIdUsername(username);
    }

    @Override
    public ActiveRequest save(ActiveRequest activeRequest) {
        return (ActiveRequest) repository.save(activeRequest);
    }

}


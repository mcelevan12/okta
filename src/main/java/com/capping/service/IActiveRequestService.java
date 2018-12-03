package com.capping.service;

import java.util.List;
import com.capping.bean.ActiveRequest;

public interface IActiveRequestService {
    public List<ActiveRequest> findAllByUsername(String username);
    public ActiveRequest save(ActiveRequest activeRequest);
}



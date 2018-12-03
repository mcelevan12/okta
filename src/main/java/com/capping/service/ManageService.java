
package com.capping.service;

import com.capping.bean.Manage;
import com.capping.repository.ManageRepository;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ManageService implements IManageService {

    @Autowired
    private ManageRepository repository;

    @Override
    public List<Manage> findAll() {
        return (List<Manage>) repository.findAll();
    }

    @Override
    public List<Manage> findByManagerUsername(String username) {
        return (List<Manage>) repository.findByManageIdManagerUsername(username);
    }

    @Override
    public Manage findByManagedUsername(String username) {
        return (Manage) repository.findByManageIdManagedUsername(username);
    }
}


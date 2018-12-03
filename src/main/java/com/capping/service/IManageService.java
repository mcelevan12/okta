package com.capping.service;

import com.capping.bean.Manage;
import java.util.List;

public interface IManageService {
    public List<Manage> findAll();
    public List<Manage> findByManagerUsername(String username);
    public Manage findByManagedUsername(String username);
}



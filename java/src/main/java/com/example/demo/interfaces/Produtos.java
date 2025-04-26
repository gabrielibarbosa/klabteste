package com.example.demo.interfaces;

import org.springframework.web.bind.annotation.PathVariable;

import java.sql.SQLException;
import java.util.Map;

//Comunicação com a camada de negócio da aplicação
public interface Produtos {

    public void insertProduct(Map<String, Object> product) throws SQLException;

    public Object getAllProducts() throws SQLException ;
    
    public void updateProduct(Integer id, Map<String, Object> product) throws SQLException;
}

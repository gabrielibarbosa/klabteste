package com.example.demo.interfaces;

import java.sql.SQLException;
import java.util.Map;

//Comunicação com a camada de negócio da aplicação
public interface Vendas {

    public void insertVendas(Map<String, Object> vendas) throws SQLException;

    public Object getAllVendas() throws SQLException ;
}

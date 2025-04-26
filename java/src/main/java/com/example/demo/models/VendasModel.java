package com.example.demo.models;

import com.example.demo.interfaces.Vendas;
import com.example.demo.services.NativeScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class VendasModel implements Vendas {

    @Autowired
    private NativeScriptService nativeScriptService;

    public Object getAllVendas() throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            List<Map<String, Object>> listMap = new ArrayList<>();

            //Construção da string SQL
            StringBuilder sql = new StringBuilder();
            sql.append("SELECT * FROM vendas;");

            //Abertura da conexão com o banco e abertura da PreparedStatement para comunicação
            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sql.toString(), connection);

            //Conversão e retorno das informações
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()){
                Map<String,Object> map = new HashMap<>();
                map.put("id", rs.getObject("id"));
                map.put("comprador", rs.getObject("comprador"));
                map.put("produto_id", rs.getObject("produto_id"));
                map.put("quantidades", rs.getObject("quantidades"));
                map.put("total_venda", rs.getObject("total_venda"));
                listMap.add(map);
            }
            return listMap;
        } catch (SQLException e) {
            System.out.println("Erro ao consultar as vendas: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao consultar a tabela vendas no banco de dados.", e.getMessage());
        } finally {
            connection.close();
            preparedStatement.close();
        }
    }

    public void insertVendas(Map<String, Object> venda) throws SQLException {
        try {
            StringBuilder sql = new StringBuilder();
            sql.append("INSERT INTO vendas (comprador, produto_id, quantidades, total_venda) VALUES ('")
                    .append(venda.get("comprador")).append("', ")
                    .append(venda.get("produto_id")).append(",")
                    .append(venda.get("quantidades")).append(",")
                    .append(venda.get("total_venda")).append(")");

            System.out.println("SQL para inserir uma venda: " + sql);
            nativeScriptService.execute(sql.toString());
        } catch (Exception e) {
            System.out.println("Erro ao inserir uma venda: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao inserir nova venda no banco de dados.", e.getMessage());
        }
    }
}

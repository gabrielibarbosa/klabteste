package com.example.demo.models;

import com.example.demo.interfaces.Produtos;
import com.example.demo.services.NativeScriptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PathVariable;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/*
 * Construa suas regras de negócio da forma que for necessária.
 * Se basear nos exemplos abaixo, complementando-os, ou até mesmo melhorando-os.
 * As operações no devem ser feitas por meio de strings SQL.
 */
@Service
public class ProdutoModel implements Produtos {

    @Autowired
    private NativeScriptService nativeScriptService;

    public Object getAllProducts() throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;

        try {
            List<Map<String, Object>> listMap = new ArrayList<>();

            //Construção da string SQL
            StringBuilder sql = new StringBuilder();
            sql.append("SELECT * FROM produtos;");

            //Abertura da conexão com o banco e abertura da PreparedStatement para comunicação
            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sql.toString(), connection);

            //Conversão e retorno das informações
            ResultSet rs = preparedStatement.executeQuery();
            while (rs.next()){
                Map<String,Object> map = new HashMap<>();
                map.put("id", rs.getObject("id"));
                map.put("nome", rs.getObject("nome"));
                map.put("preco", rs.getObject("preco"));
                map.put("quantidadeDisponivelVenda", rs.getObject("quantidades"));
                map.put("quantidadeDefeitos", rs.getObject("defeitos"));
                listMap.add(map);
            }
            return listMap;
        } catch (SQLException e) {
            System.out.println("Erro ao consultar produtos: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao consultar produtos no banco de dados.", e.getMessage());
        } finally {
            //Fechamento das conexões
            connection.close();
            preparedStatement.close();
        }
    }


    public void updateProduct(@PathVariable Integer id, Map<String, Object> product) throws SQLException {
        try {
            StringBuilder sql = new StringBuilder();
            sql.append("UPDATE produtos SET ");

            List<String> updates = new ArrayList<>();

            if (product.containsKey("nome")) {
                updates.add("nome = '" + product.get("nome") + "'");
            }
            if (product.containsKey("preco")) {
                updates.add("preco = " + product.get("preco"));
            }
            if (product.containsKey("quantidadeDisponivelVenda")) {
                updates.add("quantidades = " + product.get("quantidadeDisponivelVenda"));
            }
            if (product.containsKey("quantidadeDefeitos")) {
                updates.add("defeitos = '" + product.get("quantidadeDefeitos") + "'");
            }

            sql.append(String.join(", ", updates));
            sql.append(" WHERE id = ").append(id);

            System.out.println("SQL para atualizar produto: " + sql);
            nativeScriptService.execute(sql.toString());
        } catch (Exception e) {
            System.out.println("Erro ao atualizar produto: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao atualizar produto no banco de dados.", e.getMessage());
        }
    }


    public void insertProduct(Map<String, Object> product) throws SQLException {
        try {
            StringBuilder sql = new StringBuilder();
            sql.append("INSERT INTO produtos (nome, preco) VALUES ('")
                    .append(product.get("name")).append("', ")
                    .append(product.get("preco")).append(")");

            System.out.println("SQL para inserir produto: " + sql);
            nativeScriptService.execute(sql.toString());
        } catch (Exception e) {
            System.out.println("Erro ao inserir produto: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao inserir produto no banco de dados.", e.getMessage());
        }
    }
}

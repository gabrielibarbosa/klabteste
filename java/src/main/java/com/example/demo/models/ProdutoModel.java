package com.example.demo.models;

import com.example.demo.interfaces.Produtos;
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

    // Funcao para retornar a quantidade atual disponivel de um produto
    public Integer getQuantidadeAtual(Integer produtoId) throws SQLException {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet rs = null;

        try {
            String sql = "SELECT quantidades FROM produtos WHERE id = ?";

            connection = nativeScriptService.getConectionDb();
            preparedStatement = nativeScriptService.getPreparedStatementDb(sql, connection);

            preparedStatement.setInt(1, produtoId);

            rs = preparedStatement.executeQuery();

            if (rs.next()) {
                return rs.getInt("quantidades");
            } else {
                throw new SQLException("Produto não encontrado com id: " + produtoId);
            }
        } catch (SQLException e) {
            System.out.println("Erro ao consultar quantidade atual do produto: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao consultar quantidade atual do produto.", e);
        } finally {
            if (rs != null) rs.close();
            if (preparedStatement != null) preparedStatement.close();
            if (connection != null) connection.close();
        }
    }


    public void updateProduct(Map<String, Object> product) throws SQLException {
        try {
            if (!product.containsKey("id")) {
                throw new IllegalArgumentException("ID do produto é obrigatório para atualização.");
            }

            StringBuilder sql = new StringBuilder();
            sql.append("UPDATE produtos SET ");

            List<String> updates = new ArrayList<>();

            if (product.containsKey("nome")) {
                updates.add("nome = '" + product.get("nome") + "'");
            }
            if (product.containsKey("preco")) {
                updates.add("preco = " + product.get("preco"));
            }
            if (product.containsKey("quantidades")) {
                updates.add("quantidades = " + product.get("quantidades"));
            }
            if (product.containsKey("defeitos")) {
                updates.add("defeitos = '" + product.get("defeitos") + "'");
            }

            sql.append(String.join(", ", updates));
            sql.append(" WHERE id = ").append(product.get("id"));

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

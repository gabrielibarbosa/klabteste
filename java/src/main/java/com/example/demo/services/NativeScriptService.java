package com.example.demo.services;

import org.springframework.stereotype.Component;
import jakarta.persistence.PersistenceException;

import java.sql.*;

/*
 * Classe responsável pela conexão com o banco de dados de teste
 * Não será necessária a alteração desta implementação.
 */

@Component
public class NativeScriptService {
    private static final String URL = "jdbc:postgresql://localhost:7000/postgres";
    private static final String USUARIO = "postgres";
    private static final String SENHA = "example";

    public void execute(String sql) throws PersistenceException {
        try {
            executeQuery(sql);
        } catch (PersistenceException | SQLException e) {
            throw new PersistenceException("Erro ao executar consulta nativa: " + e.getMessage());
        }
    }

    private void executeQuery(String sql) throws PersistenceException, SQLException {
        Connection conexao = DriverManager.getConnection(URL, USUARIO, SENHA);
        PreparedStatement statement = conexao.prepareStatement(sql);
        try {
            statement.executeUpdate();
            /*
                Foi necessário fazer a alteração de função,
                pois ao rodar os inserts não estava retornando o ResultSet e
                estava dando erro de excessão.
                Isso acontece porque o executeQuery() → é usado somente para consultas SQL que
                retornam dados (ex: SELECT).
                Ele espera receber um ResultSet como resposta.
                INSERT, UPDATE, DELETE → não retornam um ResultSet, apenas **um número de linhas
            */

        } catch (Exception e) {
            throw new PersistenceException("Erro ao executar a consulta no banco de dados: " + e.getMessage());
        } finally {
            conexao.close();
            statement.close();
        }
    }

    // Preparações isoladas

    public Connection getConectionDb() throws SQLException {
        return DriverManager.getConnection(URL, USUARIO, SENHA);
    }

    public PreparedStatement getPreparedStatementDb(String sql, Connection connection) throws SQLException {
        return connection.prepareStatement(sql);
    }

}

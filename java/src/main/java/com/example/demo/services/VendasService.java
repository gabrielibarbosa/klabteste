package com.example.demo.services;

import com.example.demo.interfaces.Produtos;
import com.example.demo.interfaces.Vendas;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;


@Service
public class VendasService {

    private final Vendas vendas;
    private final Produtos produtos;

    public VendasService(Vendas vendas, Produtos produtos) {
        this.vendas = vendas;
        this.produtos = produtos;
    }

    @Transactional
    public void processarVenda(Map<String, Object> venda) throws SQLException {
        try {
            /*Primeira etapa é inserir a venda no banco de dados*/
            System.out.println("Fazendo insert da venda: " + venda);
            vendas.insertVendas(venda);

            /* Depois pegas os dados que não equivamentes ao produto que precisam ser alterados */
            Integer produtoId = (Integer) venda.get("produto_id");
            Integer quantidadeVendida = (Integer) venda.get("quantidades");

            /* Fazendo o map para o que a função de update espera */
            Map<String, Object> updateProduto = new HashMap<>();
            updateProduto.put("id", produtoId);
            updateProduto.put("quantidades", quantidadeVendida);

           /* Fazendo o update de produto */
            System.out.println("Fazendo update do produto: " + updateProduto);
            produtos.updateProduct(produtoId, updateProduto);

        } catch (Exception e) {
            System.out.println("Erro ao processar a venda: " + e.getMessage());
            e.printStackTrace();
            throw new SQLException("Erro ao processar a venda e atualizar produto.", e);
        }
    }

}



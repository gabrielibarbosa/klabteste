package com.example.demo.webservices;
import com.example.demo.interfaces.Produtos;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/produtos")
public class ProdutosWs {

    @Autowired
    private Produtos produtos;

    @GetMapping()
    public ResponseEntity<Object> getAllProducts() {
        try {
            return ResponseEntity.ok(produtos.getAllProducts());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao consultar os produtos");
        }
    }

    @PutMapping()
    public ResponseEntity<String> createProduct(@RequestBody Map<String, Object> product) {
        try {
            produtos.insertProduct(product);
            return ResponseEntity.ok("Produto criado com sucesso.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao inserir o produto");
        }
    }

    @PostMapping("/{id}")
    public ResponseEntity<Map<String, Object>>  updateProduct(@PathVariable Integer id, @RequestBody Map<String, Object> produto) {
        Map<String, Object> response = new HashMap<>();
        try {
            produtos.updateProduct(id, produto);
            return ResponseEntity.ok(response);
        } catch (Exception e) {

            response.put("status", "error");
            response.put("message", "Erro ao cadastrar a venda: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

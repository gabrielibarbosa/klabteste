package com.example.demo.webservices;
import com.example.demo.interfaces.Produtos;
import com.example.demo.interfaces.Vendas;
import com.example.demo.services.VendasService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/vendas")
public class VendasWs {

    @Autowired
    private Vendas vendas;

    @Autowired
    private VendasService vendasService;


    @GetMapping()
    public ResponseEntity<Object> getAllVendas() {
        try {
            return ResponseEntity.ok(vendas.getAllVendas());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Erro ao consultar a lista de vendas");
        }
    }

    @PutMapping()
    public ResponseEntity<Map<String, Object>> createVenda(@RequestBody Map<String, Object> venda) {
        Map<String, Object> response = new HashMap<>();
        try {
            vendasService.processarVenda(venda);
            return ResponseEntity.ok(response);
        } catch (Exception e) {

            response.put("status", "error");
            response.put("message", "Erro ao cadastrar a venda: " + e.getMessage());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }
}

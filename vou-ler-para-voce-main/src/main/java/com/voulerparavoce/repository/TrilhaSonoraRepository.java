package com.voulerparavoce.repository;

import com.voulerparavoce.entity.TrilhaSonora;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TrilhaSonoraRepository extends JpaRepository<TrilhaSonora, Integer> {


    List<TrilhaSonora> findByNomeContainingIgnoreCase(String nome);


}

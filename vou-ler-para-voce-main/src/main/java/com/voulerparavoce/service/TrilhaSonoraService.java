package com.voulerparavoce.service;

import com.voulerparavoce.dto.request.TrilhaSonoraDTORequest;
import com.voulerparavoce.dto.response.TrilhaSonoraDTOResponse;
import com.voulerparavoce.entity.TrilhaSonora;
import com.voulerparavoce.repository.TrilhaSonoraRepository;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TrilhaSonoraService {

    private final TrilhaSonoraRepository trilhaSonoraRepository;
    @Autowired
    private ModelMapper modelMapper;

    public TrilhaSonoraService(TrilhaSonoraRepository trilhaSonoraRepository) {
        this.trilhaSonoraRepository = trilhaSonoraRepository;
    }

    @Transactional
    public TrilhaSonoraDTOResponse criarTrilhaSonora(TrilhaSonoraDTORequest trilhaDTORequest, byte[] conteudo) {
        TrilhaSonora trilha = new TrilhaSonora();
        trilha.setNome(trilhaDTORequest.getNome());
        trilha.setAudio(conteudo); // campo byte[] da entidade

        TrilhaSonora salvo = trilhaSonoraRepository.save(trilha);

        return modelMapper.map(salvo, TrilhaSonoraDTOResponse.class);
    }

    public List<TrilhaSonoraDTOResponse> listarTrilhas() {
        return trilhaSonoraRepository.findAll()
                .stream()
                .map(trilha -> new TrilhaSonoraDTOResponse(
                        trilha.getId(),
                        trilha.getNome(),
                        trilha.getAudio()
                ))
                .toList();
    }

    public TrilhaSonoraDTOResponse buscarPorId(Integer id) {
        TrilhaSonora trilha = trilhaSonoraRepository.findById(id).get(); // sem tratamento
        return new TrilhaSonoraDTOResponse(
                trilha.getId(),
                trilha.getNome(),
                trilha.getAudio()
        );
    }

    @Transactional
    public void deletarTrilha(Integer id) {
        TrilhaSonora trilha = trilhaSonoraRepository.findById(id).get(); // sem tratamento
        trilhaSonoraRepository.delete(trilha);
    }




}

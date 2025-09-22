package com.voulerparavoce.dto.response;

import java.io.File;

public class TrilhaSonoraDTOResponse {

    private Integer id;

    private String nome;

    private byte[] audio;

    public TrilhaSonoraDTOResponse() {
    }

    public TrilhaSonoraDTOResponse(Integer id, String nome, byte[] audio) {
        this.id = id;
        this.nome = nome;
        this.audio = audio;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public byte[] getAudio() {
        return audio;
    }

    public void setAudio(byte[] audio) {
        this.audio = audio;
    }
}

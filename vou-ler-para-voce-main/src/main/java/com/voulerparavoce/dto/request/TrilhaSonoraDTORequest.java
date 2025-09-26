package com.voulerparavoce.dto.request;

public class TrilhaSonoraDTORequest {
    private String nome;

    private byte[] audio;

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

package com.voulerparavoce.dto.response;

import java.io.File;
import java.time.LocalDateTime;

public class AudioDTOResponse {

    private Integer id;

    private int ordem;

    private byte[] audio;

    private LocalDateTime dataCriacao;

    private int status;

    private Integer usuarioId;

    private Integer historiaId;

    public AudioDTOResponse() {}

    public AudioDTOResponse(Integer id, int ordem, byte[] audio, int status, LocalDateTime dataCriacao, Integer usuarioId, Integer historiaId) {
        this.id = id;
        this.ordem = ordem;
        this.audio = audio;
        this.status = status;
        this.dataCriacao = dataCriacao;
        this.usuarioId = usuarioId;
        this.historiaId = historiaId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public int getOrdem() {
        return ordem;
    }

    public void setOrdem(int ordem) {
        this.ordem = ordem;
    }

    public byte[] getAudio() {
        return audio;
    }

    public void setAudio(byte[] audio) {
        this.audio = audio;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public Integer getHistoriaId() {
        return historiaId;
    }

    public void setHistoriaId(Integer historiaId) {
        this.historiaId = historiaId;
    }
}

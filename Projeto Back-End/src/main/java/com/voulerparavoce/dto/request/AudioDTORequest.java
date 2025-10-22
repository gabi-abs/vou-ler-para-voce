package com.voulerparavoce.dto.request;

import java.io.File;
import java.time.LocalDateTime;

public class AudioDTORequest {

    private int ordem;

    private int status;

    private Integer usuarioId;

    private Integer historiaId;

    public AudioDTORequest() {
    }

    public AudioDTORequest(Integer historiaId, int ordem, int status, Integer usuarioId) {
        this.historiaId = historiaId;

        this.ordem = ordem;
        this.status = status;
        this.usuarioId = usuarioId;
    }

    public int getOrdem() {
        return ordem;
    }

    public void setOrdem(int ordem) {
        this.ordem = ordem;
    }

    public Integer getHistoriaId() {
        return historiaId;
    }

    public void setHistoriaId(Integer historiaId) {
        this.historiaId = historiaId;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}

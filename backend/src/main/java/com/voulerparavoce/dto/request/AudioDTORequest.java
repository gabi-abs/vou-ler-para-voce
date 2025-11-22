package com.voulerparavoce.dto.request;

import java.io.File;
import java.time.LocalDateTime;

public class AudioDTORequest {

    private int ordem;

    private Integer usuarioId;

    private Integer historiaId;

    public AudioDTORequest() {
    }

    public AudioDTORequest(Integer historiaId, int ordem) {
        this.historiaId = historiaId;
        this.ordem = ordem;
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

}

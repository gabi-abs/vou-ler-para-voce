package com.voulerparavoce.dto.request;

import java.time.LocalDateTime;

public class FavoritoDTORequest {

    private Integer usuarioId;

    private Integer historiaId;


    public FavoritoDTORequest() {}


    public FavoritoDTORequest(Integer usuarioId, Integer historiaId) {
        this.usuarioId = usuarioId;
        this.historiaId = historiaId;
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

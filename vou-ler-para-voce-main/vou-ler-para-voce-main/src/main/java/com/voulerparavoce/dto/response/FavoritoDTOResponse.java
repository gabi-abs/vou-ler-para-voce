package com.voulerparavoce.dto.response;

import java.time.LocalDateTime;
import java.util.List;

public class FavoritoDTOResponse {

    private Integer id;

    private LocalDateTime dataCriacao;

    private Integer usuarioId;

    private Integer historiaId;

    private String  historiaTitulo;

    private byte[] historiaCapa;


    public FavoritoDTOResponse() {}

    public FavoritoDTOResponse(Integer id, LocalDateTime dataCriacao, Integer usuarioId, Integer historiaId, String historiaTitulo, byte[] historiaCapa) {
        this.id = id;
        this.dataCriacao = dataCriacao;
        this.usuarioId = usuarioId;
        this.historiaId = historiaId;
        this.historiaTitulo = historiaTitulo;
        this.historiaCapa = historiaCapa;
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
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

    public String getHistoriaTitulo() {
        return historiaTitulo;
    }

    public void setHistoriaTitulo(String historiaTitulo) {
        this.historiaTitulo = historiaTitulo;
    }

    public byte[] getHistoriaCapa() {
        return historiaCapa;
    }

    public void setHistoriaCapa(byte[] historiaCapa) {
        this.historiaCapa = historiaCapa;
    }
}

package com.voulerparavoce.dto.request;

import java.util.List;

public class HistoriaDTORequest {

    private String titulo;

    private byte[] capa;

    private int status;

    private String texto;

    private Integer usuarioId;

    private List<Integer> trilhaSonoraId;


    public HistoriaDTORequest() {}


    public HistoriaDTORequest(String titulo, byte[] capa, int status, String texto, Integer usuarioId, List<Integer> trilhaSonoraId) {
        this.titulo = titulo;
        this.capa = capa;
        this.status = status;
        this.texto = texto;
        this.usuarioId = usuarioId;
        this.trilhaSonoraId = trilhaSonoraId;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public byte[] getCapa() {
        return capa;
    }

    public void setCapa(byte[] capa) {
        this.capa = capa;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public List<Integer> getTrilhaSonoraId() {
        return trilhaSonoraId;
    }

    public void setTrilhaSonoraId(List<Integer> trilhaSonoraId) {
        this.trilhaSonoraId = trilhaSonoraId;
    }

}

package com.voulerparavoce.dto.request;

import java.util.List;

public class HistoriaDTORequest {

    private String titulo;

    private String capaurl;

    private int status;

    private String texto;

    private Integer usuarioId;

    private List<Integer> trilhaSonoraId;


    public HistoriaDTORequest() {}


    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getCapaurl() {
        return capaurl;
    }

    public void setCapaurl(String capaurl) {
        this.capaurl = capaurl;
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

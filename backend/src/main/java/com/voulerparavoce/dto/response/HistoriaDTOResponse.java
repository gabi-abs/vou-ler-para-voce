package com.voulerparavoce.dto.response;

import java.io.File;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.List;

public class HistoriaDTOResponse {

    private Integer id;

    private String titulo;

    private byte[] capa;

    private LocalDateTime dataCriacao;

    private int status;

    private String texto;


    private Integer usuarioId;
    private List<AudioDTOResponse> audios;
    private List<Integer> trilhaSonoraId;





    public HistoriaDTOResponse() {}


    public HistoriaDTOResponse(Integer id, String titulo, byte[] capa, LocalDateTime dataCriacao, int status, String texto, Integer usuarioId, List<AudioDTOResponse> audios, List<Integer> trilhaSonoraId) {
        this.id = id;
        this.titulo = titulo;
        this.capa = capa;
        this.dataCriacao = dataCriacao;
        this.status = status;
        this.texto = texto;
        this.usuarioId = usuarioId;
        this.audios = audios;
        this.trilhaSonoraId = trilhaSonoraId;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(Integer usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getCapa() {
        return new String(capa, StandardCharsets.UTF_8);
    }

    public void setCapa(byte[] capa) {
        this.capa = capa;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
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

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public List<AudioDTOResponse> getAudios() {
        return audios;
    }

    public void setAudios(List<AudioDTOResponse> audios) {
        this.audios = audios;
    }

    public List<Integer> getTrilhaSonoraId() {
        return trilhaSonoraId;
    }

    public void setTrilhaSonoraId(List<Integer> trilhaSonoraId) {
        this.trilhaSonoraId = trilhaSonoraId;
    }
}

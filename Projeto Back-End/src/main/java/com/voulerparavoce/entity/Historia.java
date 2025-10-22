package com.voulerparavoce.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.FilterJoinTable;
import org.springframework.data.jpa.repository.Query;

import java.io.File;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="historia")
public class Historia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="historia_id")
    private Integer id;

    @Column(name="historia_titulo")
    private String titulo;

    @Lob
    @Column(name="historia_capa")
    private byte[] capa;

    @Column(name="historia_status")
    private int status;

    @Lob
    @Column(name="historia_texto", columnDefinition = "TEXT")
    private String texto;

    @Column(name="historia_data_criacao")
    private LocalDateTime dataCriacao;

    @ManyToOne(fetch = FetchType.LAZY)
    @JsonIgnore
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @OneToMany(mappedBy = "historia")
    private Set<Audio> audios;

    @OneToMany(mappedBy = "historia", fetch = FetchType.LAZY)
    private Set<Favorito> favoritos;

    @ManyToMany
    @JoinTable(
            name = "historia_trilha_sonora",
            joinColumns = @JoinColumn(name = "historia_id"),
            inverseJoinColumns = @JoinColumn(name = "trilha_sonora_id")
    )
    private Set<TrilhaSonora> trilhasSonoras = new HashSet<>();



    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Usuario getUsuario() {
        return usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Set<Audio> getAudios() {
        return audios;
    }

    public void setAudios(Set<Audio> audios) {
        this.audios = audios;
    }

    public Set<Favorito> getFavoritos() {
        return favoritos;
    }

    public void setFavoritos(Set<Favorito> favoritos) {
        this.favoritos = favoritos;
    }

    public Set<TrilhaSonora> getTrilhasSonoras() {
        return trilhasSonoras;
    }

    public void setTrilhasSonoras(Set<TrilhaSonora> trilhasSonoras) {
        this.trilhasSonoras = trilhasSonoras;
    }
}

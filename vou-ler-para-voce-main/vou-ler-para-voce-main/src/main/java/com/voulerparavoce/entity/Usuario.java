package com.voulerparavoce.entity;

import jakarta.persistence.*;
import org.hibernate.annotations.Filter;
import org.hibernate.annotations.FilterDef;
import org.hibernate.annotations.SQLRestriction;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;

@Entity
@Table(name="usuario")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="usuario_id")
    private  Integer id;

    @Column(name="usuario_nome")
    private String nome;

    @Column(name="usuario_email")
    private String email;

    @Column(name="usuario_senha")
    private String senha;

    @Column(name="usuario_data_criacao")
    private LocalDateTime dataCriacao;

    @Column(name="usuario_status")
    private int status;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private Set<Audio> audios;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private Set<Favorito> favoritos;

    @OneToMany(mappedBy = "usuario", fetch = FetchType.LAZY)
    private Set<Historia> historias;

    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(name="usuario_role",
            joinColumns = @JoinColumn(name = "usuario_id"),
            inverseJoinColumns = @JoinColumn(name="role_id"))
    private List<Role> roles;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
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

    public Set<Historia> getHistorias() {
        return historias;
    }

    public void setHistorias(Set<Historia> historias) {
        this.historias = historias;
    }

    public List<Role> getRoles() {
        return roles;
    }

    public void setRoles(List<Role> roles) {
        this.roles = roles;
    }
}

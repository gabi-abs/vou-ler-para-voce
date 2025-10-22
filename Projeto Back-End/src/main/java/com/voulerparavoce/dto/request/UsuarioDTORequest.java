package com.voulerparavoce.dto.request;

import com.voulerparavoce.entity.RoleName;

public class UsuarioDTORequest {

    private String nome;

    private String email;

    private String senha;

    private RoleName role;

    public UsuarioDTORequest(String nome, String email, String senha, RoleName role) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
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

    public RoleName getRole() {
        return role;
    }

    public void setRole(RoleName role) {
        this.role = role;
    }
}


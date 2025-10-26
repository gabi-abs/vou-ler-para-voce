package com.voulerparavoce.entity;

import jakarta.persistence.*;

import java.io.File;
import java.util.HashSet;
import java.util.Set;

@Entity
@Table(name="trilha_sonora")
public class TrilhaSonora {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="trilha_sonora_id")
    private Integer id;

    @Column(name="trilha_sonora_nome")
    private String nome;

    @Lob
    @Column(name="trilha_sonora_audio")
    private byte[] audio;

    @ManyToMany(mappedBy = "trilhasSonoras")
    private Set<Historia> historias = new HashSet<>();



    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public byte [] getAudio() {
        return audio;
    }

    public void setAudio(byte [] audio) {
        this.audio = audio;
    }

    public Set<Historia> getHistorias() {
        return historias;
    }

    public void setHistorias(Set<Historia> historias) {
        this.historias = historias;
    }
}



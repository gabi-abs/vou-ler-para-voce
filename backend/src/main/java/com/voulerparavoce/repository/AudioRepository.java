package com.voulerparavoce.repository;

import com.voulerparavoce.entity.Audio;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

public interface AudioRepository extends JpaRepository<Audio, Integer> {

    @Modifying
    @Transactional
    @Query("UPDATE Audio a SET a.status = 0 WHERE a.id = :id")
    void apagarAudio(Integer id);

}

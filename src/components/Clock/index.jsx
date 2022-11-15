import React from "react";
import styles from "./Clock.module.scss"

export default function Clock(){

    let now = new Date()

    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const daysWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    const day = now.getDate()
    const month = now.getMonth()
    const year = now.getFullYear()
    const dayWeek = now.getDay()
    const hour = now.getHours()
    const min = now.getMinutes()
    
    return (
        <section className={styles.clock__container}>
            <p className={styles.clock__greeting}>Mensagem: Boa tarde!</p>
            <p className={styles.clock__time}>{hour}:{min}</p>
            <p className={styles.clock__date}>{daysWeek[dayWeek]}, {day} de {months[month]} de {year}</p>
            <p className={styles.clock__location}>Cidade, Pais</p>

        </section>
    )
}
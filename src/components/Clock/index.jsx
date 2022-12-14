import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss"
import backgroundDay from "assets/images/day-medium.jpg"
import backgroundNight from "assets/images/night-medium.jpg"
import { MdDarkMode, MdWbSunny } from "react-icons/md";
import { IoIosArrowDropdownCircle, IoIosArrowDropupCircle } from "react-icons/io"

export default function Clock() {

    const months = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro']
    const daysWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

    let now = new Date()

    const [time, setTime] = useState(() => { return now.toLocaleTimeString() })
    const [location, setLocation] = useState(() => { return { city: "procurando localização", countryCode: "", timezone: "local desconhecido" } })
    const [currentDate, setcurrentDate] = useState(() => {
        return {
            day: now.getDate(),
            month: now.getMonth(),
            year: now.getFullYear(),
            dayWeek: now.getDay()
        }
    })
    const [showInformation, setshowInformation] = useState(() => { return false })

    useEffect(() => {
        const api = async () => {
            const response = await fetch('http://ip-api.com/json/?fields=status,countryCode,regionName,city,timezone,query')
            const data = await response.json()
            if (data.status === 'success') {
                setLocation({
                    city: data.city,
                    countryCode: data.countryCode,
                    timezone: data.timezone
                })
            } else {
                setLocation({
                    city: "local desconhecido",
                    countryCode: "",
                    timezone: "local desconhecido"
                })
            }
        }
        api()
    }, [])

    function updateTime() {
        now = new Date()
        setTime(now.toLocaleTimeString())

        if (now.getDate() !== currentDate.day || now.getMonth() !== currentDate.month) {
            setcurrentDate({
                day: now.getDate(),
                month: now.getMonth(),
                year: now.getFullYear(),
                dayWeek: now.getDay()
            })
        }
    }

    function greetingMessage(hour) {
        let message = ''

        if (hour > 0 && hour < 12) {
            message = <> <MdWbSunny /> Bom dia! </>
        } else if (hour < 18) {
            message = <> <MdWbSunny /> Boa tarde! </>
        } else {
            message = <> <MdDarkMode /> Boa noite! </>
        }

        return message
    }

    function changeInformation() {
        setshowInformation(!showInformation)
    }

    function classInformation() {
        if (showInformation) {

            if (time.slice(0, 2) < 18) {
                return `${styles.information} ${styles.day}`
            } else {
                return `${styles.information} ${styles.night}`
            }
        } else {
            return `${styles.information} ${styles.invisible}`
        }
    }

    setInterval(updateTime, 1000)

    return (
        <>
            <section
                className={styles.clock}
                style={{ backgroundImage: time.slice(0, 2) < 18 ? `url(${backgroundDay})` : `url(${backgroundNight})` }}
            >
                <div className={styles.clock__container}>
                    <p className={styles.clock__greeting}>
                        {greetingMessage(time.slice(0, 2))}
                    </p>
                    <p className={styles.clock__time}>{time}</p>
                    <p className={styles.clock__location}>
                        em {location.city}, {location.countryCode}
                    </p>
                    <button className={styles.clock__btn} onClick={changeInformation}>
                        {showInformation ? <> Ocultar <IoIosArrowDropupCircle size={32} /></> : <> Exibir <IoIosArrowDropdownCircle size={32} /></>}
                    </button>
                </div>
                <article className={classInformation()}>
                    <div className={styles.information__container}>
                        <p className={styles.information__text}>Fuso horário: <span>{location.timezone}</span></p>
                        <p className={styles.information__text}>Dia da semana: <span>{daysWeek[currentDate.dayWeek]}</span></p>
                        <p className={styles.information__text}>Data: <span>{currentDate.day} de {months[currentDate.month]} de {currentDate.year}</span></p>
                    </div>
                </article>
            </section>

        </>
    )
}
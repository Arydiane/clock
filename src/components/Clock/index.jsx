import React, { useEffect, useState } from "react";
import styles from "./Clock.module.scss"
import backgroundDay from "assets/images/day-medium.jpg"
import backgroundNight from "assets/images/night-medium.jpg"
import { MdDarkMode, MdWbSunny } from "react-icons/md";

export default function Clock() {

    let now = new Date()
    const [time, setTime] = useState(() => { return now.toLocaleTimeString() })
    const [location, setLocation] = useState(() => { return { city: "procurando localização", countryCode: "" } })



    function updateTime() {
        now = new Date()
        setTime(now.toLocaleTimeString())
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

    setInterval(updateTime, 1000)

    return (
        <section
            className={styles.clock}
            style={{ backgroundImage: time.slice(0, 2) < 18 ? `url(${backgroundDay})` : `url(${backgroundNight})` }}
        >
            <div className={styles.clock__container}>
                <p className={styles.clock__greeting}>
                    {greetingMessage(time.slice(0, 2))}
                </p>
                <p className={styles.clock__time}>{time}</p>
                <p className={styles.clock__location}> em {location.city}, {location.countryCode}</p>
            </div>
        </section>
    )
}
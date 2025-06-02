/**
 * pH Sensor Functions for analog pH Meter (E-201C-Blue)
 */

//% color="#33A1C9" icon="\uf043" weight=90
namespace phSensor {

    let offset = 41.02740741
    let k = -19.18518519
    let samples = 20
    let voltageRef = 3.3

    /**
     * Konfiguriere den pH-Sensor (Anzahl Samples und Systemspannung)
     */
    //% block="Konfiguriere pH-Sensor: | Samples %n | Spannung %v"
    //% n.min=1 n.max=100
    //% n.defl=20 v.defl=3.3
    //% weight=30
    export function configureSensor(n: number, v: number): void {
        samples = Math.max(1, n)
        voltageRef = v
    }

    /**
     * Kalibriere den Sensor mit zwei Referenzpunkten
     * @param ph1 Erster pH-Wert 1
     * @param v1 Gemessene Spannung 1
     * @param ph2 Zweiter pH-Wert 2
     * @param v2 Gemessene Spannung 2
     */
    //% block="Kalibriere Sensor:|pH1 %ph1|Spannung1 %v1|pH2 %ph2|Spannung2 %v2"
    //% ph1.defl=4 v1.defl=1.93 ph2.defl=9.18 v2.defl=1.66
    //% weight=10
    export function calibrate(ph1: number, v1: number, ph2: number, v2: number): void {
        if (v1 == v2) return // Division durch 0 vermeiden

        k = (ph2 - ph1) / (v2 - v1)
        offset = ((ph2 + ph1) - k * (v1 + v2)) / 2
    }

    /**
     * Lese pH-Wert von analogem Pin
     */
    //% block="Lese pH-Wert von %pin"
    //% pin.defl=AnalogPin.C16
    //% weight=40
    export function readPh(pin: AnalogPin): number {
        let values: number[] = []
        for (let i = 0; i < samples; i++) {
            values.push(pins.analogReadPin(pin))
            basic.pause(10)
        }

        let avg = averageFiltered(values)
        let voltage = avg * voltageRef / 1023.0
        return k * voltage + offset
    }

    /**
     * Lese die aktuelle Spannung am angegebenen analogen Pin
     */
    //% block="Lese Spannung von %pin"
    //% pin.defl=AnalogPin.C16
    //% weight=20
    export function readVoltage(pin: AnalogPin): number {
        let total = 0
        for (let i = 0; i < samples; i++) {
            total += pins.analogReadPin(pin)
            basic.pause(5)
        }
        let avg = total / samples
        return avg * voltageRef / 1023.0
    }

    // intern: Durchschnitt ohne Ausreißer
    function averageFiltered(values: number[]): number {
        if (values.length < 3) return average(values)

        let min = values[0]
        let max = values[0]
        for (let val of values) {
            if (val < min) min = val
            if (val > max) max = val
        }

        let sum = 0
        let count = 0
        for (let val of values) {
            if (val != min && val != max) {
                sum += val
                count++
            }
        }

        return count > 0 ? sum / count : average(values)
    }

    function average(values: number[]): number {
        let sum = 0
        for (let val of values) sum += val
        return values.length > 0 ? sum / values.length : 0
    }
}

/**
 * pH Sensor Functions for analog pH Meter (z. B. SEN0161)
 */
//% color="#33A1C9" icon="\uf043" weight=90
namespace phSensor {

    let offset = 41.03
    let samples = 20

    /**
     * Setzt die Anzahl der Messungen für die Mittelwertbildung.
     */
    //% block="Setze Anzahl der pH-Messungen auf %n"
    //% n.min=1 n.max=100
    export function setSamples(n: number): void {
        samples = Math.max(1, n)
    }

    /**
     * Liest den pH-Wert über den angegebenen analogen Pin.
     */
    //% block="Lese pH-Wert von %pin"
    //% pin.defl=AnalogPin.C16
    export function readPh(pin: AnalogPin): number {
        let values: number[] = []
        for (let i = 0; i < samples; i++) {
            values.push(pins.analogReadPin(pin))
            basic.pause(10)
        }

        let avg = averageFiltered(values)
        let voltage = avg * 3.3 / 1023.0
        return -19.18518519 * voltage + offset
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

    // intern: Standard-Durchschnitt
    function average(values: number[]): number {
        let sum = 0
        for (let val of values) sum += val
        return values.length > 0 ? sum / values.length : 0
    }
}

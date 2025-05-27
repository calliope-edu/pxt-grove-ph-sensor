// Hier kann man Tests durchführen; diese Datei wird nicht kompiliert, wenn dieses Paket als Erweiterung verwendet wird.
// Der Sensor kann kalibriert werden:
let ph1 = 0
let v1 = 0
let ph2 = 0
let v2 = 0
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    ph1 = phSensor.readPh(AnalogPin.C16)
    v1 = phSensor.readVoltage(AnalogPin.C16)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    phSensor.calibrate(
        ph1,
        v1,
        ph2,
        v2
    )
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    ph2 = phSensor.readPh(AnalogPin.C16)
    v2 = phSensor.readVoltage(AnalogPin.C16)
})

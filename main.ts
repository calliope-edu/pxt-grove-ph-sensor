phSensor.setSamples(10)
basic.forever(function () {
    basic.showNumber(phSensor.readPh(AnalogPin.C16))
    serial.writeLine("" + (phSensor.readPh(AnalogPin.C16)))
    basic.pause(1000)
})

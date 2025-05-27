basic.forever(function () {
    serial.writeLine("" + (phSensor.readPh(AnalogPin.C16)))
})

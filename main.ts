phSensor.configureSensor(10, VoltageSystem.V33)
phSensor.calibrate(
4,
1.93,
9.18,
1.66
)
basic.forever(function () {
    serial.writeLine("" + (phSensor.readPh(AnalogPin.C16)))
})

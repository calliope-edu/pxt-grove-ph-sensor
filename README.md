
> Diese Seite bei [https://jasperp92.github.io/pxt-grove-ph-sensor/](https://jasperp92.github.io/pxt-grove-ph-sensor/) öffnen

Dies ist eine MakeCode-Erweiterung für den [Grove PH-Sensor](https://wiki.seeedstudio.com/Grove-PH-Sensor-kit/) für den Calliope mini. 

## Messung

Der Sensor kann an einen beliebigen analogen Pin angeschlossen werden. Für den Calliope mini an den rechten Grove-Adapter A1 (C16/RX). 
Der Sensor gibt PH-Werte im Bereich 0 - 14 zurück. Trinkwasser liegt im Bereich zwischen 6,5 und 9,5.

```blocks
basic.forever(function () {
    basic.showNumber(phSensor.readPh(AnalogPin.C16))
    serial.writeLine("" + (phSensor.readPh(AnalogPin.C16)))
})
```

## Konfiguration des Sensors

Die Samples ist die Anzahl der Messwerte um daraus einen Mittelwert zu ermitteln 
Der Sensor wird mit 3,3 Volt standardmäßig betrieben, kann aber auch für 5V Microcontroller konfiguriert werden:

```blocks
phSensor.configureSensor(20, VoltageSystem.V50)
```

## Kalibrierung des Sensors

Damit der Sensor verlässlich funktioniert muss dieser zuvor mit zwei Referenzflüssigkeiten mit bekanntem PH-Wert kalibriert werden. Daraus wird der Spannungswerte entnommen werden um den Sensor um daraus den K-Wert, sowie das Offset zu ermitteln:

$k= (PH2-PH1)/(V2-V1)$

$Offset=[(PH2+PH1)-k*(V1+V2)]/2$


```blocks
let spannung1 = 0
let spannung2 = 0
input.onButtonEvent(Button.A, input.buttonEventClick(), function () {
    spannung1 = phSensor.readVoltage(AnalogPin.C16)
})
input.onButtonEvent(Button.AB, input.buttonEventClick(), function () {
    phSensor.calibrate(
    4,
    spannung1,
    9,
    spannung2
    )
})
input.onButtonEvent(Button.B, input.buttonEventClick(), function () {
    spannung2 = phSensor.readVoltage(AnalogPin.C16)
})
```


Weitere Informationen finden sich in dem [Wiki von Seeed Studio](https://wiki.seeedstudio.com/Grove-PH-Sensor-kit/)



## Als Erweiterung verwenden

Dieses Repository kann als **Erweiterung** in MakeCode hinzugefügt werden.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Neues Projekt**
* klicke auf **Erweiterungen** unter dem Zahnrad-Menü
* nach **https://github.com/jasperp92/pxt-grove-ph-sensor** suchen und importieren

## Dieses Projekt bearbeiten

Um dieses Repository in MakeCode zu bearbeiten.

* öffne [https://makecode.calliope.cc/](https://makecode.calliope.cc/)
* klicke auf **Importieren** und dann auf **Importiere URL**
* füge **https://github.com/jasperp92/pxt-grove-ph-sensor** ein und klicke auf Importieren

#### Metadaten (verwendet für Suche, Rendering)

* for PXT/calliopemini
<script src="https://makecode.com/gh-pages-embed.js"></script><script>makeCodeRender("{{ site.makecode.home_url }}", "{{ site.github.owner_name }}/{{ site.github.repository_name }}");</script>

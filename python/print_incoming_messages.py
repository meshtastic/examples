import time
from pubsub import pub
import meshtastic.serial_interface

interface = meshtastic.serial_interface.SerialInterface()

def onReceive(packet, interface):
    if 'decoded' in packet:
        message = packet['decoded']['payload'].decode('utf-8')
        print(message)

pub.subscribe(onReceive, 'meshtastic.receive.text')

while True:
    time.sleep(1)
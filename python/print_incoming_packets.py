import time
from pubsub import pub

import meshtastic.serial_interface
interface = meshtastic.serial_interface.SerialInterface()

def onReceive(packet, interface):
    print(f"{packet} \n\n")

pub.subscribe(onReceive, 'meshtastic.receive')

while True:
    time.sleep(1)
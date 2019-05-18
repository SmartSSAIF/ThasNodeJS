import asyncio
import websockets
import time
import threading
from threading import Thread
server = "ws://192.168.0.111:5010"


loop = asyncio.new_event_loop()


def startaWS(loop):
    asyncio.set_event_loop(loop)
    loop.run_until_complete(web())

async def web():
        async with websockets.connect(server) as ws:
            while True:
                await ws.send("Testando servidor")
                time.sleep(1)
        print("acabou asyncio")

t = Thread(target = startaWS, args=(loop,))
t.start()

print("Criou thread Encoder")


while True: 
    print("Thread Principal viva dentro do While")
    time.sleep(5)

import zerorpc

c = zerorpc.Client()
c.connect("tcp://127.0.0.1:5005")
print (c.pedido(['peteca1','peteca11']))
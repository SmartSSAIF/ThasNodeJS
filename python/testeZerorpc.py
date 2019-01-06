# import zerorpc

# c = zerorpc.Client()
# c.connect("tcp://127.0.0.1:5005")
# print (c.pedido(['peteca1','peteca11']))
import mysql.connector
mydb = mysql.connector.connect(
  host="18.228.197.162",
  user="root",
  passwd="petequinha",
  database="thas"
)
mycursor = mydb.cursor()
mycursor.execute("SELECT * FROM lugares")

myresult = mycursor.fetchall()

for x in myresult:
  print(x)
print(mydb)
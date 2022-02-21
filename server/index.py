from flask import Flask, request
from flask_cors import CORS
from dotenv import load_dotenv

import os
import psycopg2
import redis
import simplejson as json

load_dotenv()

DB = os.getenv('DB')
DB_HOST = os.getenv('DB_HOST')
DB_USER = os.getenv('DB_USER')
DB_PASS = os.getenv('DB_PASS')

REDIS_HOST = os.getenv('REDIS_HOST')
REDIS_PORT = os.getenv('REDIS_PORT')

app = Flask(__name__)
CORS(app)

try:
  conn = psycopg2.connect(
    database=DB,
    host=DB_HOST,
    user=DB_USER,
    password=DB_PASS
  )

  curr = conn.cursor()
except:
  print('Error connecting to PostgreSQL DB')

# unfortunatelly, the connection never managed to establish a connection
# to redis running in Docker - after spending way too much time trying to figure it out
# had to pass
try:
  redis_client = redis.Redis(host=REDIS_HOST, port=REDIS_PORT)
except:
  print('Error connecting to Redis')

try:
  # GET /doors - to retrive all doors info available
  @app.route('/doors')
  def get_all_doors():

    curr.execute('''
      SELECT 
        doors.id,
        doors.sensor_uuid,
        doors.name,
        ad.street,
        ad.postal_code,
        ad.city,
        ad.state,
        ad.country_code,
        ad.geolocation
      FROM doors
      INNER JOIN addresses ad 
      ON doors.address_id = ad.id;
    ''')
    columns = (
      'id', 'sensor_uuid', 'name', 'street', 'postal_code', 'city', 'state', 'country_code', 'geolocation'
    )

    results = []
    for row in curr.fetchall():
      print(row[1])
      print(redis_client.ping())
      last_communication = redis_client.get('last_communication_ts:' + row[1])
      print(last_communication)
      results.append(dict(zip(columns, row)))
    
    return json.dumps(results, indent=2)
except:
  print('Error retrieving doors info')

try:
  # GET /doors/:door_id/permitted - retrieves all premitted user for the door 
  @app.route('/doors/<int:door_id>/permitted')
  def get_one_door(door_id=None):
    curr.execute(f'''
      SELECT 
        users.id,
        users.first_name,
        users.last_name,
        users.email
      FROM users 
      JOIN user_door_permissions udp
      ON users.id = udp.user_id
      WHERE udp.door_id = {door_id}
    ''')
    columns = (
      'id', 'first_name', 'last_name', 'email'
    )
    
    results = []
    for row in curr.fetchall():
      results.append(dict(zip(columns, row)))

    return json.dumps(results, indent=2)
except:
  print('Error retrieving permitted users')

try:
  # GET /doors/door_id/prohibited - retrieves all prohibited users for the door
  @app.route('/doors/<int:door_id>/prohibited')
  def get_all_users(door_id=None):
    curr.execute(f'''
      SELECT 
        users.id,
        users.first_name,
        users.last_name,
        users.email
      FROM users 
      EXCEPT
      SELECT 
        users.id,
        users.first_name,
        users.last_name,
        users.email
      FROM users 
      JOIN user_door_permissions udp
      ON users.id = udp.user_id
      WHERE udp.door_id = {door_id}
    ''')
    columns = (
      'id', 'first_name', 'last_name', 'email'
    )
    
    results = []
    for row in curr.fetchall():
      results.append(dict(zip(columns, row)))

    return json.dumps(results, indent=2)
except:
  print('Error retrieving prohibited users')

try:
  # POST /doors/door_id - grant door access to the user
  ''' Expects a JSON object: 
    {
      user_id: <id of a user to grant access to
    }
  '''
  @app.route('/doors/<int:door_id>', methods=['POST'])
  def grant_access(door_id=None):

    data = request.get_json() 

    curr.execute(f'''
      INSERT INTO user_door_permissions (door_id, user_id)
      VALUES ({door_id}, {data['user_id']})
    ''')
    conn.commit()

    return data
except:
  print('Error granting access')

if __name__ == '__main__':
  app.run()
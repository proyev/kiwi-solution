## Set-up

Docker wasn't too friendly with me and refused to work with me in Redis part and when I tried to containerize everything, had to go the old-fashion way.

In case smth does not run properly, please drop me a msg, I'll try to do my best to find a solution.

## After thoughts

As I mentioned, Redis storage simply refused to connect when running on Docker. Tried to find the cause of the problem, and after a lot of time wasted without any solution, had to pass on this part.

But general thoughts on realization: upon retrieval of the door data from the db, use the sensor_uuid as a key to retrieve the last_communication_ts for the door, and cache the result, with TTL pre-set, so it can be easily be reached by repeated calls later on.


1. Run the set-up from task.md
2. /server:
    - `python3 -m venv ./server`
    - `. ./server/bin/activate`
    - `cd server`
    - `pip3 install -r requirements.txt`
    - `cd server` and run:
        - `export FLASK_APP=index.py`
        - `export FLASK_ENV=development`
        - `flask run`
    Now the server should be running
3. /client:
    - `cd client`
    - `npm install`
    - `npm start`
    Now the client should be running on localhost:3000


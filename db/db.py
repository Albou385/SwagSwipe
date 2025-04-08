import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os
# Load environment variables from .env file
load_dotenv()

# Database connection details
db_host = os.getenv('DB_HOST')
db_user = os.getenv('MYSQL_USER')
db_password = os.getenv('MYSQL_PASSWORD')
db_database = os.getenv('MYSQL_DATABASE')

def create_connection(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = mysql.connector.connect(
            host=host_name,
            user=user_name,
            passwd=user_password,
            database=db_name
        )
        print("Connection to MySQL DB successful")
    except Error as e:
        print(f"The error '{e}' occurred")
    return connection

def execute_query(connection, query):
    cursor = connection.cursor()
    try:
        cursor.execute(query)
        connection.commit()
        print(f"Query executed successfully: {query}")
    except Error as e:
        print(f"The error '{e}' occurred when executing: {query}")

def execute_script_from_file(connection, file_path):
    cursor = connection.cursor()
    with open(file_path, 'r') as file:
        script = file.read()

    statements = script.split(';')

    for statement in statements:
        if statement.strip():
            try:
                cursor.execute(statement)
                connection.commit()
                print(f"Statement executed successfully: {statement}")
            except Error as e:
                if e.errno == 1050:  # Error code for "Table already exists"
                    print(f"The error '{e}' occurred when executing statement: {statement} - Table already exists, continuing...")
                elif e.errno == 1061:  # Error code for "Duplicate key name"
                    print(f"The error '{e}' occurred when executing statement: {statement} - Duplicate key name, continuing...")
                elif e.errno == 1062:  # Error code for "Duplicate entry"
                    print(f"The error '{e}' occurred when executing statement: {statement} - Duplicate entry, continuing...")
                elif e.errno == 1146:  # Error code for "Table doesn't exist"
                    print(f"The error '{e}' occurred when executing statement: {statement} - Table doesn't exist, continuing...")
                else:
                    print(f"The error '{e}' occurred when executing statement: {statement}")
                    
def main():
    connection = create_connection(db_host, db_user, db_password, db_database)

    if connection:
        execute_script_from_file(connection, "1create.sql")
        execute_script_from_file(connection, "2contraines.sql")
        execute_script_from_file(connection, "3insert.sql")

        connection.close()

if __name__ == "__main__":
    main()
from flask import Flask, request, jsonify
from flask_cors import CORS
from database import get_db_connection, create_table

app = Flask(__name__)
CORS(app)

create_table()


@app.route("/")
def home():
    return "Employee Management Backend is running!"


# READ
@app.route("/employees", methods=["GET"])
def get_employees():
    connection = get_db_connection()
    employees = connection.execute(
        "SELECT * FROM employees"
    ).fetchall()
    connection.close()

    return jsonify([dict(employee) for employee in employees])


# CREATE
@app.route("/employees", methods=["POST"])
def add_employee():
    data = request.json

    connection = get_db_connection()

    connection.execute(
        "INSERT INTO employees (name, email, department) VALUES (?, ?, ?)",
        (data["name"], data["email"], data["department"])
    )

    connection.commit()
    connection.close()

    return jsonify({"message": "Employee added successfully"}), 201


# UPDATE
@app.route("/employees/<int:employee_id>", methods=["PUT"])
def update_employee(employee_id):
    data = request.json

    connection = get_db_connection()

    connection.execute(
        """
        UPDATE employees
        SET name = ?, email = ?, department = ?
        WHERE id = ?
        """,
        (
            data["name"],
            data["email"],
            data["department"],
            employee_id
        )
    )

    connection.commit()
    connection.close()

    return jsonify({"message": "Employee updated successfully"})


# DELETE
@app.route("/employees/<int:employee_id>", methods=["DELETE"])
def delete_employee(employee_id):
    connection = get_db_connection()

    connection.execute(
        "DELETE FROM employees WHERE id = ?",
        (employee_id,)
    )

    connection.commit()
    connection.close()

    return jsonify({"message": "Employee deleted successfully"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
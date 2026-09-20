const API_URL = "http://localhost:5000/employees";

const form = document.getElementById("employeeForm");

async function loadEmployees() {

    const response = await fetch(API_URL);
    const employees = await response.json();

    const table = document.getElementById("employeeTable");

    table.innerHTML = "";

    employees.forEach(employee => {

        table.innerHTML += `
            <tr>
                <td>${employee.id}</td>
                <td>${employee.name}</td>
                <td>${employee.email}</td>
                <td>${employee.department}</td>
                <td>
                    <button onclick="editEmployee(${employee.id}, '${employee.name}', '${employee.email}', '${employee.department}')">
                        Edit
                    </button>

                    <button onclick="deleteEmployee(${employee.id})">
                        Delete
                    </button>
                </td>
            </tr>
        `;
    });
}


form.addEventListener("submit", async function(event) {

    event.preventDefault();

    const id = document.getElementById("employeeId").value;

    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        department: document.getElementById("department").value
    };

    if (id) {

        await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });

    } else {

        await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(employee)
        });
    }

    form.reset();
    document.getElementById("employeeId").value = "";

    loadEmployees();
});


function editEmployee(id, name, email, department) {

    document.getElementById("employeeId").value = id;
    document.getElementById("name").value = name;
    document.getElementById("email").value = email;
    document.getElementById("department").value = department;
}


async function deleteEmployee(id) {

    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
    });

    loadEmployees();
}


loadEmployees();
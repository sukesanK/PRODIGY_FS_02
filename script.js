// Sample admin credentials
const adminUsername = "admin";
const adminPassword = "password123";

// Sample employee data storage
let employees = [];

// Authentication
document.getElementById("login-btn").onclick = () => {
  const username = document.getElementById("admin-username").value;
  const password = document.getElementById("admin-password").value;

  if (username === adminUsername && password === adminPassword) {
    document.getElementById("auth").style.display = "none";
    document.getElementById("employee-management").style.display = "block";
    displayEmployees();
  } else {
    document.getElementById("auth-error").textContent =
      "Invalid credentials. Please try again.";
  }
};

// Add or update employee
document.getElementById("employee-form").onsubmit = (e) => {
  e.preventDefault();

  const id = document.getElementById("employee-id").value;
  const name = document.getElementById("employee-name").value;
  const role = document.getElementById("employee-role").value;

  if (id) {
    // Update employee
    const index = employees.findIndex((emp) => emp.id === id);
    employees[index] = { id, name, role };
  } else {
    // Add new employee
    const newEmployee = {
      id: Date.now().toString(),
      name,
      role,
    };
    employees.push(newEmployee);
  }

  document.getElementById("employee-form").reset();
  displayEmployees();
};

// Display employee records
function displayEmployees() {
  const employeeList = document.getElementById("employee-list");
  employeeList.innerHTML = "";
  employees.forEach((emp) => {
    const li = document.createElement("li");
    li.textContent = `${emp.name} (${emp.role}) `;

    // Edit button
    const editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.onclick = () => editEmployee(emp.id);
    li.appendChild(editButton);

    // Delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => deleteEmployee(emp.id);
    li.appendChild(deleteButton);

    employeeList.appendChild(li);
  });
}

// Edit employee
function editEmployee(id) {
  const employee = employees.find((emp) => emp.id === id);
  document.getElementById("employee-id").value = employee.id;
  document.getElementById("employee-name").value = employee.name;
  document.getElementById("employee-role").value = employee.role;
}

// Delete employee
function deleteEmployee(id) {
  employees = employees.filter((emp) => emp.id !== id);
  displayEmployees();
}

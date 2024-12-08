import express from "express";
import fs from "fs";
import path from "path";
import bodyParser from "body-parser";

const app = express();
const PORT = 5000;

app.use(express.json());

// Middleware
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

// File paths
const userFilePath = path.normalize(path.join("users.json"));
const roleFilePath = path.normalize(path.join("roles.json"));
const permissionFilePath = path.normalize(path.join("permission.json"));

const readFile = (filePath) => {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    }
    return [];
  } catch (err) {
    console.error(`Error reading file ${filePath}: `, err);
    return [];
  }
};

const writeFile = (filePath, data) => {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error(`Error writing file ${filePath}: `, err);
  }
};

//=================================== User Management APIs =====================================
app.get("/users", (req, res) => {
  const users = readFile(userFilePath);
  res.json(users);
});

app.post("/users", (req, res) => {
  const users = readFile(userFilePath);
  const newUser = { id: users.length + 1, ...req.body };
  users.push(newUser);
  writeFile(userFilePath, users);
  res.status(201).json(newUser);
});

app.put("/users/:id", (req, res) => {
  const { id } = req.params;
  const users = readFile(userFilePath);
  const updatedUsers = users.map((user) =>
    user.id === parseInt(id) ? { ...user, ...req.body } : user
  );
  writeFile(userFilePath, updatedUsers);
  res.json(updatedUsers.find((user) => user.id === parseInt(id)));
});

app.delete("/users/:id", (req, res) => {
  const { id } = req.params;
  let users = readFile(userFilePath);
  users = users.filter((user) => user.id !== parseInt(id));
  writeFile(userFilePath, users);
  res.status(204).end();
});

//========================================== Role Management APIs ===================================
app.get("/roles", (req, res) => {
  const roles = readFile(roleFilePath);
  res.json(roles);
});

app.post("/roles", (req, res) => {
  const roles = readFile(roleFilePath);
  const newRole = { id: roles.length + 1, ...req.body };
  roles.push(newRole);
  writeFile(roleFilePath, roles);
  res.status(201).json(newRole);
});

app.put("/roles/:id", (req, res) => {
  const { id } = req.params;
  const roles = readFile(roleFilePath);
  const updatedRoles = roles.map((role) =>
    role.id === parseInt(id) ? { ...role, ...req.body } : role
  );
  writeFile(roleFilePath, updatedRoles);
  res.json(updatedRoles.find((role) => role.id === parseInt(id)));
});

app.delete("/roles/:id", (req, res) => {
  const { id } = req.params;
  let roles = readFile(roleFilePath);
  roles = roles.filter((role) => role.id !== parseInt(id));
  writeFile(roleFilePath, roles);
  res.status(204).end();
});

//========================================== Permission Management APIs ==================================
app.get("/permissions", (req, res) => {
  const permissions = readFile(permissionFilePath);
  res.json(permissions);
});

app.post("/permissions", (req, res) => {
  const permissions = readFile(permissionFilePath);
  const newPermission = { id: permissions.length + 1, ...req.body };
  permissions.push(newPermission);
  writeFile(permissionFilePath, permissions);
  res.status(201).json(newPermission);
});

app.put("/permissions/:id", (req, res) => {
  const { id } = req.params;
  const permissions = readFile(permissionFilePath);
  const updatedPermissions = permissions.map((perm) =>
    perm.id === parseInt(id) ? { ...perm, ...req.body } : perm
  );
  writeFile(permissionFilePath, updatedPermissions);
  res.json(updatedPermissions.find((perm) => perm.id === parseInt(id)));
});

app.delete("/permissions/:id", (req, res) => {
  const { id } = req.params;
  let permissions = readFile(permissionFilePath);
  permissions = permissions.filter((perm) => perm.id !== parseInt(id));
  writeFile(permissionFilePath, permissions);
  res.status(204).end();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});



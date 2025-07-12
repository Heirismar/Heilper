
-- INSERTS PARA LA BASE DE DATOS HEILPER

-- Tabla Usuario
INSERT INTO Usuario (correo, nombre, apellido, sangre, tlf, direccion) VALUES
('ana@mail.com', 'Ana', 'Pérez', 'O+', '04141234567', 'Calle 1, Ciudad'),
('luis@mail.com', 'Luis', 'Gómez', 'A+', '04141234568', 'Calle 2, Ciudad'),
('maria@mail.com', 'María', 'Ruiz', 'B+', '04141234569', 'Calle 3, Ciudad'),
('jose@mail.com', 'José', 'Fernández', 'AB-', '04141234570', 'Calle 4, Ciudad'),
('carmen@mail.com', 'Carmen', 'López', 'O-', '04141234571', 'Calle 5, Ciudad'),
('rafael@mail.com', 'Rafael', 'Torres', 'A-', '04141234572', 'Calle 6, Ciudad'),
('laura@mail.com', 'Laura', 'Morales', 'B-', '04141234573', 'Calle 7, Ciudad'),
('david@mail.com', 'David', 'Mendoza', 'O+', '04141234574', 'Calle 8, Ciudad'),
('sara@mail.com', 'Sara', 'Castro', 'A+', '04141234575', 'Calle 9, Ciudad'),
('miguel@mail.com', 'Miguel', 'Salas', 'O-', '04141234576', 'Calle 10, Ciudad');

-- Tabla Emergencias
INSERT INTO Emergencias (cod, nombre, tlf) VALUES
(1, 'Bomberos', '123'),
(2, 'Ambulancia', '911'),
(3, 'Policía', '112'),
(4, 'Defensa Civil', '8000001'),
(5, 'Salud Pública', '8000002'),
(6, 'Seguridad Local', '8000003'),
(7, 'Cruz Roja', '8000004'),
(8, 'Protección Civil', '8000005'),
(9, 'Hospital Central', '8000006'),
(10, 'Emergencias Médicas', '8000007');

-- Tabla Contacto
INSERT INTO Contacto (cod, nombre, apellido, tlf, usuario) VALUES
(1, 'Julia', 'Paz', '04140000001', 'ana@mail.com'),
(2, 'Carlos', 'Mejía', '04140000002', 'luis@mail.com'),
(3, 'Reina', 'Altuve', '04140000003', 'maria@mail.com'),
(4, 'Pedro', 'Navas', '04140000004', 'jose@mail.com'),
(5, 'Daniela', 'Ibarra', '04140000005', 'carmen@mail.com'),
(6, 'Luis', 'Fariñas', '04140000006', 'rafael@mail.com'),
(7, 'Fabiola', 'Duque', '04140000007', 'laura@mail.com'),
(8, 'Manuel', 'Aponte', '04140000008', 'david@mail.com'),
(9, 'Elena', 'Guerra', '04140000009', 'sara@mail.com'),
(10, 'Andrés', 'Martínez', '04140000010', 'miguel@mail.com');

-- Tabla Enfermedad
INSERT INTO Enfermedad (cod, nombre) VALUES
(1, 'Asma'),
(2, 'Diabetes'),
(3, 'Hipertensión'),
(4, 'Migraña'),
(5, 'Cancer de piel'),
(6, 'Gastritis'),
(7, 'Artritis'),
(8, 'Anemia'),
(9, 'Epilepsia'),
(10, 'Bronquitis');

-- Tabla Medicacion
INSERT INTO Medicacion (cod, nombre, descripcion) VALUES
(1, 'Paracetamol', 'Analgésico y antipirético'),
(2, 'Metformina', 'Controla la diabetes tipo 2'),
(3, 'Salbutamol', 'Broncodilatador para asma'),
(4, 'Loratadina', 'Antialérgico'),
(5, 'Ibuprofeno', 'Analgésico y antiinflamatorio'),
(6, 'Omeprazol', 'Protector gástrico'),
(7, 'Losartán', 'Tratamiento para hipertensión'),
(8, 'Insulina', 'Hormona para regular la glucosa'),
(9, 'Vitamina B12', 'Tratamiento para anemia'),
(10, 'Fenitoína', 'Antiepiléptico');

-- Tabla Tratamiento
INSERT INTO Tratamiento (cod, nombre, descripcion) VALUES
(1, 'Fisioterapia', 'Rehabilitación física'),
(2, 'Dieta especial', 'Plan alimenticio personalizado'),
(3, 'Psicoterapia', 'Terapia psicológica'),
(4, 'Oxigenoterapia', 'Suministro de oxígeno'),
(5, 'Reposo absoluto', 'Descanso prolongado'),
(6, 'Inyecciones periódicas', 'Tratamiento inyectable'),
(7, 'Suplementos vitamínicos', 'Refuerzo nutricional'),
(8, 'Hidroterapia', 'Tratamiento con agua'),
(9, 'Control de glucosa', 'Medición continua'),
(10, 'Terapia ocupacional', 'Rehabilitación funcional');

-- Tabla UsuarioEmergencias
INSERT INTO UsuarioEmergencias (cod, emergencias, usuario) VALUES
(1, 1, 'ana@mail.com'),
(2, 2, 'luis@mail.com'),
(3, 3, 'maria@mail.com'),
(4, 4, 'jose@mail.com'),
(5, 5, 'carmen@mail.com'),
(6, 6, 'rafael@mail.com'),
(7, 7, 'laura@mail.com'),
(8, 8, 'david@mail.com'),
(9, 9, 'sara@mail.com'),
(10, 10, 'miguel@mail.com');

-- Tabla UsuarioEnfermedad
INSERT INTO UsuarioEnfermedad (cod, enfermedad, usuario) VALUES
(1, 1, 'ana@mail.com'),
(2, 2, 'luis@mail.com'),
(3, 3, 'maria@mail.com'),
(4, 4, 'jose@mail.com'),
(5, 5, 'carmen@mail.com'),
(6, 6, 'rafael@mail.com'),
(7, 7, 'laura@mail.com'),
(8, 8, 'david@mail.com'),
(9, 9, 'sara@mail.com'),
(10, 10, 'miguel@mail.com');

-- Tabla UsuarioMedicacion
INSERT INTO UsuarioMedicacion (cod, medicacion, usuario) VALUES
(1, 1, 'ana@mail.com'),
(2, 2, 'luis@mail.com'),
(3, 3, 'maria@mail.com'),
(4, 4, 'jose@mail.com'),
(5, 5, 'carmen@mail.com'),
(6, 6, 'rafael@mail.com'),
(7, 7, 'laura@mail.com'),
(8, 8, 'david@mail.com'),
(9, 9, 'sara@mail.com'),
(10, 10, 'miguel@mail.com');

-- Tabla UsuarioTratamiento
INSERT INTO UsuarioTratamiento (cod, tratamiento, usuario, duracion) VALUES
(1, 1, 'ana@mail.com', '2 semanas'),
(2, 2, 'luis@mail.com', '1 mes'),
(3, 3, 'maria@mail.com', '15 días'),
(4, 4, 'jose@mail.com', '3 semanas'),
(5, 5, 'carmen@mail.com', '10 días'),
(6, 6, 'rafael@mail.com', '1 mes'),
(7, 7, 'laura@mail.com', '5 semanas'),
(8, 8, 'david@mail.com', '12 días'),
(9, 9, 'sara@mail.com', '3 meses'),
(10, 10, 'miguel@mail.com', '6 días');


CREATE TABLE Usuario(
correo varchar (100) NOT NULL, /*PK*/
nombre varchar(20) NOT NULL,
apellido varchar(20) NOT NULL,
sangre varchar (3) NOT NULL,
tlf varchar (14) NOT NULL,
direccion varchar(300) NOT NULL,
constraint PK_ID_Usuario primary key (correo)
);

CREATE TABLE Contacto(
cod int NOT NULL, /*PK*/
nombre varchar(20) NOT NULL,
apellido varchar(20) NOT NULL,
tlf varchar (14) NOT NULL,
usuario varchar (100) NOT NULL,
constraint PK_ID_Contacto primary key (cod),
constraint FK_Usuario_Contacto foreign key (usuario) references Usuario (correo)
);

CREATE TABLE Enfermedad(
cod int NOT NULL, /*PK*/
nombre varchar(30) NOT NULL,
constraint PK_ID_Enfermedad primary key (cod)
);

CREATE TABLE Medicacion(
cod int NOT NULL, /*PK*/
nombre varchar(40) NOT NULL,
descripcion varchar(300) NOT NULL,
constraint PK_ID_Medicacion primary key (cod)
);

CREATE TABLE Tratamiento(
cod int NOT NULL, /*PK*/
nombre varchar(40) NOT NULL,
descripcion varchar(300) NOT NULL,
constraint PK_ID_Tratamiento primary key (cod)
);

CREATE TABLE Emergencias(
cod int NOT NULL, /*PK*/
nombre varchar(20) NOT NULL,
tlf varchar (14) NOT NULL,
constraint PK_ID_Emergencias primary key (cod)
);

CREATE TABLE UsuarioEmergencias(
cod int NOT NULL, /*PK*/
emergencias int NOT NULL,
usuario varchar (100) NOT NULL,
constraint PK_ID_UsuarioEmergencias primary key (cod),
constraint FK_Emergencias_UEmer foreign key (emergencias) references Emergencias (cod),
constraint FK_Usuario_UEmer foreign key (usuario) references Usuario (correo)
);

CREATE TABLE UsuarioTratamiento(
cod int NOT NULL, /*PK*/
tratamiento int NOT NULL,
usuario varchar (100) NOT NULL,
duracion varchar (20) NOT NULL,
constraint PK_ID_UsuarioTratamiento primary key (cod),
constraint FK_Tratamiento_UT foreign key (tratamiento) references Tratamiento (cod),
constraint FK_Usuario_UT foreign key (usuario) references Usuario (correo)
);

CREATE TABLE UsuarioMedicacion(
cod int NOT NULL, /*PK*/
medicacion int NOT NULL,
usuario varchar (100) NOT NULL,
constraint PK_ID_UsuarioMedicacion primary key (cod),
constraint FK_Medicacion_UM foreign key (medicacion) references Medicacion (cod),
constraint FK_Usuario_UM foreign key (usuario) references Usuario (correo)
);

CREATE TABLE UsuarioEnfermedad(
cod int NOT NULL, /*PK*/
enfermedad int NOT NULL,
usuario varchar (100) NOT NULL,
constraint PK_ID_UsuarioEnfermedad primary key (cod),
constraint FK_Enfermedad_UEnf foreign key (enfermedad) references Enfermedad (cod),
constraint FK_Usuario_UEnf foreign key (usuario) references Usuario (correo)
);
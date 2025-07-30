-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 30-07-2025 a las 05:52:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `heilper`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `contacto`
--

CREATE TABLE `contacto` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `tlf` varchar(14) NOT NULL,
  `usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `contacto`
--

INSERT INTO `contacto` (`cod`, `nombre`, `apellido`, `tlf`, `usuario`) VALUES
(3, 'Reina', 'Altuve', '04140000003', 'maria@mail.com'),
(4, 'Pedro', 'Navas', '04140000004', 'jose@mail.com'),
(5, 'Daniela', 'Ibarra', '04140000005', 'carmen@mail.com'),
(6, 'Luis', 'Fariñas', '04140000006', 'rafael@mail.com'),
(7, 'Fabiola', 'Duque', '04140000007', 'laura@mail.com'),
(8, 'Manuel', 'Aponte', '04140000008', 'david@mail.com'),
(9, 'Elena', 'Guerra', '04140000009', 'sara@mail.com'),
(10, 'Andrés', 'Martínez', '04140000010', 'miguel@mail.com'),
(31, 'Ariadna', 'Avila', '04120001234', 'ana@mail.com'),
(33, 'María', 'García', '04120000001', 'ana@mail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `emergencias`
--

CREATE TABLE `emergencias` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `tlf` varchar(14) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `emergencias`
--

INSERT INTO `emergencias` (`cod`, `nombre`, `tlf`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedad`
--

CREATE TABLE `enfermedad` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `enfermedad`
--

INSERT INTO `enfermedad` (`cod`, `nombre`) VALUES
(5, 'Alergia'),
(8, 'Anemia'),
(7, 'Artritis'),
(1, 'Asma'),
(10, 'Bronquitis'),
(11, 'Cancer'),
(2, 'Diabetes'),
(9, 'Epilepsia'),
(6, 'Gastritis'),
(3, 'Hipertensión'),
(4, 'Migraña');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `medicacion`
--

CREATE TABLE `medicacion` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `medicacion`
--

INSERT INTO `medicacion` (`cod`, `nombre`, `descripcion`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tratamiento`
--

CREATE TABLE `tratamiento` (
  `cod` int(11) NOT NULL,
  `nombre` varchar(40) NOT NULL,
  `descripcion` varchar(300) NOT NULL DEFAULT 'La descripción pronto estará disponible'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tratamiento`
--

INSERT INTO `tratamiento` (`cod`, `nombre`, `descripcion`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `correo` varchar(100) NOT NULL,
  `nombre` varchar(20) NOT NULL,
  `apellido` varchar(20) NOT NULL,
  `sangre` varchar(3) NOT NULL,
  `tlf` varchar(14) NOT NULL,
  `direccion` varchar(300) NOT NULL,
  `password` varchar(20) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`correo`, `nombre`, `apellido`, `sangre`, `tlf`, `direccion`, `password`) VALUES
('ana@mail.com', 'Marta', 'Avila', 'O+', '04140000001', 'Calle 1, Ciudad', 'admin'),
('carmen@mail.com', 'Carmen', 'López', 'O-', '04141234571', 'Calle 5, Ciudad', 'admin'),
('david@mail.com', 'David', 'Mendoza', 'O+', '04141234574', 'Calle 8, Ciudad', 'admin'),
('jose@mail.com', 'José', 'Fernández', 'AB-', '04141234570', 'Calle 4, Ciudad', 'admin'),
('laura@mail.com', 'Laura', 'Morales', 'B-', '04141234573', 'Calle 7, Ciudad', 'admin'),
('luis@mail.com', 'Luis', 'Gómez', 'A+', '04141234568', 'Calle 2, Ciudad', 'admin'),
('maria@mail.com', 'María', 'Ruiz', 'B+', '04141234569', 'Calle 3, Ciudad', 'admin'),
('miguel@mail.com', 'Miguel', 'Salas', 'O-', '04141234576', 'Calle 10, Ciudad', 'admin'),
('rafael@mail.com', 'Rafael', 'Torres', 'A-', '04141234572', 'Calle 6, Ciudad', 'admin'),
('sara@mail.com', 'Sara', 'Castro', 'A+', '04141234575', 'Calle 9, Ciudad', 'admin');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioemergencias`
--

CREATE TABLE `usuarioemergencias` (
  `cod` int(11) NOT NULL,
  `emergencias` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarioemergencias`
--

INSERT INTO `usuarioemergencias` (`cod`, `emergencias`, `usuario`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarioenfermedad`
--

CREATE TABLE `usuarioenfermedad` (
  `cod` int(11) NOT NULL,
  `enfermedad` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarioenfermedad`
--

INSERT INTO `usuarioenfermedad` (`cod`, `enfermedad`, `usuario`) VALUES
(1, 1, 'ana@mail.com'),
(2, 2, 'ana@mail.com'),
(3, 3, 'maria@mail.com'),
(4, 4, 'jose@mail.com'),
(5, 5, 'carmen@mail.com'),
(6, 6, 'rafael@mail.com'),
(7, 7, 'laura@mail.com'),
(8, 8, 'david@mail.com'),
(9, 9, 'sara@mail.com'),
(10, 10, 'miguel@mail.com'),
(12, 2, 'jose@mail.com');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariomedicacion`
--

CREATE TABLE `usuariomedicacion` (
  `cod` int(11) NOT NULL,
  `medicacion` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariomedicacion`
--

INSERT INTO `usuariomedicacion` (`cod`, `medicacion`, `usuario`) VALUES
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuariotratamiento`
--

CREATE TABLE `usuariotratamiento` (
  `cod` int(11) NOT NULL,
  `tratamiento` int(11) NOT NULL,
  `usuario` varchar(100) NOT NULL,
  `duracion` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuariotratamiento`
--

INSERT INTO `usuariotratamiento` (`cod`, `tratamiento`, `usuario`, `duracion`) VALUES
(1, 1, 'ana@mail.com', '7 semanas'),
(2, 2, 'luis@mail.com', '1 mes'),
(3, 3, 'maria@mail.com', '15 días'),
(4, 4, 'jose@mail.com', '3 semanas'),
(5, 5, 'carmen@mail.com', '10 días'),
(6, 6, 'rafael@mail.com', '1 mes'),
(7, 7, 'laura@mail.com', '5 semanas'),
(8, 8, 'david@mail.com', '12 días'),
(9, 9, 'sara@mail.com', '3 meses'),
(10, 10, 'miguel@mail.com', '6 días'),
(14, 2, 'ana@mail.com', '3 semanas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `FK_Usuario_Contacto` (`usuario`);

--
-- Indices de la tabla `emergencias`
--
ALTER TABLE `emergencias`
  ADD PRIMARY KEY (`cod`);

--
-- Indices de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  ADD PRIMARY KEY (`cod`),
  ADD UNIQUE KEY `nombre` (`nombre`),
  ADD UNIQUE KEY `nombre_2` (`nombre`);

--
-- Indices de la tabla `medicacion`
--
ALTER TABLE `medicacion`
  ADD PRIMARY KEY (`cod`);

--
-- Indices de la tabla `tratamiento`
--
ALTER TABLE `tratamiento`
  ADD PRIMARY KEY (`cod`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`correo`);

--
-- Indices de la tabla `usuarioemergencias`
--
ALTER TABLE `usuarioemergencias`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `FK_Emergencias_UEmer` (`emergencias`),
  ADD KEY `FK_Usuario_UEmer` (`usuario`);

--
-- Indices de la tabla `usuarioenfermedad`
--
ALTER TABLE `usuarioenfermedad`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `FK_Enfermedad_UEnf` (`enfermedad`),
  ADD KEY `FK_Usuario_UEnf` (`usuario`);

--
-- Indices de la tabla `usuariomedicacion`
--
ALTER TABLE `usuariomedicacion`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `FK_Medicacion_UM` (`medicacion`),
  ADD KEY `FK_Usuario_UM` (`usuario`);

--
-- Indices de la tabla `usuariotratamiento`
--
ALTER TABLE `usuariotratamiento`
  ADD PRIMARY KEY (`cod`),
  ADD KEY `FK_Tratamiento_UT` (`tratamiento`),
  ADD KEY `FK_Usuario_UT` (`usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `contacto`
--
ALTER TABLE `contacto`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=34;

--
-- AUTO_INCREMENT de la tabla `emergencias`
--
ALTER TABLE `emergencias`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `enfermedad`
--
ALTER TABLE `enfermedad`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `medicacion`
--
ALTER TABLE `medicacion`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `tratamiento`
--
ALTER TABLE `tratamiento`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarioemergencias`
--
ALTER TABLE `usuarioemergencias`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuarioenfermedad`
--
ALTER TABLE `usuarioenfermedad`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuariomedicacion`
--
ALTER TABLE `usuariomedicacion`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuariotratamiento`
--
ALTER TABLE `usuariotratamiento`
  MODIFY `cod` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `contacto`
--
ALTER TABLE `contacto`
  ADD CONSTRAINT `FK_Usuario_Contacto` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`correo`);

--
-- Filtros para la tabla `usuarioemergencias`
--
ALTER TABLE `usuarioemergencias`
  ADD CONSTRAINT `FK_Emergencias_UEmer` FOREIGN KEY (`emergencias`) REFERENCES `emergencias` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Usuario_UEmer` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarioenfermedad`
--
ALTER TABLE `usuarioenfermedad`
  ADD CONSTRAINT `FK_Enfermedad_UEnf` FOREIGN KEY (`enfermedad`) REFERENCES `enfermedad` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Usuario_UEnf` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuariomedicacion`
--
ALTER TABLE `usuariomedicacion`
  ADD CONSTRAINT `FK_Medicacion_UM` FOREIGN KEY (`medicacion`) REFERENCES `medicacion` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Usuario_UM` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuariotratamiento`
--
ALTER TABLE `usuariotratamiento`
  ADD CONSTRAINT `FK_Tratamiento_UT` FOREIGN KEY (`tratamiento`) REFERENCES `tratamiento` (`cod`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_Usuario_UT` FOREIGN KEY (`usuario`) REFERENCES `usuario` (`correo`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

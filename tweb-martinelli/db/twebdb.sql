-- phpMyAdmin SQL Dump
-- version 4.6.5.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Gen 05, 2018 alle 12:50
-- Versione PHP: 7.1.5
-- Database client version: libmysql - 5.6.34

SET SQL_MODE = 'NO_AUTO_VALUE_ON_ZERO';
SET time_zone = '+00:00';

--
-- Database: twebdb
--

CREATE DATABASE IF NOT EXISTS twebdb DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE twebdb;

-- --------------------------------------------------------

--
-- Struttura della tabella user
--

DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(32) NOT NULL,
  password varchar(32) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL,
  mail varchar(50) NOT NULL,
  discount int(15) NOT NULL,
  PRIMARY KEY (ID)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dump dei dati per la tabella user
--

INSERT INTO user (username, password, name, surname, mail, discount) VALUES
('admin', '21232f297a57a5a743894a0e4a801fc3', 'Admin', 'Admin', 'admin@admin.com', 0),
('stefanomart', '84c48d8e8dae6241ec61766c0e44282e', 'Stefano', 'Martinelli', 'ste@gm.com', 0),
('giorgia.penna', 'giogio123', 'Giorgia', 'Penna', 'giopiro@gmail.com', 0),
('mvolpi', 'mvmvol', 'Marco', 'Volpi', 'mvolpi7@hotmail.com', 0),
('darioros', 'ross.dar123!', 'Dario', 'Rossi', 'dariorossi92@gmail.com', 0),
('andrea.care', 'andr3a_carrrr', 'Andrea', 'Carelli', 'andrecare@gmail.com', 0),
('mperri', 'mperri1234', 'Marco', 'Perri', 'm_perri@hotmail.com', 0),
('greta.nap', 'gr3t4n4pp1', 'Greta', 'Marchi', 'marchigreta@gmail.com', 0),
('marcocat', 'm4r23sfds', 'Marco', 'Cataldi', 'marccat@gmail.com', 0),
('fabio.neto', 'fab.net2', 'Fabio', 'Neto', 'fabne11@gmail.com', 0),
('elda.mila', 'rsddrgfsefbg', 'Elda', 'Milanesi', 'eldamilan@outlook.com', 0);


-- --------------------------------------------------------

--
-- Struttura della tabella product
--

DROP TABLE IF EXISTS product;
CREATE TABLE product (
  id int(8) NOT NULL AUTO_INCREMENT,
  name varchar(20) NOT NULL,
  quantity int(15) NOT NULL,
  brand varchar(15) NOT NULL,
  price float(10) NOT NULL,
  color varchar(20) NOT NULL,
  os varchar(30) NOT NULL,
  chipset varchar(100) NOT NULL,
  memory varchar(10) NOT NULL,
  ram varchar(10) NOT NULL,
  display varchar(30) NOT NULL,
  resolution varchar(30) NOT NULL,
  battery varchar(10) NOT NULL,
  primarycamera varchar(50) NOT NULL,
  secondarycamera varchar(50) NOT NULL,
  dimension varchar(30) NOT NULL,
  weight varchar(10) NOT NULL,
  wlan varchar(50) NOT NULL,
  gps varchar(50) NOT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE `product` ADD UNIQUE(`name`);

--
-- Dump dei dati per la tabella product
--

INSERT INTO product (name, quantity, brand, price, color, os, chipset, memory, ram, display, resolution,
battery, primarycamera, secondarycamera, dimension, weight, wlan, gps) VALUES
('iPhone X', 23, 'Apple', 899, 'Space Gray', 'iOS 11', 'Apple A11 Bionic Hexa-core 2.39 GHz (2x Monsoon + 4x Mistral)', '64GB', '3GB', '5.8 Super AMOLED', '1125 x 2436 pixels', '2716 mAh', 'Dual: 12 MP (f/1.8, 28mm) + 12 MP (f/2.4, 52mm)', '7 MP (f/2.2, 32mm)', '143.6 x 70.9 x 7.7 mm', '174 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, hotspot', 'A-GPS, GLONASS, GALILEO, QZSS'),
('Pixel 2 XL', 32, 'Google', 799, 'Just Black', 'Android 8.0 (Oreo)', 'Qualcomm MSM8998 Snapdragon 835 Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) + Adreno 540', '64GB', '4GB', '6 P-OLED', '1440 x 2880 pixels', '3520 mAh', '12.2 MP (f/1.8, 27mm)', '8 MP (f/2.4)', '157.9 x 76.7 x 7.9 mm', '175 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS, GALILEO'),
('Galaxy S9 Plus', 56, 'Samsung', 759, 'Nera', 'Android 8.0 (Oreo)', 'Exynos 9810 Octa-core (4x2.7 GHz Mongoose M3 & 4x1.8 GHz Cortex-A55) + Mali-G72 MP18', '128GB', '6GB', '6.2 Super AMOLED', '1440 x 2960 pixels', '3500 mAh', 'Dual: 12 MP (f/1.5-2.4) + 12MP (f/2.4), ', '8 MP (f/1.7)', '158.1 x 73.8 x 8.5 mm', '189 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS, GALILEO'),
('HTC U11', 32, 'HTC', 529, 'Nera', 'Android 7.1 (Nougat)', 'Qualcomm MSM8998 Snapdragon 835 Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) + Adreno 540', '64GB', '4GB', '5.5 Super LCD5', '1440 x 2560 pixels', '3000 mAh', '12 MP (f/1.7)', '16 MP (f/2.0)', '148.9 x 68.1 x 8 mm', '155 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot', 'A-GPS, GLONASS, BDS'),
('Honor 9', 0, 'Honor', 299, 'Blu', 'Android 7.0 (Nougat)', 'HiSilicon Kirin 960 Octa-core (4x2.4 GHz Cortex-A73 & 4x1.8 GHz Cortex-A53) + Mali-G71 MP8', '64GB', '4GB', '5.15 IPS LCD', '1080 x 1920 pixels', '3000 mAh', 'Dual: 12 MP (f/2.2, 27mm) + 20 MP (f/2.2, 27mm)', '8 MP (f/2.0)', '147.3 x 70.9 x 7.5 mm', '155 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot','A-GPS, GLONASS, BDS'),
('Xperia X Compact', 8, 'Sony', 319, 'Nera', 'Android 6.0.1 (Marshmallow)', 'Qualcomm MSM8956 Snapdragon 650 Hexa-core (4x1.4 GHz Cortex-A53 & 2x1.8 GHz Cortex-A72)', '32GB', '3GB', '4.6 IPS', '720 x 1280 pixels', '2700 mAh', '23 MP (f/2.0)', '5 MP (f/2.4)', '129 x 65 x 9.5 mm', '135 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot','A-GPS, GLONASS, BDS'),
('Galaxy Note 8', 32, 'Samsung', 719, 'Nera', 'Android 7.1.1 (Nougat)', 'Exynos 8895 Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) + Mali-G71', '64GB', '6GB', '6.3 Super AMOLED', '1440 x 2960 pixels', '3300 mAh', 'Dual: 12 MP (f/1.7) + 12 MP (f/1.9)', '8 MP (f/2.4)', '162.5 x 74.8 x 8.6 mm', '195 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot','A-GPS, GLONASS, BDS'),
('LG V30', 23, 'LG', 629, 'Blu', 'Android 7.1.2 (Nougat)', 'Qualcomm MSM8998 Snapdragon 835 Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) + Adreno 540', '64GB', '4GB', '6 P-OLED', '1440 x 2880 pixels', '3300 mAh', 'Dual: 16 MP (f/1.6) + 13 MP (f/1.9)', '5 MP (f/2.2)', '151.7 x 75.4 x 7.3 mm', '158 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, hotspot','A-GPS, GLONASS, BDS'),
('Essential Phone', 23, 'Essential', 449, 'Nera', 'Android 7.1 (Nougat)', 'Qualcomm MSM8998 Snapdragon 835 Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) + Adreno 540', '128GB', '4GB', '5.71 LTPS IPS', '1312 x 2560 pixels ', '3040 mAh', 'Dual: 13 MP (f/1.9)', '8 MP (f/2.2)', '141.5 x 71.1 x 7.8 mm', '185 g', 'Wi-Fi 802.11 b/g/n, Wi-Fi Direct, hotspot', 'A-GPS, GLONASS'),
('P8 Lite 2017', 27, 'Huawei', 149, 'Nera', 'Android 7.0 (Nougat)', 'HiSilicon Kirin 655 Octa-core (4x2.1 GHz Cortex-A53 & 4x1.7 GHz Cortex-A53)', '16GB', '3GB', '5.2 IPS', '1080 x 1920 pixels', '3000 mAh', '12 MP', '8 MP (f/2.0)', '147.2 x 72.9 x 7.6 mm', '147 g', 'Wi-Fi 802.11 b/g/n, Wi-Fi Direct, hotspot', 'A-GPS, GLONASS'),
('Mate 10 Pro', 23, 'Huawei', 659, 'Nera', 'Android 8.0 (Oreo)', 'Hisilicon Kirin 970 Octa-core (4x2.4 GHz Cortex-A73 & 4x1.8 GHz Cortex-A53)', '128GB', '6GB', '6.3 Super AMOLED', '1440 x 2960 pixels', '4000 mAh', 'Dual: 12 MP (f/1.6) + 20 MP (f/1.6)', '8 MP (f/2.0)', '154.2 x 74.5 x 7.9 mm', '178 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('iPhone 8 Plus', 11, 'Apple', 729, 'Rose Gold', 'iOS 11', 'Apple A11 Bionic Hexa-core 2.39 GHz (2x Monsoon + 4x Mistral)', '64GB', '3GB', '5.5 IPS', '1080 x 1920 pixels', '2691 mAh', 'Dual: 12 MP (f/1.8, 28mm) + 12 MP (f/2.4, 52mm)', '7 MP (f/2.2, 32mm)', '158.4 x 78.1 x 7.5 mm', '202 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, hotspot', 'A-GPS, GLONASS, GALILEO, QZSS'),
('Galaxy S8', 0, 'Samsung', 489, 'Nera', 'Android 7.0 (Nougat)', 'Exynos 8895 Octa-core (4x2.3 GHz & 4x1.7 GHz) + Mali-G71 MP20', '64GB', '4GB', '5.8 Super AMOLED', '1440 x 2960 pixels', '3000 mAh', '12 MP (f/1.7, 26mm)', '8 MP (f/1.7, 25mm)', '153.9 x 75.9 x 7.9 mm', '169 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS, GALILEO'),
('Mi A1', 46, 'Xiaomi', 179, 'Rose Gold', 'Android 7.1.2 (Nougat)', 'Qualcomm MSM8953 Snapdragon 625 Octa-core 2.0 GHz Cortex-A53 + Adreno 506', '64GB', '4GB', '5.5 IPS', '1080 x 1920 pixels', '3080 mAh', 'Dual: 12 MP (f/2.2) + 12 MP (f/2.6)', '5 MP', '155.4 x 75.8 x 7.3 mm', '165 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('Galaxy A8', 76, 'Samsung', 499, 'Nera', 'Android 7.1.1 (Nougat)', 'Exynos 7885 Octa-core (2x2.2 GHz Cortex-A73 & 6x1.6 GHz Cortex-A53) + Mali-G71', '64GB', '4GB', '5.6 Super AMOLED', '1080 x 2220 pixels', '3000 mAh', '16 MP (f/1.7)', 'Dual: 16 MP + 8 MP (f/1.9)', '149.2 x 70.6 x 8.4 mm', '172 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, Wi-Fi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS, GALILEO'),
('P10', 55, 'Huawei', 349, 'Nera', 'Android 7.0 (Nougat)', 'HiSilicon Kirin 960 Octa-core (4x2.4 GHz Cortex-A73 & 4x1.8 GHz Cortex-A53)', '64GB', '4GB', '5.1 IPS', '1080 x 1920 pixels', '3200 mAh', 'Dual: 12 MP (f/2.2) + 20 MP', '8 MP (f/1.9)', '145.3 x 69.3 x 7 mm', '145 g', 'Wi-Fi 802.11 b/g/n, Wi-Fi Direct, hotspot', 'A-GPS, GLONASS'),
('OnePlus 5T', 75, 'OnePlus', 479, 'Nera', 'Android 7.1.1 (Nougat)', 'Qualcomm MSM8998 Snapdragon 835 Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) + Adreno 540', '64GB', '6GB', '6.01 Super AMOLED', '1080 x 2160 pixels', '3300 mAh', 'Dual: 16 MP (f/1.7) + 20 MP (f/1.7)', '16 MP (f/2.0)', '156.1 x 75 x 7.3 mm', '162 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS, GALILEO'),
('LG G6', 0, 'LG', 349, 'Nera', 'Android 7.0 (Nougat)', 'Qualcomm MSM8996 Snapdragon 821 Quad-core (2x2.35 GHz Kryo & 2x1.6 GHz Kryo) + Adreno 530', '64GB', '4GB', '5.7 IPS', '1440 x 2880 pixels', '3300 mAh', 'Dual: 13 MP (f/1.8) + 13 MP (f/2.4)', '5 MP (f/2.2)', '148.9 x 71.9 x 7.9 mm', '163 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('P20 Pro', 86, 'Huawei', 799, 'Twilight', 'Android 8.1 (Oreo)', 'Hisilicon Kirin 970 Octa-core (4x2.4 GHz Cortex-A73 & 4x1.8 GHz Cortex-A53)', '128GB', '6GB', '6.1 AMOLED', '1080 x 2244 pixels', '4000 mAh', 'Triple: 40 MP (f/1.8) + 20 MP (f/1.6) + 8 MP (f/2.4)', '24 MP (f/2.0)', '155 x 73.9 x 7.8 mm', '180 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('Moto G5S Plus', 14, 'Motorola', 189, 'Grigia', 'Android 7.1 (Nougat)', 'Qualcomm MSM8953 Snapdragon 625 Octa-core 2.0 GHz Cortex-A53 + Adreno 506', '32GB', '3GB', '5.99 IPS', '1080 x 1920 pixels', '3000 mAh', 'Dual: 13 MP, f/2.0', '5 MP (f/2.0)', '153.5 x 76.2 x 8 mm', '168 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('Mi Mix 2S', 75, 'Xiaomi', 619, 'Nera', 'Android 8.0 (Oreo)', 'Qualcomm SDM845 Snapdragon 845 Octa-core (4x2.8 GHz Kryo 385 Gold & 4x1.8 GHz Kryo 385 Silver) + Adreno 630', '256GB', '8GB', '5.99 IPS', '1080 x 2160 pixels', '3400 mAh', 'Dual: 12 MP (f/1.8) + 12 MP (f/2.4)', '8 MP (f/2.0)', '150.9 x 74.9 x 8.1 mm', '191 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('Nokia 7 Plus', 32, 'Nokia', 349, 'Nera', 'Android 8.1 (Oreo)', 'Qualcomm SDM660 Snapdragon 660 Octa-core (4x2.2 GHz Kryo 260 & 4x1.8 GHz Kryo 260) + Adreno 512', '64GB', '4GB', '6.0 IPS', '1080 x 2160 pixels', '3800 mAh', 'Dual: 12 MP (f/1.75) + 12 MP (f/2.6)', '16 MP (f/2.0)', '158.4 x 75.6 x 8 mm', '183 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('U11 Plus', 65, 'HTC', 729, 'Nera', 'Android 8.0 (Oreo)', 'Qualcomm MSM8998 Snapdragon 835 Octa-core (4x2.35 GHz Kryo & 4x1.9 GHz Kryo) + Adreno 540', '128GB', '6GB', '6.0 IPS', '1440 x 2880 pixels', '3930 mAh', '12 MP (f/1.7)', '8 MP (f/2.0)', '158.5 x 74.9 x 8.5 mm', '188 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('Asus ZenFone 5', 37, 'Asus', 329, 'Nera', 'Android 8.0 (Oreo)', 'Qualcomm SDM636 Snapdragon 636 Octa-core Kryo 260 + Adreno 509', '64GB', '4GB', '6.2 IPS', '1080 x 2246', '3300 mAh', 'Dual: 12 MP (f/1.8) + 8 MP (f/2.0)', '8 MP (f/2.0)', '153 x 75.7 x 7.9 mm', '155 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS'),
('Honor View 10', 22, 'Honor', 419, 'Blu', 'Android 8.0 (Oreo)', 'HiSilicon Kirin 970 Octa-core (4x2.4 GHz Cortex-A73 & 4x1.8 GHz Cortex-A53)', '128GB', '6GB', '5.99 IPS', '1080 x 2160 pixels', '3750 mAh', 'Dual: 16 MP (f/1.8) + 20 MP', '13 MP (f/2.0)', '157 x 75 x 7 mm', '172 g', 'Wi-Fi 802.11 a/b/g/n/ac, dual-band, WiFi Direct, DLNA, hotspot', 'A-GPS, GLONASS, BDS');

-- --------------------------------------------------------

--
-- Struttura della tabella cart
--

DROP TABLE IF EXISTS cart;
CREATE TABLE cart (
  id_user int(11) NOT NULL,
  id_product int(11) NOT NULL,
  FOREIGN KEY (id_user) references user(id) on delete cascade,
  FOREIGN KEY (id_product) references product(id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Struttura della tabella wish
--

DROP TABLE IF EXISTS wish;
CREATE TABLE wish (
  id_user int(11) NOT NULL,
  id_product int(11) NOT NULL,
  FOREIGN KEY (id_user) references user(id) on delete cascade,
  FOREIGN KEY (id_product) references product(id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


--
-- Struttura della tabella ordine
--

DROP TABLE IF EXISTS ordine;
CREATE TABLE ordine (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_user int(11) NOT NULL,
  id_product int(11) NOT NULL,
  cost float(10) NOT NULL,
  name varchar(30) NOT NULL,
  surname varchar(30) NOT NULL,
  address varchar(30) NOT NULL,
  city varchar(30) NOT NULL,
  cap int(10) NOT NULL,
  data date,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) references user(id) on delete cascade,
  FOREIGN KEY (id_product) references product(id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;


INSERT INTO ordine (id, id_user, id_product, cost, name, surname, address, city, cap, data) VALUES
(2, 3, 3, 759, 'Giorgia', 'Penna', 'Via Nizza 30', 'Torino', 10125, '2018-2-2'),
(3, 4, 2, 799, 'Marco', 'Volpi', 'Via San Domenico Soriano 70', 'Milano', 98030, '2018-2-10'),
(4, 6, 5, 319, 'Andrea', 'Carelli', 'Via Antonio Beccadelli 30', 'Lecce', 73026, '2018-2-15'),
(5, 4, 5, 299, 'Marco', 'Volpi', 'Via San Domenico Soriano 70', 'Milano', 98030, '2018-3-4'),
(6, 5, 8, 159, 'Dario', 'Rossi', 'Via Matteo Schilizzi 133', 'Genova', 16024, '2018-3-11'),
(7, 2, 1, 899, 'Stefano', 'Martinelli', 'Via Pessinetto 12', 'Torino', 10149, '2018-3-22'),
(8, 6, 8, 149, 'Andrea', 'Carelli', 'Via San Domenico 114', 'Varese', 21020, '2018-4-7'),
(9, 2, 3, 759, 'Stefano', 'Martinelli', 'Via Pessinetto 12', 'Torino', 10149, '2018-4-15'),
(10, 2, 4, 529, 'Stefano', 'Martinelli', 'Via Pessinetto 12', 'Torino', 10149, '2018-4-16'),
(11, 8, 12, 179, 'Greta', 'Marchi', 'Piazza Trieste e Trento 68', 'Cuneo', 12051, '2018-4-17'),
(12, 9, 8, 149, 'Marco', 'Cataldi', 'Via Longhena 135', 'Grottaferrata', 00046, '2018-4-25'),
(13, 10, 3, 759, 'Fabio', 'Neto', 'Via Acrone 11', 'Mornese', 15075, '2018-4-30'),
(14, 9, 12, 179, 'Marco', 'Cataldi', 'Via Longhena 135', 'Grottaferrata', 00046, '2018-4-30'),
(15, 2, 6, 319, 'Stefano', 'Martinelli', 'Via Pessinetto 12', 'Torino', 10149, '2018-4-30'),
(16, 11, 1, 899, 'Elda', 'Milanesi', 'Via Nazionale 3', 'Bolzano', 39040, '2018-5-02'),
(17, 9, 5, 299, 'Marco', 'Cataldi', 'Via Longhena 135', 'Grottaferrata', 00046, '2018-5-03'),
(18, 2, 21, 619, 'Stefano', 'Martinelli', 'Via Pessinetto 12', 'Torino', 10149, '2018-5-08'),
(19, 3, 11, 659, 'Giorgia', 'Penna', 'Via Nizza 30', 'Torino', 10125, '2018-5-08'),
(20, 4, 1, 899, 'Marco', 'Volpi', 'Via San Domenico Soriano 70', 'Milano', 98030, '2018-5-08'),
(21, 4, 5, 299, 'Marco', 'Volpi', 'Via San Domenico Soriano 70', 'Milano', 98030, '2018-5-08');

--
-- Struttura della tabella review
--

DROP TABLE IF EXISTS review;
CREATE TABLE review (
  id int(11) NOT NULL AUTO_INCREMENT,
  id_user int(11) NOT NULL,
  id_product int(11) NOT NULL,
  title varchar(50) NOT NULL,
  description varchar(700) NOT NULL,
  data date,
  PRIMARY KEY (id),
  FOREIGN KEY (id_user) references user(id) on delete cascade,
  FOREIGN KEY (id_product) references product(id) on delete cascade
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

INSERT INTO review (id, id_user, id_product, title, description, data) VALUES
(2, 3, 3, 'Ottimo acquisto',
"Un saluto a tutti voi che leggerete questa breve recensione del Galaxy S9 Plus.
 Non staro' certo a dire le caratteristiche tecniche, perche' quelle ormai si
 trovano dappertutto, ma vi diro' le mie prime impressioni sull'utilizzo
 quotidiano. I pro sono sicuramente la fotocamera, che per chi come me viene da
 un Galaxy S7 Edge devo dire che il miglioramento si vede soprattutto nella
 messa a fuoco e nella nitidezza delle foto. I video sono bellissimi.
 Il display e' fantastico su tutti i punti di vista e in questo momento non
 si puo' trovare niente di meglio sul mercato.", '2018-2-7'),
(3, 4, 2, 'Le cose belle si pagano', "L'attuale Re dei telefoni android,
  con aggiornamenti puntuali.", '2018-2-20'),
(4, 6, 5, 'Veramente soddisfatto', "Prodotto che si commenta da solo, il top che
   samsung offre al momento.
La versione è italiana dual sim no brand.", '2018-2-24'),
(5, 4, 5, 'grande smartphone', "Poco da dire: ad oggi penso il miglior telefono
   per chi ci lavora realmente.
   La penna molto utile per appunti rapidi e per qualche piccolo
   gioco da fare.", '2018-3-17'),
(6, 5, 8, 'Fantastico', "Lo smartphone e' perfetto; funziona molto bene ed e' di
  qualita'. Il prezzo ovviamente non paragonabile con quello dei negozi
  fisici.", '2018-3-26'),
(7, 2, 1, 'Ottimo prodotto', "Un nome una garanzia, devo dire il vero ero
  scettico ma questo iPhone X si merita un applauso, un applauso anche al
  venditore serio e veloce.", '2018-3-28'),
(8, 9, 2, 'Assolutamente soddisfatto.', "Fa sempre il suo lavoro senza
  impallarsi mai. Lo consiglio.", '2018-4-28'),
(9, 10, 5, 'Ottimo prodotto', "Tutto ok per il prodotto l'unico inconveniente
  e che il corriere non ha nemmeno suonato il campanello", '2018-5-01'),
(10, 9, 3, 'Innamorato', "Fantastico prodotto, uno dei migliori presenti
  sul mercato.", '2018-5-02'),
(11, 11, 1, 'Perfetto', "Lo smartphone funziona perfettamente, arrivato in
  anticipo, imballato con sigillo di garanzia.", '2018-5-04'),
(12, 9, 5, 'Veramente soddisfatto', "Ottimo prezzo, ho risparmiato oltre 200 euro. Lo consiglio.",
  '2018-5-07'),
(13, 2, 21, 'Soddisfatto', "Che telefono! Arrivato anche in anticipo
  rispetto ai tempi previsti. ", '2018-5-07'),
(14, 3, 11, 'Contenta', "Prodotto arrivato nei tempi previsti. Fantastico! ", '2018-5-10'),
(15, 4, 1, 'Ok', "Nessun tipo di problema.", '2018-5-11'),
(16, 4, 5, 'Bene', "Non e' il mio primo acquisto, consiglio il sito.", '2018-5-12'),
(17, 2, 6, 'Nessun problema', "Come da titolo non ci son stati problemi.", '2018-5-12'),
(18, 9, 12, 'Ottimo', "Prodotto arrivato nei tempi previsti!", '2018-5-12'),
(19, 10, 3, 'WOW!', "Prodotto fantastico, stra consigliato!", '2018-5-14');
